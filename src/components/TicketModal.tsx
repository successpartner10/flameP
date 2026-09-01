import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, MapPin, Users, Ticket, CheckCircle2, Music, Phone, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEventTitle?: string;
  initialEventDate?: string;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  initialEventTitle = "Arand & Shahyar Ghanbari Live in Concert",
  initialEventDate = "Saturday, September 12, 2026",
}) => {
  const [ticketTier, setTicketTier] = useState<'general' | 'vip' | 'cabaret-table'>('cabaret-table');
  const [ticketCount, setTicketCount] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const prices = {
    'general': 65,
    'vip': 110,
    'cabaret-table': 145, // Includes Dinner Banquet & Stage Seating
  };

  const totalPrice = prices[ticketTier] * ticketCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#180309]/92 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-['Raleway']">
      <div className="relative w-full max-w-2xl bg-[#1c040d] border-2 border-[#d4a359]/70 text-[#f5f1ea] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden max-h-[94vh] flex flex-col">
        
        {/* Modal Header with Grand Concert Theme */}
        <div className="px-6 py-5 border-b border-[#6b152d]/60 flex items-center justify-between bg-gradient-to-r from-[#20040e] via-[#3a081c] to-[#20040e]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9e1c38] to-[#d4a359] p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-[#180309] flex items-center justify-center text-[#f3cf8a]">
                <Music size={18} />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4a359] font-bold">
                  Official Stage Tickets
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[8px] font-black uppercase tracking-wider">
                  Live Stage
                </span>
              </div>
              <div className="font-['Raleway'] flex items-center space-x-1.5">
                <span className="text-lg sm:text-xl font-black font-[900] text-white">FLAME</span>
                <span className="text-xs sm:text-sm font-black font-[900] text-white tracking-[0.2em] uppercase">INTERNATIONAL</span>
              </div>
              <h3 className="font-serif text-sm sm:text-base text-white/90 font-bold tracking-wide">
                Concert &amp; Cabaret Stage Tickets
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close ticket modal"
            className="p-2 rounded-full bg-[#2d0713] hover:bg-[#521324] text-white transition-colors cursor-pointer border border-[#6b152d]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {isBooked ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#d4a359]/20 text-[#d4a359] flex items-center justify-center mx-auto border-2 border-[#d4a359] shadow-[0_0_20px_rgba(212,163,89,0.4)]">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#d4a359]">
                  Booking Confirmation #FLM-2026-{Math.floor(1000 + Math.random() * 9000)}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                  Concert Tickets Reserved!
                </h3>
                <p className="text-xs sm:text-sm text-[#f3d2d8] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name || 'Guest'}</strong>. Your confirmation and digital admission passes for <strong className="text-[#f3cf8a]">{initialEventTitle}</strong> have been prepared.
                </p>
              </div>

              {/* Digital Pass Summary Card */}
              <div className="bg-[#24060f] border border-[#d4a359]/40 rounded-2xl p-4 max-w-sm mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between text-[#f3d2d8]">
                  <span>Pass Tier:</span>
                  <span className="font-bold text-[#f3cf8a] uppercase">{ticketTier.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between text-[#f3d2d8]">
                  <span>Admissions:</span>
                  <span className="font-bold text-white">{ticketCount} Guest(s)</span>
                </div>
                <div className="flex justify-between text-[#f3d2d8]">
                  <span>Date &amp; Time:</span>
                  <span className="font-bold text-white">{initialEventDate} • 8:00 PM</span>
                </div>
                <div className="flex justify-between text-[#f3d2d8] pt-2 border-t border-[#6b152d] text-sm">
                  <span className="font-bold text-white">Total:</span>
                  <span className="font-bold text-[#f3cf8a]">${totalPrice}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => { setIsBooked(false); onClose(); }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#d4a359] to-[#b3833b] hover:brightness-110 text-[#180309] font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                >
                  Return to Site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Event Showcase Banner */}
              <div className="rounded-2xl p-4 bg-gradient-to-r from-[#280613] via-[#1a040d] to-[#280613] border border-[#d4a359]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] text-[#f3cf8a] uppercase font-bold tracking-widest mb-1">
                    <Calendar size={12} />
                    <span>{initialEventDate}</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-white font-bold">
                    {initialEventTitle}
                  </h4>
                  <div className="flex items-center space-x-3 text-[11px] text-[#f3d2d8] mt-1">
                    <span className="flex items-center space-x-1">
                      <Clock size={11} className="text-[#d4a359]" />
                      <span>Doors 8:00 PM • Show 9:30 PM</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin size={11} className="text-[#d4a359]" />
                      <span>Flame Grand Stage (West LA)</span>
                    </span>
                  </div>
                </div>

                <div className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-[#2d0713] border border-[#d4a359]/30 text-right">
                  <span className="text-[9px] uppercase text-[#f5d79e]/70 block tracking-wider">Starting from</span>
                  <span className="font-serif text-lg font-bold text-[#f3cf8a]">$65<span className="text-xs font-normal text-[#f3d2d8]">/ea</span></span>
                </div>
              </div>

              {/* Ticket Tier Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#d4a359]">
                  Select Admission &amp; Dining Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Tier 1: General Concert */}
                  <div
                    onClick={() => setTicketTier('general')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      ticketTier === 'general'
                        ? 'bg-[#2a0715] border-[#f3cf8a] shadow-[0_0_15px_rgba(212,163,89,0.3)] ring-1 ring-[#f3cf8a]'
                        : 'bg-[#24060f] border-[#521324] hover:border-[#d4a359]/50'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-white">General Stage</span>
                        <span className="font-bold text-xs text-[#f3cf8a]">$65</span>
                      </div>
                      <p className="text-[10px] text-[#f3d2d8] leading-snug">
                        Concert entry &amp; lounge standing / cocktail seating.
                      </p>
                    </div>
                  </div>

                  {/* Tier 2: VIP Prime */}
                  <div
                    onClick={() => setTicketTier('vip')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      ticketTier === 'vip'
                        ? 'bg-[#2a0715] border-[#f3cf8a] shadow-[0_0_15px_rgba(212,163,89,0.3)] ring-1 ring-[#f3cf8a]'
                        : 'bg-[#24060f] border-[#521324] hover:border-[#d4a359]/50'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-white">VIP Prime Seat</span>
                        <span className="font-bold text-xs text-[#f3cf8a]">$110</span>
                      </div>
                      <p className="text-[10px] text-[#f3d2d8] leading-snug">
                        Reserved front-stage seating + 1 welcome cocktail.
                      </p>
                    </div>
                  </div>

                  {/* Tier 3: Cabaret Dinner & Show */}
                  <div
                    onClick={() => setTicketTier('cabaret-table')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                      ticketTier === 'cabaret-table'
                        ? 'bg-[#2a0715] border-[#f3cf8a] shadow-[0_0_15px_rgba(212,163,89,0.3)] ring-1 ring-[#f3cf8a]'
                        : 'bg-[#24060f] border-[#521324] hover:border-[#d4a359]/50'
                    }`}
                  >
                    <span className="absolute -top-2 right-3 px-1.5 py-0.5 rounded-full bg-[#d4a359] text-[#180309] text-[7.5px] font-black uppercase tracking-wider">
                      Popular
                    </span>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-white">Dinner &amp; Show</span>
                        <span className="font-bold text-xs text-[#f3cf8a]">$145</span>
                      </div>
                      <p className="text-[10px] text-[#f3d2d8] leading-snug">
                        Full Persian royal banquet course + premier table.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Ticket Quantity Selector */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#24060f] border border-[#521324]">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-[#d4a359]" />
                  <span className="text-xs font-bold text-white">Number of Tickets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-8 h-8 rounded-full bg-[#2d0713] border border-[#d4a359]/40 text-white font-bold hover:bg-[#521324] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-serif text-lg font-bold text-white w-6 text-center">
                    {ticketCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.min(12, ticketCount + 1))}
                    className="w-8 h-8 rounded-full bg-[#2d0713] border border-[#d4a359]/40 text-white font-bold hover:bg-[#521324] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Guest Details Form */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#d4a359]">
                  Guest Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] focus:border-[#d4a359] focus:outline-none text-white text-xs placeholder-[#f5d79e]/40"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Phone (for SMS Tickets)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] focus:border-[#d4a359] focus:outline-none text-white text-xs placeholder-[#f5d79e]/40"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address (for Digital Passes)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24060f] border border-[#521324] focus:border-[#d4a359] focus:outline-none text-white text-xs placeholder-[#f5d79e]/40"
                  />
                </div>
              </div>

              {/* Summary & Guarantee */}
              <div className="pt-3 border-t border-[#521324] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#f5d79e]/70 block">Total Amount</span>
                  <span className="font-serif text-2xl font-black text-[#f3cf8a]">
                    ${totalPrice}{' '}
                    <span className="text-xs font-sans text-[#f3d2d8] font-normal">
                      ({ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'})
                    </span>
                  </span>
                  <div className="flex items-center space-x-1 text-[9.5px] text-green-400 font-medium mt-0.5">
                    <ShieldCheck size={12} />
                    <span>Instant digital ticket delivery + guest valet included</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d9381e] via-[#e64a19] to-[#ea580c] hover:brightness-110 active:scale-95 text-white font-black text-xs uppercase tracking-[0.16em] shadow-[0_10px_25px_rgba(230,74,25,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Ticket size={16} />
                  <span>Purchase Tickets (${totalPrice})</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
