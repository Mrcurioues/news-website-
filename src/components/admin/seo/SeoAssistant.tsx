import React, { useState, useEffect } from 'react';
import {
  Sparkles, CheckCircle2, AlertTriangle, AlertCircle, Info,
  Link, Copy, Check, Eye, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Story } from '../../../types/admin';
import { SeoAnalyzer } from '../../../lib/seo/rules';
import { SeoAnalysisResult, SeoRuleCheck } from '../../../lib/seo/types';
import { SerpPreview } from './SerpPreview';

interface SeoAssistantProps {
  story: Partial<Story>;
  allStories?: Story[];
  onUpdateField: (field: keyof Story, value: any) => void;
}

export const SeoAssistant: React.FC<SeoAssistantProps> = ({
  story,
  allStories = [],
  onUpdateField
}) => {
  const [analysis, setAnalysis] = useState<SeoAnalysisResult>(() =>
    SeoAnalyzer.analyzeStory(story, allStories)
  );
  const [showSerpPreview, setShowSerpPreview] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Debounced live analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = SeoAnalyzer.analyzeStory(story, allStories);
      setAnalysis(result);
    }, 300);
    return () => clearTimeout(timer);
  }, [
    story.headline,
    story.summary,
    story.body,
    story.slug,
    story.mainImage,
    story.mainImageAlt,
    story.byline,
    story.topics,
    allStories
  ]);

  const handleCopyLink = (slug: string) => {
    const url = `https://bharatnews.in/news/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(slug);
    toast.success('Internal link copied!');
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-6 shadow-sm text-left">
      {/* Header & Overall Score */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            SEO Assistant & Guidance
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">Real-time non-technical search optimization guidance</p>
        </div>
        <div className="text-right">
          <div className={`text-lg font-black ${
            analysis.overallScore >= 85 ? 'text-emerald-600' :
            analysis.overallScore >= 70 ? 'text-blue-600' :
            analysis.overallScore >= 50 ? 'text-amber-600' : 'text-rose-600'
          }`}>
            {analysis.overallScore} / 100
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
            analysis.overallScore >= 85 ? 'bg-emerald-100 text-emerald-800' :
            analysis.overallScore >= 70 ? 'bg-blue-100 text-blue-800' :
            analysis.overallScore >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {analysis.grade}
          </span>
        </div>
      </div>

      {/* Focus Keyword & Metadata Quick Inputs */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            Focus Keyword / Primary Topic
          </label>
          <input
            type="text"
            placeholder="e.g. Mamata Banerjee, Kolkata Election..."
            value={story.topics?.[0] || ''}
            onChange={e => onUpdateField('topics', [e.target.value, ...(story.topics || []).slice(1)])}
            className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            SEO Title ({story.headline?.length || 0} chars)
          </label>
          <input
            type="text"
            placeholder="Optimized headline for search..."
            value={story.seoTitle || story.headline || ''}
            onChange={e => onUpdateField('seoTitle', e.target.value)}
            className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1 flex items-center justify-between">
            <span>URL Slug</span>
            <button
              type="button"
              onClick={() => {
                const autoSlug = (story.headline || 'news-story').toLowerCase().trim().replace(/[^a-z0-9\u0900-\u097F\u0980-\u09FF]+/g, '-').replace(/(^-|-$)/g, '');
                onUpdateField('slug', autoSlug);
                toast.success('Auto-generated clean URL slug!');
              }}
              className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              ⚡ Auto-Generate
            </button>
          </label>
          <input
            type="text"
            placeholder="e.g. kolkata-election-updates..."
            value={story.slug || ''}
            onChange={e => onUpdateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9\u0900-\u097F\u0980-\u09FF-]/g, '-'))}
            className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 bg-gray-50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            Meta Description ({story.summary?.length || 0} chars)
          </label>
          <textarea
            rows={2}
            placeholder="120-160 character story summary..."
            value={story.seoDescription || story.summary || ''}
            onChange={e => onUpdateField('seoDescription', e.target.value)}
            className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 bg-gray-50 resize-none"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowSerpPreview(!showSerpPreview)}
          className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer pt-1"
        >
          <Eye className="w-3.5 h-3.5" />
          {showSerpPreview ? 'Hide Google Preview' : 'Show Google Snippet Preview'}
        </button>

        {showSerpPreview && (
          <div className="pt-2">
            <SerpPreview
              title={story.seoTitle || story.headline || ''}
              description={story.seoDescription || story.summary || ''}
              slug={story.slug || ''}
              categorySlug={story.section}
              coverImage={story.mainImage}
            />
          </div>
        )}
      </div>

      {/* Cannibalization Warning */}
      {analysis.cannibalizationWarnings.length > 0 && (
        <div className="border border-rose-200 bg-rose-50/70 p-3 rounded-lg text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-rose-800 font-bold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Possible Topic Cannibalization</span>
          </div>
          <p className="text-rose-700">
            Another article already shares an identical title:
          </p>
          {analysis.cannibalizationWarnings.map(w => (
            <div key={w.storyId} className="font-semibold text-rose-900 bg-white/60 p-1.5 rounded border border-rose-200 mt-1">
              "{w.headline}"
            </div>
          ))}
        </div>
      )}

      {/* Critical Issues */}
      {analysis.criticalIssues.length > 0 && (
        <div className="space-y-2 border-t pt-4">
          <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            Critical Action Items ({analysis.criticalIssues.length})
          </h4>
          <div className="space-y-2">
            {analysis.criticalIssues.map(issue => (
              <div key={issue.id} className="bg-rose-50 border border-rose-100 p-2.5 rounded-lg text-xs space-y-0.5">
                <div className="font-semibold text-rose-900">{issue.message}</div>
                {issue.recommendation && <div className="text-rose-700 text-[11px]">{issue.recommendation}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Improvements */}
      {analysis.improvements.length > 0 && (
        <div className="space-y-2 border-t pt-4">
          <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Suggested Improvements ({analysis.improvements.length})
          </h4>
          <div className="space-y-2">
            {analysis.improvements.map(imp => (
              <div key={imp.id} className="bg-amber-50 border border-amber-100 p-2.5 rounded-lg text-xs space-y-0.5">
                <div className="font-semibold text-amber-900">{imp.message}</div>
                {imp.recommendation && <div className="text-amber-700 text-[11px]">{imp.recommendation}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Passed Checks */}
      {analysis.passedChecks.length > 0 && (
        <div className="space-y-2 border-t pt-4">
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Passed Guidance Checks ({analysis.passedChecks.length})
          </h4>
          <div className="space-y-1">
            {analysis.passedChecks.map(pass => (
              <div key={pass.id} className="flex items-center gap-2 text-xs text-gray-700">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{pass.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internal Link Opportunities */}
      {analysis.internalLinkOpportunities.length > 0 && (
        <div className="space-y-2 border-t pt-4">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Link className="w-4 h-4 text-blue-600" />
            Suggested Internal Links
          </h4>
          <div className="space-y-1.5">
            {analysis.internalLinkOpportunities.slice(0, 3).map(link => (
              <div key={link.storyId} className="bg-gray-50 border border-gray-200 p-2 rounded-lg text-xs flex items-center justify-between gap-2">
                <div className="truncate">
                  <div className="font-medium text-gray-900 truncate">{link.headline}</div>
                  <div className="text-[10px] text-gray-500">Anchor: "{link.suggestedAnchor}"</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyLink(link.slug)}
                  className="px-2 py-1 bg-white border border-gray-300 rounded text-[11px] font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1 shrink-0"
                >
                  {copiedLink === link.slug ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-500" />}
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
