import React from 'react';
import { notFound } from 'next/navigation';
import { DataService } from '@/lib/data-service';
import { ProjectDetailView } from '@/components/public/ProjectDetailView';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = DataService.getProjectBySlug(slug);
  if (!project) return { title: 'Projet Non Trouvé | TRABAF Construction' };

  return {
    title: `${project.title} | TRABAF Construction Tunisie`,
    description: project.short_desc
  };
}

export default async function SingleProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = DataService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-slate-900 min-h-screen">
      <ProjectDetailView project={project} />
    </div>
  );
}
