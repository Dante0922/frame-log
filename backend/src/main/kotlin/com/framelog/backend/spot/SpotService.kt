package com.framelog.backend.spot

import com.framelog.backend.common.error.ErrorCode
import com.framelog.backend.common.error.NotFoundException
import com.framelog.backend.highlight.SpotSeasonalHighlightRepository
import com.framelog.backend.highlight.SpotSeasonalHighlightResponse
import com.framelog.backend.highlight.toResponse
import com.framelog.backend.photo.SpotPhotoListResponse
import com.framelog.backend.photo.SpotPhotoRepository
import com.framelog.backend.photo.toSpotPhotoResponse
import com.framelog.backend.review.CreateReviewRequest
import com.framelog.backend.review.ReviewListResponse
import com.framelog.backend.review.SpotReviewEntity
import com.framelog.backend.review.SpotReviewRepository
import com.framelog.backend.review.SpotReviewResponse
import com.framelog.backend.review.toSpotReviewResponse
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@Service
class SpotService(
    private val spotRepository: SpotRepository,
    private val spotPhotoRepository: SpotPhotoRepository,
    private val spotReviewRepository: SpotReviewRepository,
    private val seasonalHighlightRepository: SpotSeasonalHighlightRepository,
) {
    @Transactional(readOnly = true)
    fun getWeeklyFeaturedSpot(): SpotResponse {
        val spot = spotRepository.findFirstByIsWeeklyFeaturedTrueOrderByCreatedAtDesc()
            ?: throw NotFoundException(ErrorCode.WEEKLY_SPOT_NOT_FOUND)

        return spot.toSpotResponse()
    }

    @Transactional(readOnly = true)
    fun getSpotList(pageable: Pageable): SpotListResponse {
        val normalizedPageable = normalizePageable(
            pageable,
            defaultSort = Sort.by(Sort.Direction.DESC, "createdAt")
        )
        val spotPage = spotRepository.findAll(normalizedPageable)

        return SpotListResponse(
            spots = spotPage.content.map { it.toSpotResponse() },
            total = spotPage.totalElements,
        )
    }

    @Transactional(readOnly = true)
    fun getSpotDetail(spotId: Long): SpotResponse = findSpotById(spotId).toSpotResponse()

    @Transactional(readOnly = true)
    fun getSpotPhotos(spotId: Long): SpotPhotoListResponse {
        ensureSpotExists(spotId)
        val photos = spotPhotoRepository.findBySpotIdOrderBySortOrderAscIdAsc(spotId)

        return SpotPhotoListResponse(
            photos = photos.map { it.toSpotPhotoResponse() },
            total = photos.size.toLong(),
        )
    }

    @Transactional(readOnly = true)
    fun getSpotReviews(
        spotId: Long,
        pageable: Pageable,
    ): ReviewListResponse {
        ensureSpotExists(spotId)

        val normalizedPageable =
            normalizePageable(pageable, defaultSort = Sort.by(Sort.Direction.DESC, "createdAt", "id"))
        val reviewPage = spotReviewRepository.findBySpotIdOrderByCreatedAtDescIdDesc(spotId, normalizedPageable)

        return ReviewListResponse(
            reviews = reviewPage.content.map { it.toSpotReviewResponse() },
            total = reviewPage.totalElements,
        )
    }

    @Transactional
    fun createReview(
        spotId: Long,
        request: CreateReviewRequest,
    ): SpotReviewResponse {
        val spot = findSpotById(spotId)

        val review = SpotReviewEntity(
            spot = spot,
            nickname = request.nickname.trim(),
            content = request.content.trim(),
        )

        return spotReviewRepository.save(review).toSpotReviewResponse()
    }

    @Transactional(readOnly = true)
    fun getSpotHighlights(spotId: Long): List<SpotSeasonalHighlightResponse> {
        ensureSpotExists(spotId)

        val currentMonth = LocalDate.now().monthValue
        val highlights = seasonalHighlightRepository.findCurrentHighlights(spotId, currentMonth)

        return highlights.map { it.toResponse() }
    }

    private fun findSpotById(spotId: Long): SpotEntity =
        spotRepository.findById(spotId)
            .orElseThrow {
                NotFoundException(
                    errorCode = ErrorCode.SPOT_NOT_FOUND,
                    message = "출사지를 찾을 수 없습니다. id=$spotId",
                )
            }

    private fun ensureSpotExists(spotId: Long) {
        if (!spotRepository.existsById(spotId)) {
            throw NotFoundException(
                errorCode = ErrorCode.SPOT_NOT_FOUND,
                message = "출사지를 찾을 수 없습니다. id=$spotId",
            )
        }
    }

    private fun normalizePageable(
        pageable: Pageable,
        defaultSort: Sort,
    ): Pageable {
        val page = if (pageable.pageNumber < 0) 0 else pageable.pageNumber
        val size = when {
            pageable.pageSize <= 0 -> 20
            pageable.pageSize > 100 -> 100
            else -> pageable.pageSize
        }

        val sort = if (pageable.sort.isSorted) pageable.sort else defaultSort
        return PageRequest.of(page, size, sort)
    }
}
