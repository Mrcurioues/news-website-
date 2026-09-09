// =====================================================
// NEWSROOM CMS — UI STORE (NO localStorage)
// =====================================================

import { create } from 'zustand';
import { Notification } from '../types/admin';
import { SEED_NOTIFICATIONS } from './seedData';

interface UIState {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  onboardingStep: number;
  onboardingComplete: boolean;
  completeOnboarding: () => void;
  nextOnboardingStep: () => void;
  isBreakingNewsActive: boolean;
  toggleBreakingNews: () => void;
}

const generateId = () => `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const countUnread = (notifications: Notification[]) => notifications.filter((n) => !n.isRead).length;

export const useUIStore = create<UIState>((set) => ({
  notifications: SEED_NOTIFICATIONS,
  unreadCount: countUnread(SEED_NOTIFICATIONS),

  markAsRead: (id) => {
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return { notifications: updated, unreadCount: countUnread(updated) };
    });
  },

  markAllAsRead: () => {
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, isRead: true }));
      return { notifications: updated, unreadCount: 0 };
    });
  },

  addNotification: (n) => {
    const now = new Date().toISOString();
    const newNotif: Notification = {
      ...n,
      id: generateId(),
      isRead: false,
      createdAt: now,
    };
    set((state) => {
      const updated = [newNotif, ...state.notifications];
      return { notifications: updated, unreadCount: countUnread(updated) };
    });
  },

  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  onboardingStep: 1,
  onboardingComplete: false,
  completeOnboarding: () => set({ onboardingComplete: true }),
  nextOnboardingStep: () =>
    set((state) => ({ onboardingStep: Math.min(state.onboardingStep + 1, 8) })),

  isBreakingNewsActive: true,
  toggleBreakingNews: () => set((state) => ({ isBreakingNewsActive: !state.isBreakingNewsActive })),
}));
