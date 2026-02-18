package com.framelog.backend.highlight

data class SpotSeasonalHighlightResponse(
    val id: Long,
    val spotId: Long,
    val monthStart: Int,
    val monthEnd: Int,
    val title: String,
    val description: String?,
    val tags: List<String>,
    val priority: Int,
)

fun SpotSeasonalHighlightEntity.toResponse() = SpotSeasonalHighlightResponse(
    id = id,
    spotId = spotId,
    monthStart = monthStart,
    monthEnd = monthEnd,
    title = title,
    description = description,
    tags = tags?.split(",")?.map { it.trim() } ?: emptyList(),
    priority = priority,
)
