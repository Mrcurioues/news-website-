// =====================================================
// NEWSROOM CMS — MEDIA STORE (Supabase Storage & DB Sync)
// =====================================================

import { create } from 'zustand';
import { MediaItem } from '../types/admin';
import { supabase, isSupabaseConfigured } from '../services/supabase';

const INITIAL_MEDIA: MediaItem[] = [
  { id: 'm-1', filename: 'modi-delhi-rally.jpg', url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80', type: 'image', size: 1200000, altText: 'PM Modi at Delhi rally', uploadedBy: 'Priya Mehta', uploadedAt: new Date().toISOString(), usedInStories: ['1'] },
  { id: 'm-2', filename: 'cricket-stadium.jpg', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80', type: 'image', size: 980000, altText: 'Cricket stadium packed crowd', uploadedBy: 'Rahul Verma', uploadedAt: new Date().toISOString(), usedInStories: ['2'] },
  { id: 'm-3', filename: 'stock-market.jpg', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80', type: 'image', size: 760000, altText: 'Stock market trading floor', uploadedBy: 'Anita Kapoor', uploadedAt: new Date().toISOString(), usedInStories: [] },
  { id: 'm-4', filename: 'space-rocket-launch.jpg', url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80', type: 'image', size: 1540000, altText: 'ISRO Space Rocket Launch', uploadedBy: 'Amit Sharma', uploadedAt: new Date().toISOString(), usedInStories: [] },
];

interface MediaState {
  items: MediaItem[];
  addItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => MediaItem;
  uploadFile: (file: File, uploadedBy: string) => Promise<MediaItem>;
  updateItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteItem: (id: string) => void;
  getByType: (type: MediaItem['type'] | 'all') => MediaItem[];
  fetchFromSupabase: () => Promise<void>;
}

const generateId = () => `media-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const useMediaStore = create<MediaState>((set, get) => ({
  items: INITIAL_MEDIA,

  addItem: (itemData) => {
    const now = new Date().toISOString();
    const newItem: MediaItem = {
      ...itemData,
      id: generateId(),
      uploadedAt: now,
    };
    set((state) => ({ items: [newItem, ...state.items] }));

    // Async sync metadata to Supabase DB
    if (isSupabaseConfigured()) {
      supabase
        .from('media')
        .insert({
          filename: newItem.filename,
          url: newItem.url,
          type: newItem.type,
          size: newItem.size,
          alt_text: newItem.altText,
          uploaded_by: newItem.uploadedBy,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase Media insert error:', error);
        });
    }

    return newItem;
  },

  uploadFile: async (file: File, uploadedBy: string) => {
    const isVideo = file.type.startsWith('video');
    const isDoc = file.type.includes('pdf');
    const type: MediaItem['type'] = isVideo ? 'video' : isDoc ? 'document' : 'image';
    const localUrl = URL.createObjectURL(file);

    let finalUrl = localUrl;

    if (isSupabaseConfigured()) {
      try {
        const fileExt = file.name.split('.').pop();
        const filePath = `uploads/${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${fileExt}`;

        // 1. Upload to Supabase Storage bucket 'newsroom-media'
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('newsroom-media')
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('newsroom-media')
            .getPublicUrl(filePath);
          if (publicUrlData?.publicUrl) {
            finalUrl = publicUrlData.publicUrl;
          }
        } else if (uploadError) {
          console.warn('Supabase storage upload fallback to local URL:', uploadError.message);
        }
      } catch (err) {
        console.warn('Supabase Storage exception:', err);
      }
    }

    const newItem = get().addItem({
      filename: file.name,
      url: finalUrl,
      type,
      size: file.size,
      altText: file.name.split('.')[0].replace(/[-_]/g, ' '),
      uploadedBy: uploadedBy || 'Admin',
      usedInStories: [],
    });

    return newItem;
  },

  updateItem: (id, updates) => {
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    }));
  },

  deleteItem: async (id: string) => {
    const item = get().items.find((i) => i.id === id);
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));

    if (isSupabaseConfigured() && item) {
      try {
        // 1. Delete metadata row from Supabase DB 'media' table by ID or URL
        const { error: dbError } = await supabase.from('media').delete().eq('id', id);
        if (dbError) {
          await supabase.from('media').delete().eq('url', item.url);
        }

        // 2. Delete file from Supabase Storage bucket 'newsroom-media'
        if (item.url && item.url.includes('/newsroom-media/')) {
          const storagePath = item.url.split('/newsroom-media/')[1];
          if (storagePath) {
            const cleanPath = decodeURIComponent(storagePath.split('?')[0]);
            const { error: storageError } = await supabase.storage
              .from('newsroom-media')
              .remove([cleanPath]);

            if (storageError) {
              console.error('Failed to delete file from Supabase Storage:', storageError.message);
            } else {
              console.log('Successfully deleted file from Supabase Storage bucket:', cleanPath);
            }
          }
        }
      } catch (err) {
        console.warn('Supabase media delete exception:', err);
      }
    }
  },

  getByType: (type) => {
    const { items } = get();
    if (type === 'all') return items;
    return items.filter((item) => item.type === type);
  },

  fetchFromSupabase: async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabase.from('media').select('*').order('uploaded_at', { ascending: false });
      if (error) {
        console.error('Failed to fetch media from Supabase:', error);
        return;
      }
      if (data && data.length > 0) {
        const mapped: MediaItem[] = data.map((d: any) => ({
          id: d.id,
          filename: d.filename,
          url: d.url,
          type: d.type || 'image',
          size: d.size || 0,
          altText: d.alt_text || d.filename,
          uploadedBy: d.uploaded_by || 'Admin',
          uploadedAt: d.uploaded_at,
          usedInStories: d.used_in_stories || [],
        }));

        // Merge DB media items with static initial media ensuring no duplicate IDs
        const dbIds = new Set(mapped.map((i) => i.id));
        const filteredInitial = INITIAL_MEDIA.filter((i) => !dbIds.has(i.id));
        set({ items: [...mapped, ...filteredInitial] });
      }
    } catch (err) {
      console.warn('Supabase Media fetch exception:', err);
    }
  },
}));
