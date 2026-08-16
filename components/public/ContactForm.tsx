'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations';
import { DataService } from '@/lib/data-service';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // Save message in data service
      DataService.addMessage(data);
      setSubmitted(true);
      reset();
    } catch {
      setErrorMsg("Une erreur est survenue lors de l'envoi de votre message. Veuillez réespayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0E2E5C] border-2 border-[#18437E] p-6 sm:p-8 rounded-2xl shadow-xl text-white">
      <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#F5B800]" />
        Envoyer un Message
      </h3>
      <p className="text-slate-300 text-xs sm:text-sm mb-6">
        Remplissez ce formulaire pour toute demande de devis, d&apos;étude technique ou de renseignement.
      </p>

      {submitted ? (
        <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-xl text-emerald-200 text-center space-y-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h4 className="text-lg font-bold text-white">Message envoyé avec succès !</h4>
          <p className="text-xs text-emerald-300">
            Merci pour votre message. Notre équipe d&apos;ingénierie et commerciale vous recontactera dans les meilleurs délais.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errorMsg && (
            <div className="bg-rose-950/80 border border-rose-500/50 p-3 rounded-lg text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Nom complet */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Nom complet <span className="text-[#F5B800]">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Mohamed Ben Salem"
              {...register('full_name')}
              className="w-full bg-[#081B38] border border-[#18437E] focus:border-[#F5B800] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {errors.full_name && (
              <p className="text-xs text-rose-400 mt-1">{errors.full_name.message}</p>
            )}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Adresse Email <span className="text-[#F5B800]">*</span>
              </label>
              <input
                type="email"
                placeholder="Ex: m.bensalem@gmail.com"
                {...register('email')}
                className="w-full bg-[#081B38] border border-[#18437E] focus:border-[#F5B800] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              {errors.email && (
                <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Téléphone (Optionnel)
              </label>
              <input
                type="tel"
                placeholder="Ex: +216 98 123 456"
                {...register('phone')}
                className="w-full bg-[#081B38] border border-[#18437E] focus:border-[#F5B800] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sujet */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Sujet de la demande <span className="text-[#F5B800]">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Demande de devis construction immeuble"
              {...register('subject')}
              className="w-full bg-[#081B38] border border-[#18437E] focus:border-[#F5B800] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {errors.subject && (
              <p className="text-xs text-rose-400 mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Votre Message / Description du projet <span className="text-[#F5B800]">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Précisez la nature des travaux, la localisation et vos délais..."
              {...register('message')}
              className="w-full bg-[#081B38] border border-[#18437E] focus:border-[#F5B800] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none resize-none"
            />
            {errors.message && (
              <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 w-full bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black py-3.5 px-6 rounded-xl shadow-lg transition-all text-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
