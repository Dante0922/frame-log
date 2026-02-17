package com.framelog.backend.spot

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SpotControllerIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `금주의 추천 조회 성공`() {
        mockMvc.perform(get("/api/spots/weekly"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.isWeeklyFeatured").value(true))
    }

    @Test
    fun `없는 출사지 상세 조회 시 404`() {
        mockMvc.perform(get("/api/spots/99999"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.code").value("SPOT_NOT_FOUND"))
    }

    @Test
    fun `리뷰 작성 성공`() {
        val requestBody = """
            {
              "spotId": 1,
              "nickname": "테스트닉네임",
              "content": "테스트 리뷰입니다"
            }
        """.trimIndent()

        mockMvc.perform(
            post("/api/spots/1/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody),
        )
            .andExpect(status().isCreated)
            .andExpect(jsonPath("$.spotId").value(1))
            .andExpect(jsonPath("$.nickname").value("테스트닉네임"))
            .andExpect(jsonPath("$.content").value("테스트 리뷰입니다"))
    }

    @Test
    fun `리뷰 작성 시 path와 body의 spotId 불일치면 400`() {
        val requestBody = """
            {
              "spotId": 2,
              "nickname": "테스트닉네임",
              "content": "테스트 리뷰입니다"
            }
        """.trimIndent()

        mockMvc.perform(
            post("/api/spots/1/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody),
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.code").value("SPOT_ID_MISMATCH"))
    }

    @Test
    fun `리뷰 작성 시 100자 초과면 400`() {
        val tooLongContent = "a".repeat(101)
        val requestBody = """
            {
              "spotId": 1,
              "nickname": "테스트닉네임",
              "content": "$tooLongContent"
            }
        """.trimIndent()

        mockMvc.perform(
            post("/api/spots/1/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody),
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
    }
}
