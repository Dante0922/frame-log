package com.framelog.backend.common.error

class BadRequestException(
    errorCode: ErrorCode,
    message: String = errorCode.defaultMessage,
) : ApiException(errorCode, message)
