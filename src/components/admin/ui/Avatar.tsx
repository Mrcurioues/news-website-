import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  src?: string;
}

const SIZE_CLASSES: Record<AvatarSize, { container: string; text: string }> = {
  sm: { container: 'w-7 h-7', text: 'text-xs' },
  md: { container: 'w-9 h-9', text: 'text-sm' },
  lg: { container: 'w-12 h-12', text: 'text-base' },
};

/** Deterministic color palette derived from name hash */
const AVATAR_COLORS: string[] = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', src }) => {
  const sizeConfig = SIZE_CLASSES[size];
  const bgColor = getColorFromName(name);
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeConfig.container} rounded-full object-cover flex-shrink-0 ring-2 ring-white`}
      />
    );
  }

  return (
    <span
      className={`${sizeConfig.container} ${bgColor} ${sizeConfig.text} inline-flex items-center justify-center rounded-full font-semibold text-white flex-shrink-0 ring-2 ring-white select-none`}
      title={name}
      aria-label={name}
    >
      {initials}
    </span>
  );
};
