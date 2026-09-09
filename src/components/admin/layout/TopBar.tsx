import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, LogOut, User, Settings, Plus } from 'lucide-react';

interface TopBarProps {
  userName: string;
  userRole: string;
  unreadCount: number;
  notifications: Array<{ id: string; title: string; message: string; isRead: boolean; createdAt: string }>;
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
  onOpenSearch: () => void;
  onNavigate: (path: string) => void;
  onWriteStory: () => void;
  onLogout?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  userName, userRole, unreadCount, notifications,
  onMarkAllRead, onMarkRead, onOpenSearch, onNavigate, onWriteStory, onLogout
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const formatTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const notifIcon: Record<string, string> = {
    approval_request: '📋', changes_requested: '✏️', deadline: '⏰',
    published: '✅', breaking: '🔴', comment: '💬', traffic_spike: '📈', system: '⚙️'
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20">
      {/* Left — Search */}
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-2 bg-gray-50 hover:bg-rose-50/50 border border-gray-200 hover:border-rose-200 rounded-lg px-4 py-2 text-sm text-gray-500 transition-colors cursor-pointer w-72"
      >
        <Search className="w-4 h-4 text-gray-400" />
        <span>Search stories, authors…</span>
        <span className="ml-auto flex items-center gap-0.5 text-xs text-gray-400">
          <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-[11px]">⌘</kbd>
          <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-[11px]">K</kbd>
        </span>
      </button>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">
        {/* Write Story (Matching website rose CTA) */}
          <button
            onClick={() => onNavigate('/admin/stories/new')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Article Writing</span>
          </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-900">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={onMarkAllRead} className="text-xs text-rose-600 hover:text-rose-800 cursor-pointer font-medium">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-sm">All caught up! ✓</div>
                ) : (
                  notifications.slice(0, 10).map(n => (
                    <button
                      key={n.id}
                      onClick={() => onMarkRead(n.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex gap-3 border-b border-gray-50 last:border-0 cursor-pointer ${!n.isRead ? 'bg-rose-50/40' : ''}`}
                    >
                      <span className="text-lg shrink-0">{notifIcon[(n as any).type] || '🔔'}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm ${!n.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{n.title}</div>
                        <div className="text-xs text-gray-500 truncate">{n.message}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{formatTime(n.createdAt)}</div>
                      </div>
                      {!n.isRead && <div className="w-2 h-2 bg-rose-600 rounded-full shrink-0 mt-1.5" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-full pl-1 pr-2 py-1 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-sm font-medium text-gray-900 leading-tight">{userName}</div>
              <div className="text-xs text-gray-500 capitalize">{userRole}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
              <div className="py-1">
                <button onClick={() => { onNavigate('/admin/settings'); setProfileOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button onClick={() => { onNavigate('/admin/settings?tab=profile'); setProfileOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <User className="w-4 h-4" /> My Profile
                </button>
                <hr className="my-1 border-gray-100" />
                <button onClick={onLogout} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 cursor-pointer font-medium">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
