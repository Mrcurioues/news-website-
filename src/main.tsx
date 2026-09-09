// Ensure window.fetch is safely assignable in sandboxed or preview iframe environments
(function ensureSafeFetch() {
  if (typeof window !== 'undefined') {
    try {
      const orig = typeof window.fetch === 'function' ? window.fetch.bind(window) : null;
      let activeFetch = orig;
      const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
      if (!desc || (!desc.set && desc.configurable)) {
        Object.defineProperty(window, 'fetch', {
          get() {
            return activeFetch;
          },
          set(v) {
            activeFetch = typeof v === 'function' ? v : orig;
          },
          configurable: true,
          enumerable: true,
        });
      }
    } catch {
      // Ignore
    }
  }
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
