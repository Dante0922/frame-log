package com.framelog.backend.admin

import com.framelog.backend.ai.AiContentGenerator
import com.framelog.backend.highlight.SpotSeasonalHighlightEntity
import com.framelog.backend.highlight.SpotSeasonalHighlightRepository
import com.framelog.backend.spot.SpotEntity
import com.framelog.backend.spot.SpotRepository
import com.framelog.backend.storage.ImageStorageService
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile

@Service
class AdminSpotService(
    private val aiContentGenerator: AiContentGenerator,
    private val imageStorageService: ImageStorageService,
    private val spotRepository: SpotRepository,
    private val seasonalHighlightRepository: SpotSeasonalHighlightRepository,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun analyzeImage(image: MultipartFile): AnalyzeImageResponse {
        log.info("Analyzing image with AI: ${image.originalFilename}")

        val metadata = aiContentGenerator.generateSpotMetadata(image)

        return AnalyzeImageResponse(
            name = metadata.name,
            description = metadata.description,
            region = metadata.region,
            address = metadata.address,
            recommendedTime = metadata.recommendedTime,
            recommendedSeason = metadata.recommendedSeason,
            seasonalHighlights = metadata.seasonalHighlights,
        )
    }

    @Transactional
    fun createSpot(image: MultipartFile, request: CreateSpotRequest): CreateSpotResponse {
        log.info("Creating spot with admin upload: ${request.name}")

        val filename = imageStorageService.store(image)
        val publicUrl = imageStorageService.getPublicUrl(filename)

        val spot = SpotEntity(
            name = request.name,
            description = request.description,
            region = request.region,
            address = request.address,
            recommendedTime = request.recommendedTime,
            recommendedSeason = request.recommendedSeason,
            heroImageUrl = publicUrl,
            heroImagePath = filename,
        )

        val savedSpot = spotRepository.save(spot)

        request.seasonalHighlights?.forEach { highlight ->
            val entity = SpotSeasonalHighlightEntity(
                spotId = savedSpot.id,
                monthStart = highlight.monthStart,
                monthEnd = highlight.monthEnd,
                title = highlight.title,
                description = highlight.description,
                tags = highlight.tags,
                priority = highlight.priority,
            )
            seasonalHighlightRepository.save(entity)
        }

        log.info("Created spot id=${savedSpot.id}")

        return CreateSpotResponse(
            spotId = savedSpot.id,
            imageUrl = publicUrl,
        )
    }
}
