package com.framelog.backend.common.error

import org.springframework.http.HttpStatus

enum class ErrorCode(
    val status: HttpStatus,
    val code: String,
    val defaultMessage: String,
) {
    SPOT_NOT_FOUND(HttpStatus.NOT_FOUND, "SPOT_NOT_FOUND", "출사지를 찾을 수 없습니다."),
    WEEKLY_SPOT_NOT_FOUND(HttpStatus.NOT_FOUND, "WEEKLY_SPOT_NOT_FOUND", "금주의 추천 출사지가 없습니다."),
    SPOT_ID_MISMATCH(HttpStatus.BAD_REQUEST, "SPOT_ID_MISMATCH", "요청 본문의 spotId가 경로의 spotId와 일치하지 않습니다."),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "VALIDATION_FAILED", "요청값이 유효하지 않습니다."),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "BAD_REQUEST", "잘못된 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "서버 내부 오류가 발생했습니다."),
}
