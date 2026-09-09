import React from 'react';
import { Globe, Search, Share2 } from 'lucide-react';

interface SerpPreviewProps {
  title: string;
  description: string;
  slug: string;
  categorySlug?: string;
  coverImage?: string;
  domain?: string;
}

export const SerpPreview: React.FC<SerpPreviewProps> = ({
  title,
  description,
  slug,
  categorySlug = 'news',
  coverImage,
  domain = 'bharatnews.in'
}) => {
  const cleanTitle = title || 'Article Headline Preview - Bharat News';
  const cleanDesc = description || 'Meta description summary will appear here for search engine snippet preview.';
  const cleanSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9-]/g, '') : 'sample-news-story-slug';
  const displayUrl = `https://${domain} › ${categorySlug} › ${cleanSlug}`;

  return (
    <div className="space-y-4 text-left">
      {/* Google Search Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">{displayUrl}</span>
        </div>
        <h4 className="text-base text-blue-800 font-medium hover:underline leading-snug cursor-pointer line-clamp-2">
          {cleanTitle}
        </h4>
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
          {cleanDesc}
        </p>
      </div>

      {/* Social Preview */}
      {coverImage && (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs max-w-sm">
          <img src={coverImage} alt="Social Card Preview" className="w-full h-36 object-cover" />
          <div className="p-3 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{domain.toUpperCase()}</span>
            <h5 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">{cleanTitle}</h5>
            <p className="text-[11px] text-gray-500 line-clamp-2">{cleanDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
};
