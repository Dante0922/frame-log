import { useState } from 'react';
import { useLenis } from '../hooks/useLenis';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/home/Hero';
import { SpotGrid } from '../components/home/SpotGrid';
import { Reviews } from '../components/home/Reviews';
import { DetailOverlay } from '../components/home/DetailOverlay';

export const Home = () => {
    const lenisRef = useLenis();
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleExplore = () => {
        setIsDetailOpen(true);
        lenisRef.current?.stop();
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        lenisRef.current?.start();
    };

    return (
        <div className="relative min-h-screen bg-brand-black">
            <Header />
            <main>
                <Hero onExplore={handleExplore} />
                <SpotGrid />
                <Reviews />
            </main>
            <DetailOverlay isOpen={isDetailOpen} onClose={handleCloseDetail} />
        </div>
    );
};
