import React, { useEffect } from 'react';
import { getVideoByIdSlug, DEMO_VIDEOS } from '../data/demo';
import { useRouter, Link } from '../context/RouterContext';
import { ShareBar } from '../components/ShareBar';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { getVideoTitle, getVideoDescription, getCategoryName, formatViews } from '../utils/translations';
import { ChevronRight, Play, Eye, Clock, ArrowLeft, Video } from 'lucide-react';

interface VideoDetailPageProps {
  idSlug: string;
}

export const VideoDetailPage: React.FC<VideoDetailPageProps> = ({ idSlug }) => {
  const { updateMetadata, lang, t } = useRouter();
  const video = getVideoByIdSlug(idSlug);

  useEffect(() => {
    if (video) {
      const title = getVideoTitle(video, lang);
      const desc = getVideoDescription(video, lang);
      updateMetadata({
        title: `${title} - ${t.appName}`,
        description: desc,
        ogImage: video.thumbnail
      });
    }
  }, [video, lang, t]);

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-gray-900 mb-4">
          {lang === 'en' ? 'Video Not Available' : 'वीडियो उपलब्ध नहीं है'}
        </h1>
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-lg font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToVideos}</span>
        </Link>
      </div>
    );
  }

  const title = getVideoTitle(video, lang);
  const description = getVideoDescription(video, lang);
  const categoryLabel = getCategoryName({ slug: video.categorySlug, nameHi: video.category }, lang);
  const nextVideos = DEMO_VIDEOS.filter(v => v.id !== video.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-rose-600 transition-colors">{t.home}</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href="/videos" className="hover:text-rose-600 transition-colors">{t.videos}</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="truncate max-w-[200px] sm:max-w-md text-gray-900 font-semibold">{title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Video Player & Details (8 Cols) */}
        <div className="lg:col-span-8">
          {/* 16:9 Responsive YouTube Video Player */}
          <div className="relative aspect-16/9 w-full bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Metadata Box */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs">
                {categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-mono">
                {lang === 'en' ? 'Duration:' : 'अवधि:'} {video.duration}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-gray-950 leading-snug">
              {title}
            </h1>

            <div className="mt-4 py-3 border-y border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-medium text-gray-700">
                  <Eye className="w-4 h-4 text-gray-400" />
                  {formatViews(video.views, lang)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {video.publishedAt}
                </span>
              </div>
            </div>

            {/* Share Bar */}
            <ShareBar title={title} />

            {/* Video Description */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-sm text-gray-900 mb-2">
                {lang === 'en' ? 'Description:' : 'विवरण (Description):'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Rail: Next Videos (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
            <h3 className="font-extrabold text-base text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Video className="w-4 h-4 text-rose-600" />
              <span>{lang === 'en' ? 'Up Next (More Videos)' : 'अगला वीडियो देखें (More Videos)'}</span>
            </h3>

            <div className="space-y-4">
              {nextVideos.map((item) => {
                const itemTitle = getVideoTitle(item, lang);
                const itemCat = getCategoryName({ slug: item.categorySlug, nameHi: item.category }, lang);

                return (
                  <Link
                    key={item.id}
                    href={`/videos/${item.idSlug}`}
                    className="group flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="relative w-28 aspect-16/10 rounded-md overflow-hidden bg-black shrink-0">
                      <ImageWithFallback
                        src={item.thumbnail}
                        alt={itemTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded font-mono">
                        {item.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-rose-600 uppercase">
                        {itemCat}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                        {itemTitle}
                      </h4>
                      <div className="mt-1 text-[10px] text-gray-400">
                        {formatViews(item.views, lang)}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
