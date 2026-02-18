package com.framelog.backend.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.stereotype.Component

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers("/api/admin/**").authenticated()
                    .anyRequest().permitAll()
            }
            .httpBasic {}

        return http.build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun userDetailsService(
        adminProperties: AdminProperties,
        passwordEncoder: PasswordEncoder
    ): UserDetailsService {
        val admin = User.builder()
            .username(adminProperties.username)
            .password(passwordEncoder.encode(adminProperties.password))
            .roles("ADMIN")
            .build()

        return InMemoryUserDetailsManager(admin)
    }
}

@Component
@ConfigurationProperties(prefix = "app.admin")
class AdminProperties {
    var username: String = "admin"
    var password: String = "changeme"
}
