import React from 'react';
import { useLiveTranslation } from '../hooks/useLiveTranslation';
import { Languages, Loader2 } from 'lucide-react';

interface LiveBengaliTranslationProps {
  text: string;
  className?: string;
  onTranslationChange?: (translatedText: string) => void;
}

export const LiveBengaliTranslation: React.FC<LiveBengaliTranslationProps> = ({
  text,
  className = '',
  onTranslationChange,
}) => {
  const { translatedText, isLoading } = useLiveTranslation(text, 350);

  React.useEffect(() => {
    if (onTranslationChange && translatedText) {
      onTranslationChange(translatedText);
    }
  }, [translatedText, onTranslationChange]);

  if (!text || !text.trim()) {
    return null;
  }

  return (
    <div
      className={`mt-2 p-3 bg-gradient-to-r from-rose-50/90 to-amber-50/80 border border-rose-200/90 rounded-xl flex items-start gap-2.5 transition-all text-xs text-rose-950 font-sans shadow-2xs ${className}`}
    >
      <div className="p-1 bg-rose-100/80 rounded-lg text-rose-600 shrink-0 mt-0.5">
        <Languages className="w-3.5 h-3.5 text-rose-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700/90">
            বাংলা (Bengali Translation)
          </span>
          {isLoading && (
            <span className="flex items-center gap-1 text-[10px] text-rose-500 font-medium animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" /> Live translating...
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-rose-950 leading-snug font-serif break-words">
          {translatedText || (isLoading ? 'অনুবাদ করা হচ্ছে...' : '')}
        </p>
      </div>
    </div>
  );
};
