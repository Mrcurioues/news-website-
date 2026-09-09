// =====================================================
// NEWSROOM CMS — ADMIN TYPES
// =====================================================

export type StoryStatus =
  | 'idea'
  | 'draft'
  | 'in_review'
  | 'changes_requested'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'archived'
  | 'trash';

export type StoryType =
  | 'news'
  | 'feature'
  | 'explainer'
  | 'photo_story'
  | 'video_story'
  | 'live_blog'
  | 'list'
  | 'opinion';

export type UserRole = 'admin' | 'editor' | 'journalist' | 'contributor';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  storiesCount: number;
  joinedAt: string;
}

export interface StoryActivity {
  id: string;
  action: string;
  userId: string;
  userName: string;
  timestamp: string;
  note?: string;
}

export interface StorySource {
  id: string;
  label: string;
  url: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Story {
  id: string;
  type: StoryType;
  status: StoryStatus;
  kicker: string;
  headline: string;
  headlineEn?: string;
  headlineHi?: string;
  headlineBn?: string;
  summary: string;
  summaryEn?: string;
  summaryHi?: string;
  summaryBn?: string;
  body: string;
  bodyEn?: string;
  bodyHi?: string;
  bodyBn?: string;
  mainImage?: string;
  mainImageCaption?: string;
  mainImageCaptionEn?: string;
  mainImageCaptionHi?: string;
  mainImageCaptionBn?: string;
  mainImageAlt?: string;
  mainImageAltEn?: string;
  mainImageAltHi?: string;
  mainImageAltBn?: string;
  section: string;
  topics: string[];
  byline: string;
  authorId: string;
  location?: string;
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isPremium: boolean;
  publishDate?: string;
  scheduledDate?: string;
  updatedDate?: string;
  views: number;
  engagement: number;
  shares: number;
  comments: number;
  seoTitle?: string;
  seoTitleEn?: string;
  seoTitleHi?: string;
  seoTitleBn?: string;
  seoDescription?: string;
  seoDescriptionEn?: string;
  seoDescriptionHi?: string;
  seoDescriptionBn?: string;
  canonicalUrl?: string;
  sources: StorySource[];
  relatedStoryIds: string[];
  authorNotes?: string;
  activity: StoryActivity[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  videoUrl?: string;
  pushNotification?: boolean;
  newsletterInclude?: boolean;
  faqs?: FaqItem[];
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  altText: string;
  uploadedBy: string;
  uploadedAt: string;
  usedInStories: string[];
}

export interface HomepageLayout {
  hero: string[];
  frontContent: string[];
  breaking: string[];
  secondary: string[];
  latest: string[];
  trending: string[];
  hindiNews: string[];
  business: string[];
  video: string[];
  customVideoLinks?: string[];
  photo: string[];
}

export interface Notification {
  id: string;
  type:
    | 'approval_request'
    | 'changes_requested'
    | 'deadline'
    | 'published'
    | 'breaking'
    | 'comment'
    | 'traffic_spike'
    | 'system';
  title: string;
  message: string;
  storyId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  storyId: string;
  storyTitle: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: 'pending' | 'approved' | 'spam' | 'rejected';
  createdAt: string;
  isToxic?: boolean;
}

export interface NewsSection {
  id: string;
  name: string;
  slug: string;
  color: string;
  order: number;
}
