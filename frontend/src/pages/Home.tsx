import { useLenis } from '../hooks/useLenis';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/home/Hero';
import { SpotGrid } from '../components/home/SpotGrid';
import { Reviews } from '../components/home/Reviews';

export const Home = () => {
    useLenis();

    return (
        <div className="relative min-h-screen bg-brand-black">
            <Header />
            <main>
                <Hero />
                <SpotGrid />
                <Reviews />
            </main>
        </div>
    );
};
