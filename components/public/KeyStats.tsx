'use client';

import React from 'react';
import { DataService } from '@/lib/data-service';
import { Award, Building2, Users, CheckCircle } from 'lucide-react';

export function KeyStats() {
  const settings = DataService.getCompanySettings();

  const iconMap: Record<string, React.ReactNode> = {
    '1': <Building2 className="w-8 h-8 text-[#F5B800]" />,
    '2': <Award className="w-8 h-8 text-[#F5B800]" />,
    '3': <Users className="w-8 h-8 text-[#F5B800]" />,
    '4': <CheckCircle className="w-8 h-8 text-[#F5B800]" />
  };

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0E2E5C] border-2 border-[#F5B800]/40 rounded-2xl shadow-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-white divide-y md:divide-y-0 md:divide-x divide-[#18437E]">
        {settings.stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`flex flex-col items-center text-center p-4 transition-transform duration-300 hover:scale-105 ${
              index !== 0 ? 'pt-6 md:pt-4' : ''
            }`}
          >
            <div className="mb-3 p-3 rounded-full bg-[#18437E]/60 shadow-inner">
              {iconMap[stat.id] || <Building2 className="w-8 h-8 text-[#F5B800]" />}
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center justify-center">
              {stat.prefix}
              <span>{stat.value}</span>
              {stat.suffix}
            </div>
            <div className="text-sm font-bold text-[#F5B800] mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
            {stat.description && (
              <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 max-w-[200px]">
                {stat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
