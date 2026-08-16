'use client';

import React from 'react';
import Link from 'next/link';
import { TrabafLogo } from '@/components/ui/TrabafLogo';
import { FacebookIcon } from '@/components/ui/FacebookIcon';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { DataService } from '@/lib/data-service';

export function Footer() {
  const settings = DataService.getCompanySettings();

  return (
    <footer className="bg-[#081B38] text-white border-t-4 border-[#F5B800] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <TrabafLogo height={46} width={180} />
            <p className="text-slate-300 text-sm leading-relaxed mt-4">
              {settings.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#F5B800] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#F5B800]" />
              <span>Génie Civil & Construction Spécialisée</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-[#18437E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5B800]"></span>
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-[#F5B800] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-slate-300 hover:text-[#F5B800] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>À propos de TRABAF</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-[#F5B800] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>Nos Services BTP</span>
                </Link>
              </li>
              <li>
                <Link href="/projets" className="text-slate-300 hover:text-[#F5B800] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>Nos Réalisations</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-[#F5B800] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>Contact & Devis</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-[#18437E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5B800]"></span>
              Savoir-Faire
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="hover:text-[#F5B800] transition-colors">Construction de Bâtiments</li>
              <li className="hover:text-[#F5B800] transition-colors">Génie Civil & Structures</li>
              <li className="hover:text-[#F5B800] transition-colors">Travaux Publics & VRD</li>
              <li className="hover:text-[#F5B800] transition-colors">Construction Résidentielle</li>
              <li className="hover:text-[#F5B800] transition-colors">Bâtiments Industriels</li>
              <li className="hover:text-[#F5B800] transition-colors">Études et Ingénierie</li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-[#18437E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5B800]"></span>
              Coordonnées
            </h3>
            <div className="space-y-3.5 text-sm">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-start gap-3 text-slate-300 hover:text-[#F5B800] transition-colors group"
              >
                <div className="p-2 rounded-lg bg-[#18437E]/60 text-[#F5B800] group-hover:bg-[#F5B800] group-hover:text-[#081B38] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Téléphone</div>
                  <div className="font-semibold">{settings.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-3 text-slate-300 hover:text-[#F5B800] transition-colors group"
              >
                <div className="p-2 rounded-lg bg-[#18437E]/60 text-[#F5B800] group-hover:bg-[#F5B800] group-hover:text-[#081B38] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Email</div>
                  <div className="font-medium break-all">{settings.email}</div>
                </div>
              </a>

              <div className="flex items-start gap-3 text-slate-300">
                <div className="p-2 rounded-lg bg-[#18437E]/60 text-[#F5B800]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Siège social</div>
                  <div className="font-medium">{settings.address}, {settings.city}</div>
                </div>
              </div>

              {settings.facebook && (
                <div className="pt-2">
                  <a
                    href={settings.facebook.startsWith('http') ? settings.facebook : `https://${settings.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#18437E] hover:bg-[#F5B800] text-white hover:text-[#081B38] font-semibold text-xs transition-colors shadow"
                  >
                    <FacebookIcon className="w-4 h-4" />
                    <span>Trabaf Construction Tunisie</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#18437E]/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">TRABAF CONSTRUCTION TUNISIE</strong>. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-[#F5B800] transition-colors">
              Mentions Légales
            </Link>
            <Link href="/admin/login" className="hover:text-[#F5B800] transition-colors font-medium">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
