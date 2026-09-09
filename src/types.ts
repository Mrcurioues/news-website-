export type PostStatus = 'published' | 'draft' | 'pending' | 'scheduled';
export type ContentFormat = 'standard' | 'tutorial' | 'review' | 'listicle' | 'breaking';

export interface Article {
  id: string;
  slug: string;
  idSlug: string;
  title: string;
  titleEn?: string;
  titleBn?: string;
  titleHi?: string;
  excerpt: string;
  excerptEn?: string;
  excerptBn?: string;
  excerptHi?: string;
  category: string;
  categorySlug: string;
  author: {
    name: string;
    nameHi: string;
    role: string;
    roleEn?: string;
    avatar: string;
  };
  publishedAt: string;
  publishedAtEn?: string;
  updatedAt?: string;
  readTime: string;
  readTimeEn?: string;
  coverImage: string;
  imageCaption?: string;
  imageCaptionEn?: string;
  imageCaptionHi?: string;
  imageCaptionBn?: string;
  imageAltText?: string;
  imageAltTextEn?: string;
  imageAltTextHi?: string;
  imageAltTextBn?: string;
  tags: string[];
  tagsEn?: string[];
  tagsHi?: string[];
  tagsBn?: string[];
  body: string[];
  bodyEn?: string[];
  bodyBn?: string[];
  bodyHi?: string[];
  keyPoints?: string[];
  keyPointsEn?: string[];
  keyPointsHi?: string[];
  keyPointsBn?: string[];
  isBreaking?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  views: number;
  videoUrl?: string;
  // WordPress Article Management fields
  status?: PostStatus;
  scheduledDate?: string;
  focusKeyword?: string;
  metaTitle?: string;
  metaTitleEn?: string;
  metaTitleHi?: string;
  metaTitleBn?: string;
  metaDescription?: string;
  metaDescriptionEn?: string;
  metaDescriptionHi?: string;
  metaDescriptionBn?: string;
  contentFormat?: ContentFormat;
  seoScore?: number;
  readabilityScore?: number;
}

export interface SeoCheckItem {
  id: string;
  title: string;
  titleHi: string;
  passed: boolean;
  score: number;
  maxScore: number;
  recommendation: string;
  recommendationHi: string;
  type: 'seo' | 'readability' | 'headings' | 'links';
}

export interface SeoAuditReport {
  overallScore: number;
  grade: 'excellent' | 'good' | 'needs-work' | 'poor';
  passedCount: number;
  totalChecks: number;
  checks: SeoCheckItem[];
  fleschReadingEase: number;
  fleschGrade: string;
  wordCount: number;
  readingTimeMinutes: number;
  keywordDensity: number;
  headingCounts: { h1: number; h2: number; h3: number; h4: number };
  suggestions: string[];
  suggestionsHi: string[];
  internalLinkOpportunities: string[];
  externalLinkOpportunities: string[];
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionPayload?: {
    actionType: 'create_article' | 'update_article' | 'schedule_article' | 'delete_article' | 'apply_seo';
    articleData?: Partial<Article>;
    articleId?: string;
    requiresConfirmation?: boolean;
    confirmationPrompt?: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  nameHi: string;
  nameEn: string;
  description: string;
  color: string;
}

export interface VideoItem {
  id: string;
  idSlug: string;
  title: string;
  titleHi: string;
  titleEn?: string;
  youtubeId: string;
  category: string;
  categorySlug: string;
  duration: string;
  views: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  descriptionEn?: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
  captionHi: string;
}

export interface PhotoGallery {
  id: string;
  idSlug: string;
  title: string;
  titleHi: string;
  titleEn?: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  coverImage: string;
  images: GalleryImage[];
}

export type LanguageMode = 'hi' | 'en';
