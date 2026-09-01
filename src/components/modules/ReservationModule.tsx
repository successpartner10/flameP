import React, { useState } from 'react';
import { Calendar, Users, Clock, Sparkles, CheckCircle2, Phone, Utensils, ShieldCheck } from 'lucide-react';
import { FlameLogo } from '../FlameLogo';
import { RevealOnScroll } from '../RevealOnScroll';
import confetti from 'canvas-confetti';

export interface ReservationModuleProps {
  className?: string;
  showTitle?: boolean;
  onSuccess?: () => void;
}

export const ReservationModule: React.FC<ReservationModuleProps> = ({
  className = '',
  showTitle = true,
  onSuccess,
}) => {
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('2026-09-12');
  const [time, setTime] = useState('19:30');
  const [seatingArea, setSeatingArea] = useState('dining');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  return (
    <section id="reservation-module" className={`w-full text-[#f7e8ea] font-['Raleway'] ${className}`}>
      <div className="max-w-4xl mx-auto">
        
        {showTitle && (
          <RevealOnScroll direction="up" delay={0} duration={600} className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2d0713] border border-[#6b152d] text-xs font-bold uppercase tracking-[0.25em] text-[#f5d79e] mb-3 shadow-md">
              <Sparkles size={14} className="text-[#f3cf8a]" />
              <span>Dine-In &amp; VIP Experience</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-wide">
              RESERVE YOUR <span className="text-[#f3cf8a]">TABLE</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#f3d2d8] mt-1 max-w-lg mx-auto">
              Join us for authentic Persian hospitality, open flame kababs, and live entertainment.
            </p>
          </RevealOnScroll>
        )}

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#24060f] via-[#1c040d] to-[#24060f] border border-[#6b152d] shadow-2xl">
          
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#d4a359]/20 text-[#f3cf8a] flex items-center justify-center mx-auto border border-[#d4a359]">
                <CheckCircle2 size={34} />
              </div>
              <h3 className="text-2xl font-bold text-white">Table Reserved!</h3>
              <p className="text-xs sm:text-sm text-[#f3d2d8] max-w-md mx-auto leading-relaxed">
                We have reserved a table for <strong className="text-[#f3cf8a]">{guests} guests</strong> on <strong className="text-[#f3cf8a]">{date} at {time}</strong> under <strong className="text-white">{name}</strong>. A confirmation SMS has been sent.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#3d0917] border border-[#831f3b] text-xs text-[#f3cf8a] font-bold uppercase tracking-wider cursor-pointer hover:bg-[#521324]"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Top Selector Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Guests */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f3cf8a] w-4 h-4" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                        <option key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f3cf8a] w-4 h-4" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f3cf8a] w-4 h-4" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#180309] border border-[#521324] text-xs text-white focus:outline-none focus:border-[#d4a359]"
                    >
                      <option value="12:00">12:00 PM (Lunch Hub)</option>
                      <option value="13:30">1:30 PM (Lunch)</option>
                      <option value="17:30">5:30 PM (Early Dinner)</option>
                      <option value="18:30">6:30 PM (Dinner)</option>
                      <option value="19:30">7:30 PM (Prime Dinner)</option>
                      <option value="20:30">8:30 PM (Dinner &amp; Show)</option>
                      <option value="21:30">9:30 PM (Late Night &amp; Live)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Seating Atmosphere */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#f5d79e] block mb-1.5">
                  Seating Atmosphere
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'dining', title: 'Main Dining Room', desc: 'Warm chandeliers & Persian art' },
                    { id: 'live-stage', title: 'Stage View (Live Shows)', desc: 'Near the live concert platform' },
                    { id: 'patio', title: 'Romantic Intimate', desc: 'Cozy booths & soft lighting' },
                  ].map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSeatingArea(area.id)}
                      className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        seatingArea === area.id
                          ? 'bg-[#3d0917] border-[#d4a359] ring-1 ring-[#d4a359]/40'
                          : 'bg-[#180309] border-[#521324] hover:bg-[#280612]'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{area.title}</span>
                      <span className="text-[10px] text-[#f3d2d8]/70">{area.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    Mobile Phone (For SMS Confirmation)
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
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] hover:from-[#f3cf8a] hover:to-[#d4a359] text-black font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
              >
                CONFIRM RESERVATION
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
