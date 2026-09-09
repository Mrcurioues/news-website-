import React from 'react';

type StoryStatus =
  | 'idea'
  | 'draft'
  | 'in_review'
  | 'changes_requested'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'archived'
  | 'trash'
  | 'breaking';

interface StatusBadgeProps {
  status: StoryStatus;
  size?: 'sm' | 'md';
}

interface StatusConfig {
  label: string;
  bg: string;
  text: string;
  dot: string;
  pulse?: boolean;
}

const STATUS_CONFIG: Record<StoryStatus, StatusConfig> = {
  idea: {
    label: 'Idea',
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
  },
  draft: {
    label: 'Draft',
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
  },
  in_review: {
    label: 'In Review',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  changes_requested: {
    label: 'Changes Requested',
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  approved: {
    label: 'Approved',
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  scheduled: {
    label: 'Scheduled',
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    dot: 'bg-purple-500',
  },
  published: {
    label: 'Published',
    bg: 'bg-green-700',
    text: 'text-white',
    dot: 'bg-white',
  },
  breaking: {
    label: 'Breaking',
    bg: 'bg-red-600',
    text: 'text-white',
    dot: 'bg-white',
    pulse: true,
  },
  archived: {
    label: 'Archived',
    bg: 'bg-gray-200',
    text: 'text-gray-500',
    dot: 'bg-gray-400',
  },
  trash: {
    label: 'Trash',
    bg: 'bg-red-100',
    text: 'text-red-500',
    dot: 'bg-red-400',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs gap-1'
    : 'px-2.5 py-1 text-sm gap-1.5';

  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${config.bg} ${config.text}`}
    >
      <span
        className={`rounded-full flex-shrink-0 ${dotSize} ${config.dot} ${config.pulse ? 'animate-pulse' : ''}`}
      />
      {config.label}
    </span>
  );
};
