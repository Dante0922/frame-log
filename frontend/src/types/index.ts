/**
 * 타입 정의 통합 export
 */

// Spot 관련 타입
export type {
  Spot,
  CreateSpotRequest,
  SpotListResponse
} from './spot';

// Photo 관련 타입
export type {
  SpotPhoto,
  CreateSpotPhotoRequest,
  SpotPhotoListResponse
} from './photo';

// Review 관련 타입
export type {
  SpotReview,
  CreateReviewRequest,
  ReviewListResponse
} from './review';
