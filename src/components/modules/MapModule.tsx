import React, { useState } from 'react';
import { 
  MapPin, Route, Navigation, ExternalLink, Plus, Minus, RotateCcw,
  CheckCircle2, Car, Compass, Globe, Sparkles 
} from 'lucide-react';
import { RevealOnScroll } from '../RevealOnScroll';
import { FlameLogo } from '../FlameLogo';

export interface MapModuleProps {
  className?: string;
  initialZoom?: number;
  showTitle?: boolean;
  compact?: boolean;
}

// Preset origin locations for quick route calculations on the street map
const ROUTE_ORIGINS = [
  { id: 'santa-monica', name: 'Santa Monica', distance: '3.9 mi', minutes: 11, traffic: 'Smooth (🟢)' },
  { id: 'beverly-hills', name: 'Beverly Hills', distance: '4.2 mi', minutes: 13, traffic: 'Light (🟢)' },
  { id: 'ucla', name: 'Westwood / UCLA', distance: '1.8 mi', minutes: 6, traffic: 'Smooth (🟢)' },
  { id: 'century-city', name: 'Century City', distance: '2.7 mi', minutes: 8, traffic: 'Smooth (🟢)' },
  { id: 'culver-city', name: 'Culver City', distance: '4.8 mi', minutes: 12, traffic: 'Smooth (🟢)' },
  { id: 'lax', name: 'LAX Airport', distance: '10.5 mi', minutes: 18, traffic: 'Moderate (🟡)' },
  { id: 'dtla', name: 'Downtown LA', distance: '12.4 mi', minutes: 22, traffic: 'Normal (🟢)' },
];

function calculateDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatTravelTime(minutes: number): string {
  if (minutes < 60) return `${minutes} mins`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining === 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : `${hours}h ${remaining}m`;
}

export const MapModule: React.FC<MapModuleProps> = ({
  className = '',
  initialZoom = 3,
  showTitle = true,
  compact = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(initialZoom);
  const [selectedOriginId, setSelectedOriginId] = useState<string>('santa-monica');
  const [customOrigin, setCustomOrigin] = useState<string>('');
  const [gpsData, setGpsData] = useState<{ distance: string; time: string } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const activeOrigin = ROUTE_ORIGINS.find((o) => o.id === selectedOriginId) || ROUTE_ORIGINS[0];
  const displayDistance = gpsData && customOrigin ? gpsData.distance : activeOrigin.distance;
  const displayTime = gpsData && customOrigin ? gpsData.time : formatTravelTime(activeOrigin.minutes);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 1));

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation not supported. Tap "Open Navigation" below!');
      return;
    }
    setIsLocating(true);
    setLocationStatus('Accessing device GPS...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const distMiles = calculateDistanceMiles(userLat, userLon, 34.0416, -118.4552);
        let estMins = Math.max(3, Math.round(distMiles * 2.2 + 2));
        if (distMiles < 0.5) estMins = 2;
        else if (distMiles > 60) estMins = Math.round(distMiles * 1.1 + 10);

        const distStr = `${distMiles.toFixed(1)} mi`;
        const timeStr = formatTravelTime(estMins);
        setGpsData({ distance: distStr, time: timeStr });
        setCustomOrigin(`GPS Location (${distStr})`);
        setIsLocating(false);
        setLocationStatus(`GPS Locked: ~${distStr} (${timeStr} drive)`);
      },
      () => {
        setIsLocating(false);
        setLocationStatus('GPS unavailable. Use navigation button below.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <section id="map-module" className={`w-full text-[#f7e8ea] font-['Raleway'] ${className}`}>
      <div className="max-w-6xl mx-auto">
        
        {showTitle && (
          <RevealOnScroll direction="up" delay={0} duration={600} className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#2d0713] border border-[#6b152d] text-xs font-semibold uppercase tracking-widest text-[#f5d79e] mb-2 shadow-sm">
              <Compass size={14} className="text-[#f3cf8a]" />
              <span>West Los Angeles Location</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">
              FIND US ON <span className="text-[#f3cf8a]">SANTA MONICA BLVD</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#f3d2d8] mt-1">
              11330 Santa Monica Blvd, West Los Angeles, CA 90025 • Valet at Entrance
            </p>
          </RevealOnScroll>
        )}

        {/* Unified Map Box in 2-Tone Footer Wine Colors */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#24060f] via-[#1c040d] to-[#24060f] border border-[#521324] shadow-2xl space-y-4">
          
          {/* Origin selector bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center space-x-2">
              <Route size={16} className="text-[#f3cf8a]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#f5a7b8]">
                ESTIMATE DRIVE TIME:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  customOrigin
                    ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black border-[#d4a359] shadow-md scale-105'
                    : 'bg-[#3d0917] hover:bg-[#521324] text-[#f5d79e] border-[#831f3b]'
                }`}
              >
                {isLocating ? 'Locating...' : 'My GPS'}
              </button>

              {ROUTE_ORIGINS.slice(0, compact ? 4 : 7).map((origin) => (
                <button
                  key={origin.id}
                  onClick={() => {
                    setSelectedOriginId(origin.id);
                    setCustomOrigin('');
                    setLocationStatus(null);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                    selectedOriginId === origin.id && !customOrigin
                      ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black border-[#d4a359] shadow-md font-bold'
                      : 'bg-[#180309] text-[#e2e8f0] hover:bg-[#280612] border-[#521324]'
                  }`}
                >
                  {origin.name}
                </button>
              ))}
            </div>
          </div>

          {/* Drive Time Stat Banner */}
          <div className="py-2 px-4 rounded-2xl bg-[#180309] border border-[#521324] flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#f5a7b8]">
                ESTIMATED TIME
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#f3cf8a]">
                {displayTime}
              </span>
            </div>
            <span className="text-[#521324] hidden sm:inline">•</span>
            <div className="text-xs text-[#f7e8ea] font-medium">
              Distance: <span className="text-white font-bold">{displayDistance}</span>
            </div>
            <span className="text-[#521324] hidden sm:inline">•</span>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-green-950/80 border border-green-500/40 text-green-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>{customOrigin ? 'Live GPS' : activeOrigin.traffic}</span>
            </div>
          </div>

          {/* Street Map Viewport */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#180309] border border-[#521324] p-1 select-none">
            
            {/* Zoom Controls */}
            <div className="absolute top-3 right-3 z-20 flex flex-col items-center bg-[#24060f]/95 border border-[#6b152d] rounded-xl p-1 shadow-xl space-y-1">
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel === 5}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-[#f5d79e] bg-[#340816] hover:bg-[#d4a359] hover:text-black border border-[#521324] transition-all cursor-pointer"
                title="Zoom In"
              >
                <Plus size={15} />
              </button>
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel === 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-[#f5d79e] bg-[#340816] hover:bg-[#d4a359] hover:text-black border border-[#521324] transition-all cursor-pointer"
                title="Zoom Out"
              >
                <Minus size={15} />
              </button>
            </div>

            {/* Map Vector Display */}
            <div className="w-full h-full rounded-xl overflow-hidden bg-[#180309]">
              <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                <defs>
                  <linearGradient id="mapModuleRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b37a2b" />
                    <stop offset="50%" stopColor="#f7d688" />
                    <stop offset="100%" stopColor="#d4a359" />
                  </linearGradient>
                  <filter id="mapModuleGlow">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#d4a359" floodOpacity="0.8" />
                  </filter>
                </defs>
                <rect width="500" height="350" fill="#180309" />

                {/* I-405 Freeway */}
                <path d="M 345 0 L 345 350" stroke="#003366" strokeWidth="40" />
                <path d="M 345 0 L 345 350" stroke="#24060f" strokeWidth="26" />
                <g transform="translate(345, 38)">
                  <rect x="-16" y="-11" width="32" height="22" rx="4" fill="#003366" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="-16" y="-11" width="32" height="7" rx="2" fill="#cc0000" />
                  <text x="0" y="6" fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle">405</text>
                </g>

                {/* Sawtelle Blvd */}
                <path d="M 120 0 L 120 350" stroke="#521324" strokeWidth="32" />
                <path d="M 120 0 L 120 350" stroke="#1c040d" strokeWidth="22" />
                <text x="120" y="260" fill="#f3cf8a" fontSize="10" fontWeight="700" transform="rotate(-90 120 260)" textAnchor="middle">SAWTELLE BLVD</text>

                {/* Corinth Ave */}
                <path d="M 370 0 L 370 350" stroke="#521324" strokeWidth="32" />
                <path d="M 370 0 L 370 350" stroke="#1c040d" strokeWidth="22" />
                <text x="370" y="260" fill="#f3cf8a" fontSize="10" fontWeight="700" transform="rotate(90 370 260)" textAnchor="middle">CORINTH AVE</text>

                {/* Santa Monica Blvd */}
                <path d="M 0 160 L 500 160" stroke="#831f3b" strokeWidth="44" />
                <path d="M 0 160 L 500 160" stroke="#180309" strokeWidth="34" />
                <text x="240" y="165" fill="#ffffff" fontSize="12" fontWeight="800" letterSpacing="0.12em" textAnchor="middle">
                  SANTA MONICA BOULEVARD (CA-2)
                </text>

                {/* Gold Route Line */}
                <path
                  d="M 0 160 L 250 160 L 250 110"
                  fill="none"
                  stroke="url(#mapModuleRouteGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  filter="url(#mapModuleGlow)"
                />

                {/* Flame Building Target */}
                <g transform="translate(190, 70)">
                  <rect x="0" y="0" width="120" height="75" rx="8" fill="#3d0917" stroke="#d4a359" strokeWidth="2.5" />
                  <text x="60" y="22" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">FLAME</text>
                  <text x="60" y="36" fill="#ffffff" fontSize="10" fontWeight="800" letterSpacing="0.1em" textAnchor="middle">INTERNATIONAL</text>
                  <text x="60" y="54" fill="#f3cf8a" fontSize="11" fontWeight="700" textAnchor="middle">11330</text>
                  <text x="60" y="67" fill="#f3cf8a" fontSize="8.5" fontWeight="600" textAnchor="middle">SANTA MONICA BLVD</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Direct Navigation Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center space-x-2 text-xs text-[#f5d79e]">
              <Car size={15} className="text-[#f3cf8a]" />
              <span>Complimentary Valet Parking at Entrance</span>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=11330+Santa+Monica+Blvd,+West+Los+Angeles,+CA+90025"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md hover:brightness-110"
              >
                <Navigation size={13} />
                <span>Google Maps</span>
              </a>
              <a
                href="http://maps.apple.com/?daddr=11330+Santa+Monica+Blvd,+West+Los+Angeles,+CA+90025"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#3d0917] hover:bg-[#521324] border border-[#831f3b] text-[#f3cf8a] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5"
              >
                <ExternalLink size={13} />
                <span>Apple Maps</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
