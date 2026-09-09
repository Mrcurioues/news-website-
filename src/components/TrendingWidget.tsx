import React from 'react';
import { Article } from '../types';
import { Link, useRouter } from '../context/RouterContext';
import { getArticleTitle, getCategoryName, getArticleReadTime, formatViews } from '../utils/translations';
import { Flame, TrendingUp, Tag } from 'lucide-react';

interface TrendingWidgetProps {
  articles: Article[];
}

export const TrendingWidget: React.FC<TrendingWidgetProps> = ({ articles }) => {
  const { lang, t } = useRouter();
  const topArticles = articles.slice(0, 5);

  const trendingTagsHi = [
    { tag: 'ISRO', link: '/search?q=ISRO' },
    { tag: 'IND vs AUS', link: '/search?q=AUS' },
    { tag: 'गगनयान', link: '/search?q=गगनयान' },
    { tag: 'ग्रीन हाइड्रोजन', link: '/search?q=हाइड्रोजन' },
    { tag: 'RBI रेपो रेट', link: '/search?q=RBI' },
    { tag: 'क्वांटम सुपरकंप्यूटर', link: '/search?q=क्वांटम' },
    { tag: 'बुलेट ट्रेन', link: '/search?q=ट्रेन' }
  ];

  const trendingTagsEn = [
    { tag: 'ISRO', link: '/search?q=ISRO' },
    { tag: 'IND vs AUS', link: '/search?q=AUS' },
    { tag: 'Gaganyaan', link: '/search?q=Gaganyaan' },
    { tag: 'Green Energy', link: '/search?q=Hydrogen' },
    { tag: 'RBI Repo Rate', link: '/search?q=RBI' },
    { tag: 'Quantum AI', link: '/search?q=Quantum' },
    { tag: 'Bullet Train', link: '/search?q=Train' }
  ];

  const activeTags = lang === 'en' ? trendingTagsEn : trendingTagsHi;

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-xs">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2 text-gray-900 font-extrabold text-base sm:text-lg">
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span>{t.trending}</span>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
          <Flame className="w-3 h-3 fill-rose-600 text-rose-600 animate-pulse" />
          TOP 5
        </span>
      </div>

      {/* Numbered List */}
      <div className="space-y-3.5">
        {topArticles.map((article, idx) => {
          const title = getArticleTitle(article, lang);
          const catName = getCategoryName({ slug: article.categorySlug, nameHi: article.category }, lang);
          const readTime = getArticleReadTime(article, lang);

          return (
            <div key={article.id} className="flex items-start gap-3 group pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              {/* Rank Number Badge */}
              <div
                className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm transition-transform group-hover:scale-110 ${
                  idx === 0
                    ? 'bg-rose-600 text-white shadow-xs shadow-rose-200'
                    : idx === 1
                    ? 'bg-orange-500 text-white'
                    : idx === 2
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 font-semibold'
                }`}
              >
                {idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wide">
                  {catName}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors mt-0.5">
                  <Link href={`/news/${article.idSlug}`}>{title}</Link>
                </h4>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-500">
                  <span>{formatViews(article.views, lang)}</span>
                  <span>•</span>
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hot Topics / Trending Tags */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-2.5">
          <Tag className="w-3.5 h-3.5 text-gray-400" />
          <span>{lang === 'en' ? 'Trending Topics:' : 'लोकप्रिय विषय (Trending Tags):'}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeTags.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              #{item.tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
