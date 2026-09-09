import React from 'react';
import { useRouter } from '../context/RouterContext';
import { usePluginsStore } from '../stores/pluginsStore';

interface AdSlotProps {
  format?: 'leaderboard' | 'medium-rectangle' | 'half-page' | 'in-feed' | 'mobile-banner' | 'square';
  className?: string;
  slotName?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  format = 'leaderboard',
  className = '',
  slotName
}) => {
  const { lang, t } = useRouter();
  const { plugins } = usePluginsStore();

  const adPlugin = plugins.find((p) => p.id === 'adsense-banner-manager');
  const isAdsActive = adPlugin?.isInstalled && adPlugin?.isActive;

  if (!isAdsActive) {
    return null;
  }

  const getDimensionsAndClasses = () => {
    switch (format) {
      case 'leaderboard':
        return {
          dims: '728 × 90',
          containerClass: 'min-h-[90px] w-full max-w-[728px] mx-auto py-2'
        };
      case 'square':
      case 'medium-rectangle':
        return {
          dims: '300 × 250',
          containerClass: 'min-h-[250px] w-full max-w-[300px] mx-auto my-3'
        };
      case 'half-page':
        return {
          dims: '300 × 600',
          containerClass: 'min-h-[500px] w-full max-w-[300px] mx-auto my-3'
        };
      case 'mobile-banner':
        return {
          dims: '320 × 50',
          containerClass: 'min-h-[50px] w-full max-w-[320px] mx-auto my-2'
        };
      case 'in-feed':
      default:
        return {
          dims: 'Responsive In-Feed Banner',
          containerClass: 'min-h-[100px] w-full my-4'
        };
    }
  };

  const { dims, containerClass } = getDimensionsAndClasses();
  const defaultSlotName = lang === 'en' ? 'Sponsored News Partner' : 'प्रमुख प्रायोजक विज्ञापन';
  const resolvedSlotName = slotName || defaultSlotName;

  return (
    <div id={`ad-slot-${format}`} className={`flex flex-col items-center justify-center my-4 ${containerClass} ${className}`}>
      <div className="w-full text-[10px] text-gray-500 uppercase tracking-widest text-center mb-1 flex items-center justify-center gap-2">
        <span className="h-[1px] w-8 bg-gray-300"></span>
        <span>{lang === 'en' ? 'ADVERTISEMENT (ADSENSE PLUGIN ACTIVE)' : 'विज्ञापन (ऐडसेंस प्लगइन सक्रिय)'}</span>
        <span className="h-[1px] w-8 bg-gray-300"></span>
      </div>
      <div className="w-full h-full border border-dashed border-rose-300 bg-gradient-to-r from-rose-50/50 via-slate-50 to-rose-50/50 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{resolvedSlotName}</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-rose-100 text-rose-800 font-bold rounded">AdSense Slot ({dims})</span>
        </div>
        <p className="text-[11px] text-gray-500">
          {lang === 'en'
            ? 'AdSense Plugin Active — Publisher ID: ' + (adPlugin?.settings?.clientAdSenseId || 'ca-pub-9988776655443322')
            : 'ऐडसेंस प्लगइन सक्रिय — प्रकाशक आई डी: ' + (adPlugin?.settings?.clientAdSenseId || 'ca-pub-9988776655443322')}
        </p>
      </div>
    </div>
  );
};
