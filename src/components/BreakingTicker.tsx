import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { Link, useRouter } from '../context/RouterContext';
import { getArticleTitle, getArticlePublishedAt } from '../utils/translations';
import { Radio, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useStoriesStore } from '../stores/storiesStore';
import { useUIStore } from '../stores/uiStore';

interface BreakingTickerProps {
  articles: Article[];
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ articles: propArticles }) => {
  const { lang } = useRouter();
  const { stories } = useStoriesStore();
  const { isBreakingNewsActive } = useUIStore();

  const dynamicBreaking = stories
    .filter(s => s.status === 'published' && s.isBreaking)
    .map(s => ({
      id: s.id,
      slug: s.slug || s.id,
      idSlug: s.slug || s.id,
      title: s.headline,
      titleEn: s.headline,
      excerpt: s.summary,
      category: s.section,
      categorySlug: (s.section || 'national').toLowerCase(),
      author: { name: s.byline, nameHi: s.byline, role: 'Journalist', avatar: '' },
      publishedAt: s.publishDate || s.createdAt,
      readTime: '3 min',
      coverImage: s.mainImage || '',
      tags: s.topics || [],
      body: [s.body],
      views: s.views || 100,
      isBreaking: true
    }));

  const propBreaking = propArticles.filter(a => a.isBreaking);
  const breakingList = dynamicBreaking.length > 0 ? dynamicBreaking : propBreaking;
  const items = breakingList.length > 0 ? breakingList : propArticles.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, items.length]);

  if (!isBreakingNewsActive || items.length === 0) return null;

  const currentArticle = items[currentIndex];
  if (!currentArticle) return null;

  const currentTitle = getArticleTitle(currentArticle as Article, lang);
  const publishedAt = getArticlePublishedAt(currentArticle as Article, lang);

  return (
    <div className="bg-zinc-950 text-white border-b border-zinc-800 relative z-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center h-11 sm:h-12 overflow-hidden">
        {/* Left Breaking Badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-rose-600 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-black tracking-wide uppercase shadow-sm">
          <Radio className="w-3.5 h-3.5 animate-pulse text-white" />
          <span className="hidden sm:inline">{lang === 'en' ? 'BREAKING NEWS:' : 'बड़ी खबर:'}</span>
          <span className="sm:hidden">BREAKING</span>
        </div>

        {/* Headline Display */}
        <div
          className="flex-1 min-w-0 px-3 sm:px-4 flex items-center overflow-hidden"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="truncate flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping shrink-0"></span>
            <Link
              href={`/news/${currentArticle.idSlug}`}
              className="text-xs sm:text-sm md:text-base font-bold text-gray-100 hover:text-rose-400 transition-colors truncate"
              title={currentTitle}
            >
              {currentTitle}
            </Link>
            {publishedAt && (
              <span className="hidden md:inline-block text-[11px] text-zinc-400 shrink-0 font-normal">
                • {publishedAt}
              </span>
            )}
          </div>
        </div>

        {/* Play/Pause & Nav Controls */}
        <div className="shrink-0 flex items-center gap-1 text-zinc-400 border-l border-zinc-800 pl-2 sm:pl-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-white transition-colors cursor-pointer rounded"
            title={isPlaying ? 'Pause Ticker' : 'Play Ticker'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setCurrentIndex((currentIndex - 1 + items.length) % items.length)}
            className="p-1 hover:text-white transition-colors cursor-pointer rounded"
            title="Previous Story"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentIndex((currentIndex + 1) % items.length)}
            className="p-1 hover:text-white transition-colors cursor-pointer rounded"
            title="Next Story"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
