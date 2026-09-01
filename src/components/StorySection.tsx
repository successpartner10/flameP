import React from 'react';
import { ArrowRight, Sparkles, Phone, MapPin, Calendar, Music, Flame, Ticket } from 'lucide-react';
import { AppMode } from '../types';
import { FlameLogo } from './FlameLogo';
import { RevealOnScroll } from './RevealOnScroll';

interface StorySectionProps {
  onLearnMore: () => void;
  onReserve?: () => void;
  onOpenTickets?: (eventTitle?: string, eventDate?: string) => void;
  mode?: AppMode;
}

export const StorySection: React.FC<StorySectionProps> = ({ 
  onLearnMore, 
  onReserve,
  onOpenTickets,
  mode = 'lunch' 
}) => {
  const isNight = mode === 'night';

  const handleTicketClick = (title: string, date: string) => {
    if (onOpenTickets) {
      onOpenTickets(title, date);
    } else if (onReserve) {
      onReserve();
    }
  };

  return (
    <section 
      id="our-story-section" 
      className={`relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 transition-colors duration-700 font-['Raleway'] overflow-hidden ${
        isNight 
          ? 'bg-[#180309] text-[#f7e8ea]' 
          : 'bg-[#ffffff] text-[#1c1f24]'
      }`}
    >
      {/* Subtle Warm Amber & Crimson Radial Ambiance in Dark Mode */}
      {isNight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,89,0.12),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(158,28,56,0.15),transparent_60%)] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Editorial Text Column */}
        <RevealOnScroll 
          direction="up" 
          delay={0}
          duration={800}
          className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          
          <div className="space-y-1">
            {/* Gold cursive script: "Discover" */}
            <h3 className={`font-script text-4xl sm:text-5xl md:text-6xl font-normal leading-tight ${
              isNight ? 'text-[#f3cf8a]' : 'text-[#c6924b]'
            }`}>
              Discover
            </h3>
            {/* Serif bold title: "Our Story" */}
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isNight ? 'text-[#ffffff]' : 'text-[#1a1c20]'
            }`}>
              Persian Live Events &amp; Heritage
            </h2>
          </div>

          {/* Minimalist sunburst/ornament divider */}
          <div className="flex items-center justify-center lg:justify-start space-x-2 py-1 text-[#c6924b]">
            <span className="w-8 h-[1px] bg-[#c6924b]/40"></span>
            <span className="text-xs font-serif">✦</span>
            <span className="w-8 h-[1px] bg-[#c6924b]/40"></span>
          </div>

          {/* Narrative Paragraph */}
          <p className={`text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-lg ${
            isNight ? 'text-gray-100' : 'text-stone-900'
          }`}>
            <span className="font-extrabold">FLAME</span> <span className="font-extrabold tracking-wider">INTERNATIONAL</span> is Los Angeles' premier destination for authentic Persian cuisine, world-class Persian musical concerts, and vibrant weekend cabaret on Santa Monica Boulevard. Join us for exquisite saffron banquets, legendary performers, and an unforgettable cultural atmosphere.
          </p>
        </RevealOnScroll>

        {/* Right 2 Tall Vertical Photo / Event Cards Recreated from Image */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Recreated Concert Poster for September 12 (Arand & Shahyar Ghanbari) */}
          <RevealOnScroll direction="up" delay={150} duration={850} className="h-full">
            <div 
              onClick={() => handleTicketClick("Arand & Shahyar Ghanbari Live in Concert", "Saturday, September 12, 2026")}
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#0c0307] border-2 border-[#d4a359]/70 hover:border-[#f3cf8a] shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_70px_rgba(212,163,89,0.35)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between p-5 sm:p-6 h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(212, 163, 89, 0.18) 0%, rgba(158, 28, 56, 0.15) 50%, rgba(12, 3, 7, 0.98) 100%)',
              }}
            >
              {/* Background Chandelier & City Lights Bokeh Atmosphere */}
              <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 left-0 w-36 h-36 bg-[radial-gradient(circle,#ffd700_0%,transparent_70%)] blur-2xl opacity-40"></div>
                <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,#ffd700_0%,transparent_70%)] blur-2xl opacity-40"></div>
                <div className="absolute bottom-10 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_bottom,#d4a359_0%,transparent_70%)] opacity-30"></div>
              </div>

              {/* Poster Header */}
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-between border-b border-[#d4a359]/40 pb-2 mb-3">
                  <div className="text-left">
                    <h4 className="font-['Raleway'] font-black tracking-widest text-sm text-white uppercase">
                      FLAME INTERNATIONAL
                    </h4>
                    <span className="text-xs tracking-[0.2em] text-[#d4a359] uppercase block font-bold">
                      ✦ PROUDLY PRESENT ✦
                    </span>
                  </div>
                  {/* Glowing Mini Badge */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9e1c38] to-[#d4a359] p-0.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-0.5">
                      <FlameLogo variant="emblem-only" size="sm" color="#ffffff" className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Event Date Block matching poster */}
                <div className="py-2 flex items-center justify-center space-x-3">
                  <div className="text-right">
                    <span className="block text-xs tracking-[0.18em] uppercase text-white font-extrabold">SATURDAY</span>
                    <span className="block text-sm tracking-[0.14em] uppercase text-[#d4a359] font-black">SEPTEMBER</span>
                  </div>
                  <div className="font-serif text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f3cf8a] to-[#d4a359] leading-none drop-shadow-md">
                    12<span className="text-xs font-sans align-top ml-0.5 text-[#f3cf8a]">TH</span>
                  </div>
                </div>
              </div>

              {/* Middle Performer Visual Artwork */}
              <div className="relative z-10 my-3 rounded-2xl overflow-hidden border border-[#d4a359]/30 bg-black/60 shadow-inner group-hover:border-[#d4a359]/60 transition-colors">
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
                    alt="Shahyar Ghanbari & Arand Live in Concert Flame International"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Live Spotlight Badge */}
                  <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-black tracking-wider uppercase flex items-center space-x-1.5 shadow-lg animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span>LIVE CONCERT</span>
                  </div>

                  {/* Crystal Chandelier Gold Icon Overlays */}
                  <div className="absolute bottom-2 inset-x-2 text-center">
                    <div className="grid grid-cols-2 gap-2 text-xs font-serif font-bold text-[#fbe8a6] drop-shadow-md">
                      <div className="bg-black/25 backdrop-blur-[2px] py-1.5 px-2.5 rounded-xl border border-white/20 shadow-md">
                        <span className="block text-[10px] uppercase tracking-wider text-gray-200 font-sans font-bold">Guest Artist</span>
                        <span className="text-sm font-extrabold text-white">ARAND</span>
                      </div>
                      <div className="bg-black/25 backdrop-blur-[2px] py-1.5 px-2.5 rounded-xl border border-white/20 shadow-md">
                        <span className="block text-[10px] uppercase tracking-wider text-[#d4a359] font-sans font-bold">Iconic Master</span>
                        <span className="text-sm font-extrabold text-[#f3cf8a]">SHAHYAR GHANBARI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poster Footer: LOS ANGELES, Buy Tickets & Phone */}
              <div className="relative z-10 text-center space-y-3 pt-1 border-t border-[#d4a359]/40">
                
                {/* Dedicated Buy Tickets Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTicketClick("Arand & Shahyar Ghanbari Live in Concert", "Saturday, September 12, 2026");
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d9381e] via-[#e64a19] to-[#ea580c] hover:brightness-110 active:scale-95 text-white font-black text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(230,74,25,0.45)] transition-all flex items-center justify-center space-x-2 cursor-pointer font-['Raleway']"
                >
                  <Ticket size={16} />
                  <span>Get Concert Tickets (from $65)</span>
                </button>

                <div className="flex items-center justify-between px-1 text-sm">
                  <a
                    href="tel:3104440045"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center space-x-1 font-bold text-white hover:text-[#d4a359] transition-colors"
                  >
                    <Phone size={14} className="text-[#d4a359]" />
                    <span>310-444-0045</span>
                  </a>

                  <span className="text-xs font-bold text-[#f3cf8a]">Sept 12 • 8:00 PM</span>
                </div>

                <div className="text-xs text-gray-200 flex items-center justify-center space-x-1.5 font-medium">
                  <MapPin size={13} className="text-[#d4a359] shrink-0" />
                  <span>11330 Santa Monica Blvd, Los Angeles, CA 90025</span>
                </div>
              </div>

            </div>
          </RevealOnScroll>

          {/* Card 2: Persian Live Music & Weekend Cabaret Evenings */}
          <RevealOnScroll direction="up" delay={300} duration={850} className="h-full">
            <div 
              onClick={() => handleTicketClick("Persian Live Music & Weekend Cabaret", "Every Friday & Saturday Night")}
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#0c0307] border-2 border-[#d4a359]/50 hover:border-[#f3cf8a] shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_70px_rgba(212,163,89,0.35)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between p-5 sm:p-6 h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 80%, rgba(158, 28, 56, 0.25) 0%, rgba(212, 163, 89, 0.12) 60%, rgba(12, 3, 7, 0.98) 100%)',
              }}
            >
              {/* Header */}
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-between border-b border-[#d4a359]/40 pb-2 mb-3">
                  <div className="text-left">
                    <h4 className="font-['Raleway'] font-black tracking-widest text-sm text-white uppercase">
                      WEEKEND CABARET
                    </h4>
                    <span className="text-xs tracking-[0.2em] text-[#d4a359] uppercase block font-bold">
                      ✦ EVERY FRI &amp; SAT NIGHT ✦
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#1b030b] border border-[#d4a359] flex items-center justify-center text-[#d4a359]">
                    <Music size={16} />
                  </div>
                </div>

                <div className="py-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#fbe8a6] font-bold block">
                    PERSIAN LIVE MUSIC &amp; DINING
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight mt-0.5">
                    Saffron &amp; Song Nights
                  </h3>
                </div>
              </div>

              {/* Middle Visual Photo */}
              <div className="relative z-10 my-3 rounded-2xl overflow-hidden border border-[#d4a359]/30 bg-black/60 shadow-inner group-hover:border-[#d4a359]/60 transition-colors">
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
                    alt="Persian live music and violin concert performance"
                    className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/25 backdrop-blur-[2px] p-3 rounded-2xl border border-white/20 shadow-md">
                    <p className="text-xs text-gray-100 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      <strong className="text-[#f3cf8a]">Dinner &amp; Show:</strong> Royal Persian kabab platters, tahdig, and live vocalists under grand crystal chandeliers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 text-center space-y-3 pt-1 border-t border-[#d4a359]/40">
                <div className="flex items-center justify-center space-x-2 text-xs text-[#f3cf8a] uppercase tracking-wider font-bold">
                  <Calendar size={14} className="text-[#d4a359]" />
                  <span>DOORS OPEN 8:00 PM • SHOW 9:30 PM</span>
                </div>

                <div className="pt-1 flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTicketClick("Persian Live Music & Weekend Cabaret", "Every Friday & Saturday Night");
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] hover:brightness-110 active:scale-95 text-black font-black text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer font-['Raleway']"
                  >
                    <Ticket size={16} />
                    <span>Get Cabaret &amp; Dinner Passes</span>
                  </button>
                </div>

                <div className="text-xs text-gray-200 flex items-center justify-center space-x-1.5 font-medium">
                  <MapPin size={13} className="text-[#d4a359] shrink-0" />
                  <span>West Los Angeles • Free Valet Available</span>
                </div>
              </div>

            </div>
          </RevealOnScroll>

        </div>

      </div>
    </section>
  );
};

