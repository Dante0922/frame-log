package com.framelog.backend.common.error

class NotFoundException(
    errorCode: ErrorCode,
    message: String = errorCode.defaultMessage,
) : ApiException(errorCode, message)
