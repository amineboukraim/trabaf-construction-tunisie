import { z } from 'zod';

export const contactSchema = z.object({
  full_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez saisir une adresse email valide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Le sujet est requis'),
  message: z.string().min(10, 'Votre message doit contenir au moins 10 caractères')
});

export const projectSchema = z.object({
  title: z.string().min(3, 'Le titre est obligatoire'),
  category: z.enum([
    'Bâtiments',
    'Génie civil',
    'Travaux publics',
    'Résidentiel',
    'Industriel',
    'Rénovation',
    'Études & Ingénierie'
  ]),
  client: z.string().optional(),
  location_name: z.string().min(2, 'La localisation est requise'),
  city: z.string().min(2, 'La ville est requise'),
  country: z.string().default('Tunisie'),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  year: z.string().min(4, 'Saisissez une année valide'),
  duration: z.string().optional(),
  surface_area: z.string().optional(),
  status: z.enum(['Terminé', 'En cours', 'En étude']),
  short_desc: z.string().min(10, 'Fournissez une courte description'),
  full_desc: z.string().min(20, 'Fournissez une description complète'),
  main_image_url: z.string().min(1, 'L\'image principale est requise'),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true)
});

export const serviceSchema = z.object({
  title: z.string().min(3, 'Le titre du service est requis'),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères'),
  icon_name: z.string().min(1, 'Sélectionnez une icône'),
  image_url: z.string().optional(),
  is_active: z.boolean().default(true)
});

export const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères')
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
