package com.framelog.backend.ai

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "app.ai.claude")
class ClaudeProperties {
    var apiKey: String = ""
    var model: String = "claude-sonnet-4-20250514"
    var maxTokens: Int = 1024
}
