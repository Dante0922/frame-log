import { useEffect, useMemo, useState } from 'react';
import { useLenis } from '../hooks/useLenis';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/home/Hero';
import { SpotGrid } from '../components/home/SpotGrid';
import { Reviews } from '../components/home/Reviews';
import { fetchSpotList } from '../services/spotService';
import type { Spot } from '../types';

export const Home = () => {
  useLenis();

  const [allSpots, setAllSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const loadSpots = async () => {
      setLoading(true);
      const spots = await fetchSpotList({ page: 0, size: 100 });
      setAllSpots(spots);
      setLoading(false);
    };

    void loadSpots();
  }, []);

  const featuredSpots = useMemo(
    () => allSpots.filter((spot) => spot.isWeeklyFeatured),
    [allSpots],
  );

  const normalizedFeaturedIndex =
    featuredSpots.length > 0 ? featuredIndex % featuredSpots.length : 0;

  const featuredSpot = useMemo(() => {
    if (featuredSpots.length > 0) {
      return featuredSpots[normalizedFeaturedIndex] ?? null;
    }

    return allSpots[0] ?? null;
  }, [allSpots, featuredSpots, normalizedFeaturedIndex]);

  const handleRefresh = () => {
    if (featuredSpots.length <= 1) {
      return;
    }

    setFeaturedIndex((prev) => (prev + 1) % featuredSpots.length);
  };

  return (
    <div className="relative min-h-screen bg-brand-black">
      <Header />
      <main>
        <Hero featuredSpot={featuredSpot} loading={loading} />
        <SpotGrid
          spots={allSpots}
          featuredSpotId={featuredSpot?.id}
          loading={loading}
          onRefresh={handleRefresh}
        />
        <Reviews />
      </main>
    </div>
  );
};
