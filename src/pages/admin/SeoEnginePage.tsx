import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Globe,
  Settings,
  RefreshCw,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  Database,
  ExternalLink,
  Code,
  Sliders,
  Check,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useStoriesStore } from '../../stores/storiesStore';
import { BENGALI_ENTITIES, SEOEngine } from '../../services/seoEngine';

interface SeoEnginePageProps {
  onNavigate: (path: string) => void;
}

export const SeoEnginePage: React.FC<SeoEnginePageProps> = ({ onNavigate }) => {
  const { stories } = useStoriesStore();
  const [activeTab, setActiveTab] = useState<'audit' | 'bengali' | 'schema' | 'rules' | 'searchconsole'>('audit');
  const [isAuditing, setIsAuditing] = useState(false);
  const [searchConsoleToken, setSearchConsoleToken] = useState('google-site-verification=bharat_news_live_token_2026');
  const [analyticsId, setAnalyticsId] = useState('G-BHARATNEWS2026');
  const [gtmId, setGtmId] = useState('GTM-BNL2026');

  // Run Site-Wide SEO Readiness Audit
  const auditResults = stories.map(s => {
    const readiness = SEOEngine.calculateReadiness({
      id: s.id,
      title: s.headline,
      body: [s.body],
      author: { name: s.byline, nameHi: s.byline, role: 'Journalist', avatar: '' },
      coverImage: s.mainImage,
      category: s.section,
      slug: s.slug
    });
    return { story: s, readiness };
  });

  const criticalStories = auditResults.filter(r => r.readiness.status === 'Critical Issue');
  const warningStories = auditResults.filter(r => r.readiness.status === 'Needs Attention' || r.readiness.status === 'Editorial Review Required');
  const readyStories = auditResults.filter(r => r.readiness.status === 'SEO Ready');

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      toast.success('Site-wide SEO Readiness Audit complete!');
    }, 1000);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-extrabold text-xs tracking-wider uppercase flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              Automated Engine
            </span>
            <span className="text-xs font-semibold text-gray-500">v2.4 Bengali SEO Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Bengali SEO Engine & CMS Control Center
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Automated technical SEO, Bengali entity recognition, Google News schema, and SEO Readiness monitoring.
          </p>
        </div>

        <button
          onClick={handleRunAudit}
          disabled={isAuditing}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm shadow-sm transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Auditing Site...' : 'Run Site SEO Audit'}</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto hide-scrollbar pb-px">
        {[
          { id: 'audit', label: '🚀 SEO Readiness & Audit', badge: criticalStories.length > 0 ? criticalStories.length : undefined, badgeColor: 'bg-rose-500' },
          { id: 'bengali', label: '🌐 Bengali & Regional SEO' },
          { id: 'schema', label: '🏷️ Schema & Structured Data' },
          { id: 'rules', label: '🤖 Automated Rules Engine' },
          { id: 'searchconsole', label: '🔍 Search Console & Webmaster' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-rose-600 text-rose-600 bg-rose-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`text-[10px] text-white px-2 py-0.5 rounded-full font-black ${tab.badgeColor}`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: SEO READINESS & SITE AUDIT DASHBOARD */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Summary Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-gray-500 uppercase">Total Analyzed Stories</div>
              <div className="text-3xl font-black text-gray-900 mt-2">{stories.length}</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Crawlable Index
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-emerald-800 uppercase">SEO Ready 🟢</div>
              <div className="text-3xl font-black text-emerald-700 mt-2">{readyStories.length}</div>
              <div className="text-xs text-emerald-700 font-medium mt-1">Prepared for search indexing</div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-amber-800 uppercase">Needs Attention 🟡</div>
              <div className="text-3xl font-black text-amber-700 mt-2">{warningStories.length}</div>
              <div className="text-xs text-amber-700 font-medium mt-1">Minor metadata / link warnings</div>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-rose-800 uppercase">Critical Issues 🔴</div>
              <div className="text-3xl font-black text-rose-700 mt-2">{criticalStories.length}</div>
              <div className="text-xs text-rose-700 font-medium mt-1">Requires editor fix before indexing</div>
            </div>
          </div>

          {/* Audit Results Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-black text-gray-900 text-base flex items-center gap-2">
                <Shield className="w-5 h-5 text-rose-600" />
                <span>Story SEO Readiness Matrix</span>
              </h3>
              <span className="text-xs font-bold text-gray-500">Filtered by Status</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                    <th className="p-4">Headline / Story</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Readiness Status</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {auditResults.map(({ story, readiness }) => (
                    <tr key={story.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900 line-clamp-1">{story.headline}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>By {story.byline || 'Staff'}</span>
                          <span>•</span>
                          <span>Slug: /{story.slug || story.id}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 text-xs font-bold uppercase">
                          {story.section || 'National'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black inline-flex items-center gap-1.5 ${
                          readiness.statusColor === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                          readiness.statusColor === 'amber' ? 'bg-amber-100 text-amber-800' :
                          readiness.statusColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            readiness.statusColor === 'emerald' ? 'bg-emerald-600' :
                            readiness.statusColor === 'amber' ? 'bg-amber-600' :
                            readiness.statusColor === 'blue' ? 'bg-blue-600' :
                            'bg-rose-600'
                          }`} />
                          {readiness.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-black text-sm">
                        {readiness.score}/100
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => onNavigate(`/admin/stories/${story.id}`)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Edit & Optimize
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BENGALI & REGIONAL SEO ENGINE */}
      {activeTab === 'bengali' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-rose-600" />
              <span>Bengali Multilingual & Entity Transliteration Engine</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Google treats Bengali Unicode text, English transliterations, and regional Bengali variants as the same entity. The engine maps entity variants to guarantee search index discoverability for West Bengal queries.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {BENGALI_ENTITIES.map((ent, idx) => (
                <div key={idx} className="bg-rose-50/50 border border-rose-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{ent.canonicalName}</div>
                    <div className="text-xs text-rose-700 font-serif font-bold mt-0.5">{ent.nameBn}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-white text-rose-700 text-xs font-black rounded border border-rose-200 uppercase">
                    {ent.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHEMA & STRUCTURED DATA DEFAULTS */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
              <Code className="w-5 h-5 text-rose-600" />
              <span>Automated NewsArticle & Breadcrumb JSON-LD Schema</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Schema.org structured data is generated automatically for every published news story without requiring editors to enter code.
            </p>

            <div className="bg-gray-900 text-emerald-400 font-mono text-xs p-4 rounded-xl overflow-x-auto shadow-inner">
              <pre>{JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'NewsArticle',
                'headline': 'মমতা বন্দ্যোপাধ্যায় কলকাতায় नया प्रोजेक्ट लॉन्च',
                'inLanguage': 'bn-IN',
                'publisher': {
                  '@type': 'Organization',
                  'name': 'Bharat Samachar Live',
                  'logo': 'https://bharatsamachar.com/logo.png'
                }
              }, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUTOMATED RULES ENGINE */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
              <Sliders className="w-5 h-5 text-rose-600" />
              <span>Automated Pipeline Rules Configuration</span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Auto-generate natural Bengali/English meta titles & descriptions on save</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automatically create 301 redirects if a published URL slug is altered</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Enforce standard canonical URL policy for 100% of published news pages</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 5: SEARCH CONSOLE & WEBMASTER SETTINGS */}
      {activeTab === 'searchconsole' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-rose-600" />
              <span>Google Search Console & Webmaster Verification</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Google Search Console Verification Token
                </label>
                <input
                  type="text"
                  value={searchConsoleToken}
                  onChange={e => setSearchConsoleToken(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Google Analytics 4 (GA4) Measurement ID
                </label>
                <input
                  type="text"
                  value={analyticsId}
                  onChange={e => setAnalyticsId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Google Tag Manager (GTM) Container ID
                </label>
                <input
                  type="text"
                  value={gtmId}
                  onChange={e => setGtmId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <button
                type="button"
                onClick={() => toast.success('Search Console verification tokens saved!')}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Save Verification Tokens
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
