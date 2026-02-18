package com.framelog.backend.admin

import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/admin/spots")
class AdminSpotController(
    private val adminSpotService: AdminSpotService,
) {
    @PostMapping("/analyze")
    fun analyzeImage(
        @RequestPart("image") image: MultipartFile,
    ): AnalyzeImageResponse {
        return adminSpotService.analyzeImage(image)
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createSpot(
        @RequestPart("image") image: MultipartFile,
        @Valid @RequestPart("data") request: CreateSpotRequest,
    ): CreateSpotResponse {
        return adminSpotService.createSpot(image, request)
    }
}
