'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, ShieldCheck, HardHat, Building2, Waves, Sparkles } from 'lucide-react';
import { DataService } from '@/lib/data-service';
import { getImagePath } from '@/lib/image-path';

export function Hero() {
  const settings = DataService.getCompanySettings();

  return (
    <section className="bg-[#081B38] overflow-hidden text-white">

      {/* ===== AFFICHE PRINCIPALE TRABAF (CONSTRUCTION & PISCINES) ===== */}
      <div className="w-full bg-[#081B38]">
        <Image
          src={getImagePath('/images/piscines_banner.png')}
          alt="TRABAF Construction & Piscines sur Mesure — Affiche Officielle"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto block max-h-[85vh] object-contain mx-auto"
        />
      </div>

      {/* ===== LOGO + SLOGAN SPECIAL PISCINES & BTP ===== */}
      <div className="bg-[#081B38] py-8 px-4 sm:px-6 lg:px-8 text-center border-b border-[#F5B800]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Logo officiel */}
          <div className="shrink-0 bg-white p-3 rounded-2xl shadow-xl">
            <Image
              src={getImagePath('/images/logo.png')}
              alt="TRABAF Construction Logo Officiel"
              width={200}
              height={200}
              className="object-contain max-h-24 w-auto"
            />
          </div>
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18437E] text-[#F5B800] text-xs font-bold uppercase tracking-wider mb-2 border border-[#F5B800]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Construction & Piscines Sur Mesure en Tunisie</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              TRABAF:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B800] via-[#FFD700] to-yellow-200">
                Bâtir Vos Rêves.
              </span>
            </h1>
            <p className="mt-3 text-slate-300 text-base max-w-3xl">
              {settings.description}
            </p>
          </div>
        </div>
      </div>

      {/* ===== PILIERS + CTA ===== */}
      <div className="bg-[#0A1F40] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Feature Pillars Grid (4 Pillars) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center gap-3 bg-[#0E2E5C] border border-[#F5B800]/30 p-4 rounded-xl">
              <Waves className="w-6 h-6 text-[#F5B800] shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">Piscines Béton & Liner</div>
                <div className="text-slate-400 text-xs">Conception & pose sur-mesure</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0E2E5C] border border-[#F5B800]/30 p-4 rounded-xl">
              <Building2 className="w-6 h-6 text-[#F5B800] shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">Génie Civil & Bâtiments</div>
                <div className="text-slate-400 text-xs">Logements clés en main</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0E2E5C] border border-[#F5B800]/30 p-4 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-[#F5B800] shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">Rigueur & Qualité</div>
                <div className="text-slate-400 text-xs">Normes tunisiennes & ISO</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0E2E5C] border border-[#F5B800]/30 p-4 rounded-xl">
              <HardHat className="w-6 h-6 text-[#F5B800] shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">Respect des Délais</div>
                <div className="text-slate-400 text-xs">Livraison ponctuelle garantie</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/projets"
              className="inline-flex items-center justify-center gap-3 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-base group w-full sm:w-auto"
            >
              <span>Découvrir nos réalisations</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-[#18437E] hover:bg-slate-800 text-white border-2 border-[#F5B800]/40 font-bold px-10 py-4 rounded-xl backdrop-blur-md shadow-lg transition-all duration-300 text-base w-full sm:w-auto"
            >
              <span>Nos services piscines & BTP</span>
            </Link>
          </div>

          {/* Phone Bar */}
          <div className="flex items-center justify-center gap-4 text-sm text-slate-300 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#F5B800]/20 flex items-center justify-center text-[#F5B800]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Ligne Directe Devis</div>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-[#F5B800] text-base">
                  {settings.phone}
                </a>
              </div>
            </div>
            <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />
            <div className="text-slate-300 font-medium hidden sm:block">
              Siège Social & Chantiers dans toute la Tunisie
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
