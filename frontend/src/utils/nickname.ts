/**
 * 익명 닉네임 생성 및 관리 유틸리티
 */

const NICKNAME_STORAGE_KEY = 'frame-log-user-nickname';

/**
 * 닉네임 생성용 단어 목록
 */
const adjectives = [
  '새찍는', '풍경찾는', '빛찾는', '구도잡는', '순간잡는',
  '감성담는', '시간멈춘', '프레임속', '렌즈너머', '셔터누르는',
  '노을쫓는', '별헤는', '산타는', '바다보는', '하늘담는',
];

const nouns = [
  '사진사', '여행자', '탐험가', '기록가', '예술가',
  '몽상가', '관찰자', '수집가', '모험가', '창작자',
  '순례자', '방랑자', '추적자', '포수', '화가',
];

/**
 * 랜덤 익명 닉네임 생성
 * 형식: {형용사}{명사}{3자리 숫자}
 * 예: "새찍는사진사777", "풍경찾는여행자123"
 */
export const generateRandomNickname = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 900) + 100; // 100-999

  return `${adjective}${noun}${number}`;
};

/**
 * 로컬 스토리지에서 닉네임 조회
 */
export const getNickname = (): string | null => {
  return localStorage.getItem(NICKNAME_STORAGE_KEY);
};

/**
 * 로컬 스토리지에 닉네임 저장
 */
export const saveNickname = (nickname: string): void => {
  localStorage.setItem(NICKNAME_STORAGE_KEY, nickname);
};

/**
 * 닉네임 조회 또는 생성
 * 기존 닉네임이 있으면 반환, 없으면 새로 생성하여 저장 후 반환
 */
export const getOrCreateNickname = (): string => {
  const existing = getNickname();

  if (existing) {
    return existing;
  }

  const newNickname = generateRandomNickname();
  saveNickname(newNickname);
  return newNickname;
};

/**
 * 닉네임 초기화 (새로운 닉네임으로 변경)
 */
export const resetNickname = (): string => {
  const newNickname = generateRandomNickname();
  saveNickname(newNickname);
  return newNickname;
};

/**
 * 닉네임 삭제
 */
export const deleteNickname = (): void => {
  localStorage.removeItem(NICKNAME_STORAGE_KEY);
};
