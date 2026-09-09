import React from 'react';
import { Article } from '../types';
import { Link, useRouter } from '../context/RouterContext';
import { ImageWithFallback } from './ImageWithFallback';
import {
  getArticleTitle,
  getArticleExcerpt,
  getArticleAuthorName,
  getArticleReadTime,
  getArticlePublishedAt,
  getCategoryName,
  formatViews
} from '../utils/translations';
import { Clock, Eye, Flame, Radio } from 'lucide-react';

import { stripMarkdown } from '../utils/markdownRenderer';

interface StoryCardProps {
  article: Article;
  variant?: 'hero' | 'secondary' | 'grid' | 'compact' | 'horizontal';
  showCategory?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  article,
  variant = 'grid',
  showCategory = true
}) => {
  const { lang, t } = useRouter();

  const title = stripMarkdown(getArticleTitle(article, lang));
  const excerpt = stripMarkdown(getArticleExcerpt(article, lang));
  const authorName = getArticleAuthorName(article, lang);
  const readTime = getArticleReadTime(article, lang);
  const publishedAt = getArticlePublishedAt(article, lang);
  const categoryLabel = getCategoryName({ slug: article.categorySlug, nameHi: article.category }, lang);

  // Hero Variant (Lead Top Story)
  if (variant === 'hero') {
    return (
      <article className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-2xl">
        <Link href={`/news/${article.idSlug}`} className="block relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden">
          <ImageWithFallback
            src={article.coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            {article.isBreaking && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider animate-pulse shadow-md">
                <Radio className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'BREAKING NEWS' : 'बड़ी खबर / BREAKING'}</span>
              </span>
            )}
            {showCategory && (
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-semibold border border-white/20">
                {categoryLabel}
              </span>
            )}
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight text-white group-hover:text-rose-300 transition-colors drop-shadow-md">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-200 line-clamp-2 max-w-4xl drop-shadow-xs">
              {excerpt}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <img
                  src={article.author.avatar}
                  alt={authorName}
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                />
                <span className="font-medium text-white">{authorName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                <span>{formatViews(article.views, lang)}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[11px] text-gray-200">
                {readTime}
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Compact Variant (for Trending / Sidebar list)
  if (variant === 'compact') {
    return (
      <article className="group flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/80 p-2 rounded-lg transition-colors">
        <Link href={`/news/${article.idSlug}`} className="shrink-0 w-20 h-20 sm:w-24 sm:h-20 rounded-md overflow-hidden bg-gray-100 relative">
          <ImageWithFallback
            src={article.coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.isBreaking && (
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-rose-600 text-[10px] text-white font-bold">
              LIVE
            </span>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          {showCategory && (
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wide">
              {categoryLabel}
            </span>
          )}
          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors mt-0.5">
            <Link href={`/news/${article.idSlug}`}>{title}</Link>
          </h4>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {publishedAt.split(',')[0]}
            </span>
            {article.isTrending && (
              <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                {lang === 'en' ? 'Trending' : 'ट्रेंडिंग'}
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Horizontal Variant (Wide category list view)
  if (variant === 'horizontal') {
    return (
      <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row">
        <Link href={`/news/${article.idSlug}`} className="sm:w-2/5 shrink-0 aspect-16/9 sm:aspect-auto relative overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={article.coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.isBreaking && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-600 text-[11px] text-white font-bold">
              {lang === 'en' ? 'Breaking' : 'ब्रेकिंग न्यूज़'}
            </span>
          )}
        </Link>
        <div className="p-4 sm:p-5 sm:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-xs font-bold">
                {categoryLabel}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {publishedAt}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors leading-snug line-clamp-2">
              <Link href={`/news/${article.idSlug}`}>{title}</Link>
            </h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {excerpt}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium text-gray-700">{authorName}</span>
            <span className="text-rose-600 font-semibold group-hover:underline">
              {t.readMore}
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Secondary Variant (Featured secondary stories)
  if (variant === 'secondary') {
    return (
      <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col h-full">
        <Link href={`/news/${article.idSlug}`} className="relative aspect-16/9 w-full overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={article.coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.isBreaking && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-600 text-[11px] text-white font-bold shadow-xs">
              {lang === 'en' ? 'Breaking' : 'ब्रेकिंग'}
            </span>
          )}
          {showCategory && (
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[11px] text-white font-medium">
              {categoryLabel}
            </span>
          )}
        </Link>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
              <Link href={`/news/${article.idSlug}`}>{title}</Link>
            </h3>
            <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>{publishedAt.split(',')[0]}</span>
            <span className="text-gray-400">{readTime}</span>
          </div>
        </div>
      </article>
    );
  }

  // Standard Grid Variant (Default 3-column card)
  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <Link href={`/news/${article.idSlug}`} className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={article.coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showCategory && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-rose-600 text-[11px] font-bold text-white shadow-xs">
            {categoryLabel}
          </span>
        )}
        {article.isTrending && (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-[11px] font-bold text-white flex items-center gap-1 shadow-xs">
            <Flame className="w-3 h-3 fill-white" />
            {lang === 'en' ? 'Hot' : 'हॉट'}
          </span>
        )}
      </Link>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
            <Link href={`/news/${article.idSlug}`}>{title}</Link>
          </h3>
          <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center gap-1 text-gray-500">
            <Clock className="w-3 h-3" />
            {publishedAt.split(',')[0]}
          </span>
          <span className="text-gray-400">{readTime}</span>
        </div>
      </div>
    </article>
  );
};
