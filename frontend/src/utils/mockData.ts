import type { Spot, SpotPhoto, SpotReview } from '../types';

/**
 * Mock Spot 데이터
 */
export const mockSpots: Spot[] = [
  {
    id: 1,
    name: '미스틱 마운틴',
    description: '강원도의 깊은 산속, 새벽녘에만 허락되는 신비로운 풍경을 만나보세요. 운해 위로 솟은 봉우리가 마치 섬처럼 떠있는 듯한 장관을 연출합니다. 사진가들에게는 이미 입소문이 난 곳이지만, 여전히 고요함을 간직하고 있습니다.',
    region: '강원도 평창',
    address: '강원도 평창군 진부면 동산리 산1-1',
    recommendedTime: '새벽 5-7시 (운해 발생 시)',
    recommendedSeason: '가을, 겨울 (9월~2월)',
    heroImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90',
    isWeeklyFeatured: true,
    createdAt: '2026-02-10T00:00:00Z',
  },
  {
    id: 2,
    name: '비밀의 숲',
    description: '제주도의 숨겨진 숲길. 햇살이 나무 사이로 스며드는 모습이 환상적입니다. 비가 온 직후 방문하면 이끼와 양치류가 더욱 푸르게 빛나는 것을 볼 수 있습니다.',
    region: '제주도',
    address: '제주특별자치도 서귀포시 남원읍 한남리',
    recommendedTime: '오전 9-11시 (빛이 들어올 때)',
    recommendedSeason: '사계절',
    heroImageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=90',
    isWeeklyFeatured: false,
    createdAt: '2026-02-08T00:00:00Z',
  },
  {
    id: 3,
    name: '도심 야경',
    description: '서울의 밤 풍경을 담기 좋은 전망대. 도심의 불빛과 한강이 어우러져 멋진 야경을 만들어냅니다. 일몰 직후 블루아워 시간대가 특히 추천됩니다.',
    region: '서울',
    address: '서울특별시 용산구 이태원로 294',
    recommendedTime: '일몰 후 30분-1시간 (블루아워)',
    recommendedSeason: '사계절',
    heroImageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=90',
    isWeeklyFeatured: false,
    createdAt: '2026-02-05T00:00:00Z',
  },
  {
    id: 4,
    name: '일몰 해변',
    description: '부산의 유명한 일몰 명소. 바다와 하늘이 붉게 물드는 순간을 포착할 수 있습니다. 파도가 바위에 부딪히는 순간을 장노출로 담으면 몽환적인 느낌을 연출할 수 있습니다.',
    region: '부산',
    address: '부산광역시 사하구 다대동 산180-1',
    recommendedTime: '일몰 1시간 전 ~ 일몰 후',
    recommendedSeason: '봄, 가을',
    heroImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90',
    isWeeklyFeatured: false,
    createdAt: '2026-02-03T00:00:00Z',
  },
  {
    id: 5,
    name: '고궁의 사계',
    description: '경주의 고즈넉한 궁궐터. 한국의 전통 건축미와 자연이 조화를 이루는 곳입니다. 단풍이 드는 가을이나 눈이 내린 겨울에 특히 아름답습니다.',
    region: '경주',
    address: '경상북도 경주시 인왕동 76-1',
    recommendedTime: '오전 8-10시, 오후 4-6시',
    recommendedSeason: '봄, 가을',
    heroImageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=90',
    isWeeklyFeatured: false,
    createdAt: '2026-02-01T00:00:00Z',
  },
];

/**
 * Mock SpotPhoto 데이터
 */
export const mockSpotPhotos: SpotPhoto[] = [
  // Mistik Mountain photos
  {
    id: 1,
    spotId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=90',
    caption: '운해가 펼쳐진 새벽 풍경',
    sortOrder: 1,
    createdAt: '2026-02-10T00:00:00Z',
  },
  {
    id: 2,
    spotId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=90',
    caption: '일출과 함께하는 산정상',
    sortOrder: 2,
    createdAt: '2026-02-10T00:00:00Z',
  },
  {
    id: 3,
    spotId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=90',
    caption: '구름 사이로 보이는 봉우리',
    sortOrder: 3,
    createdAt: '2026-02-10T00:00:00Z',
  },
  // Secret Forest photos
  {
    id: 4,
    spotId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=90',
    caption: '햇살이 스며드는 숲길',
    sortOrder: 1,
    createdAt: '2026-02-08T00:00:00Z',
  },
  {
    id: 5,
    spotId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=90',
    caption: '이끼 낀 바위와 나무',
    sortOrder: 2,
    createdAt: '2026-02-08T00:00:00Z',
  },
];

/**
 * Mock SpotReview 데이터
 */
export const mockReviews: SpotReview[] = [
  {
    id: 1,
    spotId: 1,
    nickname: '새찍는사진사777',
    content: '운해가 정말 환상적이었어요! 새벽 5시에 도착했는데 완벽한 타이밍이었습니다. 다만 길이 험하니 등산화 필수입니다.',
    createdAt: '2026-02-12T08:30:00Z',
  },
  {
    id: 2,
    spotId: 1,
    nickname: '풍경사냥꾼42',
    content: '3번 방문 끝에 드디어 운해를 만났습니다. 날씨 운이 중요한 것 같아요. 주차는 마을 입구에 하고 30분 정도 걸어야 합니다.',
    createdAt: '2026-02-11T14:20:00Z',
  },
  {
    id: 3,
    spotId: 1,
    nickname: '클릭마스터999',
    content: '겨울에 갔는데 눈 덮인 풍경도 정말 좋았어요. 운해는 못 봤지만 충분히 만족스러웠습니다.',
    createdAt: '2026-02-10T19:45:00Z',
  },
  {
    id: 4,
    spotId: 2,
    nickname: '제주탐험가123',
    content: '숲길이 정말 아름답네요. 비 온 다음날 방문 추천드려요. 이끼가 더 푸르게 보입니다.',
    createdAt: '2026-02-09T11:15:00Z',
  },
  {
    id: 5,
    spotId: 3,
    nickname: '야경러버555',
    content: '서울 야경을 담기 최고의 장소입니다. 삼각대 필수이고, 주말엔 사람이 많으니 평일 방문을 추천합니다.',
    createdAt: '2026-02-08T21:30:00Z',
  },
];

/**
 * Mock 데이터 조회 함수들
 */

export const getWeeklyFeaturedSpot = (): Spot | undefined => {
  return mockSpots.find(spot => spot.isWeeklyFeatured);
};

export const getAllSpots = (): Spot[] => {
  return mockSpots;
};

export const getSpotById = (id: number): Spot | undefined => {
  return mockSpots.find(spot => spot.id === id);
};

export const getPhotosBySpotId = (spotId: number): SpotPhoto[] => {
  return mockSpotPhotos.filter(photo => photo.spotId === spotId);
};

export const getReviewsBySpotId = (spotId: number): SpotReview[] => {
  return mockReviews.filter(review => review.spotId === spotId);
};

/**
 * 로컬 스토리지에 리뷰 임시 저장
 */
const REVIEWS_STORAGE_KEY = 'frame-log-reviews';

export const saveReviewToLocal = (review: Omit<SpotReview, 'id' | 'createdAt'>): SpotReview => {
  const existingReviews = getLocalReviews();
  const newReview: SpotReview = {
    ...review,
    id: Date.now(), // 임시 ID
    createdAt: new Date().toISOString(),
  };

  const updatedReviews = [...existingReviews, newReview];
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));

  return newReview;
};

export const getLocalReviews = (): SpotReview[] => {
  const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getAllReviews = (spotId?: number): SpotReview[] => {
  const mockData = spotId ? getReviewsBySpotId(spotId) : mockReviews;
  const localData = getLocalReviews();
  const combined = [...mockData, ...localData];

  // spotId로 필터링
  if (spotId) {
    return combined.filter(review => review.spotId === spotId);
  }

  return combined;
};
