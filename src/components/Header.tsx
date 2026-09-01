import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppMode } from '../types';
import { Phone } from 'lucide-react';

interface HeaderProps {
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  onOpenTickets?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onToggleMode,
  onOpenTickets,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id?: string) => {
    setMobileMenuOpen(false);
    if (!id || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'HOME', sectionId: 'home', icon: '🏛️' },
    { label: 'LIVE EVENTS', sectionId: 'our-story-section', icon: '🎤' },
    { label: 'DINE IN', sectionId: 'menu-matrix-section', icon: '🍽️' },
    { label: 'ONLINE ORDER', sectionId: 'menu-matrix-section', icon: '🛍️' },
    { label: 'CATERING', sectionId: 'culinary-delightful-section', icon: '🍢' },
    { label: 'RENT AN EVENT SPACE', sectionId: 'reserve-a-space-section', icon: '🥂' },
  ];

  return (
    <>
      {/* 45-Degree Diagonal Ticket Ribbon across Top Right Corner */}
      <div className="fixed top-0 right-0 z-50 pointer-events-none w-28 h-28 sm:w-36 sm:h-36 overflow-hidden select-none">
        <button
          id="diagonal-ticket-ribbon-btn"
          onClick={() => {
            if (onOpenTickets) {
              onOpenTickets();
            } else {
              scrollToSection('our-story-section');
            }
          }}
          className="absolute top-4 -right-10 sm:top-6 sm:-right-10 w-36 sm:w-44 py-1 sm:py-1.5 bg-gradient-to-r from-[#b37a2b] via-[#f7d688] to-[#b37a2b] text-[#121619] font-medium font-['Raleway'] tracking-[0.18em] text-[9px] sm:text-[11px] uppercase text-center shadow-[0_4px_20px_rgba(0,0,0,0.8)] rotate-45 pointer-events-auto cursor-pointer hover:brightness-110 active:scale-95 transition-all border-y border-[#fff3cf]/60 flex items-center justify-center space-x-1 group"
          title="Buy Concert & Live Show Tickets"
        >
          <span className="text-xs sm:text-sm">🎟️</span>
          <span className="font-semibold group-hover:tracking-[0.22em] transition-all">TICKETS</span>
        </button>
      </div>

      {/* Header Container: sheer gradient at top, solid dark burgundy-charcoal backdrop when scrolled */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#180309]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.9)] border-b border-[#521324]/60'
            : 'bg-gradient-to-b from-[#180309]/80 via-[#180309]/50 to-transparent backdrop-blur-[3px]'
        }`}
      >
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-24 sm:h-28 md:h-32 flex items-center justify-between">
          
          {/* Mobile Hamburger on TOP-LEFT with custom 3-line morphing animation */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-11 h-11 flex flex-col items-center justify-center rounded-xl bg-[#2d0713]/80 hover:bg-[#430b1c] border border-[#831f3b]/70 hover:border-[#d4a359] text-[#f5d79e] focus:outline-none cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {/* Top Bar */}
              <span
                className={`w-5.5 h-0.5 bg-[#f3cf8a] rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? 'rotate-45 translate-y-2 bg-[#f7d688] shadow-[0_0_8px_#d4a359]'
                    : '-translate-y-1 group-hover:w-6'
                }`}
              />
              {/* Middle Bar */}
              <span
                className={`w-5.5 h-0.5 bg-[#f3cf8a] rounded-full transition-all duration-200 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 my-0.5 group-hover:w-4.5'
                }`}
              />
              {/* Bottom Bar */}
              <span
                className={`w-5.5 h-0.5 bg-[#f3cf8a] rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? '-rotate-45 -translate-y-1 bg-[#f7d688] shadow-[0_0_8px_#d4a359]'
                    : 'translate-y-1 group-hover:w-6'
                }`}
              />
            </button>
          </div>

          {/* Brand Logo / Title Lockup */}
          <div 
            className="flex items-center cursor-pointer select-none py-1 group"
            onClick={() => scrollToSection('home')}
          >
            <div className="group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <img 
                src="/images/flame-logo.png?v=4" 
                alt="Flame International" 
                className="h-20 sm:h-24 md:h-28 lg:h-30 w-auto object-contain filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)] max-h-full py-0.5" 
                onError={(e) => {
                  e.currentTarget.src = '/flame_logo_whiteBORDER.svg';
                }}
              />
            </div>
          </div>

          {/* Top Navigation Menu Items - All Caps */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-7 text-xs xl:text-sm font-['Raleway'] tracking-[0.14em] text-[#ffffff] font-medium uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {navItems.map((item) => (
              <span
                key={item.label}
                className="transition-all py-1 font-medium text-white/90 select-none tracking-wider"
              >
                {item.label}
              </span>
            ))}
          </nav>

          {/* Right Action: Single Light / Dark Mode Button */}
          <div className="flex items-center space-x-2 mr-8 sm:mr-12 lg:mr-0">
            <button
              id="single-mode-toggle-btn"
              onClick={() => onToggleMode(mode === 'lunch' ? 'night' : 'lunch')}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#2d0713]/80 border border-[#831f3b]/70 text-[#f5d79e] hover:text-white hover:border-[#d4a359] text-[10.5px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer active:scale-95 backdrop-blur-md"
              title={mode === 'lunch' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {mode === 'lunch' ? (
                <>
                  <span className="text-xs sm:text-sm leading-none">🌙</span>
                  <span className="text-[10px] sm:text-xs font-medium font-['Raleway']">DARK</span>
                </>
              ) : (
                <>
                  <span className="text-xs sm:text-sm leading-none">☀️</span>
                  <span className="text-[10px] sm:text-xs font-medium font-['Raleway']">LIGHT</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-drawer-flutter"
              initial={{ opacity: 0, height: 0, scaleY: 0.85, y: -24, transformOrigin: 'top center' }}
              animate={{ 
                opacity: 1, 
                height: 'auto', 
                scaleY: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.08,
                  delayChildren: 0.12,
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0, 
                scaleY: 0.9,
                y: -16,
                transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] } 
              }}
              className="lg:hidden bg-gradient-to-b from-[#180309]/98 via-[#22040d]/95 to-[#150207]/98 backdrop-blur-2xl border-b-2 border-[#831f3b]/80 shadow-[0_30px_60px_rgba(0,0,0,0.95)] overflow-hidden font-['Raleway']"
            >
              <motion.div 
                className="px-5 pt-3 pb-7 space-y-2 divide-y divide-[#4d0c1f]/40"
              >
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="w-full py-3.5 px-3.5 rounded-xl flex items-center justify-between text-base font-medium tracking-wider uppercase text-[#f5f1ea]"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm opacity-80">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                  </div>
                ))}

                {/* Mobile Action Buttons */}
                <div className="pt-4 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenTickets) {
                        onOpenTickets();
                      } else {
                        scrollToSection('our-story-section');
                      }
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-[#b37a2b] via-[#f7d688] to-[#d4a359] text-black font-extrabold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2 shadow-[0_4px_20px_rgba(212,163,89,0.35)] active:scale-95 transition-transform cursor-pointer"
                  >
                    <span>🎟️</span>
                    <span>BUY EVENT TICKETS</span>
                  </button>
                  
                  <a
                    href="tel:+13104440045"
                    className="w-full py-3 bg-[#2d0713] hover:bg-[#430b1c] border border-[#831f3b] text-[#f5d79e] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 shadow-md transition-colors"
                  >
                    <Phone size={14} className="text-[#d4a359]" />
                    <span>Call Concierge: (310) 444-0045</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
