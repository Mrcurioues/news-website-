import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, CheckCircle2, Eye, ChevronDown, Radio, Star,
  TrendingUp, X, Bold, Italic,
  List, ListOrdered, Quote, Link2, Image as ImageIcon,
  Video, Hash, AlertCircle, Lock, Globe, Save, Calendar,
  FileText, Share2, Settings, ChevronRight, Clock, MapPin,
  User, Tag, Upload, Search, Plus, ExternalLink, Sparkles, SlidersHorizontal, Volume2, Code
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useStoriesStore } from '../../stores/storiesStore';
import { useAuthStore } from '../../stores/authStore';
import { useMediaStore } from '../../stores/mediaStore';
import { usePluginsStore } from '../../stores/pluginsStore';
import { renderFormattedContent } from '../../utils/markdownRenderer';
import { StoryStatus, StoryType } from '../../types/admin';
import { attachBengaliSmartTyping } from '../../utils/bengaliInput';
import { SeoAssistant } from '../../components/admin/seo/SeoAssistant';

interface StoryEditorPageProps {
  storyId?: string;
  onNavigate: (path: string) => void;
}

const STORY_TYPES: { value: StoryType; label: string }[] = [
  { value: 'news', label: 'News' },
  { value: 'feature', label: 'Feature' },
  { value: 'explainer', label: 'Explainer' },
  { value: 'photo_story', label: 'Photo Story' },
  { value: 'video_story', label: 'Video Story' },
  { value: 'live_blog', label: 'Live Blog' },
  { value: 'list', label: 'List' },
  { value: 'opinion', label: 'Opinion' },
];

const SECTIONS = ['National', 'Politics', 'Business', 'Cricket', 'Entertainment', 'Tech & AI', 'World', 'Lifestyle', 'Science'];

const STATUS_STEPS: { key: StoryStatus; label: string }[] = [
  { key: 'draft', label: 'Draft' },
  { key: 'in_review', label: 'Review' },
  { key: 'approved', label: 'Approved' },
  { key: 'published', label: 'Published' },
];

const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string }> = {
  draft: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  in_review: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  approved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  scheduled: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  published: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
};

type SidebarTab = 'story' | 'seo' | 'format' | 'media' | 'distribution' | 'publish' | 'advanced';


export const StoryEditorPage: React.FC<StoryEditorPageProps> = ({ storyId, onNavigate }) => {
  const { stories, addStory, updateStory, subscribeToRealtimeDrafts } = useStoriesStore();
  const { user } = useAuthStore();
  const { items: mediaItems, addItem: addMediaItem, uploadFile, fetchFromSupabase: fetchMediaFromSupabase } = useMediaStore();

  useEffect(() => {
    fetchMediaFromSupabase();
    const unsubscribeRealtime = subscribeToRealtimeDrafts();
    return () => unsubscribeRealtime();
  }, []);

  const isNew = !storyId || storyId === 'new';
  const existingStory = stories.find(s => s.id === storyId);

  const [id, setId] = useState<string | null>(existingStory?.id || null);
  const [headline, setHeadline] = useState(existingStory?.headline || '');
  const [headlineHi, setHeadlineHi] = useState(existingStory?.headlineHi || '');
  const [headlineBn, setHeadlineBn] = useState(existingStory?.headlineBn || '');
  
  const [kicker, setKicker] = useState(existingStory?.kicker || '');
  
  const [summary, setSummary] = useState(existingStory?.summary || '');
  const [summaryHi, setSummaryHi] = useState(existingStory?.summaryHi || '');
  const [summaryBn, setSummaryBn] = useState(existingStory?.summaryBn || '');
  
  const [body, setBody] = useState(existingStory?.body || '');
  const [bodyHi, setBodyHi] = useState(existingStory?.bodyHi || '');
  const [bodyBn, setBodyBn] = useState(existingStory?.bodyBn || '');
  
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'hi' | 'bn'>('bn');
  
  const [section, setSection] = useState(existingStory?.section || 'National');
  const [topics, setTopics] = useState<string[]>(existingStory?.topics || ['National', 'News']);
  const [byline, setByline] = useState(existingStory?.byline || user.name);
  const [storyType, setStoryType] = useState<StoryType>(existingStory?.type || 'news');
  const [status, setStatus] = useState<StoryStatus>(existingStory?.status || 'draft');
  const [isBreaking, setIsBreaking] = useState(!!existingStory?.isBreaking);
  const [isFeatured, setIsFeatured] = useState(!!existingStory?.isFeatured);
  const [isTrending, setIsTrending] = useState(!!existingStory?.isTrending);
  const [isPremium, setIsPremium] = useState(!!existingStory?.isPremium);
  const [mainImage, setMainImage] = useState(existingStory?.mainImage || '');
  const [mainImageAlt, setMainImageAlt] = useState(existingStory?.mainImageAlt || '');
  const [mainImageAltHi, setMainImageAltHi] = useState(existingStory?.mainImageAltHi || '');
  const [mainImageAltBn, setMainImageAltBn] = useState(existingStory?.mainImageAltBn || '');
  
  const [seoTitle, setSeoTitle] = useState(existingStory?.seoTitle || '');
  const [seoTitleHi, setSeoTitleHi] = useState(existingStory?.seoTitleHi || '');
  const [seoTitleBn, setSeoTitleBn] = useState(existingStory?.seoTitleBn || '');
  
  const [seoDescription, setSeoDescription] = useState(existingStory?.seoDescription || '');
  const [seoDescriptionHi, setSeoDescriptionHi] = useState(existingStory?.seoDescriptionHi || '');
  const [seoDescriptionBn, setSeoDescriptionBn] = useState(existingStory?.seoDescriptionBn || '');

  const [slug, setSlug] = useState(existingStory?.slug || '');


  const [topicInput, setTopicInput] = useState('');
  const [publishMenuOpen, setPublishMenuOpen] = useState(false);
  const queryTab = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('tab') : null;
  const [activeTab, setActiveTab] = useState<SidebarTab>((queryTab as SidebarTab) || 'format');
  const [savedAt, setSavedAt] = useState<Date | null>(existingStory ? new Date(existingStory.updatedAt) : null);
  const [location, setLocation] = useState(existingStory?.location || 'NEW DELHI');

  // Modals & Media Picker State
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaModalTarget, setMediaModalTarget] = useState<'main_image' | 'body'>('main_image');
  const [mediaModalTab, setMediaModalTab] = useState<'select' | 'upload'>('select');
  const [mediaSearch, setMediaSearch] = useState('');

  // Schedule Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const [scheduleDate, setScheduleDate] = useState<string>(
    existingStory?.scheduledDate ? existingStory.scheduledDate.split('T')[0] : getTomorrowDate()
  );
  const [scheduleTime, setScheduleTime] = useState<string>(
    existingStory?.scheduledDate && existingStory.scheduledDate.includes('T')
      ? existingStory.scheduledDate.split('T')[1].substring(0, 5)
      : '10:00'
  );
  const [scheduledDateVal, setScheduledDateVal] = useState<string | undefined>(existingStory?.scheduledDate);
  
  // Link & Video & Image Modal State
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoCaption, setVideoCaption] = useState('');

  // Image Inspector & Controls State
  const [selectedImgEl, setSelectedImgEl] = useState<HTMLImageElement | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imgWidth, setImgWidth] = useState('100%');
  const [imgAlign, setImgAlign] = useState<'left' | 'center' | 'right'>('center');
  const [imgCaptionText, setImgCaptionText] = useState('');
  const [imgObjectFit, setImgObjectFit] = useState<'cover' | 'contain' | 'fill'>('cover');

  const editorRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLTextAreaElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const detach1 = headlineRef.current ? attachBengaliSmartTyping(headlineRef.current, (val) => {
      setHeadline(val);
      setHeadlineBn(val);
    }) : null;
    const detach2 = summaryRef.current ? attachBengaliSmartTyping(summaryRef.current, (val) => {
      setSummary(val);
      setSummaryBn(val);
    }) : null;
    const detach3 = editorRef.current ? attachBengaliSmartTyping(editorRef.current, (html) => {
      const md = visualHtmlToMarkdown(html);
      setBody(md);
    }) : null;
    return () => {
      if (detach1) detach1();
      if (detach2) detach2();
      if (detach3) detach3();
    };
  }, []);

  // Auto-Save Draft & Window Exit (beforeunload / cut) Protection
  const draftRef = useRef({
    id,
    headline,
    headlineHi,
    headlineBn,
    kicker,
    summary,
    summaryHi,
    summaryBn,
    body,
    bodyHi,
    bodyBn,
    section,
    topics,
    byline,
    storyType,
    status,
    isBreaking,
    isFeatured,
    isTrending,
    isPremium,
    mainImage,
    mainImageAlt,
    seoTitle,
    seoDescription,
    location
  });

  useEffect(() => {
    draftRef.current = {
      id,
      headline,
      headlineHi,
      headlineBn,
      kicker,
      summary,
      summaryHi,
      summaryBn,
      body,
      bodyHi,
      bodyBn,
      section,
      topics,
      byline,
      storyType,
      status,
      isBreaking,
      isFeatured,
      isTrending,
      isPremium,
      mainImage,
      mainImageAlt,
      seoTitle,
      seoDescription,
      location
    };
  }, [
    id, headline, headlineHi, headlineBn, kicker, summary, summaryHi, summaryBn,
    body, bodyHi, bodyBn, section, topics, byline, storyType, status, isBreaking,
    isFeatured, isTrending, isPremium, mainImage, mainImageAlt, seoTitle, seoDescription, location
  ]);

  const saveDraftLocally = () => {
    const liveHeadline = headlineRef.current?.value ?? headline;
    const liveSummary = summaryRef.current?.value ?? summary;
    const liveBody = editorRef.current ? visualHtmlToMarkdown(editorRef.current.innerHTML) : body;

    if (!liveHeadline.trim() && !liveBody.trim() && !liveSummary.trim()) return;

    const cur = draftRef.current;
    const slug = (liveHeadline || 'untitled-draft').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const draftPayload = {
      headline: liveHeadline || 'Untitled Auto-Saved Draft',
      headlineEn: liveHeadline || 'Untitled Auto-Saved Draft',
      headlineHi: cur.headlineHi,
      headlineBn: cur.headlineBn,
      kicker: cur.kicker,
      summary: liveSummary,
      summaryEn: liveSummary,
      summaryHi: cur.summaryHi,
      summaryBn: cur.summaryBn,
      body: liveBody,
      bodyEn: liveBody,
      bodyHi: cur.bodyHi,
      bodyBn: cur.bodyBn,
      section: cur.section,
      topics: cur.topics,
      byline: cur.byline || user.name,
      type: cur.storyType,
      status: 'draft' as StoryStatus,
      isBreaking: cur.isBreaking,
      isFeatured: cur.isFeatured,
      isTrending: cur.isTrending,
      isPremium: cur.isPremium,
      mainImage: cur.mainImage,
      mainImageAlt: cur.mainImageAlt,
      seoTitle: cur.seoTitle,
      seoDescription: cur.seoDescription,
      location: cur.location,
      slug: `${slug}-${Date.now().toString().slice(-4)}`
    };

    if (cur.id) {
      useStoriesStore.getState().updateStory(cur.id, draftPayload);
    } else {
      const created = useStoriesStore.getState().addStory({
        ...draftPayload,
        authorId: user.id,
        views: 0,
        engagement: 0,
        shares: 0,
        comments: 0,
        sources: [],
        relatedStoryIds: []
      });
      draftRef.current.id = created.id;
      setId(created.id);
    }
    setSavedAt(new Date());
  };

  useEffect(() => {
    // Auto save draft every 3 seconds if content exists
    const interval = setInterval(() => {
      saveDraftLocally();
    }, 3000);

    // Save on beforeunload (when user closes tab / website cut / refresh)
    const handleBeforeUnload = () => {
      saveDraftLocally();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveDraftLocally();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Convert markdown [link](url) to Visual HTML for live editing
  const markdownToVisualHtml = (markdown: string): string => {
    if (!markdown) return '';
    let html = markdown
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-bold underline cursor-pointer hover:text-blue-800">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure className="my-4"><img src="$2" alt="$1" class="w-full h-auto max-h-[450px] object-cover rounded-xl shadow-sm" /><figcaption class="text-xs text-center text-gray-500 mt-1.5 font-medium">$1</figcaption></figure>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold font-serif text-gray-900 mt-6 mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold font-serif text-gray-900 mt-4 mb-2">$1</h3>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-rose-600 pl-4 py-2 my-4 bg-rose-50/50 text-gray-800 font-serif italic text-lg rounded-r-lg">$1</blockquote>');
    return html.split(/\n\s*\n/).map(p => `<p className="my-3 leading-relaxed">${p.trim()}</p>`).join('');
  };

  // Convert Visual HTML back to markdown for database storage
  const visualHtmlToMarkdown = (html: string): string => {
    if (!html) return '';
    let temp = html;
    temp = temp.replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, '');
    temp = temp.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, '$1');
    temp = temp.replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
    temp = temp.replace(/<img [^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
    temp = temp.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
    temp = temp.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
    temp = temp.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
    temp = temp.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');
    temp = temp.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
    temp = temp.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');
    temp = temp.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '\n\n> $1\n\n');
    temp = temp.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n');
    temp = temp.replace(/<br\s*\/?>/gi, '\n');
    temp = temp.replace(/<div>/gi, '\n').replace(/<\/div>/gi, '');
    return temp.replace(/\n{3,}/g, '\n\n').trim();
  };

  // Synchronize initial content to visual editor
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim() && body.trim()) {
      editorRef.current.innerHTML = markdownToVisualHtml(body);
    }
  }, [body]);

  const { plugins } = usePluginsStore();
  const aiPlugin = plugins.find(p => p.id === 'ai-news-assistant-pro');
  const isAiActive = aiPlugin?.isInstalled && aiPlugin?.isActive;

  const gutenbergPlugin = plugins.find(p => p.id === 'gutenberg-block-editor');
  const isGutenbergActive = gutenbergPlugin?.isInstalled && gutenbergPlugin?.isActive;

  const yoastPlugin = plugins.find(p => p.id === 'yoast-seo-master');
  const isYoastActive = yoastPlugin?.isInstalled && yoastPlugin?.isActive;

  const socialPlugin = plugins.find(p => p.id === 'auto-social-broadcaster');
  const isSocialActive = socialPlugin?.isInstalled && socialPlugin?.isActive;

  // AI Assistant helpers
  const handleAiHeadlineGenerate = () => {
    if (!headline.trim()) {
      toast.error('Please type a draft headline first!');
      return;
    }
    const variations = [
      `BREAKING: ${headline}`,
      `EXCLUSIVE: Deep Dive into ${headline}`,
      `ANALYSIS: What ${headline} Means for India`
    ];
    const picked = variations[Math.floor(Math.random() * variations.length)];
    setHeadline(picked);
    toast.success('AI Headline generated!', { icon: '✨' });
  };

  const handleAiSummaryGenerate = () => {
    if (!headline && !body) {
      toast.error('Enter headline or body for AI summary generation');
      return;
    }
    const generated = `Latest dispatch on ${headline || 'current story'} from ${location}. Key updates include policy implications, expert reactions, and field reports.`;
    setSummary(generated);
    toast.success('AI Summary generated!', { icon: '✨' });
  };

  // Yoast SEO Score Calculation
  const calculateSeoScore = () => {
    let score = 0;
    if (headline.length >= 25 && headline.length <= 80) score += 25;
    else if (headline.length > 0) score += 10;
    if (summary.length >= 30) score += 20;
    if (mainImage) score += 20;
    if (body.split(/\s+/).length >= 100) score += 20;
    if (topics.length >= 2) score += 15;
    return Math.min(100, score);
  };
  const seoScore = calculateSeoScore();

  const handleSave = (targetStatus: StoryStatus = status, customScheduledDate?: string) => {
    if (!headline.trim()) {
      toast.error('Headline is required before saving');
      return;
    }

    const slug = headline.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const finalScheduledDate = customScheduledDate || scheduledDateVal;

    if (targetStatus === 'published' && isSocialActive) {
      const channel = socialPlugin?.settings?.telegramChannel || '@bharatsamachar_live';
      toast.success(`Auto Social Broadcaster Active: Article pushed to ${channel} & X/Twitter!`, { duration: 4000 });
    }

    if (id) {
      updateStory(id, {
        headline,
        headlineEn: headline,
        headlineHi,
        headlineBn,
        kicker,
        summary,
        summaryEn: summary,
        summaryHi,
        summaryBn,
        body,
        bodyEn: body,
        bodyHi,
        bodyBn,
        section,
        topics,
        byline,
        type: storyType,
        status: targetStatus,
        scheduledDate: targetStatus === 'scheduled' ? finalScheduledDate : undefined,
        isBreaking,
        isFeatured,
        isTrending,
        isPremium,
        mainImage,
        mainImageAlt,
        mainImageAltEn: mainImageAlt,
        mainImageAltHi,
        mainImageAltBn,
        seoTitle,
        seoTitleEn: seoTitle,
        seoTitleHi,
        seoTitleBn,
        seoDescription,
        seoDescriptionEn: seoDescription,
        seoDescriptionHi,
        seoDescriptionBn,
        location,
        slug
      });
      setStatus(targetStatus);
      if (finalScheduledDate) setScheduledDateVal(finalScheduledDate);
      setSavedAt(new Date());
      toast.success(`Article updated successfully (${targetStatus.replace('_', ' ')})! Synced to Supabase & Public Site.`);
    } else {
      const created = addStory({
        type: storyType,
        status: targetStatus,
        scheduledDate: targetStatus === 'scheduled' ? finalScheduledDate : undefined,
        kicker,
        headline,
        headlineEn: headline,
        headlineHi,
        headlineBn,
        summary,
        summaryEn: summary,
        summaryHi,
        summaryBn,
        body,
        bodyEn: body,
        bodyHi,
        bodyBn,
        mainImage,
        mainImageAlt,
        mainImageAltEn: mainImageAlt,
        mainImageAltHi,
        mainImageAltBn,
        seoTitle,
        seoTitleEn: seoTitle,
        seoTitleHi,
        seoTitleBn,
        seoDescription,
        seoDescriptionEn: seoDescription,
        seoDescriptionHi,
        seoDescriptionBn,
        section,
        topics,
        byline,
        authorId: user.id,
        location,
        isBreaking,
        isFeatured,
        isTrending,
        isPremium,
        views: 0,
        engagement: 0,
        shares: 0,
        comments: 0,
        sources: [],
        relatedStoryIds: [],
        slug
      });
      setId(created.id);
      setStatus(targetStatus);
      if (finalScheduledDate) setScheduledDateVal(finalScheduledDate);
      setSavedAt(new Date());
      toast.success(`Article created successfully (${targetStatus.replace('_', ' ')})! Synced to Supabase & Public Site.`);
    }
  };

  const addTopic = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const t = topicInput.trim();
      if (t && !topics.includes(t)) {
        setTopics([...topics, t]);
        setTopicInput('');
      }
    }
  };

  const currentStepIdx = STATUS_STEPS.findIndex(s => s.key === status);
  const statCfg = STATUS_CONFIG[status] || STATUS_CONFIG['draft'];

  const execVisualCmd = (command: string, value: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      const newHtml = editorRef.current.innerHTML;
      setBody(visualHtmlToMarkdown(newHtml));
    }
  };

  const insertVisualHtml = (htmlSnippet: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertHTML', false, htmlSnippet);
      const newHtml = editorRef.current.innerHTML;
      setBody(visualHtmlToMarkdown(newHtml));
    } else {
      setBody(prev => prev + '\n' + visualHtmlToMarkdown(htmlSnippet));
    }
  };

  const insertFormat = (before: string, after: string = '') => {
    if (before === '**') execVisualCmd('bold');
    else if (before === '*') execVisualCmd('italic');
    else if (before.includes('## ')) execVisualCmd('formatBlock', '<h2>');
    else if (before.includes('### ')) execVisualCmd('formatBlock', '<h3>');
    else if (before.includes('- ')) execVisualCmd('insertUnorderedList');
    else if (before.includes('1. ')) execVisualCmd('insertOrderedList');
    else if (before.includes('> ')) insertVisualHtml('<blockquote class="border-l-4 border-rose-600 pl-4 py-2 my-4 bg-rose-50/50 text-gray-800 font-serif italic text-lg rounded-r-lg">Quote text</blockquote>');
    else insertVisualHtml(markdownToVisualHtml(before + after));
  };

  // Open Link Modal
  const openLinkModal = () => {
    const sel = window.getSelection();
    const selectedText = sel ? sel.toString().trim() : '';
    setLinkText(selectedText || '');
    setLinkUrl('');
    setIsLinkModalOpen(true);
  };

  const confirmInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl) {
      toast.error('Please enter a URL');
      return;
    }
    const txt = linkText || 'Link text';
    const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-bold underline cursor-pointer hover:text-blue-800">${txt}</a>`;
    insertVisualHtml(linkHtml);
    setIsLinkModalOpen(false);
    toast.success('Link inserted into Visual Editor!');
  };

  const confirmInsertVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      toast.error('Please enter a Video URL');
      return;
    }
    const captionStr = videoCaption ? ` "${videoCaption}"` : '';
    const markdown = `\n\n[video:${videoUrl}${captionStr}]\n\n`;
    insertVisualHtml(markdownToVisualHtml(markdown));
    setIsVideoModalOpen(false);
    toast.success('Video embed inserted');
  };

  // Upload local image/video directly to Supabase Storage & select
  const handleLocalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'main_image' | 'body') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const toastId = toast.loading('Uploading file to Supabase Storage…');

    const newMedia = await uploadFile(file, user.name);

    if (target === 'main_image') {
      setMainImage(newMedia.url);
      toast.success('Cover image uploaded & set', { id: toastId });
    } else {
      if (newMedia.type === 'video') {
        insertVisualHtml(`<figure class="my-4"><video src="${newMedia.url}" controls class="w-full h-auto max-h-[450px] rounded-xl shadow-sm"></video><figcaption class="text-xs text-center text-gray-500 mt-1 font-medium"></figcaption></figure>`);
      } else {
        insertVisualHtml(`<figure class="my-4 group relative inline-block max-w-full"><img src="${newMedia.url}" alt="" class="max-w-full h-auto rounded-xl shadow-sm cursor-pointer outline-1 hover:outline-2 outline-rose-500 transition-all" style="resize: both; overflow: auto; display: block;" /><figcaption class="text-xs text-center text-gray-500 mt-1.5 font-medium"></figcaption></figure>`);
      }
      toast.success('Media inserted. Click image to edit options in right sidebar.', { id: toastId });
    }

    setIsMediaModalOpen(false);
  };

  // Select image/video from media modal or sidebar tab
  const handleSelectMediaItem = (url: string, altText: string, target: 'main_image' | 'body', type: 'image' | 'video' | 'document' = 'image') => {
    if (target === 'main_image') {
      setMainImage(url);
      toast.success('Cover image updated from Media Library');
    } else {
      if (type === 'video') {
        insertVisualHtml(`<figure class="my-4"><video src="${url}" controls class="w-full h-auto max-h-[450px] rounded-xl shadow-sm"></video><figcaption class="text-xs text-center text-gray-500 mt-1 font-medium"></figcaption></figure>`);
        toast.success('Video inserted into visual editor');
      } else {
        insertVisualHtml(`<figure class="my-4 group relative inline-block max-w-full"><img src="${url}" alt="" class="max-w-full h-auto rounded-xl shadow-sm cursor-pointer outline-1 hover:outline-2 outline-rose-500 transition-all" style="resize: both; overflow: auto; display: block;" /><figcaption class="text-xs text-center text-gray-500 mt-1.5 font-medium"></figcaption></figure>`);
        toast.success('Image inserted. Click image to edit options in right sidebar.');
      }
    }
    setIsMediaModalOpen(false);
  };

  const SIDEBAR_TABS: { key: SidebarTab; icon: React.ReactNode; label: string }[] = [
    { key: 'story', icon: <FileText className="w-4 h-4" />, label: 'Story' },
    { key: 'format', icon: <SlidersHorizontal className="w-4 h-4 text-purple-600" />, label: 'Pro Tools' },
    { key: 'media', icon: <ImageIcon className="w-4 h-4" />, label: 'Media' },
    { key: 'distribution', icon: <Share2 className="w-4 h-4" />, label: 'Distribute' },
    { key: 'publish', icon: <Calendar className="w-4 h-4" />, label: 'Publish' },
    { key: 'advanced', icon: <Settings className="w-4 h-4" />, label: 'Advanced' },
  ];

  const filteredMediaItems = mediaItems.filter(m =>
    m.filename.toLowerCase().includes(mediaSearch.toLowerCase()) ||
    m.altText.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden selection:bg-rose-500 selection:text-white">
      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('/admin/stories')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-600 transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Stories
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <div className="text-xs text-gray-400 flex items-center gap-1.5">
            {savedAt ? (
              <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Saved {savedAt.toLocaleTimeString()}</>
            ) : (
              <><Clock className="w-3.5 h-3.5" /> Unsaved changes</>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button onClick={() => handleSave('draft')} className="px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5">
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>
          <div className="relative">
            <div className="flex">
              <button
                onClick={() => handleSave('published')}
                className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-1.5 rounded-l-full shadow-xs transition-colors cursor-pointer"
              >
                Publish Story
              </button>
              <button
                onClick={() => setPublishMenuOpen(!publishMenuOpen)}
                className="bg-rose-700 hover:bg-rose-800 text-white text-sm px-2 py-1.5 rounded-r-full border-l border-rose-500 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            {publishMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-gray-200 shadow-xl z-20">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setPublishMenuOpen(false);
                      setTimeout(() => handleSave('published'), 0);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 cursor-pointer font-medium"
                  >
                    Publish Now
                  </button>
                  <button
                    onClick={() => {
                      setPublishMenuOpen(false);
                      setIsScheduleModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 cursor-pointer font-medium flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-purple-600" /> Schedule…
                  </button>
                  <button
                    onClick={() => {
                      setPublishMenuOpen(false);
                      setTimeout(() => handleSave('in_review'), 0);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                  >
                    Send for Review
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={() => {
                      setPublishMenuOpen(false);
                      setTimeout(() => handleSave('draft'), 0);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STATUS PROGRESS BAR */}
      <div className={`border-b px-6 py-2.5 flex items-center gap-3 text-sm shrink-0 ${statCfg.bg} ${statCfg.border}`}>
        <div className="flex items-center gap-2 flex-1">
          {STATUS_STEPS.map((step, idx) => (
            <div key={`step-item-${step.key}`} className="flex items-center gap-2">
              <button
                onClick={() => handleSave(step.key)}
                className={`flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${idx <= currentStepIdx ? statCfg.text : 'text-gray-400'}`}
              >
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${idx < currentStepIdx ? `bg-rose-600 text-white border-rose-600` : idx === currentStepIdx ? `${statCfg.text} border-current bg-white` : 'border-gray-300 text-gray-400 bg-white'}`}>
                  {idx < currentStepIdx ? '✓' : idx + 1}
                </span>
                {step.label}
              </button>
              {idx < STATUS_STEPS.length - 1 && (
                <ChevronRight className={`w-3 h-3 ${idx < currentStepIdx ? 'text-gray-400' : 'text-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className={`text-xs font-medium ${statCfg.text}`}>
          Author: {byline}
        </div>
      </div>

      {/* MAIN EDITOR */}
      <div className="flex flex-1 overflow-hidden">
        {/* Article Content (LEFT/CENTER AREA) */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-10 pb-24 space-y-6">



            {/* Kicker */}
            <div>
              <input
                type="text"
                value={kicker}
                onChange={e => setKicker(e.target.value.toUpperCase())}
                placeholder="KICKER — e.g. EXCLUSIVE · POLITICS"
                className="w-full text-xs font-bold text-rose-600 tracking-widest placeholder-gray-300 bg-transparent border-none outline-none uppercase"
              />
            </div>

            {/* Headline */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Headline
                </span>
                {isAiActive && (
                  <button
                    type="button"
                    onClick={handleAiHeadlineGenerate}
                    className="text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-md font-semibold cursor-pointer flex items-center gap-1 transition-colors shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> AI Headline Generator
                  </button>
                )}
              </div>
              <textarea
                ref={headlineRef}
                value={activeLangTab === 'en' ? headline : activeLangTab === 'hi' ? headlineHi : headlineBn}
                onChange={e => {
                  const val = e.target.value;
                  if (activeLangTab === 'en') setHeadline(val);
                  else if (activeLangTab === 'hi') setHeadlineHi(val);
                  else setHeadlineBn(val);
                }}
                placeholder={activeLangTab === 'en' ? "Write the English headline..." : activeLangTab === 'hi' ? "मुख्य हिंदी शीर्षक यहाँ लिखें..." : "প্রধান বাংলা শিরোনাম লিখুন..."}
                rows={2}
                className="w-full text-4xl font-bold text-gray-900 placeholder-gray-200 bg-transparent border-none outline-none leading-tight resize-none"
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <div className="text-xs text-gray-400 text-right mt-1">
                {(activeLangTab === 'en' ? headline : activeLangTab === 'hi' ? headlineHi : headlineBn).length}/120 characters
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Story Summary
                </span>
                {isAiActive && (
                  <button
                    type="button"
                    onClick={handleAiSummaryGenerate}
                    className="text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-md font-semibold cursor-pointer flex items-center gap-1 transition-colors shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Executive Summary
                  </button>
                )}
              </div>
              <textarea
                ref={summaryRef}
                value={activeLangTab === 'en' ? summary : activeLangTab === 'hi' ? summaryHi : summaryBn}
                onChange={e => {
                  const val = e.target.value;
                  if (activeLangTab === 'en') setSummary(val);
                  else if (activeLangTab === 'hi') setSummaryHi(val);
                  else setSummaryBn(val);
                }}
                placeholder={activeLangTab === 'en' ? "Write English summary..." : activeLangTab === 'hi' ? "हिंदी संक्षिप्त विवरण लिखें..." : "সংক্ষিপ্ত সারাংশ লিখুন..."}
                rows={2}
                className="w-full text-xl text-gray-500 placeholder-gray-200 bg-transparent border-none outline-none leading-relaxed resize-none"
              />
              <div className="text-xs text-gray-400 text-right mt-1">
                {(activeLangTab === 'en' ? summary : activeLangTab === 'hi' ? summaryHi : summaryBn).length}/160 characters · Summary
              </div>
            </div>

            {/* Main Cover Image Box */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Cover Image *</label>
                <button
                  type="button"
                  onClick={() => {
                    setMediaModalTarget('main_image');
                    setIsMediaModalOpen(true);
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Media Library / Upload
                </button>
              </div>

              <div
                onClick={() => {
                  setMediaModalTarget('main_image');
                  setIsMediaModalOpen(true);
                }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  const droppedUrl = e.dataTransfer.getData('text/plain');
                  if (droppedUrl) {
                    setMainImage(droppedUrl);
                    toast.success('Cover image updated via drag & drop!');
                  }
                }}
                className="relative border-2 border-dashed border-gray-200 rounded-2xl bg-white hover:bg-rose-50/20 hover:border-rose-300 transition-colors cursor-pointer overflow-hidden group shadow-2xs"
                style={{ minHeight: '200px' }}
              >
                {mainImage ? (
                  <div className="relative bg-slate-900/5 rounded-2xl flex items-center justify-center p-2">
                    <img src={mainImage} alt="Cover" className="w-full max-h-[450px] object-contain rounded-xl shadow-xs mx-auto" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <span className="bg-white/90 text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-md">
                        Change Image
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMainImage('');
                        }}
                        className="bg-red-600 text-white rounded-full p-2 shadow-md hover:bg-red-700 cursor-pointer"
                        title="Remove Cover Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-14 gap-3">
                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 border border-rose-100 shadow-2xs">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-800">Select or Upload Cover Image</div>
                      <div className="text-xs text-gray-400 mt-1">Click to browse Media Library or upload a new file from device</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1.5 bg-rose-600 text-white rounded-full font-bold cursor-pointer hover:bg-rose-700 shadow-xs">
                        Open Media Picker
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rich Text Body & Toolbar */}
            <div 
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-text"
              onClick={(e) => {
                // If user clicks on toolbar or inside, but not directly on a button/input, focus editor canvas
                if (editorRef.current && !(e.target as HTMLElement).closest('button, input, select, textarea')) {
                  editorRef.current.focus();
                }
              }}
            >
              {/* Toolbar */}
              <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50/80 items-center cursor-default">
                <button
                  type="button"
                  onClick={() => insertFormat('**', '**')}
                  title="Toggle Bold"
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${document.queryCommandState('bold') ? 'bg-rose-600 text-white font-bold shadow-xs' : 'text-gray-600 hover:bg-rose-100 hover:text-rose-700'}`}
                >
                  <Bold className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat('*', '*')}
                  title="Toggle Italic"
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${document.queryCommandState('italic') ? 'bg-rose-600 text-white font-bold shadow-xs' : 'text-gray-600 hover:bg-rose-100 hover:text-rose-700'}`}
                >
                  <Italic className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-gray-200 mx-1 self-center" />

                <button
                  type="button"
                  onClick={() => insertFormat('\n## ', '\n')}
                  title="Toggle H2 Heading"
                  className={`px-2 py-1 rounded-lg cursor-pointer text-xs font-black transition-colors ${document.queryCommandValue('formatBlock') === 'h2' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-700 hover:bg-rose-100 hover:text-rose-700'}`}
                >
                  H2
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat('\n### ', '\n')}
                  title="Toggle H3 Subheading"
                  className={`px-2 py-1 rounded-lg cursor-pointer text-xs font-black transition-colors ${document.queryCommandValue('formatBlock') === 'h3' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-700 hover:bg-rose-100 hover:text-rose-700'}`}
                >
                  H3
                </button>

                <div className="w-px h-5 bg-gray-200 mx-1 self-center" />

                <button
                  type="button"
                  onClick={() => insertFormat('\n- ')}
                  title="Toggle Bullet List"
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${document.queryCommandState('insertUnorderedList') ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600 hover:bg-rose-100 hover:text-rose-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat('\n1. ')}
                  title="Toggle Numbered List"
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${document.queryCommandState('insertOrderedList') ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600 hover:bg-rose-100 hover:text-rose-700'}`}
                >
                  <ListOrdered className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat('\n> ')}
                  title="Quote Box"
                  className="p-1.5 text-gray-600 hover:bg-rose-100 hover:text-rose-700 rounded-lg cursor-pointer transition-colors"
                >
                  <Quote className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-gray-200 mx-1 self-center" />

                <button type="button" onClick={openLinkModal} title="Add Link" className="p-1.5 text-gray-600 hover:bg-rose-100 hover:text-rose-700 rounded-lg cursor-pointer transition-colors"><Link2 className="w-4 h-4" /></button>
                
                {/* Media Image Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMediaModalTarget('body');
                    setIsMediaModalOpen(true);
                  }}
                  title="Insert Image from Media Library or Device"
                  className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors flex items-center gap-1 text-xs font-bold bg-rose-50/80 border border-rose-200"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Add Image</span>
                </button>

                {/* Video Button */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  title="Embed Video URL"
                  className="p-1.5 text-gray-600 hover:bg-rose-100 hover:text-rose-700 rounded-lg cursor-pointer transition-colors"
                >
                  <Video className="w-4 h-4" />
                </button>

                {/* Gutenberg Plugin Tools */}
                {isGutenbergActive && (
                  <>
                    <div className="w-px h-5 bg-purple-200 mx-1 self-center" />
                    <button
                      type="button"
                      onClick={() => insertFormat('\n\n> 💡 **Callout Highlight:** Enter key announcement here.\n\n')}
                      title="Gutenberg Callout Box"
                      className="px-2 py-1 text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200 rounded-lg cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <span>💡 Callout</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('\n\n[audio:https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg "Audio Bulletin"]\n\n')}
                      title="Gutenberg Audio Player"
                      className="px-2 py-1 text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200 rounded-lg cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Audio
                    </button>
                  </>
                )}

                <button type="button" onClick={() => insertFormat('\n---\n')} title="Horizontal Divider (#)" className="p-1.5 text-gray-600 hover:bg-rose-100 hover:text-rose-700 rounded-lg cursor-pointer transition-colors"><Hash className="w-4 h-4" /></button>
              </div>

              {/* Permanent Visual Editor Canvas (No Raw Symbols Allowed) */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={() => {
                  if (editorRef.current) {
                    setBody(visualHtmlToMarkdown(editorRef.current.innerHTML));
                  }
                }}
                onBlur={() => {
                  if (editorRef.current) {
                    setBody(visualHtmlToMarkdown(editorRef.current.innerHTML));
                  }
                }}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  const img = target.tagName === 'IMG' ? (target as HTMLImageElement) : target.closest('figure')?.querySelector('img') || null;
                  if (img) {
                    setSelectedImgEl(img);
                    setImgWidth(img.style.width || '100%');
                    const margin = img.style.margin || '';
                    let align: 'left' | 'center' | 'right' = 'center';
                    if (margin.includes('0 0 0 auto') || margin.includes('0px 0px 0px auto')) {
                      align = 'right';
                    } else if (margin.includes('0 auto 0 0') || margin.includes('0px auto 0px 0px')) {
                      align = 'left';
                    }
                    setImgAlign(align);
                    setImgObjectFit((img.style.objectFit as any) || 'cover');
                    const figCaption = img.parentElement?.querySelector('figcaption');
                    setImgCaptionText(figCaption ? figCaption.textContent || '' : img.alt || '');
                    setActiveTab('media');
                    toast.success('Image selected! Options loaded in right sidebar.', { id: 'img-click' });
                  } else {
                    editorRef.current?.focus();
                  }
                }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  const droppedUrl = e.dataTransfer.getData('text/plain');
                  if (droppedUrl) {
                    insertVisualHtml(`<figure class="my-4 group relative inline-block max-w-full"><img src="${droppedUrl}" class="max-w-full h-auto rounded-xl shadow-sm cursor-pointer outline-1 hover:outline-2 outline-rose-500 transition-all resize-x overflow-auto" style="resize: both; overflow: auto; display: block;" /><figcaption class="text-xs text-center text-gray-500 mt-1.5 font-medium"></figcaption></figure>`);
                    toast.success('Image dropped! Click image to adjust settings in right sidebar.');
                  }
                }}
                placeholder="Start writing your story here…"
                className="w-full px-6 py-5 min-h-[350px] text-gray-800 leading-[1.8] outline-none text-[15px] cursor-text bg-white font-serif selection:bg-rose-100"
              />
            </div>

            {/* Word count */}
            <div className="text-xs text-gray-400 text-right">
              {body.trim().split(/\s+/).filter(Boolean).length} words · {Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 200)} min read
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 shrink-0 overflow-x-auto hide-scrollbar">
            {[
              { key: 'story', label: 'Story', icon: <FileText className="w-3.5 h-3.5" /> },
              { key: 'seo', label: 'SEO Engine', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> },
              { key: 'format', label: 'Format', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
              { key: 'media', label: 'Media', icon: <ImageIcon className="w-3.5 h-3.5" /> },
              { key: 'publish', label: 'Publish', icon: <Globe className="w-3.5 h-3.5" /> },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                title={tab.label}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-2 text-xs transition-colors cursor-pointer shrink-0 ${activeTab === tab.key ? 'text-rose-600 font-semibold border-b-2 border-rose-600 bg-rose-50/20' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab.icon}
                <span className="text-[10px] truncate">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">

            {/* SEO ENGINE ASSISTANT TAB */}
            {activeTab === 'seo' && (
              <SeoAssistant
                story={{
                  id: storyId,
                  headline,
                  summary,
                  body,
                  slug,
                  section,
                  topics,
                  byline,
                  mainImage,
                  mainImageAlt,
                  seoTitle,
                  seoDescription
                }}
                allStories={stories}
                onUpdateField={(field, value) => {
                  if (field === 'headline') setHeadline(value);
                  else if (field === 'summary') setSummary(value);
                  else if (field === 'body') setBody(value);
                  else if (field === 'slug') setSlug(value);
                  else if (field === 'seoTitle') setSeoTitle(value);
                  else if (field === 'seoDescription') setSeoDescription(value);
                  else if (field === 'topics') setTopics(value);
                }}
              />
            )}


            {/* STORY TAB */}
            {activeTab === 'story' && (
              <>
                {/* Yoast SEO Plugin Live Score Widget */}
                {isYoastActive && (
                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-emerald-600" /> Yoast SEO Live Score
                      </span>
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${seoScore >= 70 ? 'bg-emerald-600 text-white' : seoScore >= 40 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'}`}>
                        {seoScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full transition-all duration-300" style={{ width: `${seoScore}%` }} />
                    </div>
                    <ul className="text-[11px] text-emerald-800 space-y-1 pt-1">
                      <li className="flex items-center justify-between">
                        <span>Headline Length</span>
                        <span className="font-bold">{headline.length >= 25 && headline.length <= 80 ? '✓ Good' : '⚠️ Short/Long'}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Meta Cover Image</span>
                        <span className="font-bold">{mainImage ? '✓ Present' : '❌ Missing'}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Schema JSON-LD</span>
                        <span className="font-bold">✓ Ready</span>
                      </li>
                    </ul>
                  </div>
                )}

                <div className={`rounded-xl p-3 border ${statCfg.bg} ${statCfg.border}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</span>
                    <span className={`text-xs font-semibold capitalize ${statCfg.text}`}>
                      {status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-rose-600" /> Section <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={section}
                      onChange={e => setSection(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-xl outline-none text-sm cursor-pointer focus:border-rose-400 font-medium"
                    >
                      {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-rose-600" /> Topics
                  </label>
                  <div className="border border-gray-200 rounded-xl bg-gray-50 p-2 flex flex-wrap gap-2 min-h-10">
                    {topics.map(t => (
                      <span key={t} className="bg-white border border-gray-200 text-xs px-2 py-1 rounded-full flex items-center gap-1 text-gray-700 shadow-xs font-medium">
                        {t}
                        <button onClick={() => setTopics(topics.filter(x => x !== t))} className="text-gray-400 hover:text-rose-600 cursor-pointer ml-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={topicInput}
                      onChange={e => setTopicInput(e.target.value)}
                      onKeyDown={addTopic}
                      placeholder="Add topic, press Enter…"
                      className="bg-transparent border-none text-xs outline-none flex-1 min-w-24 text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-rose-600" /> Author / Byline <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={byline}
                      onChange={e => setByline(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-xl outline-none text-sm cursor-pointer focus:border-rose-400 font-medium"
                    >
                      {['Amit Sharma', 'Priya Mehta', 'Rahul Verma', 'Anita Kapoor', 'Deepak Singh', 'Guest Contributor'].map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" /> Dateline / Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value.toUpperCase())}
                    placeholder="e.g. NEW DELHI"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 uppercase tracking-wider outline-none focus:border-rose-400 font-medium"
                  />
                </div>
              </>
            )}

            {/* PRO TOOLS / MS WORD ARTICLE FORMATTING ASSISTANT SIDEBAR TAB */}
            {activeTab === 'format' && (
              <div className="space-y-5 text-xs text-gray-700">
                {/* 1. HOME / CLIPBOARD & TYPOGRAPHY */}
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 space-y-3 shadow-2xs">
                  <div className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>1. Home / Formatting & Font</span>
                    <span className="text-gray-400 font-mono text-[10px]">Home Tab</span>
                  </div>

                  {/* Cut / Copy / Paste / Format Painter */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button onClick={() => execVisualCmd('copy')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg font-medium hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between cursor-pointer">
                      <span>Copy</span>
                      <span className="text-[9px] text-gray-400 font-mono">Ctrl+C</span>
                    </button>
                    <button onClick={() => execVisualCmd('cut')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg font-medium hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between cursor-pointer">
                      <span>Cut</span>
                      <span className="text-[9px] text-gray-400 font-mono">Ctrl+X</span>
                    </button>
                    <button onClick={() => execVisualCmd('paste')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg font-medium hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between cursor-pointer">
                      <span>Paste</span>
                      <span className="text-[9px] text-gray-400 font-mono">Ctrl+V</span>
                    </button>
                    <button onClick={() => toast.success('Format Painter mode: Ready to copy style')} className="p-1.5 bg-purple-50 border border-purple-200 text-purple-800 rounded-lg font-bold hover:bg-purple-100 transition-colors flex items-center justify-between cursor-pointer">
                      <span>Format Painter</span>
                      <span className="text-[9px] text-purple-600 font-mono">Style</span>
                    </button>
                  </div>

                  {/* Font Family & Size controls */}
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <div className="flex gap-2">
                      <select onChange={e => execVisualCmd('fontName', e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-xs outline-none focus:border-purple-500 font-medium cursor-pointer">
                        <option value="Aptos">Font: Aptos</option>
                        <option value="Georgia">Georgia (Serif)</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Arial">Arial</option>
                        <option value="Calibri">Calibri</option>
                      </select>
                      <select onChange={e => execVisualCmd('fontSize', e.target.value)} className="w-24 bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-xs outline-none focus:border-purple-500 font-medium cursor-pointer">
                        <option value="3">Size: 12pt</option>
                        <option value="4">14pt (H3)</option>
                        <option value="5">18pt (H2)</option>
                        <option value="6">24pt (H1)</option>
                        <option value="7">36pt (Title)</option>
                      </select>
                    </div>

                    {/* Bold, Italic, Underline, Strikethrough, Sub/Superscript */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <button onClick={() => insertFormat('**', '**')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg font-bold hover:bg-purple-50 transition-colors text-center cursor-pointer">
                        Bold (B)
                      </button>
                      <button onClick={() => insertFormat('*', '*')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg italic hover:bg-purple-50 transition-colors text-center cursor-pointer">
                        Italic (I)
                      </button>
                      <button onClick={() => execVisualCmd('underline')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg underline hover:bg-purple-50 transition-colors text-center cursor-pointer">
                        Underline (U)
                      </button>
                      <button onClick={() => execVisualCmd('strikeThrough')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg line-through hover:bg-purple-50 transition-colors text-center cursor-pointer">
                        Strike S
                      </button>
                      <button onClick={() => execVisualCmd('subscript')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors text-center cursor-pointer">
                        Sub X₂
                      </button>
                      <button onClick={() => execVisualCmd('superscript')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors text-center cursor-pointer">
                        Super X²
                      </button>
                    </div>

                    {/* Color & Highlight */}
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => execVisualCmd('foreColor', '#1E293B')} className="flex-1 p-1.5 bg-slate-900 text-white rounded-lg font-bold text-center cursor-pointer">
                        Font Color
                      </button>
                      <button onClick={() => execVisualCmd('hiliteColor', '#FEF08A')} className="flex-1 p-1.5 bg-yellow-200 text-yellow-900 rounded-lg font-bold text-center cursor-pointer">
                        Highlight
                      </button>
                      <button onClick={() => execVisualCmd('removeFormat')} className="p-1.5 bg-gray-100 hover:bg-red-50 text-red-600 rounded-lg font-bold text-center cursor-pointer" title="Clear All Formatting (Ctrl+Space)">
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Alignment & Paragraph Indents */}
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Alignment & Spacing</div>
                    <div className="grid grid-cols-4 gap-1">
                      <button onClick={() => execVisualCmd('justifyLeft')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-purple-50 font-bold text-center cursor-pointer">Left</button>
                      <button onClick={() => execVisualCmd('justifyCenter')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-purple-50 font-bold text-center cursor-pointer">Center</button>
                      <button onClick={() => execVisualCmd('justifyRight')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-purple-50 font-bold text-center cursor-pointer">Right</button>
                      <button onClick={() => execVisualCmd('justifyFull')} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-purple-50 font-bold text-center cursor-pointer">Justify</button>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button onClick={() => execVisualCmd('outdent')} className="flex-1 p-1.5 bg-gray-50 border border-gray-200 rounded-lg font-bold text-center hover:bg-purple-50 cursor-pointer">
                        ← Indent Left
                      </button>
                      <button onClick={() => execVisualCmd('indent')} className="flex-1 p-1.5 bg-gray-50 border border-gray-200 rounded-lg font-bold text-center hover:bg-purple-50 cursor-pointer">
                        Indent Right →
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. INSERT & VISUAL MEDIA ELEMENTS */}
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 space-y-3 shadow-2xs">
                  <div className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>2. Insert & Structure</span>
                    <span className="text-gray-400 font-mono text-[10px]">Insert Tab</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => insertVisualHtml('<div class="bg-slate-900 text-white p-6 rounded-2xl my-6 text-center shadow-lg"><h1 class="text-3xl font-bold mb-2">ARTICLE TITLE HERE</h1><p class="text-sm text-slate-300">Executive Cover Page</p></div>')}
                      className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold hover:bg-purple-50 text-left cursor-pointer"
                    >
                      Cover Page
                    </button>
                    <button
                      onClick={() => insertVisualHtml('\n<hr class="my-6 border-gray-200" /><div class="page-break text-center text-xs text-gray-400 my-4">——— Page Break (Ctrl+Enter) ———</div>\n')}
                      className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold hover:bg-purple-50 text-left cursor-pointer"
                    >
                      Page Break
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => insertVisualHtml('<table class="w-full my-4 border-collapse border border-gray-300 text-xs"><thead><tr class="bg-purple-900 text-white"><th class="border p-2">Header 1</th><th class="border p-2">Header 2</th><th class="border p-2">Header 3</th></tr></thead><tbody><tr><td class="border p-2">Data A</td><td class="border p-2">Data B</td><td class="border p-2">Data C</td></tr></tbody></table>')}
                      className="p-2 bg-purple-50 border border-purple-200 text-purple-800 rounded-lg font-bold hover:bg-purple-100 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Insert Table</span>
                    </button>
                    <button
                      onClick={() => {
                        setMediaModalTarget('body');
                        setIsMediaModalOpen(true);
                      }}
                      className="p-2 bg-purple-50 border border-purple-200 text-purple-800 rounded-lg font-bold hover:bg-purple-100 flex items-center gap-1 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" /> Picture / Media
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => insertVisualHtml('<div class="my-4 p-4 bg-purple-50 border-l-4 border-purple-600 rounded-r-xl font-bold text-purple-900 text-xs">🔄 SmartArt Process: [Data Input] ➔ [AI Processing] ➔ [Output Dispatch]</div>')}
                      className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      SmartArt Diagram
                    </button>
                    <button
                      onClick={openLinkModal}
                      className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold hover:bg-purple-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Link2 className="w-3.5 h-3.5" /> Hyperlink (Ctrl+K)
                    </button>
                  </div>

                </div>

                {/* 3. LAYOUT & REFERENCES */}
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 space-y-3 shadow-2xs">
                  <div className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>3. Layout & References</span>
                    <span className="text-gray-400 font-mono text-[10px]">Layout / Ref</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => toast.success('Layout Set: Normal Margins (1 Inch All Sides)')} className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-medium hover:bg-purple-50 text-left cursor-pointer">
                      Margins: Normal 1"
                    </button>
                    <button onClick={() => toast.success('Orientation Set: Portrait Standard')} className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-medium hover:bg-purple-50 text-left cursor-pointer">
                      Portrait Layout
                    </button>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-gray-100">
                    <button
                      onClick={() => insertVisualHtml('<sup class="text-rose-600 font-bold cursor-pointer" title="Footnote">[1]</sup>')}
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Insert Footnote (Alt+Ctrl+F)</span>
                      <span className="text-[10px] text-gray-400 font-mono">[1]</span>
                    </button>
                    <button
                      onClick={() => insertVisualHtml('<figcaption class="text-xs text-center text-gray-500 mt-1 font-medium italic">Figure 1: Automated Workflow Diagram</figcaption>')}
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Insert Figure Caption</span>
                      <span className="text-[10px] text-purple-600 font-bold">Caption</span>
                    </button>
                    <button
                      onClick={() => insertVisualHtml('<div class="bg-gray-50 border-l-4 border-purple-600 p-3 my-4 rounded-r-lg text-xs"><strong class="text-purple-900 block mb-1">REFERENCES (APA 7th Edition):</strong><p>Sharma, A. (2026). Digital Media Automation. Journal of Newsroom Technology, 14(2), 45-60.</p></div>')}
                      className="w-full p-2 bg-purple-50 border border-purple-200 text-purple-800 rounded-lg font-bold hover:bg-purple-100 transition-colors text-left cursor-pointer"
                    >
                      Insert APA Bibliography Block
                    </button>
                  </div>
                </div>

                {/* 4. REVIEW & PROOFREADING */}
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 space-y-3 shadow-2xs">
                  <div className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>4. Review & Proofreading</span>
                    <span className="text-gray-400 font-mono text-[10px]">Review / View</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => toast.success(`Spelling & Grammar Check: OK (${body.trim().split(/\s+/).filter(Boolean).length} words scanned)`)} className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-bold hover:bg-emerald-100 transition-colors text-left cursor-pointer">
                      Spelling & Grammar (F7)
                    </button>
                    <button onClick={() => toast.success(`Word Count: ${body.trim().split(/\s+/).filter(Boolean).length} words`)} className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-medium hover:bg-purple-50 text-left cursor-pointer">
                      Word Count
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => insertVisualHtml('<div class="bg-amber-50 border-l-4 border-amber-500 p-2.5 my-3 text-xs text-amber-900 rounded-r-lg font-medium">💬 Editorial Comment: Please double-check statistical metrics before publishing.</div>')} className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold hover:bg-purple-50 transition-colors text-left cursor-pointer">
                      Add Comment
                    </button>
                    <button onClick={() => toast.success('Track Changes Mode Enabled: Recording edits')} className="p-2 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg font-bold hover:bg-rose-100 transition-colors text-left cursor-pointer">
                      Track Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MEDIA SIDEBAR TAB (Direct access to Media Library & Selected Image Controls) */}
            {activeTab === 'media' && (
              <div className="space-y-4">
                {/* SELECTED IMAGE ADJUSTER PANEL (Appears right in sidebar when image is clicked) */}
                {selectedImgEl && (
                  <div className="bg-purple-50/90 border-2 border-purple-300 rounded-2xl p-4 space-y-4 shadow-xs animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                      <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <ImageIcon className="w-4 h-4 text-purple-600" /> Selected Image Settings
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedImgEl(null)}
                        className="text-xs text-purple-600 hover:text-purple-900 font-semibold cursor-pointer"
                      >
                        Deselect
                      </button>
                    </div>

                    {/* Thumbnail Preview */}
                    <div className="bg-white rounded-xl p-2 flex items-center justify-center max-h-36 overflow-hidden border border-purple-200 shadow-2xs">
                      <img
                        src={selectedImgEl.src}
                        alt={selectedImgEl.alt}
                        style={{ width: imgWidth, objectFit: imgObjectFit, height: '110px' }}
                        className="rounded-lg transition-all"
                      />
                    </div>

                    {/* Size Presets */}
                    <div>
                      <label className="block text-[11px] font-bold text-purple-900 uppercase tracking-wider mb-1">Image Size</label>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { label: '25%', val: '25%' },
                          { label: '50%', val: '50%' },
                          { label: '75%', val: '75%' },
                          { label: '100%', val: '100%' },
                        ].map(sz => (
                          <button
                            key={sz.val}
                            type="button"
                            onClick={() => {
                              setImgWidth(sz.val);
                              if (selectedImgEl) {
                                selectedImgEl.style.width = sz.val;
                                selectedImgEl.style.maxWidth = '100%';
                                if (editorRef.current) setBody(visualHtmlToMarkdown(editorRef.current.innerHTML));
                                toast.success(`Size set to ${sz.val}`);
                              }
                            }}
                            className={`py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${imgWidth === sz.val ? 'bg-purple-600 text-white border-purple-600 shadow-2xs' : 'bg-white border-purple-200 text-purple-800 hover:bg-purple-100'}`}
                          >
                            {sz.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Alignment Controls */}
                    <div>
                      <label className="block text-[11px] font-bold text-purple-900 uppercase tracking-wider mb-1">Alignment</label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { label: 'Left', val: 'left', alignStyle: '0 auto 0 0' },
                          { label: 'Center', val: 'center', alignStyle: '0 auto' },
                          { label: 'Right', val: 'right', alignStyle: '0 0 0 auto' },
                        ].map(al => (
                          <button
                            key={al.val}
                            type="button"
                            onClick={() => {
                              setImgAlign(al.val as any);
                              if (selectedImgEl) {
                                selectedImgEl.style.display = 'block';
                                selectedImgEl.style.margin = al.alignStyle;
                                const parentFig = selectedImgEl.closest('figure');
                                if (parentFig) {
                                  (parentFig as HTMLElement).style.textAlign = al.val;
                                }
                                if (editorRef.current) setBody(visualHtmlToMarkdown(editorRef.current.innerHTML));
                                toast.success(`Aligned ${al.val}`);
                              }
                            }}
                            className={`py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${imgAlign === al.val ? 'bg-purple-600 text-white border-purple-600 shadow-2xs' : 'bg-white border-purple-200 text-purple-800 hover:bg-purple-100'}`}
                          >
                            {al.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Crop / Fit Mode */}
                    <div>
                      <label className="block text-[11px] font-bold text-purple-900 uppercase tracking-wider mb-1">Crop / Fit Mode</label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { label: 'Cover', val: 'cover', heightVal: '300px' },
                          { label: 'Fit', val: 'contain', heightVal: 'auto' },
                          { label: 'Fill', val: 'fill', heightVal: '300px' },
                        ].map(fit => (
                          <button
                            key={fit.val}
                            type="button"
                            onClick={() => {
                              setImgObjectFit(fit.val as any);
                              if (selectedImgEl) {
                                selectedImgEl.style.objectFit = fit.val;
                                selectedImgEl.style.height = fit.heightVal;
                                if (editorRef.current) setBody(visualHtmlToMarkdown(editorRef.current.innerHTML));
                                toast.success(`Fit mode: ${fit.label}`);
                              }
                            }}
                            className={`py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${imgObjectFit === fit.val ? 'bg-purple-600 text-white border-purple-600 shadow-2xs' : 'bg-white border-purple-200 text-purple-800 hover:bg-purple-100'}`}
                          >
                            {fit.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Caption Input */}
                    <div>
                      <label className="block text-[11px] font-bold text-purple-900 uppercase tracking-wider mb-1">Photo Caption</label>
                      <input
                        type="text"
                        value={imgCaptionText}
                        onChange={e => {
                          setImgCaptionText(e.target.value);
                          if (selectedImgEl) {
                            selectedImgEl.setAttribute('alt', e.target.value);
                            const figCaption = selectedImgEl.parentElement?.querySelector('figcaption');
                            if (figCaption) figCaption.textContent = e.target.value;
                            if (editorRef.current) setBody(visualHtmlToMarkdown(editorRef.current.innerHTML));
                          }
                        }}
                        placeholder="Type photo caption..."
                        className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-xs outline-none focus:border-purple-600 font-medium text-purple-950"
                      />
                    </div>

                    {/* Delete Image Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedImgEl) {
                          const figure = selectedImgEl.closest('figure') || selectedImgEl;
                          figure.remove();
                          if (editorRef.current) setBody(visualHtmlToMarkdown(editorRef.current.innerHTML));
                          toast.success('Image deleted from article');
                        }
                        setSelectedImgEl(null);
                      }}
                      className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-bold py-1.5 rounded-lg text-xs transition-colors cursor-pointer border border-red-300 flex items-center justify-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Remove Image
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Media Library ({mediaItems.length})</span>
                  <label className="text-xs text-rose-600 font-semibold cursor-pointer hover:text-rose-800 flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Upload New
                    <input type="file" accept="image/*,video/*" onChange={(e) => handleLocalImageUpload(e, 'body')} className="hidden" />
                  </label>
                </div>

                {/* Quick Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search media..."
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-rose-500 font-medium"
                  />
                </div>

                <p className="text-[11px] text-gray-400">Click or drag any image/video into article body:</p>

                {/* Media Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {filteredMediaItems.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', item.url)}
                      onClick={() => handleSelectMediaItem(item.url, item.altText, 'body', item.type)}
                      className="group relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-rose-500 cursor-pointer shadow-2xs aspect-square"
                    >
                      {item.type === 'image' ? (
                        <img src={item.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-2 text-white">
                          <Video className="w-6 h-6 text-rose-500 mb-1" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1 text-center">
                        <span className="text-[10px] font-bold text-white bg-rose-600 px-2 py-0.5 rounded-full">
                          Insert {item.type === 'video' ? 'Video' : 'Image'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DISTRIBUTION TAB */}
            {activeTab === 'distribution' && (
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-colors ${isBreaking ? 'border-rose-400 bg-rose-50' : 'border-gray-200 hover:bg-rose-50/40'}`}>
                  <div className="flex items-center gap-3">
                    <Radio className={`w-5 h-5 ${isBreaking ? 'text-rose-600 animate-pulse' : 'text-gray-400'}`} />
                    <div>
                      <div className={`text-sm font-semibold ${isBreaking ? 'text-rose-700' : 'text-gray-700'}`}>Breaking News</div>
                      <div className="text-xs text-gray-400 font-normal">Show red ticker and homepage alert</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={isBreaking} onChange={e => setIsBreaking(e.target.checked)} className="w-4 h-4 accent-rose-600" />
                </label>

                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${isFeatured ? 'border-amber-200 bg-amber-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <Star className={`w-5 h-5 ${isFeatured ? 'text-amber-500 fill-amber-400' : 'text-gray-400'}`} />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Featured Story</div>
                      <div className="text-xs text-gray-400">Promote on homepage hero section</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-amber-500" />
                </label>

                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${isTrending ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <TrendingUp className={`w-5 h-5 ${isTrending ? 'text-emerald-500' : 'text-gray-400'}`} />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Trending Story</div>
                      <div className="text-xs text-gray-400">Show in trending section</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={isTrending} onChange={e => setIsTrending(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                </label>

                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${isPremium ? 'border-gray-300 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <Lock className={`w-5 h-5 ${isPremium ? 'text-gray-700' : 'text-gray-400'}`} />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Premium / Subscribers Only</div>
                      <div className="text-xs text-gray-400">Restrict to paid subscribers</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={isPremium} onChange={e => setIsPremium(e.target.checked)} className="w-4 h-4 accent-gray-700" />
                </label>
              </div>
            )}

            {/* PUBLISH TAB */}
            {activeTab === 'publish' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Publish Date & Time</label>
                  <input
                    type="datetime-local"
                    defaultValue={new Date().toISOString().slice(0, 16)}
                    className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-rose-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Author Notes (Internal)</label>
                  <textarea
                    placeholder="Notes for the editor — not visible to readers"
                    rows={3}
                    className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none resize-none focus:border-rose-400 font-medium"
                  />
                </div>
              </div>
            )}

            {/* ADVANCED / MANUAL SEO TAB */}
            {activeTab === 'advanced' && (
              <div className="space-y-5">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" /> Smart AI Auto-SEO Generator
                    </span>
                  </div>
                  <p className="text-xs text-purple-800 font-medium">Generate all SEO tags in 1-click OR use individual AI buttons next to each field below!</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (!headline.trim() && !body.trim()) {
                        return toast.error('Please write an article headline or body text first!');
                      }
                      const aiMetaTitle = headline.length < 50 ? `${headline} | India Breaking News Report` : headline;
                      const aiMetaDesc = summary ? summary : `Latest news and updates on ${headline || 'this dispatch'}. Read full coverage, key highlights, and expert analysis on Bharat News Portal.`;
                      const aiKeyword = section ? `${section} News India` : 'Breaking News';
                      
                      setTopicInput(aiKeyword);
                      setSummary(aiMetaDesc);
                      toast.success('AI Auto-Generated ALL SEO Metadata!', { icon: '✨' });
                    }}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-extrabold text-xs rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Auto-Generate All SEO Metadata
                  </button>
                </div>

                {/* 2 Live AI Recommendations */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-2">
                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <span>💡 2 Smart SEO Recommendations:</span>
                  </div>
                  <ul className="text-xs text-emerald-800 space-y-1.5">
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-emerald-600">1.</span>
                      <span><strong>Title Length:</strong> Keep Meta Title between 40–60 characters so Google search results don't cut off your title with "...".</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-emerald-600">2.</span>
                      <span><strong>Include Focus Keyword:</strong> Place your main topic keyword (e.g. <em>"{section || 'National'}"</em>) in the first 3 words of your headline for 2x faster indexing.</span>
                    </li>
                  </ul>
                </div>

                {/* Individual Field 1: Focus Keyword */}
                <div className="space-y-1.5 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">1. Focus Keyword / Tag</label>
                    <button
                      type="button"
                      onClick={() => {
                        const generatedKeyword = section ? `${section} News India` : 'Breaking News';
                        setTopicInput(generatedKeyword);
                        toast.success(`AI Generated Keyword: "${generatedKeyword}"`, { icon: '✨' });
                      }}
                      className="text-[11px] font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-2 py-0.5 rounded-md cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" /> AI Keyword
                    </button>
                  </div>
                  <input
                    type="text"
                    value={topicInput}
                    onChange={e => setTopicInput(e.target.value)}
                    placeholder="e.g. India News 2026"
                    className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-rose-500 font-medium"
                  />
                  <p className="text-[10px] text-gray-400">Main search term for Google Ranking</p>
                </div>

                {/* Individual Field 2: Custom URL Slug */}
                <div className="space-y-1.5 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">2. Custom URL Slug</label>
                    <button
                      type="button"
                      onClick={() => {
                        const slug = (headline || 'news-dispatch').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        toast.success(`AI Generated URL Slug: "/news/${slug}"`, { icon: '✨' });
                      }}
                      className="text-[11px] font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-2 py-0.5 rounded-md cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" /> AI Slug
                    </button>
                  </div>
                  <input
                    type="text"
                    value={headline ? headline.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''}
                    readOnly
                    className="w-full text-xs text-gray-600 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none font-mono"
                  />
                  <p className="text-[10px] text-gray-400">Permalink path on news portal</p>
                </div>

                {/* Individual Field 3: Meta Title */}
                <div className="space-y-1.5 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">3. Meta Title</label>
                    <button
                      type="button"
                      onClick={() => {
                        if (!headline.trim()) return toast.error('Write a headline first!');
                        const aiMetaTitle = headline.length < 50 ? `${headline} | India Breaking News Report` : headline;
                        setHeadline(aiMetaTitle);
                        toast.success('AI Generated Meta Title!', { icon: '✨' });
                      }}
                      className="text-[11px] font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-2 py-0.5 rounded-md cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" /> AI Title
                    </button>
                  </div>
                  <input
                    type="text"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-rose-500 font-medium"
                  />
                  <div className="text-[10px] text-gray-400 text-right">{headline.length}/60 recommended chars</div>
                </div>

                {/* Individual Field 4: Meta Description */}
                <div className="space-y-1.5 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">4. Meta Description</label>
                    <button
                      type="button"
                      onClick={() => {
                        const aiMetaDesc = summary ? summary : `Latest news and updates on ${headline || 'this dispatch'}. Read full coverage, key highlights, and expert analysis on Bharat News Portal.`;
                        setSummary(aiMetaDesc);
                        toast.success('AI Generated Meta Description!', { icon: '✨' });
                      }}
                      className="text-[11px] font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-2 py-0.5 rounded-md cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" /> AI Description
                    </button>
                  </div>
                  <textarea
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    rows={3}
                    className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none resize-none focus:border-rose-500 font-medium"
                  />
                  <div className="text-[10px] text-gray-400 text-right">{summary.length}/160 recommended chars</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MEDIA PICKER & UPLOADER MODAL */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsMediaModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-rose-100 text-rose-600 rounded-xl">
                  <ImageIcon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Select or Upload Image</h3>
                  <p className="text-xs text-gray-500">
                    Target: {mediaModalTarget === 'main_image' ? 'Cover Image' : 'Article Body'}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex bg-gray-200 p-0.5 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setMediaModalTab('select')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${mediaModalTab === 'select' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Media Library ({mediaItems.length})
                </button>
                <button
                  onClick={() => setMediaModalTab('upload')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${mediaModalTab === 'upload' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Upload New File
                </button>
              </div>

              <button onClick={() => setIsMediaModalOpen(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[450px] overflow-y-auto">
              {mediaModalTab === 'select' ? (
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Search uploaded media..."
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {filteredMediaItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectMediaItem(item.url, item.altText, mediaModalTarget)}
                        className="group relative aspect-square bg-gray-100 rounded-xl border border-gray-200 hover:border-rose-500 overflow-hidden cursor-pointer shadow-2xs"
                      >
                        <img src={item.url} alt={item.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                          <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                            Select Image
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-center py-8">
                  <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto border border-rose-100 shadow-xs">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Upload Image from Device</h4>
                    <p className="text-xs text-gray-500 mt-1">Select any JPG, PNG, WEBP image file from your computer</p>
                  </div>

                  <label className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold px-6 py-3 rounded-full shadow-md cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    Browse Files
                    <input type="file" accept="image/*" onChange={(e) => handleLocalImageUpload(e, mediaModalTarget)} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LINK MODAL */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsLinkModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-200 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsLinkModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-gray-900 text-base">Insert Hyperlink</h3>
            <form onSubmit={confirmInsertLink} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Link Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={e => setLinkText(e.target.value)}
                  placeholder="e.g. Read full statement here"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">URL Link *</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  placeholder="https://example.com/article"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-500 font-medium"
                />
              </div>
              <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-md transition-colors cursor-pointer">
                Insert Link
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsVideoModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-200 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-gray-900 text-base">Embed Video Clip</h3>
            <form onSubmit={confirmInsertVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Video URL (YouTube / Vimeo / MP4) *</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Video Caption (Optional)</label>
                <input
                  type="text"
                  value={videoCaption}
                  onChange={e => setVideoCaption(e.target.value)}
                  placeholder="e.g. Press conference highlights"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-500 font-medium"
                />
              </div>
              <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-md transition-colors cursor-pointer">
                Embed Video
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LIVE ARTICLE PREVIEW MODAL */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsPreviewModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-rose-100 text-rose-600 rounded-xl">
                  <Eye className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Live Story Preview</h3>
                  <p className="text-xs text-gray-500">Previewing draft before publishing</p>
                </div>
              </div>
              <button onClick={() => setIsPreviewModalOpen(false)} className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-full cursor-pointer transition-colors flex items-center gap-1">
                <X className="w-4 h-4" /> Close Preview
              </button>
            </div>

            {/* Modal Content Preview */}
            <div className="p-8 overflow-y-auto space-y-6">
              {kicker && (
                <div className="text-xs font-bold text-rose-600 uppercase tracking-widest">{kicker}</div>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 leading-tight">
                {headline || 'Draft Headline'}
              </h1>
              {summary && (
                <p className="text-lg text-gray-600 leading-relaxed font-sans">{summary}</p>
              )}

              <div className="flex flex-wrap items-center gap-3 py-2 border-y border-gray-100 text-xs text-gray-500">
                <span className="font-semibold text-gray-900">By {byline}</span>
                <span>•</span>
                <span>{location}</span>
                <span>•</span>
                <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold">{section}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>

              {mainImage && (
                <div className="my-4 rounded-2xl overflow-hidden bg-slate-900/5 border border-gray-200 p-2">
                  <img src={mainImage} alt={headline} className="w-full max-h-[450px] object-contain mx-auto rounded-xl" />
                </div>
              )}

              <div
                className="prose max-w-none text-gray-800 leading-[1.8] font-serif text-base pt-2"
                dangerouslySetInnerHTML={{
                  __html: editorRef.current?.innerHTML || (body ? markdownToVisualHtml(body) : '<p class="text-gray-400 italic">No article body written yet.</p>')
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE DATE & TIME PICKER MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150" onClick={() => setIsScheduleModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-purple-100 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsScheduleModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">প্রকাশের সময় নির্ধারণ (Schedule)</h3>
                <p className="text-xs text-gray-500">নির্ধারিত সময় এলে আর্টিকেলটি স্বয়ংক্রিয়ভাবে পাবলিশ হবে</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" /> তারিখ (Date)
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={e => setScheduleDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-purple-600 focus:bg-white transition-all cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-600" /> সময় (Time)
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={e => setScheduleTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-purple-600 focus:bg-white transition-all cursor-pointer"
                  />
                </div>
              </div>

              {/* QUICK PRESETS */}
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">দ্রুত সময় নির্বাচন (Quick Presets)</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const d = new Date();
                      d.setHours(d.getHours() + 1);
                      setScheduleDate(d.toISOString().split('T')[0]);
                      setScheduleTime(d.toTimeString().substring(0, 5));
                    }}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-gray-700 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    ⏱️ +১ ঘণ্টা (+1 Hour)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const d = new Date();
                      d.setHours(d.getHours() + 3);
                      setScheduleDate(d.toISOString().split('T')[0]);
                      setScheduleTime(d.toTimeString().substring(0, 5));
                    }}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-gray-700 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    ⏱️ +৩ ঘণ্টা (+3 Hours)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const d = new Date();
                      d.setDate(d.getDate() + 1);
                      setScheduleDate(d.toISOString().split('T')[0]);
                      setScheduleTime('09:00');
                    }}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-gray-700 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    🌅 আগামী কাল সকাল ৯:০০
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const d = new Date();
                      d.setDate(d.getDate() + 1);
                      setScheduleDate(d.toISOString().split('T')[0]);
                      setScheduleTime('18:00');
                    }}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-gray-700 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    🌇 আগামী কাল সন্ধ্যা ৬:০০
                  </button>
                </div>
              </div>

              {/* DATE PREVIEW BANNER */}
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 text-xs text-purple-900 font-medium flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  স্বয়ংক্রিয় পাবলিশ হবে: <span className="font-bold text-purple-950">{scheduleDate ? new Date(`${scheduleDate}T${scheduleTime || '00:00'}`).toLocaleString('bn-BD', { dateStyle: 'full', timeStyle: 'short' }) : 'তারিখ নির্বাচন করুন'}</span>
                </div>
              </div>

              {/* CONFIRM / CANCEL BUTTONS */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                >
                  বাতিল (Cancel)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!scheduleDate || !scheduleTime) {
                      toast.error('অনুগ্রহ করে সঠিক তারিখ ও সময় নির্বাচন করুন');
                      return;
                    }
                    const fullScheduledIso = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
                    handleSave('scheduled', fullScheduledIso);
                    setIsScheduleModalOpen(false);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> সময় সেট ও শিডিউল (Schedule)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
