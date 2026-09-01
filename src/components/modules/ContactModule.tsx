import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Car, ShieldCheck, 
  ExternalLink, MessageCircle, Send, CheckCircle2, Sparkles 
} from 'lucide-react';
import { FlameLogo } from '../FlameLogo';
import { RevealOnScroll } from '../RevealOnScroll';
import confetti from 'canvas-confetti';

export interface ContactModuleProps {
  className?: string;
  variant?: 'full' | 'compact' | 'card';
  onOpenReserve?: () => void;
  onOpenCatering?: () => void;
}

export const ContactModule: React.FC<ContactModuleProps> = ({
  className = '',
  variant = 'full',
  onOpenReserve,
  onOpenCatering,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.7 },
    });
    setSubmitted(true);
  };

  return (
    <section id="contact-module" className={`w-full text-[#f7e8ea] font-['Raleway'] ${className}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Module Header if Full Variant */}
        {variant === 'full' && (
          <RevealOnScroll direction="up" delay={0} duration={700} className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2d0713] border border-[#6b152d] text-xs font-semibold uppercase tracking-[0.25em] text-[#f5d79e] mb-3 shadow-md">
              <Sparkles size={14} className="text-[#f3cf8a]" />
              <span>Direct Hospitality &amp; Reservations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
              CONTACT <span className="text-[#f3cf8a]">FLAME INTERNATIONAL</span>
            </h2>
            <p className="text-sm sm:text-base text-[#f3d2d8] mt-2 max-w-xl mx-auto">
              11330 Santa Monica Blvd, West Los Angeles • Est. 1985
            </p>
          </RevealOnScroll>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Quick Contact & Hours Cards (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Address & Phone Card */}
            <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#24060f] via-[#1c040d] to-[#24060f] border border-[#521324] shadow-xl space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <FlameLogo variant="color-emblem" size="sm" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                      Flame International
                    </h3>
                    <p className="text-xs text-[#f5d79e] tracking-widest uppercase font-medium">
                      West Los Angeles Landmark
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#3d0917] border border-[#831f3b] text-[11px] font-semibold text-[#f3cf8a]">
                  OPEN TODAY
                </div>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {/* Phone Call */}
                <a
                  href="tel:3104440045"
                  className="p-3.5 rounded-2xl bg-[#2d0713]/80 hover:bg-[#3d0917] border border-[#6b152d] transition-all flex items-center space-x-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#4a0d20] text-[#f3cf8a] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#f5a7b8] block">
                      Direct Reservations
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#f3cf8a] transition-colors">
                      (310) 444-0045
                    </span>
                  </div>
                </a>

                {/* Email Inquiries */}
                <a
                  href="mailto:reservations@flameinternational.com"
                  className="p-3.5 rounded-2xl bg-[#2d0713]/80 hover:bg-[#3d0917] border border-[#6b152d] transition-all flex items-center space-x-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#4a0d20] text-[#f3cf8a] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#f5a7b8] block">
                      VIP &amp; Press Email
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#f3cf8a] transition-colors truncate block">
                      reservations@flame...
                    </span>
                  </div>
                </a>

                {/* Physical Location */}
                <div className="p-3.5 rounded-2xl bg-[#2d0713]/80 border border-[#6b152d] flex items-center space-x-3 sm:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-[#4a0d20] text-[#f3cf8a] flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#f5a7b8] block">
                      Location &amp; Cross Street
                    </span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      11330 Santa Monica Blvd (at Corinth Ave), West Los Angeles, CA 90025
                    </span>
                  </div>
                </div>
              </div>

              {/* Parking and Dress Code Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#180309] border border-[#521324] flex items-center space-x-2.5">
                  <Car size={16} className="text-[#f3cf8a] shrink-0" />
                  <span className="text-xs text-[#f5d79e]">
                    Complimentary valet parking at front entrance
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#180309] border border-[#521324] flex items-center space-x-2.5">
                  <ShieldCheck size={16} className="text-[#f3cf8a] shrink-0" />
                  <span className="text-xs text-[#f5d79e]">
                    Smart Casual • 100% Halal Authentic Kitchen
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#1c040d] border border-[#521324] shadow-lg">
              <div className="flex items-center space-x-2 mb-3.5">
                <Clock size={18} className="text-[#f3cf8a]" />
                <h4 className="text-sm uppercase font-bold tracking-wider text-white">
                  HOURS OF SERVICE
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#24060f] border border-[#521324]">
                  <span className="font-bold text-[#f3cf8a] block mb-0.5">LUNCH HUB</span>
                  <span className="text-white font-medium block">Daily: 11:30 AM – 3:30 PM</span>
                  <span className="text-[10px] text-[#f3d2d8]/70">Express &amp; Dine-In</span>
                </div>
                <div className="p-3 rounded-xl bg-[#24060f] border border-[#521324]">
                  <span className="font-bold text-[#f3cf8a] block mb-0.5">DINNER &amp; KABABS</span>
                  <span className="text-white font-medium block">Daily: 4:30 PM – 11:00 PM</span>
                  <span className="text-[10px] text-[#f3d2d8]/70">Charbroiled Open Flame</span>
                </div>
                <div className="p-3 rounded-xl bg-[#24060f] border border-[#521324]">
                  <span className="font-bold text-[#f3cf8a] block mb-0.5">CABARET &amp; NIGHTS</span>
                  <span className="text-white font-medium block">Fri – Sun: Until 1:30 AM</span>
                  <span className="text-[10px] text-[#f3d2d8]/70">Live Persian Music</span>
                </div>
              </div>
            </div>

          </div>

          {/* Direct Inquiry & Message Form (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#24060f] to-[#1c040d] border border-[#6b152d] shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1">
                  SEND AN INQUIRY
                </h3>
                <p className="text-xs text-[#f3d2d8] mb-5">
                  Private dining, corporate banquets, catering quotes, or VIP bottle service requests.
                </p>

                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#d4a359]/20 text-[#f3cf8a] flex items-center justify-center mx-auto border border-[#d4a359]">
                      <CheckCircle2 size={30} />
                    </div>
                    <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                    <p className="text-xs text-[#f3d2d8] leading-relaxed">
                      Thank you for contacting Flame International. Our hospitality manager will respond within 2 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 rounded-full bg-[#3d0917] border border-[#831f3b] text-xs text-[#f3cf8a] font-bold uppercase tracking-wider cursor-pointer hover:bg-[#521324]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a359]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a359]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(310) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a359]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                      >
                        <option value="general">General Inquiries &amp; Table Bookings</option>
                        <option value="private-dining">Private Dining &amp; Functions</option>
                        <option value="catering">Persian Catering Quote</option>
                        <option value="concerts">Live Events &amp; VIP Seating</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                        Special Requests or Details
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Date, party size, dietary requests..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a359]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] hover:from-[#f3cf8a] hover:to-[#d4a359] text-black font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Send size={14} />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Quick Actions at bottom of card */}
              <div className="mt-4 pt-4 border-t border-[#521324] flex items-center justify-between text-xs">
                {onOpenReserve && (
                  <button
                    onClick={onOpenReserve}
                    className="text-[#f3cf8a] font-bold hover:underline cursor-pointer flex items-center space-x-1"
                  >
                    <span>Reserve a Table &rarr;</span>
                  </button>
                )}
                {onOpenCatering && (
                  <button
                    onClick={onOpenCatering}
                    className="text-[#f5d79e] font-medium hover:underline cursor-pointer"
                  >
                    Catering Options
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
