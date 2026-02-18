# frame-log 백엔드 API 명세서 (v0.2)

프론트엔드 MVP와 연동되는 `frame-log` 백엔드 REST API 명세입니다.
현재 구현 기준 문서이며, 변경 시 이 문서를 먼저 갱신합니다.

## 기본 정보

- Base URL: `http://localhost:8080/api`
- Content-Type: `application/json`
- 인증: 없음 (MVP)

## 공통 규칙

### 1. 페이지네이션

- `page` 기본값: `0`
- `size` 기본값: `20`
- `size` 최대값: `100`
- `sort` 미지정 시:
  - 출사지 목록: `createdAt,desc`
  - 리뷰 목록: `createdAt,desc`

### 2. 에러 응답 포맷

모든 에러는 아래 구조를 따릅니다.

```json
{
  "timestamp": "2026-02-17T04:30:12.345Z",
  "status": 404,
  "error": "Not Found",
  "code": "SPOT_NOT_FOUND",
  "message": "출사지를 찾을 수 없습니다. id=999",
  "path": "/api/spots/999"
}
```

주요 에러 코드:
- `SPOT_NOT_FOUND`
- `WEEKLY_SPOT_NOT_FOUND`
- `VALIDATION_FAILED`
- `BAD_REQUEST`
- `INTERNAL_SERVER_ERROR`

---

## API 목록

### 1) 금주의 추천 출사지 조회

- Method/Path: `GET /api/spots/weekly`
- 설명: 홈 히어로 영역용 이번 주 추천 출사지 조회

**Response 200**
```json
{
  "id": 1,
  "name": "미스틱 마운틴",
  "description": "강원도의 깊은 산속...",
  "region": "강원도 평창",
  "address": "강원도 평창군 진부면 동산리 산1-1",
  "recommendedTime": "새벽 5-7시 (운해 발생 시)",
  "recommendedSeason": "가을, 겨울 (9월~2월)",
  "heroImageUrl": "https://example.com/images/spot1.jpg",
  "isWeeklyFeatured": true,
  "createdAt": "2026-02-10T00:00:00Z"
}
```

**Status Codes**
- `200 OK`
- `404 Not Found` (`WEEKLY_SPOT_NOT_FOUND`)

---

### 2) 출사지 목록 조회

- Method/Path: `GET /api/spots`
- 설명: 전체 출사지 목록 조회

**Query Parameters**
- `page` (number, optional)
- `size` (number, optional)
- `sort` (string, optional) 예: `createdAt,desc`

**Response 200**
```json
{
  "spots": [
    {
      "id": 1,
      "name": "미스틱 마운틴",
      "description": "강원도의 깊은 산속...",
      "region": "강원도 평창",
      "address": "강원도 평창군 진부면 동산리 산1-1",
      "recommendedTime": "새벽 5-7시 (운해 발생 시)",
      "recommendedSeason": "가을, 겨울 (9월~2월)",
      "heroImageUrl": "https://example.com/images/spot1.jpg",
      "isWeeklyFeatured": true,
      "createdAt": "2026-02-10T00:00:00Z"
    }
  ],
  "total": 5
}
```

**Status Codes**
- `200 OK`

---

### 3) 출사지 상세 조회

- Method/Path: `GET /api/spots/{id}`
- 설명: 특정 출사지 상세 조회

**Path Parameters**
- `id` (number, required)

**Response 200**
- Spot 객체 단건 반환 (필드는 `GET /api/spots/weekly` 응답과 동일)

**Status Codes**
- `200 OK`
- `404 Not Found` (`SPOT_NOT_FOUND`)

---

### 4) 출사지 사진 목록 조회

- Method/Path: `GET /api/spots/{id}/photos`
- 설명: 특정 출사지의 갤러리 사진 조회

**Path Parameters**
- `id` (number, required)

**Response 200**
```json
{
  "photos": [
    {
      "id": 1,
      "spotId": 1,
      "imageUrl": "https://example.com/photos/photo1.jpg",
      "caption": "운해가 펼쳐진 새벽 풍경",
      "sortOrder": 1,
      "createdAt": "2026-02-10T00:00:00Z"
    }
  ],
  "total": 3
}
```

**Status Codes**
- `200 OK`
- `404 Not Found` (`SPOT_NOT_FOUND`)

---

### 5) 리뷰 목록 조회

- Method/Path: `GET /api/spots/{id}/reviews`
- 설명: 특정 출사지 리뷰 목록 조회

**Path Parameters**
- `id` (number, required)

**Query Parameters**
- `page` (number, optional)
- `size` (number, optional)
- `sort` (string, optional) 예: `createdAt,desc`

**Response 200**
```json
{
  "reviews": [
    {
      "id": 1,
      "spotId": 1,
      "nickname": "새찍는사진사777",
      "content": "운해가 환상적이었어요.",
      "createdAt": "2026-02-12T08:30:00Z"
    }
  ],
  "total": 3
}
```

**Status Codes**
- `200 OK`
- `404 Not Found` (`SPOT_NOT_FOUND`)

---

### 6) 리뷰 작성

- Method/Path: `POST /api/spots/{id}/reviews`
- 설명: 익명 리뷰 생성

**Path Parameters**
- `id` (number, required)

**Request Body**
```json
{
  "nickname": "새찍는사진사777",
  "content": "운해가 정말 좋았어요!"
}
```

**Request Field Rules**
- `nickname`: 필수, 공백 불가, 최대 50자
- `content`: 필수, 공백 불가, 최대 100자

**Response 201**
```json
{
  "id": 10,
  "spotId": 1,
  "nickname": "새찍는사진사777",
  "content": "운해가 정말 좋았어요!",
  "createdAt": "2026-02-17T12:34:56Z"
}
```

**Status Codes**
- `201 Created`
- `400 Bad Request` (`VALIDATION_FAILED`)
- `404 Not Found` (`SPOT_NOT_FOUND`)

---

## 데이터베이스 스키마

Flyway 마이그레이션 파일:
- `backend/src/main/resources/db/migration/V1__create_spot_tables.sql`
- `backend/src/main/resources/db/migration/V2__seed_initial_data.sql`

핵심 테이블:
- `spots`
- `spot_photos`
- `spot_reviews`

## CORS

허용 Origin:
- 기본값: `http://localhost:5173`, `http://125.129.226.88:5173`
- 환경변수: `CORS_ALLOWED_ORIGINS` (콤마 구분)
  - 예시: `CORS_ALLOWED_ORIGINS=http://localhost:5173,https://frame-log.example.com`

설정 위치:
- `backend/src/main/kotlin/com/framelog/backend/config/WebConfig.kt`
- `backend/src/main/kotlin/com/framelog/backend/config/CorsProperties.kt`
- `backend/src/main/resources/application.yml`

## 실행 및 테스트

### 실행
```bash
cd backend
./gradlew bootRun
```

### 테스트
```bash
cd backend
./gradlew test
```

### Smoke Test
```bash
curl http://localhost:8080/api/spots/weekly
curl "http://localhost:8080/api/spots?page=0&size=10"
curl http://localhost:8080/api/spots/1
curl http://localhost:8080/api/spots/1/photos
curl http://localhost:8080/api/spots/1/reviews
curl -X POST http://localhost:8080/api/spots/1/reviews \
  -H "Content-Type: application/json" \
  -d '{"nickname":"테스트사진가123","content":"정말 좋은 곳이에요!"}'
```

## 참고

- 서비스 계획서: `SERVICE_PLAN.md`
- 프론트 타입: `frontend/src/types/`
- 프론트 서비스 레이어: `frontend/src/services/`
