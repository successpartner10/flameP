import React from 'react';
import { ArrowRight, Utensils, Sparkles } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface MenuSectionProps {
  onOpenMenu: () => void;
  onOpenDish: (dishId: string) => void;
  mode?: AppMode;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenMenu, onOpenDish, mode = 'lunch' }) => {
  const isNight = mode === 'night';

  return (
    <section 
      id="our-menus-section" 
      className={`relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 transition-colors duration-700 overflow-hidden ${
        isNight ? 'bg-[#180309] text-[#f7e8ea]' : 'bg-[#ffffff] text-[#1a1d22]'
      }`}
    >
      {/* Subtle Warm Amber & Crimson Radial Ambiance in Dark Mode */}
      {isNight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,163,89,0.1),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(158,28,56,0.12),transparent_60%)] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left 2x2 Photo Grid (Authentic Persian Culinary Dishes) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          
          {/* Top-Left: Persian Saffron Barberry Rice & Crispy Tahdig (Zereshk Polo) */}
          <RevealOnScroll direction="up" delay={100} duration={750}>
            <div 
              onClick={() => onOpenDish('item-7')}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                isNight 
                  ? 'bg-[#24060f] border border-[#4a0d1e] shadow-[0_15px_40px_rgba(0,0,0,0.95)] ring-1 ring-white/10 hover:border-[#d4a359]/70 hover:shadow-[0_20px_50px_rgba(212,163,89,0.15)]' 
                  : 'bg-[#ece7df] shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-lg'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
                alt="Persian Saffron Rice with Barberries (Zereshk Polo)"
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                  isNight ? 'filter contrast-[1.08] brightness-[1.05] saturate-[1.05]' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[#f5d79e] text-[10px] uppercase tracking-widest font-bold font-['Raleway']">Royal Specialty</span>
                <span className="text-white text-sm font-serif font-medium">Zereshk Polo &amp; Saffron Basmati</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Top-Right: Salad Shirazi & Sabzi Khordan */}
          <RevealOnScroll direction="up" delay={200} duration={750}>
            <div 
              onClick={() => onOpenDish('item-2')}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                isNight 
                  ? 'bg-[#24060f] border border-[#4a0d1e] shadow-[0_15px_40px_rgba(0,0,0,0.95)] ring-1 ring-white/10 hover:border-[#d4a359]/70 hover:shadow-[0_20px_50px_rgba(212,163,89,0.15)]' 
                  : 'bg-[#ece7df] shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-lg'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                alt="Salad Shirazi with Persian Cucumbers, Heirloom Tomatoes & Fresh Mint"
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                  isNight ? 'filter contrast-[1.08] brightness-[1.05] saturate-[1.05]' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[#f5d79e] text-[10px] uppercase tracking-widest font-bold font-['Raleway']">Persian Heritage</span>
                <span className="text-white text-sm font-serif font-medium">Salad Shirazi &amp; Sabzi Khordan</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Bottom-Left: Charbroiled Flame Kababs on Skewers */}
          <RevealOnScroll direction="up" delay={300} duration={750}>
            <div 
              onClick={() => onOpenDish('item-4')}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                isNight 
                  ? 'bg-[#24060f] border border-[#4a0d1e] shadow-[0_15px_40px_rgba(0,0,0,0.95)] ring-1 ring-white/10 hover:border-[#d4a359]/70 hover:shadow-[0_20px_50px_rgba(212,163,89,0.15)]' 
                  : 'bg-[#ece7df] shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-lg'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                alt="Persian Charbroiled Flame Kabab Koobideh & Joojeh Skewers"
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                  isNight ? 'filter contrast-[1.08] brightness-[1.05] saturate-[1.05]' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[#f5d79e] text-[10px] uppercase tracking-widest font-bold font-['Raleway']">Flame Charcoal Grill</span>
                <span className="text-white text-sm font-serif font-medium">Soltani &amp; Koobideh Kababs</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Bottom-Right: Kashk-e Bademjan & Warm Persian Sangak */}
          <RevealOnScroll direction="up" delay={400} duration={750}>
            <div 
              onClick={() => onOpenDish('item-1')}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                isNight 
                  ? 'bg-[#24060f] border border-[#4a0d1e] shadow-[0_15px_40px_rgba(0,0,0,0.95)] ring-1 ring-white/10 hover:border-[#d4a359]/70 hover:shadow-[0_20px_50px_rgba(212,163,89,0.15)]' 
                  : 'bg-[#ece7df] shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-lg'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80"
                alt="Kashk-e Bademjan Smoked Eggplant with Toasted Sangak Flatbread"
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                  isNight ? 'filter contrast-[1.08] brightness-[1.05] saturate-[1.05]' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[#f5d79e] text-[10px] uppercase tracking-widest font-bold font-['Raleway']">Signature Mazzeh</span>
                <span className="text-white text-sm font-serif font-medium">Kashk-e Bademjan &amp; Sangak</span>
              </div>
            </div>
          </RevealOnScroll>

        </div>

        {/* Right Content Column */}
        <RevealOnScroll 
          direction="up" 
          delay={150} 
          duration={800} 
          className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          
          <div className="space-y-1">
            {/* Script gold: "Check out" */}
            <h3 className={`font-script text-4xl sm:text-5xl md:text-6xl font-normal leading-tight ${
              isNight ? 'text-[#f3cf8a]' : 'text-[#c6924b]'
            }`}>
              Check out
            </h3>
            {/* Serif bold title: "Our Menus" */}
            <h2 className={`font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight ${
              isNight ? 'text-[#ffffff]' : 'text-[#1a1c20]'
            }`}>
              Persian Menus
            </h2>
          </div>

          {/* Minimalist ornament divider */}
          <div className="flex items-center justify-center lg:justify-start space-x-2 py-1 text-[#c6924b]">
            <span className="w-6 h-[1px] bg-[#c6924b]/40"></span>
            <span className="text-xs">✦</span>
            <span className="w-6 h-[1px] bg-[#c6924b]/40"></span>
          </div>

          {/* Body Paragraph */}
          <p className={`text-base sm:text-lg leading-relaxed font-light max-w-md ${
            isNight ? 'text-[#d1d5db]' : 'text-[#555e6b]'
          }`}>
            Pull up a chair and experience our royal saffron banquets, flame-charred skewered meats, slow-simmered Ghormeh Sabzi stews, and traditional Persian mazzeh crafted with imported spices and California freshness.
          </p>

          {/* Link: View the Food Menu */}
          <div className="pt-2">
            <button
              id="menu-view-food-menu-btn"
              onClick={onOpenMenu}
              className={`group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-semibold border-b pb-1 transition-all duration-300 cursor-pointer ${
                isNight 
                  ? 'text-[#f3cf8a] hover:text-white border-[#f3cf8a]/70' 
                  : 'text-[#8c6227] hover:text-[#212429] border-[#c6924b]'
              }`}
            >
              <span>Explore Persian Menu</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </RevealOnScroll>

      </div>
    </section>
  );
};
