import React from 'react';
import { Article, Category } from '../types';
import { Link, useRouter } from '../context/RouterContext';
import { getCategoryName } from '../utils/translations';
import { StoryCard } from './StoryCard';
import { ChevronRight } from 'lucide-react';

interface SectionBlockProps {
  category: Category;
  articles: Article[];
}

export const SectionBlock: React.FC<SectionBlockProps> = ({ category, articles }) => {
  const { lang, t } = useRouter();
  if (!articles || articles.length === 0) return null;

  const displayArticles = articles.slice(0, 3);
  const primaryTitle = lang === 'en' ? category.nameEn : category.nameHi;
  const secondaryTitle = lang === 'en' ? category.nameHi : category.nameEn;

  return (
    <section className="my-8">
      {/* Category Section Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-gray-200">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-rose-600 rounded-full inline-block"></span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-baseline gap-2">
            <span>{primaryTitle}</span>
            <span className="text-xs sm:text-sm font-semibold text-gray-500">/ {secondaryTitle}</span>
          </h2>
        </div>
        <Link
          href={`/category/${category.slug}`}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-800 transition-colors py-1 px-2.5 rounded-md hover:bg-rose-50"
        >
          <span>{t.viewMore}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3-Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {displayArticles.map((article) => (
          <StoryCard key={article.id} article={article} variant="grid" showCategory={false} />
        ))}
      </div>
    </section>
  );
};
