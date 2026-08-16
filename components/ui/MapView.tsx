'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface MapViewProps {
  lat: number;
  lng: number;
  title: string;
  locationName: string;
  height?: string;
}

export function MapView({ lat, lng, title, locationName, height = '350px' }: MapViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  if (!isClient) {
    return (
      <div
        style={{ height }}
        className="w-full bg-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 border border-slate-700 animate-pulse"
      >
        <MapPin className="w-8 h-8 text-[#F5B800] mb-2" />
        <span>Chargement de la carte...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 group">
      {/* Map Iframe embed with OpenStreetMap view */}
      <iframe
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${lat},${lng}&hl=fr&z=14&output=embed`}
        title={`Carte de localisation : ${title}`}
      />

      {/* Floating Info Overlay */}
      <div className="absolute top-3 left-3 bg-[#081B38]/90 backdrop-blur-md text-white p-3 rounded-lg shadow-xl max-w-xs border border-[#F5B800]/30 text-xs">
        <div className="flex items-center gap-2 font-bold text-[#F5B800] mb-1">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{title}</span>
        </div>
        <p className="text-slate-300 text-[11px] mb-2">{locationName}</p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-bold px-3 py-1 rounded text-[11px] transition-colors"
        >
          <span>Voir sur Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
