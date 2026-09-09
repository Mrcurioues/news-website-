// =====================================================
// NEWSROOM CMS — PLUGINS STORE (Website Editing Addons)
// =====================================================

import { create } from 'zustand';

export interface PluginItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'seo' | 'editing' | 'ai' | 'media' | 'social' | 'analytics' | 'monetization' | 'design';
  icon: string;
  author: string;
  version: string;
  rating: number;
  reviewsCount: number;
  downloadsCount: number;
  isInstalled: boolean;
  isActive: boolean;
  isFeatured?: boolean;
  settings?: Record<string, any>;
  lastUpdated: string;
}

interface PluginsState {
  plugins: PluginItem[];
  searchQuery: string;
  selectedCategory: string;
  activeTab: 'store' | 'installed' | 'upload';
  configuredPluginId: string | null;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setActiveTab: (tab: 'store' | 'installed' | 'upload') => void;
  setConfiguredPluginId: (id: string | null) => void;
  installPlugin: (id: string) => void;
  uninstallPlugin: (id: string) => void;
  togglePluginStatus: (id: string) => void;
  updatePluginSettings: (id: string, settings: Record<string, any>) => void;
  addCustomPlugin: (plugin: Omit<PluginItem, 'id' | 'rating' | 'reviewsCount' | 'downloadsCount'>) => void;
}

const INITIAL_PLUGINS: PluginItem[] = [
  {
    id: 'yoast-seo-master',
    name: 'Yoast SEO & Schema Master',
    slug: 'yoast-seo-master',
    tagline: 'Real-time SEO content scoring, meta title tags, & Google news schema generator.',
    description: 'Empower your journalists with live SEO readability scores, Google News XML sitemap generator, automated OpenGraph meta tags, and structured JSON-LD schema injection.',
    category: 'seo',
    icon: '🔍',
    author: 'SEO Press Labs',
    version: '4.2.1',
    rating: 4.9,
    reviewsCount: 1240,
    downloadsCount: 85200,
    isInstalled: true,
    isActive: true,
    isFeatured: true,
    lastUpdated: '2 days ago',
    settings: {
      autoGenerateMeta: true,
      googleNewsSitemap: true,
      canonicalTags: true,
      focusKeywordRequired: false,
    },
  },
  {
    id: 'gutenberg-block-editor',
    name: 'WP-Style Gutenberg Blocks',
    slug: 'gutenberg-block-editor',
    tagline: 'Advanced drag-and-drop block components for interactive story layouts.',
    description: 'Add rich quote blocks, side-by-side photo comparison sliders, embedded audio players, callout boxes, and custom HTML widgets directly into the article editor.',
    category: 'editing',
    icon: '🧩',
    author: 'Visual Block Studio',
    version: '3.1.0',
    rating: 4.8,
    reviewsCount: 890,
    downloadsCount: 62400,
    isInstalled: true,
    isActive: true,
    isFeatured: true,
    lastUpdated: '5 days ago',
    settings: {
      enablePhotoSliders: true,
      enableAudioPlayer: true,
      customHtmlAllowed: true,
    },
  },
  {
    id: 'ai-news-assistant-pro',
    name: 'AI News Assistant & Rewriter',
    slug: 'ai-news-assistant-pro',
    tagline: 'Auto-summaries, catchy headlines, and instant Hindi-English translations.',
    description: 'Powered by Gemini & LLMs. Generates 3 catchy headline variations, instant 50-word executive bullet summaries, and translates English dispatches into fluent Hindi.',
    category: 'ai',
    icon: '✨',
    author: 'Bharat AI Labs',
    version: '2.5.0',
    rating: 5.0,
    reviewsCount: 2150,
    downloadsCount: 142000,
    isInstalled: true,
    isActive: true,
    isFeatured: true,
    lastUpdated: '1 day ago',
    settings: {
      autoSuggestHeadlines: true,
      translateLanguage: 'hi',
      summaryLength: 'bullet_5',
    },
  },
  {
    id: 'custom-css-js-injector',
    name: 'Custom CSS & JS Injector',
    slug: 'custom-css-js-injector',
    tagline: 'Safely inject custom CSS themes, Google Tag Manager, & header tracking scripts.',
    description: 'Add custom CSS styling to website elements, load Google Tag Manager (GTM), Meta Pixel, Google Analytics 4 tracking code, or custom font stylesheets without editing code files.',
    category: 'design',
    icon: '🎨',
    author: 'WebCraft Devs',
    version: '1.8.4',
    rating: 4.7,
    reviewsCount: 540,
    downloadsCount: 38900,
    isInstalled: false,
    isActive: false,
    lastUpdated: '1 week ago',
    settings: {
      headerScripts: '',
      footerScripts: '',
      customCss: '/* Add custom CSS rules here */',
    },
  },
  {
    id: 'auto-social-broadcaster',
    name: 'Auto Social Broadcaster',
    slug: 'auto-social-broadcaster',
    tagline: 'Instantly publish breaking news to X/Twitter, Telegram, & Facebook pages.',
    description: 'Automatically pushes breaking news alerts and newly published stories directly to your official Telegram channels, X/Twitter handles, and Facebook news pages with custom thumbnails.',
    category: 'social',
    icon: '📡',
    author: 'Syndicate Connect',
    version: '3.0.2',
    rating: 4.8,
    reviewsCount: 730,
    downloadsCount: 49000,
    isInstalled: false,
    isActive: false,
    lastUpdated: '3 days ago',
    settings: {
      autoTweetBreaking: true,
      telegramChannel: '@bharatsamachar_live',
      includeImageThumbnail: true,
    },
  },
  {
    id: 'watermark-image-compressor',
    name: 'Media Watermark & WebP Converter',
    slug: 'watermark-image-compressor',
    tagline: 'Auto-compress uploaded photos to WebP & embed official logo watermarks.',
    description: 'Protects editorial photography rights by stamping the Bharat Samachar logo watermark in transparent overlay. Automatically converts JPG/PNG uploads into lightweight WebP format.',
    category: 'media',
    icon: '🖼️',
    author: 'PixelOptima',
    version: '2.2.0',
    rating: 4.9,
    reviewsCount: 960,
    downloadsCount: 71200,
    isInstalled: false,
    isActive: false,
    lastUpdated: '4 days ago',
    settings: {
      watermarkPosition: 'bottom_right',
      watermarkOpacity: 80,
      convertToWebP: true,
      maxQuality: 85,
    },
  },
  {
    id: 'live-heatmap-analytics',
    name: 'Live Click Heatmap & Reader Depth',
    slug: 'live-heatmap-analytics',
    tagline: 'Visualize visitor scroll depth, hot click zones, & reader engagement.',
    description: 'Understands where readers drop off on long-form articles. Provides visual heatmap overlays showing top-clicked headlines, banner interaction rates, and mobile scroll depth percentages.',
    category: 'analytics',
    icon: '📊',
    author: 'Metrics Pulse',
    version: '1.4.0',
    rating: 4.6,
    reviewsCount: 310,
    downloadsCount: 22000,
    isInstalled: false,
    isActive: false,
    lastUpdated: '2 weeks ago',
    settings: {
      enableScrollTracking: true,
      sampleRatePercent: 100,
    },
  },
  {
    id: 'adsense-banner-manager',
    name: 'AdSense & Native Ads Manager',
    slug: 'adsense-banner-manager',
    tagline: 'Inject Google AdSense, leaderboard banners, & sponsored content slots.',
    description: 'Easily manage revenue banner placements across homepage sections, article sidebars, and in-feed mobile streams. Supports AdSense auto-ads, direct sponsor codes, and lazy loading.',
    category: 'monetization',
    icon: '💰',
    author: 'AdStrategy Network',
    version: '5.0.1',
    rating: 4.8,
    reviewsCount: 1480,
    downloadsCount: 99400,
    isInstalled: true,
    isActive: false,
    lastUpdated: 'Yesterday',
    settings: {
      clientAdSenseId: 'ca-pub-9988776655443322',
      autoAdInFeed: true,
      stickyMobileBanner: true,
    },
  },
];

export const usePluginsStore = create<PluginsState>((set) => ({
  plugins: INITIAL_PLUGINS,
  searchQuery: '',
  selectedCategory: 'all',
  activeTab: 'store',
  configuredPluginId: null,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setConfiguredPluginId: (configuredPluginId) => set({ configuredPluginId }),

  installPlugin: (id) =>
    set((state) => ({
      plugins: state.plugins.map((p) =>
        p.id === id ? { ...p, isInstalled: true, isActive: true } : p
      ),
    })),

  uninstallPlugin: (id) =>
    set((state) => ({
      plugins: state.plugins.map((p) =>
        p.id === id ? { ...p, isInstalled: false, isActive: false } : p
      ),
      configuredPluginId: state.configuredPluginId === id ? null : state.configuredPluginId,
    })),

  togglePluginStatus: (id) =>
    set((state) => ({
      plugins: state.plugins.map((p) =>
        p.id === id ? { ...p, isActive: !p.isActive } : p
      ),
    })),

  updatePluginSettings: (id, newSettings) =>
    set((state) => ({
      plugins: state.plugins.map((p) =>
        p.id === id
          ? { ...p, settings: { ...p.settings, ...newSettings } }
          : p
      ),
    })),

  addCustomPlugin: (pluginData) =>
    set((state) => {
      const newPlugin: PluginItem = {
        ...pluginData,
        id: `custom-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 1,
        downloadsCount: 1,
        isInstalled: true,
        isActive: true,
      };
      return {
        plugins: [newPlugin, ...state.plugins],
        activeTab: 'installed',
      };
    }),
}));
