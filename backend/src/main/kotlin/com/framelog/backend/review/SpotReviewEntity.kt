package com.framelog.backend.review

import com.framelog.backend.spot.SpotEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "spot_reviews")
class SpotReviewEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spot_id", nullable = false)
    val spot: SpotEntity,

    @Column(nullable = false, length = 50)
    val nickname: String,

    @Column(nullable = false, length = 100)
    val content: String,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
)
