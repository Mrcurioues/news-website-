import React, { useEffect, useState } from 'react';
import { MessageSquare, CheckCircle, XCircle, Flag, Ban, AlertTriangle, ExternalLink, User, Mail, Globe, Tag, History, Database } from 'lucide-react';
import { useCommentsStore, CommentItem } from '../../stores/commentsStore';
import { isSupabaseConfigured } from '../../services/supabase';

const TABS = ['pending', 'approved', 'spam', 'rejected'] as const;
type TabType = typeof TABS[number];

export const CommentsPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const { comments, updateStatus, deleteComment, fetchComments } = useCommentsStore();
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const filtered = comments.filter(c => c.status === activeTab);
  const counts = TABS.reduce((acc, t) => ({ ...acc, [t]: comments.filter(c => c.status === t).length }), {} as Record<TabType, number>);

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comments Moderation & Management</h1>
          <p className="text-sm text-gray-500 mt-1">Review user comments with detailed article context, author metadata, and action controls.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${isSupabaseConfigured() ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
            <Database className="w-3.5 h-3.5" />
            {isSupabaseConfigured() ? 'Supabase Realtime Sync Connected' : 'Local Demo Store (Supabase Table Ready)'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer capitalize border-b-2 -mb-px ${activeTab === tab ? 'border-gray-900 text-gray-900 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
            {counts[tab] > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tab === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                {counts[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-14 bg-white border border-gray-200 rounded-xl text-gray-400">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <div className="text-sm font-medium">No comments in {activeTab} status</div>
          </div>
        ) : (
          filtered.map(comment => (
            <div key={comment.id} className={`bg-white border rounded-xl p-5 shadow-xs transition-all ${comment.isToxic ? 'border-rose-300 bg-rose-50/20' : 'border-gray-200'}`}>
              
              {/* Article Header Context */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                    <Tag className="w-3 h-3" /> {comment.storyCategory}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">Article:</span>
                  <button
                    onClick={() => onNavigate(`/news/${comment.storySlug}`)}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-600 truncate text-left inline-flex items-center gap-1 cursor-pointer group"
                    title={comment.storyTitle}
                  >
                    <span>{comment.storyTitle}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 text-blue-600 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Comment Content & Author Meta */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-xs">
                    {comment.authorName[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-gray-400" /> {comment.authorName}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" /> {comment.authorEmail}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-gray-400" /> {comment.location} ({comment.ipAddress})
                      </span>
                      {comment.isToxic && (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" /> Potentially Toxic
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-800 mt-2 bg-gray-50/70 p-3 rounded-lg border border-gray-100 leading-relaxed font-normal">
                      "{comment.content}"
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>Posted {comment.createdAt}</span>
                      <span>•</span>
                      <span className="capitalize font-medium text-gray-600">Status: {comment.status}</span>
                      {comment.actionLog && comment.actionLog.length > 0 && (
                        <>
                          <span>•</span>
                          <button
                            onClick={() => setExpandedLogId(expandedLogId === comment.id ? null : comment.id)}
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline cursor-pointer font-medium"
                          >
                            <History className="w-3 h-3" /> Action History ({comment.actionLog.length})
                          </button>
                        </>
                      )}
                    </div>

                    {expandedLogId === comment.id && comment.actionLog && (
                      <div className="mt-3 bg-gray-900 text-gray-200 text-xs p-3 rounded-lg space-y-1 font-mono">
                        <div className="font-bold text-emerald-400 mb-1 border-b border-gray-800 pb-1">Supabase Realtime Moderation Audit Table:</div>
                        {comment.actionLog.map((log, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-gray-500">[{idx + 1}]</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex flex-col sm:flex-row gap-2 shrink-0 self-start">
                  {comment.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(comment.id, 'approved')}
                      className="flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg cursor-pointer font-semibold transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  {comment.status !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(comment.id, 'rejected')}
                      className="flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 rounded-lg cursor-pointer font-semibold transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                  {comment.status !== 'spam' && (
                    <button
                      onClick={() => updateStatus(comment.id, 'spam')}
                      className="flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg cursor-pointer font-semibold transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5" /> Flag Spam
                    </button>
                  )}
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-lg cursor-pointer font-semibold transition-colors"
                  >
                    <Ban className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
