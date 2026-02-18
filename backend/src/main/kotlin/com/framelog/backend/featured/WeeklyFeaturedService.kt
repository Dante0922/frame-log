package com.framelog.backend.featured

import com.framelog.backend.highlight.SpotSeasonalHighlightRepository
import com.framelog.backend.spot.SpotEntity
import com.framelog.backend.spot.SpotRepository
import com.framelog.backend.weather.WeatherService
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@Service
class WeeklyFeaturedService(
    private val spotRepository: SpotRepository,
    private val seasonalHighlightRepository: SpotSeasonalHighlightRepository,
    private val featuredHistoryRepository: FeaturedHistoryRepository,
    private val weatherService: WeatherService,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    data class SpotScore(
        val spotId: Long,
        val totalScore: Double,
        val highlightScore: Double,
        val weatherScore: Double,
        val rotationScore: Double,
        val seasonScore: Double,
        val reason: String,
    )

    @Transactional
    fun selectWeeklyFeaturedSpot(): Long {
        log.info("Starting weekly featured spot selection")

        val allSpots = spotRepository.findAll()
        if (allSpots.isEmpty()) {
            throw IllegalStateException("No spots available for selection")
        }

        val currentMonth = LocalDate.now().monthValue
        val currentSeason = getCurrentSeason()
        val weekStart = getWeekStart()

        val scores = allSpots.map { spot ->
            calculateSpotScore(spot, currentMonth, currentSeason, weekStart)
        }

        val bestSpot = scores.maxByOrNull { it.totalScore }
            ?: throw IllegalStateException("Failed to select spot")

        log.info(
            "Selected spotId={} with score={} (highlight={}, weather={}, rotation={}, season={})",
            bestSpot.spotId,
            bestSpot.totalScore,
            bestSpot.highlightScore,
            bestSpot.weatherScore,
            bestSpot.rotationScore,
            bestSpot.seasonScore
        )

        spotRepository.unfeaturedAll()
        spotRepository.setFeatured(bestSpot.spotId)

        val history = FeaturedHistoryEntity(
            spotId = bestSpot.spotId,
            featuredWeekStart = weekStart,
            selectionReason = bestSpot.reason,
        )
        featuredHistoryRepository.save(history)

        return bestSpot.spotId
    }

    private fun calculateSpotScore(
        spot: SpotEntity,
        currentMonth: Int,
        currentSeason: String,
        weekStart: LocalDate
    ): SpotScore {
        val highlightScore = calculateHighlightScore(spot.id, currentMonth)
        val weatherScore = calculateWeatherScore(spot.id)
        val rotationScore = calculateRotationScore(spot.id, weekStart)
        val seasonScore = calculateSeasonScore(spot.recommendedSeason, currentSeason)

        val totalScore = highlightScore + weatherScore + rotationScore + seasonScore

        val reason = buildString {
            append("하이라이트: ${"%.1f".format(highlightScore)}점, ")
            append("날씨: ${"%.1f".format(weatherScore)}점, ")
            append("로테이션: ${"%.1f".format(rotationScore)}점, ")
            append("계절: ${"%.1f".format(seasonScore)}점")
        }

        return SpotScore(
            spotId = spot.id,
            totalScore = totalScore,
            highlightScore = highlightScore,
            weatherScore = weatherScore,
            rotationScore = rotationScore,
            seasonScore = seasonScore,
            reason = reason,
        )
    }

    private fun calculateHighlightScore(spotId: Long, currentMonth: Int): Double {
        val highlights = seasonalHighlightRepository.findCurrentHighlights(spotId, currentMonth)

        if (highlights.isEmpty()) {
            return 0.0
        }

        val maxPriority = highlights.maxOf { it.priority }
        return (maxPriority / 10.0).coerceAtMost(1.0) * 35.0
    }

    private fun calculateWeatherScore(spotId: Long): Double {
        return try {
            val weather = weatherService.getWeather(spotId)
            val skyCondition = weather.skyCondition?.toIntOrNull() ?: 3

            when (skyCondition) {
                1 -> 25.0  // 맑음
                3 -> 12.0  // 흐림
                else -> 7.0  // 비/눈
            }
        } catch (e: Exception) {
            log.warn("Failed to get weather for spotId=$spotId, using default score", e)
            12.0  // 기본값
        }
    }

    private fun calculateRotationScore(spotId: Long, currentWeekStart: LocalDate): Double {
        val lastFeatured = featuredHistoryRepository.findFirstBySpotIdOrderByFeaturedWeekStartDesc(spotId)

        if (lastFeatured == null) {
            return 25.0  // 한 번도 선정되지 않은 스팟
        }

        val weeksSinceLastFeatured = ChronoUnit.WEEKS.between(lastFeatured.featuredWeekStart, currentWeekStart)

        return when {
            weeksSinceLastFeatured >= 8 -> 25.0
            weeksSinceLastFeatured >= 4 -> 20.0
            weeksSinceLastFeatured >= 2 -> 15.0
            weeksSinceLastFeatured == 1L -> 10.0
            else -> 0.0
        }
    }

    private fun calculateSeasonScore(recommendedSeason: String, currentSeason: String): Double {
        val seasons = recommendedSeason.split(",").map { it.trim() }

        return if (seasons.any { it.equals(currentSeason, ignoreCase = true) }) {
            15.0
        } else {
            0.0
        }
    }

    private fun getCurrentSeason(): String {
        val month = LocalDate.now().monthValue
        return when (month) {
            in 3..5 -> "봄"
            in 6..8 -> "여름"
            in 9..11 -> "가을"
            else -> "겨울"
        }
    }

    private fun getWeekStart(): LocalDate {
        val today = LocalDate.now()
        val daysUntilMonday = (DayOfWeek.MONDAY.value - today.dayOfWeek.value + 7) % 7
        return today.plusDays(daysUntilMonday.toLong())
    }
}
