import React, { useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';

/**
 * Custom hook to enforce global article content protection.
 * Protects content within containers with `.article-content` or `.protected-article-content`.
 * Automatically excludes form input controls and admin/editor routes.
 */
export function useArticleProtection() {
  const showProtectionAlert = useCallback((target?: EventTarget | null) => {
    // Calculate middle position of the article container on screen
    const articleEl = (target && target instanceof HTMLElement ? target.closest('.article-content, .protected-article-content') : null) 
      || document.querySelector('.article-content, .protected-article-content');

    let stylePos: React.CSSProperties = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };

    if (articleEl) {
      const rect = articleEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, window.innerHeight);
      const centerY = visibleTop > visibleBottom ? rect.top + rect.height / 2 : (visibleTop + visibleBottom) / 2;

      stylePos = {
        position: 'fixed',
        top: `${centerY}px`,
        left: `${centerX}px`,
        transform: 'translate(-50%, -50%)'
      };
    }

    toast.custom(
      (t) => (
        <div
          style={stylePos}
          className={`${
            t.visible ? 'animate-enter opacity-100 scale-100' : 'animate-leave opacity-0 scale-95'
          } transition-all duration-200 z-[99999] px-6 py-3 bg-rose-100/95 border border-rose-300/90 shadow-2xl rounded-2xl pointer-events-auto flex items-center justify-center gap-3 text-rose-950 font-sans min-w-[280px] max-w-sm text-center`}
          role="alert"
          aria-live="assertive"
        >
          <span className="text-lg">⚠️</span>
          <div className="text-xs sm:text-sm font-semibold whitespace-nowrap">
            <span className="font-extrabold uppercase mr-1.5 text-rose-900">
              ALERT:
            </span>
            <span>
              Content is protected !!
            </span>
          </div>
        </div>
      ),
      {
        id: 'article-protection-toast', // Prevents duplicate stacked toasts
        duration: 2500,
        position: 'top-center',
      }
    );
  }, []);

  useEffect(() => {
    // Helper function to verify if an element is an editable/form control or within admin
    const isExcludedElement = (target: EventTarget | null): boolean => {
      if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/wp-admin')) {
        return true;
      }
      if (!target || !(target instanceof HTMLElement)) return false;

      const tag = target.tagName.toLowerCase();
      if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        target.isContentEditable ||
        target.closest('input, textarea, select, [contenteditable="true"], .no-protection')
      ) {
        return true;
      }
      return false;
    };

    // Helper function to test if event occurred inside an article container
    const isInsideArticleContent = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof HTMLElement)) return false;
      return Boolean(target.closest('.article-content, .protected-article-content'));
    };

    // Handle Copy & Cut events
    const handleCopyCut = (e: ClipboardEvent) => {
      if (isExcludedElement(e.target)) return;

      if (isInsideArticleContent(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionAlert(e.target);
      }
    };

    // Handle Right Click (context menu) events
    const handleContextMenu = (e: MouseEvent) => {
      if (isExcludedElement(e.target)) return;

      if (isInsideArticleContent(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionAlert(e.target);
      }
    };

    // Handle Keyboard Shortcuts (Ctrl+C, Cmd+C, Ctrl+X, Cmd+X, Ctrl+A, Cmd+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExcludedElement(e.target)) return;

      const isModifier = e.ctrlKey || e.metaKey;
      if (!isModifier) return;

      const key = e.key.toLowerCase();
      if (key === 'c' || key === 'x' || key === 'a') {
        const activeElement = document.activeElement;
        if (isExcludedElement(activeElement)) return;

        // Check if focus or selection is inside protected article
        const selection = window.getSelection();
        let targetInside = isInsideArticleContent(e.target);

        if (!targetInside && selection && selection.rangeCount > 0) {
          const anchorNode = selection.anchorNode;
          const parentEl = anchorNode?.nodeType === Node.ELEMENT_NODE ? (anchorNode as HTMLElement) : anchorNode?.parentElement;
          if (parentEl && isInsideArticleContent(parentEl)) {
            targetInside = true;
          }
        }

        if (targetInside) {
          e.preventDefault();
          e.stopPropagation();
          showProtectionAlert(e.target);
        }
      }
    };

    // Handle Text Selection attempt events
    const handleSelectStart = (e: Event) => {
      if (isExcludedElement(e.target)) return;

      if (isInsideArticleContent(e.target)) {
        // Block text selection start inside protected article body
        const target = e.target as HTMLElement;
        if (!isExcludedElement(target)) {
          // CSS handles user-select: none, and event listener catches dragging selection
        }
      }
    };

    document.addEventListener('copy', handleCopyCut, true);
    document.addEventListener('cut', handleCopyCut, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('selectstart', handleSelectStart, true);

    return () => {
      document.removeEventListener('copy', handleCopyCut, true);
      document.removeEventListener('cut', handleCopyCut, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
    };
  }, [showProtectionAlert]);
}
