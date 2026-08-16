-- TRABAF CONSTRUCTION TUNISIE DATABASE SCHEMA

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT,
  location_name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'Tunisie',
  lat NUMERIC(9,6) DEFAULT 36.8065,
  lng NUMERIC(9,6) DEFAULT 10.1815,
  year TEXT NOT NULL,
  duration TEXT,
  surface_area TEXT,
  status TEXT DEFAULT 'En cours',
  main_image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Building2',
  image_url TEXT,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Company Settings Table
CREATE TABLE IF NOT EXISTS public.company_settings (
  id INT PRIMARY KEY DEFAULT 1,
  company_name TEXT DEFAULT 'TRABAF CONSTRUCTION TUNISIE',
  phone TEXT DEFAULT '+216 50 044 010',
  email TEXT DEFAULT 'contact.trabaf@gmail.com',
  address TEXT DEFAULT 'Zone Industrielle, Tunis',
  city TEXT DEFAULT 'Tunis',
  country TEXT DEFAULT 'Tunisie',
  whatsapp TEXT DEFAULT '+21650044010',
  facebook TEXT DEFAULT 'Trabaf construction Tunisie',
  working_hours TEXT DEFAULT 'Lundi - Vendredi: 08:00 - 17:30',
  lat NUMERIC(9,6) DEFAULT 36.8065,
  lng NUMERIC(9,6) DEFAULT 10.1815,
  slogan TEXT DEFAULT 'Construire aujourd''hui, les projets de demain.',
  description TEXT DEFAULT 'TRABAF Construction Tunisie accompagne vos projets de construction et génie civil avec exigence et professionnalisme.',
  stats_json JSONB DEFAULT '[]'::jsonb
);
