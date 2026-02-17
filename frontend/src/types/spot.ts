/**
 * Spot (출사지) 타입 정의
 */
export interface Spot {
  id: number;
  name: string;
  description: string;
  region: string;
  address: string;
  recommendedTime: string; // 예: "새벽 5-7시", "일몰 1시간 전"
  recommendedSeason: string; // 예: "봄, 가을", "사계절"
  heroImageUrl: string;
  isWeeklyFeatured: boolean;
  createdAt: string; // ISO 8601 format
}

/**
 * Spot 생성 요청 DTO
 */
export interface CreateSpotRequest {
  name: string;
  description: string;
  region: string;
  address: string;
  recommendedTime: string;
  recommendedSeason: string;
  heroImageUrl: string;
}

/**
 * Spot 목록 조회 응답
 */
export interface SpotListResponse {
  spots: Spot[];
  total: number;
}
