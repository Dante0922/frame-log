package com.framelog.backend.ai

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "app.ai.openai")
class OpenAiProperties {
    var apiKey: String = ""
    var model: String = "gpt-4.1-mini"
    var maxTokens: Int = 1024
    var temperature: Double = 0.2
}
