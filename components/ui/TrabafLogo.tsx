'use client';

import React from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/image-path';

interface TrabafLogoProps {
  variant?: 'light' | 'dark' | 'full';
  className?: string;
  height?: number;
  width?: number;
}

export function TrabafLogo({ variant = 'full', className = '', height = 48, width = 180 }: TrabafLogoProps) {
  const [imgError, setImgError] = React.useState(false);

  if (!imgError) {
    return (
      <div className={`relative flex items-center ${className}`}>
        <Image
          src={getImagePath('/images/logo.png')}
          alt="TRABAF Construction Tunisie"
          width={width}
          height={height}
          priority
          onError={() => setImgError(false)}
          className={`object-contain transition-transform duration-300 hover:scale-[1.02] ${
            variant === 'dark' ? 'brightness-0 invert' : ''
          }`}
          style={{ height: `${height}px`, width: 'auto' }}
        />
      </div>
    );
  }

  // Pure SVG fallback matching official TRABAF visual design
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex flex-col justify-center">
        {/* Roof Structure Graphic */}
        <svg width="160" height="42" viewBox="0 0 200 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Yellow Roof Layer */}
          <path d="M10 22 L75 8 L140 22" stroke="#F5B800" strokeWidth="4" strokeLinecap="round" />
          {/* Navy Roof Structure */}
          <path d="M14 20 L75 6 L136 20" stroke="#0E2E5C" strokeWidth="6" strokeLinecap="round" />
          
          {/* TRABAF Text */}
          <text x="12" y="42" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" fill={variant === 'dark' ? '#FFFFFF' : '#0E2E5C'} letterSpacing="3">
            TRABAF
          </text>
          {/* Yellow accent on T */}
          <rect x="12" y="24" width="18" height="4" fill="#F5B800" rx="1" />
          
          {/* Separator line */}
          <line x1="12" y1="46" x2="160" y2="46" stroke="#F5B800" strokeWidth="1.5" />
          
          {/* CONSTRUCTION */}
          <text x="14" y="54" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8" fill={variant === 'dark' ? '#E2E8F0' : '#0E2E5C'} letterSpacing="4">
            CONSTRUCTION
          </text>
        </svg>
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#0E2E5C] dark:text-white uppercase pl-3 mt-[-2px]">
          TUNISIE
        </span>
      </div>
    </div>
  );
}
