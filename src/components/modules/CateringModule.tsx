import React, { useState } from 'react';
import { ChefHat, Users, Utensils, PackageCheck, Phone, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { RevealOnScroll } from '../RevealOnScroll';
import { FlameLogo } from '../FlameLogo';
import confetti from 'canvas-confetti';

export interface CateringModuleProps {
  className?: string;
  showTitle?: boolean;
  onOpenDirectCall?: () => void;
}

export const CateringModule: React.FC<CateringModuleProps> = ({
  className = '',
  showTitle = true,
}) => {
  const [guests, setGuests] = useState('25-50');
  const [serviceType, setServiceType] = useState('buffet');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.7 },
    });
    setSubmitted(true);
  };

  return (
    <section id="catering-module" className={`w-full text-[#f7e8ea] font-['Raleway'] ${className}`}>
      <div className="max-w-5xl mx-auto">
        
        {showTitle && (
          <RevealOnScroll direction="up" delay={0} duration={600} className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2d0713] border border-[#6b152d] text-xs font-bold uppercase tracking-[0.25em] text-[#f5d79e] mb-3 shadow-md">
              <ChefHat size={14} className="text-[#f3cf8a]" />
              <span>Full-Service &amp; Express Platters</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-wide">
              PERSIAN CATERING &amp; <span className="text-[#f3cf8a]">BANQUETS</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#f3d2d8] mt-1 max-w-xl mx-auto">
              From corporate executive lunches to grand Persian weddings and private galas.
            </p>
          </RevealOnScroll>
        )}

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#24060f] via-[#1c040d] to-[#24060f] border border-[#6b152d] shadow-2xl space-y-6">
          
          {/* 3 Package Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#180309] border border-[#521324] text-center space-y-1">
              <PackageCheck size={22} className="mx-auto text-[#f3cf8a] mb-1.5" />
              <h4 className="text-sm font-bold text-white">Corporate Lunches</h4>
              <p className="text-xs text-[#f3d2d8]/70">Individual or family-style saffron trays</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#180309] border border-[#521324] text-center space-y-1">
              <Users size={22} className="mx-auto text-[#f3cf8a] mb-1.5" />
              <h4 className="text-sm font-bold text-white">Weddings &amp; Galas</h4>
              <p className="text-xs text-[#f3d2d8]/70">Full banquet saffron warming stations</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#180309] border border-[#521324] text-center space-y-1">
              <Utensils size={22} className="mx-auto text-[#f3cf8a] mb-1.5" />
              <h4 className="text-sm font-bold text-white">Private Parties</h4>
              <p className="text-xs text-[#f3d2d8]/70">Warm charbroiled kabab skewers</p>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#d4a359]/20 text-[#f3cf8a] flex items-center justify-center mx-auto border border-[#d4a359]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">Catering Quote Requested!</h3>
              <p className="text-xs sm:text-sm text-[#f3d2d8] max-w-md mx-auto leading-relaxed">
                Thank you! Our executive catering director will review your event requirements and provide customized menu pricing shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#3d0917] border border-[#831f3b] text-xs text-[#f3cf8a] font-bold uppercase tracking-wider cursor-pointer hover:bg-[#521324]"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                    Estimated Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  >
                    <option value="15-25">15 – 25 Guests (Intimate Gathering)</option>
                    <option value="25-50">25 – 50 Guests (Corporate / Party)</option>
                    <option value="50-100">50 – 100 Guests (Large Banquet)</option>
                    <option value="100+">100+ Guests (Grand Gala / Wedding)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                    Service Style
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  >
                    <option value="buffet">Hot Buffet &amp; Saffron Warming Trays</option>
                    <option value="dropoff">Express Drop-Off &amp; Setup</option>
                    <option value="full-staff">Full-Service with Onsite Servers</option>
                    <option value="individual">Individual Gourmet Boxed Meals</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(310) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>
              </div>

              {/* Direct Call & Submit Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href="tel:3104440045"
                  className="text-xs text-[#f3cf8a] font-bold hover:underline flex items-center space-x-1.5"
                >
                  <Phone size={14} />
                  <span>Call Catering Desk: (310) 444-0045</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] hover:from-[#f3cf8a] hover:to-[#d4a359] text-black font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send size={14} />
                  <span>REQUEST CATERING QUOTE</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
