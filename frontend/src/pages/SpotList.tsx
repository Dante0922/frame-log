import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from '../components/layout/Header';
import { fetchSpotListPage } from '../services/spotService';
import type { Spot } from '../types';

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 8;

export const SpotList = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [spots, setSpots] = useState<Spot[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialSpots = useCallback(async () => {
    setLoading(true);

    const response = await fetchSpotListPage({ page: 0, size: PAGE_SIZE });

    setSpots(response.spots);
    setPage(0);
    setHasMore(response.spots.length === PAGE_SIZE);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadInitialSpots();
  }, [loadInitialSpots]);

  const loadMoreSpots = useCallback(async () => {
    if (loading || loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);

    const nextPage = page + 1;
    const response = await fetchSpotListPage({ page: nextPage, size: PAGE_SIZE });

    setSpots((prev) => [...prev, ...response.spots]);
    setPage(nextPage);
    setHasMore(response.spots.length === PAGE_SIZE);
    setLoadingMore(false);
  }, [hasMore, loading, loadingMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          void loadMoreSpots();
        }
      },
      {
        root: null,
        rootMargin: '240px 0px',
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreSpots]);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Grid Items Reveal
      const items = gsap.utils.toArray<HTMLElement>('.spot-card');
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading, spots.length]);

  const handleSpotClick = (spotId: number) => {
    navigate(`/spots/${spotId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black">
      <Header />

      <main className="px-4 md:px-8 lg:px-12 pt-24 md:pt-28 pb-20 max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-3">
            전체 출사지
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            스크롤하면 8개씩 추가로 불러옵니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {spots.map((spot: Spot) => (
            <div
              key={spot.id}
              onClick={() => handleSpotClick(spot.id)}
              className="spot-card group relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-gray cursor-pointer"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={spot.heroImageUrl}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={spot.name}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {spot.isWeeklyFeatured && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-brand-gold text-brand-black text-xs font-bold tracking-wide rounded-full">
                  이번 주
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <span className="text-[10px] md:text-xs text-brand-gold uppercase tracking-wider block mb-2">
                  {spot.region}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-serif italic mb-2">
                  {spot.name}
                </h3>
                <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-3">
                  {spot.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs md:text-sm text-gray-400">
                  <span className="px-2 py-1 bg-white/10 rounded">
                    {spot.recommendedSeason}
                  </span>
                  <span className="px-2 py-1 bg-white/10 rounded">
                    {spot.recommendedTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={sentinelRef} className="h-14 flex items-center justify-center">
          {loadingMore && <span className="text-sm text-gray-400">추가 스팟 불러오는 중...</span>}
          {!loadingMore && !hasMore && (
            <span className="text-sm text-gray-500">모든 스팟을 불러왔습니다.</span>
          )}
        </div>
      </main>
    </div>
  );
};
