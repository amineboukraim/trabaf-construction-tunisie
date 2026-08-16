export type ProjectStatus = 'Terminé' | 'En cours' | 'En étude';

export type ProjectCategory =
  | 'Piscines'
  | 'Bâtiments'
  | 'Génie civil'
  | 'Travaux publics'
  | 'Résidentiel'
  | 'Industriel'
  | 'Rénovation'
  | 'Études & Ingénierie';

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_desc: string;
  full_desc: string;
  category: ProjectCategory;
  client?: string;
  location_name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  year: string;
  duration?: string;
  surface_area?: string;
  status: ProjectStatus;
  main_image_url: string;
  gallery_urls: string[];
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export type MessageStatus = 'new' | 'read' | 'processed';

export interface Message {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  created_at: string;
}

export interface KeyStat {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description?: string;
}

export interface CompanySettings {
  company_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  whatsapp: string;
  facebook: string;
  instagram?: string;
  linkedin?: string;
  working_hours: string;
  lat: number;
  lng: number;
  description: string;
  slogan: string;
  stats: KeyStat[];
}
