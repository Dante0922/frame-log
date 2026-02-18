package com.framelog.backend.storage

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "app.storage")
class StorageProperties {
    var basePath: String = "${System.getProperty("user.home")}/Desktop/Database/frame-log/storage"
    var baseUrl: String = "/api/images"
    var maxFileSizeMb: Long = 10
}
