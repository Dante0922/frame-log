package com.framelog.backend.spot

import com.framelog.backend.config.TestConfig
import com.framelog.backend.review.SpotReviewEntity
import com.framelog.backend.review.SpotReviewRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc
import org.springframework.context.annotation.Import
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@Import(TestConfig::class)
class SpotControllerIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var spotRepository: SpotRepository

    @Autowired
    private lateinit var spotReviewRepository: SpotReviewRepository

    @Test
    fun `금주의 추천 조회 성공`() {
        mockMvc.perform(get("/api/spots/weekly"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.isWeeklyFeatured").value(true))
    }

    @Test
    fun `없는 출사지 상세 조회 시 404 에러 응답 포맷 반환`() {
        mockMvc.perform(get("/api/spots/99999"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.timestamp").exists())
            .andExpect(jsonPath("$.status").value(404))
            .andExpect(jsonPath("$.error").value("Not Found"))
            .andExpect(jsonPath("$.code").value("SPOT_NOT_FOUND"))
            .andExpect(jsonPath("$.message").exists())
            .andExpect(jsonPath("$.path").value("/api/spots/99999"))
    }

    @Test
    fun `리뷰 작성 성공`() {
        val requestBody = """
            {
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
    fun `리뷰 작성 시 공백 content면 400 에러 응답 포맷 반환`() {
        val requestBody = """
            {
              "nickname": "테스트닉네임",
              "content": "   "
            }
        """.trimIndent()

        mockMvc.perform(
            post("/api/spots/1/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody),
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.timestamp").exists())
            .andExpect(jsonPath("$.status").value(400))
            .andExpect(jsonPath("$.error").value("Bad Request"))
            .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
            .andExpect(jsonPath("$.message").exists())
            .andExpect(jsonPath("$.path").value("/api/spots/1/reviews"))
    }

    @Test
    fun `리뷰 작성 시 nickname 공백이면 400`() {
        val requestBody = """
            {
              "nickname": "   ",
              "content": "테스트 리뷰입니다"
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

    @Test
    fun `리뷰 작성 시 nickname 50자 초과면 400`() {
        val tooLongNickname = "a".repeat(51)
        val requestBody = """
            {
              "nickname": "$tooLongNickname",
              "content": "테스트 리뷰입니다"
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

    @Test
    fun `리뷰 작성 시 100자 초과면 400`() {
        val tooLongContent = "a".repeat(101)
        val requestBody = """
            {
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

    @Test
    fun `출사지 목록 조회 시 size가 0이면 기본값 20으로 보정`() {
        val additionalSpots = (1..130).map { index ->
            SpotEntity(
                name = "테스트 출사지 $index",
                description = "테스트 설명 $index",
                region = "테스트 지역",
                address = "테스트 주소 $index",
                recommendedTime = "테스트 시간",
                recommendedSeason = "테스트 계절",
                heroImageUrl = "https://example.com/test-$index.jpg",
            )
        }
        spotRepository.saveAllAndFlush(additionalSpots)

        mockMvc.perform(get("/api/spots?page=0&size=0"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.spots.length()").value(20))
            .andExpect(jsonPath("$.total").value(135))
    }

    @Test
    fun `출사지 목록 조회 시 size가 100 초과면 최대 100으로 보정`() {
        val additionalSpots = (1..130).map { index ->
            SpotEntity(
                name = "테스트 출사지 $index",
                description = "테스트 설명 $index",
                region = "테스트 지역",
                address = "테스트 주소 $index",
                recommendedTime = "테스트 시간",
                recommendedSeason = "테스트 계절",
                heroImageUrl = "https://example.com/test-$index.jpg",
            )
        }
        spotRepository.saveAllAndFlush(additionalSpots)

        mockMvc.perform(get("/api/spots?page=0&size=101"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.spots.length()").value(100))
            .andExpect(jsonPath("$.total").value(135))
    }

    @Test
    fun `리뷰 목록 조회 시 size가 0이면 기본값 20으로 보정`() {
        val spot = spotRepository.findById(1L).orElseThrow()
        val additionalReviews = (1..130).map { index ->
            SpotReviewEntity(
                spot = spot,
                nickname = "테스트닉네임$index",
                content = "테스트리뷰$index",
            )
        }
        spotReviewRepository.saveAllAndFlush(additionalReviews)

        mockMvc.perform(get("/api/spots/1/reviews?page=0&size=0"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.reviews.length()").value(20))
            .andExpect(jsonPath("$.total").value(133))
    }

    @Test
    fun `리뷰 목록 조회 시 size가 100 초과면 최대 100으로 보정`() {
        val spot = spotRepository.findById(1L).orElseThrow()
        val additionalReviews = (1..130).map { index ->
            SpotReviewEntity(
                spot = spot,
                nickname = "테스트닉네임$index",
                content = "테스트리뷰$index",
            )
        }
        spotReviewRepository.saveAllAndFlush(additionalReviews)

        mockMvc.perform(get("/api/spots/1/reviews?page=0&size=101"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.reviews.length()").value(100))
            .andExpect(jsonPath("$.total").value(133))
    }
}
