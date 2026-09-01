import React, { useState } from 'react';
import { X, Sparkles, Users, Calendar, Utensils, CheckCircle2, Phone, ChefHat, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FlameLogo } from './FlameLogo';

interface CateringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringModal: React.FC<CateringModalProps> = ({ isOpen, onClose }) => {
  const [guestCount, setGuestCount] = useState<string>('25-50');
  const [serviceType, setServiceType] = useState<string>('buffet');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#180309]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-['Raleway']">
      <div className="relative w-full max-w-2xl bg-[#1c040d] border border-[#6b152d] text-[#f7e8ea] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#521324] flex items-center justify-between bg-[#24060f]">
          <div className="flex items-center space-x-3.5">
            <FlameLogo variant="color-emblem" size="sm" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#f5d79e] block">
                Full-Service &amp; Express Platters
              </span>
              <div className="font-['Raleway'] flex items-center space-x-1.5">
                <span className="text-lg sm:text-xl font-black font-[900] text-white">FLAME</span>
                <span className="text-xs sm:text-sm font-black font-[900] text-white tracking-[0.2em] uppercase">INTERNATIONAL</span>
              </div>
              <h3 className="font-['Raleway'] text-xs sm:text-sm text-[#f5d79e]/90 font-medium">
                Persian Catering &amp; Events
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#340816] hover:bg-[#4a0d20] border border-[#6b152d] text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#1c040d] to-[#24060f]">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#d4a359]/20 text-[#d4a359] flex items-center justify-center mx-auto border border-[#d4a359]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl text-white font-bold">Catering Request Received</h3>
              <p className="text-xs sm:text-sm text-[#f3d2d8] max-w-sm mx-auto leading-relaxed">
                Thank you! Our catering culinary director will contact you promptly with customized saffron menus, package pricing, and setup options.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#280612] border border-[#521324] text-center">
                  <PackageCheck size={18} className="mx-auto text-[#f3cf8a] mb-1" />
                  <h4 className="text-xs font-bold text-white">Corporate Lunches</h4>
                  <p className="text-[10px] text-[#f3d2d8]/70">Individual or family platters</p>
                </div>
                <div className="p-3 rounded-xl bg-[#280612] border border-[#521324] text-center">
                  <Users size={18} className="mx-auto text-[#f3cf8a] mb-1" />
                  <h4 className="text-xs font-bold text-white">Weddings &amp; Galas</h4>
                  <p className="text-[10px] text-[#f3d2d8]/70">Full banquet saffron stations</p>
                </div>
                <div className="p-3 rounded-xl bg-[#280612] border border-[#521324] text-center">
                  <Utensils size={18} className="mx-auto text-[#f3cf8a] mb-1" />
                  <h4 className="text-xs font-bold text-white">Private Parties</h4>
                  <p className="text-[10px] text-[#f3d2d8]/70">Warm charbroiled kabab trays</p>
                </div>
              </div>

              {/* Guest Count & Service Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#f3cf8a] font-medium block">
                    Estimated Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  >
                    <option value="15-25">15 – 25 Guests (Small Event)</option>
                    <option value="25-50">25 – 50 Guests (Medium Event)</option>
                    <option value="50-100">50 – 100 Guests (Large Event)</option>
                    <option value="100+">100+ Guests (Grand Gala / Wedding)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#f3cf8a] font-medium block">
                    Service Style
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  >
                    <option value="buffet">Hot Buffet &amp; Saffron Warming Trays</option>
                    <option value="dropoff">Express Drop-Off &amp; Setup</option>
                    <option value="full-staff">Full-Service with Onsite Servers &amp; Chefs</option>
                    <option value="individual">Individual Gourmet Boxed Meals</option>
                  </select>
                </div>
              </div>

              {/* Date & Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#f3d2d8] font-medium block">
                    Event Date
                  </label>
                  <input
                    type="date"
                    required
                    defaultValue="2026-09-15"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#f3d2d8] font-medium block">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First & Last Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#f3d2d8] font-medium block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(310) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#f3d2d8] font-medium block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#f3d2d8] font-medium block">
                  Event Location &amp; Special Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="Address or venue in Los Angeles / dietary preferences..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                />
              </div>

              {/* Direct Call Quick Option */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#280612] border border-[#521324] text-xs text-[#f3d2d8]">
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-[#f3cf8a]" />
                  <span>Prefer to talk directly?</span>
                </div>
                <a
                  href="tel:3104440045"
                  className="font-bold text-[#f3cf8a] hover:underline"
                >
                  (310) 444-0045
                </a>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] hover:from-[#f3cf8a] hover:to-[#d4a359] text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                >
                  Submit Catering Request
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
