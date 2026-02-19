import axios, { type AxiosInstance, type AxiosError } from 'axios';

/**
 * Axios 인스턴스 설정
 */
const createApiClient = (): AxiosInstance => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // 필요시 인증 토큰 추가 등
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // 에러 처리 로직
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Network Error:', error.message);
      } else {
        console.error('Error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

/**
 * Mock 데이터 사용 여부 확인
 */
export const useMockData = (): boolean => {
  return import.meta.env.VITE_USE_MOCK_DATA === 'true';
};
