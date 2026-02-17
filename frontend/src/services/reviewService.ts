import { apiClient, useMockData } from '../utils/api';
import { getAllReviews, saveReviewToLocal } from '../utils/mockData';
import type { SpotReview, ReviewListResponse, CreateReviewRequest } from '../types';

/**
 * 출사지 리뷰 목록 조회
 */
export const fetchReviews = async (spotId: number): Promise<SpotReview[]> => {
  if (useMockData()) {
    // Mock 데이터 사용
    return Promise.resolve(getAllReviews(spotId));
  }

  // 실제 API 호출
  try {
    const response = await apiClient.get<ReviewListResponse>(`/spots/${spotId}/reviews`);
    return response.data.reviews;
  } catch (error) {
    console.error(`Failed to fetch reviews for spot ${spotId}:`, error);
    return [];
  }
};

/**
 * 리뷰 작성
 */
export const createReview = async (
  spotId: number,
  nickname: string,
  content: string
): Promise<SpotReview | null> => {
  if (useMockData()) {
    // Mock 데이터 사용 (로컬스토리지 저장)
    const review = saveReviewToLocal({ spotId, nickname, content });
    return Promise.resolve(review);
  }

  // 실제 API 호출
  try {
    const requestData: CreateReviewRequest = {
      spotId,
      nickname,
      content,
    };
    const response = await apiClient.post<SpotReview>(`/spots/${spotId}/reviews`, requestData);
    return response.data;
  } catch (error) {
    console.error('Failed to create review:', error);
    return null;
  }
};
