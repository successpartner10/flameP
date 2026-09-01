import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, MapPin, Sparkles, CheckCircle2, Heart, Award, Send, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppMode } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: AppMode;
  initialSpace?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ 
  isOpen, 
  onClose,
  mode = 'lunch',
  initialSpace
}) => {
  const isNight = mode === 'night';

  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>('2026-09-12');
  const [time, setTime] = useState<string>('7:30 PM');
  const [seatingArea, setSeatingArea] = useState<string>('flame-main-dining');
  const [occasion, setOccasion] = useState<string>('dinner');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Sync initialSpace when provided
  useEffect(() => {
    if (initialSpace) {
      const lower = initialSpace.toLowerCase();
      if (lower.includes('patio')) setSeatingArea('flame-patio');
      else if (lower.includes('lounge') || lower.includes('stage')) setSeatingArea('flame-lounge-stage');
      else if (lower.includes('window') || lower.includes('corner')) setSeatingArea('sunlit-corner');
      else setSeatingArea('flame-main-dining');
    }
  }, [initialSpace, isOpen]);

  if (!isOpen) return null;

  const lunchTimes = ['11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];
  const dinnerTimes = ['4:00 PM', '5:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];

  const seatingOptions = [
    {
      id: 'flame-main-dining',
      name: 'Main Dining Room',
      desc: 'Spacious Persian dining hall with linen tables, warm chandeliers & ambient atmosphere',
      tag: 'Classic Dining',
      icon: '🕯️'
    },
    {
      id: 'flame-patio',
      name: 'Covered Patio Oasis',
      desc: 'Alfresco garden dining with Moroccan lanterns, gentle breeze & outdoor heating',
      tag: 'Garden Alfresco',
      icon: '🌿'
    },
    {
      id: 'sunlit-corner',
      name: 'Sunlit Window Table',
      desc: 'Intimate seating overlooking Santa Monica Boulevard with soft natural lighting',
      tag: 'Intimate & Romantic',
      icon: '🪟'
    },
    {
      id: 'flame-lounge-stage',
      name: 'Lounge & Stage Table',
      desc: 'Vibrant atmosphere near the live entertainment stage and full cocktail bar',
      tag: 'Live Ambiance',
      icon: '✨'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4a359', '#ffcc80', '#e91e63', '#ffffff']
    });

    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-['Raleway']">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-colors duration-300 ${
          isNight 
            ? 'bg-[#1c040d] border border-[#6b152d] text-[#f5f1ea]' 
            : 'bg-[#ffffff] border border-stone-300 text-stone-950'
        }`}
      >
        
        {/* Header */}
        <div 
          className={`px-6 sm:px-8 py-5 sm:py-6 border-b flex items-center justify-between transition-colors ${
            isNight 
              ? 'bg-[#24060f] border-[#521324]' 
              : 'bg-[#f7f4ee] border-stone-200'
          }`}
        >
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isNight ? 'text-white' : 'text-stone-950'}`}>
                FLAME
              </span>
              <span className={`text-base sm:text-lg font-black tracking-[0.2em] uppercase ${isNight ? 'text-[#f5d79e]' : 'text-[#8c6227]'}`}>
                INTERNATIONAL
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Utensils size={15} className="text-[#d4a359]" />
              <h3 className={`text-base sm:text-lg font-bold ${isNight ? 'text-[#f3d2d8]' : 'text-stone-700'}`}>
                Reserve a Table
              </h3>
              <span className="text-xs text-[#d4a359] font-semibold">• 11330 Santa Monica Blvd, West LA</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isNight 
                ? 'bg-[#2d0713] hover:bg-[#430b1c] text-white' 
                : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-10 px-4 space-y-6">
              <div className="w-20 h-20 bg-[#d4a359]/20 text-[#d4a359] border-2 border-[#d4a359] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={44} />
              </div>

              <div className="space-y-2">
                <h3 className={`font-serif text-3xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-stone-950'}`}>
                  Table Reservation Confirmed!
                </h3>
                <p className={`text-base sm:text-lg max-w-md mx-auto font-medium ${isNight ? 'text-[#f3d2d8]' : 'text-stone-700'}`}>
                  We look forward to welcoming you, <strong className="text-[#b37a2b] font-bold">{name}</strong>. A confirmation has been prepared for your party.
                </p>
              </div>

              {/* Reservation summary card */}
              <div className={`max-w-md mx-auto rounded-2xl p-6 text-left text-sm sm:text-base space-y-3.5 border ${
                isNight 
                  ? 'bg-[#24060f] border-[#6b152d] text-[#f5f1ea]' 
                  : 'bg-stone-50 border-stone-200 text-stone-950'
              }`}>
                <div className={`flex justify-between border-b pb-2.5 ${isNight ? 'border-[#521324]' : 'border-stone-200'}`}>
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Date &amp; Time:</span>
                  <span className="font-bold text-stone-900 dark:text-white">{date} at {time}</span>
                </div>
                <div className={`flex justify-between border-b pb-2.5 ${isNight ? 'border-[#521324]' : 'border-stone-200'}`}>
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Party Size:</span>
                  <span className="font-bold text-stone-900 dark:text-white">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className={`flex justify-between border-b pb-2.5 ${isNight ? 'border-[#521324]' : 'border-stone-200'}`}>
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Seating Area:</span>
                  <span className="font-extrabold text-[#b37a2b]">{seatingOptions.find(s => s.id === seatingArea)?.name}</span>
                </div>
                <div className={`flex justify-between border-b pb-2.5 ${isNight ? 'border-[#521324]' : 'border-stone-200'}`}>
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Occasion:</span>
                  <span className="font-bold capitalize text-stone-900 dark:text-white">{occasion}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Location:</span>
                  <span className="font-medium text-stone-800 dark:text-gray-200">11330 Santa Monica Blvd (Valet Available)</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-[#b37a2b] via-[#d4a359] to-[#f3cf8a] text-stone-950 font-black text-sm uppercase tracking-widest hover:brightness-110 shadow-xl transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Party Size Selector */}
              <div>
                <label className={`block text-sm sm:text-base font-bold uppercase tracking-wider mb-2.5 flex items-center space-x-2 ${
                  isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                }`}>
                  <Users size={18} className="text-[#b37a2b]" />
                  <span>Party Size (Number of Guests)</span>
                </label>
                <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 scrollbar-thin">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`h-11 min-w-[2.8rem] px-2.5 rounded-xl text-sm font-black flex items-center justify-center transition-all cursor-pointer border ${
                        guests === num
                          ? 'bg-[#d4a359] text-stone-950 border-[#b37a2b] shadow-lg scale-105'
                          : isNight
                            ? 'bg-[#24060f] text-[#f3d2d8] border-[#521324] hover:bg-[#3d0917]'
                            : 'bg-stone-100 text-stone-900 border-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {num}{num === 15 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 flex items-center space-x-1.5 ${
                    isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                  }`}>
                    <CalendarIcon size={15} className="text-[#b37a2b]" />
                    <span>Reservation Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-bold outline-none transition-colors ${
                      isNight 
                        ? 'bg-[#24060f] border-[#521324] text-white focus:border-[#d4a359]' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-[#b37a2b]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 flex items-center space-x-1.5 ${
                    isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                  }`}>
                    <Clock size={15} className="text-[#b37a2b]" />
                    <span>Preferred Time</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-bold outline-none transition-colors ${
                      isNight 
                        ? 'bg-[#24060f] border-[#521324] text-white focus:border-[#d4a359]' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-[#b37a2b]'
                    }`}
                  >
                    <optgroup label="Dinner & Evening (Cabaret & Live)">
                      {dinnerTimes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Lunch Hub (11:30 AM – 4:00 PM)">
                      {lunchTimes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <label className={`block text-xs sm:text-sm font-bold uppercase tracking-wider mb-2.5 flex items-center space-x-1.5 ${
                  isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                }`}>
                  <MapPin size={15} className="text-[#b37a2b]" />
                  <span>Choose Seating Area</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSeatingArea(option.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        seatingArea === option.id
                          ? isNight
                            ? 'bg-[#3d0917] border-[#d4a359] shadow-lg ring-1 ring-[#d4a359]'
                            : 'bg-amber-50/80 border-[#b37a2b] shadow-md ring-1 ring-[#b37a2b]'
                          : isNight
                            ? 'bg-[#24060f] border-[#521324] hover:border-[#831f3b]'
                            : 'bg-stone-50 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{option.icon}</span>
                          <span className={`font-bold text-sm sm:text-base ${isNight ? 'text-white' : 'text-stone-950'}`}>
                            {option.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          seatingArea === option.id
                            ? 'bg-[#d4a359] text-stone-950'
                            : isNight ? 'bg-[#521324] text-[#f5d79e]' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {option.tag}
                        </span>
                      </div>
                      <p className={`text-xs mt-2 leading-relaxed ${isNight ? 'text-[#f3d2d8]/80' : 'text-stone-600'}`}>
                        {option.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className={`block text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 ${
                  isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                }`}>
                  Dining Occasion
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'dinner', label: 'Casual Dining' },
                    { id: 'birthday', label: 'Birthday' },
                    { id: 'anniversary', label: 'Anniversary' },
                    { id: 'romantic', label: 'Date Night' },
                    { id: 'business', label: 'Business Lunch' },
                    { id: 'family', label: 'Family Feast' },
                    { id: 'live-show', label: 'Concert & Show' },
                    { id: 'celebration', label: 'Celebration' },
                  ].map((occ) => (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setOccasion(occ.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                        occasion === occ.id
                          ? 'bg-[#d4a359] text-stone-950 border-[#b37a2b]'
                          : isNight
                            ? 'bg-[#24060f] text-white border-[#521324] hover:bg-[#3d0917]'
                            : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {occ.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4 pt-2 border-t border-[#521324]/50">
                <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-widest ${
                  isNight ? 'text-[#f3cf8a]' : 'text-[#8c6227]'
                }`}>
                  Guest Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                      isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dariush Rahbar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${
                        isNight 
                          ? 'bg-[#24060f] border-[#521324] text-white focus:border-[#d4a359]' 
                          : 'bg-white border-stone-300 text-stone-900 focus:border-[#b37a2b]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                      isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="guest@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${
                        isNight 
                          ? 'bg-[#24060f] border-[#521324] text-white focus:border-[#d4a359]' 
                          : 'bg-white border-stone-300 text-stone-900 focus:border-[#b37a2b]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                      isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                    }`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(310) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${
                        isNight 
                          ? 'bg-[#24060f] border-[#521324] text-white focus:border-[#d4a359]' 
                          : 'bg-white border-stone-300 text-stone-900 focus:border-[#b37a2b]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                    isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                  }`}>
                    Special Requests or Dietary Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Dietary requests (halal, gluten-free), high chair, favorite booth..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none resize-none ${
                      isNight 
                        ? 'bg-[#24060f] border-[#521324] text-white focus:border-[#d4a359]' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-[#b37a2b]'
                    }`}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#b37a2b] via-[#d4a359] to-[#f3cf8a] hover:from-[#c98e38] hover:to-[#ffe09e] text-stone-950 font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles size={18} />
                <span>CONFIRM TABLE RESERVATION</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

