package com.framelog.backend.photo

import java.time.Instant

data class SpotPhotoResponse(
    val id: Long,
    val spotId: Long,
    val imageUrl: String,
    val caption: String?,
    val sortOrder: Int,
    val createdAt: Instant,
)

data class SpotPhotoListResponse(
    val photos: List<SpotPhotoResponse>,
    val total: Long,
)

fun SpotPhotoEntity.toSpotPhotoResponse(): SpotPhotoResponse = SpotPhotoResponse(
    id = id,
    spotId = spot.id,
    imageUrl = imageUrl,
    caption = caption,
    sortOrder = sortOrder,
    createdAt = createdAt,
)
