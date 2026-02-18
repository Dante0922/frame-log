package com.framelog.backend.config

import com.framelog.backend.common.ratelimit.RateLimitInterceptor
import com.framelog.backend.storage.StorageProperties
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig(
    private val corsProperties: CorsProperties,
    private val rateLimitInterceptor: RateLimitInterceptor,
    private val storageProperties: StorageProperties,
) : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        val allowedOrigins = corsProperties.allowedOrigins
            .map { it.trim() }
            .filter { it.isNotEmpty() }
            .toTypedArray()

        registry
            .addMapping("/api/**")
            .allowedOrigins(*allowedOrigins)
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
            .allowedHeaders("*")
    }

    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(rateLimitInterceptor)
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry
            .addResourceHandler("/api/images/**")
            .addResourceLocations("file:${storageProperties.basePath}/")
    }
}
