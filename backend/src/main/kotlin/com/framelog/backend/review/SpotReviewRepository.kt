package com.framelog.backend.review

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface SpotReviewRepository : JpaRepository<SpotReviewEntity, Long> {
    fun findBySpotIdOrderByCreatedAtDescIdDesc(spotId: Long, pageable: Pageable): Page<SpotReviewEntity>
}
