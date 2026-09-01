import React from 'react';
import { Home, Sparkles, Utensils, ShoppingBag, Users, Calendar } from 'lucide-react';
import { AppMode } from '../../types';

export type BottomNavModuleAction = 'home' | 'live-events' | 'dine-in' | 'order-online' | 'catering' | 'reserve' | 'lunch' | 'dinner' | 'contact';

export interface BottomButtonsModuleProps {
  mode?: AppMode;
  activeAction?: string;
  onNavigate: (action: BottomNavModuleAction) => void;
  variant?: 'sticky-bar' | 'floating-pill' | 'inline-grid';
  className?: string;
}

export const BottomButtonsModule: React.FC<BottomButtonsModuleProps> = ({
  mode = 'lunch',
  activeAction = 'home',
  onNavigate,
  variant = 'sticky-bar',
  className = '',
}) => {
  const defaultNavItems = [
    {
      id: 'home' as BottomNavModuleAction,
      label: 'HOME',
      icon: Home,
      badge: null,
      ariaLabel: 'Go to Home',
    },
    {
      id: 'live-events' as BottomNavModuleAction,
      label: 'LIVE EVENTS',
      icon: Sparkles,
      badge: 'LIVE',
      ariaLabel: 'Persian Concerts & Cabaret',
    },
    {
      id: 'dine-in' as BottomNavModuleAction,
      label: 'DINE IN',
      icon: Utensils,
      badge: null,
      ariaLabel: 'Dine In Menu',
    },
    {
      id: 'order-online' as BottomNavModuleAction,
      label: 'ONLINE ORDER',
      icon: ShoppingBag,
      badge: null,
      ariaLabel: 'Order Food Online',
    },
    {
      id: 'catering' as BottomNavModuleAction,
      label: 'CATERING',
      icon: Users,
      badge: null,
      ariaLabel: 'Catering & Banquets',
    },
    {
      id: 'reserve' as BottomNavModuleAction,
      label: 'RENT AN EVENT SPACE',
      icon: Calendar,
      badge: null,
      ariaLabel: 'Rent an Event Space or Table',
    },
  ];

  if (variant === 'inline-grid') {
    return (
      <div className={`w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-3 rounded-2xl bg-gradient-to-r from-[#180309] via-[#24060f] to-[#180309] border border-[#521324] font-['Raleway'] ${className}`}>
        {defaultNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeAction === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#3d0917] border-[#831f3b] text-[#f3cf8a] shadow-md ring-1 ring-[#d4a359]/30 font-bold'
                  : 'bg-[#1c040d] border-[#521324] text-[#f7e8ea] hover:bg-[#2d0713]'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-[#f3cf8a]' : 'text-[#f5d79e]'} />
              <span className="text-xs font-extrabold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <aside
      id="bottom-buttons-module"
      aria-label="Bottom Quick Navigation"
      className={`block md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 font-['Raleway'] bg-gradient-to-r from-[#180309]/95 via-[#24060f]/95 to-[#180309]/95 border-t border-[#521324]/60 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="max-w-4xl mx-auto px-1 sm:px-4 pt-1.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:py-2">
        <nav className="grid grid-cols-6 gap-0.5 sm:gap-1.5 items-stretch">
          {defaultNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAction === item.id;

            return (
              <button
                key={item.id}
                id={`btn-nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                aria-label={item.ariaLabel}
                className={`relative flex flex-col items-center justify-center min-h-[50px] sm:min-h-[56px] py-1 px-0.5 sm:px-1.5 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden touch-manipulation select-none active:scale-95 ${
                  isActive
                    ? 'text-[#f3cf8a] bg-[#3d0917] border border-[#831f3b] shadow-inner ring-1 ring-[#d4a359]/30'
                    : 'text-[#f7e8ea] hover:text-white hover:bg-[#2d0713]/80'
                }`}
              >
                {item.badge && (
                  <span className="absolute top-0.5 right-0.5 px-1 py-0.2 bg-[#e53935] text-white text-[7px] sm:text-[8px] font-extrabold rounded-full uppercase tracking-wider animate-pulse shadow-md">
                    {item.badge}
                  </span>
                )}

                <div className="flex items-center justify-center mb-0.5 transition-transform duration-200">
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2] ${
                      isActive ? 'text-[#f3cf8a]' : 'text-[#f5d79e]'
                    }`}
                  />
                </div>

                <span
                  className={`text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-tight sm:tracking-wider truncate font-extrabold ${
                    isActive ? 'text-[#f3cf8a]' : 'text-[#f7e8ea]'
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 w-6 sm:w-10 h-0.5 rounded-full bg-[#f3cf8a] shadow-[0_0_8px_rgba(243,207,138,0.9)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
