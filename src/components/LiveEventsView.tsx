import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Calendar,
  Ticket,
  Sparkles,
  Phone,
  MapPin,
  CheckCircle,
  Image as ImageIcon,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Loader2,
  Check,
  Plus,
} from 'lucide-react';
import { AppMode } from '../types';

interface LiveEventsViewProps {
  mode: AppMode;
  onOpenTickets?: () => void;
  onOpenReservation?: () => void;
}

export const LiveEventsView: React.FC<LiveEventsViewProps> = ({
  mode,
  onOpenTickets,
  onOpenReservation,
}) => {
  const isNight = mode === 'night';
  const [activeTab, setActiveTab] = useState<'tickets' | 'gallery'>('tickets');
  const [selectedPosterIndex, setSelectedPosterIndex] = useState<number | null>(null);
  const [featuredFlyerModal, setFeaturedFlyerModal] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all images from /public/gallery
  const fetchGalleryImages = async () => {
    try {
      setIsLoadingGallery(true);
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        if (data.images) {
          const urls = data.images.map((img: { url: string }) => img.url);
          setGalleryImages(urls);
        }
      }
    } catch (e) {
      console.warn('Error loading gallery images:', e);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.files && Array.isArray(data.files)) {
          const newUrls = data.files.map((f: { url: string }) => f.url);
          setGalleryImages((prev) => [...newUrls, ...prev]);
        }
        setUploadToast(`✓ Successfully uploaded ${files.length} poster${files.length > 1 ? 's' : ''} to gallery archive!`);
        setTimeout(() => setUploadToast(null), 5000);
        await fetchGalleryImages();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || 'Failed to upload posters');
      }
    } catch (err: any) {
      console.error('Gallery upload error:', err);
      alert('Network error while uploading posters');
    } finally {
      setIsUploading(false);
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = '';
      }
    }
  };

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (galleryImages.length === 0) return;
    setSelectedPosterIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % galleryImages.length;
    });
  }, [galleryImages.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (galleryImages.length === 0) return;
    setSelectedPosterIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + galleryImages.length) % galleryImages.length;
    });
  }, [galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPosterIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setSelectedPosterIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPosterIndex, handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }
    setTouchStartX(null);
  };

  return (
    <div className="space-y-12 font-['Raleway']">
      
      {/* 1. TOP MAIN EVENT FLYER: Full-width aspect-fitted poster frame (no distortion of faces, body, or text/dates) */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0d0205] border-2 border-[#d4a359]/70 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-4 sm:p-8">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#38081a]/50 via-black/80 to-[#180309] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#d4a359]/20 border border-[#d4a359] text-[#f3cf8a] text-xs uppercase tracking-[0.25em] font-bold shadow-lg">
            <Sparkles size={14} className="text-[#d4a359]" />
            <span>FEATURED LIVE CONCERT EVENT</span>
          </div>

          {/* Poster Image Frame (Full Height / Width Container without Distortion) */}
          <div className="w-full flex justify-center py-2">
            <div 
              onClick={() => setFeaturedFlyerModal('/images/poster_shahyar_arand.png')}
              className="relative max-w-xl w-full rounded-2xl overflow-hidden shadow-[0_15px_45px_rgba(212,163,89,0.25)] border border-[#d4a359]/80 cursor-pointer group transition-transform duration-500 hover:scale-[1.01]"
            >
              <img
                src="/images/poster_shahyar_arand.png"
                alt="Flame International Presents Arand & Shahyar Ghanbari Saturday September 12th"
                className="w-full h-auto object-contain max-h-[680px] mx-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <span className="px-5 py-2 rounded-full bg-[#d4a359] text-black font-bold text-xs uppercase tracking-widest shadow-xl">
                  Click to View High-Res Flyer
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Bar under Flyer */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {onOpenTickets && (
              <button
                onClick={onOpenTickets}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] hover:brightness-110 text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_10px_25px_rgba(212,163,89,0.4)] active:scale-95 flex items-center space-x-2"
              >
                <Ticket size={18} />
                <span>BOOK TICKETS NOW</span>
              </button>
            )}
            <a
              href="tel:3104440045"
              className="px-6 py-3.5 rounded-full bg-[#280510] hover:bg-[#3d0818] text-[#f5d79e] border border-[#831f3b] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center space-x-2"
            >
              <Phone size={16} className="text-[#d4a359]" />
              <span>VIP Hotline (310) 444-0045</span>
            </a>
          </div>

        </div>
      </section>

      {/* 2. DYNAMIC NAVIGATION / FILTER TABS */}
      <section id="ticketing-section" className="space-y-8">
        <div className="flex justify-center border-b border-[#521324] pb-4">
          <div className="inline-flex p-1.5 rounded-full bg-[#1c030b] border border-[#6b152d] shadow-xl">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'tickets'
                  ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black shadow-lg scale-105'
                  : 'text-[#f5a7b8] hover:text-white'
              }`}
            >
              <Ticket size={16} />
              <span>Upcoming Tickets &amp; Galas</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black shadow-lg scale-105'
                  : 'text-[#f5a7b8] hover:text-white'
              }`}
            >
              <ImageIcon size={16} />
              <span>Past Concert Poster Gallery</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT 1: UPCOMING TICKETS & GALAS */}
        {activeTab === 'tickets' && (
          <div id="ticketing-section" className="space-y-8 animate-fadeIn">
            
            <div className="text-center space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Upcoming Concerts &amp; Special Events</h3>
              <p className="text-sm sm:text-base text-gray-200">Select an event below to reserve VIP tables or general concert admission tickets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* EVENT 1 CARD */}
              <div className="bg-[#1c030b] border border-[#6b152d] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#d4a359] transition-all duration-300">
                <div className="relative h-72 overflow-hidden bg-black">
                  <img
                    src="/images/poster_shahyar_arand.png"
                    alt="Shahyar Ghanbari & Arand Live Concert"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-red-900/40 text-white border border-red-400/40 text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-[2px]">
                    FEATURED CONCERT
                  </div>
                  <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/25 text-[#f3cf8a] border border-white/20 text-xs sm:text-sm font-bold shadow-md backdrop-blur-[2px]">
                    Sat, Sept 12th
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">Shahyar Ghanbari &amp; Arand Live</h4>
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                      An extraordinary evening of iconic Persian songwriting and contemporary live vocals in our luxury ballroom setting.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-[#280510] border border-[#521324]">
                        <span className="text-white font-semibold">VIP Front Stage Table + Dinner:</span>
                        <span className="text-[#f3cf8a] font-extrabold text-base">$150 / guest</span>
                      </div>
                      <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-[#280510] border border-[#521324]">
                        <span className="text-white font-semibold">General Gala Admission:</span>
                        <span className="text-[#f5d79e] font-extrabold text-base">$75 / guest</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#521324]">
                    <div className="text-xs sm:text-sm text-gray-300 font-semibold">
                      <span>Doors Open: 8:00 PM</span>
                    </div>
                    {onOpenTickets && (
                      <button
                        onClick={onOpenTickets}
                        className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
                      >
                        Book Event 1
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* EVENT 2 CARD */}
              <div className="bg-[#1c030b] border border-[#6b152d] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#d4a359] transition-all duration-300">
                <div className="relative h-72 overflow-hidden bg-black">
                  <img
                    src="/images/poster_cabaret_gala.png"
                    alt="Royal Persian Cabaret Gala"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/25 text-[#f3cf8a] border border-white/20 text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-[2px]">
                    EVERY FRIDAY NIGHT
                  </div>
                  <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/25 text-[#f3cf8a] border border-white/20 text-xs sm:text-sm font-bold shadow-md backdrop-blur-[2px]">
                    Weekly Gala
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">Royal Persian Cabaret &amp; Dance Night</h4>
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                      Live Persian orchestra, traditional dancers, artisan craft cocktails, and skewer platters until 1:00 AM.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-[#280510] border border-[#521324]">
                        <span className="text-white font-semibold">VIP Cabaret Table Service:</span>
                        <span className="text-[#f3cf8a] font-extrabold text-base">$120 / guest</span>
                      </div>
                      <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-[#280510] border border-[#521324]">
                        <span className="text-white font-semibold">General Cabaret Entry:</span>
                        <span className="text-[#f5d79e] font-extrabold text-base">$60 / guest</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#521324]">
                    <div className="text-xs sm:text-sm text-gray-300 font-semibold">
                      <span>Service: 9:00 PM – Late</span>
                    </div>
                    {onOpenTickets && (
                      <button
                        onClick={onOpenTickets}
                        className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
                      >
                        Book Event 2
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB CONTENT 2: PAST CONCERT POSTER GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header with Title & Upload Action Button */}
            <div className="border-b border-[#521324] pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Past Concert &amp; Event Poster Archives</h3>
                <p className="text-xs sm:text-sm text-[#f5a7b8]">
                  {galleryImages.length > 0 
                    ? `${galleryImages.length} poster archive${galleryImages.length > 1 ? 's' : ''}. Click any poster to view full-screen and browse.` 
                    : 'Flame International Concert Archives'}
                </p>
              </div>

              {/* Action Buttons: Upload Posters & Refresh */}
              <div className="flex items-center space-x-3 flex-wrap justify-center">
                <label
                  htmlFor="gallery-media-upload-input"
                  className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer select-none active:scale-95 shadow-xl ${
                    isUploading
                      ? 'bg-amber-600 text-white border border-amber-400 animate-pulse'
                      : 'bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] text-black hover:brightness-110 shadow-[0_4px_20px_rgba(212,163,89,0.35)]'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-black" />
                      <span>Uploading Media...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} className="text-black" />
                      <span>Upload Event Posters</span>
                    </>
                  )}
                </label>
                <input
                  id="gallery-media-upload-input"
                  ref={galleryFileInputRef}
                  type="file"
                  accept="image/*,video/*,.jpg,.jpeg,.png,.webp,.gif,.mp4,.mov,.webm"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={fetchGalleryImages}
                  title="Refresh gallery"
                  className="p-2.5 rounded-full bg-[#1c030b] hover:bg-[#350615] border border-[#6b152d] text-[#f5a7b8] hover:text-white transition-colors cursor-pointer text-xs"
                >
                  <RefreshCw size={15} className={isLoadingGallery ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* Success Toast */}
            {uploadToast && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-between shadow-xl animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <Check size={18} className="text-emerald-400" />
                  <span>{uploadToast}</span>
                </div>
                <button
                  onClick={() => setUploadToast(null)}
                  className="text-emerald-400 hover:text-white text-xs px-2 py-0.5 rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* If images exist, render the clean pure image grid */}
            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
                {galleryImages.map((imgUrl, index) => {
                  const isVideo = imgUrl.endsWith('.mp4') || imgUrl.endsWith('.webm') || imgUrl.endsWith('.mov');
                  return (
                    <div
                      key={`${imgUrl}-${index}`}
                      onClick={() => setSelectedPosterIndex(index)}
                      className="group relative bg-[#1c030b] border border-[#521324] hover:border-[#d4a359] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden bg-black/60 flex items-center justify-center">
                        {isVideo ? (
                          <video
                            src={imgUrl}
                            muted
                            playsInline
                            loop
                            autoPlay
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <img
                            src={imgUrl}
                            alt={`Concert poster archive ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-[#d4a359] text-black text-[10px] uppercase font-bold tracking-widest shadow-md">
                          {isVideo ? 'Play Video' : 'View Poster'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : isLoadingGallery ? (
              <div className="py-20 text-center text-[#d4a359] text-sm flex flex-col items-center space-y-3">
                <RefreshCw size={24} className="animate-spin" />
                <span>Loading gallery archives...</span>
              </div>
            ) : (
              <div className="py-16 px-6 rounded-3xl border border-[#521324] bg-[#160209]/60 text-center space-y-4">
                <h4 className="font-serif text-lg font-bold text-white">Archives Ready</h4>
                <p className="text-xs sm:text-sm text-[#f5a7b8] max-w-md mx-auto">
                  Click the <strong>Upload Event Posters</strong> button above to add high-resolution concert flyers and past event photography.
                </p>
                <label
                  htmlFor="gallery-media-upload-input"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#d4a359] text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer hover:brightness-110 shadow-lg"
                >
                  <Upload size={16} />
                  <span>Upload First Poster</span>
                </label>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Poster Modal Viewer with Left/Right Scrolling, Keyboard & Swipe Support */}
      {selectedPosterIndex !== null && galleryImages[selectedPosterIndex] && (
        <div 
          onClick={() => setSelectedPosterIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
        >
          {/* Main Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center justify-center"
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between px-2 pb-3 text-white text-xs">
              <span className="px-3 py-1 rounded-full bg-[#1b030b]/80 border border-[#831f3b] text-[#f5d79e] font-mono text-xs font-semibold">
                {selectedPosterIndex + 1} / {galleryImages.length}
              </span>

              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline-block text-[11px] text-white/50">
                  Use ← → keys or swipe to browse
                </span>
                <button
                  onClick={() => setSelectedPosterIndex(null)}
                  className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center space-x-1 border border-white/20 transition-all"
                  aria-label="Close viewer"
                >
                  <X size={16} />
                  <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Close</span>
                </button>
              </div>
            </div>

            {/* Poster Media Container */}
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl border border-[#d4a359]/60 shadow-2xl bg-black/80">
              {galleryImages[selectedPosterIndex].endsWith('.mp4') ||
              galleryImages[selectedPosterIndex].endsWith('.webm') ||
              galleryImages[selectedPosterIndex].endsWith('.mov') ? (
                <video
                  src={galleryImages[selectedPosterIndex]}
                  controls
                  autoPlay
                  playsInline
                  className="w-auto h-auto max-w-full max-h-[78vh] object-contain"
                />
              ) : (
                <img 
                  src={galleryImages[selectedPosterIndex]} 
                  alt={`Concert poster ${selectedPosterIndex + 1}`} 
                  className="w-auto h-auto max-w-full max-h-[78vh] object-contain transition-all duration-300"
                />
              )}

              {/* Left Arrow Button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#350615] text-white hover:text-[#f5d79e] border border-white/30 hover:border-[#d4a359] flex items-center justify-center transition-all shadow-xl active:scale-90"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Right Arrow Button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#350615] text-white hover:text-[#f5d79e] border border-white/30 hover:border-[#d4a359] flex items-center justify-center transition-all shadow-xl active:scale-90"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Quick Indicator Strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center space-x-1.5 pt-3 max-w-full overflow-x-auto px-4 scrollbar-none">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPosterIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === selectedPosterIndex 
                        ? 'w-6 bg-[#f5d79e]' 
                        : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Featured Single Flyer Modal */}
      {featuredFlyerModal && (
        <div 
          onClick={() => setFeaturedFlyerModal(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-[#d4a359] shadow-2xl bg-black"
          >
            <img src={featuredFlyerModal} alt="Enlarged Flyer" className="w-full h-auto max-h-[85vh] object-contain" />
            <button
              onClick={() => setFeaturedFlyerModal(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/80 text-white hover:bg-white/20 border border-white/30 transition-all flex items-center space-x-1 px-3"
            >
              <X size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Close</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
