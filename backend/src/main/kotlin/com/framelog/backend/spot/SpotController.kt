package com.framelog.backend.spot

import com.framelog.backend.photo.SpotPhotoListResponse
import com.framelog.backend.review.CreateReviewRequest
import com.framelog.backend.review.ReviewListResponse
import com.framelog.backend.review.SpotReviewResponse
import jakarta.validation.Valid
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/spots")
class SpotController(
    private val spotService: SpotService,
) {
    @GetMapping("/weekly")
    fun getWeeklyFeaturedSpot(): SpotResponse = spotService.getWeeklyFeaturedSpot()

    @GetMapping
    fun getSpotList(
        @PageableDefault(size = 20) pageable: Pageable,
    ): SpotListResponse = spotService.getSpotList(pageable)

    @GetMapping("/{spotId}")
    fun getSpotDetail(
        @PathVariable spotId: Long,
    ): SpotResponse = spotService.getSpotDetail(spotId)

    @GetMapping("/{spotId}/photos")
    fun getSpotPhotos(
        @PathVariable spotId: Long,
    ): SpotPhotoListResponse = spotService.getSpotPhotos(spotId)

    @GetMapping("/{spotId}/reviews")
    fun getSpotReviews(
        @PathVariable spotId: Long,
        @PageableDefault(size = 20) pageable: Pageable,
    ): ReviewListResponse = spotService.getSpotReviews(spotId, pageable)

    @PostMapping("/{spotId}/reviews")
    @ResponseStatus(HttpStatus.CREATED)
    fun createReview(
        @PathVariable spotId: Long,
        @Valid @RequestBody request: CreateReviewRequest,
    ): SpotReviewResponse = spotService.createReview(spotId, request)
}
