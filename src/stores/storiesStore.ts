// =====================================================
// NEWSROOM CMS — STORIES STORE (NO localStorage)
// =====================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story, StoryStatus, StoryActivity } from '../types/admin';
import { SEED_STORIES } from './seedData';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface StoriesState {
  stories: Story[];
  addStory: (story: Omit<Story, 'id' | 'createdAt' | 'updatedAt' | 'activity'>) => Story;
  updateStory: (id: string, updates: Partial<Story>) => void;
  deleteStory: (id: string) => void;
  trashStory: (id: string) => void;
  transitionStatus: (
    id: string,
    status: StoryStatus,
    userId: string,
    userName: string,
    note?: string
  ) => void;
  getStoriesByStatus: (status: StoryStatus | 'all') => Story[];
  getDraftCount: () => number;
  getInReviewCount: () => number;
  getBreakingCount: () => number;
  getPublishedTodayCount: () => number;
  getScheduledCount: () => number;
  checkScheduledStories: () => void;
  fetchFromSupabase: () => Promise<void>;
  subscribeToRealtimeDrafts: () => () => void;
}

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const useStoriesStore = create<StoriesState>()(
  persist(
    (set, get) => ({
      stories: SEED_STORIES,

      addStory: (storyData) => {
        const now = new Date().toISOString();
        const id = generateId();
        const initActivity: StoryActivity = {
          id: `act-${Date.now()}`,
          action: 'created',
          userId: storyData.authorId,
          userName: storyData.byline,
          timestamp: now,
        };
        const newStory: Story = {
          ...storyData,
          id,
          createdAt: now,
          updatedAt: now,
          activity: [initActivity],
        };

        set((state) => ({ stories: [newStory, ...state.stories] }));

        if (isSupabaseConfigured()) {
          const upsertPayload: any = {
            id: newStory.id,
            headline: newStory.headline || 'Untitled Draft',
            kicker: newStory.kicker || '',
            summary: newStory.summary || '',
            body: newStory.body || '',
            section: newStory.section || 'National',
            topics: newStory.topics || [],
            byline: newStory.byline || 'Staff',
            status: newStory.status || 'draft',
            type: newStory.type || 'news',
            is_breaking: !!newStory.isBreaking,
            is_featured: !!newStory.isFeatured,
            is_trending: !!newStory.isTrending,
            is_premium: !!newStory.isPremium,
            main_image: newStory.mainImage || '',
            video_url: newStory.videoUrl || '',
            location: newStory.location || 'NEW DELHI',
            slug: newStory.slug || `draft-${newStory.id.slice(0, 8)}`,
            faqs: newStory.faqs || [],
            created_at: now,
            updated_at: now,
          };
          if (newStory.scheduledDate) {
            upsertPayload.scheduled_date = newStory.scheduledDate;
          }

          supabase
            .from('stories')
            .upsert(upsertPayload)
            .then(({ error }) => {
              if (error) {
                if (error.code === 'PGRST204' && upsertPayload.scheduled_date) {
                  delete upsertPayload.scheduled_date;
                  supabase.from('stories').upsert(upsertPayload).then();
                } else {
                  console.error('Supabase Story insert error:', error);
                }
              }
            });
        }

        return newStory;
      },

      updateStory: (id, updates) => {
        const now = new Date().toISOString();
        set((state) => ({
          stories: state.stories.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: now } : s
          ),
        }));

        if (isSupabaseConfigured()) {
          const currentStory = get().stories.find((s) => s.id === id);
          const upsertPayload: any = {
            id,
            headline: updates.headline ?? currentStory?.headline ?? 'Untitled Draft',
            kicker: updates.kicker ?? currentStory?.kicker ?? '',
            summary: updates.summary ?? currentStory?.summary ?? '',
            body: updates.body ?? currentStory?.body ?? '',
            section: updates.section ?? currentStory?.section ?? 'National',
            topics: updates.topics ?? currentStory?.topics ?? [],
            byline: updates.byline ?? currentStory?.byline ?? 'Staff',
            status: updates.status ?? currentStory?.status ?? 'draft',
            type: updates.type ?? currentStory?.type ?? 'news',
            is_breaking: updates.isBreaking !== undefined ? updates.isBreaking : currentStory?.isBreaking ?? false,
            is_featured: updates.isFeatured !== undefined ? updates.isFeatured : currentStory?.isFeatured ?? false,
            is_trending: updates.isTrending !== undefined ? updates.isTrending : currentStory?.isTrending ?? false,
            is_premium: updates.isPremium !== undefined ? updates.isPremium : currentStory?.isPremium ?? false,
            main_image: updates.mainImage ?? currentStory?.mainImage ?? '',
            video_url: updates.videoUrl !== undefined ? updates.videoUrl : currentStory?.videoUrl ?? '',
            location: updates.location ?? currentStory?.location ?? 'NEW DELHI',
            slug: updates.slug ?? currentStory?.slug ?? `draft-${id.slice(0, 8)}`,
            faqs: updates.faqs ?? currentStory?.faqs ?? [],
            updated_at: now,
          };
          const targetSchedDate = updates.scheduledDate !== undefined ? updates.scheduledDate : currentStory?.scheduledDate;
          if (targetSchedDate) {
            upsertPayload.scheduled_date = targetSchedDate;
          }

          supabase
            .from('stories')
            .upsert(upsertPayload)
            .then(({ error }) => {
              if (error) {
                if (error.code === 'PGRST204' && upsertPayload.scheduled_date) {
                  delete upsertPayload.scheduled_date;
                  supabase.from('stories').upsert(upsertPayload).then();
                } else {
                  console.error('Supabase Story update error:', error);
                }
              }
            });
        }
      },

      deleteStory: (id) => {
        set((state) => ({ stories: state.stories.filter((s) => s.id !== id) }));
        if (isSupabaseConfigured()) {
          supabase.from('stories').delete().eq('id', id).then(({ error }) => {
            if (error) console.error('Supabase Story delete error:', error);
          });
        }
      },

      trashStory: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          stories: state.stories.map((s) =>
            s.id === id ? { ...s, status: 'trash' as StoryStatus, updatedAt: now } : s
          ),
        }));
        if (isSupabaseConfigured()) {
          supabase.from('stories').update({ status: 'trash', updated_at: now }).eq('id', id).then(({ error }) => {
            if (error) console.error('Supabase Story trash error:', error);
          });
        }
      },

      transitionStatus: (id, status, userId, userName, note) => {
        const now = new Date().toISOString();
        set((state) => ({
          stories: state.stories.map((s) => {
            if (s.id !== id) return s;
            const newAct: StoryActivity = {
              id: `act-${Date.now()}`,
              action: `status_changed_to_${status}`,
              userId,
              userName,
              timestamp: now,
              note,
            };
            return {
              ...s,
              status,
              updatedAt: now,
              activity: [...s.activity, newAct],
            };
          }),
        }));

        if (isSupabaseConfigured()) {
          supabase.from('stories').update({ status, updated_at: now }).eq('id', id).then(({ error }) => {
            if (error) console.error('Supabase Story status transition error:', error);
          });
          supabase.from('cms_audit_logs').insert({
            story_id: id,
            action: `status_changed_to_${status}`,
            performed_by: userName || 'Admin',
            new_status: status,
            details: note || `Status updated to ${status}`,
            timestamp: now,
          }).then();
        }
      },

      getStoriesByStatus: (status) => {
        const { stories } = get();
        if (status === 'all') return stories.filter((s) => s.status !== 'trash');
        return stories.filter((s) => s.status === status);
      },

      getDraftCount: () => get().stories.filter((s) => s.status === 'draft').length,
      getInReviewCount: () => get().stories.filter((s) => s.status === 'in_review').length,
      getBreakingCount: () => get().stories.filter((s) => s.isBreaking).length,
      getPublishedTodayCount: () => get().stories.filter((s) => s.status === 'published').length,
      getScheduledCount: () => get().stories.filter((s) => s.status === 'scheduled').length,

      checkScheduledStories: () => {
        const { stories } = get();
        const now = Date.now();
        let changed = false;

        stories.forEach((story) => {
          if (story.status === 'scheduled' && story.scheduledDate) {
            const schedTime = new Date(story.scheduledDate).getTime();
            if (!isNaN(schedTime) && schedTime <= now) {
              changed = true;
              get().transitionStatus(
                story.id,
                'published',
                'system',
                'Auto Scheduler',
                `Automatically published at scheduled time (${new Date(story.scheduledDate).toLocaleString()})`
              );
            }
          }
        });

        return changed;
      },

      fetchFromSupabase: async () => {
        if (!isSupabaseConfigured()) return;
        const { data, error } = await supabase.from('stories').select('*').order('created_at', { ascending: false });
        if (error) {
          console.error('Failed to fetch stories from Supabase DB:', error);
          return;
        }
        if (data && data.length > 0) {
          const mapped: Story[] = data.map((d: any) => ({
            id: d.id,
            type: d.type || 'news',
            status: d.status || 'published',
            kicker: d.kicker || '',
            headline: d.headline,
            summary: d.summary || '',
            body: d.body || '',
            mainImage: d.main_image,
            videoUrl: d.video_url || d.videoUrl || '',
            section: d.section || 'National',
            topics: d.topics || [],
            byline: d.byline || 'Staff',
            authorId: d.author_id || 'user-1',
            location: d.location || 'NEW DELHI',
            isBreaking: !!d.is_breaking,
            isFeatured: !!d.is_featured,
            isTrending: !!d.is_trending,
            isPremium: !!d.is_premium,
            scheduledDate: d.scheduled_date || d.scheduledDate,
            publishDate: d.publish_date || d.created_at,
            views: d.views || 0,
            engagement: d.engagement || 0,
            shares: d.shares || 0,
            comments: d.comments || 0,
            sources: [],
            relatedStoryIds: [],
            activity: [],
            createdAt: d.created_at,
            updatedAt: d.updated_at,
            slug: d.slug,
            faqs: Array.isArray(d.faqs) ? d.faqs : [],
          }));

          const dbIds = new Set(mapped.map((s) => s.id));
          const filteredSeeds = SEED_STORIES.filter((s) => !dbIds.has(s.id));
          set({ stories: [...mapped, ...filteredSeeds] });
        }
      },

      subscribeToRealtimeDrafts: () => {
        if (!isSupabaseConfigured()) return () => {};

        const channel = supabase
          .channel('public:stories_realtime')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'stories' },
            (payload) => {
              if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
                const d: any = payload.new;
                const updatedStory: Story = {
                  id: d.id,
                  type: d.type || 'news',
                  status: d.status || 'draft',
                  kicker: d.kicker || '',
                  headline: d.headline,
                  summary: d.summary || '',
                  body: d.body || '',
                  mainImage: d.main_image,
                  videoUrl: d.video_url || d.videoUrl || '',
                  section: d.section || 'National',
                  topics: d.topics || [],
                  byline: d.byline || 'Staff',
                  authorId: d.author_id || 'user-1',
                  location: d.location || 'NEW DELHI',
                  isBreaking: !!d.is_breaking,
                  isFeatured: !!d.is_featured,
                  isTrending: !!d.is_trending,
                  isPremium: !!d.is_premium,
                  scheduledDate: d.scheduled_date || d.scheduledDate,
                  publishDate: d.publish_date || d.created_at,
                  views: d.views || 0,
                  engagement: d.engagement || 0,
                  shares: d.shares || 0,
                  comments: d.comments || 0,
                  sources: [],
                  relatedStoryIds: [],
                  activity: [],
                  createdAt: d.created_at,
                  updatedAt: d.updated_at,
                  slug: d.slug,
                  faqs: Array.isArray(d.faqs) ? d.faqs : [],
                };

                set((state) => {
                  const exists = state.stories.some((s) => s.id === updatedStory.id);
                  if (exists) {
                    return {
                      stories: state.stories.map((s) =>
                        s.id === updatedStory.id ? { ...s, ...updatedStory } : s
                      ),
                    };
                  } else {
                    return { stories: [updatedStory, ...state.stories] };
                  }
                });
              } else if (payload.eventType === 'DELETE') {
                const oldId = payload.old.id;
                set((state) => ({ stories: state.stories.filter((s) => s.id !== oldId) }));
              }
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      },
    }),
    {
      name: 'bharat_news_stories_v2', // Instant local persistence across all pages & tabs
    }
  )
);

// Automatic Background Scheduler Interval (runs every 5 seconds)
if (typeof window !== 'undefined') {
  setInterval(() => {
    try {
      useStoriesStore.getState().checkScheduledStories();
    } catch (e) {
      // ignore
    }
  }, 5000);
}
