import React, { useState } from 'react';
import { Edit3, Eye, Trash2, Copy, Archive, MoreHorizontal, Search, ChevronDown, FileText, Plus, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useStoriesStore } from '../../stores/storiesStore';
import { StoryStatus } from '../../types/admin';

interface StoriesPageProps {
  onNavigate: (path: string) => void;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; dot: string; text: string }> = {
  draft: { label: 'Draft', bg: 'bg-gray-100', dot: 'bg-gray-400', text: 'text-gray-600' },
  in_review: { label: 'In Review', bg: 'bg-rose-50', dot: 'bg-rose-500', text: 'text-rose-700' },
  changes_requested: { label: 'Changes Needed', bg: 'bg-amber-100', dot: 'bg-amber-500', text: 'text-amber-700' },
  approved: { label: 'Approved', bg: 'bg-green-100', dot: 'bg-green-500', text: 'text-green-700' },
  scheduled: { label: 'Scheduled', bg: 'bg-purple-100', dot: 'bg-purple-500', text: 'text-purple-700' },
  published: { label: 'Published', bg: 'bg-emerald-50', dot: 'bg-emerald-500', text: 'text-emerald-700' },
};

const TYPE_COLORS: Record<string, string> = {
  news: 'bg-rose-50 text-rose-700 font-semibold',
  feature: 'bg-purple-50 text-purple-600',
  explainer: 'bg-teal-50 text-teal-600',
  list: 'bg-orange-50 text-orange-600',
  opinion: 'bg-indigo-50 text-indigo-600',
  photo_story: 'bg-rose-50 text-rose-600',
};

const STATUS_FILTERS = ['all', 'draft', 'in_review', 'approved', 'scheduled', 'published'];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['draft'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text} whitespace-nowrap`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

export const StoriesPage: React.FC<StoriesPageProps> = ({ onNavigate }) => {
  const { stories, deleteStory, addStory, updateStory, fetchFromSupabase } = useStoriesStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specialFilter, setSpecialFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    fetchFromSupabase();
  }, [fetchFromSupabase]);

  // Automatically sync filters when clicking sidebar sub-items (URL search params change)
  React.useEffect(() => {
    const parseUrlFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('status') || 'all';
      const f = params.get('filter') || 'all';
      setStatusFilter(s);
      setSpecialFilter(f);
    };

    parseUrlFilters();
    window.addEventListener('popstate', parseUrlFilters);
    return () => window.removeEventListener('popstate', parseUrlFilters);
  }, [window.location.search]);

  const filtered = stories.filter(s => {
    const matchSearch = s.headline.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchSection = sectionFilter === 'all' || s.section === sectionFilter;

    let matchSpecial = true;
    if (specialFilter === 'trending') matchSpecial = !!s.isTrending;
    else if (specialFilter === 'breaking') matchSpecial = !!s.isBreaking;
    else if (specialFilter === 'featured') matchSpecial = !!s.isFeatured;

    return matchSearch && matchStatus && matchSection && matchSpecial;
  });

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(s => s.id)));
  };

  const handleDelete = (id: string, headline: string) => {
    deleteStory(id);
    toast.success(`Deleted "${headline.slice(0, 30)}…"`);
    setOpenMenuId(null);
  };

  const handleDuplicate = (story: any) => {
    const dup = addStory({
      type: story.type,
      status: 'draft',
      kicker: story.kicker,
      headline: `${story.headline} (Copy)`,
      summary: story.summary,
      body: story.body,
      section: story.section,
      topics: story.topics,
      byline: story.byline,
      authorId: story.authorId,
      isBreaking: false,
      isFeatured: false,
      isTrending: false,
      isPremium: false,
      views: 0,
      engagement: 0,
      shares: 0,
      comments: 0,
      sources: [],
      relatedStoryIds: [],
      slug: `${story.slug}-copy`
    });
    toast.success('Story duplicated as Draft');
    setOpenMenuId(null);
    onNavigate(`/admin/stories/${dup.id}`);
  };

  const handleBulkStatus = (newStatus: StoryStatus) => {
    selected.forEach(id => updateStory(id, { status: newStatus }));
    toast.success(`Updated ${selected.size} stories to ${newStatus}`);
    setSelected(new Set());
  };

  const handleBulkDelete = () => {
    selected.forEach(id => deleteStory(id));
    toast.success(`Deleted ${selected.size} stories`);
    setSelected(new Set());
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Articles & Stories Management</h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Supabase Realtime Sync Enabled
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{stories.length} total articles · {stories.filter(s => s.status === 'published').length} published</p>
        </div>
        <button
          onClick={() => onNavigate('/admin/stories/new')}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Article Writing
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search stories..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-400 transition-colors"
          />
        </div>

        {/* Status chips */}
        <div className="flex gap-2 flex-wrap items-center">
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setSpecialFilter('all');
                if (s === 'all') onNavigate('/admin/stories');
                else onNavigate(`/admin/stories?status=${s}`);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer capitalize ${statusFilter === s && specialFilter === 'all' ? 'bg-rose-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-700'}`}
            >
              {s === 'all' ? 'All' : s === 'in_review' ? 'In Review' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}

          {/* Active Special Filter Tag (Trending / Breaking / Featured) */}
          {specialFilter !== 'all' && (
            <span className="bg-rose-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
              Filter: <span className="capitalize">{specialFilter}</span>
              <button
                onClick={() => {
                  setSpecialFilter('all');
                  onNavigate('/admin/stories');
                }}
                className="hover:text-rose-200 font-black cursor-pointer text-sm leading-none ml-1"
                title="Clear special filter"
              >
                ×
              </button>
            </span>
          )}
        </div>

        {/* Section filter */}
        <div className="relative">
          <select
            value={sectionFilter}
            onChange={e => setSectionFilter(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 outline-none cursor-pointer focus:border-rose-400"
          >
            <option value="all">All Sections</option>
            {[...new Set(stories.map(s => s.section))].map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl px-5 py-3 flex items-center gap-4">
          <span className="text-sm font-semibold text-rose-800">{selected.size} selected</span>
          <button onClick={() => handleBulkStatus('published')} className="text-sm text-rose-700 hover:text-rose-900 font-medium cursor-pointer">Mark Published</button>
          <button onClick={() => handleBulkStatus('in_review')} className="text-sm text-rose-700 hover:text-rose-900 font-medium cursor-pointer">Send to Review</button>
          <button onClick={handleBulkDelete} className="text-sm text-rose-700 hover:text-rose-900 font-medium cursor-pointer ml-auto">Delete Selected</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <div className="text-gray-500 font-medium">No stories found</div>
            <div className="text-gray-400 text-sm mt-1">Try changing your filters or write a new story</div>
            <button
              onClick={() => onNavigate('/admin/stories/new')}
              className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-rose-700 transition-colors shadow-xs"
            >
              Write Story
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 text-left w-8">
                  <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={selectAll} className="rounded accent-rose-600" />
                </th>
                <th className="px-4 py-3 text-left">Headline</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Section</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Author</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left hidden xl:table-cell">Updated</th>
                <th className="px-4 py-3 text-left hidden xl:table-cell">Views</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(story => (
                <tr key={story.id} className="hover:bg-rose-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selected.has(story.id)} onChange={() => toggleSelect(story.id)} className="rounded accent-rose-600" />
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => onNavigate(`/admin/stories/${story.id}`)}
                      className="text-left cursor-pointer w-full"
                    >
                      <div className="font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">{story.headline}</div>
                      <div className="mt-1 flex items-center flex-wrap gap-1.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium capitalize ${TYPE_COLORS[story.type] || 'bg-gray-100 text-gray-600'}`}>
                          {story.type.replace('_', ' ')}
                        </span>
                        {story.status === 'scheduled' && story.scheduledDate && (
                          <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-purple-600" />
                            Scheduled: {new Date(story.scheduledDate).toLocaleString('hi-IN', { dateStyle: 'short', timeStyle: 'short' })}
                          </span>
                        )}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-gray-600 font-medium">{story.section}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-gray-600">{story.byline}</span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={story.status} />
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell text-gray-400 text-xs">
                    {story.status === 'scheduled' && story.scheduledDate ? (
                      <span className="text-purple-600 font-semibold">{new Date(story.scheduledDate).toLocaleString()}</span>
                    ) : story.updatedAt ? (
                      new Date(story.updatedAt).toLocaleDateString()
                    ) : (
                      'Recently'
                    )}
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell text-gray-500 text-sm">
                    {story.views > 0 ? story.views.toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {story.status === 'scheduled' && (
                        <button
                          onClick={() => {
                            updateStory(story.id, { status: 'published' });
                            toast.success('Story published live!');
                          }}
                          className="px-2.5 py-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer transition-colors shadow-2xs mr-1"
                          title="Publish Immediately"
                        >
                          Publish Now
                        </button>
                      )}
                      <button
                        onClick={() => onNavigate(`/admin/stories/${story.id}`)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onNavigate(`/news/${story.slug}`)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === story.id ? null : story.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {openMenuId === story.id && (
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-200 shadow-xl z-20">
                            <div className="py-1">
                              <button onClick={() => handleDuplicate(story)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><Copy className="w-3.5 h-3.5" /> Duplicate</button>
                              <button onClick={() => updateStory(story.id, { status: 'archived' })} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><Archive className="w-3.5 h-3.5" /> Archive</button>
                              <hr className="my-1 border-gray-100" />
                              <button onClick={() => handleDelete(story.id, story.headline)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
