import React, { useState } from 'react';
import { GripVertical, X, Eye, Save, Radio, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { useHomepageStore } from '../../stores/homepageStore';
import { useStoriesStore } from '../../stores/storiesStore';

interface HomepagePageProps {
  onNavigate: (path: string) => void;
}

export const HomepagePage: React.FC<HomepagePageProps> = ({ onNavigate }) => {
  const { layout, updateSection, addToSection, removeFromSection, addCustomVideoLink, removeCustomVideoLink } = useHomepageStore();
  const { stories } = useStoriesStore();

  const [saved, setSaved] = useState(false);
  const [customVideoInput, setCustomVideoInput] = useState('');
  const [searchAvailableQuery, setSearchAvailableQuery] = useState('');
  const [dragStory, setDragStory] = useState<any | null>(null);
  const [dragTargetSection, setDragTargetSection] = useState<string | null>(null);

  const sectionsConfig: Array<{ key: keyof typeof layout; label: string; description: string; maxItems: number; color: string }> = [
    { key: 'frontContent', label: '🔴 Front Content Banner (मुख्य रेड बैनर व लाइव खबरें)', description: 'Landing page red hero banner (Main story + bullet list headlines)', maxItems: 6, color: 'bg-rose-600/10 border-rose-500' },
    { key: 'hero', label: '🔥 Hero Featured Carousel', description: 'Main top story carousel', maxItems: 3, color: 'bg-rose-50 border-rose-200' },
    { key: 'breaking', label: '⚡ Breaking News Banner', description: 'Red alert banner for ongoing breaking events', maxItems: 3, color: 'bg-rose-100/50 border-rose-300' },
    { key: 'trending', label: '📈 Trending / Most Read Sidebar', description: 'Right sidebar trending items (thumbnails + category text)', maxItems: 6, color: 'bg-amber-50 border-amber-200' },
    { key: 'hindiNews', label: '📰 Hindi News / हिंदी न्यूज़ Section', description: 'Featured Hindi news section layout with OTT special', maxItems: 4, color: 'bg-purple-50 border-purple-200' },
    { key: 'latest', label: '⚡ Latest Stories Feed / लेटेस्ट न्यूज़', description: 'Grid of most recent published stories', maxItems: 6, color: 'bg-gray-50 border-gray-200' },
    { key: 'video', label: '🎥 Video Bulletins / वीडियो बुलेटिन', description: 'Video reels & live bulletin player section', maxItems: 4, color: 'bg-gray-900 text-white border-gray-800' },
    { key: 'business', label: '💼 Business & Economy / बिजनेस सेक्शन', description: '4 business articles grid layout at the bottom feed', maxItems: 4, color: 'bg-emerald-50 border-emerald-200' },
  ];

  const getStory = (id: string) => stories.find(s => s.id === id);

  const allPlacedIds = new Set(Object.values(layout).flat());
  const availableStories = stories
    .filter(s => !allPlacedIds.has(s.id))
    .filter(s => !searchAvailableQuery.trim() || s.headline.toLowerCase().includes(searchAvailableQuery.toLowerCase()) || (s.section && s.section.toLowerCase().includes(searchAvailableQuery.toLowerCase())));

  const handleSave = () => {
    setSaved(true);
    toast.success('Homepage layout saved successfully!');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Layout Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Drag stories into homepage section slots to customize live layout</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-full px-4 py-2 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer">
            <Eye className="w-4 h-4" /> Live Preview
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2 transition-all cursor-pointer shadow-xs ${saved ? 'bg-emerald-600 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'}`}
          >
            <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Layout'}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sections */}
        <div className="flex-1 space-y-4">
          {sectionsConfig.map(section => {
            const placedIds = layout[section.key] || [];
            const placedStories = placedIds.map(id => getStory(id)).filter(Boolean);

            return (
              <div
                key={section.key}
                className={`border-2 rounded-xl overflow-hidden ${dragTargetSection === section.key ? 'border-rose-400 bg-rose-50' : section.color} transition-colors`}
                onDragOver={e => { e.preventDefault(); setDragTargetSection(section.key); }}
                onDragLeave={() => setDragTargetSection(null)}
                onDrop={e => {
                  e.preventDefault();
                  setDragTargetSection(null);
                  if (dragStory) {
                    addToSection(section.key, dragStory.id);
                    setDragStory(null);
                    toast.success(`Added to ${section.label}`);
                  }
                }}
              >
                <div className="px-5 py-3 border-b border-inherit flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{section.label}</h3>
                    <p className="text-xs text-gray-500">{section.description} · max {section.maxItems} {section.maxItems === 1 ? 'story' : 'stories'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500">{placedStories.length}/{section.maxItems}</span>
                    {section.key === 'breaking' && placedStories.length > 0 && (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                        <Radio className="w-3 h-3 animate-pulse" /> LIVE
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2 min-h-16">
                  {section.key === 'video' && (
                    <div className="mb-3 p-3 bg-gray-800 rounded-lg text-white space-y-2 border border-gray-700">
                      <div className="text-xs font-bold text-amber-300">🔗 Add Custom Video Link (YouTube / MP4 / Shorts URL):</div>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=... or MP4 URL"
                          value={customVideoInput}
                          onChange={(e) => setCustomVideoInput(e.target.value)}
                          className="flex-1 bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (customVideoInput.trim()) {
                              addCustomVideoLink(customVideoInput.trim());
                              setCustomVideoInput('');
                              toast.success('Custom Video URL added to Video Section!');
                            }
                          }}
                          className="bg-rose-600 hover:bg-rose-700 px-3 py-1.5 text-xs font-bold rounded cursor-pointer transition-colors"
                        >
                          + Add Link
                        </button>
                      </div>

                      {/* Display Added Custom Video Links */}
                      {(layout.customVideoLinks || []).length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-gray-700">
                          <div className="text-[11px] font-semibold text-gray-300">Custom Embedded Video Links:</div>
                          {(layout.customVideoLinks || []).map((link, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-900 px-2.5 py-1.5 rounded text-xs">
                              <span className="truncate flex-1 text-gray-200 mr-2">{link}</span>
                              <button
                                onClick={() => {
                                  removeCustomVideoLink(idx);
                                  toast.success('Video link removed');
                                }}
                                className="text-gray-400 hover:text-rose-400"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {placedStories.length === 0 && (layout.customVideoLinks || []).length === 0 ? (
                    <div className="text-center py-4 text-xs text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                      Drag a story here or add a video URL link above
                    </div>
                  ) : (
                    placedStories.map((story) => (
                      <div
                        key={story!.id}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 cursor-grab active:cursor-grabbing shadow-sm hover:border-rose-300 transition-colors"
                        draggable
                        onDragStart={() => { removeFromSection(section.key, story!.id); setDragStory(story); }}
                      >
                        <GripVertical className="w-4 h-4 text-gray-300 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{story!.headline}</div>
                          <div className="text-xs text-gray-400">{story!.section} · {story!.byline}</div>
                        </div>
                        <button
                          onClick={() => { removeFromSection(section.key, story!.id); toast.success('Removed from layout'); }}
                          className="text-gray-300 hover:text-rose-500 cursor-pointer transition-colors shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                  {placedStories.length < section.maxItems && (
                    <div className="text-center py-1">
                      <span className="text-xs text-gray-400">{section.maxItems - placedStories.length} more slot{section.maxItems - placedStories.length !== 1 ? 's' : ''} available</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Stories Sidebar */}
        <div className="w-72 shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden sticky top-6">
            <div className="px-4 py-3 border-b border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Available Stories</h3>
                <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">{availableStories.length}</span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search available stories..."
                  value={searchAvailableQuery}
                  onChange={(e) => setSearchAvailableQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-rose-500"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5" />
                {searchAvailableQuery && (
                  <button
                    onClick={() => setSearchAvailableQuery('')}
                    className="absolute right-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <div className="p-3 space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto">
              {availableStories.length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-400">All stories placed in sections</div>
              ) : (
                availableStories.map(story => (
                  <div
                    key={story.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 flex items-start gap-2 cursor-grab active:cursor-grabbing hover:border-rose-300 hover:bg-rose-50/20 transition-colors"
                    draggable
                    onDragStart={() => setDragStory(story)}
                  >
                    <GripVertical className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-800 leading-snug line-clamp-2">{story.headline}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5 flex items-center justify-between">
                        <span>{story.section}</span>
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              addToSection(e.target.value as keyof typeof layout, story.id);
                              toast.success('Story added to section!');
                              e.target.value = '';
                            }
                          }}
                          className="text-[10px] bg-white border border-gray-200 rounded px-1 py-0.5 text-gray-700 hover:border-rose-300 cursor-pointer"
                        >
                          <option value="">+ Add to...</option>
                          {sectionsConfig.map(s => (
                            <option key={s.key} value={s.key}>{s.label.split(' ')[1] || s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
