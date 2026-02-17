package com.framelog.backend.spot

import org.springframework.data.jpa.repository.JpaRepository

interface SpotRepository : JpaRepository<SpotEntity, Long> {
    fun findFirstByIsWeeklyFeaturedTrueOrderByCreatedAtDesc(): SpotEntity?
}
