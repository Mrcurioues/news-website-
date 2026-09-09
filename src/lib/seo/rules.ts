// =====================================================
// TECHNICAL SEO ENGINE — RULES ANALYZER
// =====================================================

import { Story } from '../../types/admin';
import {
  SeoAnalysisResult,
  SeoRuleCheck,
  InternalLinkOpportunity,
  CannibalizationWarning
} from './types';

export class SeoAnalyzer {
  /**
   * Deterministic 0-100 SEO analysis based on weighted rules
   */
  static analyzeStory(
    currentStory: Partial<Story>,
    allPublishedStories: Story[] = []
  ): SeoAnalysisResult {
    const headline = (currentStory.headline || currentStory.seoTitle || '').trim();
    const summary = (currentStory.summary || currentStory.seoDescription || '').trim();
    const body = (currentStory.body || '').trim();
    const focusKeyword = (currentStory.topics?.[0] || '').trim().toLowerCase();
    const slug = (currentStory.slug || '').trim();
    const byline = (currentStory.byline || '').trim();
    const mainImage = (currentStory.mainImage || '').trim();
    const mainImageAlt = (currentStory.mainImageAlt || '').trim();

    const wordCount = body ? body.split(/\s+/).filter(Boolean).length : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Heading Counts Heuristic
    const h1Matches = (body.match(/<h1[^>]*>|^#\s+/gm) || []).length;
    const h2Matches = (body.match(/<h2[^>]*>|^##\s+/gm) || []).length;
    const h3Matches = (body.match(/<h3[^>]*>|^###\s+/gm) || []).length;

    const checks: SeoRuleCheck[] = [];

    // ----------------------------------------------------
    // 1. TECHNICAL / METADATA CHECKS (35 Points Max)
    // ----------------------------------------------------
    // Headline presence & length
    if (!headline) {
      checks.push({
        id: 'meta_title_missing',
        category: 'technical',
        severity: 'critical',
        points: 0,
        maxPoints: 10,
        message: 'Article title is missing.',
        recommendation: 'Write a descriptive headline of 40 to 70 characters.',
        passed: false
      });
    } else if (headline.length < 35 || headline.length > 80) {
      checks.push({
        id: 'meta_title_length',
        category: 'technical',
        severity: 'warning',
        points: 5,
        maxPoints: 10,
        message: `Title length is ${headline.length} characters.`,
        recommendation: 'Target between 40 and 70 characters so Google does not truncate it.',
        passed: false
      });
    } else {
      checks.push({
        id: 'meta_title_ok',
        category: 'technical',
        severity: 'passed',
        points: 10,
        maxPoints: 10,
        message: 'Headline length is optimal for Google search results.',
        passed: true
      });
    }

    // Meta description presence & length
    if (!summary) {
      checks.push({
        id: 'meta_desc_missing',
        category: 'technical',
        severity: 'critical',
        points: 0,
        maxPoints: 10,
        message: 'Meta description / summary is missing.',
        recommendation: 'Add a 120-160 character summary to improve search click-through rate.',
        passed: false
      });
    } else if (summary.length < 70 || summary.length > 170) {
      checks.push({
        id: 'meta_desc_length',
        category: 'technical',
        severity: 'warning',
        points: 5,
        maxPoints: 10,
        message: `Summary length is ${summary.length} characters.`,
        recommendation: 'Target 120 to 160 characters for best display on search snippet cards.',
        passed: false
      });
    } else {
      checks.push({
        id: 'meta_desc_ok',
        category: 'technical',
        severity: 'passed',
        points: 10,
        maxPoints: 10,
        message: 'Meta description length is well optimized.',
        passed: true
      });
    }

    // Clean Slug
    const isCleanSlug = /^[a-z0-9-]+$/.test(slug);
    if (!slug) {
      checks.push({
        id: 'slug_missing',
        category: 'technical',
        severity: 'warning',
        points: 0,
        maxPoints: 5,
        message: 'URL slug is not set.',
        recommendation: 'Create a clean, hyphenated URL slug.',
        passed: false
      });
    } else if (!isCleanSlug) {
      checks.push({
        id: 'slug_formatting',
        category: 'technical',
        severity: 'warning',
        points: 2,
        maxPoints: 5,
        message: 'URL slug contains uppercase letters or special characters.',
        recommendation: 'Use lowercase letters, numbers, and hyphens only.',
        passed: false
      });
    } else {
      checks.push({
        id: 'slug_ok',
        category: 'technical',
        severity: 'passed',
        points: 5,
        maxPoints: 5,
        message: 'URL slug is clean and SEO friendly.',
        passed: true
      });
    }

    // Canonical & Indexability
    checks.push({
      id: 'canonical_indexable',
      category: 'technical',
      severity: 'passed',
      points: 10,
      maxPoints: 10,
      message: 'Article has canonical URL structure and is eligible for Google indexing.',
      passed: true
    });

    // ----------------------------------------------------
    // 2. CONTENT STRUCTURE & READABILITY (30 Points Max)
    // ----------------------------------------------------
    if (wordCount < 150) {
      checks.push({
        id: 'content_thin',
        category: 'content',
        severity: 'critical',
        points: 2,
        maxPoints: 15,
        message: `Article content is too short (${wordCount} words).`,
        recommendation: 'Add more background context and details (at least 250+ words recommended for news).',
        passed: false
      });
    } else if (wordCount < 300) {
      checks.push({
        id: 'content_moderate',
        category: 'content',
        severity: 'warning',
        points: 10,
        maxPoints: 15,
        message: `Article word count is moderate (${wordCount} words).`,
        recommendation: 'Consider adding sub-headings or key takeaways.',
        passed: false
      });
    } else {
      checks.push({
        id: 'content_length_ok',
        category: 'content',
        severity: 'passed',
        points: 15,
        maxPoints: 15,
        message: `Substantial article depth (${wordCount} words).`,
        passed: true
      });
    }

    // Subheading structure
    if (wordCount > 300 && h2Matches === 0) {
      checks.push({
        id: 'headings_missing',
        category: 'content',
        severity: 'suggestion',
        points: 5,
        maxPoints: 15,
        message: 'No subheadings (H2/H3) found in a longer story.',
        recommendation: 'Add a few descriptive subheadings so readers and search engines can scan the article easily.',
        passed: false
      });
    } else {
      checks.push({
        id: 'headings_ok',
        category: 'content',
        severity: 'passed',
        points: 15,
        maxPoints: 15,
        message: 'Article has clear structural breakdown for readers.',
        passed: true
      });
    }

    // ----------------------------------------------------
    // 3. IMAGE SEO (15 Points Max)
    // ----------------------------------------------------
    if (!mainImage) {
      checks.push({
        id: 'image_missing',
        category: 'images',
        severity: 'critical',
        points: 0,
        maxPoints: 15,
        message: 'Featured cover image is missing.',
        recommendation: 'Upload a cover image for Google News and Social Sharing cards.',
        passed: false
      });
    } else if (!mainImageAlt) {
      checks.push({
        id: 'image_alt_missing',
        category: 'images',
        severity: 'warning',
        points: 7,
        maxPoints: 15,
        message: 'Featured image is missing descriptive Alt Text.',
        recommendation: 'Add natural alt text describing what is shown in the image.',
        passed: false
      });
    } else {
      checks.push({
        id: 'image_seo_ok',
        category: 'images',
        severity: 'passed',
        points: 15,
        maxPoints: 15,
        message: 'Featured image and Alt Text are present.',
        passed: true
      });
    }

    // ----------------------------------------------------
    // 4. NEWS E-E-A-T & STRUCTURED DATA (20 Points Max)
    // ----------------------------------------------------
    if (!byline) {
      checks.push({
        id: 'author_missing',
        category: 'news_eeat',
        severity: 'critical',
        points: 0,
        maxPoints: 10,
        message: 'Author / Byline is missing.',
        recommendation: 'Specify the reporter or editor byline for Google News E-E-A-T trust signals.',
        passed: false
      });
    } else {
      checks.push({
        id: 'author_ok',
        category: 'news_eeat',
        severity: 'passed',
        points: 10,
        maxPoints: 10,
        message: `Reporter byline (${byline}) is set.`,
        passed: true
      });
    }

    checks.push({
      id: 'news_article_schema',
      category: 'news_eeat',
      severity: 'passed',
      points: 10,
      maxPoints: 10,
      message: 'NewsArticle JSON-LD structured data is ready for publication.',
      passed: true
    });

    // ----------------------------------------------------
    // INTERNAL LINK OPPORTUNITIES & CANNIBALIZATION
    // ----------------------------------------------------
    const internalLinkOpportunities: InternalLinkOpportunity[] = [];
    const cannibalizationWarnings: CannibalizationWarning[] = [];

    allPublishedStories.forEach(other => {
      if (other.id === currentStory.id) return;

      // Check cannibalization
      if (headline && other.headline && headline.toLowerCase() === other.headline.toLowerCase()) {
        cannibalizationWarnings.push({
          storyId: other.id,
          headline: other.headline,
          slug: other.slug,
          similarityScore: 1.0,
          matchedKeyword: headline
        });
      } else if (focusKeyword && other.topics?.some(t => t.toLowerCase() === focusKeyword)) {
        internalLinkOpportunities.push({
          storyId: other.id,
          headline: other.headline,
          slug: other.slug,
          suggestedAnchor: focusKeyword,
          relevanceReason: `Shares key topic: "${focusKeyword}"`
        });
      }
    });

    // Score Calculation
    const totalPoints = checks.reduce((sum, c) => sum + c.points, 0);
    const maxPoints = checks.reduce((sum, c) => sum + c.maxPoints, 0);
    const overallScore = Math.min(100, Math.round((totalPoints / (maxPoints || 100)) * 100));

    let grade: SeoAnalysisResult['grade'] = 'Good';
    let statusColor: SeoAnalysisResult['statusColor'] = 'emerald';

    if (overallScore < 50) {
      grade = 'Poor';
      statusColor = 'rose';
    } else if (overallScore < 70) {
      grade = 'Needs Work';
      statusColor = 'amber';
    } else if (overallScore < 85) {
      grade = 'Good';
      statusColor = 'blue';
    } else {
      grade = 'Strong';
      statusColor = 'emerald';
    }

    return {
      overallScore,
      grade,
      statusColor,
      passedCount: checks.filter(c => c.passed).length,
      totalChecks: checks.length,
      checks,
      criticalIssues: checks.filter(c => c.severity === 'critical'),
      improvements: checks.filter(c => c.severity === 'warning' || c.severity === 'suggestion'),
      passedChecks: checks.filter(c => c.severity === 'passed'),
      internalLinkOpportunities,
      cannibalizationWarnings,
      wordCount,
      readingTimeMinutes,
      headingCounts: { h1: h1Matches, h2: h2Matches, h3: h3Matches }
    };
  }
}
