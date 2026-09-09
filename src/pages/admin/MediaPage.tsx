import React, { useState } from 'react';
import { Upload, Search, Grid, List, Video, X, ExternalLink, Trash2, Stamp } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMediaStore } from '../../stores/mediaStore';
import { useAuthStore } from '../../stores/authStore';
import { usePluginsStore } from '../../stores/pluginsStore';

interface MediaPageProps {
  onNavigate: (path: string) => void;
}

export const MediaPage: React.FC<MediaPageProps> = () => {
  const { items, addItem, uploadFile, deleteItem, fetchFromSupabase } = useMediaStore();
  const { user } = useAuthStore();
  const { plugins } = usePluginsStore();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(null);

  const watermarkPlugin = plugins.find((p) => p.id === 'watermark-image-compressor');
  const isWatermarkActive = watermarkPlugin?.isInstalled && watermarkPlugin?.isActive;

  React.useEffect(() => {
    fetchFromSupabase();
  }, []);

  const filtered = items.filter(m => {
    const matchSearch = m.filename.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || m.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const toastId = toast.loading(`Uploading ${files.length} file(s) to Supabase Storage…`);

    for (const file of Array.from(files)) {
      await uploadFile(file as File, user.name);
    }

    if (isWatermarkActive) {
      toast.success(`Uploaded ${files.length} file(s)! Logo watermark applied & compressed to WebP!`, { id: toastId });
    } else {
      toast.success(`Uploaded ${files.length} file(s) to Supabase Storage!`, { id: toastId });
    }
  };

  const handleDelete = (id: string, filename: string) => {
    deleteItem(id);
    toast.success(`Deleted ${filename}`);
    setSelectedItem(null);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Image URL copied to clipboard!');
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Watermark Plugin Active Banner */}
      {isWatermarkActive && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2 font-medium">
            <Stamp className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Media Watermark & WebP Plugin Active:</strong> All uploaded photos will automatically receive a transparent Bharat Samachar logo watermark and WebP optimization.</span>
          </div>
          <span className="bg-emerald-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded shrink-0">Active</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} total items</p>
        </div>
        <label
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4" /> Upload Files
          <input type="file" multiple accept="image/*,video/*,.pdf" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => { e.preventDefault(); setIsDragging(false); }}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${isDragging ? 'border-rose-400 bg-rose-50' : 'border-gray-200 bg-white hover:border-rose-300 hover:bg-rose-50/20'}`}
      >
        <Upload className={`w-8 h-8 mx-auto mb-3 ${isDragging ? 'text-rose-600' : 'text-gray-300'}`} />
        <div className="text-sm font-medium text-gray-700">Drop images or videos here to upload</div>
        <div className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP, MP4 up to 50MB each</div>
      </div>

      {/* Filters + View Toggle */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search media..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-400"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'image', 'video', 'document'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer capitalize ${typeFilter === t ? 'bg-rose-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5 ml-auto">
          <button onClick={() => setView('grid')} className={`p-2 rounded cursor-pointer ${view === 'grid' ? 'bg-white shadow-sm' : 'text-gray-400'}`}><Grid className="w-4 h-4" /></button>
          <button onClick={() => setView('list')} className={`p-2 rounded cursor-pointer ${view === 'list' ? 'bg-white shadow-sm' : 'text-gray-400'}`}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md hover:border-rose-300 transition-all group"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                {item.usedInStories.length === 0 && (
                  <span className="absolute top-2 right-2 bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">Unused</span>
                )}
              </div>
              <div className="p-2 flex items-center justify-between">
                <div className="text-xs font-semibold text-gray-500 uppercase">{item.type}</div>
                <div className="text-xs text-gray-400">{formatSize(item.size)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-5 py-3 text-left">File</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Type</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Size</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Uploaded by</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-left">Used in</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-rose-50/30 cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <td className="px-5 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      {item.type === 'image' ? <img src={item.url} alt={item.altText} className="w-full h-full object-cover" /> : <Video className="w-5 h-5 text-gray-400 m-2.5" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate max-w-48">{item.filename}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="capitalize text-gray-500">{item.type}</span></td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500">{formatSize(item.size)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-500">{item.uploadedBy}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">{new Date(item.uploadedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{item.usedInStories.length} stories</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={e => { e.stopPropagation(); handleCopyUrl(item.url); }} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"><ExternalLink className="w-3.5 h-3.5" /></button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(item.id, item.filename); }} className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{selectedItem.filename}</h3>
              <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-gray-700 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex">
              <div className="flex-1 bg-gray-50 p-4">
                {selectedItem.type === 'image' && <img src={selectedItem.url} alt={selectedItem.altText} className="w-full rounded-lg" />}
              </div>
              <div className="w-60 p-5 border-l border-gray-100 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase">Alt Text</label>
                  <input type="text" defaultValue={selectedItem.altText} className="w-full mt-1 text-sm text-gray-700 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-rose-400" />
                </div>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div><span className="font-medium text-gray-700">Size:</span> {formatSize(selectedItem.size)}</div>
                  <div><span className="font-medium text-gray-700">Uploaded:</span> {new Date(selectedItem.uploadedAt).toLocaleDateString()}</div>
                  <div><span className="font-medium text-gray-700">By:</span> {selectedItem.uploadedBy}</div>
                  <div><span className="font-medium text-gray-700">Used in:</span> {selectedItem.usedInStories.length} stories</div>
                </div>
                <div className="space-y-2">
                  <button onClick={() => handleCopyUrl(selectedItem.url)} className="w-full text-center text-sm text-rose-600 hover:text-rose-800 font-semibold cursor-pointer">Copy URL</button>
                  <button onClick={() => handleDelete(selectedItem.id, selectedItem.filename)} className="w-full text-center text-sm text-gray-500 hover:text-gray-700 font-medium cursor-pointer">Delete Item</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
