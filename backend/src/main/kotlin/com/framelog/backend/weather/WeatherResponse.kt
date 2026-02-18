package com.framelog.backend.weather

import java.time.Instant

data class WeatherResponse(
    val spotId: Long,
    val temperature: String?,
    val skyCondition: String?,
    val precipitationType: String?,
    val precipitationProbability: String?,
    val humidity: String?,
    val windSpeed: String?,
    val baseDate: String,
    val baseTime: String,
    val fetchedAt: Instant,
)

fun WeatherCacheEntity.toResponse() = WeatherResponse(
    spotId = spotId,
    temperature = temperature,
    skyCondition = skyCondition,
    precipitationType = precipitationType,
    precipitationProbability = precipitationProbability,
    humidity = humidity,
    windSpeed = windSpeed,
    baseDate = baseDate,
    baseTime = baseTime,
    fetchedAt = fetchedAt,
)
