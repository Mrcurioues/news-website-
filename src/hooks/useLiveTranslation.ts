import { useState, useEffect } from 'react';
import { translateToBengali } from '../services/translationService';

export function useLiveTranslation(sourceText: string, debounceMs: number = 350) {
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sourceText || !sourceText.trim()) {
      setTranslatedText('');
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);

    const handler = setTimeout(async () => {
      try {
        const result = await translateToBengali(sourceText);
        setTranslatedText(result);
        setError(null);
      } catch (err) {
        console.error('Live translation error:', err);
        setError('Translation unavailable');
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [sourceText, debounceMs]);

  return { translatedText, isLoading, error };
}
