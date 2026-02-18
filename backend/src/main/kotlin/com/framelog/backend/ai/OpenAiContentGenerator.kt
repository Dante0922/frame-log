package com.framelog.backend.ai

import com.framelog.backend.common.error.ApiException
import com.framelog.backend.common.error.ErrorCode
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.web.client.RestClient
import org.springframework.web.multipart.MultipartFile
import tools.jackson.core.type.TypeReference
import tools.jackson.databind.ObjectMapper
import java.util.Base64

@Service
@ConditionalOnProperty(prefix = "app.ai", name = ["provider"], havingValue = "gpt", matchIfMissing = true)
class OpenAiContentGenerator(
    private val openAiProperties: OpenAiProperties,
    private val objectMapper: ObjectMapper,
) : AiContentGenerator {
    private val log = LoggerFactory.getLogger(javaClass)
    private val restClient = RestClient.create()

    override fun generateSpotMetadata(image: MultipartFile): GeneratedSpotMetadata {
        if (openAiProperties.apiKey.isBlank()) {
            throw ApiException(ErrorCode.AI_GENERATION_FAILED, "OpenAI API 키가 설정되지 않았습니다.")
        }

        val base64Image = Base64.getEncoder().encodeToString(image.bytes)
        val mediaType = image.contentType ?: "image/jpeg"
        val request = buildRequest(base64Image, mediaType)

        return try {
            val response = restClient.post()
                .uri("https://api.openai.com/v1/chat/completions")
                .header("Authorization", "Bearer ${openAiProperties.apiKey}")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(String::class.java)

            parseResponse(response ?: throw ApiException(ErrorCode.AI_GENERATION_FAILED, "응답이 없습니다."))
        } catch (e: Exception) {
            log.error("Failed to generate content with OpenAI API", e)
            throw ApiException(ErrorCode.AI_GENERATION_FAILED, "AI 분석 중 오류가 발생했습니다: ${e.message}")
        }
    }

    private fun buildRequest(base64Image: String, mediaType: String): Map<String, Any> {
        val prompt = """
            이 이미지를 분석하여 사진 촬영 명소로서의 정보를 JSON 형식으로 추출해주세요.

            다음 형식으로 응답해주세요:
            {
              "name": "장소명",
              "description": "장소에 대한 상세 설명 (200자 이내)",
              "region": "지역 (예: 서울, 부산, 제주 등)",
              "address": "주소",
              "recommendedTime": "추천 촬영 시간대 (예: 일출, 일몰, 오전, 오후, 야간 등)",
              "recommendedSeason": "추천 계절 (쉼표로 구분, 예: 봄,가을)",
              "seasonalHighlights": [
                {
                  "monthStart": 시작_월_숫자,
                  "monthEnd": 종료_월_숫자,
                  "title": "하이라이트 제목",
                  "description": "하이라이트 설명",
                  "tags": "태그1,태그2,태그3",
                  "priority": 우선순위_숫자(1-10)
                }
              ]
            }

            이미지에서 보이는 특징을 기반으로 정확하고 구체적인 정보를 제공해주세요.
            seasonalHighlights는 계절별로 특별한 볼거리가 있을 경우만 추가하고, 없으면 빈 배열로 하세요.
            JSON만 응답하고 다른 텍스트는 포함하지 마세요.
        """.trimIndent()

        return mapOf(
            "model" to openAiProperties.model,
            "max_tokens" to openAiProperties.maxTokens,
            "temperature" to openAiProperties.temperature,
            "messages" to listOf(
                mapOf(
                    "role" to "user",
                    "content" to listOf(
                        mapOf(
                            "type" to "text",
                            "text" to prompt,
                        ),
                        mapOf(
                            "type" to "image_url",
                            "image_url" to mapOf(
                                "url" to "data:$mediaType;base64,$base64Image",
                            ),
                        ),
                    ),
                ),
            ),
        )
    }

    private fun parseResponse(response: String): GeneratedSpotMetadata {
        try {
            val jsonResponse = objectMapper.readValue(
                response,
                object : TypeReference<Map<String, Any?>>() {},
            )

            val choices = jsonResponse["choices"] as? List<*>
                ?: throw ApiException(ErrorCode.AI_GENERATION_FAILED, "응답 형식이 올바르지 않습니다.")

            val firstChoice = choices.firstOrNull() as? Map<*, *>
                ?: throw ApiException(ErrorCode.AI_GENERATION_FAILED, "응답 결과가 비어있습니다.")

            val message = firstChoice["message"] as? Map<*, *>
                ?: throw ApiException(ErrorCode.AI_GENERATION_FAILED, "메시지 응답이 없습니다.")

            val contentValue = message["content"]
                ?: throw ApiException(ErrorCode.AI_GENERATION_FAILED, "텍스트 응답이 없습니다.")

            val text = when (contentValue) {
                is String -> contentValue
                is List<*> -> {
                    val textPart = contentValue.firstOrNull { part ->
                        (part as? Map<*, *>)?.get("type") == "text"
                    } as? Map<*, *>
                    textPart?.get("text") as? String
                }
                else -> null
            } ?: throw ApiException(ErrorCode.AI_GENERATION_FAILED, "텍스트 응답이 없습니다.")

            val cleanedText = text.trim().removePrefix("```json").removeSuffix("```").trim()

            return objectMapper.readValue(cleanedText, GeneratedSpotMetadata::class.java)
        } catch (e: Exception) {
            log.error("Failed to parse OpenAI response: $response", e)
            throw ApiException(ErrorCode.AI_GENERATION_FAILED, "AI 응답 파싱 실패: ${e.message}")
        }
    }
}
