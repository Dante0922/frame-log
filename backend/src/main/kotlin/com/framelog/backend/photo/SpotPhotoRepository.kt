package com.framelog.backend.photo

import org.springframework.data.jpa.repository.JpaRepository

interface SpotPhotoRepository : JpaRepository<SpotPhotoEntity, Long> {
    fun findBySpotIdOrderBySortOrderAscIdAsc(spotId: Long): List<SpotPhotoEntity>
}
