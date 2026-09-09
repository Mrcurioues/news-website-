import React, { useState, useEffect } from 'react';
import { CATEGORIES, getArticlesByCategory, getTrendingArticles } from '../data/demo';
import { Article } from '../types';
import { useRouter, Link } from '../context/RouterContext';
import { StoryCard } from '../components/StoryCard';
import { TrendingWidget } from '../components/TrendingWidget';
import { AdSlot } from '../components/AdSlot';
import { LeftSidebarNav } from '../components/LeftSidebarNav';
import { getCategoryName, getCategoryDescription } from '../utils/translations';
import { ChevronRight, ArrowDownCircle, Layers } from 'lucide-react';
import { useStoriesStore } from '../stores/storiesStore';

interface CategoryPageProps {
  slug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug }) => {
  const { updateMetadata, lang, t } = useRouter();
  const { stories } = useStoriesStore();

  const category = CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || {
    id: 'unknown',
    slug,
    nameHi: slug.toUpperCase(),
    nameEn: slug,
    description: 'श्रेणी समाचार',
    color: 'bg-rose-600'
  };

  const categoryName = getCategoryName(category, lang);
  const categoryDesc = getCategoryDescription(category.slug, category.description || '', lang);

  const dynamicArticles: Article[] = stories
    .filter(s => s.status === 'published')
    .filter(s => {
      const sec = (s.section || '').toLowerCase();
      const cat = slug.toLowerCase();
      return sec === cat || sec.includes(cat) || cat.includes(sec);
    })
    .map(s => ({
      id: s.id,
      slug: s.slug || s.id,
      idSlug: s.slug || s.id,
      title: s.headline,
      titleEn: s.headline,
      excerpt: s.summary,
      excerptEn: s.summary,
      category: s.section || category.nameEn,
      categorySlug: slug,
      author: {
        name: s.byline || 'Staff Reporter',
        nameHi: s.byline || 'संवाददाता',
        role: 'Journalist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      },
      publishedAt: s.publishDate || s.createdAt,
      readTime: '3 मिनट',
      readTimeEn: '3 min read',
      coverImage: s.mainImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
      imageCaption: s.mainImageCaption || '',
      tags: s.topics || ['News'],
      body: [s.body],
      bodyEn: [s.body],
      isBreaking: s.isBreaking,
      isFeatured: s.isFeatured,
      isTrending: s.isTrending,
      views: s.views || 100,
    }));

  const staticArticles = getArticlesByCategory(slug);
  const allCategoryArticles = [...dynamicArticles, ...staticArticles];

  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    updateMetadata({
      title: `${categoryName} - ${t.appName}`,
      description: categoryDesc
    });
    setVisibleCount(6);
  }, [slug, lang, categoryName, categoryDesc, updateMetadata]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 350);
  };

  const displayedArticles = allCategoryArticles.slice(0, visibleCount);
  const trendingArticles = getTrendingArticles(5);

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-4 py-5 font-sans">
      <div className="flex gap-4 sm:gap-6 items-start">
        {/* Left Sticky Navigation Bar */}
        <LeftSidebarNav />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-rose-600 transition-colors">{t.home}</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-semibold">{categoryName}</span>
          </nav>

          {/* Category Banner Header */}
          <header className="mb-8 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-4 h-4 rounded-full ${category.color || 'bg-rose-600'}`}></span>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-950 font-serif tracking-tight">
                {categoryName}
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              {categoryDesc}
            </p>
          </header>

          {/* Grid Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Feed (8 Cols) */}
            <main className="lg:col-span-8">
              {allCategoryArticles.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center my-6 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {lang === 'en' ? 'No Articles Found' : 'कोई समाचार नहीं मिला'}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    {lang === 'en'
                      ? 'No published stories available in this category yet. Check back soon.'
                      : 'इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है। कृपया थोड़ी देर बाद देखें।'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {displayedArticles.map((article) => (
                    <StoryCard key={article.id} article={article} variant="grid" />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {visibleCount < allCategoryArticles.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
                  >
                    <ArrowDownCircle className="w-4 h-4 text-rose-600" />
                    {isLoadingMore ? 'Loading…' : 'Load More Stories'}
                  </button>
                </div>
              )}
            </main>

            {/* Sidebar (4 Cols) */}
            <aside className="lg:col-span-4 space-y-6">
              <TrendingWidget articles={trendingArticles} />
              <AdSlot format="square" slotName="Category Sidebar Ad" />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
