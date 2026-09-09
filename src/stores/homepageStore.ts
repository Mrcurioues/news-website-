// =====================================================
// NEWSROOM CMS — HOMEPAGE STORE (Realtime Sync, Local Persist & Supabase Persistence)
// =====================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HomepageLayout } from '../types/admin';
import { SEED_HOMEPAGE_LAYOUT } from './seedData';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface HomepageState {
  layout: HomepageLayout;
  fetchLayoutFromSupabase: () => Promise<void>;
  updateSection: (section: keyof HomepageLayout, storyIds: string[]) => void;
  addToSection: (section: keyof HomepageLayout, storyId: string) => void;
  removeFromSection: (section: keyof HomepageLayout, storyId: string) => void;
  addCustomVideoLink: (url: string) => void;
  removeCustomVideoLink: (index: number) => void;
  resetLayout: () => void;
}

const syncToSupabase = async (newLayout: HomepageLayout) => {
  if (!isSupabaseConfigured()) return;
  try {
    const { error } = await supabase
      .from('homepage_layout')
      .upsert({ id: 'main_layout', layout_data: newLayout, updated_at: new Date().toISOString() });
    if (error) {
      console.warn('Supabase homepage_layout upsert warning:', error.message);
    }
  } catch (err) {
    console.warn('Supabase sync exception:', err);
  }
};

export const useHomepageStore = create<HomepageState>()(
  persist(
    (set, get) => ({
      layout: SEED_HOMEPAGE_LAYOUT,

      fetchLayoutFromSupabase: async () => {
        if (!isSupabaseConfigured()) return;
        try {
          const { data, error } = await supabase
            .from('homepage_layout')
            .select('layout_data')
            .eq('id', 'main_layout')
            .single();

          if (data && data.layout_data) {
            set({ layout: data.layout_data as HomepageLayout });
          }
        } catch (err) {
          console.warn('Could not fetch homepage layout from Supabase:', err);
        }
      },

      updateSection: (section, storyIds) => {
        set((state) => {
          const updatedLayout = { ...state.layout, [section]: storyIds };
          syncToSupabase(updatedLayout);
          return { layout: updatedLayout };
        });
      },

      addToSection: (section, storyId) => {
        set((state) => {
          const current = state.layout[section] || [];
          if (current.includes(storyId)) return state;
          const updatedLayout = { ...state.layout, [section]: [...current, storyId] };
          syncToSupabase(updatedLayout);
          return { layout: updatedLayout };
        });
      },

      removeFromSection: (section, storyId) => {
        set((state) => {
          const current = state.layout[section] || [];
          const updatedLayout = { ...state.layout, [section]: (current as string[]).filter((id) => id !== storyId) };
          syncToSupabase(updatedLayout);
          return { layout: updatedLayout };
        });
      },

      addCustomVideoLink: (url: string) => {
        set((state) => {
          const current = state.layout.customVideoLinks || [];
          if (current.includes(url)) return state;
          const updatedLayout = { ...state.layout, customVideoLinks: [...current, url] };
          syncToSupabase(updatedLayout);
          return { layout: updatedLayout };
        });
      },

      removeCustomVideoLink: (index: number) => {
        set((state) => {
          const current = state.layout.customVideoLinks || [];
          const updatedLayout = { ...state.layout, customVideoLinks: current.filter((_, i) => i !== index) };
          syncToSupabase(updatedLayout);
          return { layout: updatedLayout };
        });
      },

      resetLayout: () => {
        set({ layout: SEED_HOMEPAGE_LAYOUT });
        syncToSupabase(SEED_HOMEPAGE_LAYOUT);
      },
    }),
    {
      name: 'bharat_news_homepage_layout_v2', // Persist key in browser for instant state sync
    }
  )
);
