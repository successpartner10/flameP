/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppMode, CartItem, MenuItem } from './types';
import { MENU_ITEMS } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { MenuMatrixSection } from './components/MenuMatrixSection';
import { CulinarySection } from './components/CulinarySection';
import { ReserveSpaceSection } from './components/ReserveSpaceSection';
import { FooterSection } from './components/FooterSection';
import { BottomStickyNav, BottomNavAction } from './components/BottomStickyNav';
import { MenuModal } from './components/MenuModal';
import { ReservationModal } from './components/ReservationModal';
import { BagDrawer } from './components/BagDrawer';
import { FunctionsModal } from './components/FunctionsModal';
import { AboutModal } from './components/AboutModal';
import { TicketModal } from './components/TicketModal';
import { CateringModal } from './components/CateringModal';
import { BackToTopButton } from './components/BackToTopButton';

export default function App() {
  // Mode state: 'lunch' (☀️ Lunch Hub) or 'night' (🌙 Cabaret & Night)
  const [mode, setMode] = useState<AppMode>('lunch');

  // Bottom Navigation state (Home, Live Entertainment, Dine-In, Lunch, Dinner, Contact Us)
  const [activeBottomAction, setActiveBottomAction] = useState<BottomNavAction>('home');
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');

  // Modal screen states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedReserveSpace, setSelectedReserveSpace] = useState<string | undefined>(undefined);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isFunctionsOpen, setIsFunctionsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTicketsOpen, setIsTicketsOpen] = useState(false);
  const [isCateringOpen, setIsCateringOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState("Arand & Shahyar Ghanbari Live in Concert");
  const [selectedEventDate, setSelectedEventDate] = useState("Saturday, September 12, 2026");

  const [highlightDishId, setHighlightDishId] = useState<string | null>(null);

  // Cart / Bag state
  const [cart, setCart] = useState<CartItem[]>([
    {
      item: MENU_ITEMS[3],
      quantity: 1,
    }
  ]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.item.id !== itemId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.item.id === itemId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Open specific dish in menu
  const handleOpenDish = (dishId: string) => {
    setHighlightDishId(dishId);
    setMenuInitialCategory('all');
    setIsMenuOpen(true);
  };

  // Open ticket checkout
  const handleOpenTickets = (eventTitle?: string, eventDate?: string) => {
    if (eventTitle) setSelectedEventTitle(eventTitle);
    if (eventDate) setSelectedEventDate(eventDate);
    setIsTicketsOpen(true);
  };

  // Navigation handlers - all bound to in-page smooth scrolls or in-page modals
  const handleOpenLunch = () => {
    setMode('lunch');
    const el = document.getElementById('menu-matrix-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDinner = () => {
    setMode('night');
    const el = document.getElementById('menu-matrix-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOrderOnline = () => {
    setIsBagOpen(true);
  };

  const handleOpenCatering = () => {
    const el = document.getElementById('culinary-delightful-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsCateringOpen(true);
    }
  };

  // Handle in-page navigation (pure single-page flow, no subpage routing)
  const handleSelectPage = (slug: string) => {
    if (slug === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (slug === 'live-events') {
      const el = document.getElementById('our-story-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (slug === 'dine-in' || slug === 'menus') {
      const el = document.getElementById('menu-matrix-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (slug === 'online-order') {
      setIsBagOpen(true);
    } else if (slug === 'catering') {
      const el = document.getElementById('culinary-delightful-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (slug === 'reserve-space' || slug === 'reserve') {
      const el = document.getElementById('reserve-a-space-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (slug === 'contact') {
      const el = document.getElementById('find-us-footer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (slug === 'about') {
      setIsAboutOpen(true);
    } else if (slug === 'functions') {
      setIsFunctionsOpen(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Bottom Navigation tab selector
  const handleBottomNavigate = (action: BottomNavAction) => {
    setActiveBottomAction(action);
    if (action === 'home') {
      handleSelectPage('home');
    } else if (action === 'live-events') {
      handleSelectPage('live-events');
    } else if (action === 'dine-in') {
      handleSelectPage('dine-in');
    } else if (action === 'order-online') {
      handleSelectPage('online-order');
    } else if (action === 'catering') {
      handleSelectPage('catering');
    } else if (action === 'reserve') {
      handleSelectPage('reserve-space');
    } else if (action === 'contact') {
      handleSelectPage('contact');
    } else if (action === 'lunch') {
      handleOpenLunch();
    } else if (action === 'dinner') {
      handleOpenDinner();
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('our-story-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#180309] text-[#f7e8ea] transition-colors duration-700 ${
      mode === 'night' ? 'night-atmosphere' : 'lunch-atmosphere'
    }`}>
      
      {/* Fixed Top Header with Navigation anchored to single-page sections */}
      <Header
        mode={mode}
        onToggleMode={(newMode) => setMode(newMode)}
        onOpenTickets={() => handleOpenTickets()}
      />

      {/* Main Home Editorial Screen - Standalone Single HTML Page for Netlify */}
      <main className="relative">
        
        {/* 1. Hero Section ("The true taste of Flame International") */}
        <HeroSection
          mode={mode}
          onExploreMenu={() => handleSelectPage('dine-in')}
          onBookTable={() => handleSelectPage('reserve-space')}
          onScrollToStory={scrollToStory}
        />

        {/* 2. Persian Live Events & Heritage + September 12 Concert Poster + Ticket Links (1st Section under Hero) */}
        <StorySection
          mode={mode}
          onLearnMore={() => setIsAboutOpen(true)}
          onReserve={() => handleSelectPage('reserve-space')}
          onOpenTickets={handleOpenTickets}
        />

        {/* 3. Four Ways to Experience: Lunch, Dinner, Online Order, Catering (Below Live Events) */}
        <MenuMatrixSection
          mode={mode}
          onOpenLunch={handleOpenLunch}
          onOpenDinner={handleOpenDinner}
          onOpenOrderOnline={handleOpenOrderOnline}
          onOpenCatering={handleOpenCatering}
        />

        {/* 4. Catering Showcase Section */}
        <CulinarySection
          mode={mode}
          onMakeReservation={() => {
            setSelectedReserveSpace(undefined);
            setIsReserveOpen(true);
          }}
          onOpenDish={handleOpenDish}
        />

        {/* 5. Rent an Event Space for Events & Banquets (Just above Footer) */}
        <ReserveSpaceSection
          mode={mode}
          onReserveSpace={(spaceName) => {
            setSelectedReserveSpace(spaceName);
            setIsReserveOpen(true);
          }}
        />

      </main>

      {/* Footer (3-column layout) */}
      <FooterSection
        mode={mode}
        isHomePage={true}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenMenu={() => {
          setMenuInitialCategory('all');
          setIsMenuOpen(true);
        }}
        onOpenStories={() => handleSelectPage('live-events')}
        onOpenReserve={() => {
          setSelectedReserveSpace(undefined);
          setIsReserveOpen(true);
        }}
        onOpenFunctions={() => setIsFunctionsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => handleSelectPage('contact')}
      />

      {/* Sticky Bottom Navigation (Home, Live Entertainment, Dine-In, Order Online, Contact) */}
      <BottomStickyNav
        mode={mode}
        activeAction={activeBottomAction}
        onNavigate={handleBottomNavigate}
      />

      {/* Interactive In-Page Modal Overlays */}
      
      {/* Full Menu Modal */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
          setHighlightDishId(null);
          if (activeBottomAction === 'lunch' || activeBottomAction === 'dinner') {
            setActiveBottomAction('home');
          }
        }}
        onAddToCart={handleAddToCart}
        mode={mode}
        onToggleMode={(newMode) => setMode(newMode)}
        highlightDishId={highlightDishId}
        initialCategory={menuInitialCategory}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReserveOpen}
        mode={mode}
        initialSpace={selectedReserveSpace}
        onClose={() => {
          setIsReserveOpen(false);
          setSelectedReserveSpace(undefined);
          setActiveBottomAction('home');
        }}
      />

      {/* Concert & Live Stage Ticket Modal */}
      <TicketModal
        isOpen={isTicketsOpen}
        onClose={() => setIsTicketsOpen(false)}
        initialEventTitle={selectedEventTitle}
        initialEventDate={selectedEventDate}
      />

      {/* Catering & Private Events Modal */}
      <CateringModal
        isOpen={isCateringOpen}
        onClose={() => setIsCateringOpen(false)}
      />

      {/* Order Bag / Quick Checkout Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => {
          setIsBagOpen(false);
        }}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onExploreMenu={() => {
          setIsBagOpen(false);
          setMenuInitialCategory('all');
          setIsMenuOpen(true);
        }}
      />

      {/* Functions & Private Dining Modal */}
      <FunctionsModal
        isOpen={isFunctionsOpen}
        onClose={() => setIsFunctionsOpen(false)}
      />

      {/* About Us & Heritage Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenReserve={() => {
          setIsAboutOpen(false);
          setIsReserveOpen(true);
        }}
      />

      {/* Discreet Global Back to Top Button */}
      <BackToTopButton />

    </div>
  );
}
