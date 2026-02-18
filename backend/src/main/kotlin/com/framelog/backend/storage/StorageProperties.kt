package com.framelog.backend.storage

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "app.storage")
class StorageProperties {
    var basePath: String = "./uploads"
    var baseUrl: String = "/api/images"
    var maxFileSizeMb: Long = 10
}
