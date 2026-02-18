package com.framelog.backend.weather.client

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "app.weather.kma")
class KmaWeatherProperties {
    var serviceKey: String = ""
    var baseUrl: String = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0"
}
