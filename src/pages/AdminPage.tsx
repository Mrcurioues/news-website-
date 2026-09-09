import React, { useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { AdminShell } from '../components/admin/layout/AdminShell';
import { DashboardPage } from './admin/DashboardPage';
import { StoriesPage } from './admin/StoriesPage';
import { StoryEditorPage } from './admin/StoryEditorPage';
import { MediaPage } from './admin/MediaPage';
import { HomepagePage } from './admin/HomepagePage';
import { CommentsPage } from './admin/CommentsPage';
import { AnalyticsPage } from './admin/AnalyticsPage';
import { SettingsPage } from './admin/SettingsPage';
import { PluginsPage } from './admin/PluginsPage';
import { SeoEnginePage } from './admin/SeoEnginePage';
import { LoginPage } from './admin/LoginPage';
import { useAuthStore } from '../stores/authStore';
import { useSiteConfigStore } from '../stores/siteConfigStore';
import { InactivityGuard } from '../components/admin/InactivityGuard';

export const AdminPage: React.FC = () => {
  const { path, push } = useRouter();
  const { isAuthenticated, checkSupabaseAuth } = useAuthStore();
  const { config } = useSiteConfigStore();

  useEffect(() => {
    checkSupabaseAuth();
  }, []);

  if (path === '/admin/login' || (!isAuthenticated && path.startsWith('/admin'))) {
    return <LoginPage onNavigate={push} />;
  }

  const renderContent = () => {
    // Stories editor — /admin/stories/new OR /admin/stories/:id
    if (path.startsWith('/admin/stories/')) {
      const storyId = path.replace('/admin/stories/', '');
      return <StoryEditorPage storyId={storyId} onNavigate={push} />;
    }
    // Stories list — /admin/stories
    if (path === '/admin/stories' || path.startsWith('/admin/stories?')) {
      return <StoriesPage onNavigate={push} />;
    }
    // Media
    if (path.startsWith('/admin/media')) {
      return <MediaPage onNavigate={push} />;
    }
    // Homepage layout editor
    if (path === '/admin/homepage' || path.startsWith('/admin/homepage?')) {
      return <HomepagePage onNavigate={push} />;
    }
    // Breaking news manager (under homepage)
    if (path.startsWith('/admin/homepage/breaking')) {
      return (
        <div className="p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Breaking News Manager</h1>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <div className="text-base font-semibold text-gray-800">2 Breaking Stories Active</div>
            <div className="text-sm text-gray-500 mt-2 mb-6">Managing live breaking news alerts</div>
            <button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors">
              Deactivate All Breaking News
            </button>
          </div>
        </div>
      );
    }
    // Audience: Comments
    if (path.startsWith('/admin/audience/comments')) {
      return <CommentsPage onNavigate={push} />;
    }
    // Audience: other
    if (path.startsWith('/admin/audience')) {
      return (
        <div className="p-8 max-w-xl mx-auto text-center mt-16">
          <div className="text-4xl mb-4">🚧</div>
          <h2 className="text-xl font-bold text-gray-900">Audience Tools</h2>
          <p className="text-gray-500 mt-2">Newsletters, push notifications, and subscriber management coming soon.</p>
          <button onClick={() => push('/admin/audience/comments')} className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-rose-700 font-semibold shadow-xs">View Comments</button>
        </div>
      );
    }
    // Analytics
    if (path.startsWith('/admin/analytics')) {
      return <AnalyticsPage onNavigate={push} />;
    }
    // Bengali SEO Engine & Automated CMS
    if (path.startsWith('/admin/seo-engine')) {
      return <SeoEnginePage onNavigate={push} />;
    }
    // Plugins & Addons
    if (path.startsWith('/admin/plugins')) {
      return <PluginsPage onNavigate={push} />;
    }
    // Settings
    if (path.startsWith('/admin/settings')) {
      return <SettingsPage onNavigate={push} />;
    }
    // Dashboard (default: /admin)
    return <DashboardPage onNavigate={push} />;
  };

  // Story editor gets a full-screen layout (no standard shell header)
  const isFullScreenEditor = path.startsWith('/admin/stories/');

  return (
    <InactivityGuard onNavigate={push} timeoutMs={60000}>
      {isFullScreenEditor ? (
        <div className="flex h-screen overflow-hidden bg-[#F8FAFC] text-gray-900 antialiased">
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 hidden md:flex">
            {/* Minimal sidebar in editor mode */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
              <button onClick={() => push('/admin')} className="text-lg font-bold text-gray-900 tracking-tight hover:text-rose-600 cursor-pointer flex items-center gap-2">
                {config.logoUrl ? (
                  <img src={config.logoUrl} alt={config.appNameEn} className="h-9 w-auto max-w-[120px] object-contain rounded" />
                ) : (
                  <span className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white text-sm font-black">{config.logoBadgeText || 'भा'}</span>
                )}
                <span className="truncate">{config.appNameEn || config.appNameHi || 'Newsroom'}</span>
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {[
                { label: '← Back to Stories', path: '/admin/stories' },
                { label: 'All Stories', path: '/admin/stories' },
                { label: 'Write New Story', path: '/admin/stories/new' },
              ].map(item => (
                <button key={item.path + item.label} onClick={() => push(item.path)} className="w-full text-left text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-700 px-3 py-2 rounded-lg cursor-pointer transition-colors">{item.label}</button>
              ))}
            </nav>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {renderContent()}
          </div>
        </div>
      ) : (
        <AdminShell currentPath={path} onNavigate={push}>
          {renderContent()}
        </AdminShell>
      )}
    </InactivityGuard>
  );
};
