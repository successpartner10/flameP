import React from 'react';
import { Home, Utensils, Video, Calendar, ShoppingBag } from 'lucide-react';
import { NavTab } from '../types';

interface PwaBottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  cartCount: number;
}

export const PwaBottomNav: React.FC<PwaBottomNavProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#ffffff] text-[#1c1f24] border-t border-[#e2ded6] shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-2 pt-1.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:hidden transition-all duration-300">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* 1. HOME */}
        <button
          id="pwa-nav-home"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center min-h-[50px] py-1 px-3 rounded-xl transition-all duration-200 touch-manipulation select-none active:scale-95 ${
            activeTab === 'home'
              ? 'text-[#c68936] font-bold'
              : 'text-[#646e7b] hover:text-[#1c1f24]'
          }`}
        >
          <Home size={20} className={activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
          <span className="text-[9px] uppercase tracking-wider mt-1">HOME</span>
        </button>

        {/* 2. MENU */}
        <button
          id="pwa-nav-menu"
          onClick={() => onSelectTab('menu')}
          className={`flex flex-col items-center justify-center min-h-[50px] py-1 px-3 rounded-xl transition-all duration-200 touch-manipulation select-none active:scale-95 ${
            activeTab === 'menu'
              ? 'text-[#c68936] font-bold'
              : 'text-[#646e7b] hover:text-[#1c1f24]'
          }`}
        >
          <Utensils size={20} className={activeTab === 'menu' ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
          <span className="text-[9px] uppercase tracking-wider mt-1">MENU</span>
        </button>

        {/* 3. STORIES (with LIVE badge) */}
        <button
          id="pwa-nav-stories"
          onClick={() => onSelectTab('stories')}
          className={`relative flex flex-col items-center justify-center min-h-[50px] py-1 px-3 rounded-xl transition-all duration-200 touch-manipulation select-none active:scale-95 ${
            activeTab === 'stories'
              ? 'text-[#c68936] font-bold'
              : 'text-[#646e7b] hover:text-[#1c1f24]'
          }`}
        >
          {/* Green LIVE Pill Tag */}
          <span className="absolute -top-1 px-1.5 py-0.2 bg-[#2e7d32] text-white text-[7px] font-mono font-bold rounded-full uppercase tracking-tighter shadow-sm animate-pulse">
            LIVE
          </span>
          <div className="relative mt-0.5">
            <Video size={20} className={activeTab === 'stories' ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
          </div>
          <span className="text-[9px] uppercase tracking-wider mt-1">STORIES</span>
        </button>

        {/* 4. RESERVE */}
        <button
          id="pwa-nav-reserve"
          onClick={() => onSelectTab('reserve')}
          className={`flex flex-col items-center justify-center min-h-[50px] py-1 px-3 rounded-xl transition-all duration-200 touch-manipulation select-none active:scale-95 ${
            activeTab === 'reserve'
              ? 'text-[#c68936] font-bold'
              : 'text-[#646e7b] hover:text-[#1c1f24]'
          }`}
        >
          <Calendar size={20} className={activeTab === 'reserve' ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
          <span className="text-[9px] uppercase tracking-wider mt-1">RESERVE</span>
        </button>

        {/* 5. BAG (with notification red badge 1) */}
        <button
          id="pwa-nav-bag"
          onClick={() => onSelectTab('bag')}
          className={`relative flex flex-col items-center justify-center min-h-[50px] py-1 px-3 rounded-xl transition-all duration-200 touch-manipulation select-none active:scale-95 ${
            activeTab === 'bag'
              ? 'text-[#c68936] font-bold'
              : 'text-[#646e7b] hover:text-[#1c1f24]'
          }`}
        >
          {cartCount > 0 && (
            <span className="absolute -top-0.5 right-2 w-4 h-4 bg-[#d32f2f] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {cartCount}
            </span>
          )}
          <ShoppingBag size={20} className={activeTab === 'bag' ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
          <span className="text-[9px] uppercase tracking-wider mt-1">BAG</span>
        </button>

      </div>
    </nav>
  );
};
