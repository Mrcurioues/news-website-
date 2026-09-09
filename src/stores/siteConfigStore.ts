import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../services/supabase';

export interface SiteConfig {
  appNameHi: string;
  appNameEn: string;
  appSuffixHi: string;
  appSuffixEn: string;
  taglineHi: string;
  taglineEn: string;
  logoUrl: string;
  logoBadgeText: string;
  primaryColor: string;
  liveVideoUrl: string;
  liveVideoTitleHi: string;
  liveVideoTitleEn: string;
  isLiveVideoActive: boolean;
}

interface SiteConfigState {
  config: SiteConfig;
  updateConfig: (partial: Partial<SiteConfig>) => Promise<void>;
  fetchFromSupabase: () => Promise<void>;
  subscribeToRealtimeBranding: () => () => void;
  resetConfig: () => void;
}

const DEFAULT_CONFIG: SiteConfig = {
  appNameHi: 'भारत समाचार',
  appNameEn: 'Bharat News',
  appSuffixHi: 'लाइव',
  appSuffixEn: 'LIVE',
  taglineHi: 'सत्य, निष्पक्ष और विश्वसनीय ताज़ा ख़बरें 24x7',
  taglineEn: 'Truthful, Unbiased & Verified Headlines 24x7',
  logoUrl: '',
  logoBadgeText: 'भा',
  primaryColor: '#e11d48',
  liveVideoUrl: 'https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig',
  liveVideoTitleHi: 'भारत समाचार 24x7 ताज़ा लाइव टीवी बुलेटिन',
  liveVideoTitleEn: 'Bharat News 24x7 Live Stream Bulletin',
  isLiveVideoActive: true,
};

const STORAGE_KEY = 'newsroom_site_branding_cache';

const loadCachedConfig = (): SiteConfig => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (e) {
    // Ignore storage errors
  }
  return DEFAULT_CONFIG;
};

const saveConfigToCache = (config: SiteConfig) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    // Ignore storage errors
  }
};

export const deleteOldLogoFromSupabase = async (oldUrl: string) => {
  if (!isSupabaseConfigured() || !oldUrl) return;
  try {
    if (oldUrl.includes('newsroom-media')) {
      const parts = oldUrl.split('newsroom-media/');
      if (parts.length > 1) {
        const filePath = parts[1].split('?')[0];
        if (filePath) {
          await supabase.storage.from('newsroom-media').remove([filePath]);
        }
      }
    }
  } catch (e) {
    console.warn('Failed to delete old logo from Supabase Storage:', e);
  }
};

export const uploadLogoToSupabase = async (file: File, oldUrl?: string): Promise<string> => {
  if (!isSupabaseConfigured()) {
    return URL.createObjectURL(file);
  }
  try {
    if (oldUrl) {
      await deleteOldLogoFromSupabase(oldUrl);
    }
    const ext = file.name.split('.').pop() || 'png';
    const filePath = `logos/portal-logo-${Date.now()}_${Math.random().toString(36).slice(2, 6)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('newsroom-media')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (!uploadError && uploadData) {
      const { data: publicUrlData } = supabase.storage
        .from('newsroom-media')
        .getPublicUrl(filePath);
      if (publicUrlData?.publicUrl) {
        return publicUrlData.publicUrl;
      }
    }
  } catch (err) {
    console.warn('Supabase logo upload error:', err);
  }
  return URL.createObjectURL(file);
};

export const useSiteConfigStore = create<SiteConfigState>()((set, get) => ({
  config: loadCachedConfig(),

  updateConfig: async (partial) => {
    const currentLogo = get().config.logoUrl;
    if (partial.logoUrl !== undefined && partial.logoUrl !== currentLogo && currentLogo) {
      deleteOldLogoFromSupabase(currentLogo);
    }

    const updated = { ...get().config, ...partial };
    saveConfigToCache(updated);
    set({ config: updated });

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('site_branding').upsert({
          id: 1,
          app_name_hi: updated.appNameHi,
          app_name_en: updated.appNameEn,
          app_suffix_hi: updated.appSuffixHi,
          app_suffix_en: updated.appSuffixEn,
          tagline_hi: updated.taglineHi,
          tagline_en: updated.taglineEn,
          logo_url: updated.logoUrl,
          logo_badge_text: updated.logoBadgeText,
          primary_color: updated.primaryColor,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn('Supabase site_branding upsert warning:', e);
      }
    }
  },

  fetchFromSupabase: async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data } = await supabase.from('site_branding').select('*').eq('id', 1).maybeSingle();
      if (data) {
        const updatedConfig = {
          ...get().config,
          appNameHi: data.app_name_hi || get().config.appNameHi,
          appNameEn: data.app_name_en || get().config.appNameEn,
          appSuffixHi: data.app_suffix_hi || get().config.appSuffixHi,
          appSuffixEn: data.app_suffix_en || get().config.appSuffixEn,
          taglineHi: data.tagline_hi || get().config.taglineHi,
          taglineEn: data.tagline_en || get().config.taglineEn,
          logoUrl: data.logo_url ?? get().config.logoUrl,
          logoBadgeText: data.logo_badge_text || get().config.logoBadgeText,
          primaryColor: data.primary_color || get().config.primaryColor,
        };
        saveConfigToCache(updatedConfig);
        set({ config: updatedConfig });
      }
    } catch (e) {
      console.warn('Supabase site_branding fetch error:', e);
    }
  },

  subscribeToRealtimeBranding: () => {
    if (!isSupabaseConfigured()) return () => {};

    const channel = supabase
      .channel('public:site_branding_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_branding' },
        (payload) => {
          if (payload.new) {
            const data: any = payload.new;
            set((state) => {
              const updatedConfig = {
                ...state.config,
                appNameHi: data.app_name_hi || state.config.appNameHi,
                appNameEn: data.app_name_en || state.config.appNameEn,
                appSuffixHi: data.app_suffix_hi || state.config.appSuffixHi,
                appSuffixEn: data.app_suffix_en || state.config.appSuffixEn,
                taglineHi: data.tagline_hi || state.config.taglineHi,
                taglineEn: data.tagline_en || state.config.taglineEn,
                logoUrl: data.logo_url ?? state.config.logoUrl,
                logoBadgeText: data.logo_badge_text || state.config.logoBadgeText,
                primaryColor: data.primary_color || state.config.primaryColor,
              };
              saveConfigToCache(updatedConfig);
              return { config: updatedConfig };
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  resetConfig: () => set({ config: DEFAULT_CONFIG }),
}));

