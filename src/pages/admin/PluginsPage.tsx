import React, { useState } from 'react';
import {
  Puzzle, Search, Filter, CheckCircle2, Download, Power,
  Sliders, Trash2, Upload, Star, ExternalLink, ShieldCheck,
  Sparkles, RefreshCw, X, AlertCircle, Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import { usePluginsStore, PluginItem } from '../../stores/pluginsStore';
import { useSearchParams } from '../../context/RouterContext';

interface PluginsPageProps {
  onNavigate: (path: string) => void;
}

export const PluginsPage: React.FC<PluginsPageProps> = ({ onNavigate }) => {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as 'store' | 'installed' | 'upload' | null;

  const {
    plugins,
    searchQuery,
    selectedCategory,
    activeTab,
    configuredPluginId,
    setSearchQuery,
    setSelectedCategory,
    setActiveTab,
    setConfiguredPluginId,
    installPlugin,
    uninstallPlugin,
    togglePluginStatus,
    updatePluginSettings,
    addCustomPlugin,
  } = usePluginsStore();

  const currentTab = tabFromUrl || activeTab;

  // State for Upload Modal
  const [zipFileName, setZipFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [pluginTitle, setPluginTitle] = useState('');
  const [pluginTagline, setPluginTagline] = useState('');
  const [pluginCategory, setPluginCategory] = useState<PluginItem['category']>('editing');
  const [customCssInput, setCustomCssInput] = useState('');
  const [customJsInput, setCustomJsInput] = useState('');

  const categories = [
    { id: 'all', label: 'All Plugins' },
    { id: 'editing', label: 'Editing & Blocks' },
    { id: 'seo', label: 'SEO & Schema' },
    { id: 'ai', label: 'AI Assistants' },
    { id: 'media', label: 'Media & Watermark' },
    { id: 'social', label: 'Social Auto-Post' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'monetization', label: 'Monetization & Ads' },
    { id: 'design', label: 'Design & Themes' },
  ];

  // Filter plugins
  const filteredPlugins = plugins.filter((plugin) => {
    // Search query
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.author.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;

    // Tab filter
    if (currentTab === 'installed') {
      return matchesSearch && matchesCategory && plugin.isInstalled;
    }
    return matchesSearch && matchesCategory;
  });

  const configuredPlugin = plugins.find((p) => p.id === configuredPluginId);

  const handleCustomUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pluginTitle || !zipFileName) {
      toast.error('Please enter a plugin title and select a package zip file');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      addCustomPlugin({
        name: pluginTitle,
        slug: pluginTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        tagline: pluginTagline || 'Custom website editing extension plugin.',
        description: 'Uploaded via ZIP installer directly into Newsroom CMS plugins repository.',
        category: pluginCategory,
        icon: '⚡',
        author: 'Custom Dev',
        version: '1.0.0',
        isInstalled: true,
        isActive: true,
        lastUpdated: 'Just now',
        settings: {
          customScriptEnabled: true,
          customCss: customCssInput,
          headerScripts: customJsInput,
        },
      });
      setIsUploading(false);
      setZipFileName('');
      setPluginTitle('');
      setPluginTagline('');
      setCustomCssInput('');
      setCustomJsInput('');
      toast.success(`Installed and activated ${pluginTitle}! Running continuously.`);
    }, 1200);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 selection:bg-rose-500 selection:text-white">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-8 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-rose-600/30 rounded-xl border border-rose-500/40 text-rose-400">
              <Puzzle className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
              Newsroom Plugin Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Website Editing & Addons Marketplace</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Extend your news portal capabilities. Install real-time SEO analyzers, AI content rewriters, watermark tools, custom CSS injectors, and ad managers.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setActiveTab('upload');
            }}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Upload Plugin (.zip)
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-8">
        <button
          onClick={() => setActiveTab('store')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            currentTab === 'store'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Puzzle className="w-4 h-4" />
          Plugin Store ({plugins.length})
        </button>

        <button
          onClick={() => setActiveTab('installed')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            currentTab === 'installed'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Installed Plugins ({plugins.filter((p) => p.isInstalled).length})
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            currentTab === 'upload'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload Package (.zip)
        </button>
      </div>

      {/* Main Tab Content */}
      {currentTab === 'upload' ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xs max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Upload Custom Website Plugin</h2>
            <p className="text-xs text-gray-500 mt-1">
              If you have a custom editing plugin in `.zip` format, upload it here to install directly.
            </p>
          </div>

          <form onSubmit={handleCustomUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Plugin Title
              </label>
              <input
                type="text"
                value={pluginTitle}
                onChange={(e) => setPluginTitle(e.target.value)}
                placeholder="e.g. Breaking News Popup Banner"
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Plugin Category
                </label>
                <select
                  value={pluginCategory}
                  onChange={(e) => setPluginCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                >
                  <option value="editing">Editing & Blocks</option>
                  <option value="seo">SEO & Schema</option>
                  <option value="ai">AI Assistants</option>
                  <option value="media">Media & Watermark</option>
                  <option value="social">Social Auto-Post</option>
                  <option value="design">Design & Injector</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Tagline / Short Desc
                </label>
                <input
                  type="text"
                  value={pluginTagline}
                  onChange={(e) => setPluginTagline(e.target.value)}
                  placeholder="Short explanation of features"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Plugin Package (.zip file)
              </label>
              <div className="border-2 border-dashed border-gray-300 hover:border-rose-500 rounded-2xl p-6 text-center bg-gray-50 hover:bg-rose-50/50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept=".zip,.gz"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setZipFileName(e.target.files[0].name);
                      if (!pluginTitle) {
                        setPluginTitle(e.target.files[0].name.replace(/\.zip$/i, '').replace(/[-_]/g, ' '));
                      }
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Download className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">
                  {zipFileName ? zipFileName : 'Click or drag plugin .zip file here'}
                </p>
                <p className="text-xs text-gray-400 mt-1">Supports standard WordPress & React Plugin ZIP bundles</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Installing Plugin...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> Install Now
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Controls & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search website editing plugins, SEO, AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500 font-medium text-gray-800"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Plugin Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-200">
                <Puzzle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">No plugins found</h3>
                <p className="text-xs text-gray-500 mt-1">Try tweaking your search term or category filters.</p>
              </div>
            ) : (
              filteredPlugins.map((plugin) => (
                <div
                  key={plugin.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between p-6 hover:shadow-lg relative ${
                    plugin.isInstalled
                      ? 'border-rose-200 ring-1 ring-rose-500/20'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-rose-50 text-2xl flex items-center justify-center shrink-0 border border-rose-100 shadow-2xs">
                          {plugin.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-snug hover:text-rose-600 transition-colors">
                            {plugin.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span>By {plugin.author}</span>
                            <span>•</span>
                            <span className="font-mono text-[11px]">v{plugin.version}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 font-normal leading-relaxed line-clamp-2 mb-4">
                      {plugin.tagline}
                    </p>
                  </div>

                  {/* Metadata & Status */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{plugin.rating}</span>
                        <span className="text-gray-400 font-normal">({plugin.reviewsCount})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {plugin.isInstalled ? (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                              plugin.isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                plugin.isActive ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'
                              }`}
                            ></span>
                            {plugin.isActive ? 'Active' : 'Disabled'}
                          </span>
                        ) : (
                          <span className="text-[11px] text-gray-400 font-medium">
                            {plugin.downloadsCount.toLocaleString()} installs
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-2">
                      {plugin.isInstalled ? (
                        <>
                          {/* Toggle Active Switch */}
                          <button
                            onClick={() => {
                              togglePluginStatus(plugin.id);
                              toast.success(
                                `${plugin.name} is now ${!plugin.isActive ? 'Activated' : 'Deactivated'}`
                              );
                            }}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              plugin.isActive
                                ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            <Power className="w-3.5 h-3.5" />
                            {plugin.isActive ? 'Deactivate' : 'Activate'}
                          </button>

                          {/* Configure Settings Button */}
                          <button
                            onClick={() => setConfiguredPluginId(plugin.id)}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Plugin Settings"
                          >
                            <Sliders className="w-4 h-4" />
                          </button>

                          {/* Uninstall Button */}
                          <button
                            onClick={() => {
                              if (confirm(`Uninstall ${plugin.name}?`)) {
                                uninstallPlugin(plugin.id);
                                toast.success(`Uninstalled ${plugin.name}`);
                              }
                            }}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                            title="Uninstall Plugin"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            installPlugin(plugin.id);
                            toast.success(`Installed and activated ${plugin.name}!`);
                          }}
                          className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Install Plugin
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Plugin Configuration Drawer / Modal */}
      {configuredPlugin && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-6 border border-gray-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setConfiguredPluginId(null)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-rose-50 text-2xl flex items-center justify-center border border-rose-100">
                {configuredPlugin.icon}
              </span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{configuredPlugin.name} Settings</h3>
                <span className="text-xs text-gray-500">Configuring active instance parameters</span>
              </div>
            </div>

            <div className="space-y-4 border-t border-b border-gray-100 py-4 max-h-96 overflow-y-auto">
              {configuredPlugin.settings &&
                Object.entries(configuredPlugin.settings).map(([key, value]) => {
                  if (typeof value === 'boolean') {
                    return (
                      <div key={key} className="flex items-center justify-between py-1">
                        <span className="text-sm font-medium text-gray-800 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            updatePluginSettings(configuredPlugin.id, { [key]: e.target.checked })
                          }
                          className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                        />
                      </div>
                    );
                  }
                  if (typeof value === 'string' && value.includes('\n')) {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </label>
                        <textarea
                          rows={3}
                          value={value}
                          onChange={(e) =>
                            updatePluginSettings(configuredPlugin.id, { [key]: e.target.value })
                          }
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={key} className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </label>
                      <input
                        type="text"
                        value={String(value)}
                        onChange={(e) =>
                          updatePluginSettings(configuredPlugin.id, { [key]: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  );
                })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Live preferences updated
              </span>
              <button
                onClick={() => {
                  setConfiguredPluginId(null);
                  toast.success('Plugin settings saved!');
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
