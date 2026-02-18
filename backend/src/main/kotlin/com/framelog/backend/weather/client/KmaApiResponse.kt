package com.framelog.backend.weather.client

import tools.jackson.databind.PropertyNamingStrategies
import tools.jackson.databind.annotation.JsonNaming

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class KmaApiResponse(
    val response: Response,
) {
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
    data class Response(
        val header: Header,
        val body: Body?,
    )

    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
    data class Header(
        val resultCode: String,
        val resultMsg: String,
    )

    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
    data class Body(
        val dataType: String,
        val items: Items?,
        val pageNo: Int,
        val numOfRows: Int,
        val totalCount: Int,
    )

    data class Items(
        val item: List<Item>,
    )

    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
    data class Item(
        val baseDate: String,
        val baseTime: String,
        val category: String,
        val fcstDate: String,
        val fcstTime: String,
        val fcstValue: String,
        val nx: Int,
        val ny: Int,
    )
}
