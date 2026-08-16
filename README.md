# TRABAF CONSTRUCTION TUNISIE — Site Web & Back-Office Admin

Site web professionnel, moderne, responsive et de qualité production pour **TRABAF CONSTRUCTION TUNISIE**, entreprise tunisienne spécialisée en génie civil, bâtiment et travaux publics (BTP).

---

## 🚀 Fonctionnalités Clés

### Front-Office Public
1. **Identité Visuelle Officielle** : Respect strict du logo officiel, palette Bleu Marine (`#0E2E5C`) et Jaune Chantier (`#F5B800`).
2. **Page d'Accueil Premium** : Hero Banner avec image de chantier haute définition, section de statistiques animées administrables, présentation de l'entreprise, grille de services et portfolio des projets mis en avant.
3. **À Propos** : Présentation institutionnelle, mission, vision, et valeurs (Qualité, Sécurité, Innovation, Respect des délais).
4. **Services BTP** : 8 domaines d'activité spécialisés avec fiches détaillées et modale interactive.
5. **Portfolio & Réalisations** : Filtres par catégorie (Bâtiments, Génie civil, Travaux publics, Résidentiel, Industriel), recherche en temps réel et fiches projets détaillées avec galerie photos lightbox et cartes interactives GPS (`MapView`).
6. **Formulaire de Contact & Devis** : Validation dynamique via Zod avec sauvegarde instantanée en base de données, raccourcis Téléphone (`+216 50 044 010`), Email (`contact.trabaf@gmail.com`), WhatsApp et Facebook.
7. **SEO & Performance** : Dynamic Sitemap (`/sitemap.xml`), `robots.txt`, OpenGraph tags, typographie optimisée et images responsive.

### Back-Office Administration (`/admin`)
1. **Authentification Sécurisée** : Page de connexion `/admin/login` intégrée avec Supabase Auth et mode de secours développement.
2. **Tableau de Bord Overview** : Métriques clés (projets, services, messages non lus) et raccourcis d'action.
3. **CRUD Projets & Uploader** : Création, modification, suppression, mise en avant sur la page d'accueil, publication, coordonnées GPS et gestion des galeries photos.
4. **CRUD Services BTP** : Gestion des titres, descripteurs, ordre d'affichage, sélecteur d'icônes et statut d'activation.
5. **Gestion des Messages Inbound** : Suivi des demandes de devis avec filtres (`Nouveaux`, `Lus`, `Traités`), lecteur modale et mise à jour des statuts.
6. **Paramètres du Site** : Modification en temps réel des numéros, emails, adresses, coordonnées GPS et compteurs statistiques.

---

## 🛠️ Stack Technique

- **Frontend** : Next.js 14+ (App Router), React 19, TypeScript
- **Styling** : Tailwind CSS v4, Lucide React icons, Framer Motion
- **Formulaires** : React Hook Form + Zod Validation
- **Cartographie** : Google Maps Embed & Leaflet / React-Leaflet
- **Base de données & Auth** : Supabase (PostgreSQL, Supabase Auth, Storage)

---

## 💻 Installation & Lancement Local

1. Naviguer dans le dossier du projet :
   ```bash
   cd C:\Users\LENOVO\.gemini\antigravity\scratch\trabaf-construction-tunisie
   ```

2. Installer les dépendances (déjà exécuté) :
   ```bash
   npm install
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

4. Ouvrir le navigateur sur `http://localhost:3000`.

---

## 🔑 Variables d'Environnement

Copier `.env.example` en `.env.local` et configurer vos identifiants Supabase :
```env
NEXT_PUBLIC_SITE_URL=https://trabaf-construction.tn
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
```

---

## 📦 Base de Données Supabase & RLS

Les scripts d'initialisation de la base PostgreSQL sont situés dans le dossier `supabase/migrations/` :
- `01_schema.sql` : Création des tables (`projects`, `services`, `messages`, `company_settings`)
- `02_rls_policies.sql` : Stratégies de sécurité RLS (Accès public en lecture, écriture réservée à l'administrateur)

---

## 🏗️ Build de Production & Déploiement

Pour vérifier et construire le bundle de production :
```bash
npm run build
npm run start
```

Déploiement direct recommandé sur **Vercel** avec Supabase comme base de données.
