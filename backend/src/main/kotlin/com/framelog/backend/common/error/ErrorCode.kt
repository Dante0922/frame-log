package com.framelog.backend.common.error

import org.springframework.http.HttpStatus

enum class ErrorCode(
    val status: HttpStatus,
    val code: String,
    val defaultMessage: String,
) {
    SPOT_NOT_FOUND(HttpStatus.NOT_FOUND, "SPOT_NOT_FOUND", "출사지를 찾을 수 없습니다."),
    WEEKLY_SPOT_NOT_FOUND(HttpStatus.NOT_FOUND, "WEEKLY_SPOT_NOT_FOUND", "금주의 추천 출사지가 없습니다."),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "VALIDATION_FAILED", "요청값이 유효하지 않습니다."),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "BAD_REQUEST", "잘못된 요청입니다."),
    INVALID_IMAGE_TYPE(HttpStatus.BAD_REQUEST, "INVALID_IMAGE_TYPE", "올바르지 않은 이미지 형식입니다."),
    IMAGE_TOO_LARGE(HttpStatus.BAD_REQUEST, "IMAGE_TOO_LARGE", "이미지 파일이 너무 큽니다."),
    RATE_LIMIT_EXCEEDED(HttpStatus.TOO_MANY_REQUESTS, "RATE_LIMIT_EXCEEDED", "요청 횟수 제한을 초과했습니다."),
    AI_GENERATION_FAILED(HttpStatus.BAD_GATEWAY, "AI_GENERATION_FAILED", "AI 콘텐츠 생성에 실패했습니다."),
    IMAGE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "IMAGE_UPLOAD_FAILED", "이미지 업로드에 실패했습니다."),
    WEATHER_API_ERROR(HttpStatus.BAD_GATEWAY, "WEATHER_API_ERROR", "날씨 API 호출에 실패했습니다."),
    WEATHER_NOT_AVAILABLE(HttpStatus.SERVICE_UNAVAILABLE, "WEATHER_NOT_AVAILABLE", "날씨 정보를 사용할 수 없습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "서버 내부 오류가 발생했습니다."),
}
