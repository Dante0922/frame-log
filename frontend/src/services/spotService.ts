import { apiClient, useMockData } from '../utils/api';
import {
  getAllSpots,
  getWeeklyFeaturedSpot,
  getSpotById,
  getPhotosBySpotId
} from '../utils/mockData';
import type { Spot, SpotListResponse, SpotPhoto, SpotPhotoListResponse } from '../types';

interface FetchSpotListOptions {
  page?: number;
  size?: number;
}

/**
 * 금주의 추천 출사지 조회
 */
export const fetchWeeklyFeaturedSpot = async (): Promise<Spot | null> => {
  if (useMockData()) {
    // Mock 데이터 사용
    return Promise.resolve(getWeeklyFeaturedSpot() || null);
  }

  // 실제 API 호출
  try {
    const response = await apiClient.get<Spot>('/spots/weekly');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch weekly featured spot:', error);
    return null;
  }
};

/**
 * 전체 출사지 목록 조회
 */
export const fetchSpotList = async (
  options: FetchSpotListOptions = {},
): Promise<Spot[]> => {
  if (useMockData()) {
    // Mock 데이터 사용
    return Promise.resolve(getAllSpots());
  }

  const { page, size } = options;

  // 실제 API 호출
  try {
    const response = await apiClient.get<SpotListResponse>('/spots', {
      params: {
        ...(typeof page === 'number' ? { page } : {}),
        ...(typeof size === 'number' ? { size } : {}),
      },
    });
    return response.data.spots;
  } catch (error) {
    console.error('Failed to fetch spot list:', error);
    return [];
  }
};

/**
 * 출사지 상세 정보 조회
 */
export const fetchSpotDetail = async (id: number): Promise<Spot | null> => {
  if (useMockData()) {
    // Mock 데이터 사용
    return Promise.resolve(getSpotById(id) || null);
  }

  // 실제 API 호출
  try {
    const response = await apiClient.get<Spot>(`/spots/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch spot detail (id: ${id}):`, error);
    return null;
  }
};

/**
 * 출사지 사진 목록 조회
 */
export const fetchSpotPhotos = async (spotId: number): Promise<SpotPhoto[]> => {
  if (useMockData()) {
    // Mock 데이터 사용
    return Promise.resolve(getPhotosBySpotId(spotId));
  }

  // 실제 API 호출
  try {
    const response = await apiClient.get<SpotPhotoListResponse>(`/spots/${spotId}/photos`);
    return response.data.photos;
  } catch (error) {
    console.error(`Failed to fetch photos for spot ${spotId}:`, error);
    return [];
  }
};
