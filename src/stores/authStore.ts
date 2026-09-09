// =====================================================
// NEWSROOM CMS — AUTH STORE (NO localStorage, Supabase Auth)
// =====================================================

import { create } from 'zustand';
import { AdminUser } from '../types/admin';
import { SEED_USERS } from './seedData';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthState {
  user: AdminUser;
  isAuthenticated: boolean;
  setUser: (user: AdminUser) => void;
  logout: () => Promise<void>;
  checkSupabaseAuth: () => Promise<boolean>;
}

const DEFAULT_ADMIN: AdminUser = SEED_USERS[0]; // Amit Sharma (Admin)

export const useAuthStore = create<AuthState>((set) => ({
  user: DEFAULT_ADMIN,
  isAuthenticated: false, // Default false: requires login to access /admin

  setUser: (user) => set({ user, isAuthenticated: true }),

  logout: async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    set({ user: DEFAULT_ADMIN, isAuthenticated: false });
  },

  checkSupabaseAuth: async () => {
    // If already authenticated in memory (e.g. via login form), preserve state
    if (useAuthStore.getState().isAuthenticated) {
      return true;
    }

    if (!isSupabaseConfigured()) {
      return false;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      set({
        user: {
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Admin',
          email: session.user.email || 'admin@bharatsamachar.com',
          role: 'admin',
          isActive: true,
          storiesCount: 12,
          joinedAt: session.user.created_at,
        },
        isAuthenticated: true,
      });
      return true;
    }
    
    set({ isAuthenticated: false });
    return false;
  },
}));
