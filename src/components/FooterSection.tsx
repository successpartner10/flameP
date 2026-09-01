import React from 'react';
import { 
  Clock, Phone, Mail, Instagram, Facebook, Linkedin, 
  MessageCircle
} from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

export interface FooterSectionProps {
  onOpenReserve?: () => void;
  onOpenFunctions?: () => void;
  onScrollToTop?: () => void;
  onOpenMenu?: () => void;
  onOpenStories?: () => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  mode?: AppMode;
  isHomePage?: boolean;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenReserve,
  onOpenContact,
  mode = 'lunch',
}) => {
  return (
    <footer id="find-us-footer" className="relative bg-[#180309] text-[#f7e8ea] pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden font-['Raleway']">
      
      {/* Curved Architectural Top Wave Transition - With Animated Continuous Moving Gold Glow Line */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden leading-none z-10">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={`w-full h-10 sm:h-16 md:h-20 transition-colors duration-700 ${
            mode === 'night' ? 'text-[#180309]' : 'text-[#ffffff]'
          }`}
        >
          <defs>
            <linearGradient id="footerGoldWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b37a2b" />
              <stop offset="25%" stopColor="#f7d688" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f7d688" />
              <stop offset="100%" stopColor="#b37a2b" />
              <animate
                attributeName="x1"
                from="-100%"
                to="100%"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                from="0%"
                to="200%"
                dur="4s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <filter id="footerGoldGlow" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#d4a359" floodOpacity="0.85" />
            </filter>
          </defs>
          <path 
            d="M 0,0 L 1440,0 L 1440,28 C 860,10 380,95 0,55 Z" 
            fill="currentColor" 
          />
          {/* Radiant Gold Indicator Line with Animated Continuous Moving Shimmer */}
          <path 
            d="M 0,55 C 380,95 860,10 1440,28" 
            fill="none" 
            stroke="url(#footerGoldWaveGrad)" 
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#footerGoldGlow)"
          />
        </svg>
      </div>

      {/* Subtle Warm Amber Ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,163,89,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        
        {/* 3 Distinct Column Responsive Cards */}
        <RevealOnScroll direction="up" delay={150} duration={850} className="w-full max-w-6xl">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch font-['Raleway']">
            
            {/* 1ST COLUMN: BIGGER LOGO & ADDRESS CARD (No Valet Parking Text, Box Height Preserved) */}
            <div className="bg-[#1c030b]/90 border border-[#6b152d]/60 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-center space-y-5 h-full">
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <img 
                  src="/images/flame-logo.png?v=4" 
                  alt="Flame International" 
                  className="h-28 sm:h-32 md:h-36 w-auto object-contain filter drop-shadow-[0_6px_20px_rgba(212,163,89,0.4)] hover:scale-105 transition-transform duration-300" 
                  onError={(e) => {
                    e.currentTarget.src = '/flame_logo_whiteBORDER.svg';
                  }}
                />
                
                <div className="space-y-2 pt-1">
                  <span className="text-xs sm:text-sm tracking-[0.25em] text-[#f5a7b8] uppercase font-['Raleway'] font-semibold block">
                    FIND US / VISIT US
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider font-['Raleway']">
                    ON <span className="text-[#f3cf8a]">SANTA MONICA BOULEVARD</span>
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-['Raleway'] font-medium">
                    11330 Santa Monica Blvd<br />West Los Angeles, CA 90025
                  </p>
                </div>
              </div>
            </div>

            {/* 2ND COLUMN: HOURS OF OPERATION CARD (No Explore Menu Button, Box Height Preserved) */}
            <div className="bg-[#1c030b]/90 border border-[#6b152d]/60 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full space-y-5">
              <div className="flex items-center space-x-2.5 text-[#d4a359] border-b border-[#521324] pb-3">
                <Clock size={22} />
                <h4 className="text-base sm:text-lg uppercase tracking-[0.18em] font-['Raleway'] font-bold">Hours of Operation</h4>
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-4 py-2">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#280510]/90 border border-[#521324]">
                  <span className="text-white font-medium text-sm sm:text-base">Monday – Sunday:</span>
                  <span className="text-[#f5d79e] font-bold text-base sm:text-lg font-['Raleway']">11:30 AM – 11:00 PM</span>
                </div>
                <p className="text-sm sm:text-base text-[#f5a7b8] leading-relaxed">
                  Open 7 days a week for Lunch, Dinner, Craft Cocktails, Persian Banquets, and Nightly Live Entertainment.
                </p>
              </div>
            </div>

            {/* 3RD COLUMN: DIRECT CONTACT & SOCIAL CONCIERGE CARD (No Direct Concierge / Call Now banner) */}
            <div className="bg-[#1c030b]/90 border border-[#6b152d]/60 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full space-y-5">
              <div className="flex items-center space-x-2.5 text-[#d4a359] border-b border-[#521324] pb-3">
                <Phone size={22} />
                <h4 className="text-base sm:text-lg uppercase tracking-[0.18em] font-['Raleway'] font-bold">Contact &amp; Social</h4>
              </div>

              {/* Communication Icon Row with Interactive Hover Tooltips */}
              <div className="flex-1 flex flex-col justify-center py-2">
                <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                  {/* 1. Phone */}
                  <div className="relative group flex justify-center">
                    <a
                      href="tel:+13104440045"
                      className="w-full h-12 rounded-xl bg-[#280510] hover:bg-[#d4a359] text-[#f5d79e] hover:text-black border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Call: (310) 444-0045"
                    >
                      <Phone size={20} />
                    </a>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/95 border border-[#d4a359]/60 text-xs text-[#f5d79e] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                      Call (310) 444-0045
                    </span>
                  </div>

                  {/* 2. WhatsApp */}
                  <div className="relative group flex justify-center">
                    <a
                      href="https://wa.me/13104440045"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full h-12 rounded-xl bg-[#280510] hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="WhatsApp Concierge"
                    >
                      <MessageCircle size={20} />
                    </a>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/95 border border-green-500/60 text-xs text-green-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                      WhatsApp Chat
                    </span>
                  </div>

                  {/* 3. Email */}
                  <div className="relative group flex justify-center">
                    <a
                      href="mailto:contact@flameinternational.com"
                      className="w-full h-12 rounded-xl bg-[#280510] hover:bg-[#ea4335] text-[#f5d79e] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Email Concierge"
                    >
                      <Mail size={20} />
                    </a>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/95 border border-red-500/60 text-xs text-red-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                      Email Concierge
                    </span>
                  </div>

                  {/* 4. Instagram */}
                  <div className="relative group flex justify-center">
                    <a
                      href="https://instagram.com/flameinternational"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full h-12 rounded-xl bg-[#280510] hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] text-[#f5d79e] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Instagram Profile"
                    >
                      <Instagram size={20} />
                    </a>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/95 border border-pink-500/60 text-xs text-pink-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                      Instagram @flame
                    </span>
                  </div>

                  {/* 5. Facebook */}
                  <div className="relative group flex justify-center">
                    <a
                      href="https://facebook.com/flameinternational"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full h-12 rounded-xl bg-[#280510] hover:bg-[#1877F2] text-[#f5d79e] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Facebook Page"
                    >
                      <Facebook size={20} />
                    </a>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/95 border border-blue-500/60 text-xs text-blue-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                      Facebook Page
                    </span>
                  </div>

                  {/* 6. LinkedIn */}
                  <div className="relative group flex justify-center">
                    <a
                      href="https://linkedin.com/company/flame-international"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full h-12 rounded-xl bg-[#280510] hover:bg-[#0A66C2] text-[#f5d79e] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={20} />
                    </a>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/95 border border-sky-500/60 text-xs text-sky-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                      LinkedIn Profile
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Page Full-Width CTA */}
              <div className="pt-2">
                <button
                  id="footer-contact-page-btn"
                  onClick={onOpenContact || onOpenReserve}
                  className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] text-black font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md flex items-center justify-center space-x-2.5"
                >
                  <Mail size={18} className="text-black" />
                  <span>CONTACT US</span>
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom Credits - Clean, No CMS references */}
        <div className="mt-6 sm:mt-8 text-center font-['Raleway']">
          <p className="font-medium text-xs sm:text-sm text-white/60 tracking-wider">
            © 2026 FLAME INTERNATIONAL. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  );
};
