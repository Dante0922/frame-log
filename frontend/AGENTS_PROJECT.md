# frame-log Frontend 프로젝트 규칙

이 문서는 frame-log 프론트엔드 프로젝트에 특화된 개발 규칙을 정의합니다.
공통 규칙은 상위 디렉토리의 `AGENTS.md`를 참조하세요.

---

## 1. 기술 스택 및 버전

### Core
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Vite**: 7.3.1
- **Node.js**: 18+ 권장

### 라우팅 및 상태 관리
- **React Router DOM**: 6.30.3
- 상태 관리: React Hooks (useState, useEffect 등)

### 스타일링
- **Tailwind CSS**: 3.4.17
- **PostCSS**: 8.5.6
- **Autoprefixer**: 10.4.24

### 애니메이션
- **GSAP**: 3.14.2 (ScrollTrigger 포함)
- **Lenis**: 1.0.42 (스무스 스크롤)

### HTTP 클라이언트
- **Axios**: 1.13.5

### 린팅 및 포맷팅
- **ESLint**: 9.39.1
- **TypeScript ESLint**: 8.48.0

---

## 2. 디렉토리 구조

```
frontend/
├── public/              # 정적 파일
├── src/
│   ├── assets/          # 이미지, SVG 등
│   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── home/        # 홈 페이지 전용 컴포넌트
│   │   ├── layout/      # 레이아웃 컴포넌트 (Header 등)
│   │   └── review/      # 리뷰 관련 컴포넌트
│   ├── hooks/           # Custom Hooks
│   ├── pages/           # 라우트 페이지 컴포넌트
│   ├── types/           # TypeScript 타입 정의
│   ├── utils/           # 유틸리티 함수
│   ├── App.tsx          # 루트 컴포넌트
│   ├── main.tsx         # 진입점
│   └── index.css        # 글로벌 스타일
├── .env.development.example  # 환경변수 템플릿
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### 파일 생성 규칙
- 컴포넌트: PascalCase (예: `SpotCard.tsx`)
- 유틸리티: camelCase (예: `api.ts`, `mockData.ts`)
- 타입 정의: camelCase (예: `spot.ts`, `review.ts`)
- Hooks: camelCase, `use` 접두사 (예: `useLenis.ts`)

---

## 3. 실행 명령

### 개발 서버
```bash
npm run dev
# Vite 개발 서버 시작 (http://localhost:5173)
```

### 빌드
```bash
npm run build
# TypeScript 컴파일 + Vite 프로덕션 빌드
```

### 린트
```bash
npm run lint
# ESLint 검사
```

### 프리뷰
```bash
npm run preview
# 빌드된 결과물을 로컬에서 미리보기
```

### 타입 체크
```bash
npx tsc --noEmit
# TypeScript 타입 체크만 수행 (빌드 X)
```

---

## 4. 커밋 Scope 목록

프론트엔드 관련 커밋은 `(front)` scope를 사용합니다.

**예시:**
```
feat(front): 출사지 상세 페이지 구현
fix(front): 리뷰 작성 시 닉네임 중복 저장 버그 수정
refactor(front): Hero 컴포넌트 Mock 데이터 연동
style(front): 반응형 디자인 Tailwind 클래스 적용
```

---

## 5. 코드 컨벤션

### TypeScript
- **타입 우선**: 가능한 모든 곳에 타입 명시
- **Interface vs Type**:
  - 데이터 모델: `interface` 사용
  - Union, Utility Types: `type` 사용
- **타입 import**: `import type { ... }` 사용 (verbatimModuleSyntax 대응)

### React 컴포넌트
- **함수형 컴포넌트** 사용
- **Named Export** 사용 (예: `export const SpotCard = () => {}`)
- Props 타입: 컴포넌트 상단에 interface 정의
  ```tsx
  interface SpotCardProps {
    spot: Spot;
    onClick: (id: number) => void;
  }

  export const SpotCard = ({ spot, onClick }: SpotCardProps) => {
    // ...
  };
  ```

### Hooks 사용 규칙
- `useState`, `useEffect` 등 기본 Hooks 활용
- Custom Hooks는 `hooks/` 디렉토리에 배치
- Hooks 순서: 공식 문서 규칙 준수

### 스타일링
- **Tailwind CSS** 유틸리티 클래스 사용
- 반응형: 모바일 우선, `md:`, `lg:` 브레이크포인트 활용
- 커스텀 색상: `tailwind.config.js`에 정의
  - `brand-black`, `brand-gold`, `brand-gray` 등

### 파일 구조
- 컴포넌트 파일: 하나의 주요 컴포넌트 export
- 관련 서브 컴포넌트는 같은 디렉토리에 배치 가능
- 100줄 이상 시 분리 고려

---

## 6. 리뷰 체크리스트

프론트엔드 코드 리뷰 시 확인 사항:

### 기능
- [ ] 요구사항 충족 여부
- [ ] 모든 라우트에서 정상 작동
- [ ] 에러 핸들링 적절성

### 타입 안정성
- [ ] TypeScript 컴파일 에러 없음 (`tsc --noEmit`)
- [ ] 타입 추론 가능한 곳에도 명시적 타입 작성

### 성능
- [ ] 불필요한 리렌더링 없음
- [ ] 이미지 최적화 (lazy loading, 적절한 포맷)
- [ ] GSAP 애니메이션 성능 확인

### 반응형
- [ ] 모바일, 태블릿, 데스크톱 테스트
- [ ] Tailwind 반응형 클래스 적용

### 스타일
- [ ] Tailwind 컨벤션 준수
- [ ] 일관된 spacing, 색상 사용

### 접근성
- [ ] 적절한 semantic HTML 사용
- [ ] 키보드 네비게이션 가능

---

## 7. 배포 기준

### 배포 전 필수 체크
1. **빌드 성공**: `npm run build` 에러 없이 완료
2. **타입 체크**: `npx tsc --noEmit` 통과
3. **린트**: `npm run lint` 주요 에러 없음
4. **수동 테스트**: 주요 UX 플로우 확인
   - 홈 → 출사지 목록 → 상세 → 리뷰 작성
   - 네비게이션 (로고, 메뉴)
   - 반응형 테스트 (모바일, 데스크톱)

### 환경변수 체크
- `.env.development` 파일 존재 여부
- `VITE_API_BASE_URL` 설정 확인
- 프로덕션 환경변수 별도 설정

---

## 8. API 연동 가이드

현재는 Mock 데이터를 사용하지만, 백엔드 API 연동 시 아래 가이드를 따릅니다.

### API 클라이언트
- `utils/api.ts`의 axios 인스턴스 사용
- 환경변수 `VITE_API_BASE_URL`로 Base URL 설정

### Mock → Real API 전환
1. `utils/mockData.ts` 함수를 API 호출로 변경
2. 타입 정의는 유지 (`types/` 디렉토리)
3. 로딩 상태, 에러 처리 추가

**예시:**
```typescript
// Before (Mock)
const spot = getSpotById(id);

// After (Real API)
const [spot, setSpot] = useState<Spot | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  apiClient.get(`/spots/${id}`)
    .then(res => setSpot(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, [id]);
```

---

## 9. 알려진 이슈 및 제한사항

### ESLint 경고
- `react-hooks/set-state-in-effect`: Mock 데이터 로딩 시 경고 발생
  - 실제 문제 없음, 무시 가능
  - 추후 React Query 등 도입 시 해결 예정

### Mock 데이터 제한
- 리뷰는 로컬스토리지에 저장 (새로고침 시 유지, 브라우저간 공유 X)
- 이미지 URL은 Unsplash 외부 링크 사용
- 백엔드 연동 시 교체 필요

---

## 10. 참고 문서

- [React 공식 문서](https://react.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/)
- [GSAP 공식 문서](https://gsap.com/docs/v3/)
- [Vite 공식 문서](https://vitejs.dev/)
- [frame-log SERVICE_PLAN.md](../SERVICE_PLAN.md)
