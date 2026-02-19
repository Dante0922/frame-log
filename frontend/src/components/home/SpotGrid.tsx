import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Spot } from '../../types';

gsap.registerPlugin(ScrollTrigger);

const BATCH_SIZE = 4;

interface SpotGridProps {
  spots: Spot[];
  featuredSpotId?: number;
  loading?: boolean;
  onRefresh?: () => void;
}

export const SpotGrid = ({
  spots,
  featuredSpotId,
  loading = false,
  onRefresh,
}: SpotGridProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [startIndex, setStartIndex] = useState(0);

  const spotPool = useMemo(
    () => spots.filter((spot) => spot.id !== featuredSpotId),
    [spots, featuredSpotId],
  );

  const canRefresh = spotPool.length > BATCH_SIZE;
  const normalizedStartIndex =
    canRefresh && spotPool.length > 0 ? startIndex % spotPool.length : 0;

  const visibleSpots = useMemo(() => {
    if (spotPool.length === 0) {
      return [];
    }

    if (!canRefresh) {
      return spotPool;
    }

    const endIndex = normalizedStartIndex + BATCH_SIZE;

    if (endIndex <= spotPool.length) {
      return spotPool.slice(normalizedStartIndex, endIndex);
    }

    const wrapSize = endIndex - spotPool.length;
    return [
      ...spotPool.slice(normalizedStartIndex),
      ...spotPool.slice(0, wrapSize),
    ];
  }, [spotPool, normalizedStartIndex, canRefresh]);

  useEffect(() => {
    if (visibleSpots.length === 0) return;

    const ctx = gsap.context(() => {
      // Title Reveal
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
          },
        },
      );

      // Grid Items Reveal
      const items = gsap.utils.toArray<HTMLElement>('.scroll-item');
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 100, opacity: 0 },
          {
            y: index % 2 === 1 ? 40 : 0,
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

      // Parallax Images
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [visibleSpots]);

  const handleSpotClick = (spotId: number) => {
    navigate(`/spots/${spotId}`);
  };

  const handleRefresh = () => {
    if (!canRefresh) {
      return;
    }

    setStartIndex((prev) => (prev + BATCH_SIZE) % spotPool.length);
    onRefresh?.();
  };

  return (
    <section
      ref={containerRef}
      className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-brand-black relative z-20 rounded-t-[3rem] -mt-10 border-t border-white/5"
    >
      <div className="flex items-end justify-between mb-10 md:mb-14 px-2">
        <div ref={titleRef}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            최근 등록
          </h3>
          <span className="text-xs md:text-sm text-gray-500 tracking-wide block mt-1">
            맨 아래 갱신 버튼으로 다른 스팟을 불러올 수 있어요
          </span>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[280px] flex items-center justify-center text-gray-400 text-sm md:text-base">
          스팟을 불러오는 중입니다...
        </div>
      ) : visibleSpots.length === 0 ? (
        <div className="min-h-[280px] flex items-center justify-center text-gray-500 text-sm md:text-base">
          표시할 스팟이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {visibleSpots.map((spot, index) => (
            <div
              key={spot.id}
              onClick={() => handleSpotClick(spot.id)}
              className={`scroll-item group relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl bg-brand-gray cursor-pointer ${index % 2 === 1 ? 'md:translate-y-10' : ''} ${index > 1 ? 'mt-4 md:mt-6' : ''}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={spot.heroImageUrl}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 parallax-img"
                  alt={spot.name}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-brand-black/80 to-transparent">
                <span className="text-[9px] md:text-[10px] text-brand-gold uppercase tracking-wider block mb-1">
                  {spot.region}
                </span>
                <h4 className="text-sm md:text-base text-white font-medium">
                  {spot.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-12 md:pt-14 flex justify-center">
        <button
          type="button"
          onClick={handleRefresh}
          disabled={!canRefresh || loading}
          className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 text-white text-sm md:text-base font-medium transition-colors hover:bg-white hover:text-brand-black disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {canRefresh ? '갱신해서 다른 스팟 보기' : '표시 가능한 스팟이 충분하지 않습니다'}
        </button>
      </div>
    </section>
  );
};
