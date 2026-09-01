import React from 'react';
import { ArrowRight, Sparkles, Users, Building2, Home } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface CulinarySectionProps {
  onMakeReservation: () => void;
  onOpenDish: (dishId: string) => void;
  mode?: AppMode;
}

const CATERING_CARDS = [
  {
    id: 'corporate',
    icon: Building2,
    badge: 'Corporate Catering',
    title: 'Office & Corporate Events',
    description: 'Impress your team and clients with lavish Persian kabab spreads, saffron rice, and mazzeh platters delivered fresh to your boardroom or event hall.',
    cta: 'Plan Corporate Catering',
    image: '/images/hero-catering.png',
    imageAlt: 'Large corporate office group lunch with Persian food spread',
    overlayLabel: 'Corporate Lunch Packages',
  },
  {
    id: 'wedding',
    icon: Sparkles,
    badge: 'Wedding Catering',
    title: 'Weddings & Celebrations',
    description: 'Make your wedding unforgettable with a grand Persian feast — royal Soltani platters, fesenjan, jewelled rice and a full dessert station with bastani and baklava.',
    cta: 'Get Wedding Quote',
    image: '/images/poster_cabaret_gala.png',
    imageAlt: 'Wedding reception banquet with Persian food on elegantly set tables',
    overlayLabel: 'Wedding Banquet Packages',
  },
  {
    id: 'private',
    icon: Home,
    badge: 'Private Party',
    title: 'Home & Private Gatherings',
    description: 'From intimate family dinners to backyard parties, our catering team brings Flame\'s legendary charcoal kababs and aromatic stews straight to your home.',
    cta: 'Request Private Party Menu',
    image: '/images/hero-dine-in.png',
    imageAlt: 'Private home party gathering with Persian food spread on dining table',
    overlayLabel: 'Private Party Packages',
  },
];


export const CulinarySection: React.FC<CulinarySectionProps> = ({
  onMakeReservation,
  mode = 'lunch',
}) => {
  const isNight = mode === 'night';

  return (
    <section
      id="culinary-delightful-section"
      className={`py-20 lg:py-28 px-4 sm:px-6 lg:px-12 transition-colors duration-700 ${
        isNight
          ? 'bg-[#0d0205] text-[#f5f1ea] border-t border-[#1f0a10]/80'
          : 'bg-[#faf8f5] text-[#1c1f24] border-t border-[#f0ece5]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0} duration={800}>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <span className="w-10 h-[1px] bg-[#c6924b]/50" />
              <span className={`text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] ${isNight ? 'text-[#d4a359]' : 'text-[#9e6d2b]'}`}>
                ✦ Full-Service Catering ✦
              </span>
              <span className="w-10 h-[1px] bg-[#c6924b]/50" />
            </div>

            <div className="space-y-1">
              <h3 className={`font-script text-4xl sm:text-5xl md:text-6xl font-normal leading-tight ${
                isNight ? 'text-[#f3cf8a]' : 'text-[#c6924b]'
              }`}>
                We Cater
              </h3>
              <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
                isNight ? 'text-white' : 'text-stone-950'
              }`}>
                Your Event, Our Kitchen
              </h2>
            </div>

            <p className={`text-base sm:text-lg lg:text-xl leading-relaxed font-normal ${
              isNight ? 'text-gray-100' : 'text-stone-900'
            }`}>
              Whether it's a backyard birthday, a boardroom lunch, or a grand wedding banquet — <strong className={isNight ? 'text-white' : 'text-black'}>Flame International</strong> brings authentic Persian flavours, charcoal-grilled kababs, and saffron feasts directly to your venue.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center justify-center">
              <button
                onClick={onMakeReservation}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9e1c38] to-[#d4a359] hover:from-[#c22345] hover:to-[#f3cf8a] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center space-x-2"
              >
                <Sparkles size={16} className="text-[#fbe8a6]" />
                <span>Request Catering Quote</span>
              </button>
              <a
                href="tel:3104440045"
                className={`group inline-flex items-center space-x-2 text-sm uppercase tracking-widest font-bold border-b pb-1 transition-all duration-300 cursor-pointer ${
                  isNight
                    ? 'text-[#f3cf8a] hover:text-white border-[#f3cf8a]/70'
                    : 'text-[#8c6227] hover:text-[#212429] border-[#c6924b]'
                }`}
              >
                <span>Call 310-444-0045</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Catering Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CATERING_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <RevealOnScroll key={card.id} direction="up" delay={idx * 150} duration={850}>
                <div
                  onClick={onMakeReservation}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl border ${
                    isNight
                      ? 'bg-[#110308] border-[#2d0715] hover:border-[#d4a359]/60 hover:shadow-[0_20px_60px_rgba(212,163,89,0.2)]'
                      : 'bg-white border-stone-300 hover:border-[#d4a359]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]'
                  }`}
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = '/images/hero-catering.png'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out contrast-[1.03]"
                    />

                    {/* Badge pill */}
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/20 border border-white/20 backdrop-blur-[2px] shadow-md">
                      <Icon size={13} className="text-[#d4a359]" />
                      <span className="text-[#f3cf8a] text-xs font-bold uppercase tracking-wider">{card.badge}</span>
                    </div>

                    {/* Bottom image label */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-white bg-black/25 border border-white/20 backdrop-blur-[2px] px-3 py-1 rounded-lg shadow-md inline-block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{card.overlayLabel}</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                      isNight ? 'text-white' : 'text-stone-950'
                    }`}>
                      {card.title}
                    </h3>

                    <p className={`text-sm sm:text-base leading-relaxed font-normal ${
                      isNight ? 'text-gray-200' : 'text-stone-800'
                    }`}>
                      {card.description}
                    </p>

                    <div className={`inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider pt-1 transition-colors group-hover:translate-x-1 ${
                      isNight ? 'text-[#f3cf8a]' : 'text-[#9e1c38]'
                    }`}>
                      <span>{card.cta}</span>
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>


        {/* Bottom: 2 Scenario Photo Cards — Home Party & Office Get-Together */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Home Party Card */}
          <RevealOnScroll direction="up" delay={400} duration={800}>
            <div
              onClick={onMakeReservation}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl border ${
                isNight
                  ? 'border-[#2d0715] hover:border-[#d4a359]/60 hover:shadow-[0_20px_60px_rgba(212,163,89,0.2)]'
                  : 'border-stone-200 hover:border-[#d4a359]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
              }`}
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src="/images/hero-dine-in.png"
                  alt="Home party Persian food spread on dining table"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = '/images/hero-dine-in.png'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out contrast-[1.03]"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/20 border border-white/20 backdrop-blur-[2px] shadow-sm">
                  <Home size={11} className="text-[#d4a359]" />
                  <span className="text-[#f3cf8a] text-[10px] font-bold uppercase tracking-widest">Home Party</span>
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="text-white bg-black/25 border border-white/20 backdrop-blur-[2px] px-3.5 py-1.5 rounded-xl font-serif text-base font-bold shadow-md inline-block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Home Gatherings</span>
                </div>
              </div>

              {/* Text */}
              <div className={`p-5 space-y-2 ${isNight ? 'bg-[#110308]' : 'bg-white'}`}>
                <p className={`text-sm leading-relaxed font-light ${isNight ? 'text-gray-300' : 'text-stone-600'}`}>
                  Backyard barbecues, birthday feasts, family Nowruz celebrations — our team sets up a full Persian kabab station right at your home.
                </p>
                <div className={`inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest pt-1 group-hover:translate-x-1 transition-transform ${isNight ? 'text-[#f3cf8a]' : 'text-[#9e1c38]'}`}>
                  <span>Plan My Home Party</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Office Get-Together Card */}
          <RevealOnScroll direction="up" delay={550} duration={800}>
            <div
              onClick={onMakeReservation}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl border ${
                isNight
                  ? 'border-[#2d0715] hover:border-[#d4a359]/60 hover:shadow-[0_20px_60px_rgba(212,163,89,0.2)]'
                  : 'border-stone-200 hover:border-[#d4a359]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
              }`}
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src="/images/hero-catering.png"
                  alt="Office team lunch catering spread with kabab platters"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = '/images/hero-catering.png'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out contrast-[1.03]"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/20 border border-white/20 backdrop-blur-[2px] shadow-sm">
                  <Building2 size={11} className="text-[#d4a359]" />
                  <span className="text-[#f3cf8a] text-[10px] font-bold uppercase tracking-widest">Office Catering</span>
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="text-white bg-black/25 border border-white/20 backdrop-blur-[2px] px-3.5 py-1.5 rounded-xl font-serif text-base font-bold shadow-md inline-block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Office Get-Together</span>
                </div>
              </div>

              {/* Text */}
              <div className={`p-5 space-y-2 ${isNight ? 'bg-[#110308]' : 'bg-white'}`}>
                <p className={`text-sm leading-relaxed font-light ${isNight ? 'text-gray-300' : 'text-stone-600'}`}>
                  Team lunches, quarterly reviews, client appreciation events — hot saffron trays, grilled kababs and mazzeh platters delivered to your office, boardroom-ready.
                </p>
                <div className={`inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest pt-1 group-hover:translate-x-1 transition-transform ${isNight ? 'text-[#f3cf8a]' : 'text-[#9e1c38]'}`}>
                  <span>Book Office Catering</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </RevealOnScroll>


        </div>

      </div>
    </section>
  );
};
