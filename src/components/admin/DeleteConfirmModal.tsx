import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  articleTitle: string;
  articleId: string;
  onConfirm: () => void;
  onCancel: () => void;
  lang?: 'hi' | 'hinglish' | 'en';
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  articleTitle,
  articleId,
  onConfirm,
  onCancel,
  lang = 'hi'
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="delete-confirm-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="delete-confirm-modal-box"
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-gray-900 leading-snug">
              {lang === 'hi'
                ? 'आर्टिकल डिलीट करने की पुष्टि (Confirm Delete)'
                : 'Confirm Post Deletion'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'hi'
                ? 'WordPress सुरक्षा दिशानिर्देश: किसी भी सामग्री को हटाने से पहले पुष्टि आवश्यक है।'
                : 'WordPress safety guideline: Explicit confirmation is required before permanent removal.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 p-3.5 bg-rose-50/70 rounded-xl border border-rose-100 text-xs text-rose-900">
          <div className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
            "{articleTitle}"
          </div>
          <div className="text-[11px] text-gray-500 font-mono">
            ID: {articleId}
          </div>
          <div className="mt-2 text-rose-700 font-medium">
            ⚠️ {lang === 'hi'
              ? 'यह आर्टिकल डेटाबेस और पोर्टल से हटा दिया जाएगा। क्या आप वाकई आगे बढ़ना चाहते हैं?'
              : 'This post will be permanently removed from the portal and database.'}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            id="cancel-delete-button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-colors"
          >
            {lang === 'hi' ? 'रद्द करें (Cancel)' : 'Cancel'}
          </button>
          <button
            type="button"
            id="confirm-delete-button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-rose-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>{lang === 'hi' ? 'हां, डिलीट करें (Delete)' : 'Yes, Delete Post'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
