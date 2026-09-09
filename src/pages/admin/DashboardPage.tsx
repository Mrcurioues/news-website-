import React from 'react';
import {
  Plus, CheckCircle, Clock, Radio, TrendingUp,
  Edit3, Eye, AlertTriangle, MessageSquare, ArrowRight,
  Flame, Activity
} from 'lucide-react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { useStoriesStore } from '../../stores/storiesStore';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { usePluginsStore } from '../../stores/pluginsStore';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

const GREETING = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const SAMPLE_CHART_DATA = [
  { day: 'Mon', views: 12400 }, { day: 'Tue', views: 18200 },
  { day: 'Wed', views: 15800 }, { day: 'Thu', views: 22100 },
  { day: 'Fri', views: 19500 }, { day: 'Sat', views: 28700 },
  { day: 'Sun', views: 31200 },
];

const STATUS_CONFIG: Record<string, { label: string; bg: string; dot: string; text: string }> = {
  draft: { label: 'Draft', bg: 'bg-gray-100', dot: 'bg-gray-400', text: 'text-gray-600' },
  in_review: { label: 'In Review', bg: 'bg-rose-50', dot: 'bg-rose-500', text: 'text-rose-700' },
  changes_requested: { label: 'Changes Needed', bg: 'bg-amber-100', dot: 'bg-amber-500', text: 'text-amber-700' },
  approved: { label: 'Approved', bg: 'bg-green-100', dot: 'bg-green-500', text: 'text-green-700' },
  scheduled: { label: 'Scheduled', bg: 'bg-purple-100', dot: 'bg-purple-500', text: 'text-purple-700' },
  published: { label: 'Published', bg: 'bg-emerald-100', dot: 'bg-emerald-600', text: 'text-emerald-700' },
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['draft'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { stories, getInReviewCount, getBreakingCount, getPublishedTodayCount, getScheduledCount } = useStoriesStore();
  const { user } = useAuthStore();
  const { isBreakingNewsActive } = useUIStore();
  const { plugins } = usePluginsStore();

  const heatmapPlugin = plugins.find(p => p.id === 'live-heatmap-analytics');
  const isHeatmapActive = heatmapPlugin?.isInstalled && heatmapPlugin?.isActive;

  const inReviewCount = getInReviewCount();
  const publishedTodayCount = getPublishedTodayCount();
  const scheduledCount = getScheduledCount();
  const breakingCount = getBreakingCount();

  const queueStories = stories.slice(0, 6);
  const topStories = [...stories].sort((a, b) => b.views - a.views).slice(0, 5);
  const topStory = topStories[0];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{GREETING()}, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 mt-1">
            You have <strong className="text-rose-600">{inReviewCount} stories</strong> waiting for review today.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('/admin/seo-engine')}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span>✨</span> Bengali SEO Engine
          </button>
          <button
            onClick={() => onNavigate('/admin/homepage')}
            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors cursor-pointer"
          >
            Manage Homepage
          </button>
          <button
            onClick={() => onNavigate('/admin/stories/new')}
            className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            + New Story
          </button>
        </div>
      </div>

      {/* Quick Bengali SEO Engine Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-2xl">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">Bengali-First Automated SEO Control Engine</h3>
              <span className="bg-emerald-500 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">Active</span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Automated NewsArticle schema, Bengali entity resolution, and Google News readiness audit ready.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('/admin/seo-engine')}
          className="bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold px-5 py-2.5 rounded-xl shrink-0 transition-all cursor-pointer shadow-sm"
        >
          Open SEO Control Center →
        </button>
      </div>

      {/* Status Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-3">
            <CheckCircle className="w-4 h-4" /> PUBLISHED TODAY
          </div>
          <div className="text-3xl font-bold text-gray-900">{publishedTodayCount}</div>
          <div className="text-xs text-emerald-600 mt-1 font-medium">Live on portal</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-rose-100 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold mb-3">
            <Clock className="w-4 h-4" /> NEEDS REVIEW
          </div>
          <div className="text-3xl font-bold text-gray-900">{inReviewCount}</div>
          <div className="text-xs text-rose-600 mt-1 font-medium">Awaiting editor sign-off</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 text-xs font-semibold mb-3">
            <Clock className="w-4 h-4" /> SCHEDULED TODAY
          </div>
          <div className="text-3xl font-bold text-gray-900">{scheduledCount}</div>
          <div className="text-xs text-purple-600 mt-1 font-medium">Auto-publish queue</div>
        </div>
        <div
          className="bg-rose-50 rounded-xl p-5 border border-rose-200 shadow-sm cursor-pointer hover:bg-rose-100 transition-colors"
          onClick={() => onNavigate('/admin/homepage/breaking')}
        >
          <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold mb-3">
            <Radio className={`w-4 h-4 ${isBreakingNewsActive || breakingCount > 0 ? 'animate-pulse' : ''}`} /> BREAKING LIVE
          </div>
          <div className="text-3xl font-bold text-rose-700">{breakingCount}</div>
          <div className="text-xs text-rose-600 mt-1 font-medium">{isBreakingNewsActive ? 'Active on ticker' : 'Click to manage'}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold mb-3">
            <TrendingUp className="w-4 h-4" /> TOP STORY TODAY
          </div>
          <div className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{topStory?.headline || 'No top story'}</div>
          <div className="text-xs text-rose-600 mt-1 font-medium">{(topStory?.views || 0).toLocaleString()} views</div>
        </div>
      </div>

      {/* Heatmap & Scroll Analytics Plugin Widget */}
      {isHeatmapActive && (
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-purple-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
              <Activity className="w-4 h-4 animate-pulse text-emerald-400" /> Live Heatmap Plugin Active
            </div>
            <h3 className="text-xl font-black font-serif">Reader Engagement & Scroll Depth Analysis</h3>
            <p className="text-xs text-purple-200">
              Active tracking on published articles. 78% of visitors scroll past 50% article depth.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 text-center">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
              <div className="text-xl font-black text-amber-300">74.2%</div>
              <div className="text-[10px] text-gray-300 uppercase">Avg Scroll Depth</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
              <div className="text-xl font-black text-emerald-300">2m 45s</div>
              <div className="text-[10px] text-gray-300 uppercase">Avg Time on Page</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editorial Queue */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Today's Editorial Queue</h2>
            <button
              onClick={() => onNavigate('/admin/stories')}
              className="text-sm text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 cursor-pointer"
            >
              View all ({stories.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {queueStories.map(story => (
              <div key={story.id} className="px-6 py-4 hover:bg-rose-50/30 transition-colors flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{story.headline}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{story.section} · {story.byline}</div>
                </div>
                <StatusBadge status={story.status} />
                <div className="text-xs text-gray-400 hidden md:block shrink-0">{story.publishDate ? new Date(story.publishDate).toLocaleDateString() : 'Today'}</div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => onNavigate(`/admin/stories/${story.id}`)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    title="Edit story"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate(`/news/${story.slug}`)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                    title="View public preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Alerts</h2>
            </div>
            <div className="divide-y divide-gray-50">
              <div className="px-5 py-3 flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-800 font-medium">Traffic spike detected</div>
                  <div className="text-xs text-gray-500">Cricket story +300% views in last hour</div>
                </div>
              </div>
              <div className="px-5 py-3 flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-800 font-medium">7 comments pending</div>
                  <div className="text-xs text-gray-500">Awaiting moderation approval</div>
                </div>
              </div>
              <div className="px-5 py-3 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-800 font-medium">Deadline approaching</div>
                  <div className="text-xs text-gray-500">2 review items due today</div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Upcoming Publications</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {stories.filter(s => s.status === 'scheduled' || s.status === 'approved').slice(0, 3).map((s, i) => (
                <div key={i} className="px-5 py-3 cursor-pointer hover:bg-gray-50" onClick={() => onNavigate(`/admin/stories/${s.id}`)}>
                  <div className="text-xs text-rose-600 font-semibold">{s.scheduledDate ? new Date(s.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}</div>
                  <div className="text-sm text-gray-800 font-medium leading-snug mt-0.5 line-clamp-1">{s.headline}</div>
                  <div className="text-xs text-gray-400">{s.section} · {s.byline}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-day Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Story Performance (7 Days)</h2>
            <button onClick={() => onNavigate('/admin/analytics')} className="text-sm text-rose-600 hover:text-rose-800 font-medium cursor-pointer flex items-center gap-1">
              View analytics <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SAMPLE_CHART_DATA}>
                <Line type="monotone" dataKey="views" stroke="#E11D48" strokeWidth={2.5} dot={false} />
                <Tooltip
                  formatter={(v: number) => [v.toLocaleString(), 'Views']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Stories */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-600" />
            <h2 className="text-base font-bold text-gray-900">Top Stories</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {topStories.map((s, i) => (
              <div key={s.id} className="px-5 py-3 flex items-start gap-3 cursor-pointer hover:bg-gray-50" onClick={() => onNavigate(`/admin/stories/${s.id}`)}>
                <span className="text-xs font-bold text-gray-300 mt-0.5 w-4 shrink-0">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{s.headline}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.views.toLocaleString()} views · {s.section}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
