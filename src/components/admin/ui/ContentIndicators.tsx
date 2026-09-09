import React from 'react';

export const BreakingIndicator: React.FC = () => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wide animate-pulse">
    <span>🔥</span>
    <span>Breaking</span>
  </span>
);

export const FeaturedIndicator: React.FC = () => (
  <span
    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-100 text-yellow-500"
    title="Featured"
    aria-label="Featured"
  >
    <span className="text-xs leading-none">⭐</span>
  </span>
);

export const TrendingIndicator: React.FC = () => (
  <span
    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600"
    title="Trending"
    aria-label="Trending"
  >
    <span className="text-xs leading-none">📈</span>
  </span>
);

export const PremiumIndicator: React.FC = () => (
  <span
    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-gray-600"
    title="Premium"
    aria-label="Premium"
  >
    <span className="text-xs leading-none">🔒</span>
  </span>
);

interface ScheduledIndicatorProps {
  time: string;
}

export const ScheduledIndicator: React.FC<ScheduledIndicatorProps> = ({ time }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
    <span>⏰</span>
    <span>{time}</span>
  </span>
);
