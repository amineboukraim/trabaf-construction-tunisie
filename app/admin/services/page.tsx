'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/lib/data-service';
import { Service } from '@/types';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  Building2,
  HardHat,
  Truck,
  Home,
  Factory,
  Paintbrush,
  Compass,
  AlertTriangle
} from 'lucide-react';

const availableIcons = [
  { name: 'Building2', label: 'Bâtiment', icon: Building2 },
  { name: 'HardHat', label: 'Génie Civil', icon: HardHat },
  { name: 'Truck', label: 'Travaux Publics / VRD', icon: Truck },
  { name: 'Home', label: 'Résidentiel', icon: Home },
  { name: 'Factory', label: 'Industriel / Hangars', icon: Factory },
  { name: 'Wrench', label: 'Rénovation / Travaux', icon: Wrench },
  { name: 'Paintbrush', label: 'Aménagement & Finitions', icon: Paintbrush },
  { name: 'Compass', label: 'Ingénierie & Études', icon: Compass }
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Building2');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);

  const loadServices = () => {
    setServices(DataService.getServices());
  };

  useEffect(() => {
    loadServices();
    window.addEventListener('trabaf_storage_updated', loadServices);
    return () => window.removeEventListener('trabaf_storage_updated', loadServices);
  }, []);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setTitle(service.title);
      setDescription(service.description);
      setIconName(service.icon_name);
      setDisplayOrder(service.display_order);
      setIsActive(service.is_active);
    } else {
      setEditingService(null);
      setTitle('');
      setDescription('');
      setIconName('Building2');
      setDisplayOrder(services.length + 1);
      setIsActive(true);
    }
    setIsModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    DataService.saveService({
      id: editingService?.id,
      title,
      description,
      icon_name: iconName,
      display_order: displayOrder,
      is_active: isActive
    });

    setIsModalOpen(false);
    loadServices();
  };

  const handleDeleteService = (id: string) => {
    DataService.deleteService(id);
    setConfirmDeleteId(null);
    loadServices();
  };

  const toggleActive = (service: Service) => {
    DataService.saveService({ ...service, is_active: !service.is_active });
    loadServices();
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E2E5C] p-6 rounded-2xl border border-[#18437E] shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#F5B800]" />
            Gestion des Services BTP
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Gérez les métiers et expertises de construction affichés sur le site.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-5 py-3 rounded-xl shadow transition-transform hover:scale-105 text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Ajouter un Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-[#0E2E5C] border border-[#18437E] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-[#081B38] text-slate-400 uppercase font-bold border-b border-[#18437E]">
              <tr>
                <th className="p-4 w-12 text-center">Ordre</th>
                <th className="p-4">Icône & Service</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Statut</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18437E]">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Aucun service configuré.
                  </td>
                </tr>
              ) : (
                services.map((s) => {
                  const iconObj = availableIcons.find((i) => i.name === s.icon_name);
                  const IconComp = iconObj ? iconObj.icon : Building2;
                  return (
                    <tr key={s.id} className="hover:bg-[#18437E]/40 transition-colors">
                      <td className="p-4 text-center font-bold text-[#F5B800]">{s.display_order}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[#18437E] text-[#F5B800]">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{s.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{s.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-slate-300 line-clamp-2 max-w-md">{s.description}</p>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleActive(s)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                            s.is_active ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {s.is_active ? 'Actif' : 'Inactif'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(s)}
                            className="p-2 rounded-lg bg-blue-900/60 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(s.id)}
                            className="p-2 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E2E5C] border-2 border-rose-500 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Confirmer la suppression</h3>
            <p className="text-xs text-slate-300">
              Voulez-vous vraiment supprimer ce service BTP ?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white font-medium text-xs hover:bg-slate-600"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteService(confirmDeleteId)}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E2E5C] border-2 border-[#F5B800] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#18437E]"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F5B800]" />
              {editingService ? 'Modifier le Service' : 'Nouveau Service BTP'}
            </h2>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Titre du Service *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Construction de Bâtiments"
                  className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B800]"
                />
              </div>

              {/* Icon Picker Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">Choisir une Icône *</label>
                <div className="grid grid-cols-4 gap-2">
                  {availableIcons.map((i) => {
                    const IconC = i.icon;
                    const isSelected = iconName === i.name;
                    return (
                      <button
                        key={i.name}
                        type="button"
                        onClick={() => setIconName(i.name)}
                        className={`flex flex-col items-center p-2.5 rounded-xl border text-[10px] transition-all ${
                          isSelected
                            ? 'bg-[#F5B800] text-[#081B38] border-[#F5B800] font-bold shadow'
                            : 'bg-[#081B38] border-[#18437E] text-slate-300 hover:border-[#F5B800]'
                        }`}
                      >
                        <IconC className="w-5 h-5 mb-1" />
                        <span className="truncate w-full text-center">{i.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Description Détaillée *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Expliquez ce que propose TRABAF pour ce domaine d'activité..."
                  className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B800] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">Ordre d&apos;affichage</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 accent-[#F5B800]"
                    />
                    <span>Service Actif sur le site</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#18437E]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-white font-medium text-xs hover:bg-slate-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#F5B800] text-[#081B38] font-black text-xs hover:bg-[#D9A300]"
                >
                  Enregistrer le Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
