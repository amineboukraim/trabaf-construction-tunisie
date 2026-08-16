import React from 'react';
import { ServicesSection } from '@/components/public/ServicesSection';
import Link from 'next/link';
import { ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { DataService } from '@/lib/data-service';

export const metadata = {
  title: 'Nos Services BTP & Génie Civil | TRABAF Construction Tunisie',
  description: 'Découvrez la gamme complète de services de TRABAF Construction Tunisie : bâtiments, génie civil, voiries, rénovations et ingénierie.'
};

export default function ServicesPage() {
  const settings = DataService.getCompanySettings();

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {/* Header Banner */}
      <section className="py-20 bg-[#0E2E5C] border-b border-[#F5B800]/30 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#18437E] text-[#F5B800] text-xs font-extrabold uppercase tracking-widest">
            Savoir-Faire & Ingénierie
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Nos Services de Construction
          </h1>
          <p className="text-slate-200 text-base max-w-2xl mx-auto">
            Une expertise technique globale adaptée à chaque étape de votre projet de génie civil et de bâtiment en Tunisie.
          </p>
        </div>
      </section>

      {/* Services Grid Component (All active services) */}
      <ServicesSection />

      {/* Process & Guarantee Bar */}
      <section className="py-16 bg-[#0E2E5C] border-t border-[#18437E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl font-bold text-white">Comment Nous Travaillons</h2>
            <p className="text-slate-300 text-xs">Une méthodologie éprouvée pour garantir le succès de vos ouvrages.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-[#081B38] rounded-xl border border-[#18437E] space-y-2">
              <div className="text-2xl font-black text-[#F5B800]">01</div>
              <h3 className="font-bold text-white text-base">Étude & Analyse</h3>
              <p className="text-xs text-slate-300">Analyse du cahier des charges, faisabilité technique et métrés précises.</p>
            </div>
            <div className="p-6 bg-[#081B38] rounded-xl border border-[#18437E] space-y-2">
              <div className="text-2xl font-black text-[#F5B800]">02</div>
              <h3 className="font-bold text-white text-base">Devis & Planification</h3>
              <p className="text-xs text-slate-300">Proposition budgétaire claire et calendrier d&apos;exécution détaillé.</p>
            </div>
            <div className="p-6 bg-[#081B38] rounded-xl border border-[#18437E] space-y-2">
              <div className="text-2xl font-black text-[#F5B800]">03</div>
              <h3 className="font-bold text-white text-base">Exécution Chantier</h3>
              <p className="text-xs text-slate-300">Conduite des travaux par nos ingénieurs dans le respect des normes.</p>
            </div>
            <div className="p-6 bg-[#081B38] rounded-xl border border-[#18437E] space-y-2">
              <div className="text-2xl font-black text-[#F5B800]">04</div>
              <h3 className="font-bold text-white text-base">Livraison & Garanties</h3>
              <p className="text-xs text-slate-300">Réception des ouvrages et garanties de livraison parfaites.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <span>Demander un devis personnalisé</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
