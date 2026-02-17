import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReviewForm } from '../components/review/ReviewForm';
import { getSpotById, saveReviewToLocal } from '../utils/mockData';
import type { Spot } from '../types';

export const ReviewWrite = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [spot, setSpot] = useState<Spot | null>(null);

  useEffect(() => {
    if (!id) return;

    const spotData = getSpotById(Number(id));
    if (!spotData) {
      navigate('/spots');
      return;
    }

    setSpot(spotData);
  }, [id, navigate]);

  const handleSubmit = (content: string, nickname: string) => {
    if (!id) return;

    // Save review to localStorage
    saveReviewToLocal({
      spotId: Number(id),
      nickname,
      content,
    });

    // Navigate back to detail page
    navigate(`/spots/${id}`, { replace: true });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!spot) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <div className="sticky top-0 z-50 px-6 py-5 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center">
          <button
            onClick={handleCancel}
            className="mr-4 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-serif italic text-white">
            Write a Review
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-3xl mx-auto">
        {/* Spot Info */}
        <div className="mb-8 md:mb-10">
          <span className="text-xs md:text-sm text-brand-gold uppercase tracking-wider block mb-2">
            {spot.region}
          </span>
          <h2 className="text-2xl md:text-4xl font-serif italic text-white mb-3 md:mb-4">
            {spot.name}
          </h2>
          <div className="aspect-[16/9] overflow-hidden rounded-xl">
            <img
              src={spot.heroImageUrl}
              alt={spot.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Review Form */}
        <ReviewForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};
