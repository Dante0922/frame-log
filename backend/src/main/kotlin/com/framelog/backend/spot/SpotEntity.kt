package com.framelog.backend.spot

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "spots")
class SpotEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, length = 100)
    val name: String,

    @Column(nullable = false, columnDefinition = "TEXT")
    val description: String,

    @Column(nullable = false, length = 50)
    val region: String,

    @Column(nullable = false, length = 200)
    val address: String,

    @Column(name = "recommended_time", nullable = false, length = 100)
    val recommendedTime: String,

    @Column(name = "recommended_season", nullable = false, length = 100)
    val recommendedSeason: String,

    @Column(name = "hero_image_url", nullable = false, length = 500)
    val heroImageUrl: String,

    @Column(name = "is_weekly_featured", nullable = false)
    val isWeeklyFeatured: Boolean = false,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
)
