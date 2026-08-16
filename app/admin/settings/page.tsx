'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/lib/data-service';
import { CompanySettings, KeyStat } from '@/types';
import { FacebookIcon } from '@/components/ui/FacebookIcon';
import {
  Settings,
  Save,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Building,
  CheckCircle2,
  Award
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<CompanySettings>(DataService.getCompanySettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(DataService.getCompanySettings());
  }, []);

  const handleChange = (field: keyof CompanySettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (id: string, field: keyof KeyStat, value: any) => {
    setSettings((prev) => ({
      ...prev,
      stats: prev.stats.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    DataService.updateCompanySettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 text-white max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E2E5C] p-6 rounded-2xl border border-[#18437E] shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#F5B800]" />
            Paramètres Généraux de l&apos;Entreprise
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Modifiez en temps réel les coordonnées, numéros, adresses et statistiques affichées sur tout le site.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Modifications enregistrées !</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Identité & Contacts */}
        <div className="bg-[#0E2E5C] border border-[#18437E] p-6 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white pb-3 border-b border-[#18437E] flex items-center gap-2">
            <Building className="w-5 h-5 text-[#F5B800]" />
            Identité & Contacts Officiels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Raison Sociale</label>
              <input
                type="text"
                value={settings.company_name}
                onChange={(e) => handleChange('company_name', e.target.value)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Téléphone Officiel</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Adresse Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Numéro WhatsApp</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Page Facebook</label>
              <input
                type="text"
                value={settings.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Horaires d&apos;Ouverture</label>
              <input
                type="text"
                value={settings.working_hours}
                onChange={(e) => handleChange('working_hours', e.target.value)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Adresse Siège</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Ville</label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Latitude Siège</label>
              <input
                type="number"
                step="any"
                value={settings.lat}
                onChange={(e) => handleChange('lat', parseFloat(e.target.value) || 36.8065)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Longitude Siège</label>
              <input
                type="number"
                step="any"
                value={settings.lng}
                onChange={(e) => handleChange('lng', parseFloat(e.target.value) || 10.1815)}
                className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Text Slogans */}
        <div className="bg-[#0E2E5C] border border-[#18437E] p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white pb-2 border-b border-[#18437E]">
            Slogan & Textes de Présentation
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Slogan Principal</label>
            <input
              type="text"
              value={settings.slogan}
              onChange={(e) => handleChange('slogan', e.target.value)}
              className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Description Globale</label>
            <textarea
              rows={3}
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white resize-none"
            />
          </div>
        </div>

        {/* Key Statistics Editor */}
        <div className="bg-[#0E2E5C] border border-[#18437E] p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white pb-2 border-b border-[#18437E] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F5B800]" />
            Compteurs Statistiques (Page d&apos;Accueil)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settings.stats.map((st) => (
              <div key={st.id} className="bg-[#081B38] p-4 rounded-xl border border-[#18437E] space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10px] text-slate-400 font-bold">Libellé</label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => handleStatChange(st.id, 'label', e.target.value)}
                      className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold">Valeur</label>
                    <input
                      type="number"
                      value={st.value}
                      onChange={(e) => handleStatChange(st.id, 'value', parseInt(e.target.value) || 0)}
                      className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400">Préfixe (Ex: +)</label>
                    <input
                      type="text"
                      value={st.prefix || ''}
                      onChange={(e) => handleStatChange(st.id, 'prefix', e.target.value)}
                      className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">Suffixe (Ex: % ou ans)</label>
                    <input
                      type="text"
                      value={st.suffix || ''}
                      onChange={(e) => handleStatChange(st.id, 'suffix', e.target.value)}
                      className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-8 py-3.5 rounded-xl shadow-xl text-sm transition-transform hover:scale-105"
          >
            <Save className="w-5 h-5" />
            <span>Enregistrer Tous Les Paramètres</span>
          </button>
        </div>
      </form>
    </div>
  );
}
