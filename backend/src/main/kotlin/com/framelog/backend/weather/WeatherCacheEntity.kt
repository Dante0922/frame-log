package com.framelog.backend.weather

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "weather_cache")
class WeatherCacheEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "spot_id", nullable = false)
    val spotId: Long,

    @Column(name = "base_date", nullable = false, length = 8)
    val baseDate: String,

    @Column(name = "base_time", nullable = false, length = 4)
    val baseTime: String,

    @Column(length = 10)
    val temperature: String? = null,

    @Column(name = "sky_condition", length = 10)
    val skyCondition: String? = null,

    @Column(name = "precipitation_type", length = 10)
    val precipitationType: String? = null,

    @Column(name = "precipitation_probability", length = 10)
    val precipitationProbability: String? = null,

    @Column(length = 10)
    val humidity: String? = null,

    @Column(name = "wind_speed", length = 10)
    val windSpeed: String? = null,

    @Column(name = "fetched_at", nullable = false)
    val fetchedAt: Instant = Instant.now(),
)
