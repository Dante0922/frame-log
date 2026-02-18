# frame-log Backend Guide

`frame-log` 백엔드(Spring Boot + Kotlin) 로컬 실행/테스트용 가이드입니다.

## 1. 요구사항

- Java 21
- MySQL 8+

## 2. 빠른 시작

1. MySQL에 DB 생성

```sql
CREATE DATABASE framelog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 백엔드 실행

```bash
cd backend
./gradlew bootRun
```

기본 실행 포트는 `8080`입니다.

### Docker MySQL 사용 시

루트(`frame-log/`)에 있는 `docker-compose.yml`은 MySQL 데이터를 아래 경로에 저장합니다.

- `~/Desktop/Database/frame-log/mysql`

이미지 스토리지는 아래 경로를 기본값으로 사용합니다.

- `~/Desktop/Database/frame-log/storage`

처음 한 번 디렉토리를 만들어두세요.

```bash
mkdir -p ~/Desktop/Database/frame-log/mysql
mkdir -p ~/Desktop/Database/frame-log/storage
```

MySQL 실행:

```bash
cd ..
docker compose up -d mysql
```

## 3. 환경변수

프로젝트 루트(`backend/`)의 `.env`를 자동으로 읽습니다.

초기 설정:

```bash
cd backend
cp .env.example .env
```

`.env`를 열어 로컬 값으로 수정하세요.

| 변수 | 기본값 | 설명 |
| --- | --- | --- |
| `SERVER_PORT` | `8080` | 서버 포트 |
| `DB_URL` | `jdbc:mysql://localhost:3306/framelog?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC` | DB 연결 URL |
| `DB_USERNAME` | `root` | DB 계정 |
| `DB_PASSWORD` | `password` | DB 비밀번호 |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | CORS 허용 Origin(콤마 구분) |
| `STORAGE_BASE_PATH` | `~/Desktop/Database/frame-log/storage` | 업로드 이미지 저장 경로 |
| `ADMIN_USERNAME` | `admin` | 관리자 Basic Auth 아이디 |
| `ADMIN_PASSWORD` | `changeme` | 관리자 Basic Auth 비밀번호 |
| `AI_PROVIDER` | `gpt` | AI 구현체 선택(`gpt` 또는 `claude`) |
| `KMA_SERVICE_KEY` | `빈 값` | 기상청 API 인증키 |
| `OPENAI_API_KEY` | `빈 값` | OpenAI API 인증키(`AI_PROVIDER=gpt`) |
| `CLAUDE_API_KEY` | `빈 값` | Claude API 인증키 |

예시:

```bash
cat > .env <<'EOF'
SERVER_PORT=8080
DB_URL=jdbc:mysql://localhost:3306/framelog?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=password
CORS_ALLOWED_ORIGINS=http://localhost:5173
STORAGE_BASE_PATH=/Users/darren/Desktop/Database/frame-log/storage
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme
AI_PROVIDER=gpt
KMA_SERVICE_KEY=발급받은_키
OPENAI_API_KEY=발급받은_키
# AI_PROVIDER=claude 로 바꾸면 Claude 구현체 사용
# CLAUDE_API_KEY=발급받은_키
EOF

./gradlew bootRun
```

## 4. 테스트

전체 테스트:

```bash
cd backend
./gradlew test
```

테스트는 `src/test/resources/application-test.yml` 기준으로 H2 in-memory DB를 사용합니다.

## 5. 빌드

```bash
cd backend
./gradlew build
```

산출물:

- `backend/build/libs/backend-0.0.1-SNAPSHOT.jar`

## 6. Smoke Test

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

## 7. 참고 문서

- API 명세: `../API_SPEC.md`
- 서비스 계획서: `../SERVICE_PLAN.md`
- Flyway 마이그레이션:
  - `src/main/resources/db/migration/V1__create_spot_tables.sql`
  - `src/main/resources/db/migration/V2__seed_initial_data.sql`
