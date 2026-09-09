import React, { useEffect } from 'react';
import { DEMO_GALLERIES } from '../data/demo';
import { useRouter, Link } from '../context/RouterContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { getGalleryTitle, getCategoryName } from '../utils/translations';
import { Camera, ChevronRight, Images } from 'lucide-react';

export const PhotoListPage: React.FC = () => {
  const { updateMetadata, lang, t } = useRouter();

  useEffect(() => {
    updateMetadata({
      title: `${t.photoGalleries} - ${t.appName}`,
      description: lang === 'en'
        ? 'High-resolution photo galleries covering major national developments, space exploration, cricket action, and Indian heritage.'
        : 'देश, विदेश, खेल और संस्कृति की विशेष और अनदेखी तस्वीरें - Bharat Samachar Live Photo Galleries.'
    });
  }, [lang, t]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-rose-600 transition-colors">{t.home}</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-semibold">{t.photoGalleries}</span>
      </nav>

      {/* Banner */}
      <div className="bg-linear-to-r from-gray-900 via-zinc-900 to-black text-white rounded-xl p-6 sm:p-8 mb-8 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shadow-lg">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t.photoGalleries}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
          {lang === 'en'
            ? 'Visual storytelling at its finest: captivating lenses on national achievements, sports spectacles, and cultural wonders.'
            : 'कैमरे की नजर से देखिए महत्वपूर्ण घटनाएं, खेल के रोमांचक पल, विज्ञान के नवाचार और भारत की अनुपम सांस्कृतिक छटा।'}
        </p>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_GALLERIES.map((gallery) => {
          const title = getGalleryTitle(gallery, lang);
          const catLabel = getCategoryName({ slug: gallery.categorySlug, nameHi: gallery.category }, lang);

          return (
            <article
              key={gallery.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <Link
                href={`/photos/${gallery.idSlug}`}
                className="relative aspect-16/10 bg-gray-100 overflow-hidden block"
              >
                <ImageWithFallback
                  src={gallery.coverImage}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-xs text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Images className="w-3.5 h-3.5 text-rose-400" />
                  <span>
                    {gallery.images.length} {lang === 'en' ? 'Photos' : 'तस्वीरें'}
                  </span>
                </span>
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-bold">
                  {catLabel}
                </span>
              </Link>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/photos/${gallery.idSlug}`}>
                      {title}
                    </Link>
                  </h2>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>{gallery.publishedAt}</span>
                  <span className="text-rose-600 font-bold group-hover:underline">
                    {lang === 'en' ? 'View Gallery →' : 'गैलरी देखें →'}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
