package com.framelog.backend.weather

import com.framelog.backend.spot.SpotRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class WeatherController(
    private val weatherService: WeatherService,
    private val spotRepository: SpotRepository,
) {
    @GetMapping("/spots/{spotId}/weather")
    fun getSpotWeather(@PathVariable spotId: Long): WeatherResponse {
        return weatherService.getWeather(spotId)
    }

    @GetMapping("/weather/bulk")
    fun getBulkWeather(): Map<String, WeatherResponse?> {
        val allSpots = spotRepository.findAll()

        return allSpots.associate { spot ->
            spot.id.toString() to try {
                weatherService.getWeather(spot.id)
            } catch (e: Exception) {
                null
            }
        }
    }
}
