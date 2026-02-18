package com.framelog.backend.common.ratelimit

import com.framelog.backend.common.error.ApiException
import com.framelog.backend.common.error.ErrorCode
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.servlet.HandlerInterceptor
import java.time.Instant
import java.util.concurrent.ConcurrentHashMap
import java.util.ArrayDeque

@Component
class RateLimitInterceptor(
    private val rateLimitProperties: RateLimitProperties,
) : HandlerInterceptor {
    private val requestTimestamps = ConcurrentHashMap<String, ArrayDeque<Instant>>()

    override fun preHandle(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any
    ): Boolean {
        if (request.method != "POST") {
            return true
        }

        val requestUri = request.requestURI
        if (!requestUri.matches(Regex("/api/spots/\\d+/reviews"))) {
            return true
        }

        val clientIp = getClientIp(request)
        val now = Instant.now()
        val oneMinuteAgo = now.minusSeconds(60)

        val timestamps = requestTimestamps.computeIfAbsent(clientIp) { ArrayDeque() }

        synchronized(timestamps) {
            while (timestamps.isNotEmpty() && timestamps.first().isBefore(oneMinuteAgo)) {
                timestamps.removeFirst()
            }

            if (timestamps.size >= rateLimitProperties.reviewMaxPerMinute) {
                throw ApiException(ErrorCode.RATE_LIMIT_EXCEEDED)
            }

            timestamps.addLast(now)
        }

        return true
    }

    private fun getClientIp(request: HttpServletRequest): String {
        val xForwardedFor = request.getHeader("X-Forwarded-For")
        return if (xForwardedFor.isNullOrBlank()) {
            request.remoteAddr
        } else {
            xForwardedFor.split(",").first().trim()
        }
    }
}
