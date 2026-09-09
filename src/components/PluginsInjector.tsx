import React, { useEffect } from 'react';
import { usePluginsStore } from '../stores/pluginsStore';

export const PluginsInjector: React.FC = () => {
  const { plugins } = usePluginsStore();

  const activePlugins = plugins.filter((p) => p.isInstalled && p.isActive);

  useEffect(() => {
    // 1. Inject combined CSS from all active plugins (Store + Custom Uploaded)
    const styleId = 'newsroom-active-plugins-styles';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;

    const cssBlocks = activePlugins
      .map((p) => {
        const css = p.settings?.customCss || p.settings?.cssCode || p.settings?.stylesheet || '';
        return css ? `/* Plugin: ${p.name} */\n${css}` : '';
      })
      .filter(Boolean)
      .join('\n\n');

    if (cssBlocks.trim()) {
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = cssBlocks;
    } else if (styleTag) {
      styleTag.remove();
    }

    // 2. Inject header/footer scripts from active plugins
    const scriptId = 'newsroom-active-plugins-scripts';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    const jsBlocks = activePlugins
      .map((p) => {
        const js = p.settings?.headerScripts || p.settings?.customJs || p.settings?.scriptCode || '';
        return js ? `/* Plugin Script: ${p.name} */\ntry { ${js} } catch (e) { console.error('Plugin Execution Error [${p.name}]:', e); }` : '';
      })
      .filter(Boolean)
      .join('\n\n');

    if (jsBlocks.trim()) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        document.head.appendChild(scriptTag);
      }
      scriptTag.innerHTML = jsBlocks;
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [activePlugins]);

  return null;
};
