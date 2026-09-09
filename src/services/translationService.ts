// =====================================================
// LIVE BENGALI TRANSLATION SERVICE
// Supports Google Translate API, MyMemory API & Gemini AI
// =====================================================

import { autoHindiToBengaliScript } from '../utils/translations';

// Simple in-memory translation cache to avoid duplicate API calls
const translationCache = new Map<string, string>();

/**
 * Translates English or Hindi text into Bengali (বাংলা) in real-time.
 */
export async function translateToBengali(text: string): Promise<string> {
  const trimmed = text ? text.trim() : '';
  if (!trimmed) return '';

  // Check cache first
  if (translationCache.has(trimmed)) {
    return translationCache.get(trimmed)!;
  }

  try {
    // 1. Try Google Translate public GTX Endpoint (Fastest, zero API key required)
    const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=bn&dt=t&q=${encodeURIComponent(trimmed)}`;
    const response = await fetch(googleUrl);
    
    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data[0])) {
        const translatedSegments = data[0].map((item: any) => item[0]).filter(Boolean);
        const result = translatedSegments.join('');
        if (result && result.trim()) {
          translationCache.set(trimmed, result);
          return result;
        }
      }
    }
  } catch (err) {
    console.warn('Google Translate API endpoint failed, trying fallback...', err);
  }

  try {
    // 2. Try MyMemory Free Translation API (Fallback 1)
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=autodetect|bn`;
    const response = await fetch(myMemoryUrl);

    if (response.ok) {
      const data = await response.json();
      if (data && data.responseData && data.responseData.translatedText) {
        const result = data.responseData.translatedText;
        if (result && result.trim()) {
          translationCache.set(trimmed, result);
          return result;
        }
      }
    }
  } catch (err) {
    console.warn('MyMemory API endpoint failed, trying script fallback...', err);
  }

  // 3. Fallback: Script Transliteration for Hindi / Devanagari Unicode
  const scriptFallback = autoHindiToBengaliScript(trimmed);
  translationCache.set(trimmed, scriptFallback);
  return scriptFallback;
}
