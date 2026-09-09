// =====================================================
// NEWSROOM CMS — BENGALI-FIRST AUTOMATED SEO ENGINE
// =====================================================

import { Article } from '../types';

export interface SeoReadinessResult {
  score: number; // 0 - 100
  status: 'SEO Ready' | 'Needs Attention' | 'Critical Issue' | 'Editorial Review Required';
  statusColor: 'emerald' | 'amber' | 'rose' | 'blue';
  criticalIssues: string[];
  warnings: string[];
  info: string[];
  technicalScore: number;
  onPageScore: number;
  editorialScore: number;
}

export interface InternalLinkSuggestion {
  articleId: string;
  title: string;
  slug: string;
  suggestedAnchor: string;
  relevanceReason: string;
}

export interface EntityMatch {
  canonicalName: string;
  nameEn: string;
  nameBn: string;
  type: 'Person' | 'Organization' | 'Place' | 'District' | 'Event' | 'Government';
}

// Key Bengali & West Bengal Entity Dictionary for Multilingual SEO
export const BENGALI_ENTITIES: EntityMatch[] = [
  { canonicalName: 'Mamata Banerjee', nameEn: 'Mamata Banerjee', nameBn: 'মমতা বন্দ্যোপাধ্যায়', type: 'Person' },
  { canonicalName: 'Kolkata', nameEn: 'Kolkata', nameBn: 'কলকাতা', type: 'Place' },
  { canonicalName: 'West Bengal Government', nameEn: 'West Bengal Government', nameBn: 'पश्चिम बंगाल सरकार / পশ্চিমবঙ্গ সরকার', type: 'Government' },
  { canonicalName: 'WBSSC', nameEn: 'West Bengal School Service Commission', nameBn: 'পশ্চিমবঙ্গ স্কুল সার্ভিস কমিশন', type: 'Organization' },
  { canonicalName: 'Howrah', nameEn: 'Howrah', nameBn: 'হাওড়া', type: 'District' },
  { canonicalName: 'Hooghly', nameEn: 'Hooghly', nameBn: 'হুগলি', type: 'District' },
  { canonicalName: 'North 24 Parganas', nameEn: 'North 24 Parganas', nameBn: 'उत्तर 24 परगना / উত্তর ২৪ পরগনা', type: 'District' },
  { canonicalName: 'South 24 Parganas', nameEn: 'South 24 Parganas', nameBn: 'दक्षिण 24 परगना / দক্ষিণ ২৪ পরগনা', type: 'District' },
  { canonicalName: 'Darjeeling', nameEn: 'Darjeeling', nameBn: 'दार्जिलिंग / দার্জিলিং', type: 'District' },
  { canonicalName: 'ISRO', nameEn: 'ISRO', nameBn: 'ইসরো', type: 'Organization' },
];

export class SEOEngine {
  /**
   * Calculates internal SEO Readiness metric (NOT a ranking guarantee)
   */
  static calculateReadiness(article: Partial<Article>): SeoReadinessResult {
    const criticalIssues: string[] = [];
    const warnings: string[] = [];
    const info: string[] = [];

    const title = (article.title || '').trim();
    const bodyText = (article.body || []).join('\n\n').trim();
    const author = article.author?.name || '';
    const coverImage = article.coverImage || '';
    const category = article.category || '';
    const slug = article.slug || '';

    // 1. Critical Checks (Cannot publish until resolved)
    if (!title) criticalIssues.push('Headline is missing.');
    if (!bodyText || bodyText.length < 50) criticalIssues.push('Article body is empty or too short (< 50 chars).');
    if (!author) criticalIssues.push('Author name is missing.');
    if (!category) criticalIssues.push('Category is not selected.');
    if (!coverImage) criticalIssues.push('Featured main image is missing.');

    // 2. On-Page & Technical Warnings
    if (title.length < 30 || title.length > 90) {
      warnings.push(`Headline length is ${title.length} chars (Recommended: 40-75 chars).`);
    }
    if (bodyText.split(/\s+/).length < 250) {
      warnings.push(`Article is relatively short (${bodyText.split(/\s+/).length} words). Consider adding more background context.`);
    }
    if (!article.imageAltText && !article.imageCaption) {
      warnings.push('Image Alt Text / Caption is missing for accessibility and image search eligibility.');
    }
    if (!article.excerpt || article.excerpt.length < 50) {
      warnings.push('Summary / Meta description is short. A detailed summary improves search snippet click-through rate.');
    }

    // 3. Information & Recommendations
    const recognizedEntities = this.extractEntities(title + ' ' + bodyText);
    if (recognizedEntities.length > 0) {
      info.push(`Recognized Bengali Entities: ${recognizedEntities.map(e => e.canonicalName).join(', ')}.`);
    } else {
      info.push('Tip: Mention key West Bengal locations or official entities for enhanced local search relevance.');
    }

    // Scores Calculation
    const techScore = criticalIssues.length === 0 ? 100 : Math.max(0, 100 - criticalIssues.length * 25);
    const onPageScore = Math.max(0, 100 - warnings.length * 15);
    const editorialScore = author && category ? 95 : 60;
    const overallScore = Math.round((techScore * 0.4) + (onPageScore * 0.4) + (editorialScore * 0.2));

    let status: SeoReadinessResult['status'] = 'SEO Ready';
    let statusColor: SeoReadinessResult['statusColor'] = 'emerald';

    if (criticalIssues.length > 0) {
      status = 'Critical Issue';
      statusColor = 'rose';
    } else if (warnings.length >= 2) {
      status = 'Needs Attention';
      statusColor = 'amber';
    } else if (warnings.length === 1) {
      status = 'Editorial Review Required';
      statusColor = 'blue';
    }

    return {
      score: overallScore,
      status,
      statusColor,
      criticalIssues,
      warnings,
      info,
      technicalScore: techScore,
      onPageScore,
      editorialScore
    };
  }

  /**
   * Generates a clean, natural SEO Title
   */
  static generateTitle(article: Partial<Article>): string {
    const rawTitle = (article.title || '').trim();
    if (!rawTitle) return '';
    // Clean up unnecessary leading/trailing whitespace & normalize dashes
    let clean = rawTitle.replace(/\s+/g, ' ').replace(/-+/g, '-');
    if (article.category && !clean.toLowerCase().includes(article.category.toLowerCase())) {
      // Append section naturally if not already present
    }
    return clean;
  }

  /**
   * Generates a concise natural Meta Description snippet
   */
  static generateMetaDescription(article: Partial<Article>): string {
    if (article.excerpt && article.excerpt.trim().length >= 60) {
      return article.excerpt.trim().slice(0, 160);
    }
    const bodyText = (article.body || []).join(' ').trim();
    if (!bodyText) return article.title || '';
    const firstSentence = bodyText.split(/[.!?।\n]/)[0] || bodyText.slice(0, 150);
    return firstSentence.trim().slice(0, 160);
  }

  /**
   * Generates a stable, readable URL slug
   */
  static generateSlug(headline: string): string {
    if (!headline) return 'news-' + Date.now().toString().slice(-6);
    return headline
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\u0980-\u09FF\s-]/g, '') // Preserve Bengali unicode & alphanumeric
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80);
  }

  /**
   * Extracts recognized Bengali/English Entities from text
   */
  static extractEntities(text: string): EntityMatch[] {
    if (!text) return [];
    const lower = text.toLowerCase();
    return BENGALI_ENTITIES.filter(entity => 
      lower.includes(entity.canonicalName.toLowerCase()) || 
      text.includes(entity.nameBn) || 
      lower.includes(entity.nameEn.toLowerCase())
    );
  }

  /**
   * Discovers database-driven internal link recommendations
   */
  static analyzeInternalLinks(currentArticle: Partial<Article>, allArticles: Article[]): InternalLinkSuggestion[] {
    if (!allArticles || allArticles.length === 0) return [];
    const currentId = currentArticle.id || '';
    const currentCategory = currentArticle.categorySlug || '';
    const contentText = ((currentArticle.title || '') + ' ' + (currentArticle.body || []).join(' ')).toLowerCase();

    return allArticles
      .filter(a => a.id !== currentId)
      .map(a => {
        let relevanceScore = 0;
        let reason = '';

        if (a.categorySlug === currentCategory) {
          relevanceScore += 30;
          reason = `Same category (${a.category})`;
        }

        // Entity matching
        BENGALI_ENTITIES.forEach(entity => {
          const aText = (a.title + ' ' + (a.body || []).join(' ')).toLowerCase();
          if (contentText.includes(entity.nameEn.toLowerCase()) && aText.includes(entity.nameEn.toLowerCase())) {
            relevanceScore += 40;
            reason = `Shared entity: ${entity.canonicalName}`;
          }
        });

        return {
          articleId: a.id,
          title: a.title,
          slug: a.slug || a.idSlug,
          suggestedAnchor: a.title.slice(0, 45) + '...',
          relevanceReason: reason || 'Related news topic',
          relevanceScore
        };
      })
      .filter(item => item.relevanceScore > 20)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 4);
  }

  /**
   * Generates Schema.org JSON-LD NewsArticle & BreadcrumbList structured data
   */
  static generateStructuredData(article: Article, siteName: string = 'Bharat Samachar') {
    const canonicalUrl = `https://bharatsamachar.com/news/${article.slug || article.idSlug}`;
    const pubDate = article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date().toISOString();
    const modDate = article.updatedAt ? new Date(article.updatedAt).toISOString() : pubDate;

    const newsArticleSchema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      'headline': article.title,
      'description': article.excerpt,
      'image': [article.coverImage],
      'datePublished': pubDate,
      'dateModified': modDate,
      'inLanguage': 'bn-IN',
      'author': {
        '@type': 'Person',
        'name': article.author.name,
        'jobTitle': article.author.role
      },
      'publisher': {
        '@type': 'Organization',
        'name': siteName,
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://bharatsamachar.com/logo.png'
        }
      },
      'articleSection': article.category
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://bharatsamachar.com'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': article.category,
          'item': `https://bharatsamachar.com/category/${article.categorySlug}`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': article.title,
          'item': canonicalUrl
        }
      ]
    };

    return { newsArticleSchema, breadcrumbSchema };
  }
}
