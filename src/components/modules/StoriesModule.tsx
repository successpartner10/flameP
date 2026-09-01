import React from 'react';
import { Sparkles, Heart, Play, ArrowRight } from 'lucide-react';
import { STORY_SLIDES } from '../../data/mockData';
import { RevealOnScroll } from '../RevealOnScroll';

export interface StoriesModuleProps {
  className?: string;
  onOpenStory?: (index: number) => void;
  showTitle?: boolean;
}

export const StoriesModule: React.FC<StoriesModuleProps> = ({
  className = '',
  onOpenStory,
  showTitle = true,
}) => {
  return (
    <section id="stories-module" className={`w-full text-[#f7e8ea] font-['Raleway'] ${className}`}>
      <div className="max-w-6xl mx-auto">
        
        {showTitle && (
          <RevealOnScroll direction="up" delay={0} duration={600} className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2d0713] border border-[#6b152d] text-xs font-bold uppercase tracking-[0.25em] text-[#f5d79e] mb-3 shadow-md">
              <Sparkles size={14} className="text-[#f3cf8a]" />
              <span>Heritage &amp; Flame Moments</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-wide">
              FLAME <span className="text-[#f3cf8a]">STORIES &amp; REELS</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#f3d2d8] mt-1 max-w-lg mx-auto">
              Behind the kitchen flames, live performances, and iconic Persian recipes.
            </p>
          </RevealOnScroll>
        )}

        {/* Stories Card Reel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORY_SLIDES.map((story, index) => (
            <div
              key={story.id}
              onClick={() => onOpenStory && onOpenStory(index)}
              className="group relative rounded-3xl overflow-hidden bg-[#1c040d] border border-[#521324] hover:border-[#d4a359] aspect-[9/16] shadow-xl cursor-pointer transition-all duration-300 flex flex-col justify-between p-4"
            >
              {/* Story Background Image */}
              <img
                src={story.image}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180309] via-black/30 to-black/60" />

              {/* Top Tag & Play Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  {story.category || 'LIVE'}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#d4a359] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={14} className="fill-black ml-0.5" />
                </div>
              </div>

              {/* Bottom Story Text */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-base font-black text-white group-hover:text-[#f3cf8a] transition-colors leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs text-[#f3d2d8] line-clamp-2 leading-relaxed">
                  {story.subtitle || story.tagline}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-[#f5d79e] font-bold">
                  <span>{story.actionText || 'EXPLORE'}</span>
                  <span className="flex items-center space-x-1 text-[#f3cf8a]">
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
