package com.framelog.backend.weather.client

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.client.RestClient
import org.springframework.web.client.body
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Component
class KmaWeatherClient(
    private val kmaWeatherProperties: KmaWeatherProperties,
) {
    private val log = LoggerFactory.getLogger(javaClass)
    private val restClient = RestClient.create()

    fun getUltraSrtFcst(nx: Int, ny: Int): KmaApiResponse? {
        val baseDateTime = getBaseDateTime()
        val baseDate = baseDateTime.format(DateTimeFormatter.ofPattern("yyyyMMdd"))
        val baseTime = baseDateTime.format(DateTimeFormatter.ofPattern("HHmm"))

        return try {
            val response = restClient.get()
                .uri { builder ->
                    builder
                        .scheme("https")
                        .host("apis.data.go.kr")
                        .path("/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst")
                        .queryParam("serviceKey", kmaWeatherProperties.serviceKey)
                        .queryParam("pageNo", 1)
                        .queryParam("numOfRows", 60)
                        .queryParam("dataType", "JSON")
                        .queryParam("base_date", baseDate)
                        .queryParam("base_time", baseTime)
                        .queryParam("nx", nx)
                        .queryParam("ny", ny)
                        .build()
                }
                .retrieve()
                .body<KmaApiResponse>()

            log.debug("KMA API response: resultCode={}", response?.response?.header?.resultCode)
            response
        } catch (e: Exception) {
            log.error("Failed to fetch weather data from KMA API", e)
            null
        }
    }

    private fun getBaseDateTime(): LocalDateTime {
        val now = LocalDateTime.now()
        val minute = now.minute
        val hour = now.hour

        val baseTime = when {
            minute < 45 -> hour - 1
            else -> hour
        }

        return now.withHour(baseTime.coerceAtLeast(0)).withMinute(0).withSecond(0).withNano(0)
    }
}
