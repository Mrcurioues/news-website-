import React from 'react';
import {
  Newspaper,
  Star,
  BookOpen,
  Camera,
  Video,
  Radio,
  List,
  MessageSquare,
} from 'lucide-react';

type StoryType =
  | 'news'
  | 'feature'
  | 'explainer'
  | 'photo_story'
  | 'video_story'
  | 'live_blog'
  | 'list'
  | 'opinion';

interface StoryTypeBadgeProps {
  type: StoryType;
  showLabel?: boolean;
}

interface TypeConfig {
  label: string;
  icon: React.ElementType;
  bg: string;
  text: string;
  pulse?: boolean;
}

const TYPE_CONFIG: Record<StoryType, TypeConfig> = {
  news: {
    label: 'News',
    icon: Newspaper,
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  feature: {
    label: 'Feature',
    icon: Star,
    bg: 'bg-purple-100',
    text: 'text-purple-700',
  },
  explainer: {
    label: 'Explainer',
    icon: BookOpen,
    bg: 'bg-teal-100',
    text: 'text-teal-700',
  },
  photo_story: {
    label: 'Photo Story',
    icon: Camera,
    bg: 'bg-orange-100',
    text: 'text-orange-700',
  },
  video_story: {
    label: 'Video',
    icon: Video,
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
  live_blog: {
    label: 'Live Blog',
    icon: Radio,
    bg: 'bg-red-100',
    text: 'text-red-700',
    pulse: true,
  },
  list: {
    label: 'List',
    icon: List,
    bg: 'bg-gray-100',
    text: 'text-gray-600',
  },
  opinion: {
    label: 'Opinion',
    icon: MessageSquare,
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
  },
};

export const StoryTypeBadge: React.FC<StoryTypeBadgeProps> = ({ type, showLabel = true }) => {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.news;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}
    >
      <Icon
        size={12}
        className={`flex-shrink-0 ${config.pulse ? 'animate-pulse' : ''}`}
      />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
