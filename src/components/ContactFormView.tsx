import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar, Users, MessageSquare, Clock, Utensils, Sparkles, CheckCircle2, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppMode } from '../types';

interface ContactFormViewProps {
  mode: AppMode;
  onOpenReservation?: (spaceName?: string) => void;
}

export const ContactFormView: React.FC<ContactFormViewProps> = ({ mode }) => {
  const isNight = mode === 'night';
  const [activeTab, setActiveTab] = useState<'reserve' | 'inquiry'>('reserve');

  // Table reservation form state
  const [reserveData, setReserveData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: '2026-09-12',
    time: '7:30 PM',
    seatingArea: 'flame-main-dining',
    occasion: 'dinner',
    notes: '',
  });
  const [reserveSubmitted, setReserveSubmitted] = useState(false);

  // General inquiry form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'General Dining & Table Booking',
    preferredDate: '',
    preferredTime: '7:30 PM',
    guestCount: '2 Guests',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const seatingOptions = [
    { id: 'flame-main-dining', name: 'Main Dining Room', tag: 'Classic Persian Dining', icon: '🕯️' },
    { id: 'flame-patio', name: 'Covered Patio Oasis', tag: 'Garden Alfresco', icon: '🌿' },
    { id: 'sunlit-corner', name: 'Sunlit Window Table', tag: 'Intimate Seating', icon: '🪟' },
    { id: 'flame-lounge-stage', name: 'Lounge & Stage Table', tag: 'Live Music Ambiance', icon: '✨' },
  ];

  const lunchTimes = ['11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];
  const dinnerTimes = ['4:00 PM', '5:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveData.name || !reserveData.email || !reserveData.phone) return;

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4a359', '#ffcc80', '#e91e63', '#ffffff']
    });

    setReserveSubmitted(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className={`space-y-10 font-['Raleway'] rounded-3xl transition-colors duration-300 ${
      isNight ? 'text-[#f7e8ea]' : 'text-stone-900'
    }`}>
      
      {/* HEADER INTRO */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#d4a359]/20 border border-[#d4a359] text-[#9e1c38] dark:text-[#f3cf8a] text-xs font-extrabold uppercase tracking-widest">
          <Utensils size={15} className="text-[#d4a359]" />
          <span>TABLE RESERVATIONS &amp; CONCIERGE</span>
        </div>
        <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold ${
          isNight ? 'text-white' : 'text-stone-950'
        }`}>
          Reserve a Table &amp; Contact Us
        </h2>
        <p className={`text-base sm:text-lg font-normal leading-relaxed ${
          isNight ? 'text-gray-200' : 'text-stone-600'
        }`}>
          Book your dining table online with instant confirmation, or contact our West LA concierge team for private events, concert seating, and catering.
        </p>
      </div>

      {/* PROMINENT EXTERNAL SEGMENTED TABS (Placed outside the form for high visibility) */}
      <div className="flex justify-center pt-2">
        <div className={`inline-flex p-1.5 rounded-full border shadow-xl ${
          isNight 
            ? 'bg-[#1c030b] border-[#6b152d]' 
            : 'bg-stone-100 border-stone-300'
        }`}>
          <button
            id="tab-reserve-table"
            type="button"
            onClick={() => setActiveTab('reserve')}
            className={`px-6 sm:px-9 py-3.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2.5 ${
              activeTab === 'reserve'
                ? 'bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] text-black shadow-lg scale-105'
                : isNight
                  ? 'text-[#f5a7b8] hover:text-white'
                  : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <Utensils size={17} className={activeTab === 'reserve' ? 'text-black' : 'text-[#d4a359]'} />
            <span>Reserve a Table</span>
          </button>

          <button
            id="tab-general-inquiry"
            type="button"
            onClick={() => setActiveTab('inquiry')}
            className={`px-6 sm:px-9 py-3.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2.5 ${
              activeTab === 'inquiry'
                ? 'bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] text-black shadow-lg scale-105'
                : isNight
                  ? 'text-[#f5a7b8] hover:text-white'
                  : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <Mail size={17} className={activeTab === 'inquiry' ? 'text-black' : 'text-[#d4a359]'} />
            <span>General Inquiry</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        
        {/* LEFT COLUMN: DIRECT CONTACT DETAILS */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border ${
            isNight 
              ? 'bg-[#1c030b] border-[#6b152d]' 
              : 'bg-white border-stone-200'
          }`}>
            <h3 className={`font-serif text-2xl font-bold border-b pb-3 ${
              isNight ? 'text-[#d4a359] border-[#521324]' : 'text-[#9e1c38] border-stone-200'
            }`}>
              Direct Contact Info
            </h3>
            
            <div className="space-y-5 text-sm sm:text-base">
              <div className="flex items-start space-x-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                  isNight ? 'bg-[#3d0a1c] border-[#831f3b] text-[#d4a359]' : 'bg-amber-50 border-amber-200 text-[#9e1c38]'
                }`}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h5 className={`font-bold uppercase tracking-wider text-xs sm:text-sm ${
                    isNight ? 'text-white' : 'text-stone-900'
                  }`}>
                    Address &amp; Location
                  </h5>
                  <p className={`mt-0.5 ${isNight ? 'text-gray-200' : 'text-stone-700'}`}>
                    11330 Santa Monica Blvd, West Los Angeles, CA 90025
                  </p>
                  <span className={`text-xs sm:text-sm font-semibold block mt-1 ${
                    isNight ? 'text-[#f3cf8a]' : 'text-[#9e1c38]'
                  }`}>
                    Complimentary Valet Parking Available
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                  isNight ? 'bg-[#3d0a1c] border-[#831f3b] text-[#d4a359]' : 'bg-amber-50 border-amber-200 text-[#9e1c38]'
                }`}>
                  <Phone size={22} />
                </div>
                <div>
                  <h5 className={`font-bold uppercase tracking-wider text-xs sm:text-sm ${
                    isNight ? 'text-white' : 'text-stone-900'
                  }`}>
                    Direct Phone Lines
                  </h5>
                  <p className={`mt-0.5 ${isNight ? 'text-gray-200' : 'text-stone-700'}`}>
                    Table Bookings: <a href="tel:3104440045" className="font-bold hover:underline text-[#d4a359] dark:text-[#f3cf8a]">(310) 444-0045</a>
                  </p>
                  <p className={isNight ? 'text-gray-200' : 'text-stone-700'}>
                    Concerts &amp; Events: <a href="tel:3104440046" className="font-bold hover:underline text-[#d4a359] dark:text-[#f3cf8a]">(310) 444-0046</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                  isNight ? 'bg-[#3d0a1c] border-[#831f3b] text-[#d4a359]' : 'bg-amber-50 border-amber-200 text-[#9e1c38]'
                }`}>
                  <Mail size={22} />
                </div>
                <div>
                  <h5 className={`font-bold uppercase tracking-wider text-xs sm:text-sm ${
                    isNight ? 'text-white' : 'text-stone-900'
                  }`}>
                    Email Concierge
                  </h5>
                  <p className={`mt-0.5 ${isNight ? 'text-gray-200' : 'text-stone-700'}`}>
                    General &amp; Tables: contact@flameinternational.com
                  </p>
                  <p className={isNight ? 'text-gray-200' : 'text-stone-700'}>
                    Private Events: banquets@flameinternational.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                  isNight ? 'bg-[#3d0a1c] border-[#831f3b] text-[#d4a359]' : 'bg-amber-50 border-amber-200 text-[#9e1c38]'
                }`}>
                  <Clock size={22} />
                </div>
                <div>
                  <h5 className={`font-bold uppercase tracking-wider text-xs sm:text-sm ${
                    isNight ? 'text-white' : 'text-stone-900'
                  }`}>
                    Dining &amp; Show Hours
                  </h5>
                  <p className={`mt-0.5 ${isNight ? 'text-gray-200' : 'text-stone-700'}`}>
                    Mon – Sun: 11:30 AM – 11:00 PM
                  </p>
                  <p className={isNight ? 'text-gray-200' : 'text-stone-700'}>
                    Fri &amp; Sat Cabaret: 9:00 PM – 1:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE FORM (RESERVE TABLE / INQUIRY) */}
        <div id="contact-form-section" className="lg:col-span-7">
          <div className={`rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border ${
            isNight 
              ? 'bg-[#1c030b] border-[#6b152d]' 
              : 'bg-white border-stone-200'
          }`}>

            {/* TAB 1: RESERVE A TABLE FORM */}
            {activeTab === 'reserve' && (
              reserveSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className={`font-serif text-2xl sm:text-3xl font-bold ${
                    isNight ? 'text-white' : 'text-stone-950'
                  }`}>
                    Table Reservation Confirmed!
                  </h4>
                  <p className={`text-base max-w-md mx-auto leading-relaxed ${
                    isNight ? 'text-gray-200' : 'text-stone-600'
                  }`}>
                    Thank you, <strong className="text-[#9e1c38] dark:text-[#f3cf8a]">{reserveData.name}</strong>. We have saved your table for <strong className="text-[#9e1c38] dark:text-[#f3cf8a]">{reserveData.guests} guests</strong> on <strong className="text-[#9e1c38] dark:text-[#f3cf8a]">{reserveData.date} at {reserveData.time}</strong>.
                  </p>
                  <button
                    onClick={() => setReserveSubmitted(false)}
                    className={`px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer transition-all border ${
                      isNight 
                        ? 'bg-[#3d0a1c] hover:bg-[#5e1026] text-[#f5d79e] border-[#831f3b]' 
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300'
                    }`}
                  >
                    Reserve Another Table
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReserveSubmit} className="space-y-5">
                  <div className={`flex items-center justify-between border-b pb-3 ${
                    isNight ? 'border-[#521324]' : 'border-stone-200'
                  }`}>
                    <h3 className={`font-serif text-xl sm:text-2xl font-bold ${
                      isNight ? 'text-white' : 'text-stone-900'
                    }`}>
                      Reserve Your Dining Table
                    </h3>
                    <span className="text-xs text-[#9e1c38] dark:text-[#d4a359] font-bold">
                      Instant Confirmation
                    </span>
                  </div>

                  {/* Party Size Selector */}
                  <div className="space-y-1.5">
                    <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                      isNight ? 'text-gray-200' : 'text-stone-700'
                    }`}>
                      <Users size={15} className="text-[#d4a359]" />
                      <span>Party Size (Guests) *</span>
                    </label>
                    <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setReserveData({ ...reserveData, guests: num })}
                          className={`h-10 min-w-[2.6rem] px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer border ${
                            reserveData.guests === num
                              ? 'bg-[#d4a359] text-stone-950 border-[#b37a2b] shadow-md font-black scale-105'
                              : isNight
                                ? 'bg-[#280510] text-[#f3d2d8] border-[#521324] hover:bg-[#3d0917]'
                                : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                          }`}
                        >
                          {num}{num === 15 ? '+' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        <Calendar size={14} className="text-[#d4a359]" />
                        <span>Reservation Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={reserveData.date}
                        onChange={(e) => setReserveData({ ...reserveData, date: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        <Clock size={14} className="text-[#d4a359]" />
                        <span>Preferred Time *</span>
                      </label>
                      <select
                        value={reserveData.time}
                        onChange={(e) => setReserveData({ ...reserveData, time: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      >
                        <optgroup label="Dinner (Live Ambiance & Cabaret)">
                          {dinnerTimes.map(t => <option key={t} value={t}>{t}</option>)}
                        </optgroup>
                        <optgroup label="Lunch Hours">
                          {lunchTimes.map(t => <option key={t} value={t}>{t}</option>)}
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Seating Area */}
                  <div className="space-y-1.5">
                    <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                      isNight ? 'text-gray-200' : 'text-stone-700'
                    }`}>
                      <MapPin size={14} className="text-[#d4a359]" />
                      <span>Seating Preference</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {seatingOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setReserveData({ ...reserveData, seatingArea: opt.id })}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            reserveData.seatingArea === opt.id
                              ? isNight
                                ? 'bg-[#3d0917] border-[#d4a359] text-white shadow-md ring-1 ring-[#d4a359]'
                                : 'bg-amber-50 border-[#b37a2b] text-stone-950 shadow-sm ring-1 ring-[#b37a2b] font-bold'
                              : isNight
                                ? 'bg-[#280510] border-[#521324] text-gray-300 hover:border-[#831f3b]'
                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          <span className="text-base block mb-0.5">{opt.icon}</span>
                          <span className="text-xs font-bold block">{opt.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guest Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className={`text-xs font-bold uppercase tracking-wider ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dariush Rahbar"
                        value={reserveData.name}
                        onChange={(e) => setReserveData({ ...reserveData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`text-xs font-bold uppercase tracking-wider ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="guest@example.com"
                        value={reserveData.email}
                        onChange={(e) => setReserveData({ ...reserveData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`text-xs font-bold uppercase tracking-wider ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(310) 000-0000"
                        value={reserveData.phone}
                        onChange={(e) => setReserveData({ ...reserveData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1">
                    <label className={`text-xs font-bold uppercase tracking-wider ${
                      isNight ? 'text-gray-200' : 'text-stone-700'
                    }`}>
                      Special Notes or Dietary Preferences
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Special requests, high chair, birthday candles, favorite booth..."
                      value={reserveData.notes}
                      onChange={(e) => setReserveData({ ...reserveData, notes: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none resize-none ${
                        isNight 
                          ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                          : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] text-black font-black text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:brightness-110 active:scale-98 flex items-center justify-center space-x-2"
                  >
                    <Sparkles size={18} />
                    <span>CONFIRM TABLE RESERVATION</span>
                  </button>
                </form>
              )
            )}

            {/* TAB 2: GENERAL INQUIRIES & BANQUETS */}
            {activeTab === 'inquiry' && (
              submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className={`font-serif text-2xl sm:text-3xl font-bold ${
                    isNight ? 'text-white' : 'text-stone-950'
                  }`}>
                    Thank You, {formData.fullName}!
                  </h4>
                  <p className={`text-base max-w-md mx-auto leading-relaxed ${
                    isNight ? 'text-gray-200' : 'text-stone-600'
                  }`}>
                    Your inquiry regarding <strong className="text-[#9e1c38] dark:text-[#f3cf8a]">{formData.inquiryType}</strong> has been received by our host concierge. We will respond within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className={`px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer transition-all border ${
                      isNight 
                        ? 'bg-[#3d0a1c] hover:bg-[#5e1026] text-[#f5d79e] border-[#831f3b]' 
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300'
                    }`}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-5">
                  <h3 className={`font-serif text-xl sm:text-2xl font-bold border-b pb-3 ${
                    isNight ? 'text-white border-[#521324]' : 'text-stone-900 border-stone-200'
                  }`}>
                    Send a General Inquiry
                  </h3>

                  {/* Grid Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dariush Rahbar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. guest@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(310) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div className="space-y-1.5">
                      <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                        isNight ? 'text-gray-200' : 'text-stone-700'
                      }`}>
                        Inquiry Type *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          isNight 
                            ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                            : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                        }`}
                      >
                        <option value="General Dining & Table Booking">General Dining &amp; Table Booking</option>
                        <option value="Private Event & Banquet Room Rental">Private Event &amp; Banquet Room Rental</option>
                        <option value="Catering & Skewer Platter Orders">Catering &amp; Skewer Platter Orders</option>
                        <option value="Live Concert & Ticketing Inquiry">Live Concert &amp; Ticketing Inquiry</option>
                        <option value="Media & Press">Media &amp; Press</option>
                      </select>
                    </div>

                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 pt-1">
                    <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                      isNight ? 'text-gray-200' : 'text-stone-700'
                    }`}>
                      Your Message or Event Details *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us about your banquet, guest count, dietary requests, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none ${
                        isNight 
                          ? 'bg-[#280510] border-[#521324] focus:border-[#d4a359] text-white' 
                          : 'bg-stone-50 border-stone-300 focus:border-[#9e1c38] focus:bg-white text-stone-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:brightness-110 active:scale-98 flex items-center justify-center space-x-2"
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? 'SENDING INQUIRY...' : 'SUBMIT INQUIRY TO CONCIERGE'}</span>
                  </button>
                </form>
              )
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
