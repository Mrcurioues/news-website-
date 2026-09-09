import React, { useState } from 'react';
import { TrendingUp, Eye, Users, Clock, Share2, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface AnalyticsPageProps {
  onNavigate: (path: string) => void;
}

const CHART_7D = [
  { day: 'Mon', views: 124000, readers: 98000 }, { day: 'Tue', views: 182000, readers: 145000 },
  { day: 'Wed', views: 158000, readers: 126000 }, { day: 'Thu', views: 221000, readers: 177000 },
  { day: 'Fri', views: 195000, readers: 156000 }, { day: 'Sat', views: 287000, readers: 229000 },
  { day: 'Sun', views: 312000, readers: 249000 },
];

const CHART_30D = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  views: Math.floor(100000 + Math.random() * 250000),
  readers: Math.floor(80000 + Math.random() * 200000),
}));

const TRAFFIC_SOURCES = [
  { name: 'Organic Search', value: 42, color: '#1E40AF' },
  { name: 'Social Media', value: 31, color: '#7C3AED' },
  { name: 'Direct', value: 16, color: '#059669' },
  { name: 'Referral', value: 11, color: '#D97706' },
];

const TOP_STORIES = [
  { headline: 'India clinches T20 series against Sri Lanka', section: 'Cricket', views: 284500, readers: 226800, avgTime: '4:12', shares: 12400, trend: 'up' },
  { headline: 'PM Modi announces infrastructure push of ₹5 lakh crore', section: 'National', views: 198200, readers: 158560, avgTime: '3:45', shares: 8700, trend: 'up' },
  { headline: 'Markets rally as RBI holds interest rates', section: 'Business', views: 145800, readers: 116640, avgTime: '2:58', shares: 5200, trend: 'stable' },
  { headline: 'Monsoon prediction: Deficit rainfall this year', section: 'National', views: 98400, readers: 78720, avgTime: '3:20', shares: 3800, trend: 'up' },
  { headline: 'Tech layoffs reach India — 2000 jobs at risk', section: 'Tech & AI', views: 76500, readers: 61200, avgTime: '4:05', shares: 2900, trend: 'down' },
  { headline: 'Top 10 monsoon destinations in India', section: 'Lifestyle', views: 65200, readers: 52160, avgTime: '5:12', shares: 4100, trend: 'up' },
];

const SPIKES = [
  { story: 'India clinches T20 series', section: 'Cricket', spike: '+317%', time: '2:30 PM', cause: 'WhatsApp viral share' },
  { story: 'Major earthquake hits Gujarat', section: 'National', spike: '+240%', time: '11:15 AM', cause: 'Breaking news push notification' },
];

const fmt = (n: number) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
};

export const AnalyticsPage: React.FC<AnalyticsPageProps> = () => {
  const [range, setRange] = useState<'7d' | '30d'>('7d');
  const chartData = range === '7d' ? CHART_7D : CHART_30D;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Story performance and audience insights</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {(['7d', '30d'] as const).map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${range === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {r === '7d' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Big Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '1.48M', change: '+12%', icon: <Eye className="w-5 h-5" />, color: 'text-blue-600' },
          { label: 'Unique Readers', value: '1.18M', change: '+8%', icon: <Users className="w-5 h-5" />, color: 'text-purple-600' },
          { label: 'Avg. Read Time', value: '3:47', change: '+0:22', icon: <Clock className="w-5 h-5" />, color: 'text-emerald-600' },
          { label: 'Total Shares', value: '37.1K', change: '+24%', icon: <Share2 className="w-5 h-5" />, color: 'text-amber-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className={`${stat.color} mb-3`}>{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            <div className="text-xs text-emerald-600 font-medium mt-1">{stat.change} vs last period</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5">Views Over Time</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v: number) => [fmt(v), '']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                <Line type="monotone" dataKey="views" stroke="#1E40AF" strokeWidth={2} dot={false} name="Views" />
                <Line type="monotone" dataKey="readers" stroke="#7C3AED" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Readers" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-end">
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-6 h-0.5 bg-blue-700 inline-block" />Views</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-6 h-0.5 bg-purple-600 border-dashed border inline-block" />Readers</span>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5">Traffic Sources</h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={TRAFFIC_SOURCES} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                  {TRAFFIC_SOURCES.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {TRAFFIC_SOURCES.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs text-gray-600">{s.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-700">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Spikes */}
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-rose-600" />
          <h2 className="text-base font-bold text-rose-800">Traffic Spikes Detected</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SPIKES.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-rose-100 p-4 flex items-start gap-4">
              <div className="text-2xl font-bold text-rose-600">{s.spike}</div>
              <div>
                <div className="text-sm font-semibold text-gray-900 leading-snug">{s.story}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.section} · at {s.time}</div>
                <div className="text-xs text-rose-600 mt-1 font-medium">Likely: {s.cause}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Stories */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Top Stories</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Story</th>
              <th className="px-4 py-3 text-right hidden md:table-cell">Views</th>
              <th className="px-4 py-3 text-right hidden lg:table-cell">Readers</th>
              <th className="px-4 py-3 text-right hidden lg:table-cell">Avg. Time</th>
              <th className="px-4 py-3 text-right">Shares</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {TOP_STORIES.map((s, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-300 w-5">#{i + 1}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{s.headline}</div>
                      <div className="text-xs text-gray-400">{s.section}</div>
                    </div>
                    {s.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                  </div>
                </td>
                <td className="px-4 py-4 text-right hidden md:table-cell text-gray-700 font-medium">{fmt(s.views)}</td>
                <td className="px-4 py-4 text-right hidden lg:table-cell text-gray-500">{fmt(s.readers)}</td>
                <td className="px-4 py-4 text-right hidden lg:table-cell text-gray-500">{s.avgTime}</td>
                <td className="px-4 py-4 text-right text-gray-500">{fmt(s.shares)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
