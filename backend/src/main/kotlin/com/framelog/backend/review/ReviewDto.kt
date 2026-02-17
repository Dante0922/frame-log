package com.framelog.backend.review

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.Instant

data class SpotReviewResponse(
    val id: Long,
    val spotId: Long,
    val nickname: String,
    val content: String,
    val createdAt: Instant,
)

data class ReviewListResponse(
    val reviews: List<SpotReviewResponse>,
    val total: Long,
)

data class CreateReviewRequest(
    val spotId: Long? = null,

    @field:NotBlank(message = "nickname은 필수값입니다.")
    @field:Size(max = 50, message = "nickname은 최대 50자까지 입력할 수 있습니다.")
    val nickname: String,

    @field:NotBlank(message = "content는 필수값입니다.")
    @field:Size(max = 100, message = "content는 최대 100자까지 입력할 수 있습니다.")
    val content: String,
)

fun SpotReviewEntity.toSpotReviewResponse(): SpotReviewResponse = SpotReviewResponse(
    id = id,
    spotId = spot.id,
    nickname = nickname,
    content = content,
    createdAt = createdAt,
)
