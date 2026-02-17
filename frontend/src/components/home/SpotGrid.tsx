import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchSpotList } from '../../services/spotService';
import type { Spot } from '../../types';

gsap.registerPlugin(ScrollTrigger);

export const SpotGrid = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [spots, setSpots] = useState<Spot[]>([]);

    useEffect(() => {
        const loadSpots = async () => {
            const allSpots = await fetchSpotList();
            const nonFeaturedSpots = allSpots.filter(spot => !spot.isWeeklyFeatured).slice(0, 4);
            setSpots(nonFeaturedSpots);
        };
        loadSpots();
    }, []);

    useEffect(() => {
        if (spots.length === 0) return;

        const ctx = gsap.context(() => {
            // Title Reveal
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 90%'
                    }
                }
            );

            // Grid Items Reveal
            const items = gsap.utils.toArray<HTMLElement>('.scroll-item');
            items.forEach((item, index) => {
                gsap.fromTo(item,
                    { y: 100, opacity: 0 },
                    {
                        y: index % 2 === 1 ? 40 : 0, // Keep offset for right column
                        opacity: 1,
                        duration: 1.2,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        }
                    }
                );
            });

            // Parallax Images
            gsap.utils.toArray<HTMLElement>('.parallax-img').forEach(img => {
                gsap.to(img, {
                    yPercent: -15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [spots]);

    const handleSpotClick = (spotId: number) => {
        navigate(`/spots/${spotId}`);
    };

    return (
        <section ref={containerRef} className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-brand-black relative z-20 rounded-t-[3rem] -mt-10 border-t border-white/5">
            <div className="flex items-end justify-between mb-10 md:mb-14 px-2">
                <div ref={titleRef}>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">최근 등록</h3>
                    <span className="text-xs md:text-sm text-gray-500 tracking-wide block mt-1">스크롤하여 둘러보기</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {spots.map((spot, index) => (
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
                            <span className="text-[9px] md:text-[10px] text-brand-gold uppercase tracking-wider block mb-1">{spot.region}</span>
                            <h4 className="text-sm md:text-base text-white font-medium">{spot.name}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-32 md:h-40"></div>
        </section>
    );
};
