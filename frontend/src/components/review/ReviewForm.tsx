import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { getOrCreateNickname } from '../../utils/nickname';

interface ReviewFormProps {
  onSubmit: (content: string, nickname: string) => void;
  onCancel: () => void;
}

const MAX_LENGTH = 100;

export const ReviewForm = ({ onSubmit, onCancel }: ReviewFormProps) => {
  const [content, setContent] = useState('');
  const [nickname] = useState(getOrCreateNickname());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    if (content.length > MAX_LENGTH) {
      alert(`리뷰는 최대 ${MAX_LENGTH}자까지 작성할 수 있습니다.`);
      return;
    }

    onSubmit(content, nickname);
  };

  const remainingChars = MAX_LENGTH - content.length;

  return (
    <div ref={containerRef} className="p-5 md:p-8 bg-white/5 rounded-2xl border border-white/10">
      <form onSubmit={handleSubmit}>
        {/* Nickname Display */}
        <div className="mb-5 md:mb-6">
          <label className="text-xs md:text-sm text-gray-500 uppercase tracking-wider block mb-2">
            익명 닉네임
          </label>
          <div className="px-4 py-2 md:py-3 bg-white/5 rounded-lg border border-white/10">
            <span className="text-brand-gold font-medium text-sm md:text-base">{nickname}</span>
          </div>
        </div>

        {/* Review Content */}
        <div className="mb-5 md:mb-6">
          <label className="text-xs md:text-sm text-gray-500 uppercase tracking-wider block mb-2">
            리뷰 작성
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="이곳에서의 경험을 공유해주세요..."
            className="w-full h-32 md:h-40 px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white text-sm md:text-base placeholder-gray-500 resize-none focus:outline-none focus:border-brand-gold transition-colors"
            maxLength={MAX_LENGTH}
          />
          <div className="flex justify-end mt-1">
            <span
              className={`text-xs md:text-sm ${
                remainingChars < 20 ? 'text-brand-gold' : 'text-gray-500'
              }`}
            >
              {remainingChars}자 남음
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 md:gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 md:py-4 text-sm md:text-base bg-white/5 text-white rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 py-3 md:py-4 text-sm md:text-base bg-brand-gold text-brand-black font-bold rounded-full hover:bg-white transition-colors"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};
