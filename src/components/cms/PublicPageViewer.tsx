import React, { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Calendar,
  Sparkles,
  Edit3,
  ArrowLeft,
  ChevronRight,
  Share2,
  Clock,
  MapPin,
  Utensils,
  Phone,
} from 'lucide-react';
import { CMSPage, AdminUser } from '../../types/cms';
import { AppMode } from '../../types';
import { LiveEventsView } from '../LiveEventsView';
import { ContactFormView } from '../ContactFormView';
import { MenuSection } from './MenuSection';
import { CulinarySection } from '../CulinarySection';
import { ReserveSpaceSection } from '../ReserveSpaceSection';

/* ── MergingHeroSlideshow: seamlessly dissolves & merges multiple images ── */
const MergingHeroSlideshow: React.FC<{ images: string[]; alt: string; className?: string }> = ({
  images,
  alt,
  className = '',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#180309] ${className}`}>
      {images.map((imgSrc, idx) => {
        const isActive = idx === index;
        return (
          <div
            key={imgSrc + idx}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              isActive ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={imgSrc}
              alt={`${alt} - view ${idx + 1}`}
              onError={(e) => {
                e.currentTarget.src = '/images/restwide.jpg';
              }}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Subtle Slide Indicators in top right or bottom */}
      {images.length > 1 && (
        <div className="absolute top-6 left-6 z-20 flex items-center space-x-1.5 bg-black/25 backdrop-blur-[2px] px-3 py-1.5 rounded-full border border-white/20 shadow-md">
          <span className="text-[10px] text-[#f3cf8a] font-bold uppercase tracking-wider mr-1">Atmosphere</span>
          {images.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setIndex(dotIdx)}
              aria-label={`View photo ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                dotIdx === index
                  ? 'w-5 bg-[#f3cf8a] shadow-[0_0_8px_rgba(243,207,138,0.8)]'
                  : 'w-1.5 bg-white/40 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── VideoHero: seamless multi-video crossfade player with auto-advance ── */
const VideoHero: React.FC<{ srcs: string[]; className: string }> = ({ srcs, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Pause non-current videos and play active video
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentIndex) {
        vid.muted = true;
        vid.defaultMuted = true;
        vid.volume = 0;
        const p = vid.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [currentIndex]);

  const handleNext = () => {
    if (srcs.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % srcs.length);
    }
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none">
      {srcs.map((src, idx) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[idx] = el;
          }}
          src={src}
          muted
          playsInline
          autoPlay={idx === 0}
          preload="auto"
          loop={srcs.length === 1}
          onEnded={handleNext}
          onError={() => {
            if (idx === currentIndex && srcs.length > 1) {
              handleNext();
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          } ${className}`}
        />
      ))}
    </div>
  );
};

interface PublicPageViewerProps {
  page: CMSPage;
  mode: AppMode;
  adminUser: AdminUser | null;
  onOpenAdminToPage: (slug: string) => void;
  onNavigateHome: () => void;
  onOpenReservation?: (spaceName?: string) => void;
  onOpenTickets?: () => void;
}

export const PublicPageViewer: React.FC<PublicPageViewerProps> = ({
  page,
  mode,
  adminUser,
  onOpenAdminToPage,
  onNavigateHome,
  onOpenReservation,
  onOpenTickets,
}) => {
  const isNight = mode === 'night';
  const { frontmatter, content } = page;

  // Build ordered video playlist: coverImage first (if video), then any coverVideos
  const isVideoUrl = (url: string) =>
    url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov');
  const videoSrcs: string[] = page.slug === 'online-order'
    ? ['/images/online_order_feast.mp4', '/images/online_order_office.mp4']
    : [
        ...(frontmatter.coverImage && isVideoUrl(frontmatter.coverImage)
          ? [frontmatter.coverImage]
          : []),
        ...(Array.isArray(frontmatter.coverVideos) ? frontmatter.coverVideos : []),
      ];

  // Build hero image list (supporting merging crossfade sequence)
  const heroImageSrcs: string[] = page.slug === 'online-order'
    ? []
    : [
        ...(Array.isArray(frontmatter.heroImages) && frontmatter.heroImages.length > 0
          ? frontmatter.heroImages
          : page.slug === 'reserve-space'
          ? [
              '/images/patio-outdoor-day.jpg',
              '/images/patio-toppish-gala.jpg',
              '/images/patio-people-gala.jpg',
            ]
          : frontmatter.coverImage
          ? [frontmatter.coverImage]
          : ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80']),
      ];

  return (
    <article
      className={`min-h-screen pt-24 pb-20 transition-colors duration-500 font-['Raleway'] ${
        isNight ? 'bg-[#180309] text-[#f7e8ea]' : page.slug === 'contact' ? 'bg-white text-stone-900' : 'bg-[#faf8f5] text-[#1a1e24]'
      }`}
    >
      {/* Full-width Screen Hero Banner Header */}
      <header className="relative w-full overflow-hidden shadow-2xl mb-10">
        <div
          className={`relative w-full overflow-hidden ${
            videoSrcs.length === 0 && heroImageSrcs.length === 0
              ? 'min-h-[300px] sm:min-h-[360px] bg-gradient-to-br from-[#1c040d] via-[#320a18] to-[#100207] border-b border-[#d4a359]/30 flex items-center'
              : 'h-[440px] sm:h-[540px] md:h-[600px]'
          }`}
        >
          {/* Dynamic Video (single or playlist) or Image Hero Media */}
          {videoSrcs.length > 0 ? (
            <VideoHero
              srcs={videoSrcs}
              className="w-full h-full object-cover"
            />
          ) : heroImageSrcs.length > 0 ? (
            <MergingHeroSlideshow
              images={heroImageSrcs}
              alt={frontmatter.title}
              className="w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-60" />
          )}

          {/* Very Subtle Ambient Gradient Underlay - Almost Fully Transparent so imagery shines */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

          {/* Floating Gold Sparkle Accent in top right */}
          <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-black/20 border border-[#d4a359]/40 text-[#f3cf8a] text-xs font-bold uppercase tracking-widest backdrop-blur-[2px] hidden sm:flex items-center space-x-1.5 shadow-md z-20">
            <Sparkles size={14} className="text-[#d4a359]" />
            <span>FLAME EXPERIENCE</span>
          </div>

          {/* Title & Subtitle Content Overlay */}
          <div className={`w-full z-20 ${videoSrcs.length === 0 && heroImageSrcs.length === 0 ? 'py-12' : 'absolute inset-x-0 bottom-0'}`}>
            <div className="max-w-7xl mx-auto p-4 sm:p-8 md:p-10 pb-6 sm:pb-8 md:pb-10">
              <div className="bg-black/20 sm:bg-black/15 backdrop-blur-[3px] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/15 shadow-xl max-w-4xl space-y-3">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/30 border border-[#d4a359]/60 text-[#f3cf8a] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold backdrop-blur-sm shadow-sm">
                  <Sparkles size={12} className="text-[#d4a359]" />
                  <span>{frontmatter.navTitle || 'Flame International'}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#f3cf8a] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  {frontmatter.title}
                </h1>

                {frontmatter.subtitle && (
                  <p className="text-sm sm:text-base md:text-lg max-w-3xl font-normal leading-relaxed text-[#f7e8ea] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    {frontmatter.subtitle}
                  </p>
                )}

                {/* Action CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {onOpenReservation && (
                    <button
                      onClick={() => onOpenReservation()}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#b3833b] hover:brightness-110 text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95"
                    >
                      {page.slug === 'reserve-space' ? 'Inquire About Spaces' : 'Reserve Table'}
                    </button>
                  )}
                  {page.slug === 'live-events' && onOpenTickets && (
                    <button
                      onClick={onOpenTickets}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d9381e] via-[#e64a19] to-[#ea580c] hover:brightness-110 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95"
                    >
                      Buy Concert Tickets
                    </button>
                  )}
                  <a
                    href="tel:3104440045"
                    className="px-6 py-2.5 rounded-full bg-black/25 border border-white/20 text-[#f3cf8a] font-bold text-xs uppercase tracking-widest hover:bg-black/40 transition-all cursor-pointer shadow-lg backdrop-blur-[2px] flex items-center space-x-1.5"
                  >
                    <Phone size={14} />
                    <span>310-444-0045</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Breadcrumb & Admin Edit Trigger */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className={`inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
              isNight ? 'text-[#d4a359] hover:text-[#f3cf8a]' : 'text-[#9e1c38] hover:text-[#b82544]'
            }`}
          >
            <ArrowLeft size={14} />
            <span>Return to Home</span>
          </button>

          {adminUser?.isAuthorized && (
            <button
              onClick={() => onOpenAdminToPage(page.slug)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#d4a359]/20 hover:bg-[#d4a359]/30 border border-[#d4a359]/60 text-[#f3cf8a] text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <Edit3 size={13} />
              <span>Edit in CMS ({page.slug}.md)</span>
            </button>
          )}
        </div>

        {/* Dynamic Body: Custom Interactive Modules or Standard CMS Markdown */}
        {page.slug === 'live-events' ? (
          <LiveEventsView
            mode={mode}
            onOpenTickets={onOpenTickets}
            onOpenReservation={onOpenReservation}
          />
        ) : page.slug === 'reserve-space' ? (
          <div className="space-y-12">
            <ReserveSpaceSection
              mode={mode}
              onReserveSpace={onOpenReservation || (() => {})}
            />
          </div>
        ) : page.slug === 'contact' ? (
          <ContactFormView
            mode={mode}
            onOpenReservation={onOpenReservation}
          />
        ) : page.slug === 'dine-in' ? (
          <div className={`p-6 sm:p-10 rounded-3xl border shadow-xl ${
            isNight
              ? 'bg-[#100308] border-[#2d0715] text-gray-100'
              : 'bg-white border-stone-200 text-gray-900'
          }`}>
            <MenuSection mode={mode} csvPath="/menu.csv" />
          </div>
        ) : page.slug === 'catering' ? (
          <div className="space-y-12">
            {content && content.trim().length > 0 && (
              <section
                className={`p-6 sm:p-12 rounded-3xl border shadow-xl ${
                  isNight
                    ? 'bg-[#100308] border-[#2d0715] text-gray-100'
                    : 'bg-white border-stone-200 text-gray-900'
                }`}
              >
                <div className="max-w-none space-y-6 text-base sm:text-lg leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h2
                          className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold border-b pb-3 mb-6 mt-4 ${
                            isNight ? 'text-[#f3cf8a] border-[#38081a]' : 'text-stone-900 border-stone-200'
                          }`}
                        >
                          {children}
                        </h2>
                      ),
                      h2: ({ children }) => {
                        const text = String(children);
                        const isLunchHeading = text.toLowerCase().includes('lunch');
                        return (
                          <h3
                            id={isLunchHeading ? 'lunch-section' : undefined}
                            className={`font-serif text-2xl sm:text-3xl font-bold border-b pb-2 mb-4 mt-8 scroll-mt-28 ${
                              isNight ? 'text-[#f3cf8a] border-white/10' : 'text-[#9e1c38] border-stone-200'
                            }`}
                          >
                            {children}
                          </h3>
                        );
                      },
                      h3: ({ children }) => (
                        <h4
                          className={`font-serif text-xl sm:text-2xl font-bold mb-3 mt-6 ${
                            isNight ? 'text-white' : 'text-stone-900'
                          }`}
                        >
                          {children}
                        </h4>
                      ),
                      p: ({ children, node }) => {
                        const hasBlockChild =
                          node?.children?.some(
                            (child: any) =>
                              child.tagName === 'img' ||
                              child.tagName === 'figure' ||
                              child.tagName === 'div' ||
                              child.type === 'image' ||
                              (child.type === 'element' && child.tagName === 'img')
                          ) || false;

                        if (hasBlockChild) {
                          return <div className="mb-4 leading-relaxed font-normal">{children}</div>;
                        }
                        return <p className="mb-4 leading-relaxed font-normal">{children}</p>;
                      },
                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 space-y-2.5 my-4 marker:text-[#d4a359]">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 space-y-2.5 my-4 marker:text-[#d4a359] font-medium">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => <li className="leading-relaxed font-normal">{children}</li>,
                      blockquote: ({ children }) => (
                        <blockquote
                          className={`border-l-4 border-[#d4a359] p-5 rounded-r-2xl italic my-6 shadow-sm ${
                            isNight ? 'bg-[#1b050f] text-[#f5d79e]' : 'bg-amber-50/90 text-stone-900'
                          }`}
                        >
                          {children}
                        </blockquote>
                      ),
                      table: ({ children }) => (
                        <div
                          className={`overflow-x-auto my-6 rounded-2xl border shadow-sm ${
                            isNight ? 'border-[#38081a] bg-[#14040b]' : 'border-stone-200 bg-stone-50'
                          }`}
                        >
                          <table className="w-full text-left text-base sm:text-lg border-collapse">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th
                          className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-sm sm:text-base ${
                            isNight
                              ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                              : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                          }`}
                        >
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td
                          className={`px-4 sm:px-6 py-4 border-b text-base sm:text-lg leading-relaxed ${
                            isNight ? 'border-[#260511] text-gray-100' : 'border-stone-200 text-stone-900'
                          }`}
                        >
                          {children}
                        </td>
                      ),
                      img: ({ src, alt }) => (
                        <figure className="my-8 rounded-3xl overflow-hidden border border-stone-300/30 shadow-2xl">
                          <img
                            src={src}
                            alt={alt || ''}
                            className="w-full object-cover max-h-[520px] hover:scale-102 transition-transform duration-700"
                          />
                          {alt && (
                            <figcaption
                              className={`px-4 py-2.5 text-center text-xs sm:text-sm font-mono tracking-wide ${
                                isNight ? 'bg-[#18040d] text-gray-300' : 'bg-stone-100 text-stone-700'
                              }`}
                            >
                              {alt}
                            </figcaption>
                          )}
                        </figure>
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#d4a359] underline underline-offset-4 hover:text-[#f3cf8a] font-bold"
                        >
                          {children}
                        </a>
                      ),
                      strong: ({ children }) => (
                        <strong className={isNight ? 'text-white font-extrabold' : 'text-stone-950 font-extrabold'}>
                          {children}
                        </strong>
                      ),
                      hr: () => (
                        <hr className={`my-8 ${isNight ? 'border-[#38081a]' : 'border-stone-200'}`} />
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </section>
            )}

            <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-200/10">
              <CulinarySection
                mode={mode}
                onMakeReservation={onOpenReservation || (() => {})}
                onOpenDish={() => {}}
              />
            </div>
          </div>
        ) : (
          <section
            className={`p-6 sm:p-12 rounded-3xl border shadow-xl ${
              isNight
                ? 'bg-[#100308] border-[#2d0715] text-gray-100'
                : 'bg-white border-stone-200 text-gray-900'
            }`}
          >
            <div className="max-w-none space-y-6 text-base sm:text-lg leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h2
                      className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold border-b pb-3 mb-6 mt-4 ${
                        isNight ? 'text-[#f3cf8a] border-[#38081a]' : 'text-stone-900 border-stone-200'
                      }`}
                    >
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h3
                      className={`font-serif text-2xl sm:text-3xl font-bold border-b pb-2 mb-4 mt-8 ${
                        isNight ? 'text-[#f3cf8a] border-white/10' : 'text-[#9e1c38] border-stone-200'
                      }`}
                    >
                      {children}
                    </h3>
                  ),
                  h3: ({ children }) => (
                    <h4
                      className={`font-serif text-xl sm:text-2xl font-bold mb-3 mt-6 ${
                        isNight ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {children}
                    </h4>
                  ),
                  p: ({ children, node }) => {
                    const hasBlockChild =
                      node?.children?.some(
                        (child: any) =>
                          child.tagName === 'img' ||
                          child.tagName === 'figure' ||
                          child.tagName === 'div' ||
                          child.type === 'image' ||
                          (child.type === 'element' && child.tagName === 'img')
                      ) || false;

                    if (hasBlockChild) {
                      return <div className="mb-4 leading-relaxed font-normal">{children}</div>;
                    }
                    return <p className="mb-4 leading-relaxed font-normal">{children}</p>;
                  },
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-2.5 my-4 marker:text-[#d4a359]">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-2.5 my-4 marker:text-[#d4a359] font-medium">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="leading-relaxed font-normal">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote
                      className={`border-l-4 border-[#d4a359] p-5 rounded-r-2xl italic my-6 shadow-sm ${
                        isNight ? 'bg-[#1b050f] text-[#f5d79e]' : 'bg-amber-50/90 text-stone-900'
                      }`}
                    >
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div
                      className={`overflow-x-auto my-6 rounded-2xl border shadow-sm ${
                        isNight ? 'border-[#38081a] bg-[#14040b]' : 'border-stone-200 bg-stone-50'
                      }`}
                    >
                      <table className="w-full text-left text-base sm:text-lg border-collapse">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th
                      className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-sm sm:text-base ${
                        isNight
                          ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                          : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                      }`}
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td
                      className={`px-4 sm:px-6 py-4 border-b text-base sm:text-lg leading-relaxed ${
                        isNight ? 'border-[#260511] text-gray-100' : 'border-stone-200 text-stone-900'
                      }`}
                    >
                      {children}
                    </td>
                  ),
                  img: ({ src, alt }) => (
                    <figure className="my-8 rounded-3xl overflow-hidden border border-stone-300/30 shadow-2xl">
                      <img
                        src={src}
                        alt={alt || ''}
                        className="w-full object-cover max-h-[520px] hover:scale-102 transition-transform duration-700"
                      />
                      {alt && (
                        <figcaption
                          className={`px-4 py-2.5 text-center text-xs sm:text-sm font-mono tracking-wide ${
                            isNight ? 'bg-[#18040d] text-gray-300' : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d4a359] underline underline-offset-4 hover:text-[#f3cf8a] font-bold"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className={isNight ? 'text-white font-extrabold' : 'text-stone-950 font-extrabold'}>
                      {children}
                    </strong>
                  ),
                  hr: () => (
                    <hr className={`my-8 ${isNight ? 'border-[#38081a]' : 'border-stone-200'}`} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </section>
        )}

      </div>
    </article>
  );
};
