import React from 'react';
import { Hero } from '@/components/public/Hero';
import { KeyStats } from '@/components/public/KeyStats';
import { AboutPreview } from '@/components/public/AboutPreview';
import { ServicesSection } from '@/components/public/ServicesSection';
import { FeaturedProjects } from '@/components/public/FeaturedProjects';
import Link from 'next/link';
import { ArrowRight, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { DataService } from '@/lib/data-service';

export const metadata = {
  title: 'TRABAF CONSTRUCTION TUNISIE | Génie Civil, BTP & Bâtiment',
  description: 'Entreprise générale de construction et de génie civil en Tunisie. Conception, bâtiment, travaux publics, rénovation et ingénierie BTP.'
};

export default function HomePage() {
  const settings = DataService.getCompanySettings();

  return (
    <>
      {/* Hero Banner */}
      <Hero />

      {/* Key Stats Counter Section */}
      <KeyStats />

      {/* About Company Section */}
      <AboutPreview />

      {/* Core Services Overview (Limit to 4 on home) */}
      <ServicesSection limit={4} />

      {/* Featured Projects Grid */}
      <FeaturedProjects limit={3} showFilters={false} />

      {/* Call to Action Banner */}
      <section className="py-16 bg-[#0E2E5C] text-white border-y-4 border-[#F5B800] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#18437E] text-[#F5B800] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#F5B800]" />
            <span>Votre Projet Entre De Bonnes Mains</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl mx-auto">
            Prêt à Concrétiser Votre Projet de Construction ?
          </h2>

          <p className="text-slate-200 text-base max-w-2xl mx-auto">
            Contactez les ingénieurs et experts de TRABAF Construction Tunisie pour une étude personnalisée et un devis gratuit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-3 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-8 py-4 rounded-xl shadow-xl transition-transform hover:scale-105 text-base"
            >
              <Phone className="w-5 h-5" />
              <span>Appeler le {settings.phone}</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#18437E] hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl border border-[#F5B800]/40 transition-colors text-base"
            >
              <MessageSquare className="w-5 h-5 text-[#F5B800]" />
              <span>Demander une étude gratuite</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
