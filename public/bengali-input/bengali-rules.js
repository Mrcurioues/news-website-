/**
 * Bengali Smart Typing System - Phonetic Rules & Devanagari Mapping
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BengaliRules = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  
  // 1. DEVANAGARI TO BENGALI SCRIPT DIRECT MAPPING
  const DEVANAGARI_TO_BENGALI_MAP = {
    // Vowels
    'अ': 'অ', 'आ': 'আ', 'इ': 'ই', 'ई': 'ঈ', 'उ': 'উ', 'ऊ': 'ঊ',
    'ऋ': 'ঋ', 'ए': 'এ', 'ऐ': 'ঐ', 'ओ': 'ও', 'औ': 'ঔ',
    
    // Matras
    'ा': 'া', 'ि': 'ি', 'ी': 'ী', 'ु': 'ু', 'ू': 'ূ',
    'ृ': 'ৃ', 'े': 'ে', 'ै': 'ৈ', 'ो': 'ো', 'ौ': 'ৌ',
    
    // Consonants
    'क': 'ক', 'ख': 'খ', 'ग': 'গ', 'घ': 'ঘ', 'ङ': 'ঙ',
    'च': 'চ', 'छ': 'ছ', 'ज': 'জ', 'झ': 'ঝ', 'ञ': 'ঞ',
    'ट': 'ট', 'ठ': 'ঠ', 'ड': 'ড', 'ढ': 'ঢ', 'ण': 'ণ',
    'त': 'ত', 'थ': 'থ', 'द': 'দ', 'ध': 'ধ', 'न': 'ন',
    'प': 'প', 'फ': 'ফ', 'ब': 'ব', 'भ': 'ভ', 'म': 'ম',
    'य': 'য', 'र': 'র', 'ल': 'ল', 'व': 'ব', 'श': 'শ',
    'ष': 'ষ', 'स': 'স', 'ह': 'হ', 'ळ': 'ল', 'क्ष': 'ক্ষ',
    'त्र': 'ত্র', 'ज्ञ': 'জ্ঞ',
    
    // Modifiers & Signs
    '़': '়', '्': '্', 'ं': 'ং', 'ँ': 'ঁ', 'ः': 'ঃ',
    
    // Digits
    '०': '০', '१': '১', '२': '২', '३': '৩', '४': '৪',
    '५': '৫', '६': '৬', '७': '৭', '८': '৮', '९': '৯'
  };

  // 2. ROMAN TO BENGALI PHONETIC RULES
  
  // Vowels (Independent when at word start, Matra when after consonant)
  const VOWELS_INDEPENDENT = {
    "a": "অ", "aa": "আ", "i": "ই", "ii": "ঈ", "ee": "ঈ",
    "u": "উ", "uu": "ঊ", "oo": "ঊ", "r": "ঋ", "e": "এ",
    "oi": "ঐ", "ai": "ঐ", "o": "ও", "ou": "ঔ", "au": "ঔ"
  };

  const VOWELS_MATRA = {
    "a": "", "aa": "া", "i": "ি", "ii": "ী", "ee": "ী",
    "u": "ু", "uu": "ূ", "oo": "ূ", "r": "ৃ", "e": "ে",
    "oi": "ৈ", "ai": "ৈ", "o": "ো", "ou": "ৌ", "au": "ৌ"
  };

  // Consonants & Conjuncts (Longer prefixes first to ensure correct greedy match)
  const CONSONANTS = [
    { pattern: "kkh", char: "ক্ষ" },
    { pattern: "kch", char: "ক্চ" },
    { pattern: "kkt", char: "ক্ত" },
    { pattern: "ggy", char: "জ্ঞ" },
    { pattern: "chh", char: "ছ" },
    { pattern: "sch", char: "শ্চ" },
    { pattern: "shch", char: "শ্চ" },
    { pattern: "shth", char: "ষ্ঠ" },
    { pattern: "shth", char: "ষ্ঠ" },
    { pattern: "ndh", char: "ন্ধ" },
    { pattern: "nch", char: "ঞ্চ" },
    { pattern: "njh", char: "ঞ্ছ" },
    { pattern: "mph", char: "ম্ফ" },
    { pattern: "mbh", char: "ম্ভ" },

    { pattern: "kh", char: "খ" },
    { pattern: "gh", char: "ঘ" },
    { pattern: "ng", char: "ঙ" },
    { pattern: "ch", char: "চ" },
    { pattern: "jh", char: "ঝ" },
    { pattern: "th", char: "থ" },
    { pattern: "dh", char: "ধ" },
    { pattern: "ph", char: "ফ" },
    { pattern: "bh", char: "ভ" },
    { pattern: "sh", char: "শ" },
    { pattern: "ss", char: "ষ" },
    { pattern: "rh", char: "ড়" },
    { pattern: "tr", char: "ত্র" },

    { pattern: "k", char: "ক" },
    { pattern: "g", char: "গ" },
    { pattern: "j", char: "জ" },
    { pattern: "t", char: "ট" },
    { pattern: "d", char: "ড" },
    { pattern: "n", char: "ন" },
    { pattern: "p", char: "প" },
    { pattern: "b", char: "ব" },
    { pattern: "m", char: "ম" },
    { pattern: "r", char: "র" },
    { pattern: "l", char: "ল" },
    { pattern: "s", char: "স" },
    { pattern: "h", char: "হ" },
    { pattern: "y", char: "য়" },
    { pattern: "w", char: "ওয়" },
    { pattern: "v", char: "ভ" },
    { pattern: "z", char: "জ" },
    { pattern: "x", char: "ক্স" }
  ];

  return {
    DEVANAGARI_TO_BENGALI_MAP,
    VOWELS_INDEPENDENT,
    VOWELS_MATRA,
    CONSONANTS
  };
}));
