package com.framelog.backend.highlight

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "spot_seasonal_highlights")
class SpotSeasonalHighlightEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "spot_id", nullable = false)
    val spotId: Long,

    @Column(name = "month_start", nullable = false)
    val monthStart: Int,

    @Column(name = "month_end", nullable = false)
    val monthEnd: Int,

    @Column(nullable = false, length = 100)
    val title: String,

    @Column(length = 500)
    val description: String? = null,

    @Column(length = 300)
    val tags: String? = null,

    @Column(nullable = false)
    val priority: Int = 0,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
)
