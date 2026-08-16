import { Project, Service, Message, CompanySettings } from '@/types';
import { initialCompanySettings, initialProjects, initialServices, initialMessages } from './mock-data';

const STORAGE_KEYS = {
  PROJECTS: 'trabaf_projects_v1',
  SERVICES: 'trabaf_services_v1',
  MESSAGES: 'trabaf_messages_v1',
  SETTINGS: 'trabaf_settings_v1',
  ADMIN_AUTH: 'trabaf_admin_authed_v1'
};

// Storage helper safely executing in browser environment
function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event to notify listeners
    window.dispatchEvent(new Event('trabaf_storage_updated'));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export const DataService = {
  // Settings
  getCompanySettings(): CompanySettings {
    return getStorageItem<CompanySettings>(STORAGE_KEYS.SETTINGS, initialCompanySettings);
  },
  
  updateCompanySettings(settings: CompanySettings): CompanySettings {
    setStorageItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  // Services
  getServices(onlyActive = false): Service[] {
    const services = getStorageItem<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const sorted = [...services].sort((a, b) => a.display_order - b.display_order);
    return onlyActive ? sorted.filter(s => s.is_active) : sorted;
  },

  getServiceBySlug(slug: string): Service | undefined {
    return this.getServices().find(s => s.slug === slug);
  },

  saveService(service: Partial<Service>): Service {
    const services = this.getServices();
    if (service.id) {
      const idx = services.findIndex(s => s.id === service.id);
      if (idx !== -1) {
        services[idx] = { ...services[idx], ...service } as Service;
      }
    } else {
      const newService: Service = {
        id: 'srv-' + Date.now(),
        title: service.title || 'Nouveau Service',
        slug: service.slug || (service.title ? service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'service-' + Date.now()),
        description: service.description || '',
        icon_name: service.icon_name || 'Building2',
        image_url: service.image_url || '/images/hero_bg.png',
        display_order: service.display_order || services.length + 1,
        is_active: service.is_active ?? true,
        created_at: new Date().toISOString()
      };
      services.push(newService);
      service = newService;
    }
    setStorageItem(STORAGE_KEYS.SERVICES, services);
    return service as Service;
  },

  deleteService(id: string): void {
    const services = this.getServices().filter(s => s.id !== id);
    setStorageItem(STORAGE_KEYS.SERVICES, services);
  },

  // Projects
  getProjects(onlyPublished = false): Project[] {
    const projects = getStorageItem<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    const sorted = [...projects].sort((a, b) => a.display_order - b.display_order);
    return onlyPublished ? sorted.filter(p => p.is_published) : sorted;
  },

  getFeaturedProjects(): Project[] {
    return this.getProjects(true).filter(p => p.is_featured);
  },

  getProjectBySlug(slug: string): Project | undefined {
    return this.getProjects().find(p => p.slug === slug);
  },

  saveProject(project: Partial<Project>): Project {
    const projects = this.getProjects();
    let savedProject: Project;
    
    if (project.id) {
      const idx = projects.findIndex(p => p.id === project.id);
      if (idx !== -1) {
        projects[idx] = { ...projects[idx], ...project } as Project;
        savedProject = projects[idx];
      } else {
        savedProject = project as Project;
      }
    } else {
      const slugBase = project.title || 'projet-' + Date.now();
      const slug = project.slug || slugBase.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      savedProject = {
        id: 'proj-' + Date.now(),
        title: project.title || 'Nouveau Projet',
        slug: slug,
        short_desc: project.short_desc || '',
        full_desc: project.full_desc || '',
        category: project.category || 'Bâtiments',
        client: project.client || '',
        location_name: project.location_name || 'Tunis',
        city: project.city || 'Tunis',
        country: project.country || 'Tunisie',
        lat: project.lat || 36.8065,
        lng: project.lng || 10.1815,
        year: project.year || new Date().getFullYear().toString(),
        duration: project.duration || '',
        surface_area: project.surface_area || '',
        status: project.status || 'En cours',
        main_image_url: project.main_image_url || '/images/hero_bg.png',
        gallery_urls: project.gallery_urls || [project.main_image_url || '/images/hero_bg.png'],
        is_featured: project.is_featured ?? false,
        is_published: project.is_published ?? true,
        display_order: project.display_order || projects.length + 1,
        created_at: new Date().toISOString()
      };
      projects.push(savedProject);
    }
    setStorageItem(STORAGE_KEYS.PROJECTS, projects);
    return savedProject;
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter(p => p.id !== id);
    setStorageItem(STORAGE_KEYS.PROJECTS, projects);
  },

  // Messages
  getMessages(): Message[] {
    const messages = getStorageItem<Message[]>(STORAGE_KEYS.MESSAGES, initialMessages);
    return [...messages].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  addMessage(msg: Omit<Message, 'id' | 'status' | 'created_at'>): Message {
    const messages = this.getMessages();
    const newMessage: Message = {
      ...msg,
      id: 'msg-' + Date.now(),
      status: 'new',
      created_at: new Date().toISOString()
    };
    messages.unshift(newMessage);
    setStorageItem(STORAGE_KEYS.MESSAGES, messages);
    return newMessage;
  },

  updateMessageStatus(id: string, status: Message['status']): void {
    const messages = this.getMessages();
    const idx = messages.findIndex(m => m.id === id);
    if (idx !== -1) {
      messages[idx].status = status;
      setStorageItem(STORAGE_KEYS.MESSAGES, messages);
    }
  },

  deleteMessage(id: string): void {
    const messages = this.getMessages().filter(m => m.id !== id);
    setStorageItem(STORAGE_KEYS.MESSAGES, messages);
  },

  // Admin session state
  isAdminLoggedIn(): boolean {
    return getStorageItem<boolean>(STORAGE_KEYS.ADMIN_AUTH, false);
  },

  setAdminLoggedIn(authed: boolean): void {
    setStorageItem(STORAGE_KEYS.ADMIN_AUTH, authed);
  }
};
