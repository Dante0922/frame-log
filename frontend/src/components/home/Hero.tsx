import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWeeklyFeaturedSpot } from '../../utils/mockData';
import type { Spot } from '../../types';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const [featuredSpot, setFeaturedSpot] = useState<Spot | null>(null);

    useEffect(() => {
        const spot = getWeeklyFeaturedSpot();
        setFeaturedSpot(spot || null);
    }, []);

    useEffect(() => {
        if (!featuredSpot) return;

        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline({ delay: 0.5 });

            tl.to(badgeRef.current, { y: 0, duration: 1.5, ease: 'expo.out' })
                .to(titleRef.current, { y: 0, duration: 1.5, ease: 'expo.out' }, "-=1.3")
                .to(descRef.current, { y: 0, duration: 1.5, ease: 'expo.out' }, "-=1.3")
                .to(btnRef.current, { y: 0, duration: 1.5, ease: 'expo.out' }, "-=1.4");

            // Parallax Scroll
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [featuredSpot]);

    if (!featuredSpot) {
        return null;
    }

    const handleExplore = () => {
        navigate(`/spots/${featuredSpot.id}`);
    };

    // Split name by words for multi-line display
    const nameWords = featuredSpot.name.split(' ');
    const displayName = nameWords.length > 1
        ? nameWords.map((word, i) => <span key={i}>{word}{i < nameWords.length - 1 && <br />}</span>)
        : featuredSpot.name;

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-end">
            {/* Background Parallax Wrapper */}
            <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
                <img
                    src={featuredSpot.heroImageUrl}
                    className="w-full h-full object-cover grayscale-[0.2]"
                    alt={featuredSpot.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
                <div className="overflow-hidden mb-2">
                    <div ref={badgeRef} className="text-xs md:text-sm font-bold text-brand-gold uppercase tracking-[0.2em] transform translate-y-full">
                        Weekly Best
                    </div>
                </div>

                <div className="overflow-hidden mb-2 md:mb-3">
                    <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white leading-tight transform translate-y-full">
                        {displayName}
                    </h2>
                </div>

                <div className="overflow-hidden mb-8 md:mb-10">
                    <p ref={descRef} className="text-gray-300 text-sm md:text-base max-w-[90%] md:max-w-[70%] lg:max-w-[50%] transform translate-y-full">
                        {featuredSpot.description.split('.')[0]}.<br />
                        {featuredSpot.region}
                    </p>
                </div>

                <div className="overflow-hidden">
                    <button
                        ref={btnRef}
                        onClick={handleExplore}
                        className="px-6 py-3 md:px-8 md:py-4 border border-white/30 rounded-full text-sm md:text-base text-white backdrop-blur-sm hover:bg-white hover:text-black transition-colors transform translate-y-full"
                    >
                        Explore Now
                    </button>
                </div>
            </div>
        </section>
    );
};
