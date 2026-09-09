import React, { useEffect, useState } from 'react';
import { DEMO_VIDEOS, CATEGORIES } from '../data/demo';
import { useRouter, Link } from '../context/RouterContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { LeftSidebarNav } from '../components/LeftSidebarNav';
import { getVideoTitle, getVideoDescription, getCategoryName, formatViews } from '../utils/translations';
import { Play, Video, ChevronRight } from 'lucide-react';

export const VideoListPage: React.FC = () => {
  const { updateMetadata, lang, t } = useRouter();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  useEffect(() => {
    updateMetadata({
      title: `${t.videoBulletins} - ${t.appName}`,
      description: lang === 'en'
        ? 'Watch top news video bulletins, ground reports, press briefings, and cricket highlights 24x7.'
        : 'देश और दुनिया की बड़ी खबरों के विशेष वीडियो बुलेटिन, इंटरव्यू और ग्राउंड रिपोर्ट।'
    });
  }, [lang, t]);

  const filteredVideos = selectedCat === 'all'
    ? DEMO_VIDEOS
    : DEMO_VIDEOS.filter(v => v.categorySlug === selectedCat);

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-4 py-5 font-sans">
      <div className="flex gap-4 sm:gap-6 items-start">
        {/* Left Sticky Navigation Bar */}
        <LeftSidebarNav />

        {/* Main Video List Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-rose-600 transition-colors">{t.home}</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-semibold">{t.videoBulletins}</span>
          </nav>

          {/* Header Banner */}
          <div className="bg-zinc-950 text-white rounded-xl p-6 sm:p-8 mb-8 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shadow-lg">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {t.videoBulletins}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              {lang === 'en'
                ? 'Exclusive ground reports, official press meets, sports masterclasses, and verified video reports straight to your screen.'
                : 'ताज़ा समाचारों के विशेष वीडियो, ज़मीनी पड़ताल, प्रेस कॉन्फ्रेंस और खेल हाइलाइट्स सीधे आपकी स्क्रीन पर।'}
            </p>

            {/* Category Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCat('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  selectedCat === 'all' ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {lang === 'en' ? 'All Videos' : 'सभी वीडियो'}
              </button>
              {['national', 'cricket', 'politics', 'entertainment', 'tech', 'business', 'lifestyle'].map((catSlug) => {
                const catObj = CATEGORIES.find(c => c.slug === catSlug);
                const label = catObj ? getCategoryName(catObj, lang) : catSlug;
                return (
                  <button
                    key={catSlug}
                    type="button"
                    onClick={() => setSelectedCat(catSlug)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      selectedCat === catSlug ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => {
              const videoTitle = getVideoTitle(video, lang);
              const catObj = CATEGORIES.find(c => c.slug === video.categorySlug);
              const catLabel = catObj ? getCategoryName(catObj, lang) : video.categorySlug;

              return (
                <article key={video.id} className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
                  <Link href={`/videos/${video.idSlug}`} className="relative aspect-16/9 overflow-hidden block">
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={videoTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                      {video.duration}
                    </span>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white">
                      {catLabel}
                    </span>
                  </Link>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/videos/${video.idSlug}`}>
                        {videoTitle}
                      </Link>
                    </h4>
                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span>{formatViews(video.views, lang)}</span>
                      <span>{video.publishedAt}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
