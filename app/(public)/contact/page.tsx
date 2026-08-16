import React from 'react';
import { ContactForm } from '@/components/public/ContactForm';
import { MapView } from '@/components/ui/MapView';
import { DataService } from '@/lib/data-service';
import { FacebookIcon } from '@/components/ui/FacebookIcon';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact & Devis | TRABAF Construction Tunisie',
  description: 'Contactez TRABAF Construction Tunisie par téléphone, email, WhatsApp ou via notre formulaire de devis.'
};

export default function ContactPage() {
  const settings = DataService.getCompanySettings();

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {/* Header Banner */}
      <section className="py-16 bg-[#0E2E5C] border-b border-[#F5B800]/30 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#18437E] text-[#F5B800] text-xs font-extrabold uppercase tracking-widest">
            Contact & Devis
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Contactez TRABAF Construction
          </h1>
          <p className="text-slate-200 text-base max-w-2xl mx-auto">
            Notre équipe d&apos;ingénieurs et de conseillers est à votre écoute pour étudier tous vos projets de génie civil et de bâtiment.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 5 Cols: Contact Details & Quick Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-[#0E2E5C] border-2 border-[#18437E] p-6 rounded-2xl shadow-xl space-y-6">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800]" />
                Coordonnées Directes
              </h2>

              <div className="space-y-4">
                {/* Téléphone */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#081B38] border border-[#18437E]">
                  <div className="p-3 rounded-lg bg-[#F5B800] text-[#081B38] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs text-slate-400 font-bold uppercase">Téléphone</div>
                    <div className="text-lg font-black text-white">{settings.phone}</div>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="inline-block mt-1 text-xs text-[#F5B800] font-bold hover:underline"
                    >
                      Appeler immédiatement →
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#081B38] border border-[#18437E]">
                  <div className="p-3 rounded-lg bg-[#18437E] text-[#F5B800] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs text-slate-400 font-bold uppercase">Email Officiel</div>
                    <div className="text-sm font-bold text-white break-all">{settings.email}</div>
                    <a
                      href={`mailto:${settings.email}`}
                      className="inline-block mt-1 text-xs text-[#F5B800] font-bold hover:underline"
                    >
                      Envoyer un mail →
                    </a>
                  </div>
                </div>

                {/* WhatsApp Direct */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#081B38] border border-emerald-500/40">
                  <div className="p-3 rounded-lg bg-emerald-600 text-white shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs text-slate-400 font-bold uppercase">WhatsApp Instantané</div>
                    <div className="text-sm font-bold text-white">{settings.phone}</div>
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-xs text-emerald-400 font-bold hover:underline"
                    >
                      Ouvrir la discussion WhatsApp →
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                {settings.facebook && (
                  <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#081B38] border border-[#18437E]">
                    <div className="p-3 rounded-lg bg-[#18437E] text-[#F5B800] shrink-0">
                      <FacebookIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-xs text-slate-400 font-bold uppercase">Page Facebook</div>
                      <div className="text-sm font-bold text-white">Trabaf construction Tunisie</div>
                      <a
                        href={settings.facebook.startsWith('http') ? settings.facebook : `https://${settings.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-1 text-xs text-[#F5B800] font-bold hover:underline"
                      >
                        Visiter notre page Facebook →
                      </a>
                    </div>
                  </div>
                )}

                {/* Horaires & Siège */}
                <div className="pt-2 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F5B800]" />
                    <span>{settings.address}, {settings.city}, {settings.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F5B800]" />
                    <span>{settings.working_hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="bg-[#0E2E5C] border border-[#18437E] p-4 rounded-2xl shadow-xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F5B800]" />
                Localisation du Siège Social
              </h3>
              <MapView
                lat={settings.lat}
                lng={settings.lng}
                title="Siège TRABAF Construction"
                locationName={`${settings.address}, ${settings.city}`}
                height="260px"
              />
            </div>
          </div>

          {/* Right 7 Cols: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
