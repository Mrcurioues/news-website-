/**
 * Bengali Smart Typing System - Transliteration Engine
 * Handles Roman->Bengali phonetic transliteration and Devanagari->Bengali script mapping.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./bengali-rules', './bengali-dictionary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    const rules = require('./bengali-rules');
    const dict = require('./bengali-dictionary');
    module.exports = factory(rules, dict);
  } else {
    root.BengaliEngine = factory(root.BengaliRules, root.BengaliDictionary);
  }
}(typeof self !== 'undefined' ? self : this, function (Rules, Dictionary) {

  const rules = Rules || (typeof window !== 'undefined' ? window.BengaliRules : null);
  const dictionary = Dictionary || (typeof window !== 'undefined' ? window.BengaliDictionary : {});

  // Caching for performance
  const transliterationCache = new Map();

  /**
   * Convert Devanagari text to Bengali script
   */
  function transliterateDevanagariToBengali(text) {
    if (!text) return '';
    const map = rules ? rules.DEVANAGARI_TO_BENGALI_MAP : {};
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result += map[char] || char;
    }
    return result;
  }

  /**
   * Phonetic transliteration from Roman/English letters to Bengali
   */
  function transliterateRomanToBengali(word) {
    if (!word) return '';
    const lower = word.toLowerCase();

    // Check cache
    if (transliterationCache.has(lower)) {
      return transliterationCache.get(lower);
    }

    // Check dictionary priority
    if (dictionary && dictionary[lower]) {
      const dictResult = dictionary[lower];
      transliterationCache.set(lower, dictResult);
      return dictResult;
    }

    const { VOWELS_INDEPENDENT, VOWELS_MATRA, CONSONANTS } = rules;
    let result = '';
    let i = 0;
    let isPrevConsonant = false;

    while (i < lower.length) {
      // 1. Try Consonants greedy match
      let matchedConsonant = null;
      for (const item of CONSONANTS) {
        if (lower.startsWith(item.pattern, i)) {
          matchedConsonant = item;
          break;
        }
      }

      if (matchedConsonant) {
        // If previous character was also a consonant without vowel in between, add virama/hasanta ्
        if (isPrevConsonant) {
          result += '্';
        }
        result += matchedConsonant.char;
        i += matchedConsonant.pattern.length;
        isPrevConsonant = true;
        continue;
      }

      // 2. Try Vowels match
      let matchedVowelPattern = null;
      let matchedVowelChar = null;

      const vowelKeys = ['aa', 'ii', 'uu', 'ee', 'oi', 'ai', 'ou', 'au', 'oo', 'a', 'i', 'u', 'e', 'o', 'r'];
      for (const vk of vowelKeys) {
        if (lower.startsWith(vk, i)) {
          matchedVowelPattern = vk;
          matchedVowelChar = isPrevConsonant ? VOWELS_MATRA[vk] : VOWELS_INDEPENDENT[vk];
          break;
        }
      }

      if (matchedVowelPattern !== null) {
        result += matchedVowelChar !== undefined ? matchedVowelChar : '';
        i += matchedVowelPattern.length;
        isPrevConsonant = false;
        continue;
      }

      // 3. Fallback for non-alphabetic / punctuation / digits
      const ch = lower[i];
      result += ch;
      i++;
      isPrevConsonant = false;
    }

    result = result.replace(/্+$/g, '');
    transliterationCache.set(lower, result);
    return result;
  }

  /**
   * Get primary suggestion and alternatives for a given input word
   */
  function getBengaliSuggestion(word) {
    if (!word || !word.trim()) return { primary: '', alternatives: [] };
    const cleanWord = word.trim();

    // Check if input contains Devanagari script
    if (/[\u0900-\u097F]/.test(cleanWord)) {
      const devResult = transliterateDevanagariToBengali(cleanWord);
      return { primary: devResult, alternatives: [devResult] };
    }

    // Check dictionary first
    const lower = cleanWord.toLowerCase();
    if (dictionary && dictionary[lower]) {
      const primary = dictionary[lower];
      const phonetic = transliterateRomanToBengali(lower);
      const alternatives = primary !== phonetic ? [primary, phonetic] : [primary];
      return { primary, alternatives };
    }

    // Phonetic fallback
    const primary = transliterateRomanToBengali(cleanWord);
    return { primary, alternatives: [primary] };
  }

  return {
    transliterateDevanagariToBengali,
    transliterateRomanToBengali,
    getBengaliSuggestion
  };
}));
