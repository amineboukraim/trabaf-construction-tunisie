import React from 'react';
import { FeaturedProjects } from '@/components/public/FeaturedProjects';

export const metadata = {
  title: 'Nos Réalisations & Portfolio | TRABAF Construction Tunisie',
  description: 'Consultez les réalisations de TRABAF Construction Tunisie : bâtiments administratifs, génie civil, résidences et entrepôts.'
};

export default function ProjectsPage() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {/* Header Banner */}
      <section className="py-20 bg-[#0E2E5C] border-b border-[#F5B800]/30 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#18437E] text-[#F5B800] text-xs font-extrabold uppercase tracking-widest">
            Portfolio Projets
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Nos Réalisations & Projets
          </h1>
          <p className="text-slate-200 text-base max-w-2xl mx-auto">
            Découvrez nos chantiers et réalisations de génie civil, bâtiments et travaux publics exécutés sur toute la Tunisie.
          </p>
        </div>
      </section>

      {/* Projects Grid Component with Filters */}
      <FeaturedProjects showFilters={true} />
    </div>
  );
}
