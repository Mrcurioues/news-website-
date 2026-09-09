import React from 'react';
import { CATEGORIES } from '../data/demo';
import { Link, useRouter } from '../context/RouterContext';
import { getCategoryName } from '../utils/translations';
import { ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ borderTopColor: 'var(--brand-primary, #e11d48)' }} className="bg-gray-950 text-gray-400 mt-16 border-t-4">
      {/* 1. Brand & Value Prop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          {/* Logo Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div style={{ backgroundColor: 'var(--brand-primary, #e11d48)' }} className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-lg">
                {lang === 'en' ? 'BN' : 'भा'}
              </div>
              <span className="text-xl font-black text-white tracking-tight font-serif">
                {t.appName} <span style={{ color: 'var(--brand-primary, #e11d48)' }} className="text-xs font-sans uppercase">{t.appNameSuffix}</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-gray-300 font-medium">{t.footerCoverage}</span>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-l-2 border-rose-500 pl-2">
              {t.topCategories}
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 5).map((cat) => {
                const name = getCategoryName(cat, lang);
                return (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Media & Formats Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-l-2 border-rose-500 pl-2">
              {t.multimedia}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/videos" className="hover:text-white transition-colors">
                  {t.videoBulletins}
                </Link>
              </li>
              <li>
                <Link href="/photos" className="hover:text-white transition-colors">
                  {t.photoGalleries}
                </Link>
              </li>
              <li>
                <Link href="/category/tech" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Tech & AI Special Coverage' : 'तकनीक एवं AI विशेष कवरेज'}
                </Link>
              </li>
              <li>
                <Link href="/category/cricket" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Cricket Scores & Match Masterclasses' : 'क्रिकेट स्कोरकार्ड & विश्लेषण'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Compliance Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-l-2 border-rose-500 pl-2">
              {t.editorialPolicies}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white cursor-pointer">{t.codeOfEthics}</span></li>
              <li><span className="hover:text-white cursor-pointer">{t.editorialGuidelines}</span></li>
              <li><span className="hover:text-white cursor-pointer">{t.privacyPolicy}</span></li>
              <li><span className="hover:text-white cursor-pointer">{t.termsOfService}</span></li>
              <li><span className="hover:text-white cursor-pointer">{t.grievanceRedressal}</span></li>
            </ul>
          </div>
        </div>

        {/* 2. Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            {t.copyright}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>{t.backToTop}</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
