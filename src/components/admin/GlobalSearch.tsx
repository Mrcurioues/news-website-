import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Image, Users, X, ArrowRight, Clock } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'story' | 'media' | 'author' | 'section';
  title: string;
  subtitle?: string;
  href: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  stories?: Array<{ id: string; headline: string; section: string; status: string }>;
}

const QUICK_ACTIONS = [
  { label: 'Write Story', icon: <FileText className="w-4 h-4" />, href: '/admin/stories/new' },
  { label: 'Upload Media', icon: <Image className="w-4 h-4" />, href: '/admin/media' },
  { label: 'Manage Homepage', icon: <ArrowRight className="w-4 h-4" />, href: '/admin/homepage' },
];

const RECENT_SEARCHES = ['Breaking news', 'Cricket', 'Election 2024'];

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate, stories = [] }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelected(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected(s => s + 1);
      if (e.key === 'ArrowUp') setSelected(s => Math.max(0, s - 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const results: SearchResult[] = query.length > 1
    ? stories
        .filter(s => s.headline.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
        .map(s => ({
          id: s.id,
          type: 'story' as const,
          title: s.headline,
          subtitle: `${s.section} · ${s.status.replace('_', ' ')}`,
          href: `/admin/stories/${s.id}`,
        }))
    : [];

  const typeIcon: Record<string, React.ReactNode> = {
    story: <FileText className="w-4 h-4 text-blue-500" />,
    media: <Image className="w-4 h-4 text-purple-500" />,
    author: <Users className="w-4 h-4 text-green-500" />,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search stories, authors, sections, media…"
            className="flex-1 text-base outline-none text-gray-900 placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs cursor-pointer" onClick={onClose}>Esc</kbd>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {/* Results */}
          {results.length > 0 && (
            <div className="p-2">
              <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Results</div>
              {results.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => { onNavigate(r.href); onClose(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${selected === i ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  {typeIcon[r.type]}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{r.title}</div>
                    {r.subtitle && <div className="text-xs text-gray-500">{r.subtitle}</div>}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300" />
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {query.length > 1 && results.length === 0 && (
            <div className="py-8 text-center text-gray-500 text-sm">
              No results for "<strong>{query}</strong>"
            </div>
          )}

          {/* Default state */}
          {query.length <= 1 && (
            <div className="p-2 space-y-4">
              {/* Quick Actions */}
              <div>
                <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Actions</div>
                {QUICK_ACTIONS.map(a => (
                  <button
                    key={a.label}
                    onClick={() => { onNavigate(a.href); onClose(); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors cursor-pointer"
                  >
                    <span className="text-gray-400">{a.icon}</span>
                    <span className="text-sm text-gray-700">{a.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-300 ml-auto" />
                  </button>
                ))}
              </div>

              {/* Recent */}
              <div>
                <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Searches</div>
                {RECENT_SEARCHES.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-600">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
