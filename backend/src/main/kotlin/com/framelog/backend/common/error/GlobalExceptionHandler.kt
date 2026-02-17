package com.framelog.backend.common.error

import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.Instant

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(ApiException::class)
    fun handleApiException(
        exception: ApiException,
        request: HttpServletRequest,
    ): ResponseEntity<ApiErrorResponse> {
        val status = exception.errorCode.status
        return ResponseEntity
            .status(status)
            .body(
                ApiErrorResponse(
                    timestamp = Instant.now(),
                    status = status.value(),
                    error = status.reasonPhrase,
                    code = exception.errorCode.code,
                    message = exception.message,
                    path = request.requestURI,
                ),
            )
    }

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationException(
        exception: MethodArgumentNotValidException,
        request: HttpServletRequest,
    ): ResponseEntity<ApiErrorResponse> {
        val fieldError = exception.bindingResult
            .allErrors
            .firstOrNull { it is FieldError } as? FieldError

        val message = fieldError?.defaultMessage ?: ErrorCode.VALIDATION_FAILED.defaultMessage
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(
                ApiErrorResponse(
                    timestamp = Instant.now(),
                    status = HttpStatus.BAD_REQUEST.value(),
                    error = HttpStatus.BAD_REQUEST.reasonPhrase,
                    code = ErrorCode.VALIDATION_FAILED.code,
                    message = message,
                    path = request.requestURI,
                ),
            )
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleMessageNotReadable(
        request: HttpServletRequest,
    ): ResponseEntity<ApiErrorResponse> {
        val status = HttpStatus.BAD_REQUEST
        return ResponseEntity
            .status(status)
            .body(
                ApiErrorResponse(
                    timestamp = Instant.now(),
                    status = status.value(),
                    error = status.reasonPhrase,
                    code = ErrorCode.BAD_REQUEST.code,
                    message = "요청 본문 형식이 올바르지 않습니다.",
                    path = request.requestURI,
                ),
            )
    }

    @ExceptionHandler(Exception::class)
    fun handleUnhandledException(
        request: HttpServletRequest,
    ): ResponseEntity<ApiErrorResponse> {
        val status = HttpStatus.INTERNAL_SERVER_ERROR
        return ResponseEntity
            .status(status)
            .body(
                ApiErrorResponse(
                    timestamp = Instant.now(),
                    status = status.value(),
                    error = status.reasonPhrase,
                    code = ErrorCode.INTERNAL_SERVER_ERROR.code,
                    message = ErrorCode.INTERNAL_SERVER_ERROR.defaultMessage,
                    path = request.requestURI,
                ),
            )
    }
}
