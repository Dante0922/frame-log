package com.framelog.backend.photo

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
@Table(name = "spot_photos")
class SpotPhotoEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spot_id", nullable = false)
    val spot: SpotEntity,

    @Column(name = "image_url", nullable = false, length = 500)
    val imageUrl: String,

    @Column(name = "image_path", length = 500)
    val imagePath: String? = null,

    @Column(length = 200)
    val caption: String? = null,

    @Column(name = "sort_order", nullable = false)
    val sortOrder: Int,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
)
