'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, ShieldCheck, HardHat, Building2 } from 'lucide-react';
import { DataService } from '@/lib/data-service';

export function Hero() {
  const settings = DataService.getCompanySettings();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#081B38] overflow-hidden text-white pt-8 pb-16">
      {/* Hero Background Image & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg.png"
          alt="TRABAF Construction Chantier"
          fill
          priority
          className="object-cover object-center opacity-30 scale-105 animate-pulse duration-10000"
        />
        {/* Navy Gradient Overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#081B38] via-[#0E2E5C]/90 to-[#081B38]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081B38] via-transparent to-transparent" />
      </div>

      {/* Decorative Brand Yellow Shape Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B800]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#18437E]/40 rounded-full filter blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-3xl space-y-6">
          {/* Badge Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18437E]/80 border border-[#F5B800]/50 text-[#F5B800] text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <HardHat className="w-4 h-4 text-[#F5B800]" />
            <span>CONSTRUCTION • GÉNIE CIVIL • BTP IN TUNISIA</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Construire aujourd&apos;hui, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B800] via-[#FFD700] to-yellow-200">
              les projets de demain.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
            {settings.slogan} {settings.description}
          </p>

          {/* Feature Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-semibold text-slate-200">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#F5B800]" />
              <span>Rigueur & Qualité</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg border border-white/10">
              <Building2 className="w-4 h-4 text-[#F5B800]" />
              <span>Génie Civil Avancé</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg border border-white/10 col-span-2 sm:col-span-1">
              <HardHat className="w-4 h-4 text-[#F5B800]" />
              <span>Respect des Délais</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/projets"
              className="inline-flex items-center justify-center gap-3 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-base group"
            >
              <span>Découvrir nos réalisations</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 font-bold px-8 py-4 rounded-xl backdrop-blur-md shadow-lg transition-all duration-300 text-base"
            >
              <span>Nous contacter</span>
            </Link>
          </div>

          {/* Phone Quick Bar */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F5B800]/20 flex items-center justify-center text-[#F5B800]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Ligne Directe</div>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-[#F5B800]">
                  {settings.phone}
                </a>
              </div>
            </div>
            <div className="h-6 w-[1px] bg-white/20" />
            <div className="text-slate-300 font-medium hidden sm:block">
              Siège Social & Projets sur toute la Tunisie
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
