// =====================================================
// NEWSROOM CMS — COMMENTS STORE WITH SUPABASE REALTIME SYNC
// =====================================================

import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../services/supabase';

export interface CommentItem {
  id: string;
  storyId?: string;
  storyTitle: string;
  storySlug: string;
  storyCategory: string;
  authorName: string;
  authorEmail: string;
  ipAddress: string;
  location: string;
  content: string;
  status: 'pending' | 'approved' | 'spam' | 'rejected';
  createdAt: string;
  isToxic: boolean;
  moderatedAt?: string;
  actionLog?: string[];
}

interface CommentsState {
  comments: CommentItem[];
  addComment: (comment: Omit<CommentItem, 'id' | 'createdAt' | 'status' | 'isToxic'>) => Promise<CommentItem>;
  updateStatus: (id: string, newStatus: 'pending' | 'approved' | 'spam' | 'rejected') => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  fetchComments: () => Promise<void>;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'cmt-1',
    storyTitle: 'India Clinches T20 Series in Thrilling Final Match',
    storySlug: 'india-clinches-t20-series-in-thrilling-final-match',
    storyCategory: 'Sports',
    authorName: 'Rajesh Kumar',
    authorEmail: 'rajesh.k@gmail.com',
    ipAddress: '49.36.12.89',
    location: 'New Delhi, India',
    content: 'Great match! India played brilliantly throughout the series, especially in the death overs.',
    status: 'pending',
    createdAt: '10 mins ago',
    isToxic: false,
    actionLog: ['Created via Web']
  },
  {
    id: 'cmt-2',
    storyTitle: 'PM Modi Unveils ₹50,000 Cr Infrastructure Push for Highways',
    storySlug: 'pm-modi-unveils-50000-cr-infrastructure-push',
    storyCategory: 'National',
    authorName: 'Sunita Sharma',
    authorEmail: 'sunita.sharma@yahoo.com',
    ipAddress: '103.21.124.5',
    location: 'Mumbai, India',
    content: 'This is exactly what India needs. Roads, railways, and rural connectivity are key to economic growth.',
    status: 'pending',
    createdAt: '25 mins ago',
    isToxic: false,
    actionLog: ['Created via Web']
  },
  {
    id: 'cmt-3',
    storyTitle: 'Stock Markets Rally to All-Time High Driven by Tech Stocks',
    storySlug: 'stock-markets-rally-to-all-time-high',
    storyCategory: 'Business',
    authorName: 'Anonymous Trader',
    authorEmail: 'anon.trader99@protonmail.com',
    ipAddress: '157.34.18.22',
    location: 'Bengaluru, India',
    content: 'Stupid analysis, markets will crash tomorrow watch. Nonsense clickbait news.',
    status: 'pending',
    createdAt: '1 hour ago',
    isToxic: true,
    actionLog: ['Flagged Toxicity']
  },
  {
    id: 'cmt-4',
    storyTitle: 'Monsoon Arrival Delayed by 5 Days in Peninsular India',
    storySlug: 'monsoon-arrival-delayed-by-5-days',
    storyCategory: 'Environment',
    authorName: 'Priya Nair',
    authorEmail: 'priya.nair@outlook.com',
    ipAddress: '117.201.45.12',
    location: 'Kochi, India',
    content: 'Climate change is real and we need to act now. Farmers need accurate seasonal forecasts.',
    status: 'approved',
    createdAt: '2 hours ago',
    isToxic: false,
    actionLog: ['Approved by Admin']
  },
  {
    id: 'cmt-5',
    storyTitle: 'Global Tech Layoffs Continue: Over 10,000 Jobs Affected',
    storySlug: 'global-tech-layoffs-continue',
    storyCategory: 'Technology',
    authorName: 'Vikram Singh',
    authorEmail: 'vikram.singh@devtech.io',
    ipAddress: '182.72.90.11',
    location: 'Gurugram, India',
    content: 'These companies have no loyalty despite huge profits last quarter. Pure corporate greed at work.',
    status: 'approved',
    createdAt: '3 hours ago',
    isToxic: false,
    actionLog: ['Approved by Admin']
  },
  {
    id: 'cmt-6',
    storyTitle: 'Assembly Elections 2026: Campaigning Reaches Peak Phase',
    storySlug: 'assembly-elections-2026-campaigning-reaches-peak',
    storyCategory: 'Politics',
    authorName: 'Troll123',
    authorEmail: 'spammer_x88@tempmail.org',
    ipAddress: '45.12.98.110',
    location: 'Unknown Proxy',
    content: 'Delete this biased propaganda immediately!! Fake media spreads total lies!!',
    status: 'spam',
    createdAt: '4 hours ago',
    isToxic: true,
    actionLog: ['Flagged Spam']
  },
];

export const useCommentsStore = create<CommentsState>((set, get) => ({
  comments: INITIAL_COMMENTS,

  fetchComments: async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase comments fetch error:', error.message);
        return;
      }

      if (data && data.length > 0) {
        const mappedComments: CommentItem[] = data.map((item: any) => ({
          id: item.id,
          storyId: item.story_id,
          storyTitle: item.story_title,
          storySlug: item.story_slug,
          storyCategory: item.story_category || 'General',
          authorName: item.author_name,
          authorEmail: item.author_email,
          ipAddress: item.ip_address || '127.0.0.1',
          location: item.location || 'India',
          content: item.content,
          status: item.status || 'pending',
          createdAt: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isToxic: item.is_toxic || false,
          moderatedAt: item.updated_at,
          actionLog: item.action_log || ['Synced from Supabase']
        }));
        set({ comments: mappedComments });
      }
    } catch (e) {
      console.warn('Failed to sync comments from Supabase:', e);
    }
  },

  addComment: async (commentData) => {
    const id = `cmt-${Date.now()}`;
    const now = new Date().toISOString();
    const newComment: CommentItem = {
      ...commentData,
      id,
      status: 'pending',
      createdAt: 'Just now',
      isToxic: Boolean(commentData.content.match(/(stupid|fake|propaganda|crash|trash)/i)),
      actionLog: ['Created via Web']
    };

    set((state) => ({ comments: [newComment, ...state.comments] }));

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .insert({
            story_title: newComment.storyTitle,
            story_slug: newComment.storySlug,
            story_category: newComment.storyCategory,
            author_name: newComment.authorName,
            author_email: newComment.authorEmail,
            ip_address: newComment.ipAddress,
            location: newComment.location,
            content: newComment.content,
            status: 'pending',
            is_toxic: newComment.isToxic,
            action_log: ['Created via Web']
          })
          .select()
          .single();

        if (!error && data) {
          set((state) => ({
            comments: state.comments.map((c) => (c.id === id ? { ...c, id: data.id } : c))
          }));
        }
      } catch (e) {
        console.warn('Supabase comment insert failed, stored in local state:', e);
      }
    }

    return newComment;
  },

  updateStatus: async (id, newStatus) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logMessage = `Status updated to ${newStatus.toUpperCase()} by Admin at ${timeStr}`;

    set((state) => ({
      comments: state.comments.map((c) => {
        if (c.id === id) {
          const actionLog = c.actionLog ? [...c.actionLog, logMessage] : [logMessage];
          return { ...c, status: newStatus, moderatedAt: timeStr, actionLog };
        }
        return c;
      })
    }));

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('comments')
          .update({
            status: newStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
      } catch (e) {
        console.warn('Supabase comment status update warning:', e);
      }
    }
  },

  deleteComment: async (id) => {
    set((state) => ({ comments: state.comments.filter((c) => c.id !== id) }));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('comments').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase comment delete warning:', e);
      }
    }
  }
}));
