import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Share2, Check, Copy, MessageCircle, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ShareBarProps {
  title: string;
  url?: string;
  compact?: boolean;
}

export const ShareBar: React.FC<ShareBarProps> = ({ title, url, compact = false }) => {
  const { lang, t } = useRouter();
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://bharatsamacharlive.demo');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`${title} - ${t.appName} ${t.appNameSuffix}`);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openShare = (platformUrl: string) => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  return (
    <div className={`flex items-center gap-2 ${compact ? 'py-1' : 'py-3 border-y border-gray-200 my-4'}`}>
      {!compact && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mr-2">
          <Share2 className="w-4 h-4 text-rose-600" />
          <span>{lang === 'en' ? 'Share:' : 'शेयर करें:'}</span>
        </div>
      )}

      {/* WhatsApp */}
      <button
        type="button"
        onClick={() => openShare(shareLinks.whatsapp)}
        title={lang === 'en' ? 'Share on WhatsApp' : 'WhatsApp पर शेयर करें'}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      {/* X / Twitter */}
      <button
        type="button"
        onClick={() => openShare(shareLinks.twitter)}
        title={lang === 'en' ? 'Share on X' : 'X (Twitter) पर शेयर करें'}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-gray-800 transition-colors shadow-xs cursor-pointer"
        aria-label="Share on X"
      >
        <Twitter className="w-4 h-4" />
      </button>

      {/* Facebook */}
      <button
        type="button"
        onClick={() => openShare(shareLinks.facebook)}
        title={lang === 'en' ? 'Share on Facebook' : 'Facebook पर शेयर करें'}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onClick={() => openShare(shareLinks.linkedin)}
        title={lang === 'en' ? 'Share on LinkedIn' : 'LinkedIn पर शेयर करें'}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-xs cursor-pointer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        title={lang === 'en' ? 'Copy link to clipboard' : 'लिंक कॉपी करें'}
        className={`flex items-center gap-1 px-2.5 h-8 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
          copied ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'en' ? 'Copied!' : 'कॉपी हो गया'}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-gray-500" />
            <span>{lang === 'en' ? 'Copy Link' : 'लिंक'}</span>
          </>
        )}
      </button>
    </div>
  );
};
