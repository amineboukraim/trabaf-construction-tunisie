'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrabafLogo } from '@/components/ui/TrabafLogo';
import { Menu, X, Phone, Mail, FileText, ChevronRight } from 'lucide-react';
import { DataService } from '@/lib/data-service';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(DataService.getCompanySettings());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Services', href: '/services' },
    { name: 'Réalisations', href: '/projets' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-[#081B38] text-slate-300 text-xs py-2 px-4 border-b border-[#18437E]/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-[#F5B800] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>{settings.phone}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-[#F5B800] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>{settings.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Génie Civil • BTP • Construction en Tunisie</span>
            <Link href="/admin/login" className="text-slate-400 hover:text-[#F5B800] transition-colors pl-2 border-l border-slate-700">
              Espace Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0E2E5C]/95 backdrop-blur-md shadow-xl py-3 border-b border-[#F5B800]/20'
            : 'bg-[#0E2E5C] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <TrabafLogo height={44} width={180} />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-[#F5B800] bg-[#18437E]/60 shadow-inner border-b-2 border-[#F5B800]'
                      : 'text-white hover:text-[#F5B800] hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Demander un devis</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:text-[#F5B800] hover:bg-white/10 transition-colors"
            aria-label="Menu Mobile"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#081B38] border-b border-[#F5B800]/20 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium ${
                      active
                        ? 'text-[#F5B800] bg-[#18437E] font-bold border-l-4 border-[#F5B800]'
                        : 'text-slate-200 hover:text-[#F5B800] hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-slate-800 text-white font-medium text-sm hover:bg-slate-700"
              >
                <Phone className="w-4 h-4 text-[#F5B800]" />
                <span>Appeler {settings.phone}</span>
              </a>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-[#F5B800] text-[#081B38] font-bold text-sm shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Demander un devis gratuit</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
