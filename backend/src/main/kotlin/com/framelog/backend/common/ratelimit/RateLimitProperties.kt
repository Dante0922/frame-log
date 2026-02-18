package com.framelog.backend.common.ratelimit

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "app.rate-limit")
class RateLimitProperties {
    var reviewMaxPerMinute: Int = 5
}
