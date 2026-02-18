package com.framelog.backend.storage

import org.springframework.web.multipart.MultipartFile

interface ImageStorageService {
    fun store(file: MultipartFile): String
    fun delete(filename: String)
    fun getPublicUrl(filename: String): String
}
