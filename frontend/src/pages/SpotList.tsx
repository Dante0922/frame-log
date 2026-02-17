import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from '../components/layout/Header';
import { getAllSpots } from '../utils/mockData';
import type { Spot } from '../types';

gsap.registerPlugin(ScrollTrigger);

export const SpotList = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const spots = getAllSpots();

  useEffect(() => {
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
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSpotClick = (spotId: number) => {
    navigate(`/spots/${spotId}`);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black">
      <Header />

      <main className="px-4 md:px-8 lg:px-12 pt-24 md:pt-28 pb-20 max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-3">
            전체 출사지
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            전국의 출사지를 탐색해보세요
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
      </main>
    </div>
  );
};
