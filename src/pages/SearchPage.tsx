import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, searchArticles } from '../data/demo';
import { useRouter, useSearchParams } from '../context/RouterContext';
import { StoryCard } from '../components/StoryCard';
import { LeftSidebarNav } from '../components/LeftSidebarNav';
import { getCategoryName } from '../utils/translations';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';
import { LiveBengaliTranslation } from '../components/LiveBengaliTranslation';

export const SearchPage: React.FC = () => {
  const { updateMetadata, push, lang, t } = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'views'>('latest');

  useEffect(() => {
    updateMetadata({
      title: query
        ? (lang === 'en' ? `Search: ${query} - ${t.appName}` : `खोज परिणाम: ${query} - ${t.appName}`)
        : `${t.searchPortal} - ${t.appName}`,
      description: lang === 'en'
        ? 'Search breaking headlines, reports, analysis, and multimedia on Bharat News Live.'
        : 'भारत समाचार लाइव पर अपनी पसंदीदा खबरें, विषय और वीडियो खोजें।'
    });
  }, [query, lang, t]);

  // Sync state if URL query changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
  }, [searchParams.toString()]);

  const results = useMemo(() => {
    const list = searchArticles(query, selectedCategory === 'all' ? undefined : selectedCategory);
    if (sortBy === 'views') {
      return [...list].sort((a, b) => b.views - a.views);
    }
    return list;
  }, [query, selectedCategory, sortBy]);

  const handleClear = () => {
    setQuery('');
    push('/search');
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    push(val ? `/search?q=${encodeURIComponent(val)}` : '/search');
  };

  const suggestions = lang === 'en'
    ? ['Gaganyaan', 'IND vs AUS', 'Clean Energy', 'Repo Rate', 'Quantum', 'Bullet Train']
    : ['गगनयान', 'IND vs AUS', 'ग्रीन हाइड्रोजन', 'रेपो रेट', 'क्वांटम', 'बुलेट ट्रेन'];

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-4 py-5 font-sans">
      <div className="flex gap-4 sm:gap-6 items-start">
        {/* Left Sticky Navigation Bar */}
        <LeftSidebarNav />

        {/* Main Search Page Area */}
        <div className="flex-1 min-w-0">
          {/* Search Header Container */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-8 shadow-xs">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 flex items-center gap-2">
              <Search className="w-7 h-7 text-rose-600" />
              {t.searchPortal}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              {lang === 'en'
                ? 'Instant search across breaking news, sports, entertainment, politics, and video bulletins.'
                : 'ताज़ा ख़बरों, राजनीति, व्यापार, खेल और मनोरंजन में तुरंत खोजें。'}
            </p>

            {/* Input Form */}
            <div className="relative max-w-3xl mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder={lang === 'en' ? 'Type keywords (e.g. Cricket, Election, Tech)...' : 'कीवर्ड टाइप करें (जैसे: क्रिकेट, चुनाव, बजट)...'}
                className="w-full pl-11 pr-10 py-3 text-base border-2 border-rose-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-100 transition-all font-medium text-gray-900 placeholder-gray-400 bg-white"
                autoFocus
              />
              <Search className="w-5 h-5 text-rose-600 absolute left-4 top-1/2 -translate-y-1/2" />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Trending Suggestions */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-gray-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-rose-600" />
                {lang === 'en' ? 'Trending Searches:' : 'लोकप्रिय खोजें:'}
              </span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleQueryChange(s)}
                  className="bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  #{s}
                </button>
              ))}
            </div>

            {/* Filter Toolbar */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-rose-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.allCategories}
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedCategory === cat.slug
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getCategoryName(cat, lang)}
                  </button>
                ))}
              </div>

              {/* Sort By Toggle */}
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 ml-auto">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <span>{lang === 'en' ? 'Sort:' : 'क्रम:'}</span>
                <button
                  type="button"
                  onClick={() => setSortBy('latest')}
                  className={`px-2.5 py-1 rounded font-bold cursor-pointer ${
                    sortBy === 'latest' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {lang === 'en' ? 'Latest' : 'नवीनतम'}
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('views')}
                  className={`px-2.5 py-1 rounded font-bold cursor-pointer ${
                    sortBy === 'views' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {lang === 'en' ? 'Popularity' : 'लोकप्रियता'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              {query
                ? (lang === 'en' ? `Results for "${query}"` : `"${query}" के परिणाम`)
                : (lang === 'en' ? 'All Latest Stories' : 'सभी ताज़ा ख़बरें')}
            </h2>
            <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full">
              {results.length} {t.resultsFound}
            </span>
          </div>

          {/* Results Grid */}
          {results.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center my-6">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{t.noResults}</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">
                {lang === 'en'
                  ? 'Please try different keywords, check spelling, or clear category filters.'
                  : 'कृपया कोई दूसरा कीवर्ड या वर्तनी जांचकर पुनः प्रयास करें。'}
              </p>
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 cursor-pointer"
              >
                {lang === 'en' ? 'View All News' : 'सभी खबरें देखें'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <StoryCard key={article.id} article={article} variant="grid" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
