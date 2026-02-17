# frame-log 백엔드 API 명세서

프론트엔드 MVP 구현을 위해 필요한 REST API 목록입니다.

## 기본 정보

- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **인증**: 없음 (MVP 단계)

---

## API 목록

### 1. 금주의 추천 출사지 조회

홈 화면의 히어로 섹션에 표시될 이번 주 추천 출사지를 조회합니다.

**Endpoint**
```
GET /api/spots/weekly
```

**Request Parameters**
- 없음

**Response**
```json
{
  "id": 1,
  "name": "미스틱 마운틴",
  "description": "강원도의 깊은 산속, 새벽녘에만 허락되는 신비로운 풍경을 만나보세요...",
  "region": "강원도 평창",
  "address": "강원도 평창군 진부면 동산리 산1-1",
  "recommendedTime": "새벽 5-7시 (운해 발생 시)",
  "recommendedSeason": "가을, 겨울 (9월~2월)",
  "heroImageUrl": "https://example.com/images/spot1.jpg",
  "isWeeklyFeatured": true,
  "createdAt": "2026-02-10T00:00:00Z"
}
```

**Response Fields**
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | O | 출사지 ID |
| name | string | O | 출사지 이름 |
| description | string | O | 상세 설명 |
| region | string | O | 지역 (예: "강원도 평창") |
| address | string | O | 주소 |
| recommendedTime | string | O | 추천 시간대 |
| recommendedSeason | string | O | 추천 계절 |
| heroImageUrl | string | O | 대표 이미지 URL |
| isWeeklyFeatured | boolean | O | 금주 추천 여부 |
| createdAt | string | O | 생성일시 (ISO 8601) |

**Status Codes**
- `200 OK`: 성공
- `404 Not Found`: 추천 출사지가 없음

---

### 2. 출사지 목록 조회

전체 출사지 목록을 조회합니다.

**Endpoint**
```
GET /api/spots
```

**Request Parameters**
| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|---------|------|------|--------|------|
| page | number | X | 0 | 페이지 번호 (0부터 시작) |
| size | number | X | 20 | 페이지당 개수 |
| sort | string | X | createdAt,desc | 정렬 기준 |

**예시 Request**
```
GET /api/spots?page=0&size=10&sort=createdAt,desc
```

**Response**
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
    },
    {
      "id": 2,
      "name": "비밀의 숲",
      "description": "제주도의 숨겨진 숲길...",
      "region": "제주도",
      "address": "제주특별자치도 서귀포시 남원읍 한남리",
      "recommendedTime": "오전 9-11시 (빛이 들어올 때)",
      "recommendedSeason": "사계절",
      "heroImageUrl": "https://example.com/images/spot2.jpg",
      "isWeeklyFeatured": false,
      "createdAt": "2026-02-08T00:00:00Z"
    }
  ],
  "total": 5
}
```

**Response Fields**
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| spots | array | O | 출사지 배열 (Spot 객체) |
| total | number | O | 전체 출사지 개수 |

**Status Codes**
- `200 OK`: 성공

---

### 3. 출사지 상세 조회

특정 출사지의 상세 정보를 조회합니다.

**Endpoint**
```
GET /api/spots/{id}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | number | O | 출사지 ID |

**예시 Request**
```
GET /api/spots/1
```

**Response**
```json
{
  "id": 1,
  "name": "미스틱 마운틴",
  "description": "강원도의 깊은 산속, 새벽녘에만 허락되는 신비로운 풍경을 만나보세요. 운해 위로 솟은 봉우리가 마치 섬처럼 떠있는 듯한 장관을 연출합니다. 사진가들에게는 이미 입소문이 난 곳이지만, 여전히 고요함을 간직하고 있습니다.",
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
- `200 OK`: 성공
- `404 Not Found`: 출사지를 찾을 수 없음

---

### 4. 출사지 사진 목록 조회

특정 출사지의 갤러리 사진 목록을 조회합니다.

**Endpoint**
```
GET /api/spots/{id}/photos
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | number | O | 출사지 ID |

**예시 Request**
```
GET /api/spots/1/photos
```

**Response**
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
    },
    {
      "id": 2,
      "spotId": 1,
      "imageUrl": "https://example.com/photos/photo2.jpg",
      "caption": "일출과 함께하는 산정상",
      "sortOrder": 2,
      "createdAt": "2026-02-10T00:00:00Z"
    }
  ],
  "total": 2
}
```

**Response Fields - photos 배열**
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | O | 사진 ID |
| spotId | number | O | 출사지 ID |
| imageUrl | string | O | 이미지 URL |
| caption | string | X | 사진 설명 |
| sortOrder | number | O | 정렬 순서 |
| createdAt | string | O | 생성일시 (ISO 8601) |

**Status Codes**
- `200 OK`: 성공
- `404 Not Found`: 출사지를 찾을 수 없음

---

### 5. 리뷰 목록 조회

특정 출사지의 리뷰 목록을 조회합니다.

**Endpoint**
```
GET /api/spots/{id}/reviews
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | number | O | 출사지 ID |

**Request Parameters**
| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|---------|------|------|--------|------|
| page | number | X | 0 | 페이지 번호 |
| size | number | X | 20 | 페이지당 개수 |

**예시 Request**
```
GET /api/spots/1/reviews?page=0&size=10
```

**Response**
```json
{
  "reviews": [
    {
      "id": 1,
      "spotId": 1,
      "nickname": "새찍는사진사777",
      "content": "운해가 정말 환상적이었어요! 새벽 5시에 도착했는데 완벽한 타이밍이었습니다. 다만 길이 험하니 등산화 필수입니다.",
      "createdAt": "2026-02-12T08:30:00Z"
    },
    {
      "id": 2,
      "spotId": 1,
      "nickname": "풍경사냥꾼42",
      "content": "3번 방문 끝에 드디어 운해를 만났습니다. 날씨 운이 중요한 것 같아요.",
      "createdAt": "2026-02-11T14:20:00Z"
    }
  ],
  "total": 2
}
```

**Response Fields - reviews 배열**
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | O | 리뷰 ID |
| spotId | number | O | 출사지 ID |
| nickname | string | O | 익명 닉네임 (예: "새찍는사진사777") |
| content | string | O | 리뷰 내용 (최대 100자) |
| createdAt | string | O | 생성일시 (ISO 8601) |

**Status Codes**
- `200 OK`: 성공
- `404 Not Found`: 출사지를 찾을 수 없음

---

### 6. 리뷰 작성

출사지에 대한 익명 리뷰를 작성합니다.

**Endpoint**
```
POST /api/spots/{id}/reviews
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | number | O | 출사지 ID |

**Request Body**
```json
{
  "spotId": 1,
  "nickname": "새찍는사진사777",
  "content": "운해가 정말 환상적이었어요! 새벽 5시에 도착했는데 완벽한 타이밍이었습니다."
}
```

**Request Fields**
| 필드 | 타입 | 필수 | 제약사항 | 설명 |
|------|------|------|---------|------|
| spotId | number | O | - | 출사지 ID |
| nickname | string | O | - | 익명 닉네임 |
| content | string | O | 최대 100자 | 리뷰 내용 |

**Response**
```json
{
  "id": 10,
  "spotId": 1,
  "nickname": "새찍는사진사777",
  "content": "운해가 정말 환상적이었어요! 새벽 5시에 도착했는데 완벽한 타이밍이었습니다.",
  "createdAt": "2026-02-17T12:34:56Z"
}
```

**Status Codes**
- `201 Created`: 성공
- `400 Bad Request`: 잘못된 요청 (내용이 100자 초과 등)
- `404 Not Found`: 출사지를 찾을 수 없음

---

## 데이터베이스 스키마 참고

### spots 테이블
```sql
CREATE TABLE spots (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  region VARCHAR(50) NOT NULL,
  address VARCHAR(200) NOT NULL,
  recommended_time VARCHAR(100) NOT NULL,
  recommended_season VARCHAR(100) NOT NULL,
  hero_image_url VARCHAR(500) NOT NULL,
  is_weekly_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### spot_photos 테이블
```sql
CREATE TABLE spot_photos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  spot_id BIGINT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(200),
  sort_order INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (spot_id) REFERENCES spots(id)
);
```

### spot_reviews 테이블
```sql
CREATE TABLE spot_reviews (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  spot_id BIGINT NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  content VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (spot_id) REFERENCES spots(id)
);
```

---

## CORS 설정

프론트엔드가 백엔드 API를 호출할 수 있도록 CORS 설정이 필요합니다.

**Spring Boot 설정 예시:**
```kotlin
@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173", "http://125.129.226.88:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
    }
}
```

---

## 초기 데이터 (Seed Data)

서비스 테스트를 위한 최소 5개의 출사지 데이터를 삽입해주세요.
프론트엔드 Mock 데이터 참고: `frontend/src/utils/mockData.ts`

---

## 환경변수

**프론트엔드 (.env.development)**
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_MOCK_DATA=false
```

**백엔드 (application.yml)**
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/framelog
    username: root
    password: password
```

---

## 테스트 시나리오

### 1. 금주 추천 조회
```bash
curl http://localhost:8080/api/spots/weekly
```

### 2. 출사지 목록 조회
```bash
curl http://localhost:8080/api/spots?page=0&size=10
```

### 3. 출사지 상세 조회
```bash
curl http://localhost:8080/api/spots/1
```

### 4. 사진 목록 조회
```bash
curl http://localhost:8080/api/spots/1/photos
```

### 5. 리뷰 목록 조회
```bash
curl http://localhost:8080/api/spots/1/reviews
```

### 6. 리뷰 작성
```bash
curl -X POST http://localhost:8080/api/spots/1/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "spotId": 1,
    "nickname": "테스트사진가123",
    "content": "정말 좋은 곳이에요!"
  }'
```

---

## 참고 문서

- **서비스 기획서**: `/SERVICE_PLAN.md`
- **프론트엔드 타입 정의**: `/frontend/src/types/`
- **Mock 데이터**: `/frontend/src/utils/mockData.ts`
- **API 서비스**: `/frontend/src/services/`
