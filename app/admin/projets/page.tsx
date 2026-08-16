'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DataService } from '@/lib/data-service';
import { Project, ProjectCategory, ProjectStatus } from '@/types';
import {
  Building,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Star,
  CheckCircle,
  X,
  MapPin,
  Upload,
  Search,
  Check,
  AlertTriangle
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Bâtiments');
  const [client, setClient] = useState('');
  const [locationName, setLocationName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Tunisie');
  const [lat, setLat] = useState<number>(36.8065);
  const [lng, setLng] = useState<number>(10.1815);
  const [year, setYear] = useState('2026');
  const [duration, setDuration] = useState('');
  const [surfaceArea, setSurfaceArea] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('En cours');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [mainImageUrl, setMainImageUrl] = useState('/images/hero_bg.png');
  const [galleryUrls, setGalleryUrls] = useState<string[]>(['/images/hero_bg.png']);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // Preset image asset options
  const imagePresets = [
    '/images/hero_bg.png',
    '/images/hero_banner.jpg',
    '/images/residential.png',
    '/images/industrial.png',
    '/images/logo.png'
  ];

  const loadProjects = () => {
    setProjects(DataService.getProjects());
  };

  useEffect(() => {
    loadProjects();
    window.addEventListener('trabaf_storage_updated', loadProjects);
    return () => window.removeEventListener('trabaf_storage_updated', loadProjects);
  }, []);

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setTitle(project.title);
      setCategory(project.category);
      setClient(project.client || '');
      setLocationName(project.location_name);
      setCity(project.city);
      setCountry(project.country || 'Tunisie');
      setLat(project.lat);
      setLng(project.lng);
      setYear(project.year);
      setDuration(project.duration || '');
      setSurfaceArea(project.surface_area || '');
      setStatus(project.status);
      setShortDesc(project.short_desc);
      setFullDesc(project.full_desc);
      setMainImageUrl(project.main_image_url);
      setGalleryUrls(project.gallery_urls || [project.main_image_url]);
      setIsFeatured(project.is_featured);
      setIsPublished(project.is_published);
    } else {
      setEditingProject(null);
      setTitle('');
      setCategory('Bâtiments');
      setClient('');
      setLocationName('Les Berges du Lac');
      setCity('Tunis');
      setCountry('Tunisie');
      setLat(36.8065);
      setLng(10.1815);
      setYear(new Date().getFullYear().toString());
      setDuration('12 mois');
      setSurfaceArea('3 000 m²');
      setStatus('En cours');
      setShortDesc('');
      setFullDesc('');
      setMainImageUrl('/images/hero_bg.png');
      setGalleryUrls(['/images/hero_bg.png', '/images/hero_banner.jpg']);
      setIsFeatured(false);
      setIsPublished(true);
    }
    setIsModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !shortDesc || !fullDesc) return;

    DataService.saveProject({
      id: editingProject?.id,
      title,
      category,
      client,
      location_name: locationName,
      city,
      country,
      lat,
      lng,
      year,
      duration,
      surface_area: surfaceArea,
      status,
      short_desc: shortDesc,
      full_desc: fullDesc,
      main_image_url: mainImageUrl,
      gallery_urls: galleryUrls,
      is_featured: isFeatured,
      is_published: isPublished
    });

    setIsModalOpen(false);
    loadProjects();
  };

  const handleDeleteProject = (id: string) => {
    DataService.deleteProject(id);
    setConfirmDeleteId(null);
    loadProjects();
  };

  const toggleFeatured = (project: Project) => {
    DataService.saveProject({ ...project, is_featured: !project.is_featured });
    loadProjects();
  };

  const togglePublished = (project: Project) => {
    DataService.saveProject({ ...project, is_published: !project.is_published });
    loadProjects();
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E2E5C] p-6 rounded-2xl border border-[#18437E] shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Building className="w-6 h-6 text-[#F5B800]" />
            Gestion du Portfolio Projets
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Ajoutez, modifiez, organisez les photos et les emplacements de vos réalisations.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black px-5 py-3 rounded-xl shadow transition-transform hover:scale-105 text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Ajouter un Projet</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Rechercher par titre, ville, catégorie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F5B800]"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-[#0E2E5C] border border-[#18437E] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-[#081B38] text-slate-400 uppercase font-bold border-b border-[#18437E]">
              <tr>
                <th className="p-4">Vignette</th>
                <th className="p-4">Projet & Catégorie</th>
                <th className="p-4">Localisation & Année</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-center">En Avant</th>
                <th className="p-4 text-center">Publié</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18437E]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Aucun projet correspondant trouvé.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-[#18437E]/40 transition-colors">
                    <td className="p-4">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                        <Image
                          src={p.main_image_url || '/images/hero_bg.png'}
                          alt={p.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm line-clamp-1">{p.title}</div>
                      <div className="text-[11px] text-[#F5B800]">{p.category}</div>
                    </td>
                    <td className="p-4">
                      <div>{p.location_name}, {p.city}</div>
                      <div className="text-slate-400 text-[11px]">{p.year}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          p.status === 'Terminé'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : p.status === 'En cours'
                            ? 'bg-[#F5B800]/20 text-[#F5B800]'
                            : 'bg-blue-950 text-blue-300'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleFeatured(p)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          p.is_featured ? 'text-[#F5B800] bg-[#18437E]' : 'text-slate-500 hover:text-white'
                        }`}
                        title="Afficher sur l'accueil"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => togglePublished(p)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.is_published ? 'bg-emerald-600/30 text-emerald-300' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {p.is_published ? 'Oui' : 'Masqué'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projets/${p.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-[#18437E] hover:bg-[#F5B800] hover:text-[#081B38] transition-colors"
                          title="Prévisualiser"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleOpenModal(p)}
                          className="p-2 rounded-lg bg-blue-900/60 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setConfirmDeleteId(p.id)}
                          className="p-2 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E2E5C] border-2 border-rose-500 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Confirmer la suppression</h3>
            <p className="text-xs text-slate-300">
              Voulez-vous vraiment supprimer ce projet ? Cette action est définitive.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white font-medium text-xs hover:bg-slate-600"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteProject(confirmDeleteId)}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E2E5C] border-2 border-[#F5B800] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#18437E]"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F5B800]" />
              {editingProject ? 'Modifier le Projet' : 'Nouveau Projet Portfolio'}
            </h2>

            <form onSubmit={handleSaveProject} className="space-y-5">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Titre du Projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Construction Complexe Administratif"
                    className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">Catégorie *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B800]"
                  >
                    <option value="Bâtiments">Bâtiments</option>
                    <option value="Génie civil">Génie civil</option>
                    <option value="Travaux publics">Travaux publics</option>
                    <option value="Résidentiel">Résidentiel</option>
                    <option value="Industriel">Industriel</option>
                    <option value="Rénovation">Rénovation</option>
                    <option value="Études & Ingénierie">Études & Ingénierie</option>
                  </select>
                </div>
              </div>

              {/* Location & GPS Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-[#081B38] p-4 rounded-xl border border-[#18437E]">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Localisation</label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="Ex: Berges du Lac"
                    className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Ville *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Tunis"
                    className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Latitude GPS</label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value) || 36.8065)}
                    className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Longitude GPS</label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(parseFloat(e.target.value) || 10.1815)}
                    className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Client, Year, Status, Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">Client (Optionnel)</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Ex: Institutionnel"
                    className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">Année *</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">Statut *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Terminé">Terminé</option>
                    <option value="En cours">En cours</option>
                    <option value="En étude">En étude</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">Superficie</label>
                  <input
                    type="text"
                    value={surfaceArea}
                    onChange={(e) => setSurfaceArea(e.target.value)}
                    placeholder="Ex: 4 500 m²"
                    className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Description courte *</label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Résumé en une phrase pour la carte de présentation..."
                  className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Description complète *</label>
                <textarea
                  rows={4}
                  required
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  placeholder="Détails techniques, étapes de construction et matériaux..."
                  className="w-full bg-[#081B38] border border-[#18437E] rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                />
              </div>

              {/* Image Selection & Gallery Uploader */}
              <div className="bg-[#081B38] p-4 rounded-xl border border-[#18437E] space-y-3">
                <label className="block text-xs font-bold text-[#F5B800] flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Gestionnaire d&apos;Images & Galerie Photos</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">URL Image Principale</label>
                    <input
                      type="text"
                      value={mainImageUrl}
                      onChange={(e) => setMainImageUrl(e.target.value)}
                      className="w-full bg-[#0E2E5C] border border-[#18437E] rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Presets d&apos;Images Disponible</label>
                    <div className="flex gap-2">
                      {imagePresets.map((img) => (
                        <button
                          key={img}
                          type="button"
                          onClick={() => {
                            setMainImageUrl(img);
                            if (!galleryUrls.includes(img)) setGalleryUrls([...galleryUrls, img]);
                          }}
                          className={`relative w-8 h-8 rounded overflow-hidden border ${
                            mainImageUrl === img ? 'border-[#F5B800] ring-2 ring-[#F5B800]' : 'border-slate-700'
                          }`}
                        >
                          <Image src={img} alt="Preset" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#F5B800]"
                  />
                  <span>Mettre en avant sur la page d&apos;accueil</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  <span>Publier sur le site public</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#18437E]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-700 text-white font-medium text-xs hover:bg-slate-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F5B800] text-[#081B38] font-black text-xs hover:bg-[#D9A300] shadow"
                >
                  Enregistrer le Projet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
