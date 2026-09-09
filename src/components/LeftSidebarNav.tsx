import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import {
  Search,
  Tv,
  Video,
  BookOpen,
  Globe,
  Flame,
  Trophy,
  Briefcase,
  Clapperboard,
  Map,
  GraduationCap,
  Heart,
  Sparkles,
  X
} from 'lucide-react';

export const LeftSidebarNav: React.FC = () => {
  const { push, lang } = useRouter();
  const [sidebarSearchOpen, setSidebarSearchOpen] = useState<boolean>(false);
  const [sidebarQuery, setSidebarQuery] = useState<string>('');

  const handleSidebarSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidebarQuery.trim()) {
      push(`/search?q=${encodeURIComponent(sidebarQuery.trim())}`);
    }
  };

  const navLabels = {
    search: lang === 'en' ? 'SEARCH' : lang === 'bn' ? 'সন্ধান' : 'खोजें',
    now: lang === 'en' ? 'NOW' : lang === 'bn' ? 'এখন' : 'नाउ',
    video: lang === 'en' ? 'VIDEO' : lang === 'bn' ? 'ভিডিও' : 'वीडियो',
    webStories: lang === 'en' ? 'WEB STORIES' : lang === 'bn' ? 'ওয়েব স্টোরিজ' : 'वेब स्टोरीज',
    regionalNews: lang === 'en' ? 'REGIONAL NEWS' : lang === 'bn' ? 'আঞ্চলিক খবর' : 'रीजनल न्यूज़',
    news: lang === 'en' ? 'NEWS' : lang === 'bn' ? 'সংবাদ' : 'न्यूज़',
    sports: lang === 'en' ? 'SPORTS' : lang === 'bn' ? 'খেলাধুলা' : 'स्पोर्ट्स',
    business: lang === 'en' ? 'BUSINESS' : lang === 'bn' ? 'ব্যবসা' : 'बिजनेस',
    entertainment: lang === 'en' ? 'ENTERTAINMENT' : lang === 'bn' ? 'বিনোদন' : 'मनोरंजन',
    states: lang === 'en' ? 'STATES' : lang === 'bn' ? 'রাজ্যসমূহ' : 'स्टेट्स',
    education: lang === 'en' ? 'EDUCATION' : lang === 'bn' ? 'শিক্ষা' : 'एजुकेशन',
    lifestyle: lang === 'en' ? 'LIFESTYLE' : lang === 'bn' ? 'জীবনযাত্রা' : 'लाइफस्टाइल',
    deepDive: lang === 'en' ? 'DEEP DIVE' : lang === 'bn' ? 'বিশেষ বিশ্লেষণ' : 'डीप डाइव',
  };

  return (
    <aside className="hidden lg:flex flex-col items-center w-32 shrink-0 sticky top-6 space-y-3 bg-white border border-gray-200/80 rounded-2xl p-2.5 shadow-xs py-4 max-h-[calc(100vh-3rem)] overflow-y-auto custom-scrollbar">
      
      {/* Interactive Expandable Search Section */}
      <div className="w-full pb-2 border-b border-gray-100 flex flex-col items-center">
        {!sidebarSearchOpen ? (
          <button
            onClick={() => setSidebarSearchOpen(true)}
            className="flex flex-col items-center text-center group cursor-pointer w-full"
            title="Search"
          >
            <div className="p-2 rounded-xl text-rose-600 group-hover:bg-rose-50 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-black text-gray-900 group-hover:text-rose-600 leading-tight tracking-wider uppercase">
              {navLabels.search}
            </span>
          </button>
        ) : (
          <form onSubmit={handleSidebarSearchSubmit} className="w-full flex flex-col gap-1.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black text-rose-600 tracking-wider uppercase">{navLabels.search}</span>
              <button
                type="button"
                onClick={() => setSidebarSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              type="text"
              autoFocus
              value={sidebarQuery}
              onChange={(e) => setSidebarQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search news...' : lang === 'bn' ? 'খবর খুঁজুন...' : 'खोजें...'}
              className="w-full text-xs px-2.5 py-1.5 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-rose-50/40 text-gray-800 placeholder-gray-400 font-medium"
            />
            <button
              type="submit"
              className="w-full py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors"
            >
              Go
            </button>
          </form>
        )}
      </div>

      {/* Vertical Icon + Label Navigation Items (12 Ascending Categories) */}
      <nav className="flex flex-col items-center space-y-3.5 w-full">
        {/* 1. NOW */}
        <Link href="/videos" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-rose-600 group-hover:bg-rose-50 transition-colors">
            <Tv className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-rose-600 leading-tight uppercase">{navLabels.now}</span>
        </Link>

        {/* 2. VIDEO */}
        <Link href="/videos" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-purple-600 group-hover:bg-purple-50 transition-colors">
            <Video className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-purple-600 leading-tight uppercase">{navLabels.video}</span>
        </Link>

        {/* 3. WEB STORIES */}
        <Link href="/web-stories" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-amber-500 group-hover:bg-amber-50 transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-amber-600 leading-tight uppercase">{navLabels.webStories}</span>
        </Link>

        {/* 4. REGIONAL NEWS */}
        <Link href="/category/national" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-emerald-600 group-hover:bg-emerald-50 transition-colors">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-emerald-600 leading-tight uppercase">{navLabels.regionalNews}</span>
        </Link>

        <hr className="w-full border-gray-100 my-0.5" />

        {/* 5. NEWS */}
        <Link href="/category/national" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-blue-600 group-hover:bg-blue-50 transition-colors">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-blue-600 leading-tight uppercase">{navLabels.news}</span>
        </Link>

        {/* 6. SPORTS */}
        <Link href="/category/cricket" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-amber-600 group-hover:bg-amber-50 transition-colors">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-amber-600 leading-tight uppercase">{navLabels.sports}</span>
        </Link>

        {/* 7. BUSINESS */}
        <Link href="/category/business" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-emerald-700 group-hover:bg-emerald-50 transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-emerald-700 leading-tight uppercase">{navLabels.business}</span>
        </Link>

        {/* 8. ENTERTAINMENT */}
        <Link href="/category/entertainment" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-pink-600 group-hover:bg-pink-50 transition-colors">
            <Clapperboard className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-pink-600 leading-tight uppercase">{navLabels.entertainment}</span>
        </Link>

        {/* 9. STATES */}
        <Link href="/category/national" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-indigo-600 group-hover:bg-indigo-50 transition-colors">
            <Map className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-indigo-600 leading-tight uppercase">{navLabels.states}</span>
        </Link>

        {/* 10. EDUCATION */}
        <Link href="/category/national" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-cyan-600 group-hover:bg-cyan-50 transition-colors">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-cyan-600 leading-tight uppercase">{navLabels.education}</span>
        </Link>

        {/* 11. LIFESTYLE */}
        <Link href="/category/national" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-rose-500 group-hover:bg-rose-50 transition-colors">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-rose-500 leading-tight uppercase">{navLabels.lifestyle}</span>
        </Link>

        {/* 12. DEEP DIVE */}
        <Link href="/category/national" className="flex flex-col items-center text-center group cursor-pointer w-full">
          <div className="p-1.5 rounded-xl text-violet-600 group-hover:bg-violet-50 transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 group-hover:text-violet-600 leading-tight uppercase">{navLabels.deepDive}</span>
        </Link>
      </nav>
    </aside>
  );
};
