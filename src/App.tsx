import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { getAllArticles } from './data/demo';
import { Header } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { PluginsInjector } from './components/PluginsInjector';

// Pages
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { VideoListPage } from './pages/VideoListPage';
import { VideoDetailPage } from './pages/VideoDetailPage';
import { PhotoListPage } from './pages/PhotoListPage';
import { PhotoDetailPage } from './pages/PhotoDetailPage';
import { AdminPage } from './pages/AdminPage';

import { useStoriesStore } from './stores/storiesStore';
import { useMediaStore } from './stores/mediaStore';
import { useSiteConfigStore } from './stores/siteConfigStore';
import { useArticleProtection } from './hooks/useArticleProtection';

function AppContent() {
  useArticleProtection();
  const { path, push } = useRouter();
  const allArticles = getAllArticles();
  const fetchStories = useStoriesStore((s) => s.fetchFromSupabase);
  const fetchMedia = useMediaStore((s) => s.fetchFromSupabase);
  const fetchSiteConfig = useSiteConfigStore((s) => s.fetchFromSupabase);
  const primaryColor = useSiteConfigStore((s) => s.config.primaryColor || '#e11d48');

  // Apply theme dynamic color variable to DOM
  React.useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', primaryColor);
  }, [primaryColor]);

  // Initialize and sync Supabase data on mount
  React.useEffect(() => {
    fetchStories();
    fetchMedia();
    fetchSiteConfig();
    const unsubscribeBranding = useSiteConfigStore.getState().subscribeToRealtimeBranding();
    return () => unsubscribeBranding();
  }, [fetchStories, fetchMedia, fetchSiteConfig]);

  // Redirect /wp-admin → /admin
  React.useEffect(() => {
    if (path.startsWith('/wp-admin')) {
      push('/admin');
    }
  }, [path, push]);

  const isAdmin = path.startsWith('/admin') || path.startsWith('/wp-admin');

  const renderRoute = () => {
    if (path === '/' || path === '') return <HomePage />;
    if (path.startsWith('/search')) return <SearchPage />;
    if (isAdmin) return <AdminPage />;
    if (path.startsWith('/videos/')) return <VideoDetailPage idSlug={path.replace('/videos/', '')} />;
    if (path === '/videos') return <VideoListPage />;
    if (path.startsWith('/photos/')) return <PhotoDetailPage idSlug={path.replace('/photos/', '')} />;
    if (path === '/photos') return <PhotoListPage />;
    if (path.startsWith('/news/')) return <ArticlePage idSlug={path.replace('/news/', '')} />;
    if (path.startsWith('/category/')) return <CategoryPage slug={path.replace('/category/', '')} />;
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-2">404 — Page Not Found</h1>
        <a href="/" className="inline-block mt-4 px-6 py-2.5 bg-rose-600 text-white rounded-lg font-bold text-sm hover:bg-rose-700 transition-colors">
          Go Home
        </a>
      </div>
    );
  };

  // Admin pages — full screen, no public header/footer
  if (isAdmin) {
    return (
      <>
        <PluginsInjector />
        <Toaster position="top-right" />
        {renderRoute()}
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 selection:bg-rose-500 selection:text-white">
      <PluginsInjector />
      <Toaster position="top-right" />
      <Header />
      <BreakingTicker articles={allArticles} />
      <main className="flex-1">
        {renderRoute()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <PluginsInjector />
      <AppContent />
    </RouterProvider>
  );
}
