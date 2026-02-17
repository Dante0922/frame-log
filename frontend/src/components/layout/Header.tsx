import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

export const Header = () => {
    const navigate = useNavigate();
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.to(logoRef.current, { opacity: 1, duration: 1 })
            .to(menuRef.current, { opacity: 1, duration: 1 }, "<");
    }, []);

    return (
        <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex justify-between items-center mix-blend-difference text-white">
            <h1
                ref={logoRef}
                onClick={() => navigate('/')}
                className="font-serif text-xl italic tracking-wider opacity-0 cursor-pointer"
            >
                frame-log
            </h1>
            <div
                ref={menuRef}
                onClick={() => navigate('/spots')}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 cursor-pointer hover:bg-white/10 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </div>
        </header>
    );
};
