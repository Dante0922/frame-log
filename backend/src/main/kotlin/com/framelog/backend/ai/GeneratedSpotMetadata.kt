package com.framelog.backend.ai

data class GeneratedSpotMetadata(
    val name: String,
    val description: String,
    val region: String,
    val address: String,
    val recommendedTime: String,
    val recommendedSeason: String,
    val seasonalHighlights: List<SeasonalHighlight>
)

data class SeasonalHighlight(
    val monthStart: Int,
    val monthEnd: Int,
    val title: String,
    val description: String,
    val tags: String,
    val priority: Int
)
