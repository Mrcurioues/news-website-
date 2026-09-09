import React, { useEffect } from 'react';
import {
  CATEGORIES,
  DEMO_VIDEOS
} from '../data/demo';
import { useRouter, Link } from '../context/RouterContext';
import { StoryCard } from '../components/StoryCard';
import { AdSlot } from '../components/AdSlot';
import {
  Video,
  Play,
  Sparkles,
  Film,
  ArrowRight,
  Flame,
  Tv,
  Gamepad2,
  PlayCircle,
  BookOpen,
  Image as ImageIcon,
  Mic,
  MessageSquareQuote,
  Calculator,
  Compass,
  Car,
  HeartPulse,
  Home,
  GraduationCap,
  MapPin,
  Coins,
  Wind,
  Layers,
  ChevronRight,
  Globe,
  Trophy,
  Briefcase,
  Clapperboard,
  Map,
  Heart,
  Search,
  HelpCircle,
  ChevronDown,
  X
} from 'lucide-react';
import { LeftSidebarNav } from '../components/LeftSidebarNav';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useStoriesStore } from '../stores/storiesStore';
import { useHomepageStore } from '../stores/homepageStore';
import { Article } from '../types';
import {
  getArticleTitle,
  getArticleExcerpt,
  getCategoryName,
  getArticleReadTime,
  getArticleTags,
  getArticleBody,
  getVideoTitle
} from '../utils/translations';

export const HomePage: React.FC = () => {
  const { updateMetadata, lang, t, push } = useRouter();
  const { stories } = useStoriesStore();
  const { layout, fetchLayoutFromSupabase } = useHomepageStore();

  useEffect(() => {
    fetchLayoutFromSupabase();
  }, [fetchLayoutFromSupabase]);

  const [activeExpandedSub, setActiveExpandedSub] = React.useState<string | null>(null);
  const [sidebarSearchOpen, setSidebarSearchOpen] = React.useState<boolean>(false);
  const [sidebarQuery, setSidebarQuery] = React.useState<string>('');
  const [activePlayVideo, setActivePlayVideo] = React.useState<{ title: string; videoUrl: string; youtubeId?: string } | null>(null);

  const toggleSub = (itemKey: string) => {
    setActiveExpandedSub(prev => prev === itemKey ? null : itemKey);
  };

  const handleSidebarSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidebarQuery.trim()) {
      push(`/search?q=${encodeURIComponent(sidebarQuery.trim())}`);
    }
  };

  useEffect(() => {
    if (lang === 'en') {
      updateMetadata({
        title: 'Bharat News Live - Breaking News, Politics, Cricket & Video Bulletins',
        description: 'Latest breaking headlines, live cricket scores, political analysis, business insights, tech and entertainment reports 24x7.'
      });
    } else {
      updateMetadata({
        title: 'भारत समाचार लाइव - ताज़ा ख़बरें, राजनीति, क्रिकेट व वीडियो',
        description: 'देश और दुनिया की ब्रेकिंग न्यूज़, लाइव स्कोर, राजनीति, व्यापार और मनोरंजन की ताज़ा ख़बरें पढ़ें।'
      });
    }
  }, [lang, updateMetadata]);

  // Convert all stories with dynamic Hindi/English/Bengali title & content support
  const allFormattedStories: Article[] = stories.map(s => {
    const categoryName = getCategoryName({ slug: s.section?.toLowerCase(), nameHi: s.section, nameEn: s.section }, lang);
    
    return {
      id: s.id,
      slug: s.slug || s.id,
      idSlug: s.slug || s.id,
      title: s.headlineHi || s.headline,
      titleEn: s.headlineEn || s.seoTitle || s.headline,
      titleHi: s.headlineHi || s.headline,
      titleBn: s.headlineBn,
      excerpt: s.summaryHi || s.summary,
      excerptEn: s.summaryEn || s.seoDescription || s.summary,
      excerptHi: s.summaryHi || s.summary,
      excerptBn: s.summaryBn,
      category: categoryName,
      categorySlug: (s.section || 'national').toLowerCase().replace(/[^a-z0-9]+/g, ''),
      author: {
        name: s.byline || 'Staff Reporter',
        nameHi: s.byline || 'संवाददाता',
        role: 'Journalist',
        roleEn: 'Journalist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      },
      publishedAt: s.publishDate || s.createdAt,
      readTime: lang === 'en' ? '3 min read' : lang === 'bn' ? '৩ মিনিট পঠিত' : '3 मिनट',
      readTimeEn: '3 min read',
      coverImage: s.mainImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
      imageCaption: s.mainImageCaptionHi || s.mainImageCaption || '',
      imageCaptionEn: s.mainImageCaptionEn || s.mainImageCaption || '',
      imageCaptionHi: s.mainImageCaptionHi || s.mainImageCaption || '',
      imageCaptionBn: s.mainImageCaptionBn,
      imageAltText: s.mainImageAltHi || s.mainImageAlt || '',
      imageAltTextEn: s.mainImageAltEn || s.mainImageAlt || '',
      imageAltTextHi: s.mainImageAltHi || s.mainImageAlt || '',
      imageAltTextBn: s.mainImageAltBn,
      tags: s.topics || ['News'],
      body: [s.bodyHi || s.body],
      bodyEn: [s.bodyEn || s.body],
      bodyHi: [s.bodyHi || s.body],
      bodyBn: s.bodyBn ? [s.bodyBn] : undefined,
      isBreaking: s.isBreaking,
      isFeatured: s.isFeatured,
      isTrending: s.isTrending,
      views: s.views || 100,
      videoUrl: s.videoUrl,
    };
  });

  const publishedStories: Article[] = allFormattedStories.filter(s => {
    const raw = stories.find(rs => rs.id === s.id);
    return raw ? raw.status === 'published' : true;
  });

  // Dynamic Layout Sections resolved from Homepage Admin Store with smooth defaults
  const heroStory = stories.find(s => layout.hero?.includes(s.id)) ? allFormattedStories.find(s => s.id === layout.hero[0]) : undefined;
  
  // Resolved Front Content Banner Articles from Admin Store Layout
  const layoutFrontContentStories = (layout.frontContent || [])
    .map(id => allFormattedStories.find(s => s.id === id))
    .filter(Boolean) as Article[];

  const frontContentLead = layoutFrontContentStories[0] || heroStory || publishedStories.find(s => s.isBreaking) || publishedStories[0];
  const frontContentList = layoutFrontContentStories.length > 1 
    ? layoutFrontContentStories.slice(1, 6) 
    : publishedStories.filter(s => s.id !== frontContentLead?.id).slice(0, 5);

  const getArticlesByCategory = (catSlug: string) =>
    publishedStories.filter(s => s.categorySlug === catSlug || s.category.toLowerCase().includes(catSlug));

  // Resolved Latest News Articles from Admin Store Layout
  const layoutLatestStories = (layout.latest || [])
    .map(id => allFormattedStories.find(s => s.id === id))
    .filter(Boolean) as Article[];

  const latestNewsArticles = (layout.latest && layout.latest.length > 0)
    ? layoutLatestStories
    : publishedStories.slice(0, 6);

  // Resolved Business Articles from Admin Store Layout
  const layoutBusinessStories = (layout.business || [])
    .map(id => allFormattedStories.find(s => s.id === id))
    .filter(Boolean) as Article[];

  const businessArticles = (layout.business && layout.business.length > 0)
    ? layoutBusinessStories 
    : getArticlesByCategory('business');

  // Resolved Hindi News Articles from Admin Store Layout
  const layoutHindiStories = (layout.hindiNews || [])
    .map(id => allFormattedStories.find(s => s.id === id))
    .filter(Boolean) as Article[];

  const hindiNewsArticles = (layout.hindiNews && layout.hindiNews.length > 0)
    ? layoutHindiStories
    : publishedStories.slice(0, 4);

  // Resolved Trending Stories from Admin Store Layout
  const layoutTrendingStories = (layout.trending || [])
    .map(id => allFormattedStories.find(s => s.id === id))
    .filter(Boolean) as Article[];

  const trendingArticles = (layout.trending && layout.trending.length > 0)
    ? layoutTrendingStories
    : publishedStories;

  // Web Stories demo
  const webStories = [
    { id: 1, title: 'सबकी पेट भरने वाले खेत में क्या होता है?', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'आंखों में पानी क्यों आता है?', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'बिना सनग्लास के 3 दिन बीते तो?', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'स्मार्टफोन चार्ज करने का सही तरीका', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' },
  ];

  // Zodiac symbols data
  const rashiList = [
    { name: 'मेष', icon: '♈' },
    { name: 'वृषभ', icon: '♉' },
    { name: 'मिथुन', icon: '♊' },
    { name: 'कर्क', icon: '♋' },
    { name: 'सिंह', icon: '♌' },
    { name: 'कन्या', icon: '♍' },
    { name: 'तुला', icon: '♎' },
    { name: 'वृश्चिक', icon: '♏' },
    { name: 'धनु', icon: '♐' },
    { name: 'मकर', icon: '♑' },
    { name: 'कुंभ', icon: '♒' },
    { name: 'मीन', icon: '♓' },
  ];

  // Stock items demo
  const stockMarketData = [
    { name: 'NILACHAL CARBO METAL', price: '138.2', change: '+20.03 (20%)', isUp: true },
    { name: 'XTRANET TECHNOLOGIES', price: '213.6', change: '+19.9 (10.16%)', isUp: true },
    { name: 'KAUVERI DEF. WIRELES', price: '57.38', change: '+11.27 (19.98%)', isUp: true },
    { name: 'JINDAL WORLDWIDE', price: '57.01', change: '+9.46 (19.89%)', isUp: true },
    { name: 'TECHNO CRAFTS PLASMA', price: '261', change: '+13.95 (17.97%)', isUp: true },
  ];

  // Mini games demo
  const miniGames = [
    { name: 'Word Guess', sub: 'Six tries to crack today’s five-letter word', color: 'bg-indigo-900' },
    { name: 'Mini Logic Grid', sub: 'A fresh 6×6 mini-sudoku, no repeats', color: 'bg-emerald-900' },
    { name: 'Category Connect', sub: 'Sort sixteen words into four hidden categories', color: 'bg-amber-900' },
    { name: 'Daily News Quiz', sub: 'Five questions on today’s headlines', color: 'bg-rose-900' },
  ];

  // Taboola / Sponsored Links demo items (Exact match with Image 3)
  const sponsoredTaboolaItems = [
    {
      title: '3 BHK Homes Near NH24 - See What’s Inside',
      desc: 'Aditya Rosemont 3 BHK Ultra Luxury Apartments at NH24, Ghaziabad.',
      sponsor: 'Aditya Group | Sponsored',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
      btn: 'Click Here'
    },
    {
      title: 'Pre-Launch Price Ends Soon: 3/4 BHK Homes in Noida',
      desc: 'Ace Arte 3/4 BHK Luxurious Apartments in Sector 150 Noida.',
      sponsor: 'Ace Arte | Sponsored',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
      btn: 'Learn More'
    },
    {
      title: 'Go from beginner to confident trader',
      desc: 'Start trading with the same tools top traders use. Join iFOREX today.',
      sponsor: 'iFOREX | Sponsored',
      img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80',
      btn: 'Sign Up'
    },
    {
      title: 'She heard a ringing in her ears for 6 years, here’s what she does now',
      desc: 'Recommended by audiologists across the country.',
      sponsor: 'Hearing Magazine | Sponsored',
      img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
      btn: 'Read Story'
    },
    {
      title: 'The cost of hearing aids in Ahirauli Bazar might surprise you',
      desc: 'Recommended by audiologists for senior citizens.',
      sponsor: 'Hearing Loss | Sponsored',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80',
      btn: 'Learn More'
    },
    {
      title: 'Indians over 70 are switching from hearing aids to this new device',
      desc: 'Clear sound amplification tech.',
      sponsor: 'Hearing Tech | Sponsored',
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
      btn: 'Learn More'
    },
  ];

  // Explore sidebar items
  const exploreItems = [
    { label: 'लाइव टीवी', icon: <Tv className="w-4 h-4 text-red-600" />, href: '/videos' },
    { label: 'वीडियो', icon: <Video className="w-4 h-4 text-gray-700" />, href: '/videos' },
    { label: 'खेल', icon: <Gamepad2 className="w-4 h-4 text-gray-700" />, href: '/category/cricket' },
    { label: 'शॉर्ट वीडियो', icon: <PlayCircle className="w-4 h-4 text-rose-600" />, href: '/videos' },
    { label: 'वेब स्टोरीज', icon: <BookOpen className="w-4 h-4 text-amber-600" />, href: '/web-stories' },
    { label: 'फोटो गैलरी', icon: <ImageIcon className="w-4 h-4 text-blue-600" />, href: '/category/entertainment' },
    { label: 'पॉडकास्ट्स', icon: <Mic className="w-4 h-4 text-purple-600" />, href: '/videos' },
    { label: 'मूवी रिव्यू', icon: <Film className="w-4 h-4 text-emerald-600" />, href: '/category/entertainment' },
    { label: 'ओपिनियन', icon: <MessageSquareQuote className="w-4 h-4 text-gray-700" />, href: '/category/national' },
  ];

  const usefulItems = [
    { label: 'पर्सनल लोन EMI कैलकुलेटर', icon: <Calculator className="w-4 h-4 text-gray-600" /> },
    { label: 'कंपैटिबिलिटी कैलकुलेटर', icon: <Compass className="w-4 h-4 text-gray-600" /> },
    { label: 'कार लोन EMI कैलकुलेटर', icon: <Car className="w-4 h-4 text-gray-600" /> },
    { label: 'बीएमआई कैलकुलेटर', icon: <HeartPulse className="w-4 h-4 text-gray-600" /> },
    { label: 'होम लोन EMI कैलकुलेटर', icon: <Home className="w-4 h-4 text-gray-600" /> },
    { label: 'एज कैलकुलेटर', icon: <Calculator className="w-4 h-4 text-gray-600" /> },
    { label: 'एजुकेशन लोन EMI कैलकुलेटर', icon: <GraduationCap className="w-4 h-4 text-gray-600" /> },
    { label: 'पिन कोड', icon: <MapPin className="w-4 h-4 text-gray-600" /> },
    { label: 'सोने की कीमत', icon: <Coins className="w-4 h-4 text-amber-600" /> },
    { label: 'चांदी की कीमत', icon: <Coins className="w-4 h-4 text-gray-400" /> },
    { label: 'AQI', icon: <Wind className="w-4 h-4 text-emerald-600" /> },
  ];

  if (!frontContentLead) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-4 py-5 font-sans">
      
      {/* 3-Column Layout Container (Left Nav + Main Feed + Right Sidebar) */}
      <div className="flex gap-4 sm:gap-6 items-start">

        {/* 1. LEFT STICKY NAVIGATION BAR */}
        <LeftSidebarNav />

        {/* 2. MAIN CENTER CONTENT FEED */}
        <main className="flex-1 min-w-0 space-y-8">
          
          {/* Top Banner Ad Slot */}
          <AdSlot
            format="leaderboard"
            slotName={lang === 'en' ? 'Main Sponsor Banner' : 'प्रमुख प्रायोजक | Main Sponsor Banner'}
          />

          {/* --------------------------------------------------------------------- */}
          {/* SECTION 1: BREAKING LIVE BANNER & TOP GRID (Front Content Section)   */}
          {/* --------------------------------------------------------------------- */}
          <section className="space-y-4">
            {frontContentLead && (
              <div className="bg-rose-700 rounded-2xl p-3 sm:p-4 shadow-lg border border-rose-800 text-white flex flex-col md:flex-row gap-5 items-center">
                <div className="w-full md:w-[54.5%] relative aspect-16/9 overflow-hidden bg-black rounded-xl border border-white/10 shadow-md shrink-0">
                  {/* Lead Coverage Video or Image Container */}
                  {(() => {
                    const vUrl = frontContentLead.videoUrl || (frontContentLead.body && (frontContentLead.body[0]?.includes('youtube.com') || frontContentLead.body[0]?.includes('youtu.be')) ? frontContentLead.body[0] : null);
                    
                    if (vUrl) {
                      const ytMatch = vUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
                      if (ytMatch) {
                        const ytId = ytMatch[1];
                        return (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&playsinline=1`}
                            title={frontContentLead.title}
                            className="w-full h-full border-0 object-cover pointer-events-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        );
                      }
                      
                      // Direct MP4 / WebM video playback with poster fallback
                      return (
                        <video
                          src={vUrl}
                          poster={frontContentLead.coverImage}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // On playback or load error, hide video so poster/fallback renders
                            const el = e.currentTarget;
                            el.style.display = 'none';
                          }}
                        />
                      );
                    }

                    return (
                      <Link href={`/news/${frontContentLead.idSlug}`} className="block w-full h-full">
                        <ImageWithFallback src={frontContentLead.coverImage} alt={frontContentLead.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      </Link>
                    );
                  })()}
                  <div className="absolute top-3 left-3 bg-amber-400 text-black font-black text-xs px-3 py-1 rounded shadow-md flex items-center gap-1.5 z-10 tracking-wide uppercase">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                    LIVE: {frontContentLead.category || 'NEWS REPORTING'}
                  </div>
                </div>
                <div className="flex-1 min-w-0 p-2 sm:p-3 space-y-3">
                  <span className="text-[10px] font-black text-rose-200 uppercase tracking-widest bg-rose-800/80 px-2 py-0.5 rounded">
                    LEAD COVERAGE
                  </span>
                  <h2 className="text-base sm:text-xl font-black leading-tight text-white hover:text-amber-300 transition-colors">
                    <Link href={`/news/${frontContentLead.idSlug}`}>
                      {getArticleTitle(frontContentLead, lang)}
                    </Link>
                  </h2>
                  <ul className="space-y-1.5 text-xs text-rose-100 font-medium">
                    {frontContentList.map((storyItem, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 hover:text-white transition-colors">
                        <span className="text-amber-300 font-bold">›</span>
                        <Link href={`/news/${storyItem.idSlug}`}>{getArticleTitle(storyItem, lang)}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4 Cards Grid underneath Live Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {publishedStories.slice(0, 4).map((story) => (
                <div key={story.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-shadow group">
                  <Link href={`/news/${story.idSlug}`} className="block">
                    <div className="relative">
                      <ImageWithFallback src={story.coverImage} alt={getArticleTitle(story, lang)} className="w-full aspect-16/9 object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute top-2 left-2 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                        {story.category || 'National'}
                      </span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-extrabold text-sm line-clamp-2 text-gray-900 leading-snug group-hover:text-rose-600 transition-colors">
                        {getArticleTitle(story, lang)}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* SECTION 2: HINDI NEWS SECTION (Exact Image 1 Layout)                 */}
          {/* --------------------------------------------------------------------- */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-rose-600">
              <span className="w-2.5 h-7 bg-rose-600 rounded-xs"></span>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {lang === 'en' ? 'Top News' : lang === 'bn' ? 'প্রধান সংবাদ' : 'हिंदी न्यूज़'}
              </h2>
            </div>

            {hindiNewsArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 space-y-3 group cursor-pointer">
                  <Link href={`/news/${hindiNewsArticles[0]?.idSlug}`}>
                    <div className="relative rounded-xl overflow-hidden">
                      <ImageWithFallback src={hindiNewsArticles[0]?.coverImage || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"} alt={hindiNewsArticles[0]?.title} className="w-full aspect-16/9 object-cover border border-gray-100 group-hover:scale-102 transition-transform" />
                      <span className="absolute top-3 left-3 bg-purple-600 text-white font-black text-xs px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                        {hindiNewsArticles[0]?.category || 'HINDI SPECIAL'}
                      </span>
                    </div>
                    <h3 className="font-black text-xl text-gray-900 leading-snug group-hover:text-rose-600 transition-colors mt-2">
                      {getArticleTitle(hindiNewsArticles[0], lang)}
                    </h3>
                  </Link>
                </div>

                <div className="md:col-span-5 space-y-3 text-sm">
                  {hindiNewsArticles.slice(1, 4).map((sideItem) => (
                    <div key={sideItem.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100 hover:bg-rose-50/60 transition-colors group cursor-pointer">
                      <Link href={`/news/${sideItem.idSlug}`}>
                        <span className="text-xs font-black text-rose-600 uppercase tracking-wider inline-block mb-1 px-2 py-0.5 bg-rose-100/80 rounded">
                          {sideItem.category}
                        </span>
                        <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
                          {getArticleTitle(sideItem, lang)}
                        </h4>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400 text-sm italic">
                {lang === 'en' ? 'No articles selected for Hindi News section in Home Layout' : 'होम लेआउट में हिंदी न्यूज़ सेक्शन के लिए कोई आर्टिकल सेलेक्ट नहीं है।'}
              </div>
            )}
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* SECTION 3: LATEST NEWS GRID (Exact Image 1 Bottom)                   */}
          {/* --------------------------------------------------------------------- */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-gray-800">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-rose-600"></span>
                <span>{lang === 'en' ? 'Latest News' : lang === 'bn' ? 'সর্বশেষ সংবাদ' : 'लेटेस्ट न्यूज़'}</span>
              </h2>
              <Link href="/category/national" className="text-xs font-bold text-rose-600 hover:underline">
                {t.viewMore}
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestNewsArticles.length > 0 ? (
                latestNewsArticles.map((item) => (
                  <div key={item.id} className="bg-rose-50/40 border border-rose-100 rounded-xl p-3.5 hover:bg-rose-100/60 transition-colors group cursor-pointer flex flex-col justify-between">
                    <Link href={`/news/${item.idSlug}`}>
                      <span className="text-[11px] font-black text-rose-600 uppercase tracking-wider inline-block mb-1.5 px-2 py-0.5 bg-white rounded border border-rose-200">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-extrabold text-gray-900 line-clamp-2 leading-snug group-hover:text-rose-700 transition-colors">
                        {getArticleTitle(item, lang)}
                      </h4>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-gray-400 text-sm italic">
                  {lang === 'en' ? 'No articles selected for Latest News section in Home Layout' : 'होम लेआउट में लेटेस्ट न्यूज़ सेक्शन के लिए कोई आर्टिकल सेलेक्ट नहीं है।'}
                </div>
              )}
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* SECTION 4: VIDEO REELS & PLAYER (Sleek Compact Video Section)        */}
          {/* --------------------------------------------------------------------- */}
          <section className="bg-gray-950 text-white p-4 rounded-xl shadow-lg border border-gray-850 space-y-3.5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <h2 className="text-base font-extrabold flex items-center gap-2 text-white tracking-tight">
                <Video className="w-4 h-4 text-rose-500" />
                <span>{lang === 'en' ? 'Videos & Shorts' : lang === 'bn' ? 'ভিডিও ও শর্টস' : 'वीडियो और शॉर्ट्स'}</span>
              </h2>
              <Link href="/videos" className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors">
                {t.viewMore}
              </Link>
            </div>

            {/* Custom Video Links, Selected Video Stories, or Demo Video Reels Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(((layout.customVideoLinks || []).length > 0 || (layout.video || []).length > 0)
                  ? [
                      ...(layout.customVideoLinks || []).map((link, idx) => {
                        const ytMatch = link.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
                        const ytId = ytMatch ? ytMatch[1] : 'g3-GxZoj4t8';
                        const thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                        return {
                          id: `custom-vid-${idx}`,
                          title: `Video Bulletin #${idx + 1}`,
                          thumbnail: thumb,
                          youtubeId: ytId,
                          videoUrl: link
                        };
                      }),
                      ...(layout.video || []).map(id => allFormattedStories.find(s => s.id === id)).filter(Boolean).map(story => ({
                        id: story!.id,
                        title: story!.title,
                        thumbnail: story!.coverImage,
                        videoUrl: `/news/${story!.idSlug}`
                      }))
                    ]
                  : DEMO_VIDEOS.slice(0, 8)
                ).map((vid: any) => (
                  <div
                    key={vid.id}
                    onClick={() => setActivePlayVideo({
                      title: vid.titleHi || vid.title,
                      videoUrl: vid.videoUrl || `https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1`,
                      youtubeId: vid.youtubeId
                    })}
                    className="relative h-44 rounded-lg overflow-hidden bg-gray-900 group border border-gray-800 shadow-sm cursor-pointer"
                  >
                    <ImageWithFallback src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 p-2 flex flex-col justify-between">
                      <span className="bg-rose-600/90 text-white text-[8px] px-1.5 py-0.5 rounded font-bold self-start uppercase tracking-wider shadow-xs flex items-center gap-1">
                        <Play className="w-2 h-2 fill-white" /> PLAY
                      </span>
                      <p className="text-white text-[11px] font-medium line-clamp-2 leading-tight drop-shadow-xs">{vid.titleHi || vid.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Modal Player Overlay */}
            {activePlayVideo && (
              <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl space-y-3 p-4 relative">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                    <h3 className="text-sm font-bold text-white truncate pr-4">{activePlayVideo.title}</h3>
                    <button
                      onClick={() => setActivePlayVideo(null)}
                      className="p-1 bg-gray-800 text-gray-300 hover:text-white rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="relative w-full aspect-16/9 bg-black rounded-xl overflow-hidden">
                    <iframe
                      src={activePlayVideo.youtubeId ? `https://www.youtube.com/embed/${activePlayVideo.youtubeId}?autoplay=1` : activePlayVideo.videoUrl}
                      title={activePlayVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* SECTION 5: BUSINESS & ECONOMY (4 Articles Showcase)                  */}
          {/* --------------------------------------------------------------------- */}
          <div className="pt-6 border-t-4 border-emerald-600">
            <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-emerald-600">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-emerald-600 rounded-xs"></span>
                  <span>{lang === 'en' ? 'Business & Economy' : lang === 'bn' ? 'ব্যবসা ও অর্থনীতি' : 'बिजनेस और अर्थव्यवस्था'}</span>
                </h2>
                <Link href="/category/business" className="text-xs font-bold text-emerald-600 hover:underline">
                  {t.viewMore}
                </Link>
              </div>
              
              {businessArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Main Featured Business Article */}
                  <div className={`${businessArticles.length > 1 ? 'md:col-span-6' : 'md:col-span-12'} relative aspect-16/9 rounded-xl overflow-hidden group cursor-pointer shadow-sm`}>
                    <Link href={`/news/${businessArticles[0].idSlug}`}>
                      <ImageWithFallback src={businessArticles[0].coverImage} alt={businessArticles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                        <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded w-fit mb-1.5 uppercase tracking-wider">
                          {businessArticles[0].category || 'Business'}
                        </span>
                        <h3 className="text-white font-black text-base sm:text-lg group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                          {getArticleTitle(businessArticles[0], lang)}
                        </h3>
                      </div>
                    </Link>
                  </div>

                  {/* Additional Selected Business Articles List */}
                  {businessArticles.length > 1 && (
                    <div className="md:col-span-6 space-y-4 divide-y divide-gray-100">
                      {businessArticles.slice(1, 4).map((art, idx) => (
                        <div key={art.id || idx} className={`${idx !== 0 ? 'pt-3.5' : ''} group cursor-pointer space-y-1`}>
                          <Link href={`/news/${art.idSlug}`} className="block">
                            <span className="text-xs font-extrabold text-rose-600 block mb-1 capitalize">
                              {art.category || 'business'}
                            </span>
                            <div className="flex gap-3.5 items-start">
                              <ImageWithFallback 
                                src={art.coverImage} 
                                alt={art.title} 
                                className="w-28 h-18 object-cover rounded-lg shrink-0 border border-gray-100 group-hover:scale-103 transition-transform" 
                              />
                              <h4 className="font-extrabold text-sm text-gray-900 line-clamp-3 leading-snug group-hover:text-rose-600 transition-colors">
                                {getArticleTitle(art, lang)}
                              </h4>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm italic">
                  {lang === 'en' ? 'No articles selected for Business section in Home Layout' : 'होम लेआउट में बिजनेस सेक्शन के लिए कोई आर्टिकल सेलेक्ट नहीं है।'}
                </div>
              )}
            </section>
          </div>

        </main>

        {/* 3. RIGHT SIDEBAR COLUMN (Wider Column: 380px) */}
        <div className="w-full md:w-[380px] lg:w-[400px] shrink-0 space-y-5">
          
          {/* Trending / Most Read News Section (Exact User Image Layout) */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-1">
              <h3 className="font-black text-sm text-gray-900 flex items-center gap-1.5 uppercase tracking-wide">
                <Flame className="w-4 h-4 text-rose-600 fill-rose-600" />
                <span>{t.trending}</span>
              </h3>
              <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                LIVE UPDATES
              </span>
            </div>
            
            <div className="space-y-3.5 divide-y divide-gray-100">
              {trendingArticles.slice(0, 5).map((s, idx) => (
                <div key={s.id || idx} className={`${idx !== 0 ? 'pt-3' : ''} group cursor-pointer space-y-1`}>
                  <Link href={`/news/${s.idSlug}`} className="block">
                    <span className="text-[11px] font-extrabold text-rose-600 block mb-1">
                      {s.category || 'India'}
                    </span>
                    <div className="flex gap-3.5 items-center">
                      <ImageWithFallback 
                        src={s.coverImage} 
                        alt={s.title} 
                        className="w-28 h-20 sm:w-32 sm:h-20 object-cover rounded-xl shrink-0 border border-gray-100 group-hover:scale-103 transition-transform shadow-2xs" 
                      />
                      <h4 className="text-sm font-extrabold text-gray-900 line-clamp-3 leading-snug group-hover:text-rose-600 transition-colors">
                        {getArticleTitle(s, lang)}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Games Widget (Exact Image 1) */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-3">
              <h3 className="font-bold text-sm text-gray-900">Games</h3>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {miniGames.map((g, i) => (
                <div key={i} className={`${g.color} text-white p-2.5 rounded-lg text-xs cursor-pointer hover:opacity-90 transition-opacity`}>
                  <div className="font-bold truncate">{g.name}</div>
                  <div className="text-[9px] text-gray-200 line-clamp-1 mt-0.5">{g.sub}</div>
                  <div className="text-[9px] font-bold text-amber-300 mt-1 uppercase">PLAY →</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Market Updates Widget (Exact Image 2 & 3) */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-3">
              <h3 className="font-bold text-sm text-gray-900">Stock Market Updates</h3>
            </div>
            <div className="space-y-2 text-xs">
              {stockMarketData.map((st, i) => (
                <div key={i} className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-bold text-gray-800 text-[11px] truncate max-w-[140px]">{st.name}</div>
                    <div className="text-[10px] font-bold text-emerald-600">{st.change}</div>
                  </div>
                  <div className="font-extrabold text-gray-900">{st.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Promo Ad Banner (Government / Bus travel scheme image) */}
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-xs">
            <AdSlot format="square" slotName="Government Scheme Promo" />
          </div>

        </div>

      </div>

    </div>
  );
};



