package com.framelog.backend.featured

import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class WeeklyFeaturedScheduler(
    private val weeklyFeaturedService: WeeklyFeaturedService,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @Scheduled(cron = "0 0 0 * * MON")
    fun selectWeeklyFeaturedSpot() {
        try {
            log.info("Starting scheduled weekly featured spot selection")
            val selectedSpotId = weeklyFeaturedService.selectWeeklyFeaturedSpot()
            log.info("Successfully selected weekly featured spot: spotId={}", selectedSpotId)
        } catch (e: Exception) {
            log.error("Failed to select weekly featured spot", e)
        }
    }
}
