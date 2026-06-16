const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export interface LocalizedString {
  vi: string;
  en: string;
  [key: string]: string | undefined;
}

export interface LocalizedArray {
  vi: string[];
  en: string[];
  [key: string]: string[] | undefined;
}

export interface Product {
  id: number;
  slug?: string;
  name: string | LocalizedString;
  category: string | LocalizedString;
  desc: string | LocalizedString;
  image: string;
  specs: string[] | LocalizedArray;
  applications: string[] | LocalizedArray;
  packaging: string | LocalizedString;
  type: 'food' | 'cosmetic';
  created_at?: string;
  updated_at?: string;
  seo_title?: string | LocalizedString;
  seo_desc?: string | LocalizedString;
  seo_keywords?: string | LocalizedString;
  meta_robots?: string;
  canonical_url?: string;
  og_image?: string;
}

export interface Article {
  id: number;
  slug?: string;
  title: string | LocalizedString;
  summary: string | LocalizedString;
  content: string | LocalizedString;
  date: string;
  image: string;
  category: string | LocalizedString;
  author: string;
  created_at?: string;
  updated_at?: string;
  seo_title?: string | LocalizedString;
  seo_desc?: string | LocalizedString;
  seo_keywords?: string | LocalizedString;
  meta_robots?: string;
  canonical_url?: string;
  og_image?: string;
}

export interface RecruitmentJob {
  id: number;
  slug?: string;
  title: string | LocalizedString;
  department: string | LocalizedString;
  location: string | LocalizedString;
  salary: string | LocalizedString;
  deadline: string;
  summary: string | LocalizedString;
  requirements: string[] | LocalizedArray;
  responsibilities: string[] | LocalizedArray;
  benefits: string[] | LocalizedArray;
  created_at?: string;
  updated_at?: string;
  seo_title?: string | LocalizedString;
  seo_desc?: string | LocalizedString;
  seo_keywords?: string | LocalizedString;
  meta_robots?: string;
  canonical_url?: string;
  og_image?: string;
}

export interface Banner {
  id: number;
  title: string | LocalizedString;
  desc: string | LocalizedString;
  image: string;
  link?: string;
  order: number;
  is_active: boolean;
}

export interface Faq {
  id: number;
  question: string | LocalizedString;
  answer: string | LocalizedString;
  category: string | LocalizedString;
  order: number;
}

export interface StaticPage {
  id: number;
  slug: string;
  title: string | LocalizedString;
  content: string | LocalizedString;
  seo_title?: string | LocalizedString;
  seo_desc?: string | LocalizedString;
  seo_keywords?: string | LocalizedString;
  meta_robots?: string;
  canonical_url?: string;
  og_image?: string;
}

export interface SystemSettings {
  meta_title_vi: string;
  meta_title_en: string;
  meta_desc_vi: string;
  meta_desc_en: string;
  meta_keywords_vi: string;
  meta_keywords_en: string;
  contact_phone: string;
  contact_email: string;
  contact_address_vi: string;
  contact_address_en: string;
  header_scripts?: string;
  footer_scripts?: string;
  seo_robots_txt?: string;
  site_logo?: string;
  site_favicon?: string;
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // Use server-side cache options for SEO
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}),
      },
      // Revalidate cache every 10 seconds for ISR
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching API at ${url}:`, error);
    throw error;
  }
}

export const api = {
  getImageUrl(path: string | undefined): string {
    if (!path) return '/images/placeholder.jpg';
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // If it's a storefront asset, keep it relative
    if (path.startsWith('/images/') || path.startsWith('images/')) {
      return path.startsWith('/') ? path : `/${path}`;
    }
    const backendHost = API_BASE_URL.replace(/\/api$/, '');
    
    // Normalize path to start with /storage/ if it doesn't already
    let normalizedPath = path;
    if (normalizedPath.startsWith('/storage/')) {
      // Correct prefix
    } else if (normalizedPath.startsWith('storage/')) {
      normalizedPath = '/' + normalizedPath;
    } else {
      normalizedPath = '/storage/' + (normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath);
    }
    return `${backendHost}${normalizedPath}`;
  },

  // Products
  async getProducts(type?: 'food' | 'cosmetic', search?: string): Promise<Product[]> {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (search) params.append('search', search);
    const queryString = params.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    const data = await fetchAPI(endpoint);
    return data.products || data;
  },

  async getProduct(id: string | number): Promise<Product> {
    const data = await fetchAPI(`/products/${id}`);
    return data.product || data;
  },

  // News
  async getNews(search?: string): Promise<Article[]> {
    const endpoint = search ? `/news?search=${encodeURIComponent(search)}` : '/news';
    const data = await fetchAPI(endpoint);
    return data.articles || data;
  },

  async getArticle(id: string | number): Promise<Article> {
    const data = await fetchAPI(`/news/${id}`);
    return data.article || data;
  },

  // Recruitment
  async getJobs(): Promise<RecruitmentJob[]> {
    const data = await fetchAPI('/recruitment');
    return data.jobs || data;
  },

  async getJob(id: string | number): Promise<RecruitmentJob> {
    const data = await fetchAPI(`/recruitment/${id}`);
    return data.job || data;
  },

  // Contact
  async submitContact(data: { name: string; email: string; phone?: string; message: string }) {
    const url = `${API_BASE_URL}/contact`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store', // Submissions should never be cached
    });

    const result = await res.json();
    if (!res.ok) {
      throw { errors: result.errors, message: result.message || 'Gửi yêu cầu thất bại.' };
    }
    return result;
  },

  // Banners
  async getBanners(): Promise<Banner[]> {
    return await fetchAPI('/banners');
  },

  // FAQs
  async getFaqs(): Promise<Faq[]> {
    return await fetchAPI('/faqs');
  },

  // Static Pages
  async getPages(): Promise<StaticPage[]> {
    return await fetchAPI('/pages');
  },

  async getPage(slug: string): Promise<StaticPage> {
    return await fetchAPI(`/pages/${slug}`);
  },

  // Settings
  async getSettings(): Promise<SystemSettings> {
    return await fetchAPI('/settings');
  },

  // Submit Product Question
  async submitProductQuestion(data: { product_id: number; customer_name: string; customer_email: string; customer_phone?: string; question: string }) {
    const url = `${API_BASE_URL}/product-questions`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok) {
      throw { errors: result.errors, message: result.message || 'Gửi câu hỏi thất bại.' };
    }
    return result;
  },

  // Dynamic Translations
  async getTranslations(): Promise<any> {
    try {
      return await fetchAPI('/translations', {
        next: { revalidate: 60 } // Cache for 60 seconds (ISR)
      });
    } catch (e) {
      console.error("Failed to fetch dynamic translations from backend:", e);
      return null;
    }
  },

  // SEO Redirects
  async getRedirects(): Promise<{ source_url: string; target_url: string; http_code: number }[]> {
    try {
      return await fetchAPI('/redirects', {
        next: { revalidate: 60 } // Cache redirects for 60s
      });
    } catch (e) {
      console.error("Failed to fetch redirects from backend:", e);
      return [];
    }
  }
};
