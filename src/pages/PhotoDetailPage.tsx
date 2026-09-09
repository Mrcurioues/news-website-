import React, { useState, useEffect } from 'react';
import { getGalleryByIdSlug, DEMO_GALLERIES } from '../data/demo';
import { useRouter, Link } from '../context/RouterContext';
import { ShareBar } from '../components/ShareBar';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { getGalleryTitle, getGalleryCaption, getCategoryName } from '../utils/translations';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Camera,
  ArrowLeft,
  Images
} from 'lucide-react';

interface PhotoDetailPageProps {
  idSlug: string;
}

export const PhotoDetailPage: React.FC<PhotoDetailPageProps> = ({ idSlug }) => {
  const { updateMetadata, lang, t } = useRouter();
  const gallery = getGalleryByIdSlug(idSlug);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (gallery) {
      const title = getGalleryTitle(gallery, lang);
      updateMetadata({
        title: `${title} - ${t.appName}`,
        description: lang === 'en'
          ? `${title} - View all ${gallery.images.length} exclusive photos on Bharat News Live.`
          : `${title} - कुल ${gallery.images.length} एक्सक्लूसिव तस्वीरें देखें।`,
        ogImage: gallery.coverImage
      });
    }
    setCurrentIndex(0);
  }, [idSlug, lang, t]);

  if (!gallery) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-gray-900 mb-4">
          {lang === 'en' ? 'Photo Gallery Not Found' : 'फोटो गैलरी उपलब्ध नहीं है'}
        </h1>
        <Link
          href="/photos"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-lg font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToPhotos}</span>
        </Link>
      </div>
    );
  }

  const title = getGalleryTitle(gallery, lang);
  const categoryLabel = getCategoryName({ slug: gallery.categorySlug, nameHi: gallery.category }, lang);
  const currentImage = gallery.images[currentIndex] || gallery.images[0];
  const caption = getGalleryCaption(currentImage, lang);
  const otherGalleries = DEMO_GALLERIES.filter(g => g.id !== gallery.id);

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.images.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-rose-600 transition-colors">{t.home}</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href="/photos" className="hover:text-rose-600 transition-colors">{t.photos}</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="truncate max-w-[200px] sm:max-w-md text-gray-900 font-semibold">{title}</span>
      </nav>

      {/* Gallery Header Box */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs">
            {categoryLabel}
          </span>
          <span className="text-xs text-gray-500">
            {lang === 'en' ? 'Published:' : 'प्रकाशित:'} {gallery.publishedAt}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 leading-tight">
          {title}
        </h1>

        <div className="mt-4">
          <ShareBar title={title} />
        </div>
      </div>

      {/* Slideshow Canvas */}
      <div className={`relative bg-zinc-950 rounded-2xl overflow-hidden shadow-xl border border-zinc-800 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}>
        {/* Active Image Stage */}
        <div className="relative aspect-16/10 md:aspect-21/9 w-full flex items-center justify-center bg-black">
          <ImageWithFallback
            src={currentImage.url}
            alt={caption}
            className="w-full h-full object-contain"
          />

          {/* Prev Slide Control */}
          <button
            type="button"
            onClick={prevPhoto}
            aria-label={t.prevPhoto}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors backdrop-blur-xs shadow-md cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Slide Control */}
          <button
            type="button"
            onClick={nextPhoto}
            aria-label={t.nextPhoto}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors backdrop-blur-xs shadow-md cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Top Stage Bar: Slide Counter & Fullscreen button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs font-mono font-bold tracking-wider">
              {t.photoSlide} {currentIndex + 1} {t.of} {gallery.images.length}
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full bg-black/70 backdrop-blur-xs hover:bg-zinc-800 text-white cursor-pointer"
              title={isFullscreen ? (lang === 'en' ? 'Exit Fullscreen' : 'फुलस्क्रीन से बाहर निकलें') : (lang === 'en' ? 'Fullscreen Mode' : 'फुलस्क्रीन मोड')}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Slide Caption Box */}
        <div className="p-4 sm:p-5 bg-zinc-900 border-t border-zinc-800 text-white">
          <p className="text-sm sm:text-base font-bold text-gray-100">
            {caption}
          </p>
        </div>

        {/* Thumbnails Ribbon */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {gallery.images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                currentIndex === idx ? 'border-rose-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={`Thumb ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Other Galleries Grid */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Images className="w-5 h-5 text-rose-600" />
          <span>{lang === 'en' ? 'Explore More Galleries' : 'अन्य फोटो गैलरी देखें'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherGalleries.slice(0, 3).map((item) => {
            const itemTitle = getGalleryTitle(item, lang);
            return (
              <Link
                key={item.id}
                href={`/photos/${item.idSlug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all block"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={item.coverImage}
                    alt={itemTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-semibold flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    {item.images.length} {lang === 'en' ? 'Photos' : 'फ़ोटो'}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-rose-600 line-clamp-2">
                    {itemTitle}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
