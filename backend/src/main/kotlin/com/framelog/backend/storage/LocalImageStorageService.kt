package com.framelog.backend.storage

import com.framelog.backend.common.error.ApiException
import com.framelog.backend.common.error.ErrorCode
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.UUID

@Service
@Profile("!cloud")
class LocalImageStorageService(
    private val storageProperties: StorageProperties,
) : ImageStorageService {
    private val log = LoggerFactory.getLogger(javaClass)
    private val uploadPath: Path = Paths.get(storageProperties.basePath)

    init {
        try {
            Files.createDirectories(uploadPath)
            log.info("Storage directory initialized at: ${uploadPath.toAbsolutePath()}")
        } catch (e: Exception) {
            log.error("Failed to create storage directory", e)
            throw RuntimeException("Could not initialize storage", e)
        }
    }

    override fun store(file: MultipartFile): String {
        validateFile(file)

        val originalFilename = file.originalFilename ?: throw ApiException(
            ErrorCode.IMAGE_UPLOAD_FAILED,
            "파일명을 알 수 없습니다."
        )

        val extension = originalFilename.substringAfterLast(".", "")
        if (extension.isBlank()) {
            throw ApiException(ErrorCode.IMAGE_UPLOAD_FAILED, "파일 확장자가 없습니다.")
        }

        val filename = "${UUID.randomUUID()}.$extension"
        val destinationPath = uploadPath.resolve(filename)

        try {
            file.inputStream.use { inputStream ->
                Files.copy(inputStream, destinationPath, StandardCopyOption.REPLACE_EXISTING)
            }

            log.info("Stored file: $filename")
            return filename
        } catch (e: Exception) {
            log.error("Failed to store file", e)
            throw ApiException(ErrorCode.IMAGE_UPLOAD_FAILED, "파일 저장에 실패했습니다.")
        }
    }

    override fun delete(filename: String) {
        try {
            val filePath = uploadPath.resolve(filename)
            Files.deleteIfExists(filePath)
            log.info("Deleted file: $filename")
        } catch (e: Exception) {
            log.error("Failed to delete file: $filename", e)
        }
    }

    override fun getPublicUrl(filename: String): String {
        return "${storageProperties.baseUrl}/$filename"
    }

    private fun validateFile(file: MultipartFile) {
        if (file.isEmpty) {
            throw ApiException(ErrorCode.IMAGE_UPLOAD_FAILED, "파일이 비어있습니다.")
        }

        val maxSizeBytes = storageProperties.maxFileSizeMb * 1024 * 1024
        if (file.size > maxSizeBytes) {
            throw ApiException(ErrorCode.IMAGE_TOO_LARGE, "파일 크기가 너무 큽니다. 최대 ${storageProperties.maxFileSizeMb}MB")
        }

        val contentType = file.contentType ?: ""
        if (!contentType.startsWith("image/")) {
            throw ApiException(ErrorCode.INVALID_IMAGE_TYPE, "이미지 파일만 업로드 가능합니다.")
        }
    }
}
