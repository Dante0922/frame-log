import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Spot } from '../../types';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  featuredSpot: Spot | null;
  loading?: boolean;
}

export const Hero = ({ featuredSpot, loading = false }: HeroProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!featuredSpot) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [badgeRef.current, titleRef.current, descRef.current, btnRef.current],
        { y: '100%' },
      );

      // Entrance Animation
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(badgeRef.current, { y: 0, duration: 1.2, ease: 'expo.out' })
        .to(titleRef.current, { y: 0, duration: 1.2, ease: 'expo.out' }, '-=1.0')
        .to(descRef.current, { y: 0, duration: 1.2, ease: 'expo.out' }, '-=1.0')
        .to(btnRef.current, { y: 0, duration: 1.2, ease: 'expo.out' }, '-=1.0');

      // Parallax Scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [featuredSpot]);

  if (loading || !featuredSpot) {
    return null;
  }

  const handleExplore = () => {
    navigate(`/spots/${featuredSpot.id}`);
  };

  const firstSentence =
    featuredSpot.description
      .split('.')
      .map((sentence) => sentence.trim())
      .find(Boolean) ?? featuredSpot.description;

  // Split name by words for multi-line display
  const nameWords = featuredSpot.name.split(' ');
  const displayName =
    nameWords.length > 1
      ? nameWords.map((word, i) => (
          <span key={i}>
            {word}
            {i < nameWords.length - 1 && <br />}
          </span>
        ))
      : featuredSpot.name;

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-end"
    >
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
          <div
            ref={badgeRef}
            className="text-xs md:text-sm font-bold text-brand-gold tracking-wide"
          >
            피처 스팟
          </div>
        </div>

        <div className="overflow-hidden mb-2 md:mb-3">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            {displayName}
          </h2>
        </div>

        <div className="overflow-hidden mb-8 md:mb-10">
          <p
            ref={descRef}
            className="text-gray-300 text-sm md:text-base max-w-[90%] md:max-w-[70%] lg:max-w-[50%]"
          >
            {firstSentence}
            <br />
            {featuredSpot.region}
          </p>
        </div>

        <div className="overflow-hidden">
          <button
            ref={btnRef}
            onClick={handleExplore}
            className="px-6 py-3 md:px-8 md:py-4 border border-white/30 rounded-full text-sm md:text-base font-medium text-white backdrop-blur-sm hover:bg-white hover:text-black transition-colors"
          >
            자세히 보기
          </button>
        </div>
      </div>
    </section>
  );
};
