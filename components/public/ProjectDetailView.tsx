'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { MapView } from '@/components/ui/MapView';
import {
  MapPin,
  Calendar,
  Building,
  User,
  Clock,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
  FileText
} from 'lucide-react';

export function ProjectDetailView({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = project.gallery_urls?.length
    ? project.gallery_urls
    : [project.main_image_url || '/images/hero_bg.png'];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-12">
      {/* Top Back Navigation */}
      <Link
        href="/projets"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#F5B800] hover:text-[#D9A300] bg-[#0E2E5C] border border-[#18437E] px-4 py-2 rounded-xl shadow transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au portfolio</span>
      </Link>

      {/* Main Header & Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Title, Main Image & Gallery */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#18437E] text-[#F5B800] border border-[#F5B800]/40 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
                {project.category}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {project.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#F5B800]" />
                {project.location_name}, {project.city}, {project.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#F5B800]" />
                Année: {project.year}
              </span>
            </div>
          </div>

          {/* Main Hero Photo */}
          <div
            onClick={() => openLightbox(0)}
            className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18437E] cursor-pointer group bg-slate-800"
          >
            <Image
              src={project.main_image_url || '/images/hero_bg.png'}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-4 right-4 bg-[#081B38]/90 text-white p-2.5 rounded-xl backdrop-blur-md flex items-center gap-2 text-xs font-bold border border-[#F5B800]/40">
              <Maximize2 className="w-4 h-4 text-[#F5B800]" />
              <span>Agrandir les photos ({galleryImages.length})</span>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-2">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative h-24 rounded-xl overflow-hidden border border-[#18437E] hover:border-[#F5B800] cursor-pointer group bg-slate-800 shadow-md"
                >
                  <Image
                    src={img}
                    alt={`${project.title} gallery ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          )}

          {/* Project Detailed Description */}
          <div className="bg-[#0E2E5C] border border-[#18437E] p-6 sm:p-8 rounded-2xl space-y-4 shadow-xl">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800]" />
              Description & Déroulement du Projet
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {project.full_desc}
            </p>
          </div>
        </div>

        {/* Right Col: Specifications Table, Map & CTA */}
        <div className="space-y-6">
          {/* Specifications Card */}
          <div className="bg-[#0E2E5C] border-2 border-[#18437E] p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white pb-3 border-b border-[#18437E] flex items-center gap-2">
              <Building className="w-5 h-5 text-[#F5B800]" />
              Fiche Technique
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-[#18437E]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#F5B800]" /> Client
                </span>
                <span className="font-bold text-white">{project.client || 'Privé / Institutionnel'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#18437E]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B800]" /> Localisation
                </span>
                <span className="font-bold text-white">{project.location_name}, {project.city}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#18437E]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#F5B800]" /> Année
                </span>
                <span className="font-bold text-white">{project.year}</span>
              </div>

              {project.surface_area && (
                <div className="flex justify-between py-2 border-b border-[#18437E]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#F5B800]" /> Superficie
                  </span>
                  <span className="font-bold text-white">{project.surface_area}</span>
                </div>
              )}

              {project.duration && (
                <div className="flex justify-between py-2 border-b border-[#18437E]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F5B800]" /> Durée des travaux
                  </span>
                  <span className="font-bold text-white">{project.duration}</span>
                </div>
              )}

              <div className="flex justify-between py-2">
                <span className="text-slate-400">Statut du projet</span>
                <span className="font-bold text-[#F5B800]">{project.status}</span>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-4 border-t border-[#18437E]">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#F5B800] hover:bg-[#D9A300] text-[#081B38] font-black py-3 px-4 rounded-xl text-xs shadow transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Demander un devis similaire</span>
              </Link>
            </div>
          </div>

          {/* Map Location Card */}
          <div className="bg-[#0E2E5C] border border-[#18437E] p-4 rounded-2xl shadow-xl space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F5B800]" />
              Localisation GPS du Projet
            </h3>
            <MapView
              lat={project.lat}
              lng={project.lng}
              title={project.title}
              locationName={`${project.location_name}, ${project.city}`}
              height="280px"
            />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white bg-slate-800 p-2 rounded-full hover:bg-rose-600 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-slate-800/80 p-3 rounded-full hover:bg-[#F5B800] hover:text-[#081B38] transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full h-[75vh]">
            <Image
              src={galleryImages[lightboxIndex]}
              alt={`${project.title} photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-4 py-1.5 rounded-full">
              Photo {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-slate-800/80 p-3 rounded-full hover:bg-[#F5B800] hover:text-[#081B38] transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
