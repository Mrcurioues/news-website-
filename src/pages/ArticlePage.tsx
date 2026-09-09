import React, { useState, useEffect } from 'react';
import { getArticleByIdSlug, getRelatedArticles, getTrendingArticles } from '../data/demo';
import { useRouter, Link } from '../context/RouterContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ShareBar } from '../components/ShareBar';
import { StoryCard } from '../components/StoryCard';
import { TrendingWidget } from '../components/TrendingWidget';
import { AdSlot } from '../components/AdSlot';
import { useStoriesStore } from '../stores/storiesStore';
import { usePluginsStore } from '../stores/pluginsStore';
import { Article } from '../types';
import { LeftSidebarNav } from '../components/LeftSidebarNav';
import { renderFormattedContent, parseInlineFormatting } from '../utils/markdownRenderer';
import {
  getArticleTitle,
  getArticleExcerpt,
  getArticleBody,
  getArticleKeyPoints,
  getArticleTags,
  getArticleAuthorName,
  getArticleAuthorRole,
  getArticlePublishedAt,
  getCategoryName,
  formatViews
} from '../utils/translations';
import {
  ChevronRight,
  Clock,
  Eye,
  Volume2,
  VolumeX,
  Type,
  CheckCircle2,
  ArrowLeft,
  Activity
} from 'lucide-react';

interface ArticlePageProps {
  idSlug: string;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ idSlug }) => {
  const { updateMetadata, lang, t } = useRouter();
  const { stories } = useStoriesStore();
  const { plugins } = usePluginsStore();
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const seoPlugin = plugins.find((p) => p.id === 'yoast-seo-master');
  const isSeoActive = seoPlugin?.isInstalled && seoPlugin?.isActive;

  const heatmapPlugin = plugins.find((p) => p.id === 'live-heatmap-analytics');
  const isHeatmapActive = heatmapPlugin?.isInstalled && heatmapPlugin?.isActive;

  useEffect(() => {
    if (!isHeatmapActive) return;
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollPercent(Math.round(current));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeatmapActive]);

  // Find target story by ID or Slug
  const targetStory = stories.find(s => s.id === idSlug || s.slug === idSlug);

  // Convert to display Article format
  const article: Article | undefined = targetStory
    ? {
        id: targetStory.id,
        slug: targetStory.slug || targetStory.id,
        idSlug: targetStory.slug || targetStory.id,
        title: targetStory.headlineHi || targetStory.headline,
        titleEn: targetStory.headlineEn || targetStory.headline,
        titleHi: targetStory.headlineHi || targetStory.headline,
        titleBn: targetStory.headlineBn,
        excerpt: targetStory.summaryHi || targetStory.summary,
        excerptEn: targetStory.summaryEn || targetStory.summary,
        excerptHi: targetStory.summaryHi || targetStory.summary,
        excerptBn: targetStory.summaryBn,
        category: targetStory.section || 'National',
        categorySlug: (targetStory.section || 'national').toLowerCase().replace(/[^a-z0-9]+/g, ''),
        author: {
          name: targetStory.byline || 'Staff Reporter',
          nameHi: targetStory.byline || 'संवाददाता',
          role: 'Journalist',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        },
        publishedAt: targetStory.publishDate || targetStory.createdAt,
        readTime: '3 मिनट',
        readTimeEn: '3 min read',
        coverImage: targetStory.mainImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
        imageCaption: targetStory.mainImageCaptionHi || targetStory.mainImageCaption || '',
        imageCaptionEn: targetStory.mainImageCaptionEn || targetStory.mainImageCaption || '',
        imageCaptionHi: targetStory.mainImageCaptionHi || targetStory.mainImageCaption || '',
        imageCaptionBn: targetStory.mainImageCaptionBn,
        imageAltText: targetStory.mainImageAltHi || targetStory.mainImageAlt || '',
        imageAltTextEn: targetStory.mainImageAltEn || targetStory.mainImageAlt || '',
        imageAltTextHi: targetStory.mainImageAltHi || targetStory.mainImageAlt || '',
        imageAltTextBn: targetStory.mainImageAltBn,
        tags: targetStory.topics || ['News'],
        body: [targetStory.bodyHi || targetStory.body],
        bodyEn: [targetStory.bodyEn || targetStory.body],
        bodyHi: [targetStory.bodyHi || targetStory.body],
        bodyBn: targetStory.bodyBn ? [targetStory.bodyBn] : undefined,
        isBreaking: targetStory.isBreaking,
        isFeatured: targetStory.isFeatured,
        isTrending: targetStory.isTrending,
        views: targetStory.views || 100,
        videoUrl: targetStory.videoUrl,
      }
    : getArticleByIdSlug(idSlug);

  useEffect(() => {
    if (article) {
      updateMetadata({
        title: `${getArticleTitle(article, lang)} - ${t.appName}`,
        description: getArticleExcerpt(article, lang)
      });
    }
  }, [article, lang, updateMetadata]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {lang === 'en' ? 'Article Not Found' : 'समाचार लेख नहीं मिला'}
        </h1>
        <p className="text-gray-600 mb-8">
          {lang === 'en'
            ? 'The requested article may have been removed or moved.'
            : 'अनुरोधित लेख हटा दिया गया है या स्थानांतरित कर दिया गया है।'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-600 text-white rounded-lg font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'en' ? 'Return to Home' : 'मुख्य पृष्ठ पर लौटें'}
        </Link>
      </div>
    );
  }

  const title = getArticleTitle(article, lang);
  const excerpt = getArticleExcerpt(article, lang);
  const bodyParagraphs = getArticleBody(article, lang);
  const keyPoints = getArticleKeyPoints(article, lang);
  const tags = getArticleTags(article, lang);
  const authorName = getArticleAuthorName(article, lang);
  const authorRole = getArticleAuthorRole(article, lang);
  const publishedAt = getArticlePublishedAt(article, lang);
  const categoryName = article.category;

  useEffect(() => {
    if (!article) return;
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToRead = `${title}. ${excerpt}. ${bodyParagraphs.join(' ')}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = lang === 'en' ? 'en-IN' : lang === 'bn' ? 'bn-BD' : 'hi-IN';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlayingAudio, article, lang, title, excerpt, bodyParagraphs]);

  const relatedArticles = getRelatedArticles(article as any, 3);
  const trendingArticles = getTrendingArticles(5);

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': title,
    'description': excerpt,
    'image': [article.coverImage],
    'datePublished': article.publishedAt,
    'author': {
      '@type': 'Person',
      'name': authorName
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Bharat Samachar',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://bharatsamachar.com/logo.png'
      }
    }
  };

  const fontClasses = {
    sm: 'text-base leading-relaxed',
    base: 'text-lg leading-relaxed',
    lg: 'text-xl leading-relaxed',
    xl: 'text-2xl leading-relaxed'
  };

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-4 py-5 font-sans relative">
      <div className="flex gap-4 sm:gap-6 items-start">
        {/* Left Sticky Navigation Bar */}
        <LeftSidebarNav />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Yoast SEO JSON-LD Schema Plugin Output */}
          {isSeoActive && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
            />
          )}

          {/* Live Heatmap Scroll Tracker Plugin */}
          {isHeatmapActive && (
            <div className="fixed top-0 left-0 right-0 z-50 bg-rose-100 h-1.5">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-150"
                style={{ width: `${scrollPercent}%` }}
              />
              <div className="absolute top-2 right-4 bg-slate-900 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Heatmap Scroll Depth: {scrollPercent}%</span>
              </div>
            </div>
          )}

          {/* Top Banner Ad */}
          <AdSlot format="leaderboard" slotName="Article Top Leaderboard" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-rose-600">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link href={`/category/${article.categorySlug}`} className="hover:text-rose-600">
              {categoryName}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 truncate max-w-[200px] sm:max-w-xs">{title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Body (8 Cols) */}
        <article className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs article-content protected-article-content">
          {/* Category Tag */}
          <div className="mb-3 flex items-center gap-2">
            <span className="bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded">
              {categoryName}
            </span>
            {article.isBreaking && (
              <span className="bg-rose-600 text-white text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded animate-pulse">
                BREAKING
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-black text-gray-950 font-serif leading-tight sm:leading-tight mb-4">
            {parseInlineFormatting(title)}
          </h1>

          {/* Excerpt Summary */}
          {excerpt && (
            <div className="text-lg sm:text-xl font-medium text-gray-700 leading-relaxed mb-6 border-l-4 border-rose-600 pl-4 py-1 bg-gray-50/50 rounded-r-lg">
              {parseInlineFormatting(excerpt)}
            </div>
          )}

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 mb-6 text-xs text-gray-600">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img src={article.author.avatar} alt={authorName} className="w-10 h-10 rounded-full object-cover border border-rose-200" />
              <div>
                <div className="font-bold text-gray-900 text-sm flex items-center gap-1">
                  {authorName}
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                </div>
                <div className="text-gray-500">{authorRole}</div>
              </div>
            </div>

            {/* Time & Views */}
            <div className="flex items-center gap-4 text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{publishedAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-gray-400" />
                <span>{formatViews(article.views, lang)}</span>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-6">
            {/* Audio Listen */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                isPlayingAudio ? 'bg-rose-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
              <span>{isPlayingAudio ? (lang === 'en' ? 'Stop Listening' : 'सुनना बंद करें') : (lang === 'en' ? 'Listen to Story' : 'ख़बर सुनें')}</span>
            </button>

            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
              <Type className="w-3.5 h-3.5 text-gray-400 ml-1.5 mr-1" />
              {(['sm', 'base', 'lg', 'xl'] as const).map(sz => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-2 py-0.5 text-xs font-bold rounded cursor-pointer ${
                    fontSize === sz ? 'bg-rose-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {sz.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Main Cover Media (Image or Video) */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-sm bg-black">
            {(() => {
              const vUrl = article.videoUrl;
              if (vUrl) {
                const ytMatch = vUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
                if (ytMatch) {
                  const ytId = ytMatch[1];
                  return (
                    <div className="relative aspect-16/9 w-full">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                        title={title}
                        className="w-full h-full border-0 rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }

                return (
                  <video
                    src={vUrl}
                    poster={article.coverImage}
                    controls
                    preload="metadata"
                    className="w-full h-auto max-h-[450px] object-cover"
                    onError={(e) => {
                      // Fallback to cover image if video fails to load
                      const el = e.currentTarget;
                      el.style.display = 'none';
                    }}
                  />
                );
              }

              return <ImageWithFallback src={article.coverImage} alt={title} className="w-full h-auto max-h-[450px] object-cover" />;
            })()}
          </div>

          {/* Key Takeaways Box */}
          {keyPoints && keyPoints.length > 0 && (
            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-5 mb-8">
              <h3 className="text-sm font-bold text-rose-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                {lang === 'en' ? 'Key Takeaways' : 'मुख्य बातें'}
              </h3>
              <ul className="space-y-2 text-sm font-medium text-gray-800">
                {keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Paragraphs with Formatted Links & Markdown */}
          <div className={`space-y-4 text-gray-800 font-sans ${fontClasses[fontSize]}`}>
            {bodyParagraphs.map((para, i) => (
              <div key={i} className="leading-relaxed">
                {renderFormattedContent(para)}
              </div>
            ))}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Tags:</span>
              {tags.map(tg => (
                <span key={tg} className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                  #{tg}
                </span>
              ))}
            </div>
          )}

          {/* Social Share Bar */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <ShareBar title={title} url={window.location.href} />
          </div>
        </article>

        {/* Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <TrendingWidget articles={trendingArticles} />
          <AdSlot format="square" slotName="Article Sidebar Ad" />
        </aside>
      </div>

          {/* Related Stories */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold font-serif text-gray-900 mb-6">
                {lang === 'en' ? 'Related News Stories' : 'संबंधित समाचार'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map(rel => (
                  <StoryCard key={rel.id} article={rel} variant="grid" />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
