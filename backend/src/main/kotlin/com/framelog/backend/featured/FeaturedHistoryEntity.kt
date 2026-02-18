package com.framelog.backend.featured

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "featured_history")
class FeaturedHistoryEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "spot_id", nullable = false)
    val spotId: Long,

    @Column(name = "featured_week_start", nullable = false)
    val featuredWeekStart: LocalDate,

    @Column(name = "selection_reason", length = 500)
    val selectionReason: String? = null,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
)
