import React from 'react';
import { ArrowUpRight, Utensils, Moon, ShoppingBag, ChefHat, Sparkles } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface MenuMatrixSectionProps {
  onOpenLunch: () => void;
  onOpenDinner: () => void;
  onOpenOrderOnline: () => void;
  onOpenCatering: () => void;
  mode?: AppMode;
}

export const MenuMatrixSection: React.FC<MenuMatrixSectionProps> = ({
  onOpenLunch,
  onOpenDinner,
  onOpenOrderOnline,
  onOpenCatering,
  mode = 'lunch',
}) => {
  const isNight = mode === 'night';

  const matrixItems = [
    {
      id: 'lunch',
      title: 'Lunch',
      subtitle: 'Express Platters & Midday Saffron Specials',
      tag: '11:30 AM – 3:30 PM',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      action: onOpenLunch,
      buttonText: 'View Lunch Menu',
      accentColor: 'from-[#d4a359] to-[#b3833b]',
    },
    {
      id: 'dinner',
      title: 'Dinner',
      subtitle: 'Royal Soltani, Open Flames & Evening Entrees',
      tag: '5:00 PM – Late',
      icon: Moon,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      action: onOpenDinner,
      buttonText: 'View Dinner Menu',
      accentColor: 'from-[#9e1c38] to-[#d4a359]',
    },
    {
      id: 'online-order',
      title: 'Online Order',
      subtitle: 'Fast Takeaway, Express Pickup & Direct Delivery',
      tag: 'Order in Seconds',
      icon: ShoppingBag,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      action: onOpenOrderOnline,
      buttonText: 'Order Online Now',
      accentColor: 'from-[#d9381e] to-[#ea580c]',
    },
    {
      id: 'catering',
      title: 'Catering',
      subtitle: 'Corporate Lunches, Weddings & Private Banquets',
      tag: '15 – 500+ Guests',
      icon: ChefHat,
      image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
      action: onOpenCatering,
      buttonText: 'Explore Catering',
      accentColor: 'from-[#d4a359] to-[#c29845]',
    },
  ];

  return (
    <section 
      id="menu-matrix-section" 
      className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 transition-colors duration-700 font-['Raleway'] overflow-hidden ${
        isNight ? 'bg-[#180309] text-[#f7e8ea]' : 'bg-[#fcfaf7] text-[#1a1d22]'
      }`}
    >
      {/* Subtle Warm Amber Ambiance in Dark Mode */}
      {isNight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,163,89,0.1),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(158,28,56,0.12),transparent_60%)] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0} duration={750} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/50 text-[#d4a359] text-xs uppercase tracking-[0.25em] font-extrabold mb-3">
            <Sparkles size={14} />
            <span>Persian Culinary Services</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isNight ? 'text-white' : 'text-stone-950'
          }`}>
            Four Ways to Experience Flame
          </h2>
          <p className={`text-base sm:text-lg mt-3 max-w-xl mx-auto font-normal leading-relaxed ${
            isNight ? 'text-gray-100' : 'text-stone-900'
          }`}>
            From quick saffron midday lunches to romantic candlelight dinners, doorstep ordering, and grand celebrations.
          </p>
        </RevealOnScroll>

        {/* 4 Images Matrix Grid (2x2 on tablet/desktop, 1 col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matrixItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.id} direction="up" delay={idx * 100} duration={800}>
                <div
                  id={`matrix-card-${item.id}`}
                  onClick={item.action}
                  className={`group rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 border h-full ${
                    isNight
                      ? 'bg-[#1e040d] border-[#4a0d1e] hover:border-[#d4a359] shadow-[0_15px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(212,163,89,0.25)]'
                      : 'bg-white border-stone-300 hover:border-[#d4a359] shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(212,163,89,0.25)]'
                  }`}
                >
                  {/* Clean Vibrant Photo Container without dark overlays */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out contrast-[1.02]"
                    />
                    
                    {/* Top Tag Pill */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-sm border border-white/30 text-[#f5d79e] text-xs uppercase font-extrabold tracking-wider shadow-md">
                      {item.tag}
                    </div>

                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/30 text-white group-hover:bg-[#d4a359] group-hover:text-black group-hover:border-[#d4a359] transition-all duration-300 flex items-center justify-center shadow-lg group-hover:rotate-45">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>

                  {/* Card Content & Action Button */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1.5 text-[#d4a359]">
                        <Icon size={18} />
                        <span className="text-xs uppercase tracking-widest font-extrabold">
                          Flame Experience
                        </span>
                      </div>

                      <h3 className={`font-serif text-2xl font-bold tracking-wide transition-colors ${
                        isNight ? 'text-white group-hover:text-[#f3cf8a]' : 'text-stone-950 group-hover:text-[#b37a2b]'
                      }`}>
                        {item.title}
                      </h3>

                      <p className={`text-sm sm:text-base font-normal leading-snug line-clamp-2 ${
                        isNight ? 'text-gray-200' : 'text-stone-800'
                      }`}>
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action();
                        }}
                        className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${item.accentColor} text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md group-hover:brightness-110 group-hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer font-['Raleway']`}
                      >
                        <span>{item.buttonText}</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>

                </div>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
};
