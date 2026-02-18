package com.framelog.backend.weather

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.time.Instant

interface WeatherCacheRepository : JpaRepository<WeatherCacheEntity, Long> {
    fun findBySpotIdAndBaseDateAndBaseTime(
        spotId: Long,
        baseDate: String,
        baseTime: String
    ): WeatherCacheEntity?

    @Query("""
        SELECT w FROM WeatherCacheEntity w
        WHERE w.spotId = :spotId
        AND w.fetchedAt > :afterTime
        ORDER BY w.fetchedAt DESC
    """)
    fun findLatestBySpotId(spotId: Long, afterTime: Instant): WeatherCacheEntity?

    fun findAllBySpotId(spotId: Long): List<WeatherCacheEntity>
}
