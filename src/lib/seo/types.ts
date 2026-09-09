// =====================================================
// TECHNICAL SEO ENGINE — TYPES & INTERFACES
// =====================================================

export type SeoSeverity = 'critical' | 'warning' | 'suggestion' | 'passed';

export interface SeoRuleCheck {
  id: string;
  category: 'technical' | 'content' | 'links' | 'images' | 'news_eeat';
  severity: SeoSeverity;
  points: number;
  maxPoints: number;
  message: string;
  recommendation?: string;
  passed: boolean;
}

export interface InternalLinkOpportunity {
  storyId: string;
  headline: string;
  slug: string;
  suggestedAnchor: string;
  relevanceReason: string;
}

export interface CannibalizationWarning {
  storyId: string;
  headline: string;
  slug: string;
  similarityScore: number;
  matchedKeyword: string;
}

export interface SeoAnalysisResult {
  overallScore: number; // 0 - 100
  grade: 'Poor' | 'Needs Work' | 'Good' | 'Strong';
  statusColor: 'rose' | 'amber' | 'blue' | 'emerald';
  passedCount: number;
  totalChecks: number;
  checks: SeoRuleCheck[];
  criticalIssues: SeoRuleCheck[];
  improvements: SeoRuleCheck[];
  passedChecks: SeoRuleCheck[];
  internalLinkOpportunities: InternalLinkOpportunity[];
  cannibalizationWarnings: CannibalizationWarning[];
  wordCount: number;
  readingTimeMinutes: number;
  headingCounts: { h1: number; h2: number; h3: number };
}

export interface AiSeoSuggestions {
  searchIntent?: string;
  missingSubtopics?: string[];
  titleSuggestions?: string[];
  metaDescriptionSuggestions?: string[];
  faqSuggestions?: { question: string; answer: string }[];
}
