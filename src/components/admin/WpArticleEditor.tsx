import React, { useState } from 'react';
import { Article, PostStatus } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { ADMIN_TRANSLATIONS } from '../../utils/adminTranslations';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  ChevronDown,
  X,
  Radio,
  Star,
  TrendingUp,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Video
} from 'lucide-react';

import { SEOEngine, SeoReadinessResult } from '../../services/seoEngine';

interface WpArticleEditorProps {
  initialArticle?: Partial<Article>;
  onSave: (articleData: Partial<Article>) => void;
  onDeleteRequest: (id: string, title: string) => void;
  onOpenAssistant: () => void;
  onCancel: () => void;
}

export const WpArticleEditor: React.FC<WpArticleEditorProps> = ({
  initialArticle,
  onSave,
  onOpenAssistant,
  onCancel
}) => {
  const { lang } = useRouter();
  const t = ADMIN_TRANSLATIONS[lang] || ADMIN_TRANSLATIONS.hi;

  const [title, setTitle] = useState(initialArticle?.title || '');
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || '');
  const [kicker, setKicker] = useState('');
  
  // Combine paragraphs into a single string for the WYSIWYG editor illusion
  const [bodyText, setBodyText] = useState(
    initialArticle?.body?.join('\n\n') || ''
  );
  
  const [categorySlug, setCategorySlug] = useState(initialArticle?.categorySlug || 'national');
  const [status, setStatus] = useState<PostStatus>(initialArticle?.status || 'draft');
  const [isBreaking, setIsBreaking] = useState(!!initialArticle?.isBreaking);
  const [isTrending, setIsTrending] = useState(!!initialArticle?.isTrending);
  const [coverImage, setCoverImage] = useState(
    initialArticle?.coverImage || ''
  );
  const [videoUrl, setVideoUrl] = useState(
    initialArticle?.videoUrl || ''
  );

  // Editorial Source & Fact Check state
  const [primarySourceUrl, setPrimarySourceUrl] = useState('');
  const [sourceType, setSourceType] = useState<string>('official');
  const [verificationNote, setVerificationNote] = useState('');
  const [showSeoPreviewModal, setShowSeoPreviewModal] = useState(false);
  
  const [tags, setTags] = useState<string[]>(initialArticle?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'story' | 'publishing' | 'advanced'>('story');

  const isValidVideoUrl = (url: string): boolean => {
    if (!url || !url.trim()) return true;
    try {
      const parsed = new URL(url.trim());
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const clean = tagInput.trim();
      if (clean && !tags.includes(clean)) {
        setTags([...tags, clean]);
        setTagInput('');
      }
    }
  };

  const handleSaveSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave({
      ...initialArticle,
      title,
      titleEn: title,
      excerpt,
      body: bodyText.split('\n\n').filter(p => p.trim() !== ''),
      categorySlug,
      status,
      isBreaking,
      isTrending,
      coverImage,
      videoUrl: videoUrl.trim(),
      tags
    });
  };

  const draftRef = React.useRef({ title, excerpt, bodyText, categorySlug, status, isBreaking, isTrending, coverImage, videoUrl, tags });
  React.useEffect(() => {
    draftRef.current = { title, excerpt, bodyText, categorySlug, status, isBreaking, isTrending, coverImage, videoUrl, tags };
  }, [title, excerpt, bodyText, categorySlug, status, isBreaking, isTrending, coverImage, videoUrl, tags]);

  React.useEffect(() => {
    const saveCurrentDraft = () => {
      const cur = draftRef.current;
      if (!cur.title.trim() && !cur.bodyText.trim() && !cur.excerpt.trim()) return;
      onSave({
        ...initialArticle,
        title: cur.title || 'Untitled Draft',
        titleEn: cur.title || 'Untitled Draft',
        excerpt: cur.excerpt,
        body: cur.bodyText.split('\n\n').filter(p => p.trim() !== ''),
        categorySlug: cur.categorySlug,
        status: 'draft',
        isBreaking: cur.isBreaking,
        isTrending: cur.isTrending,
        coverImage: cur.coverImage,
        videoUrl: cur.videoUrl?.trim(),
        tags: cur.tags
      });
    };

    const interval = setInterval(saveCurrentDraft, 3000);
    const handleBeforeUnload = () => saveCurrentDraft();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') saveCurrentDraft();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] overflow-hidden text-gray-800">
      {/* EDITOR TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-900 flex items-center gap-1 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> {lang === 'en' ? 'Stories' : 'स्टोरीज़'}
          </button>
          <div className="h-4 w-px bg-gray-300"></div>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {lang === 'en' ? 'Saved automatically' : 'स्वत: सहेजा गया'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onOpenAssistant} className="text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 border border-purple-100 transition-colors cursor-pointer">
            <Sparkles className="w-3.5 h-3.5" /> {lang === 'en' ? 'AI Assistant' : 'AI सहायक'}
          </button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            {lang === 'en' ? 'Preview' : 'प्रीव्यू'}
          </button>
          <button onClick={handleSaveSubmit} className="bg-gray-900 text-white px-5 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
            {lang === 'en' ? 'Publish Story' : 'स्टोरी पब्लिश करें'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT COLUMN: ARTICLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar bg-[#F8F9FA]">
          <div className="max-w-3xl mx-auto space-y-6 pb-20">
            
            {/* Kicker */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                {lang === 'en' ? 'Kicker (Optional)' : 'किकर (वैकल्पिक)'}
              </label>
              <input 
                type="text" 
                value={kicker}
                onChange={e => setKicker(e.target.value)}
                placeholder={lang === 'en' ? "e.g. Economy, Election 2024" : "जैसे- चुनाव 2024"} 
                className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 px-0 py-2 text-sm outline-none transition-colors" 
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                {lang === 'en' ? 'Headline *' : 'मुख्य शीर्षक *'}
              </label>
              <textarea 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={lang === 'en' ? "Write the main news title here..." : "मुख्य समाचार शीर्षक यहाँ लिखें..."} 
                rows={2} 
                className="w-full bg-transparent border-none text-4xl font-bold text-gray-900 placeholder-gray-300 resize-none outline-none leading-tight" 
                style={{ minHeight: '80px' }}
              />
            </div>

            {/* Summary / Dek */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                {lang === 'en' ? 'Summary / Dek' : 'संक्षिप्त विवरण'}
              </label>
              <textarea 
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder={lang === 'en' ? "Briefly summarize the story for the readers..." : "पाठकों के लिए कहानी का संक्षिप्त सारांश लिखें..."} 
                rows={2} 
                className="w-full bg-transparent border-none text-xl text-gray-600 placeholder-gray-400 resize-none outline-none leading-snug" 
              />
            </div>

            {/* Main Image Upload Area */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Main Image' : 'मुख्य तस्वीर'}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl bg-white p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors group relative overflow-hidden">
                {coverImage ? (
                  <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                ) : null}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-900 bg-white/80 px-3 py-1 rounded">
                    {coverImage ? (lang === 'en' ? 'Change Image' : 'तस्वीर बदलें') : (lang === 'en' ? 'Upload Image' : 'तस्वीर अपलोड करें')}
                  </span>
                </div>
              </div>
            </div>

            {/* Video URL Optional Input */}
            <div className="mt-4 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-rose-600" />
                <span>Video URL (Optional)</span>
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="e.g. https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 outline-none focus:border-rose-500 focus:bg-white transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1.5 leading-normal">
                Paste a video URL here to show a video in the lead coverage or article. Leave empty to use the normal image.
              </p>
              {videoUrl.trim() !== '' && !isValidVideoUrl(videoUrl) && (
                <p className="text-xs font-semibold text-rose-600 mt-1.5">
                  ⚠️ Please enter a valid video URL starting with http:// or https://
                </p>
              )}
            </div>

            {/* Story Body WYSIWYG */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex flex-wrap gap-1 items-center">
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><Bold className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><Italic className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><Underline className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded font-bold text-sm cursor-pointer">H2</button>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><List className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><ListOrdered className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><Quote className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><LinkIcon className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><ImageIcon className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded cursor-pointer"><Video className="w-4 h-4" /></button>
              </div>
              <textarea
                value={bodyText}
                onChange={e => setBodyText(e.target.value)}
                placeholder={lang === 'en' ? "Start writing your story..." : "अपनी स्टोरी यहाँ लिखना शुरू करें..."}
                className="w-full p-6 min-h-[300px] text-gray-800 leading-relaxed outline-none resize-y"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR SETTINGS */}
        <div className="w-full md:w-80 bg-white border-l border-gray-200 flex flex-col h-full shrink-0 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveSidebarTab('story')}
              className={`flex-1 py-3 text-sm font-semibold cursor-pointer ${activeSidebarTab === 'story' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Story
            </button>
            <button 
              onClick={() => setActiveSidebarTab('publishing')}
              className={`flex-1 py-3 text-sm font-semibold cursor-pointer ${activeSidebarTab === 'publishing' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Publishing
            </button>
            <button 
              onClick={() => setActiveSidebarTab('advanced')}
              className={`flex-1 py-3 text-sm font-semibold cursor-pointer ${activeSidebarTab === 'advanced' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Advanced
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 hide-scrollbar space-y-6">
            
            {activeSidebarTab === 'story' && (
              <>
                {/* Publishing Status Badge */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> {status === 'draft' ? 'Draft' : status === 'scheduled' ? 'Scheduled' : status === 'published' ? 'Published' : 'In Review'}
                  </span>
                </div>

                {/* SEO Readiness Assistant Panel */}
                {(() => {
                  const readiness: SeoReadinessResult = SEOEngine.calculateReadiness({
                    title,
                    excerpt,
                    coverImage,
                    categorySlug,
                    tags,
                    primarySourceUrl
                  });
                  return (
                    <div className="border border-emerald-200 bg-emerald-50/60 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">SEO Readiness</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          readiness.status === 'SEO Ready 🟢' ? 'bg-emerald-200 text-emerald-800' :
                          readiness.status === 'Needs Attention 🟡' ? 'bg-amber-200 text-amber-800' : 'bg-red-200 text-red-800'
                        }`}>
                          {readiness.status} ({readiness.score}/100)
                        </span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const articleContext = {
                            title: title || 'Breaking News Update',
                            excerpt,
                            body: bodyText ? bodyText.split('\n\n') : [],
                            categorySlug,
                            coverImage
                          };
                          const optTitle = SEOEngine.generateTitle(articleContext);
                          const optDesc = SEOEngine.generateMetaDescription(articleContext);
                          const entities = SEOEngine.extractEntities((title || '') + ' ' + (bodyText || ''));
                          const entityTags = entities.map(e => e.canonicalName);
                          
                          setTitle(optTitle);
                          setExcerpt(optDesc);
                          if (entityTags.length > 0) {
                            const combined = Array.from(new Set([...tags, ...entityTags]));
                            setTags(combined);
                          }
                          toast.success('✨ Title, Meta Description & Bengali Entity Tags optimized for Google Search!');
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        ✨ Optimize Article Metadata in 1-Click
                      </button>

                      <div className="space-y-1.5 text-xs text-gray-600 pt-1 border-t border-emerald-100">
                        {readiness.criticalIssues.map((issue, i) => (
                          <div key={'c' + i} className="flex items-start gap-1.5 text-rose-700 font-medium">
                            <span>🔴</span>
                            <span>{issue}</span>
                          </div>
                        ))}
                        {readiness.warnings.map((warn, i) => (
                          <div key={'w' + i} className="flex items-start gap-1.5 text-amber-700 font-medium">
                            <span>🟡</span>
                            <span>{warn}</span>
                          </div>
                        ))}
                        {readiness.info.map((inf, i) => (
                          <div key={'i' + i} className="flex items-start gap-1.5 text-emerald-800">
                            <span>🟢</span>
                            <span>{inf}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowSeoPreviewModal(true)}
                        className="text-xs font-semibold text-emerald-700 hover:underline pt-1 block"
                      >
                        🔍 Preview Search & Social Card
                      </button>
                    </div>
                  );
                })()}

                {/* Section */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Section</label>
                  <div className="relative">
                    <select 
                      value={categorySlug}
                      onChange={e => setCategorySlug(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-gray-400 text-sm cursor-pointer"
                    >
                      <option value="national">National</option>
                      <option value="business">Business</option>
                      <option value="politics">Politics</option>
                      <option value="tech">Tech & AI</option>
                      <option value="west-bengal">West Bengal / পশ্চিমবঙ্গ</option>
                      <option value="kolkata">Kolkata / কলকাতা</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Editorial Source & Verification */}
                <div className="border border-gray-200 rounded-xl p-3.5 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Editorial Source</label>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      sourceType === 'official' ? 'bg-emerald-100 text-emerald-800' :
                      sourceType === 'ground' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sourceType === 'official' ? 'Official / Govt 🟢' : sourceType === 'ground' ? 'Ground Reporting 🟡' : 'Verification Required 🔴'}
                    </span>
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="Primary Source URL (e.g. Govt PR, Press Trust)..."
                      value={primarySourceUrl}
                      onChange={e => setPrimarySourceUrl(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-200 rounded-lg outline-none bg-white focus:border-blue-400"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSourceType('official')}
                      className={`text-xs py-1.5 rounded font-medium border ${sourceType === 'official' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-200'}`}
                    >
                      Government 🟢
                    </button>
                    <button
                      type="button"
                      onClick={() => setSourceType('ground')}
                      className={`text-xs py-1.5 rounded font-medium border ${sourceType === 'ground' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
                    >
                      Ground 🟡
                    </button>
                    <button
                      type="button"
                      onClick={() => setSourceType('unverified')}
                      className={`text-xs py-1.5 rounded font-medium border ${sourceType === 'unverified' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-700 border-gray-200'}`}
                    >
                      Verify 🔴
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Verification note / Reporter source note..."
                      value={verificationNote}
                      onChange={e => setVerificationNote(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-200 rounded-lg outline-none bg-white focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Topics</label>
                  <div className="border border-gray-200 rounded-lg bg-gray-50 p-2 flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="bg-white border border-gray-200 text-xs px-2 py-1 rounded flex items-center gap-1 text-gray-700 shadow-sm">
                        {tag} <X onClick={() => setTags(tags.filter(t => t !== tag))} className="w-3 h-3 cursor-pointer hover:text-red-500" />
                      </span>
                    ))}
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Add topic..." 
                      className="bg-transparent border-none text-sm outline-none w-24" 
                    />
                  </div>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Author / Byline</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-gray-400 text-sm cursor-pointer">
                      <option>Amit Sharma (Staff Editor)</option>
                      <option>Priya Mehta (West Bengal Bureau)</option>
                      <option>Guest Contributor</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {activeSidebarTab === 'publishing' && (
              <>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border border-rose-200 bg-rose-50/50 rounded-lg cursor-pointer hover:bg-rose-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-rose-600" />
                      <span className="text-sm font-semibold text-rose-600">Make Breaking News</span>
                    </div>
                    <input type="checkbox" checked={isBreaking} onChange={e => setIsBreaking(e.target.checked)} className="w-4 h-4 accent-rose-600 rounded border-gray-300" />
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium">Featured Story</span>
                    </div>
                    <input type="checkbox" className="w-4 h-4 accent-gray-900 rounded border-gray-300" />
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2 text-gray-700">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium">Trending Story</span>
                    </div>
                    <input type="checkbox" checked={isTrending} onChange={e => setIsTrending(e.target.checked)} className="w-4 h-4 accent-gray-900 rounded border-gray-300" />
                  </label>
                </div>
              </>
            )}

            {activeSidebarTab === 'advanced' && (
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Canonical URL</label>
                  <input
                    type="text"
                    readOnly
                    value={`https://bharatnews.in/news/${categorySlug}/${SEOEngine.generateSlug(title || 'article')}`}
                    className="w-full text-xs p-2 bg-gray-100 border border-gray-200 rounded text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Structured Data JSON-LD</label>
                  <textarea
                    readOnly
                    rows={6}
                    value={SEOEngine.generateStructuredData({
                      id: initialArticle?.id || 'new',
                      title: title || 'Draft Title',
                      excerpt: excerpt || '',
                      body: bodyText ? bodyText.split('\n\n') : [],
                      categorySlug,
                      publishedAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      coverImage: coverImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200',
                      videoUrl: videoUrl || undefined,
                      tags: tags.length ? tags : ['News'],
                      status
                    })}
                    className="w-full text-[11px] font-mono p-2 bg-gray-900 text-emerald-400 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Preview Modal */}
      {showSeoPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                Google Search & Social Card Preview
              </h3>
              <button onClick={() => setShowSeoPreviewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Google Search Card */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Google Search Result</span>
              <div className="border p-3.5 rounded-lg bg-gray-50 space-y-1">
                <div className="text-xs text-emerald-700 font-mono truncate">
                  https://bharatnews.in › news › {categorySlug} › {SEOEngine.generateSlug(title || 'article')}
                </div>
                <div className="text-base text-blue-800 font-medium hover:underline leading-snug truncate">
                  {title || 'Article Title Preview - Bharat News'}
                </div>
                <div className="text-xs text-gray-600 line-clamp-2">
                  {excerpt || 'Meta description summary will appear here to boost organic Google CTR.'}
                </div>
              </div>
            </div>

            {/* Social Card */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Social / Whatsapp Card</span>
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm max-w-md">
                {coverImage ? (
                  <img src={coverImage} alt="Preview" className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>
                )}
                <div className="p-3 space-y-1">
                  <div className="text-xs font-bold text-gray-500 uppercase">BHARATNEWS.IN</div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{title || 'Story Title'}</div>
                  <div className="text-xs text-gray-600 line-clamp-2">{excerpt}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowSeoPreviewModal(false)}
                className="bg-gray-900 text-white font-medium text-xs px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

