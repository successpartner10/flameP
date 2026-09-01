import React from 'react';
import { Calendar, Ticket, Sparkles, Music, Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '../RevealOnScroll';
import { FlameLogo } from '../FlameLogo';

export interface LiveEventsModuleProps {
  className?: string;
  onOpenTickets?: (eventTitle?: string, eventDate?: string) => void;
  onOpenReserve?: () => void;
  showTitle?: boolean;
}

export const LiveEventsModule: React.FC<LiveEventsModuleProps> = ({
  className = '',
  onOpenTickets,
  onOpenReserve,
  showTitle = true,
}) => {
  return (
    <section id="live-events-module" className={`w-full text-[#f7e8ea] font-['Raleway'] ${className}`}>
      <div className="max-w-6xl mx-auto">
        
        {showTitle && (
          <RevealOnScroll direction="up" delay={0} duration={600} className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2d0713] border border-[#6b152d] text-xs font-bold uppercase tracking-[0.25em] text-[#f5d79e] mb-3 shadow-md">
              <Sparkles size={14} className="text-[#f3cf8a]" />
              <span>Live Stage &amp; Persian Cabaret</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-wide">
              PERSIAN LIVE ENTERTAINMENT &amp; <span className="text-[#f3cf8a]">CONCERTS</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#f3d2d8] mt-2 max-w-2xl mx-auto">
              Legendary Persian singers, live orchestra, and royal dining experience every weekend.
            </p>
          </RevealOnScroll>
        )}

        {/* Featured Concert Banner Card in 2-Tone Footer Wine Colors */}
        <div className="rounded-3xl bg-gradient-to-br from-[#24060f] via-[#1c040d] to-[#24060f] border border-[#6b152d] p-6 sm:p-8 shadow-2xl overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Event Poster / Visual */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[#180309] border border-[#521324] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] shadow-lg group">
              <img
                src="/src/assets/images/flame_stage_lights_1788098671758.jpg"
                alt="Persian Concert Stage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180309] via-transparent to-black/40" />

              {/* Flame Logo with White Border */}
              <div className="absolute top-4 left-4">
                <FlameLogo variant="color-emblem" size="sm" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="px-2.5 py-1 rounded-full bg-[#b8863b] text-black font-extrabold text-[10px] uppercase tracking-wider shadow inline-block mb-1.5">
                  EXCLUSIVE CONCERT
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  Arand &amp; Shahyar Ghanbari
                </h3>
                <p className="text-xs text-[#f3cf8a] font-semibold mt-0.5">
                  Saturday, September 12, 2026
                </p>
              </div>
            </div>

            {/* Concert Details & Seating Info */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#f5a7b8]">
                  <Calendar size={14} className="text-[#f3cf8a]" />
                  <span>UPCOMING HEADLINE PERFORMANCE</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                  Arand &amp; Shahyar Ghanbari Live in Concert
                </h3>
                <p className="text-xs sm:text-sm text-[#f3d2d8] leading-relaxed">
                  An unforgettable evening of classic Persian melodies, poetry, and live orchestration accompanied by Flame International's full dinner service and open flame kababs.
                </p>
              </div>

              {/* Event Time & Venue Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#180309] border border-[#521324]">
                  <Clock size={15} className="text-[#f3cf8a] mb-1" />
                  <span className="font-bold text-white block">Doors: 7:30 PM</span>
                  <span className="text-[10px] text-[#f3d2d8]/70">Show: 9:00 PM</span>
                </div>
                <div className="p-3 rounded-xl bg-[#180309] border border-[#521324]">
                  <MapPin size={15} className="text-[#f3cf8a] mb-1" />
                  <span className="font-bold text-white block">Main Ballroom</span>
                  <span className="text-[10px] text-[#f3d2d8]/70">11330 Santa Monica</span>
                </div>
                <div className="p-3 rounded-xl bg-[#180309] border border-[#521324]">
                  <Music size={15} className="text-[#f3cf8a] mb-1" />
                  <span className="font-bold text-white block">Dinner + Concert</span>
                  <span className="text-[10px] text-[#f3d2d8]/70">All Ages Welcome</span>
                </div>
              </div>

              {/* Seating Tiers */}
              <div className="p-3.5 rounded-2xl bg-[#180309]/80 border border-[#521324] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-[#f3cf8a] block">VIP Front Stage ($125)</span>
                  <span className="text-[11px] text-[#f3d2d8]">Includes 3-course saffron dinner</span>
                </div>
                <div>
                  <span className="font-bold text-[#f3cf8a] block">General Table ($85)</span>
                  <span className="text-[11px] text-[#f3d2d8]">Includes full dinner service</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onOpenTickets && (
                  <button
                    onClick={() => onOpenTickets("Arand & Shahyar Ghanbari Live in Concert", "Saturday, September 12, 2026")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] hover:from-[#f3cf8a] hover:to-[#d4a359] text-black font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center space-x-2"
                  >
                    <Ticket size={16} />
                    <span>BUY TICKETS ($85 - $125)</span>
                  </button>
                )}

                {onOpenReserve && (
                  <button
                    onClick={onOpenReserve}
                    className="px-5 py-3 rounded-xl bg-[#3d0917] hover:bg-[#521324] border border-[#831f3b] text-[#f3cf8a] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Reserve Table
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
