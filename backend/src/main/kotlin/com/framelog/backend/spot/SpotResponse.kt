package com.framelog.backend.spot

import java.time.Instant

data class SpotResponse(
    val id: Long,
    val name: String,
    val description: String,
    val region: String,
    val address: String,
    val recommendedTime: String,
    val recommendedSeason: String,
    val heroImageUrl: String,
    val isWeeklyFeatured: Boolean,
    val createdAt: Instant,
)

data class SpotListResponse(
    val spots: List<SpotResponse>,
    val total: Long,
)

fun SpotEntity.toSpotResponse(): SpotResponse = SpotResponse(
    id = id,
    name = name,
    description = description,
    region = region,
    address = address,
    recommendedTime = recommendedTime,
    recommendedSeason = recommendedSeason,
    heroImageUrl = heroImageUrl,
    isWeeklyFeatured = isWeeklyFeatured,
    createdAt = createdAt,
)
