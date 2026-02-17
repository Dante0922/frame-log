# frame-log Frontend

사진가를 위한 주간 출사지 추천 및 익명 리뷰 기반 탐색 서비스의 프론트엔드 애플리케이션입니다.

## 기술 스택

- **React 19.2.0** - UI 라이브러리
- **TypeScript 5.9** - 타입 안정성
- **Vite 7.3** - 빌드 도구
- **React Router 6.30** - 라우팅
- **Tailwind CSS 3.4** - 스타일링
- **GSAP 3.14** - 애니메이션
- **Lenis 1.0** - 스무스 스크롤
- **Axios 1.13** - HTTP 클라이언트

## 주요 기능

### MVP 구현 완료
- ✅ 금주의 추천 출사지 (홈 히어로 섹션)
- ✅ 출사지 목록 조회 (카드 리스트)
- ✅ 출사지 상세 정보 (위치, 추천 시간/계절, 갤러리, 리뷰)
- ✅ 익명 리뷰 작성 (회원가입 없이 랜덤 닉네임)
- ✅ 반응형 디자인 (모바일 우선, 태블릿, 데스크톱)

### 디렉토리 구조

```
src/
├── components/
│   ├── home/         # 홈 페이지 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트 (Header)
│   └── review/       # 리뷰 관련 컴포넌트
├── pages/            # 라우트 페이지
│   ├── Home.tsx      # 홈 (금주의 추천)
│   ├── SpotList.tsx  # 출사지 목록
│   ├── SpotDetail.tsx # 출사지 상세
│   └── ReviewWrite.tsx # 리뷰 작성
├── types/            # TypeScript 타입 정의
├── utils/            # 유틸리티 함수
│   ├── api.ts        # Axios 인스턴스
│   ├── mockData.ts   # Mock 데이터
│   └── nickname.ts   # 익명 닉네임 생성
└── hooks/            # Custom Hooks

```

## 시작하기

### 환경 설정

1. 환경변수 파일 생성:
```bash
cp .env.development.example .env.development
```

2. 의존성 설치:
```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 린트

```bash
npm run lint
```

### 프리뷰 (빌드 후 확인)

```bash
npm run preview
```

## 라우팅 구조

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Home | 금주의 추천 출사지 + 최신 출사지 |
| `/spots` | SpotList | 전체 출사지 목록 |
| `/spots/:id` | SpotDetail | 출사지 상세 정보 |
| `/spots/:id/review` | ReviewWrite | 리뷰 작성 |

## 데이터 관리

현재는 **Mock 데이터**를 사용하고 있습니다:
- `utils/mockData.ts`에 출사지, 사진, 리뷰 데이터 정의
- 리뷰는 로컬스토리지에 임시 저장
- 익명 닉네임은 로컬스토리지에 영구 저장

백엔드 API 연동 시 `utils/api.ts`의 axios 인스턴스를 활용합니다.

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 개발 가이드

- 커밋 메시지: `feat(front): 기능 설명` 형식 (한국어)
- 코드: 영어 (변수명, 함수명, 주석)
- 컴포넌트: 함수형 컴포넌트 + Hooks
- 스타일: Tailwind CSS 유틸리티 클래스

## 라이선스

MIT
