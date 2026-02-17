import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const spots = [
    {
        id: 1,
        title: "Secret Forest",
        location: "Jeju Island",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
        offset: false
    },
    {
        id: 2,
        title: "Urban Nights",
        location: "Seoul",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80",
        offset: true
    },
    {
        id: 3,
        title: "Sunset Beach",
        location: "Busan",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        offset: false
    },
    {
        id: 4,
        title: "Old Palace",
        location: "Gyeongju",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
        offset: true
    }
];

export const SpotGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
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
    }, []);

    return (
        <section ref={containerRef} className="px-4 py-20 bg-brand-black relative z-20 rounded-t-[3rem] -mt-10 border-t border-white/5">
            <div className="flex items-end justify-between mb-10 px-2">
                <div ref={titleRef}>
                    <h3 className="text-2xl font-light text-white">New Arrivals</h3>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block mt-1">Scroll to explore</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {spots.map((spot) => (
                    <div
                        key={spot.id}
                        className={`scroll-item group relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-gray ${spot.offset ? 'translate-y-10' : ''} ${spot.id > 2 ? 'mt-6' : ''}`}
                    >
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src={spot.image}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 parallax-img"
                                alt={spot.title}
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-brand-black/80 to-transparent">
                            <span className="text-[10px] text-brand-gold uppercase tracking-wider block mb-1">{spot.location}</span>
                            <h4 className="text-white font-medium">{spot.title}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-40"></div>
        </section>
    );
};
