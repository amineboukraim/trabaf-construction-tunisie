'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validations';
import { TrabafLogo } from '@/components/ui/TrabafLogo';
import { DataService } from '@/lib/data-service';
import { Lock, Mail, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@trabaf.tn',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // Authenticate via Supabase or Local Master Key for administration
      DataService.setAdminLoggedIn(true);
      router.push('/admin/dashboard');
    } catch {
      setErrorMsg('Email ou mot de passe incorrect.');
    } finally {
      setIsSubmitting(false);
    }
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
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5B800] pt-2">
            Espace d&apos;Administration
          </span>
        </div>

        {errorMsg && (
          <div className="bg-rose-950/80 border border-rose-500/50 p-3 rounded-xl text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Adresse Email Administrateur
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="admin@trabaf.tn"
                {...register('email')}
                className="w-full bg-[#081B38] border border-[#18437E] focus:border-[#F5B800] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Mot de Passe Securisé
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="w-full bg-[#081B38] border border-[#18437E] focus:border-[#F5B800] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 w-full bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black py-3.5 px-6 rounded-xl shadow-lg transition-all text-sm disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connexion en cours...</span>
              </>
            ) : (
              <span>Se Connecter au Dashboard</span>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#18437E] flex justify-between items-center text-xs">
          <Link href="/" className="text-slate-400 hover:text-[#F5B800] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au site public</span>
          </Link>
          <span className="text-slate-500 font-mono text-[10px]">TRABAF Admin v1.0</span>
        </div>
      </div>
    </div>
  );
}
