package com.framelog.backend.admin

import com.framelog.backend.ai.SeasonalHighlight
import jakarta.validation.constraints.NotBlank

data class AnalyzeImageResponse(
    val name: String,
    val description: String,
    val region: String,
    val address: String,
    val recommendedTime: String,
    val recommendedSeason: String,
    val seasonalHighlights: List<SeasonalHighlight>,
)

data class CreateSpotRequest(
    @field:NotBlank
    val name: String,

    @field:NotBlank
    val description: String,

    @field:NotBlank
    val region: String,

    @field:NotBlank
    val address: String,

    @field:NotBlank
    val recommendedTime: String,

    @field:NotBlank
    val recommendedSeason: String,

    val seasonalHighlights: List<SeasonalHighlight>? = null,
)

data class CreateSpotResponse(
    val spotId: Long,
    val imageUrl: String,
)
