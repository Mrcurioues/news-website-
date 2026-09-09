import { Article, SeoAuditReport, SeoCheckItem } from '../types';

/**
 * Calculates syllable count for Flesch Reading Ease (English + Hindi transliteration approximation)
 */
function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 1;
  if (clean.length <= 3) return 1;

  const matches = clean.match(/[aeiouy]{1,2}/g);
  let count = matches ? matches.length : 1;
  if (clean.endsWith('e') && !clean.endsWith('le') && count > 1) {
    count--;
  }
  return Math.max(1, count);
}

/**
 * Flesch Reading Ease Formula:
 * 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
 */
export function calculateFleschReadingEase(text: string): { score: number; grade: string } {
  if (!text || text.trim().length === 0) {
    return { score: 65, grade: 'सामान्य (Standard 60-70)' };
  }

  // Count sentences
  const sentences = text.split(/[.!?।\n]+/).filter(s => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);

  // Count words
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = Math.max(1, words.length);

  // Approximate syllables
  let syllableCount = 0;
  for (const word of words) {
    syllableCount += countSyllables(word);
  }

  const asw = syllableCount / wordCount;
  const asl = wordCount / sentenceCount;
  let score = Math.round(206.835 - (1.015 * asl) - (84.6 * asw));

  // Cap between 0 and 100
  score = Math.max(0, Math.min(100, score));

  let grade = 'सामान्य (Standard)';
  if (score >= 90) grade = 'अति सरल (Very Easy 90-100)';
  else if (score >= 80) grade = 'सरल (Easy 80-89)';
  else if (score >= 70) grade = 'काफी आसान (Fairly Easy 70-79)';
  else if (score >= 60) grade = 'मानक / सामान्य (Standard 60-69)';
  else if (score >= 50) grade = 'मध्यम कठिन (Fairly Difficult 50-59)';
  else if (score >= 30) grade = 'कठिन (Difficult 30-49)';
  else grade = 'अत्यंत जटिल (Very Confusing <30)';

  return { score, grade };
}

/**
 * Generates an SEO friendly slug
 */
export function generateSeoSlug(text: string): string {
  if (!text) return 'untitled-article';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60) || 'article-' + Date.now().toString().slice(-5);
}

/**
 * Extracts and inspects heading hierarchy from body paragraphs or markdown
 */
export function analyzeHeadingHierarchy(body: string[]): {
  headingCounts: { h1: number; h2: number; h3: number; h4: number };
  isOrderedCorrectly: boolean;
  issues: string[];
} {
  const headingCounts = { h1: 0, h2: 0, h3: 0, h4: 0 };
  const issues: string[] = [];
  const sequence: number[] = [];

  body.forEach(para => {
    const trimmed = para.trim();
    if (trimmed.startsWith('### ')) {
      headingCounts.h3++;
      sequence.push(3);
    } else if (trimmed.startsWith('## ')) {
      headingCounts.h2++;
      sequence.push(2);
    } else if (trimmed.startsWith('# ')) {
      headingCounts.h1++;
      sequence.push(1);
    }
  });

  // Check sequence: No H3 without prior H2
  let sawH2 = false;
  let isOrderedCorrectly = true;

  for (const level of sequence) {
    if (level === 2) sawH2 = true;
    if (level === 3 && !sawH2) {
      isOrderedCorrectly = false;
      issues.push('H3 हेडिंग से पहले H2 हेडिंग का उपयोग आवश्यक है (WordPress SEO मानक)।');
      break;
    }
  }

  if (headingCounts.h1 > 1) {
    issues.push('आर्टिकल बॉडी में एकाधिक H1 हेडिंग्स हैं। WordPress में H1 केवल मुख्य शीर्षक के लिए होना चाहिए।');
  }

  return { headingCounts, isOrderedCorrectly, issues };
}

/**
 * Calculates keyword density in content
 */
export function calculateKeywordDensity(keyword: string, content: string): number {
  if (!keyword || !content) return 0;
  const cleanKw = keyword.trim().toLowerCase();
  const cleanContent = content.toLowerCase();
  const words = cleanContent.split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return 0;

  // Count occurrences of keyword phrase
  const escaped = cleanKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'gi');
  const matches = cleanContent.match(regex);
  const count = matches ? matches.length : 0;

  const kwWords = cleanKw.split(/\s+/).length;
  const density = ((count * kwWords) / words.length) * 100;
  return parseFloat(density.toFixed(2));
}

/**
 * Detects duplicate phrases and repetitive sentences
 */
export function detectDuplicateContent(paragraphs: string[]): string[] {
  const seen = new Map<string, number>();
  const duplicates: string[] = [];

  paragraphs.forEach(para => {
    const sentences = para.split(/[.!?।\n]+/).map(s => s.trim().toLowerCase()).filter(s => s.length > 20);
    sentences.forEach(s => {
      const count = seen.get(s) || 0;
      seen.set(s, count + 1);
      if (count === 1) {
        duplicates.push(s);
      }
    });
  });

  return duplicates;
}

/**
 * Performs full Rank Math / Yoast SEO & Readability Audit on an article
 */
export function performSeoAudit(article: Partial<Article>): SeoAuditReport {
  const checks: SeoCheckItem[] = [];
  const focusKeyword = (article.focusKeyword || '').trim().toLowerCase();
  const title = (article.title || '').trim();
  const metaTitle = (article.metaTitle || title).trim();
  const metaDescription = (article.metaDescription || article.excerpt || '').trim();
  const slug = (article.slug || '').trim().toLowerCase();
  const bodyText = (article.body || []).join('\n\n');
  const fullContent = `${title}\n${metaDescription}\n${bodyText}`;
  const firstParagraph = (article.body && article.body[0]) ? article.body[0].toLowerCase() : '';
  const altText = (article.imageAltText || article.imageCaption || '').toLowerCase();

  // Words count
  const allWords = fullContent.split(/\s+/).filter(w => w.length > 0);
  const wordCount = allWords.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  // 1. Focus Keyword Provided
  const hasKeyword = focusKeyword.length > 1;
  checks.push({
    id: 'focus_keyword_present',
    title: 'Focus Keyword Defined',
    titleHi: 'फोकस कीवर्ड निर्धारित है',
    passed: hasKeyword,
    score: hasKeyword ? 10 : 0,
    maxScore: 10,
    recommendation: hasKeyword ? `Focus keyword "${focusKeyword}" is configured.` : 'Set a target focus keyword for Rank Math & Yoast scoring.',
    recommendationHi: hasKeyword ? `फोकस कीवर्ड "${focusKeyword}" सेट है।` : 'कृपया एक मुख्य फोकस कीवर्ड (Focus Keyword) दर्ज करें।',
    type: 'seo'
  });

  // 2. Focus Keyword in SEO Title
  const keywordInTitle = hasKeyword && metaTitle.toLowerCase().includes(focusKeyword);
  checks.push({
    id: 'keyword_in_title',
    title: 'Focus Keyword in SEO Title',
    titleHi: 'SEO शीर्षक में फोकस कीवर्ड',
    passed: keywordInTitle,
    score: keywordInTitle ? 10 : 0,
    maxScore: 10,
    recommendation: keywordInTitle ? 'Keyword appears prominently in the SEO title.' : 'Include your focus keyword near the beginning of the title.',
    recommendationHi: keywordInTitle ? 'शीर्षक में फोकस कीवर्ड शामिल है।' : 'SEO शीर्षक में शुरुआत में मुख्य कीवर्ड अवश्य जोड़ें।',
    type: 'seo'
  });

  // 3. SEO Title Length (50-60 characters ideal)
  const titleLength = metaTitle.length;
  const titleLengthGood = titleLength >= 40 && titleLength <= 70;
  checks.push({
    id: 'title_length',
    title: 'SEO Title Length (50-60 chars)',
    titleHi: 'SEO शीर्षक की लंबाई (40-70 अक्षर)',
    passed: titleLengthGood,
    score: titleLengthGood ? 8 : (titleLength > 0 ? 4 : 0),
    maxScore: 8,
    recommendation: titleLengthGood ? `Title is ${titleLength} characters (optimal).` : `Title length is ${titleLength} chars. Recommended: 50-65 chars for Google SERP.`,
    recommendationHi: titleLengthGood ? `शीर्षक ${titleLength} अक्षर का है (सर्वोत्तम)।` : `शीर्षक ${titleLength} अक्षर का है। Google सर्च के लिए 50-65 अक्षर उत्तम हैं।`,
    type: 'seo'
  });

  // 4. Focus Keyword in Meta Description
  const keywordInMeta = hasKeyword && metaDescription.toLowerCase().includes(focusKeyword);
  checks.push({
    id: 'keyword_in_meta',
    title: 'Focus Keyword in Meta Description',
    titleHi: 'मेटा विवरण में फोकस कीवर्ड',
    passed: keywordInMeta,
    score: keywordInMeta ? 10 : 0,
    maxScore: 10,
    recommendation: keywordInMeta ? 'Keyword found in meta description.' : 'Add your focus keyword to the meta description for higher CTR.',
    recommendationHi: keywordInMeta ? 'मेटा डिस्क्रिप्शन में फोकस कीवर्ड मौजूद है।' : 'मेटा विवरण में फोकस कीवर्ड जोड़ें जिससे सर्च रिजल्ट्स में बोल्ड दिखे।',
    type: 'seo'
  });

  // 5. Meta Description Length (140-160 characters ideal)
  const metaLength = metaDescription.length;
  const metaLengthGood = metaLength >= 120 && metaLength <= 165;
  checks.push({
    id: 'meta_length',
    title: 'Meta Description Length (150-160 chars)',
    titleHi: 'मेटा विवरण लंबाई (150-160 अक्षर)',
    passed: metaLengthGood,
    score: metaLengthGood ? 8 : (metaLength > 50 ? 4 : 0),
    maxScore: 8,
    recommendation: metaLengthGood ? `Meta description is ${metaLength} characters (ideal snippet length).` : `Current length: ${metaLength} chars. Ideal length: 150-160 characters.`,
    recommendationHi: metaLengthGood ? `मेटा विवरण ${metaLength} अक्षरों का है (परफेक्ट स्निपेट)।` : `वर्तमान लंबाई: ${metaLength} अक्षर। 150-160 अक्षर सर्वाधिक अनुकूल माने जाते हैं।`,
    type: 'seo'
  });

  // 6. Focus Keyword in URL Slug
  const keywordInSlug = hasKeyword && slug.includes(focusKeyword.replace(/\s+/g, '-'));
  checks.push({
    id: 'keyword_in_slug',
    title: 'Focus Keyword in URL Slug',
    titleHi: 'URL स्लग में फोकस कीवर्ड',
    passed: keywordInSlug,
    score: keywordInSlug ? 8 : 0,
    maxScore: 8,
    recommendation: keywordInSlug ? 'URL permalink contains focus keyword.' : 'Include focus keyword in the WordPress post slug.',
    recommendationHi: keywordInSlug ? 'URL स्लग में कीवर्ड मौजूद है।' : 'WordPress परमालिंक स्लग में मुख्य कीवर्ड जोड़ें।',
    type: 'seo'
  });

  // 7. Focus Keyword in First 10% / Introduction
  const keywordInFirstPara = hasKeyword && firstParagraph.includes(focusKeyword);
  checks.push({
    id: 'keyword_in_first_paragraph',
    title: 'Focus Keyword in Introduction',
    titleHi: 'प्रथम अनुच्छेद (Intro) में कीवर्ड',
    passed: keywordInFirstPara,
    score: keywordInFirstPara ? 8 : 0,
    maxScore: 8,
    recommendation: keywordInFirstPara ? 'Keyword appears in the opening paragraph.' : 'Mention focus keyword within the first 100 words of the article.',
    recommendationHi: keywordInFirstPara ? 'शुरुआती अनुच्छेद में कीवर्ड मौजूद है।' : 'आर्टिकल के पहले 100 शब्दों में मुख्य कीवर्ड अवश्य लाएं।',
    type: 'seo'
  });

  // 8. Content Length (Recommended 600+ words)
  const isContentLongEnough = wordCount >= 300;
  const isOptimalLength = wordCount >= 600;
  checks.push({
    id: 'content_length',
    title: 'Content Word Count',
    titleHi: 'शब्द संख्या (Content Length)',
    passed: isContentLongEnough,
    score: isOptimalLength ? 10 : (isContentLongEnough ? 6 : 2),
    maxScore: 10,
    recommendation: isOptimalLength ? `Excellent length: ${wordCount} words.` : `Word count is ${wordCount}. Minimum 300 words required, 600+ words recommended.`,
    recommendationHi: isOptimalLength ? `उत्कृष्ट लंबाई: ${wordCount} शब्द।` : `कुल शब्द: ${wordCount}। न्यूनतम 300 शब्द और 600+ शब्द श्रेष्ठ रैंकिंग देते हैं।`,
    type: 'seo'
  });

  // 9. Keyword Density (1.0% - 2.5% ideal)
  const density = calculateKeywordDensity(focusKeyword, bodyText);
  const densityGood = hasKeyword && density >= 0.8 && density <= 2.8;
  checks.push({
    id: 'keyword_density',
    title: 'Keyword Density (1.0% - 2.5%)',
    titleHi: 'कीवर्ड डेंसिटी (1% - 2.5%)',
    passed: densityGood,
    score: densityGood ? 8 : (density > 0 && density < 4 ? 4 : 1),
    maxScore: 8,
    recommendation: densityGood ? `Keyword density is optimal at ${density}%.` : `Current density: ${density}%. Avoid keyword stuffing (keep between 1% and 2.5%).`,
    recommendationHi: densityGood ? `कीवर्ड डेंसिटी बिल्कुल सटीक ${density}% है।` : `वर्तमान डेंसिटी: ${density}%। ओवर-स्टफिंग से बचें (1% से 2.5% उत्तम है)।`,
    type: 'seo'
  });

  // 10. Featured Image & Alt Text
  const hasImage = !!article.coverImage;
  const altTextHasKeyword = hasKeyword && altText.includes(focusKeyword);
  checks.push({
    id: 'image_alt_text',
    title: 'Image Alt Text with Keyword',
    titleHi: 'इमेज ऑल्ट टेक्स्ट (Alt Text) में कीवर्ड',
    passed: hasImage && (altTextHasKeyword || altText.length > 5),
    score: altTextHasKeyword ? 8 : (hasImage && altText.length > 5 ? 5 : 2),
    maxScore: 8,
    recommendation: altTextHasKeyword ? 'Image Alt text contains focus keyword.' : 'Add descriptive Alt text containing your focus keyword for accessibility and image SEO.',
    recommendationHi: altTextHasKeyword ? 'इमेज ऑल्ट टेक्स्ट में कीवर्ड मौजूद है।' : 'फीचर्ड इमेज में डिस्क्रिप्टिव Alt Text और कीवर्ड जोड़ें।',
    type: 'seo'
  });

  // 11. Heading Hierarchy Analysis (H1, H2, H3)
  const { headingCounts, isOrderedCorrectly, issues } = analyzeHeadingHierarchy(article.body || []);
  const hasSubheadings = headingCounts.h2 > 0 || headingCounts.h3 > 0;
  checks.push({
    id: 'heading_hierarchy',
    title: 'WordPress Heading Hierarchy (H2, H3)',
    titleHi: 'हेडिंग्स पदानुक्रम (H2, H3 सब-हेडिंग्स)',
    passed: hasSubheadings && isOrderedCorrectly,
    score: hasSubheadings && isOrderedCorrectly ? 10 : (hasSubheadings ? 5 : 2),
    maxScore: 10,
    recommendation: hasSubheadings && isOrderedCorrectly
      ? `Found ${headingCounts.h2} H2s and ${headingCounts.h3} H3s in proper structure.`
      : issues[0] || 'Break your article into logical sections using H2 and H3 subheadings.',
    recommendationHi: hasSubheadings && isOrderedCorrectly
      ? `उचित हेडिंग स्ट्रक्चर: ${headingCounts.h2} H2 और ${headingCounts.h3} H3 मौजूद हैं।`
      : issues[0] || 'आर्टिकल को H2 और H3 सब-हेडिंग्स में विभाजित करें।',
    type: 'headings'
  });

  // 12. Readability / Flesch Reading Ease
  const { score: fleschScore, grade: fleschGrade } = calculateFleschReadingEase(bodyText);
  const fleschGood = fleschScore >= 55;
  checks.push({
    id: 'flesch_reading_ease',
    title: 'Flesch Readability Score',
    titleHi: 'फ्लेश पठनीयता स्कोर (Flesch Readability)',
    passed: fleschGood,
    score: fleschGood ? 10 : 5,
    maxScore: 10,
    recommendation: `Score: ${fleschScore}/100 (${fleschGrade}). Aim for 60+ for broad public readability.`,
    recommendationHi: `स्कोर: ${fleschScore}/100 (${fleschGrade})। सामान्य पाठकों के लिए 60+ उत्तम माना जाता है।`,
    type: 'readability'
  });

  // Calculate Overall Score (Sum of scores / sum of maxScores * 100)
  const totalScore = checks.reduce((acc, c) => acc + c.score, 0);
  const maxPossible = checks.reduce((acc, c) => acc + c.maxScore, 0);
  const overallScore = Math.round((totalScore / maxPossible) * 100);

  let grade: 'excellent' | 'good' | 'needs-work' | 'poor' = 'poor';
  if (overallScore >= 80) grade = 'excellent';
  else if (overallScore >= 65) grade = 'good';
  else if (overallScore >= 50) grade = 'needs-work';

  const passedCount = checks.filter(c => c.passed).length;

  // Suggestions & Link Opportunities
  const suggestions: string[] = [];
  const suggestionsHi: string[] = [];

  if (!keywordInTitle) {
    suggestions.push(`Include "${focusKeyword}" in the SEO Title.`);
    suggestionsHi.push(`SEO शीर्षक में मुख्य कीवर्ड "${focusKeyword}" शामिल करें।`);
  }
  if (!keywordInMeta) {
    suggestions.push(`Add "${focusKeyword}" to your 150-character Meta Description.`);
    suggestionsHi.push(`150-160 अक्षरों के मेटा विवरण में "${focusKeyword}" जोड़ें।`);
  }
  if (wordCount < 500) {
    suggestions.push(`Expand content length from ${wordCount} to 600+ words with practical details.`);
    suggestionsHi.push(`सामग्री की लंबाई ${wordCount} शब्दों से बढ़ाकर 600+ शब्द करें।`);
  }
  if (!hasSubheadings) {
    suggestions.push('Add H2 and H3 subheadings every 200-300 words to improve scannability.');
    suggestionsHi.push('हर 200-300 शब्दों के बाद H2 या H3 सब-हेडिंग जोड़ें।');
  }

  const internalLinkOpportunities = [
    'मुख्य समाचार (Top News Archive) -> /category/national',
    'संपादकीय विश्लेषण (Editorial Desk) -> /category/politics',
    'संबंधित ट्रेंडिंग स्टोरीज़ (Trending Section) -> /'
  ];

  const externalLinkOpportunities = [
    'सरकारी गजट / आधिकारिक प्रेस विज्ञप्ति (Official Gazette/PIB)',
    'संबंधित अध्ययन या विकिपीडिया संदर्भ (Authoritative Domain Reference)'
  ];

  return {
    overallScore,
    grade,
    passedCount,
    totalChecks: checks.length,
    checks,
    fleschReadingEase: fleschScore,
    fleschGrade,
    wordCount,
    readingTimeMinutes,
    keywordDensity: density,
    headingCounts,
    suggestions,
    suggestionsHi,
    internalLinkOpportunities,
    externalLinkOpportunities
  };
}
