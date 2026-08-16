import { CompanySettings, Project, Service, Message } from '@/types';

export const initialCompanySettings: CompanySettings = {
  company_name: 'TRABAF CONSTRUCTION TUNISIE',
  phone: '+216 50 044 010',
  email: 'contact.trabaf@gmail.com',
  address: 'Zone Industrielle, Tunis',
  city: 'Tunis',
  country: 'Tunisie',
  whatsapp: '+21650044010',
  facebook: 'https://facebook.com/Trabaf-construction-Tunisie',
  instagram: '',
  linkedin: '',
  working_hours: 'Lundi - Vendredi: 08:00 - 17:30 | Samedi: 08:00 - 13:00',
  lat: 36.8065,
  lng: 10.1815,
  slogan: 'TRABAF: Bâtir Vos Rêves, Créer Votre Oasis | Construction & Piscines sur Mesure.',
  description: 'TRABAF Construction Tunisie accompagne vos projets de construction, génie civil, bâtiment et création de piscines sur mesure avec exigence, expertise technique et rigueur professionnelle.',
  stats: [
    { id: '1', label: 'Projets Réalisés', value: 25, prefix: '+', suffix: '', description: 'Bâtiments, génie civil & piscines en Tunisie' },
    { id: '2', label: 'Années d\'Expérience', value: 12, prefix: '+', suffix: ' ans', description: 'Expertise reconnue en BTP & Piscines' },
    { id: '3', label: 'Collaborateurs & Ingénieurs', value: 85, prefix: '+', suffix: '', description: 'Experts qualifiés et effectif terrain' },
    { id: '4', label: 'Taux de Satisfaction', value: 99, prefix: '', suffix: '%', description: 'Respect strict des délais et de la qualité' }
  ]
};

export const initialServices: Service[] = [
  {
    id: 'srv-piscines',
    title: 'Création & Fabrication de Piscines sur Mesure',
    slug: 'piscines-sur-mesure',
    description: 'Conception sur mesure, piscines en béton armé & liner, miroir et débordement. Fabrication, pose, filtration automatisée et aménagement d\'oasis privées.',
    icon_name: 'Waves',
    image_url: '/images/piscines_banner.png',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'srv-1',
    title: 'Construction de Bâtiments & Clés en Main',
    slug: 'construction-de-batiments',
    description: 'Réalisation complète de bâtiments administratifs, commerciaux, tertiaires et logements clés en main selon les normes les plus exigeantes.',
    icon_name: 'Building2',
    image_url: '/images/hero_bg.png',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'srv-2',
    title: 'Génie Civil & Structures',
    slug: 'genie-civil-structures',
    description: 'Étude et exécution d\'ouvrages d\'art, fondations spéciales, infrastructures lourdes en béton armé et constructions de structures.',
    icon_name: 'HardHat',
    image_url: '/images/hero_banner.jpg',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'srv-3',
    title: 'Travaux Publics & Voiries',
    slug: 'travaux-publics-voiries',
    description: 'Aménagement urbain, terrassement, réseaux divers (VRD), voiries et infrastructures routières pour les collectivités et le secteur privé.',
    icon_name: 'Truck',
    image_url: '/images/hero_bg.png',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'srv-4',
    title: 'Construction Résidentielle & Villas',
    slug: 'construction-residentielle',
    description: 'Conception et édification d\'immeubles de haut standing, complexes résidentiels et villas de luxe avec espace piscine personnalisé.',
    icon_name: 'Home',
    image_url: '/images/residential.png',
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'srv-5',
    title: 'Construction Industrielle',
    slug: 'construction-industrielle',
    description: 'Bâtiments industriels, usines, entrepôts logistiques, hangars métalliques sur-mesure intégrant contraintes de sécurité et d\'exploitation.',
    icon_name: 'Factory',
    image_url: '/images/industrial.png',
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'srv-6',
    title: 'Rénovation & Restructuration',
    slug: 'renovation-restructuration',
    description: 'Réhabilitation lourde, modernisation architecturale, renforcement de structures existantes et mise en conformité.',
    icon_name: 'Wrench',
    image_url: '/images/hero_banner.jpg',
    display_order: 7,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'srv-7',
    title: 'Études & Ingénierie BTP',
    slug: 'etudes-ingenierie-btp',
    description: 'Assistance à maîtrise d\'ouvrage, métrés, planification BIM, contrôle qualité et suivi technique d\'exécution.',
    icon_name: 'Compass',
    image_url: '/images/hero_bg.png',
    display_order: 8,
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-piscine-1',
    title: 'Piscine à Débordement & Oasis de Luxe — Projet Démonstration',
    slug: 'piscine-debordement-oasis-luxe-projet-demonstration',
    short_desc: 'Conception sur-mesure et fabrication d\'une piscine miroir à débordement béton & liner avec plage immergée et terrasse à Gammarth.',
    full_desc: 'Ce projet illustre l\'expertise de TRABAF Construction dans la création d\'oasis privées et de piscines sur mesure. Réalisation complète comprenant l\'étude hydraulique, le terrassement, le cuvelage en béton armé, la pose du liner armé, la filtration haut débit et l\'éclairage d\'ambiance.',
    category: 'Piscines',
    client: 'Client Résidentiel Privé (Démo)',
    location_name: 'Gammarth',
    city: 'Tunis',
    country: 'Tunisie',
    lat: 36.9167,
    lng: 10.3000,
    year: '2026',
    duration: '3 mois',
    surface_area: '120 m²',
    status: 'Terminé',
    main_image_url: '/images/piscines_banner.png',
    gallery_urls: [
      '/images/piscines_banner.png',
      '/images/residential.png'
    ],
    is_featured: true,
    is_published: true,
    display_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'proj-1',
    title: 'Complexe Administratif Moderne — Projet Démonstration',
    slug: 'complexe-administratif-moderne-projet-demonstration',
    short_desc: 'Réalisation d\'un immeuble de bureau R+5 de très haut standing avec vitrage structurel et parement moderne à Tunis.',
    full_desc: 'Ce projet d\'exemple illustre la maîtrise de TRABAF Construction dans l\'édification de complexes tertiaires contemporains. L\'ouvrage comprend 5 niveaux de bureaux modulables, un sous-sol de parking sécurisé, un atrium vitré à haute efficacité énergétique, ainsi que des finitions intérieures soignées.',
    category: 'Génie civil',
    client: 'Client Institutionnel (Démo)',
    location_name: 'Les Berges du Lac 2',
    city: 'Tunis',
    country: 'Tunisie',
    lat: 36.8431,
    lng: 10.2674,
    year: '2025',
    duration: '18 mois',
    surface_area: '4 500 m²',
    status: 'Terminé',
    main_image_url: '/images/hero_bg.png',
    gallery_urls: [
      '/images/hero_bg.png',
      '/images/hero_banner.jpg',
      '/images/residential.png'
    ],
    is_featured: true,
    is_published: true,
    display_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'proj-2',
    title: 'Résidence Panoramique avec Espace Aquatique — Projet Démonstration',
    slug: 'residence-panoramique-projet-demonstration',
    short_desc: 'Ensemble immobilier résidentiel R+6 composé d\'appartements de luxe avec piscine collective et espaces verts à Hammamet.',
    full_desc: 'Exemple de promotion immobilière résidentielle haut de gamme. Le programme comporte 32 appartements de standing, une piscine collective conçue et posée par nos équipes, des espaces paysagers intégrés et des matériaux locaux de première qualité.',
    category: 'Résidentiel',
    client: 'Promoteur Privé (Démo)',
    location_name: 'Zone Touristique',
    city: 'Hammamet',
    country: 'Tunisie',
    lat: 36.4000,
    lng: 10.6167,
    year: '2024',
    duration: '22 mois',
    surface_area: '6 200 m²',
    status: 'Terminé',
    main_image_url: '/images/residential.png',
    gallery_urls: [
      '/images/residential.png',
      '/images/piscines_banner.png',
      '/images/hero_bg.png'
    ],
    is_featured: true,
    is_published: true,
    display_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'proj-3',
    title: 'Parc Logistique & Entrepôt — Projet Démonstration',
    slug: 'parc-logistique-entrepot-projet-demonstration',
    short_desc: 'Construction d\'une plateforme logistique industrielle avec charpente métallique et quais de chargement à Sousse.',
    full_desc: 'Un exemple de projet industriel d\'envergure comprenant un hangar métallique haute portée, un sol en béton quartzé à forte résistance, des bureaux d\'administration intégrés et une centrale solaire en toiture.',
    category: 'Industriel',
    client: 'Groupe Industriel (Démo)',
    location_name: 'Zone Industrielle Enfidha',
    city: 'Sousse',
    country: 'Tunisie',
    lat: 36.1417,
    lng: 10.3798,
    year: '2026',
    duration: '12 mois',
    surface_area: '10 000 m²',
    status: 'En cours',
    main_image_url: '/images/industrial.png',
    gallery_urls: [
      '/images/industrial.png',
      '/images/hero_banner.jpg'
    ],
    is_featured: false,
    is_published: true,
    display_order: 4,
    created_at: new Date().toISOString()
  }
];

export const initialMessages: Message[] = [
  {
    id: 'msg-1',
    full_name: 'Kamel Mansouri',
    email: 'kamel.mansouri@example.com',
    phone: '+216 98 123 456',
    subject: 'Demande de devis pour construction villa & piscine',
    message: 'Bonjour TRABAF, je souhaiterais obtenir une estimation de devis pour les travaux de gros œuvre d\'une villa R+1 ainsi que la fabrication d\'une piscine sur mesure en béton (8x4m) à Gammarth. Merci.',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];
