package com.framelog.backend.featured

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.time.LocalDate

interface FeaturedHistoryRepository : JpaRepository<FeaturedHistoryEntity, Long> {
    @Query("""
        SELECT h FROM FeaturedHistoryEntity h
        WHERE h.featuredWeekStart >= :afterDate
        ORDER BY h.featuredWeekStart DESC
    """)
    fun findByFeaturedWeekStartAfter(afterDate: LocalDate): List<FeaturedHistoryEntity>

    fun findFirstBySpotIdOrderByFeaturedWeekStartDesc(spotId: Long): FeaturedHistoryEntity?
}
