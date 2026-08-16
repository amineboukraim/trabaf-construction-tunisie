'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DataService } from '@/lib/data-service';
import { Service } from '@/types';
import {
  Building2,
  HardHat,
  Truck,
  Home,
  Factory,
  Wrench,
  Paintbrush,
  Compass,
  ArrowRight,
  CheckCircle,
  X,
  Waves
} from 'lucide-react';

const iconMap: Record<string, React.ReactComponentElement<any>> = {
  Waves: <Waves className="w-7 h-7" />,
  Building2: <Building2 className="w-7 h-7" />,
  HardHat: <HardHat className="w-7 h-7" />,
  Truck: <Truck className="w-7 h-7" />,
  Home: <Home className="w-7 h-7" />,
  Factory: <Factory className="w-7 h-7" />,
  Wrench: <Wrench className="w-7 h-7" />,
  Paintbrush: <Paintbrush className="w-7 h-7" />,
  Compass: <Compass className="w-7 h-7" />
};

export function ServicesSection({ limit }: { limit?: number }) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const allServices = DataService.getServices(true);
  const services = limit ? allServices.slice(0, limit) : allServices;

  return (
    <section className="py-20 bg-[#081B38] text-white relative overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F5B800_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18437E] text-[#F5B800] font-bold text-xs uppercase tracking-wider border border-[#F5B800]/30">
            <span>Nos Domaines d&apos;Intervention</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Services Construction & Piscines Sur-Mesure
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            TRABAF Construction couvre la réalisation de piscines sur mesure (béton & liner), la construction de bâtiments et le génie civil avec une exigence d&apos;exécution exemplaire.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon_name] || <Building2 className="w-7 h-7" />;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative bg-[#0E2E5C] border border-[#18437E] hover:border-[#F5B800] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 shadow-xl cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="w-14 h-14 rounded-xl bg-[#18437E] text-[#F5B800] flex items-center justify-center mb-6 group-hover:bg-[#F5B800] group-hover:text-[#081B38] transition-colors shadow-md">
                    {Icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F5B800] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="flex items-center text-xs font-bold text-[#F5B800] group-hover:underline gap-1.5 pt-4 border-t border-[#18437E]/60">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button if limited */}
        {limit && (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-8 py-3.5 rounded-xl shadow-lg transition-all text-base"
            >
              <span>Découvrir tous nos services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0E2E5C] border-2 border-[#F5B800] rounded-2xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#18437E]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[#F5B800] text-[#081B38]">
                {iconMap[selectedService.icon_name] || <Building2 className="w-7 h-7" />}
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <div className="space-y-2 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#F5B800]" />
                <span>Normes de sécurité et conformité réglementaire</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#F5B800]" />
                <span>Matériaux haute qualité et suivi d&apos;ingénierie</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#18437E]">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white font-medium text-xs hover:bg-slate-600"
              >
                Fermer
              </button>
              <Link
                href="/contact"
                className="px-5 py-2 rounded-lg bg-[#F5B800] text-[#081B38] font-bold text-xs hover:bg-[#D9A300]"
              >
                Demander un devis pour ce service
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
