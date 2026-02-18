package com.framelog.backend.weather

import com.framelog.backend.common.error.ApiException
import com.framelog.backend.common.error.ErrorCode
import com.framelog.backend.spot.SpotRepository
import com.framelog.backend.weather.client.GridCoordinate
import com.framelog.backend.weather.client.KmaWeatherClient
import com.framelog.backend.weather.client.RegionGridMapper
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class WeatherService(
    private val weatherCacheRepository: WeatherCacheRepository,
    private val spotRepository: SpotRepository,
    private val kmaWeatherClient: KmaWeatherClient,
) {
    private val log = LoggerFactory.getLogger(javaClass)
    private val cacheTtlSeconds = 3 * 60 * 60L // 3 hours

    @Transactional
    fun getWeather(spotId: Long): WeatherResponse {
        val spot = spotRepository.findById(spotId)
            .orElseThrow { ApiException(ErrorCode.SPOT_NOT_FOUND) }

        val gridCoordinate = getGridCoordinate(spot.id, spot.region, spot.gridNx, spot.gridNy)
            ?: throw ApiException(ErrorCode.WEATHER_NOT_AVAILABLE, "격자 좌표를 찾을 수 없습니다.")

        val cacheThreshold = Instant.now().minusSeconds(cacheTtlSeconds)
        val cached = weatherCacheRepository.findLatestBySpotId(spotId, cacheThreshold)

        if (cached != null) {
            log.debug("Weather cache hit for spotId={}", spotId)
            return cached.toResponse()
        }

        log.debug("Weather cache miss for spotId={}, fetching from KMA", spotId)
        return fetchAndCacheWeather(spotId, gridCoordinate)
    }

    @Transactional
    fun fetchAndCacheWeather(spotId: Long, gridCoordinate: GridCoordinate): WeatherResponse {
        val apiResponse = kmaWeatherClient.getUltraSrtFcst(gridCoordinate.nx, gridCoordinate.ny)
            ?: throw ApiException(ErrorCode.WEATHER_API_ERROR, "기상청 API 호출에 실패했습니다.")

        if (apiResponse.response.header.resultCode != "00") {
            throw ApiException(
                ErrorCode.WEATHER_API_ERROR,
                "기상청 API 오류: ${apiResponse.response.header.resultMsg}"
            )
        }

        val items = apiResponse.response.body?.items?.item
            ?: throw ApiException(ErrorCode.WEATHER_NOT_AVAILABLE, "날씨 데이터가 없습니다.")

        val baseDate = items.firstOrNull()?.baseDate ?: ""
        val baseTime = items.firstOrNull()?.baseTime ?: ""

        val weatherData = items.groupBy { it.category }
            .mapValues { it.value.firstOrNull()?.fcstValue }

        val weatherCache = WeatherCacheEntity(
            spotId = spotId,
            baseDate = baseDate,
            baseTime = baseTime,
            temperature = weatherData["T1H"],
            skyCondition = weatherData["SKY"],
            precipitationType = weatherData["PTY"],
            precipitationProbability = weatherData["POP"],
            humidity = weatherData["REH"],
            windSpeed = weatherData["WSD"],
            fetchedAt = Instant.now(),
        )

        val saved = weatherCacheRepository.save(weatherCache)
        log.info("Weather cached for spotId={}", spotId)

        return saved.toResponse()
    }

    @Scheduled(cron = "0 10 2,5,8,11,14,17,20,23 * * *")
    @Transactional
    fun refreshWeatherCache() {
        log.info("Starting scheduled weather cache refresh")

        val allSpots = spotRepository.findAll()

        for (spot in allSpots) {
            try {
                val gridCoordinate = getGridCoordinate(spot.id, spot.region, spot.gridNx, spot.gridNy)
                if (gridCoordinate != null) {
                    fetchAndCacheWeather(spot.id, gridCoordinate)
                    Thread.sleep(100) // API rate limiting
                }
            } catch (e: Exception) {
                log.error("Failed to refresh weather for spotId=${spot.id}", e)
            }
        }

        log.info("Completed scheduled weather cache refresh")
    }

    private fun getGridCoordinate(spotId: Long, region: String, gridNx: Int?, gridNy: Int?): GridCoordinate? {
        if (gridNx != null && gridNy != null) {
            return GridCoordinate(gridNx, gridNy)
        }

        return RegionGridMapper.getGridCoordinate(region)
    }
}
