import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface ReserveSpaceSectionProps {
  onReserveSpace: (spaceName?: string) => void;
  mode?: AppMode;
}

export const ReserveSpaceSection: React.FC<ReserveSpaceSectionProps> = ({
  onReserveSpace,
  mode = 'lunch',
}) => {
  const isNight = mode === 'night';

  const SPACES = [
    {
      id: 'flame-patio',
      title: 'Flame Patio',
      capacity: '20 – 80 Guests',
      tagline: 'Sunlit & Starry Covered Alfresco Oasis',
      description: 'An enchanting covered outdoor oasis adorned with red carpets, hanging Moroccan lanterns, sun shade sails, and lush greenery. Perfect for sunlit afternoon baby showers, cocktail mixers, bridal luncheons, and alfresco dining celebrations on Santa Monica Boulevard.',
      imageUrl: '/images/patio-outdoor-day.jpg',
      features: ['Covered Shade Canopy & Heating', 'Hanging Moroccan Lantern Glow', 'Cocktail & Hookah Lounge', 'Sunlit Daylight & Starry Nights'],
      perfectFor: 'Baby Showers, Bridal Luncheons, Receptions & Social Mixers',
    },
    {
      id: 'flame-restaurant',
      title: 'Flame Restaurant',
      capacity: '40 – 120 Guests',
      tagline: 'Warm, Saffron-Aromatic Main Dining Hall',
      description: 'Our warm, stylish main dining hall featuring high ceilings, ambient glow, and crisp linen-wrapped tables. Enjoy full-service Persian saffron kababs, signature hot appetizers, and spacious seating arrangements in a sophisticated setting.',
      imageUrl: '/images/patio-toppish-gala.jpg',
      features: ['Linen Banquet Tables & Booths', 'Full Persian Saffron Menu', 'Dedicated Table Concierge', 'Central Bar Access'],
      perfectFor: 'Corporate Dinners, Rehearsal Dinners & Family Anniversaries',
    },
    {
      id: 'flame-events-lounge',
      title: 'Flame Events Lounge',
      capacity: '50 – 170+ Guests (Buyout to 250)',
      tagline: 'Royal Ballroom, Concert Stage & Dance Floor',
      description: 'An opulent, royal banquet hall with dramatic candlelit chandelier lighting, lavish velvet seating, a raised performance concert stage, and a private dance floor. Designed for grand celebrations, weddings, bar/bat mitzvahs, and large-scale corporate conferences.',
      imageUrl: '/images/patio-people-gala.jpg',
      features: ['Concert AV & Wireless Microphones', 'Digital Projector & Screens', 'Private Bar & Raised Stage', 'Spacious Dance Floor'],
      perfectFor: 'Conferences, Weddings, Bar/Bat Mitzvahs & Birthday Galas',
    },
  ];

  return (
    <section 
      id="reserve-a-space-section" 
      className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 transition-colors duration-700 font-['Raleway'] overflow-hidden ${
        isNight ? 'bg-[#180309] text-[#f7e8ea]' : 'bg-[#ffffff] text-[#1a1d22]'
      }`}
    >
      {/* Subtle Warm Amber & Crimson Radial Ambiance in Dark Mode */}
      {isNight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,89,0.1),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(158,28,56,0.12),transparent_60%)] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* Editorial Top Headline & Overview */}
        <RevealOnScroll direction="up" delay={0} duration={800} className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/60 text-[#d4a359] text-xs uppercase tracking-[0.25em] font-bold shadow-sm">
            <Sparkles size={14} className="text-[#d4a359]" />
            <span>Private Event Spaces • 20 to 170+ Guests</span>
          </div>

          <div className="space-y-1">
            <h3 className={`font-serif text-2xl sm:text-3xl font-medium uppercase tracking-[0.2em] ${
              isNight ? 'text-[#f3cf8a]' : 'text-[#b37a2b]'
            }`}>
              Rent an Event Space
            </h3>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
              isNight ? 'text-white' : 'text-[#14171a]'
            }`}>
              Conferences, Weddings &amp; Private Celebrations
            </h2>
          </div>

          <p className={`text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto ${
            isNight ? 'text-gray-100' : 'text-stone-900'
          }`}>
            Host your next banquet at Flame International. Choose between the outdoor <strong>Flame Patio</strong>, the main <strong>Flame Restaurant</strong>, or the opulent <strong>Flame Events Lounge</strong> on Santa Monica Boulevard.
          </p>
        </RevealOnScroll>

        {/* 3 Photos Grid of Event Spaces (Using .jpg images) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SPACES.map((space, idx) => (
            <RevealOnScroll 
              key={space.id} 
              direction="up" 
              delay={100 + idx * 150} 
              duration={800}
            >
              <div 
                className={`group rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-1.5 ${
                  isNight 
                    ? 'bg-[#1b030b] border border-[#6b152d] shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:border-[#d4a359] hover:shadow-[0_20px_50px_rgba(212,163,89,0.2)]' 
                    : 'bg-[#faf8f5] border border-stone-300 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-[#d4a359] hover:shadow-2xl'
                }`}
              >
                {/* Clean Photo Container WITHOUT overlays */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#24060f]">
                  <img 
                    src={space.imageUrl} 
                    alt={space.title}
                    onError={(e) => { e.currentTarget.src = '/images/restwide.jpg'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/25 backdrop-blur-[2px] border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    {space.capacity}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                      isNight ? 'text-white' : 'text-stone-950'
                    }`}>
                      {space.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4a359]">
                      {space.tagline}
                    </p>
                    <p className={`text-sm sm:text-base leading-relaxed font-normal ${
                      isNight ? 'text-gray-200' : 'text-stone-900'
                    }`}>
                      {space.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-3 border-t border-[#d4a359]/30 text-xs sm:text-sm">
                    {space.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2">
                        <CheckCircle2 size={15} className="text-[#d4a359] shrink-0" />
                        <span className={`font-semibold ${isNight ? 'text-[#f5d79e]' : 'text-stone-900'}`}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Perfect for Tag */}
                  <div className="pt-2 text-xs sm:text-sm text-stone-700 dark:text-gray-300">
                    <span className="font-bold text-[#d4a359]">Ideal for: </span>
                    <span className="font-medium">{space.perfectFor}</span>
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => onReserveSpace(space.title)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#b37a2b] via-[#d4a359] to-[#f3cf8a] text-black font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md flex items-center justify-center space-x-2 mt-2"
                  >
                    <span>Inquire About This Space</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
};
