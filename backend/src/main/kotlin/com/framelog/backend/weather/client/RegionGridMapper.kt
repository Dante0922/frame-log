package com.framelog.backend.weather.client

object RegionGridMapper {
    private val regionMapping = mapOf(
        "평창" to GridCoordinate(70, 121),
        "서귀포" to GridCoordinate(52, 38),
        "제주" to GridCoordinate(52, 38),
        "서울" to GridCoordinate(60, 127),
        "부산" to GridCoordinate(98, 76),
        "경주" to GridCoordinate(89, 91),
        "강릉" to GridCoordinate(92, 131),
        "속초" to GridCoordinate(87, 141),
        "춘천" to GridCoordinate(73, 134),
        "원주" to GridCoordinate(76, 122),
        "인천" to GridCoordinate(55, 124),
        "수원" to GridCoordinate(60, 121),
        "대전" to GridCoordinate(67, 100),
        "대구" to GridCoordinate(89, 90),
        "울산" to GridCoordinate(102, 84),
        "광주" to GridCoordinate(58, 74),
        "전주" to GridCoordinate(63, 89),
    )

    fun getGridCoordinate(region: String): GridCoordinate? {
        return regionMapping.entries
            .firstOrNull { region.contains(it.key) }
            ?.value
    }
}
