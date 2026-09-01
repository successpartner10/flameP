import React from 'react';
import { Home, Sparkles, Utensils, ShoppingBag, PhoneCall } from 'lucide-react';
import { AppMode } from '../types';

export type BottomNavAction = 'home' | 'live-events' | 'dine-in' | 'order-online' | 'contact' | 'catering' | 'reserve' | 'lunch' | 'dinner';

interface BottomStickyNavProps {
  mode: AppMode;
  activeAction?: BottomNavAction;
  onNavigate: (action: BottomNavAction) => void;
}

export const BottomStickyNav: React.FC<BottomStickyNavProps> = ({
  mode,
  activeAction = 'home',
  onNavigate,
}) => {
  const navItems = [
    {
      id: 'home' as BottomNavAction,
      label: 'HOME',
      icon: Home,
      badge: null,
      ariaLabel: 'Navigate to Home',
    },
    {
      id: 'live-events' as BottomNavAction,
      label: 'LIVE EVENT',
      icon: Sparkles,
      badge: 'GALA',
      ariaLabel: 'View Live Events & Stage Concerts',
    },
    {
      id: 'dine-in' as BottomNavAction,
      label: 'DINE IN',
      icon: Utensils,
      badge: null,
      ariaLabel: 'View Persian Dine In Menu',
    },
    {
      id: 'order-online' as BottomNavAction,
      label: 'ORDER ONLINE',
      icon: ShoppingBag,
      badge: null,
      ariaLabel: 'Order Persian Food Online',
    },
    {
      id: 'contact' as BottomNavAction,
      label: 'CONTACT',
      icon: PhoneCall,
      badge: null,
      ariaLabel: 'Contact Us & Location Directions',
    },
  ];

  return (
    <aside
      id="bottom-sticky-navigation"
      aria-label="Bottom Navigation Bar"
      className="block md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-500 shadow-[0_-8px_32px_rgba(0,0,0,0.7)] font-['Raleway'] bg-gradient-to-r from-[#180309]/95 via-[#24060f]/95 to-[#180309]/95 border-t border-[#521324]/70"
    >
      <div className="max-w-4xl mx-auto px-2 sm:px-6 pt-1.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:py-2">
        <nav className="grid grid-cols-5 gap-1 sm:gap-3 items-stretch">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAction === item.id;

            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                aria-label={item.ariaLabel}
                className={`relative flex flex-col items-center justify-center min-h-[52px] sm:min-h-[58px] py-1.5 px-1 sm:px-2 rounded-2xl transition-all duration-200 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#d4a359]/50 overflow-hidden touch-manipulation select-none active:scale-95 ${
                  isActive
                    ? 'text-[#f3cf8a] bg-[#3d0917] border border-[#831f3b] shadow-inner ring-1 ring-[#d4a359]/30'
                    : 'text-[#f7e8ea] hover:text-white hover:bg-[#2d0713]/80 active:bg-[#3d0917]'
                }`}
              >
                {/* Live Badge for Live Events */}
                {item.badge && (
                  <span className="absolute top-1 right-1 sm:right-2 px-1.5 py-0.2 bg-[#e53935] text-white text-[7px] sm:text-[8px] font-['Raleway'] font-bold rounded-full uppercase tracking-wider shadow-md animate-pulse">
                    {item.badge}
                  </span>
                )}

                {/* Prominent Icon container */}
                <div className="flex items-center justify-center mb-1 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[2] ${
                      isActive ? 'text-[#f3cf8a]' : 'text-[#f5d79e]'
                    }`}
                  />
                </div>

                {/* Label: ALL CAPS, Raleway font */}
                <span
                  className={`text-[9px] sm:text-[11px] md:text-[12px] font-bold tracking-tight sm:tracking-[0.05em] uppercase truncate max-w-full text-center whitespace-nowrap leading-tight transition-all font-['Raleway'] ${
                    isActive
                      ? 'text-[#f3cf8a]'
                      : 'text-[#f7e8ea] group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>

                {/* Bottom Active Glow Accent Bar */}
                {isActive && (
                  <span className="absolute bottom-0 w-8 sm:w-14 h-0.5 rounded-full bg-[#f3cf8a] shadow-[0_0_8px_rgba(243,207,138,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
