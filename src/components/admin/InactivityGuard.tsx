import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { supabase, isSupabaseConfigured } from '../../services/supabase';
import { toast } from 'react-hot-toast';

interface InactivityGuardProps {
  children: React.ReactNode;
  onNavigate: (path: string) => void;
  timeoutMs?: number; // default 60,000ms = 1 min
}

export const InactivityGuard: React.FC<InactivityGuardProps> = ({
  children,
  onNavigate,
  timeoutMs = 60000, // 1 minute inactivity auto-logout
}) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        if (isSupabaseConfigured()) {
          supabase.from('security_logs').insert({
            event_type: 'INACTIVITY_AUTO_LOGOUT',
            user_email: user?.email || 'admin',
            details: 'Automatically logged out due to 1 minute of inactivity',
          }).then();
        }
        await logout();
        toast.error('⏰ Session Expired: Automatically logged out due to 1 minute of inactivity for security. Please login again.', {
          duration: 7000,
          id: 'auto-logout-inactivity-toast',
        });
        onNavigate('/admin/login');
      }, timeoutMs);
    };

    // Initialize timer
    resetTimer();

    // User activity listeners across window
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart', 'mousewheel'];

    const handleUserActivity = () => {
      resetTimer();
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isAuthenticated, logout, onNavigate, timeoutMs]);

  return <>{children}</>;
};
