/**
 * SpotReview (출사지 리뷰) 타입 정의
 */
export interface SpotReview {
  id: number;
  spotId: number;
  nickname: string; // 익명 닉네임 (예: "새찍는사진사777")
  content: string;
  createdAt: string; // ISO 8601 format
}

/**
 * Review 작성 요청 DTO
 */
export interface CreateReviewRequest {
  spotId: number;
  nickname: string;
  content: string;
}

/**
 * Review 목록 조회 응답
 */
export interface ReviewListResponse {
  reviews: SpotReview[];
  total: number;
}
