

interface DetailOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DetailOverlay = ({ isOpen, onClose }: DetailOverlayProps) => {
    return (
        <div
            className={`fixed inset-0 z-[100] bg-brand-black transition-transform duration-[1.2s] ease-expo-out will-change-transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="relative h-1/2 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90"
                    className={`w-full h-full object-cover origin-center transition-transform duration-[2s] ${isOpen ? 'scale-100' : 'scale-125'}`}
                    alt="Detail Hero"
                />
                <button
                    onClick={onClose}
                    className="absolute top-6 left-6 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 z-20 hover:scale-110 transition-transform"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div className="px-6 py-10 bg-brand-black min-h-[50vh] relative -mt-10 rounded-t-[2.5rem]">
                <h2 className="text-4xl font-serif italic text-white mb-6">Mistik<br />Mountain</h2>
                <div className="text-gray-400 leading-loose text-sm mb-8">
                    <p className="mb-4">
                        강원도의 깊은 산속, 새벽녘에만 허락되는 신비로운 풍경을 만나보세요.
                        운해 위로 솟은 봉우리가 마치 섬처럼 떠있는 듯한 장관을 연출합니다.
                    </p>
                    <p>
                        사진가들에게는 이미 입소문이 난 곳이지만, 여전히 고요함을 간직하고 있습니다.
                    </p>
                </div>
                <button className="w-full py-5 bg-brand-gold text-brand-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-colors">
                    Write a Review
                </button>
            </div>
        </div>
    );
};
