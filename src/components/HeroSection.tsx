import React, { useEffect, useRef } from 'react';
import { AppMode } from '../types';

interface HeroSectionProps {
  mode: AppMode;
  onExploreMenu: () => void;
  onBookTable: () => void;
  onScrollToStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  mode,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure video plays reliably on mount & handles autoplay restrictions
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented; video remains muted and ready
        });
      }
    }
  }, []);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-end justify-center pb-20 sm:pb-24 overflow-hidden bg-[#180309] font-['Raleway']">
      
      {/* Full Video Canvas using Dine-In sizzling.mp4 with no darkening overlays or particle canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#180309] select-none">
        <video
          ref={videoRef}
          src="/images/sizzling.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Organic Architectural Bottom Wave Curve Transition with Animated Glowing Gold Line */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden leading-none">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={`w-full h-8 sm:h-12 md:h-16 transition-colors duration-700 ${
            mode === 'night' ? 'text-[#180309]' : 'text-[#ffffff]'
          }`}
        >
          <defs>
            <linearGradient id="heroGoldShimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b37a2b" />
              <stop offset="25%" stopColor="#f7d688" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f7d688" />
              <stop offset="100%" stopColor="#b37a2b" />
              <animate
                attributeName="x1"
                from="-100%"
                to="100%"
                dur="4.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                from="0%"
                to="200%"
                dur="4.5s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <filter id="heroGoldGlow" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#d4a359" floodOpacity="0.85" />
            </filter>
          </defs>
          <path 
            d="M 0,55 C 380,95 860,10 1440,28 L 1440,100 L 0,100 Z" 
            fill="currentColor" 
          />
          <path 
            d="M 0,55 C 380,95 860,10 1440,28" 
            fill="none" 
            stroke="url(#heroGoldShimmerGrad)" 
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#heroGoldGlow)"
          />
        </svg>
      </div>

    </section>
  );
};
