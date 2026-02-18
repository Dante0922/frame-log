package com.framelog.backend.ai

import org.springframework.web.multipart.MultipartFile

interface AiContentGenerator {
    fun generateSpotMetadata(image: MultipartFile): GeneratedSpotMetadata
}
