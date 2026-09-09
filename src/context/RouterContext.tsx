import React, { createContext, useContext, useEffect, useState } from 'react';
import { TRANSLATIONS, TranslationDict } from '../utils/translations';
import { NavigationLoadingOverlay } from '../components/NavigationLoadingOverlay';

export type SupportedLanguage = 'hi' | 'en' | 'bn';

interface RouterContextType {
  path: string;
  search: string;
  navigate: (to: string) => void;
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  t: TranslationDict;
  isNavigating: boolean;
  updateMetadata: (meta: { title: string; description?: string; ogImage?: string }) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>(() => window.location.pathname || '/');
  const [search, setSearch] = useState<string>(() => window.location.search || '');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [lang, setLangState] = useState<SupportedLanguage>('bn');

  const setLang = (newLang: SupportedLanguage) => {
    setLangState(newLang);
    try {
      localStorage.setItem('bharat_samachar_lang', newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch (e) {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    const handlePopState = () => {
      setIsNavigating(true);
      setPath(window.location.pathname || '/');
      setSearch(window.location.search || '');
      setTimeout(() => setIsNavigating(false), 300);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith('http://') || to.startsWith('https://')) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }

    const [newPath, newQuery] = to.split('?');
    const normalizedPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
    const normalizedSearch = newQuery ? `?${newQuery}` : '';

    if (normalizedPath === path && normalizedSearch === search) {
      return;
    }

    // Trigger smooth shadow loading screen transition
    setIsNavigating(true);
    window.history.pushState({}, '', normalizedPath + normalizedSearch);
    setPath(normalizedPath);
    setSearch(normalizedSearch);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setIsNavigating(false);
    }, 450);
  };

  const updateMetadata = ({ title, description, ogImage }: { title: string; description?: string; ogImage?: string }) => {
    const suffix = lang === 'en' ? 'Bharat News LIVE' : 'भारत समाचार LIVE';
    document.title = title.includes('Bharat') ? title : `${title} | ${suffix}`;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    if (ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (!ogImg) {
        ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute('content', ogImage);
    }
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.hi;

  return (
    <RouterContext.Provider value={{ path, search, navigate, lang, setLang, t, isNavigating, updateMetadata }}>
      <NavigationLoadingOverlay isLoading={isNavigating} targetPath={path} />
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return {
    push: ctx.navigate,
    path: ctx.path,
    pathname: ctx.path,
    search: ctx.search,
    lang: ctx.lang,
    setLang: ctx.setLang,
    t: ctx.t,
    isNavigating: ctx.isNavigating,
    updateMetadata: ctx.updateMetadata
  };
}

export function usePathname(): string {
  const { path } = useRouter();
  return path;
}

export function useSearchParams(): URLSearchParams {
  const { search } = useRouter();
  return new URLSearchParams(search);
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  key?: React.Key;
}

export function Link(props: LinkProps) {
  const { href, children, className = '', onClick, ...rest } = props;
  const { push } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey)) {
      e.preventDefault();
      push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
