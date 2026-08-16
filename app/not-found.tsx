import React from 'react';
import Link from 'next/link';
import { TrabafLogo } from '@/components/ui/TrabafLogo';
import { Home, ArrowLeft, HardHat } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#081B38] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-[#0E2E5C] border-2 border-[#F5B800] p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-center">
          <TrabafLogo height={50} width={200} />
        </div>

        <div className="p-4 rounded-full bg-[#18437E] w-16 h-16 mx-auto flex items-center justify-center text-[#F5B800]">
          <HardHat className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black text-[#F5B800]">404</span>
          <h1 className="text-2xl font-bold text-white">Cette page n&apos;existe pas</h1>
          <p className="text-xs text-slate-300">
            La page que vous recherchez a été déplacée ou n&apos;existe plus sur le site TRABAF Construction Tunisie.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black py-3 px-6 rounded-xl shadow text-sm transition-transform hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#18437E] hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Page de contact</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
