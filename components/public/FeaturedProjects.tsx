'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DataService } from '@/lib/data-service';
import { Project } from '@/types';
import { MapPin, Calendar, ArrowRight, Search, Tag, Eye } from 'lucide-react';
import { getImagePath } from '@/lib/image-path';

interface FeaturedProjectsProps {
  showFilters?: boolean;
  limit?: number;
}

export function FeaturedProjects({ showFilters = true, limit }: FeaturedProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const projects = DataService.getProjects(true);

  const categories: string[] = [
    'Tous',
    'Piscines',
    'Bâtiments',
    'Génie civil',
    'Travaux publics',
    'Résidentiel',
    'Industriel'
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'Tous' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18437E] text-[#F5B800] font-bold text-xs uppercase tracking-wider border border-[#F5B800]/30">
              <span>Portfolio & Réalisations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Nos Réalisations d&apos;Excellence
            </h2>
            <p className="text-slate-300 text-base">
              Découvrez nos récents projets de piscines sur-mesure, de construction et d&apos;ingénierie livrés en Tunisie.
            </p>
          </div>

          {limit && (
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-bold px-6 py-3 rounded-xl transition-colors shadow-md text-sm shrink-0"
            >
              <span>Voir tout le portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Filters and Search Bar */}
        {showFilters && (
          <div className="mb-10 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                      selectedCategory === cat
                        ? 'bg-[#F5B800] text-[#081B38] shadow-md scale-105'
                        : 'bg-[#0E2E5C] text-slate-300 hover:bg-[#18437E] hover:text-white border border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher piscine, bâtiment, ville..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0E2E5C] border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F5B800]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Project Cards Grid */}
        {displayedProjects.length === 0 ? (
          <div className="bg-[#0E2E5C] p-12 rounded-2xl text-center text-slate-300 border border-slate-700">
            <Tag className="w-12 h-12 text-[#F5B800] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">Aucun projet trouvé</h3>
            <p className="text-xs text-slate-400">Essayez de modifier votre recherche ou vos filtres.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#0E2E5C] border border-[#18437E] hover:border-[#F5B800] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Thumbnail */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-800">
                    <Image
                      src={getImagePath(project.main_image_url || '/images/hero_bg.png')}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2E5C] via-transparent to-transparent opacity-80" />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-[#081B38]/90 backdrop-blur-md text-[#F5B800] border border-[#F5B800]/40 text-[11px] font-bold px-3 py-1 rounded-md shadow">
                      {project.category}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-md shadow ${
                        project.status === 'Terminé'
                          ? 'bg-emerald-600 text-white'
                          : project.status === 'En cours'
                          ? 'bg-[#F5B800] text-[#081B38]'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F5B800]" />
                        {project.location_name}, {project.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#F5B800]" />
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#F5B800] transition-colors line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                      {project.short_desc}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/projets/${project.slug}`}
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#18437E] hover:bg-[#F5B800] text-white hover:text-[#081B38] font-bold py-2.5 rounded-xl transition-all text-xs"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir le projet détaillé</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
