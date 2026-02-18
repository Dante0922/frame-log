package com.framelog.backend.spot

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query

interface SpotRepository : JpaRepository<SpotEntity, Long> {
    fun findFirstByIsWeeklyFeaturedTrueOrderByCreatedAtDesc(): SpotEntity?

    @Modifying
    @Query("UPDATE SpotEntity s SET s.isWeeklyFeatured = false WHERE s.isWeeklyFeatured = true")
    fun unfeaturedAll()

    @Modifying
    @Query("UPDATE SpotEntity s SET s.isWeeklyFeatured = true WHERE s.id = :spotId")
    fun setFeatured(spotId: Long)
}
