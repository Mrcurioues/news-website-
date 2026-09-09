import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { GlobalSearch } from '../GlobalSearch';
import { useUIStore } from '../../../stores/uiStore';
import { useAuthStore } from '../../../stores/authStore';
import { useStoriesStore } from '../../../stores/storiesStore';

interface AdminShellProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children, currentPath, onNavigate }) => {
  const { isSearchOpen, openSearch, closeSearch, notifications, unreadCount, markAsRead, markAllAsRead } = useUIStore();
  const { user, logout } = useAuthStore();
  const { stories } = useStoriesStore();

  const handleLogout = async () => {
    await logout();
    onNavigate('/admin/login');
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else openSearch();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isSearchOpen, openSearch, closeSearch]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] text-gray-900 antialiased">
      {/* Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        userRole={user.role}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar
          userName={user.name}
          userRole={user.role.toUpperCase()}
          unreadCount={unreadCount}
          notifications={notifications}
          onMarkAllRead={markAllAsRead}
          onMarkRead={markAsRead}
          onOpenSearch={openSearch}
          onNavigate={onNavigate}
          onWriteStory={() => onNavigate('/admin/stories/new')}
          onLogout={handleLogout}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onNavigate={onNavigate}
        stories={stories.map(s => ({
          id: s.id,
          headline: s.headline,
          section: s.section,
          status: s.status
        }))}
      />
    </div>
  );
};
