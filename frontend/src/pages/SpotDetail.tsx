import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { fetchSpotDetail, fetchSpotPhotos } from '../services/spotService';
import { fetchReviews } from '../services/reviewService';
import type { Spot, SpotPhoto, SpotReview } from '../types';

export const SpotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState<Spot | null>(null);
  const [photos, setPhotos] = useState<SpotPhoto[]>([]);
  const [reviews, setReviews] = useState<SpotReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpotDetail = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const spotData = await fetchSpotDetail(Number(id));
        if (!spotData) {
          navigate('/spots');
          return;
        }

        setSpot(spotData);
        const [photosData, reviewsData] = await Promise.all([
          fetchSpotPhotos(Number(id)),
          fetchReviews(Number(id)),
        ]);
        setPhotos(photosData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Failed to load spot detail:', error);
        navigate('/spots');
      } finally {
        setLoading(false);
      }
    };

    loadSpotDetail();
  }, [id, navigate]);

  useEffect(() => {
    if (!spot) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        '.hero-image',
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' }
      )
        .fromTo(
          '.detail-content',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
          '-=1'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [spot]);

  if (loading || !spot) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-white text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black">
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={spot.heroImageUrl}
          className="hero-image w-full h-full object-cover"
          alt={spot.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 z-20 hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {spot.isWeeklyFeatured && (
          <div className="absolute top-6 right-6 px-4 py-2 bg-brand-gold text-brand-black text-xs font-bold tracking-wide rounded-full">
            이번 주 추천
          </div>
        )}
      </div>

      {/* Content */}
      <div className="detail-content px-6 md:px-10 lg:px-16 py-10 md:py-14 bg-brand-black relative -mt-10 rounded-t-[2.5rem] max-w-7xl mx-auto">
        {/* Basic Info */}
        <div className="mb-10 md:mb-14">
          <span className="text-xs md:text-sm text-brand-gold uppercase tracking-wider block mb-2">
            {spot.region}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            {spot.name}
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
            {spot.description}
          </p>

          {/* Details */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-start">
              <span className="text-gray-500 text-sm md:text-base w-24 md:w-32 flex-shrink-0">
                위치
              </span>
              <span className="text-white text-sm md:text-base">{spot.address}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 text-sm md:text-base w-24 md:w-32 flex-shrink-0">
                추천 시간
              </span>
              <span className="text-white text-sm md:text-base">{spot.recommendedTime}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 text-sm md:text-base w-24 md:w-32 flex-shrink-0">
                추천 계절
              </span>
              <span className="text-white text-sm md:text-base">
                {spot.recommendedSeason}
              </span>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <div className="mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">갤러리</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-xl"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || spot.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            리뷰 ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm md:text-base text-center py-8 md:py-12">
              아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!
            </p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 md:p-6 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <span className="text-brand-gold text-sm md:text-base font-medium">
                      {review.nickname}
                    </span>
                    <span className="text-gray-500 text-xs md:text-sm">
                      {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Write Review Button */}
        <button
          onClick={() => navigate(`/spots/${spot.id}/review`)}
          className="w-full md:max-w-md md:mx-auto md:block py-4 md:py-5 bg-brand-gold text-brand-black font-bold tracking-wide text-sm md:text-base rounded-full hover:bg-white transition-colors"
        >
          리뷰 작성하기
        </button>
      </div>
    </div>
  );
};
