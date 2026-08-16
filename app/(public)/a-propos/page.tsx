import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DataService } from '@/lib/data-service';
import { Shield, Target, Compass, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'À Propos de TRABAF Construction Tunisie | Expertise & Valeurs',
  description: 'Découvrez l\'histoire, les valeurs, la mission et l\'engagement qualité de TRABAF Construction Tunisie.'
};

export default function AboutPage() {
  const settings = DataService.getCompanySettings();

  const values = [
    {
      title: 'Qualité & Conformité',
      desc: 'Respect rigoureux des spécifications techniques et des normes de sécurité pour chaque ouvrage.',
      icon: Shield
    },
    {
      title: 'Sécurité du Personnel',
      desc: 'Prévention stricte sur les chantiers et zéro compromis avec la sécurité des équipes.',
      icon: Target
    },
    {
      title: 'Respect des Engagements',
      desc: 'Gestion optimale du planning pour garantir la livraison de vos bâtiments dans les temps.',
      icon: Award
    },
    {
      title: 'Innovation & Technique',
      desc: 'Mise en œuvre des meilleures technologies de construction et de gestion de chantier.',
      icon: Compass
    }
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Page Header Banner */}
      <section className="relative py-20 bg-[#0E2E5C] border-b border-[#F5B800]/30 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero_banner.jpg"
            alt="Chantier TRABAF"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#18437E] text-[#F5B800] text-xs font-extrabold uppercase tracking-widest">
            Présentation Institutionnelle
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            À Propos de TRABAF Construction
          </h1>
          <p className="text-slate-200 text-base max-w-2xl mx-auto">
            Une entreprise tunisienne majeure portée par l&apos;exigence, le professionnalisme et la passion du génie civil.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F5B800]" />
              Notre Entreprise
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {settings.description}
            </p>
            <p className="text-slate-300 text-base leading-relaxed">
              Forte d&apos;une solide expérience sur le marché tunisien, TRABAF Construction s&apos;est imposée comme un partenaire stratégique pour la réalisation de projets complexes dans les secteurs du bâtiment, des travaux publics et du génie civil.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0E2E5C] border border-[#18437E]">
                <div className="text-2xl font-black text-[#F5B800]">+25</div>
                <div className="text-xs text-slate-300 font-bold uppercase mt-1">Projets Livrés</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0E2E5C] border border-[#18437E]">
                <div className="text-2xl font-black text-[#F5B800]">100%</div>
                <div className="text-xs text-slate-300 font-bold uppercase mt-1">Sérieux & Fiabilité</div>
              </div>
            </div>
          </div>

          <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#18437E]">
            <Image
              src="/images/hero_bg.png"
              alt="TRABAF Bâtiment"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0E2E5C] border border-[#18437E] p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5B800] text-[#081B38] flex items-center justify-center font-black text-xl">
              01
            </div>
            <h3 className="text-2xl font-bold text-white">Notre Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Offrir des prestations de construction clés en main avec des standards de qualité élevés, en intégrant les contraintes budgétaires et environnementales de nos clients.
            </p>
          </div>

          <div className="bg-[#0E2E5C] border border-[#18437E] p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5B800] text-[#081B38] flex items-center justify-center font-black text-xl">
              02
            </div>
            <h3 className="text-2xl font-bold text-white">Notre Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Devenir l&apos;un des leaders incontournables du génie civil et du bâtiment en Tunisie en développant continuellement nos compétences et notre matériel de pointe.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white">Nos Valeurs Fondamentales</h2>
            <p className="text-slate-300 text-sm mt-2">
              Chaque chantier TRABAF est fondé sur des principes éthiques et professionnels inébranlables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-[#0E2E5C] p-6 rounded-2xl border border-[#18437E] space-y-3">
                  <div className="p-3 rounded-xl bg-[#18437E] text-[#F5B800] w-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-base">{v.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-[#0E2E5C] to-[#18437E] p-8 rounded-2xl border-2 border-[#F5B800]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Prêt à collaborer avec TRABAF ?</h3>
            <p className="text-slate-300 text-xs mt-1">Discutons de vos besoins de construction ou d&apos;ingénierie dès aujourd&apos;hui.</p>
          </div>
          <Link
            href="/contact"
            className="bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-6 py-3 rounded-xl text-sm transition-transform hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <span>Prendre contact</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
