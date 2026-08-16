'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Shield, Target, Lightbulb, Clock } from 'lucide-react';
import { DataService } from '@/lib/data-service';

export function AboutPreview() {
  const settings = DataService.getCompanySettings();

  const values = [
    { title: 'Qualité R rigoureuse', desc: 'Conformité stricte aux normes de construction tunisiennes et internationales.', icon: Shield },
    { title: 'Sécurité Maximale', desc: 'Prévention et sécurité exigeante sur tous nos chantiers.', icon: Target },
    { title: 'Respect des Délais', desc: 'Planification rigoureuse pour une livraison ponctuelle.', icon: Clock },
    { title: 'Innovation Technique', desc: 'Utilisation de méthodes modernes et de matériaux durables.', icon: Lightbulb }
  ];

  return (
    <section className="py-20 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Stack */}
          <div className="relative">
            <div className="relative h-[420px] sm:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/hero_banner.jpg"
                alt="Chantier TRABAF Construction Tunisie"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B38]/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 bg-[#0E2E5C] text-white p-6 rounded-2xl shadow-2xl border-2 border-[#F5B800] max-w-xs">
              <div className="text-3xl font-black text-[#F5B800] mb-1">TRABAF</div>
              <div className="text-sm font-bold uppercase tracking-wider text-slate-200">
                L&apos;Exigence du Génie Civil
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Un partenaire de confiance pour concrétiser vos projets de construction les plus ambitieux.
              </p>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E2E5C]/10 text-[#0E2E5C] font-bold text-xs uppercase tracking-wider">
              <span>Notre Entreprise</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2E5C] leading-tight">
              TRABAF Construction Tunisie : L&apos;Expertise BTP de Référence
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {settings.description} Basée en Tunisie, notre entreprise regroupe des ingénieurs, techniciens et ouvriers qualifiés dédiés à la réussite globale de vos infrastructures.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-200">
                    <div className="p-2 rounded-lg bg-[#0E2E5C] text-[#F5B800] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0E2E5C] text-sm">{v.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Checklist */}
            <div className="space-y-2 pt-2 text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B800]" />
                <span>Études techniques et accompagnement de la conception à la livraison</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B800]" />
                <span>Gestion rigoureuse du budget et des délais contractuels</span>
              </div>
            </div>

            {/* Button CTA */}
            <div className="pt-4">
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 bg-[#0E2E5C] hover:bg-[#18437E] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-sm group"
              >
                <span>En savoir plus sur notre histoire</span>
                <ArrowRight className="w-4 h-4 text-[#F5B800] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
