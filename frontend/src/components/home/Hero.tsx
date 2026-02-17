import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
    onExplore: () => void;
}

export const Hero = ({ onExplore }: HeroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
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
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-end">
            {/* Background Parallax Wrapper */}
            <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90"
                    className="w-full h-full object-cover grayscale-[0.2]"
                    alt="Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full px-6 pb-32">
                <div className="overflow-hidden mb-2">
                    <div ref={badgeRef} className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em] transform translate-y-full">
                        Weekly Best
                    </div>
                </div>

                <div className="overflow-hidden mb-2">
                    <h2 ref={titleRef} className="text-5xl font-serif italic text-white leading-tight transform translate-y-full">
                        Mistik<br />Mountain
                    </h2>
                </div>

                <div className="overflow-hidden mb-8">
                    <p ref={descRef} className="text-gray-300 text-sm max-w-[80%] transform translate-y-full">
                        운해가 걷히는 찰나의 순간.<br />강원도의 숨겨진 비경을 만나보세요.
                    </p>
                </div>

                <div className="overflow-hidden">
                    <button
                        ref={btnRef}
                        onClick={onExplore}
                        className="px-6 py-3 border border-white/30 rounded-full text-sm text-white backdrop-blur-sm hover:bg-white hover:text-black transition-colors transform translate-y-full"
                    >
                        Explore Now
                    </button>
                </div>
            </div>
        </section>
    );
};
