/**
 * Bengali Smart Typing System - DOM Controller
 * Handles live input events, floating suggestions, SPACE & ENTER conversions.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./bengali-engine'], factory);
  } else if (typeof module === 'object' && module.exports) {
    const engine = require('./bengali-engine');
    module.exports = factory(engine);
  } else {
    root.BengaliInput = factory(root.BengaliEngine);
  }
}(typeof self !== 'undefined' ? self : this, function (Engine) {

  const engine = Engine || (typeof window !== 'undefined' ? window.BengaliEngine : null);
  const attachedInstances = new Map();

  class BengaliInputInstance {
    constructor(element, options = {}) {
      this.element = element;
      this.options = Object.assign({
        enabled: true,
        suggestion: true,
        convertOnSpace: true,
        convertOnEnter: true
      }, options);

      this.popupEl = null;
      this.currentWord = '';
      this.currentSuggestion = '';
      this.alternatives = [];
      this.selectedIndex = 0;

      this.init();
    }

    init() {
      this.createPopupUI();
      this.bindEvents();
    }

    createPopupUI() {
      if (document.getElementById('bengali-suggestion-popup-container')) {
        this.popupEl = document.getElementById('bengali-suggestion-popup-container');
        return;
      }
      this.popupEl = document.createElement('div');
      this.popupEl.id = 'bengali-suggestion-popup-container';
      this.popupEl.className = 'bengali-suggestion-popup';
      this.popupEl.style.display = 'none';
      document.body.appendChild(this.popupEl);
    }

    bindEvents() {
      this.handleInput = this.handleInput.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleBlur = this.handleBlur.bind(this);

      this.element.addEventListener('input', this.handleInput);
      this.element.addEventListener('keydown', this.handleKeyDown);
      this.element.addEventListener('blur', this.handleBlur);
    }

    destroy() {
      this.element.removeEventListener('input', this.handleInput);
      this.element.removeEventListener('keydown', this.handleKeyDown);
      this.element.removeEventListener('blur', this.handleBlur);
      this.hidePopup();
    }

    setEnabled(flag) {
      this.options.enabled = flag;
      if (!flag) this.hidePopup();
    }

    /**
     * Get active word before cursor/caret
     */
    getCurrentWord() {
      if (!this.element) return { word: '', start: 0, end: 0 };
      let text = '';
      let caretPos = 0;

      if (this.element.tagName === 'INPUT' || this.element.tagName === 'TEXTAREA') {
        text = this.element.value || '';
        caretPos = this.element.selectionStart || 0;
      } else if (this.element.isContentEditable) {
        text = this.element.innerText || '';
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          caretPos = selection.getRangeAt(0).startOffset;
        }
      }

      const textBeforeCaret = text.slice(0, caretPos);
      const match = textBeforeCaret.match(/([a-zA-Z\u0900-\u097F]+)$/);

      if (match) {
        const word = match[1];
        const start = caretPos - word.length;
        const end = caretPos;
        return { word, start, end };
      }

      return { word: '', start: caretPos, end: caretPos };
    }

    handleInput() {
      if (!this.options.enabled) return;

      const { word } = this.getCurrentWord();
      this.currentWord = word;

      if (word && word.length > 0 && this.options.suggestion && engine) {
        const sugg = engine.getBengaliSuggestion(word);
        this.currentSuggestion = sugg.primary;
        this.alternatives = sugg.alternatives || [sugg.primary];
        this.selectedIndex = 0;
        this.showPopup();
      } else {
        this.hidePopup();
      }
    }

    handleKeyDown(e) {
      if (!this.options.enabled) return;

      // Handle Space Key
      if (e.key === ' ' || e.keyCode === 32) {
        const { word, start, end } = this.getCurrentWord();
        if (word && this.options.convertOnSpace && engine) {
          e.preventDefault();
          const bengaliWord = this.alternatives[this.selectedIndex] || engine.getBengaliSuggestion(word).primary;
          this.replaceWord(bengaliWord, start, end, ' ');
          this.hidePopup();
        }
        return;
      }

      // Handle Enter Key
      if (e.key === 'Enter' || e.keyCode === 13) {
        const { word, start, end } = this.getCurrentWord();
        if (word && this.options.convertOnEnter && engine) {
          e.preventDefault();
          const bengaliWord = this.alternatives[this.selectedIndex] || engine.getBengaliSuggestion(word).primary;
          this.replaceWord(bengaliWord, start, end, '\n');
          this.hidePopup();
        }
        return;
      }

      // Handle Tab or Popup Navigation
      if (this.popupEl && this.popupEl.style.display !== 'none') {
        if (e.key === 'Tab') {
          e.preventDefault();
          const { word, start, end } = this.getCurrentWord();
          if (word) {
            const bengaliWord = this.alternatives[this.selectedIndex] || this.currentSuggestion;
            this.replaceWord(bengaliWord, start, end, '');
          }
          this.hidePopup();
          return;
        }

        if (e.key === 'Escape') {
          this.hidePopup();
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % this.alternatives.length;
          this.renderPopupContent();
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + this.alternatives.length) % this.alternatives.length;
          this.renderPopupContent();
          return;
        }
      }
    }

    handleBlur() {
      setTimeout(() => this.hidePopup(), 200);
    }

    replaceWord(replacement, start, end, appendChar = '') {
      if (this.element.tagName === 'INPUT' || this.element.tagName === 'TEXTAREA') {
        const val = this.element.value;
        const newText = val.slice(0, start) + replacement + appendChar + val.slice(end);
        this.element.value = newText;
        const newCaretPos = start + replacement.length + appendChar.length;
        this.element.setSelectionRange(newCaretPos, newCaretPos);

        // Dispatch input event to sync React / Vue state
        const event = new Event('input', { bubbles: true });
        this.element.dispatchEvent(event);
      }
    }

    showPopup() {
      if (!this.popupEl) return;
      this.renderPopupContent();

      const rect = this.element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      this.popupEl.style.top = `${rect.bottom + scrollTop + 6}px`;
      this.popupEl.style.left = `${rect.left + scrollLeft + 12}px`;
      this.popupEl.style.display = 'flex';
    }

    renderPopupContent() {
      if (!this.popupEl) return;
      let html = '';
      this.alternatives.forEach((alt, idx) => {
        const isActive = idx === this.selectedIndex;
        html += `<div class="bengali-suggestion-item ${isActive ? 'active' : ''}" data-idx="${idx}">${alt}</div>`;
      });
      html += `<div class="bengali-suggestion-hint"><span>[Space/Tab] Select</span><span>[Esc] Close</span></div>`;
      this.popupEl.innerHTML = html;

      // Bind click listeners
      const items = this.popupEl.querySelectorAll('.bengali-suggestion-item');
      items.forEach(item => {
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          const idx = parseInt(item.getAttribute('data-idx') || '0', 10);
          const selected = this.alternatives[idx] || this.currentSuggestion;
          const { word, start, end } = this.getCurrentWord();
          if (word) {
            this.replaceWord(selected, start, end, ' ');
          }
          this.hidePopup();
        });
      });
    }

    hidePopup() {
      if (this.popupEl) {
        this.popupEl.style.display = 'none';
      }
    }
  }

  // Public API
  return {
    attach(selectorOrEl, options) {
      const elements = typeof selectorOrEl === 'string'
        ? document.querySelectorAll(selectorOrEl)
        : [selectorOrEl];

      elements.forEach(el => {
        if (!attachedInstances.has(el)) {
          const inst = new BengaliInputInstance(el, options);
          attachedInstances.set(el, inst);
        }
      });
    },

    detach(selectorOrEl) {
      const elements = typeof selectorOrEl === 'string'
        ? document.querySelectorAll(selectorOrEl)
        : [selectorOrEl];

      elements.forEach(el => {
        if (attachedInstances.has(el)) {
          const inst = attachedInstances.get(el);
          inst.destroy();
          attachedInstances.delete(el);
        }
      });
    },

    toggle(selectorOrEl, enabled) {
      const elements = typeof selectorOrEl === 'string'
        ? document.querySelectorAll(selectorOrEl)
        : [selectorOrEl];

      elements.forEach(el => {
        if (attachedInstances.has(el)) {
          const inst = attachedInstances.get(el);
          inst.setEnabled(enabled);
        }
      });
    }
  };
}));
