import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to Top"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#180309]/90 border border-[#d4a359]/60 text-[#f3cf8a] hover:bg-gradient-to-r hover:from-[#d4a359] hover:to-[#f3cf8a] hover:text-black shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 group cursor-pointer"
      title="Back to Top"
    >
      <ChevronUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};
