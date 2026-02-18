package com.framelog.backend.highlight

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface SpotSeasonalHighlightRepository : JpaRepository<SpotSeasonalHighlightEntity, Long> {
    fun findBySpotId(spotId: Long): List<SpotSeasonalHighlightEntity>

    @Query("""
        SELECT h FROM SpotSeasonalHighlightEntity h
        WHERE h.spotId = :spotId
        AND (
            (h.monthStart <= h.monthEnd AND :currentMonth >= h.monthStart AND :currentMonth <= h.monthEnd)
            OR
            (h.monthStart > h.monthEnd AND (:currentMonth >= h.monthStart OR :currentMonth <= h.monthEnd))
        )
        ORDER BY h.priority DESC
    """)
    fun findCurrentHighlights(spotId: Long, currentMonth: Int): List<SpotSeasonalHighlightEntity>

    @Query("""
        SELECT h FROM SpotSeasonalHighlightEntity h
        WHERE (
            (h.monthStart <= h.monthEnd AND :currentMonth >= h.monthStart AND :currentMonth <= h.monthEnd)
            OR
            (h.monthStart > h.monthEnd AND (:currentMonth >= h.monthStart OR :currentMonth <= h.monthEnd))
        )
        ORDER BY h.priority DESC
    """)
    fun findAllCurrentHighlights(currentMonth: Int): List<SpotSeasonalHighlightEntity>
}
