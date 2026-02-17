package com.framelog.backend.common.error

import java.time.Instant

data class ApiErrorResponse(
    val timestamp: Instant,
    val status: Int,
    val error: String,
    val code: String,
    val message: String,
    val path: String,
)
