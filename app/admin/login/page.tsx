'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrabafLogo } from '@/components/ui/TrabafLogo';
import { DataService } from '@/lib/data-service';
import { Lock, AlertCircle, Loader2, ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      // Check secret password
      if (password.trim() === 'trabaf123') {
        DataService.setAdminLoggedIn(true);
        router.push('/admin/dashboard');
      } else {
        setErrorMsg('Mot de passe incorrect.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#081B38] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Accent Shapes */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#F5B800]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#18437E]/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-md w-full bg-[#0E2E5C] border-2 border-[#F5B800]/40 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Logo */}
        <div className="text-center flex flex-col items-center space-y-2">
          <TrabafLogo height={52} width={200} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18437E] text-[#F5B800] text-xs font-extrabold uppercase tracking-widest mt-2 border border-[#F5B800]/30">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Accès Administration</span>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-950/80 border border-rose-500/50 p-3.5 rounded-xl text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Single Password Field */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">
              Mot de passe Admin
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#F5B800] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#081B38] border-2 border-[#18437E] focus:border-[#F5B800] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 w-full bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black py-3.5 px-6 rounded-xl shadow-lg transition-all text-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Vérification...</span>
              </>
            ) : (
              <span>Se Connecter</span>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#18437E] flex justify-between items-center text-xs">
          <Link href="/" className="text-slate-400 hover:text-[#F5B800] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au site public</span>
          </Link>
          <span className="text-slate-500 font-mono text-[10px]">TRABAF Admin v1.0</span>
        </div>
      </div>
    </div>
  );
}
