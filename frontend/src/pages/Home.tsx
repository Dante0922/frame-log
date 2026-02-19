import { useEffect, useState } from 'react';
import { useLenis } from '../hooks/useLenis';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/home/Hero';
import { SpotGrid } from '../components/home/SpotGrid';
import { Reviews } from '../components/home/Reviews';
import { fetchSpotList, fetchWeeklyFeaturedSpot } from '../services/spotService';
import type { Spot } from '../types';

const HOME_SPOT_PAGE_SIZE = 5;

export const Home = () => {
  useLenis();

  const [featuredSpot, setFeaturedSpot] = useState<Spot | null>(null);
  const [homeSpots, setHomeSpots] = useState<Spot[]>([]);
  const [spotPage, setSpotPage] = useState(0);
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingGrid, setLoadingGrid] = useState(true);

  useEffect(() => {
    const loadFeaturedSpot = async () => {
      setLoadingHero(true);
      const spot = await fetchWeeklyFeaturedSpot();
      setFeaturedSpot(spot);
      setLoadingHero(false);
    };

    void loadFeaturedSpot();
  }, []);

  useEffect(() => {
    const loadHomeSpots = async () => {
      setLoadingGrid(true);

      const spots = await fetchSpotList({
        page: spotPage,
        size: HOME_SPOT_PAGE_SIZE,
      });

      if (spots.length > 0) {
        setHomeSpots(spots);
        setLoadingGrid(false);
        return;
      }

      if (spotPage !== 0) {
        const fallbackSpots = await fetchSpotList({ page: 0, size: HOME_SPOT_PAGE_SIZE });
        setHomeSpots(fallbackSpots);
        setSpotPage(0);
      } else {
        setHomeSpots([]);
      }

      setLoadingGrid(false);
    };

    void loadHomeSpots();
  }, [spotPage]);

  const handleRefresh = () => {
    setSpotPage((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-brand-black">
      <Header />
      <main>
        <Hero featuredSpot={featuredSpot} loading={loadingHero} />
        <SpotGrid
          spots={homeSpots}
          featuredSpotId={featuredSpot?.id}
          loading={loadingGrid}
          onRefresh={handleRefresh}
        />
        <Reviews />
      </main>
    </div>
  );
};
