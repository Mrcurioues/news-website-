import React, { useState } from 'react';
import {
  LayoutTemplate, FileText, Image, Users, BarChart2,
  Settings, Globe, MessageSquare, ChevronDown, ChevronRight,
  Radio, Clock, CheckCircle, TrendingUp, Star, Trash2, Edit3, Mail, Bell, Puzzle, Terminal
} from 'lucide-react';
import { useStoriesStore } from '../../../stores/storiesStore';
import { useCommentsStore } from '../../../stores/commentsStore';
import { useSiteConfigStore } from '../../../stores/siteConfigStore';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string | number;
  badgeColor?: string;
  adminOnly?: boolean;
  children?: NavItem[];
}

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  userRole?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate, userRole = 'admin' }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['stories']));
  const { stories } = useStoriesStore();
  const { comments } = useCommentsStore();
  const { config } = useSiteConfigStore();

  const counts = {
    drafts: stories.filter(s => s.status === 'draft').length,
    inReview: stories.filter(s => s.status === 'in_review').length,
    scheduled: stories.filter(s => s.status === 'scheduled').length,
    published: stories.filter(s => s.status === 'published').length,
    trending: stories.filter(s => s.isTrending).length,
    breaking: stories.filter(s => s.isBreaking).length,
    featured: stories.filter(s => s.isFeatured).length,
    trash: stories.filter(s => s.status === 'trash').length,
    pendingComments: comments.filter(c => c.status === 'pending').length,
  };

  const NAV: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutTemplate className="w-5 h-5" />,
      href: '/admin',
    },
    {
      id: 'homepage',
      label: 'Homepage',
      icon: <LayoutTemplate className="w-5 h-5" />,
      href: '/admin/homepage',
      children: [
        { id: 'layout', label: 'Layout Editor', icon: <LayoutTemplate className="w-4 h-4" />, href: '/admin/homepage' },
        { id: 'breaking-mgr', label: 'Breaking News', icon: <Radio className="w-4 h-4" />, href: '/admin/homepage/breaking' },
      ],
    },
    {
      id: 'stories',
      label: 'Stories',
      icon: <FileText className="w-5 h-5" />,
      href: '/admin/stories',
      children: [
        { id: 'write-story', label: 'Article Writing', icon: <Edit3 className="w-4 h-4" />, href: '/admin/stories/new' },
        { id: 'drafts', label: 'Drafts', icon: <Edit3 className="w-4 h-4" />, href: '/admin/stories?status=draft', badge: counts.drafts > 0 ? counts.drafts : undefined, badgeColor: 'gray' },
        { id: 'in-review', label: 'In Review', icon: <Clock className="w-4 h-4" />, href: '/admin/stories?status=in_review', badge: counts.inReview > 0 ? counts.inReview : undefined, badgeColor: 'rose' },
        { id: 'scheduled', label: 'Scheduled', icon: <Clock className="w-4 h-4" />, href: '/admin/stories?status=scheduled', badge: counts.scheduled > 0 ? counts.scheduled : undefined, badgeColor: 'purple' },
        { id: 'published', label: 'Published', icon: <CheckCircle className="w-4 h-4" />, href: '/admin/stories?status=published', badge: counts.published > 0 ? counts.published : undefined, badgeColor: 'emerald' },
        { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" />, href: '/admin/stories?filter=trending', badge: counts.trending > 0 ? counts.trending : undefined, badgeColor: 'amber' },
        { id: 'breaking', label: 'Breaking', icon: <Radio className="w-4 h-4" />, href: '/admin/stories?filter=breaking', badge: counts.breaking > 0 ? counts.breaking : undefined, badgeColor: 'red' },
        { id: 'featured', label: 'Featured', icon: <Star className="w-4 h-4" />, href: '/admin/stories?filter=featured', badge: counts.featured > 0 ? counts.featured : undefined, badgeColor: 'amber' },
        { id: 'trash', label: 'Trash', icon: <Trash2 className="w-4 h-4" />, href: '/admin/stories?status=trash', badge: counts.trash > 0 ? counts.trash : undefined, badgeColor: 'gray' },
      ],
    },
    {
      id: 'media',
      label: 'Media',
      icon: <Image className="w-5 h-5" />,
      href: '/admin/media',
    },
    {
      id: 'audience',
      label: 'Audience',
      icon: <Users className="w-5 h-5" />,
      href: '/admin/audience',
      children: [
        { id: 'comments', label: 'Comments', icon: <MessageSquare className="w-4 h-4" />, href: '/admin/audience/comments', badge: counts.pendingComments > 0 ? counts.pendingComments : undefined, badgeColor: 'amber' },
        { id: 'newsletters', label: 'Newsletters', icon: <Mail className="w-4 h-4" />, href: '/admin/audience/newsletters' },
        { id: 'push', label: 'Push Notifications', icon: <Bell className="w-4 h-4" />, href: '/admin/audience/push' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart2 className="w-5 h-5" />,
      href: '/admin/analytics',
    },
    {
      id: 'seo-engine',
      label: 'Bengali SEO Engine',
      icon: <Radio className="w-5 h-5 text-rose-600" />,
      href: '/admin/seo-engine',
      badge: 'AUTO',
      badgeColor: 'rose',
      children: [
        { id: 'seo-audit', label: 'SEO Readiness Audit', icon: <CheckCircle className="w-4 h-4" />, href: '/admin/seo-engine' },
        { id: 'bengali-seo', label: 'Bengali Entity Engine', icon: <Globe className="w-4 h-4" />, href: '/admin/seo-engine' },
        { id: 'schema-settings', label: 'NewsArticle Schema', icon: <FileText className="w-4 h-4" />, href: '/admin/seo-engine' },
        { id: 'search-console', label: 'Search Console Tokens', icon: <Settings className="w-4 h-4" />, href: '/admin/seo-engine' },
      ],
    },
    {
      id: 'plugins',
      label: 'Plugins & Addons',
      icon: <Puzzle className="w-5 h-5 text-rose-600" />,
      href: '/admin/plugins',
      badge: 'NEW',
      badgeColor: 'rose',
      children: [
        { id: 'plugin-store', label: 'Plugin Store', icon: <Puzzle className="w-4 h-4" />, href: '/admin/plugins' },
        { id: 'installed-plugins', label: 'Installed Plugins', icon: <CheckCircle className="w-4 h-4" />, href: '/admin/plugins?tab=installed' },
        { id: 'add-plugin', label: 'Upload Plugin (.zip)', icon: <Terminal className="w-4 h-4" />, href: '/admin/plugins?tab=upload' },
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isActive = (href: string) => {
    const [targetPath, targetQuery] = href.split('?');
    const [currentPathname, currentQuery] = currentPath.split('?');

    if (href === '/admin') {
      return currentPath === '/admin';
    }

    if (targetQuery) {
      return currentPathname === targetPath && currentQuery === targetQuery;
    }

    if (targetPath === '/admin/stories') {
      if (href === '/admin/stories') {
        return currentPathname === '/admin/stories' && !currentQuery;
      }
      return currentPath === href;
    }

    return currentPathname === targetPath;
  };

  const getBadgeClasses = (color?: string) => {
    if (color === 'rose') return 'bg-rose-100 text-rose-700';
    if (color === 'amber') return 'bg-amber-100 text-amber-700';
    if (color === 'red') return 'bg-red-100 text-red-700';
    if (color === 'purple') return 'bg-purple-100 text-purple-700';
    if (color === 'emerald') return 'bg-emerald-100 text-emerald-700';
    return 'bg-gray-100 text-gray-600';
  };

  const renderItem = (item: NavItem, depth = 0) => {
    if (item.adminOnly && userRole !== 'admin') return null;
    const hasChildren = item.children && item.children.length > 0;
    const expanded = expandedItems.has(item.id);
    const active = isActive(item.href);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) toggleExpand(item.id);
            else onNavigate(item.href);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer group
            ${depth === 0 ? 'font-medium' : 'font-normal pl-8'}
            ${active
              ? 'bg-rose-600 text-white shadow-xs font-semibold'
              : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700'
            }`}
        >
          <span className="shrink-0">{item.icon}</span>
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${active ? 'bg-white/20 text-white' : getBadgeClasses(item.badgeColor)}`}>
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <span className="shrink-0">
              {expanded
                ? <ChevronDown className="w-4 h-4" />
                : <ChevronRight className="w-4 h-4" />
              }
            </span>
          )}
        </button>
        {hasChildren && expanded && (
          <div className="mt-0.5 space-y-0.5">
            {item.children!.map(child => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      {/* Brand Logo matching Website Theme */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/admin')}>
          {config.logoUrl ? (
            <img
              src={config.logoUrl}
              alt={config.appNameEn}
              className="h-11 w-auto max-w-[130px] object-contain rounded"
            />
          ) : (
            <div style={{ backgroundColor: 'var(--brand-primary, #e11d48)' }} className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
              {config.logoBadgeText || 'भा'}
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-gray-900 font-serif truncate">{config.appNameEn || config.appNameHi || 'Bharat News'}</span>
              <span style={{ backgroundColor: 'var(--brand-primary, #e11d48)' }} className="text-white font-black text-[9px] px-1.5 py-0.2 rounded uppercase shrink-0">{config.appSuffixEn || 'LIVE'}</span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium truncate">{config.taglineEn || config.taglineHi || 'Newsroom Admin CMS'}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV.map(item => renderItem(item))}
      </nav>

      {/* Settings Link */}
      <div className="p-3 border-t border-gray-200 shrink-0">
        <button
          onClick={() => toggleExpand('bottom-settings')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer font-medium ${
            currentPath.startsWith('/admin/settings')
              ? 'bg-rose-600 text-white font-semibold'
              : 'text-gray-700 hover:bg-rose-50 hover:text-rose-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Settings className={`w-4 h-4 ${currentPath.startsWith('/admin/settings') ? 'text-white' : 'text-rose-600'}`} />
            <span>Settings</span>
          </div>
          {expandedItems.has('bottom-settings') ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {expandedItems.has('bottom-settings') && (
          <div className="mt-1 space-y-0.5 pl-3 border-l-2 border-rose-100 ml-3">
            <button
              onClick={() => onNavigate('/admin/settings?tab=profile')}
              className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                currentPath.includes('tab=profile') ? 'text-rose-600 font-semibold bg-rose-50' : 'text-gray-600 hover:text-rose-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>My Profile</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/settings/sections')}
              className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                currentPath.includes('/sections') ? 'text-rose-600 font-semibold bg-rose-50' : 'text-gray-600 hover:text-rose-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Sections & Topics</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/settings/authors')}
              className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                currentPath.includes('/authors') ? 'text-rose-600 font-semibold bg-rose-50' : 'text-gray-600 hover:text-rose-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Authors & Users</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/settings/integrations')}
              className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                currentPath.includes('/integrations') ? 'text-rose-600 font-semibold bg-rose-50' : 'text-gray-600 hover:text-rose-700'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>Integrations</span>
            </button>
            {userRole === 'admin' && (
              <button
                onClick={() => onNavigate('/admin/settings/developer')}
                className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                  currentPath.includes('/developer') ? 'text-rose-600 font-semibold bg-rose-50' : 'text-gray-600 hover:text-rose-700'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Developer Tools</span>
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
