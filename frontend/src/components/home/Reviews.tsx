import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const nicknames = ['새벽의사진가772', '감성여행자302', '빛나는렌즈991', '추억사냥꾼555'];

export const Reviews = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [randomNicks, setRandomNicks] = useState<string[]>([]);

    useEffect(() => {
        // Randomize nicknames on mount to simulate dynamic content
        setRandomNicks(nicknames.sort(() => 0.5 - Math.random()).slice(0, 2));

        const ctx = gsap.context(() => {
            // Text Reveal
            gsap.fromTo('.reveal-text',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );

            // Cards Slide In
            gsap.utils.toArray<HTMLElement>('.review-card').forEach((card, i) => {
                gsap.to(card, {
                    x: 0,
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                    },
                    delay: i * 0.1
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-20 bg-[#0f0f0f]">
            <div className="px-6 mb-12">
                <h3 className="text-3xl font-serif text-white mb-2 reveal-text">Voices</h3>
                <p className="text-gray-500 text-sm reveal-text">Real-time anonymous feedback</p>
            </div>

            <div className="flex flex-col gap-4 px-4 overflow-hidden">
                <div className="review-card p-6 bg-[#1a1a1a] rounded-2xl border border-white/5 transform translate-x-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-yellow-700"></div>
                        <div>
                            <p className="text-white text-sm font-medium">{randomNicks[0] || 'Unknown'}</p>
                            <p className="text-xs text-gray-500">2 mins ago</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        "정말 숨겨진 명소네요. 물안개 피어오를 때 감동 그 자체였습니다."
                    </p>
                </div>

                <div className="review-card p-6 bg-[#1a1a1a] rounded-2xl border border-white/5 transform translate-x-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800"></div>
                        <div>
                            <p className="text-white text-sm font-medium">{randomNicks[1] || 'Unknown'}</p>
                            <p className="text-xs text-gray-500">15 mins ago</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        "주차 공간이 조금 협소합니다. 일찍 가시는 걸 추천해요."
                    </p>
                </div>
            </div>

            <div className="h-40 flex items-center justify-center">
                <p className="text-gray-600 text-sm">Fin.</p>
            </div>
        </section>
    );
};
