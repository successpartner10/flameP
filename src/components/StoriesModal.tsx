import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, ShoppingBag, Calendar, Play, Pause } from 'lucide-react';
import { StorySlide, MenuItem } from '../types';
import { STORY_SLIDES, MENU_ITEMS } from '../data/mockData';

interface StoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlideIndex?: number;
  onOrderDish?: (item: MenuItem) => void;
  onOpenReserve?: () => void;
}

export const StoriesModal: React.FC<StoriesModalProps> = ({
  isOpen,
  onClose,
  initialSlideIndex = 0,
  onOrderDish,
  onOpenReserve,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(initialSlideIndex);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const slides = STORY_SLIDES;
  const currentSlide = slides[currentIdx] || slides[0];

  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(initialSlideIndex);
      setProgress(0);
    }
  }, [isOpen, initialSlideIndex]);

  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Go to next slide
          if (currentIdx < slides.length - 1) {
            setCurrentIdx((c) => c + 1);
            return 0;
          } else {
            // Reached end of stories
            onClose();
            return 100;
          }
        }
        return prev + 2; // ~5 seconds per slide
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, currentIdx, slides.length, onClose]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentIdx < slides.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleActionClick = () => {
    if (currentSlide.dishId && onOrderDish) {
      const foundDish = MENU_ITEMS.find((d) => d.id === currentSlide.dishId);
      if (foundDish) {
        onOrderDish(foundDish);
        onClose();
      }
    } else if (onOpenReserve) {
      onOpenReserve();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#180309]/95 flex items-center justify-center p-0 sm:p-4 backdrop-blur-xl select-none animate-in fade-in duration-200">
      
      {/* Story Mobile Device Frame / Container */}
      <div className="relative w-full h-full sm:h-[88vh] sm:max-w-md bg-[#18050c] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover contrast-[1.03]"
          />
        </div>

        {/* Top Interactive Bar: Progress Indicators & Controls */}
        <div className="relative z-20 p-4 space-y-3">
          {/* Progress Segment Bars */}
          <div className="flex items-center space-x-1.5 w-full">
            {slides.map((_, idx) => (
              <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
                  style={{
                    width: idx < currentIdx ? '100%' : idx === currentIdx ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Profile Header & Close */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#4a0e1e] border border-[#d4a359] p-0.5 flex items-center justify-center">
                <span className="font-serif text-[#d4a359] text-xs font-bold">FLAME</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-semibold text-white tracking-wide">Flame International</h4>
                  <span className="px-1.5 py-0.2 bg-[#2e7d32] text-white text-[8px] font-mono font-bold rounded">LIVE</span>
                </div>
                <p className="text-[10px] text-white/70 font-mono">Santa Monica Blvd, LA • 2h ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-full bg-[#2d0713]/80 text-white hover:bg-[#430b1c] backdrop-blur-sm"
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-[#2d0713]/80 text-white hover:bg-[#430b1c] backdrop-blur-sm"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#2d0713]/80 text-white hover:bg-[#430b1c] backdrop-blur-sm"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Invisible Tap Zones for Next/Prev */}
        <div className="absolute inset-y-20 inset-x-0 z-10 grid grid-cols-3">
          <div onClick={handlePrev} className="h-full cursor-pointer" />
          <div onClick={() => setIsPaused(!isPaused)} className="h-full cursor-pointer" />
          <div onClick={handleNext} className="h-full cursor-pointer" />
        </div>

        {/* Bottom Story Story Details & Direct Action CTA */}
        <div className="relative z-20 p-4 sm:p-5">
          <div className="bg-black/25 backdrop-blur-[3px] rounded-2xl p-4 sm:p-5 border border-white/20 shadow-xl space-y-3.5">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f5d79e] px-2.5 py-0.5 rounded-full bg-black/30 border border-white/20 backdrop-blur-sm inline-block font-bold">
                {currentSlide.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {currentSlide.title}
              </h3>
              <p className="text-sm text-[#f5f1ea]/90 leading-relaxed font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {currentSlide.tagline}
              </p>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={handleActionClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#d4a359] via-[#e2b775] to-[#b8863b] text-[#180309] font-bold text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              {currentSlide.dishId ? <ShoppingBag size={16} /> : <Calendar size={16} />}
              <span>{currentSlide.actionText || 'Explore Dish'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Desktop side navigation arrows */}
      <div className="hidden sm:flex items-center justify-between absolute inset-x-12 pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  );
};
