/**
 * SpotPhoto (출사지 사진) 타입 정의
 */
export interface SpotPhoto {
  id: number;
  spotId: number;
  imageUrl: string;
  caption?: string;
  sortOrder: number;
  createdAt: string; // ISO 8601 format
}

/**
 * SpotPhoto 생성 요청 DTO
 */
export interface CreateSpotPhotoRequest {
  spotId: number;
  imageUrl: string;
  caption?: string;
  sortOrder: number;
}

/**
 * SpotPhoto 목록 조회 응답
 */
export interface SpotPhotoListResponse {
  photos: SpotPhoto[];
  total: number;
}
