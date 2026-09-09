import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/demo';
import { Link, useRouter, usePathname } from '../context/RouterContext';
import { getCategoryName, getFormattedDate } from '../utils/translations';
import {
  Search,
  Menu,
  X,
  Tv,
  Calendar,
  CloudSun,
  Video,
  Camera,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Globe
} from 'lucide-react';

import { useSiteConfigStore } from '../stores/siteConfigStore';
import { LiveBengaliTranslation } from './LiveBengaliTranslation';

export const Header: React.FC = () => {
  const { config } = useSiteConfigStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const pathname = usePathname();
  const { push, lang, setLang, t } = useRouter();

  useEffect(() => {
    setFormattedDate(getFormattedDate(lang));
  }, [lang]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const changeLanguage = (targetLang: 'hi' | 'en' | 'bn') => {
    setLang(targetLang);
  };

  return (
    <header className="w-full bg-white z-40 shadow-xs">
      {/* 1. Top Utility Strip */}
      <div className="bg-gray-900 text-gray-300 text-xs border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          {/* Date & Weather */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-300">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>{formattedDate || (lang === 'en' ? 'Thursday, September 3, 2026' : 'गुरुवार, 3 सितंबर 2026')}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-gray-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'New Delhi 32°C' : 'नई दिल्ली 32°C'}</span>
            </div>
          </div>

          {/* Right Utility Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Live TV Link */}
            <Link
              href="/videos"
              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-bold uppercase tracking-wider text-[11px]"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <Tv className="w-3.5 h-3.5" />
              <span>{t.liveTv}</span>
            </Link>

            {/* Custom Segmented Pill-Toggle Bar */}
            <div
              id="language-switcher-header"
              className="flex items-center gap-1.5 bg-[#1e2430] px-3 py-1 rounded-full border border-[#334155] text-[11px] font-bold text-rose-400 tracking-wide font-sans shadow-sm"
              aria-label="Portal language: Bengali"
            >
              <Globe className="w-3.5 h-3.5 text-rose-500" />
              <span>বাংলা</span>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Logo & Brand Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {config.logoUrl ? (
            <img
              src={config.logoUrl}
              alt={lang === 'en' ? (config.appNameEn || t.appName) : (config.appNameHi || t.appName)}
              className="h-10 sm:h-12 w-auto max-w-[180px] object-contain rounded-lg shadow-2xs"
            />
          ) : (
            <div
              style={{ backgroundColor: 'var(--brand-primary, #e11d48)' }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-md transition-colors"
            >
              {config.logoBadgeText || (lang === 'en' ? 'BN' : 'भा')}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-3xl font-black tracking-tight text-gray-950 font-serif">
                {lang === 'en' ? (config.appNameEn || t.appName) : (config.appNameHi || t.appName)}
              </span>
              <span
                style={{ backgroundColor: 'var(--brand-primary, #e11d48)' }}
                className="text-white font-black text-[10px] sm:text-xs px-2 py-0.5 rounded tracking-widest uppercase animate-pulse"
              >
                {lang === 'en' ? (config.appSuffixEn || t.appNameSuffix) : (config.appSuffixHi || t.appNameSuffix)}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide">
              {lang === 'en' ? (config.taglineEn || t.tagline) : (config.taglineHi || t.tagline)}
            </p>
          </div>
        </Link>

        {/* Header Ad Slot (Desktop Leaderboard) */}
        <div className="hidden lg:block">
          <div className="w-[468px] h-[60px] border border-dashed border-gray-300 bg-gray-50 rounded-lg p-2 flex items-center justify-between text-xs text-gray-500 shadow-2xs">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">{t.adNotice}</span>
              <span className="font-bold text-gray-700">
                {lang === 'en' ? 'National Clean Energy & Digital Literacy Mission' : 'राष्ट्रीय विकास एवं डिजिटल साक्षरता मिशन'}
              </span>
            </div>
            <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded font-semibold text-[11px]">
              {t.learnMore}
            </span>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-700 hover:text-rose-600 rounded-lg hover:bg-gray-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-rose-600 rounded-lg hover:bg-gray-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Sticky Category Navigation Bar */}
      <nav style={{ backgroundColor: 'var(--brand-primary, #e11d48)' }} className="sticky top-0 z-30 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Categories Links (Desktop Horizontal Scroll) */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-bold whitespace-nowrap rounded transition-colors ${
                pathname === '/' ? 'bg-rose-900 text-white' : 'hover:bg-rose-800 text-rose-50'
              }`}
            >
              {t.home}
            </Link>

            {CATEGORIES.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              const label = getCategoryName(cat, lang);
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`px-3 py-2 text-sm font-bold whitespace-nowrap rounded transition-colors ${
                    isActive ? 'bg-rose-900 text-white' : 'hover:bg-rose-800 text-rose-50'
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            {/* Special Media Tabs */}
            <Link
              href="/videos"
              className={`flex items-center gap-1 px-3 py-2 text-sm font-bold whitespace-nowrap rounded transition-colors ${
                pathname.startsWith('/videos') ? 'bg-rose-900 text-white' : 'hover:bg-rose-800 text-rose-50'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{t.videos}</span>
            </Link>

            <Link
              href="/photos"
              className={`flex items-center gap-1 px-3 py-2 text-sm font-bold whitespace-nowrap rounded transition-colors ${
                pathname.startsWith('/photos') ? 'bg-rose-900 text-white' : 'hover:bg-rose-800 text-rose-50'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.photos}</span>
            </Link>
          </div>

            {/* More Menu Mega Menu Drawer */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-bold whitespace-nowrap rounded transition-colors cursor-pointer ${
                  moreMenuOpen ? 'bg-rose-900 text-white' : 'bg-rose-800 text-rose-50 hover:bg-rose-900'
                }`}
              >
                <span>{lang === 'en' ? 'More' : lang === 'bn' ? 'আরও' : 'और देखें'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

          {/* Always-Visible Top Navigation Integrated Search Input */}
          <div className="flex-1 max-w-xs sm:max-w-md ml-auto pl-2 relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3.5 pr-9 py-1.5 rounded-full bg-rose-800 text-white placeholder-rose-200 text-xs focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all border border-rose-600/50"
              />
              <button
                type="submit"
                className="absolute right-1 text-rose-200 hover:text-white p-1 rounded-full hover:bg-rose-700 transition-colors cursor-pointer"
                title={t.search}
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FULL-WIDTH RESPONSIVE MEGA MENU (Exact Reference Screenshot Layout) */}
        {/* ------------------------------------------------------------------ */}
        {moreMenuOpen && (
          <div className="bg-white border-b-2 border-rose-600 shadow-2xl text-gray-900 animate-fade-in relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setMoreMenuOpen(false)}
                className="absolute top-4 right-4 sm:right-6 p-1.5 text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Mega Grid: Responsive Columns (7 Grid Columns on Desktop, 3 on Tablet, 2 on Mobile) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-6 text-xs pr-8">
                
                {/* Column 1: FEATURED & QUICK LINKS */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                      {lang === 'en' ? 'LIVE NOW' : lang === 'bn' ? 'লাইভ এখন' : 'लाइव अपडेट'}
                    </h4>
                    <ul className="space-y-1 font-medium text-gray-700">
                      <li><Link href="/" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600 font-bold text-rose-600 flex items-center gap-1">{lang === 'en' ? 'Live Updates' : lang === 'bn' ? 'লাইভ খবর' : 'लाइव अपडेट'} <span className="text-[10px] bg-rose-100 text-rose-700 px-1 rounded font-normal">LIVE</span></Link></li>
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'FEATURED' : lang === 'bn' ? 'বিশেষ সংবাদ' : 'खास खबरें'}
                    </h4>
                    <ul className="space-y-1 font-medium text-gray-700">
                      <li><Link href="/videos" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600 flex items-center gap-1"><Video className="w-3 h-3 text-rose-600" /> {lang === 'en' ? 'VIDEO' : lang === 'bn' ? 'ভিডিও' : 'वीडियो'}</Link></li>
                      <li><Link href="/web-stories" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'WEB STORIES' : lang === 'bn' ? 'ওয়েব স্টোরিজ' : 'वेब स्टोरीज'}</Link></li>
                      <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'REGIONAL NEWS' : lang === 'bn' ? 'আঞ্চলিক খবর' : 'रीजनल न्यूज़'}</Link></li>
                      <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'DEEP DIVE' : lang === 'bn' ? 'বিশেষ বিশ্লেষণ' : 'डीप डाइव'}</Link></li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'NEWS' : lang === 'bn' ? 'সংবাদ' : 'न्यूज़'}
                    </h4>
                    <ul className="space-y-1 font-medium text-gray-700">
                      <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'India' : lang === 'bn' ? 'ভারত' : 'भारत'}</Link></li>
                      <li><Link href="/category/world" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'World' : lang === 'bn' ? 'আন্তর্জাতিক' : 'विदेश'}</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Column 2: SPORTS & TRENDING */}
                <div className="space-y-2">
                  <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                    {lang === 'en' ? 'SPORTS' : lang === 'bn' ? 'খেলাধুলা' : 'खेल'}
                  </h4>
                  <ul className="space-y-1.5 font-medium text-gray-700">
                    <li><Link href="/category/cricket" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Cricket' : lang === 'bn' ? 'ক্রিকেট' : 'क्रिकेट'}</Link></li>
                    <li><Link href="/category/cricket" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'IPL' : lang === 'bn' ? 'আইপিএল' : 'आईपीएल'}</Link></li>
                    <li><Link href="/category/sports" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Football' : lang === 'bn' ? 'ফুটবল' : 'फुटबॉल'}</Link></li>
                  </ul>
                  <div className="pt-2 space-y-1">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'TRENDING' : lang === 'bn' ? 'ট্রেন্ডিং' : 'ट्रेंडिंग'}
                    </h4>
                    <ul className="space-y-1 font-medium text-gray-700">
                      <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Offbeat' : lang === 'bn' ? 'অফবিট' : 'अजब-गजब'}</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Column 3: BUSINESS & CITIES */}
                <div className="space-y-2">
                  <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                    {lang === 'en' ? 'BUSINESS' : lang === 'bn' ? 'ব্যবসা' : 'बिजनेस'}
                  </h4>
                  <ul className="space-y-1.5 font-medium text-gray-700">
                    <li><Link href="/category/business" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Automobile' : lang === 'bn' ? 'অটোমোবাইল' : 'ऑटोमोबाइल'}</Link></li>
                  </ul>
                  <div className="pt-2 space-y-1">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'CITIES' : lang === 'bn' ? 'শহরাঞ্চল' : 'शहर'}
                    </h4>
                    <ul className="space-y-1 font-medium text-gray-700">
                      <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Crime' : lang === 'bn' ? 'অপরাধ' : 'क्राइम'}</Link></li>
                    </ul>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'FACT CHECK' : lang === 'bn' ? 'তথ্য যাচাই' : 'फैक्ट चेक'}
                    </h4>
                  </div>
                </div>

                {/* Column 4: ENTERTAINMENT */}
                <div className="space-y-2">
                  <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                    {lang === 'en' ? 'ENTERTAINMENT' : lang === 'bn' ? 'বিনোদন' : 'मनोरंजन'}
                  </h4>
                  <ul className="space-y-1.5 font-medium text-gray-700">
                    <li><Link href="/category/entertainment" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Movies' : lang === 'bn' ? 'চলচ্চিত্র' : 'फिल्म'}</Link></li>
                    <li><Link href="/category/entertainment" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Celebrities News' : lang === 'bn' ? 'সেলিব্রিটি নিউজ' : 'सेलिब्रिटी गॉसिप'}</Link></li>
                    <li><Link href="/category/entertainment" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'South Cinema' : lang === 'bn' ? 'সাউথ সিনেমা' : 'साउथ सिनेमा'}</Link></li>
                    <li><Link href="/category/entertainment" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Movie Review' : lang === 'bn' ? 'মুভি রিভিউ' : 'फिल्म समीक्षा'}</Link></li>
                  </ul>
                  <div className="pt-2">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'BRAND WIRE' : lang === 'bn' ? 'ব্র্যান্ড ওয়্যার' : 'ब्रांड वायर'}
                    </h4>
                  </div>
                </div>

                {/* Column 5: STATES & ELECTIONS */}
                <div className="space-y-2">
                  <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                    {lang === 'en' ? 'STATES' : lang === 'bn' ? 'রাজ্যসমূহ' : 'राज्य'}
                  </h4>
                  <ul className="space-y-1.5 font-medium text-gray-700">
                    <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Delhi-NCR' : lang === 'bn' ? 'দিল্লি-এনসিআর' : 'दिल्ली-एनसीआर'}</Link></li>
                    <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Uttar Pradesh' : lang === 'bn' ? 'উত্তর প্রদেশ' : 'उत्तर प्रदेश'}</Link></li>
                    <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Punjab' : lang === 'bn' ? 'পাঞ্জাব' : 'पंजाब'}</Link></li>
                    <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Bihar' : lang === 'bn' ? 'বিহার' : 'बिहार'}</Link></li>
                    <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Madhya Pradesh' : lang === 'bn' ? 'মধ্য প্রদেশ' : 'मध्य प्रदेश'}</Link></li>
                  </ul>
                  <div className="pt-2">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'ELECTIONS' : lang === 'bn' ? 'নির্বাচন' : 'चुनाव'}
                    </h4>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'EXPLAINERS' : lang === 'bn' ? 'বিশেষ বিশ্লেষণ' : 'एक्सप्लेनर'}
                    </h4>
                  </div>
                </div>

                {/* Column 6: EDUCATION & RELIGION */}
                <div className="space-y-2">
                  <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                    {lang === 'en' ? 'EDUCATION' : lang === 'bn' ? 'শিক্ষা' : 'शिक्षा'}
                  </h4>
                  <ul className="space-y-1.5 font-medium text-gray-700">
                    <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Jobs' : lang === 'bn' ? 'চাকরি' : 'सरकारी नौकरियां'}</Link></li>
                    <li><Link href="/category/national" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Results' : lang === 'bn' ? 'ফলাফল' : 'रिजल्ट'}</Link></li>
                  </ul>
                  <div className="pt-2 space-y-1">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'RELIGION & SPIRITUALITY' : lang === 'bn' ? 'ধর্ম ও আধ্যাত্মিকতা' : 'धर्म और अध्यात्म'}
                    </h4>
                    <ul className="space-y-1 font-medium text-gray-700">
                      <li><Link href="/category/lifestyle" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Astro' : lang === 'bn' ? 'জ্যোতিষ' : 'राशिफल'}</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Column 7: TECHNOLOGY & LIFESTYLE */}
                <div className="space-y-2">
                  <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                    {lang === 'en' ? 'TECHNOLOGY' : lang === 'bn' ? 'প্রযুক্তি' : 'टेक-गैजेट्स'}
                  </h4>
                  <div className="pt-2 space-y-1">
                    <h4 className="font-black text-rose-600 uppercase tracking-wider text-xs border-b border-rose-100 pb-1">
                      {lang === 'en' ? 'LIFESTYLE' : lang === 'bn' ? 'জীবনযাত্রা' : 'लाइफस्टाइल'}
                    </h4>
                    <ul className="space-y-1.5 font-medium text-gray-700">
                      <li><Link href="/category/lifestyle" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Astro' : lang === 'bn' ? 'জ্যোতিষ' : 'ज्योतिष'}</Link></li>
                      <li><Link href="/category/lifestyle" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Health' : lang === 'bn' ? 'স্বাস্থ্য' : 'स्वास्थ्य'}</Link></li>
                      <li><Link href="/category/lifestyle" onClick={() => setMoreMenuOpen(false)} className="hover:text-rose-600">{lang === 'en' ? 'Travel' : lang === 'bn' ? 'ভ্রমণ' : 'ट्रैवल'}</Link></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 bg-rose-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white text-rose-700 font-black flex items-center justify-center text-base">
                  {lang === 'en' ? 'BN' : 'भा'}
                </div>
                <div>
                  <h3 className="font-bold text-base leading-none">
                    {lang === 'en' ? 'BHARAT NEWS LIVE' : 'भारत समाचार LIVE'}
                  </h3>
                  <span className="text-[10px] text-rose-200">
                    {lang === 'en' ? 'Menu & Categories' : 'मेनू एवं श्रेणियां'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-white hover:bg-rose-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Language Switcher Card */}
            <div className="p-3 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-950">
                <Globe className="w-4 h-4 text-rose-600" />
                <span>{lang === 'en' ? 'Language:' : 'भाषा:'}</span>
              </div>
              <div className="flex bg-white rounded-lg p-0.5 border border-rose-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    lang === 'hi'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    lang === 'en'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Search inside Mobile Menu */}
            <div className="p-4 border-b border-gray-100">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-hidden focus:border-rose-600"
                />
                <button type="submit" className="p-2 bg-rose-600 text-white rounded-md">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Category Links */}
            <div className="p-2 flex-1 space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold text-gray-800 hover:bg-rose-50 hover:text-rose-600"
              >
                <span>{t.home}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              {CATEGORIES.map((cat) => {
                const label = getCategoryName(cat, lang);
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold text-gray-800 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                      <span>{label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-gray-200">
                <Link
                  href="/videos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold text-gray-800 hover:bg-rose-50 hover:text-rose-600"
                >
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-600" />
                    <span>{t.videoBulletins}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                <Link
                  href="/photos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold text-gray-800 hover:bg-rose-50 hover:text-rose-600"
                >
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-rose-600" />
                    <span>{t.photoGalleries}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
              <p className="font-semibold text-gray-700 mb-1">
                {lang === 'en' ? 'Bharat News Live App' : 'भारत समाचार लाइव ऐप'}
              </p>
              <p className="text-[11px] text-gray-500">
                {lang === 'en'
                  ? 'Stay connected for real-time unbiased journalism.'
                  : 'सटीक और निष्पक्ष समाचारों के लिए जुड़े रहें।'}
              </p>
            </div>
          </div>

          {/* Dismiss Click Area */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};
