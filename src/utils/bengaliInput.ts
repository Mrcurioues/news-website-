// =====================================================
// BENGALI SMART TYPING MODULE FOR REACT & DOM
// 100% Offline Transliteration & Smart Typing System
// =====================================================

import { autoHindiToBengaliScript } from './translations';

// Common Dictionary Mappings
const BENGALI_DICT: Record<string, string> = {
  ami: 'আমি',
  amar: 'আমার',
  amake: 'আমাকে',
  amader: 'আমাদের',
  tumi: 'তুমি',
  tomar: 'তোমার',
  tomake: 'তোমাকে',
  tomader: 'তোমাদের',
  se: 'সে',
  tar: 'তার',
  take: 'তাকে',
  tader: 'তাদের',
  tini: 'তিনি',
  tanr: 'তাঁর',
  apni: 'আপনি',
  apnar: 'আপনার',
  apnake: 'আপনাকে',
  e: 'এ',
  ei: 'এই',
  eikhane: 'এখানে',
  ota: 'ওটা',
  shob: 'সব',
  shobai: 'সবাই',
  ekhon: 'এখন',
  tokhon: 'তখন',
  kokhon: 'কখন',
  kothay: 'কোথায়',
  keno: 'কেন',
  ki: 'কী',
  kee: 'কী',
  kon: 'কোন',
  konta: 'কোনটা',
  naki: 'নাকি',
  jodi: 'যদি',
  tobe: 'তবে',
  kintu: 'কিন্তু',
  ebong: 'এবং',
  othoba: 'অথবা',
  ba: 'বা',
  aar: 'আর',
  ar: 'আর',
  na: 'না',
  ha: 'হ্যাঁ',
  haa: 'হ্যাঁ',
  bhalo: 'ভালো',
  bhalobashi: 'ভালোবাসি',
  bhalobasha: 'ভালোবাসা',
  kemon: 'কেমন',
  ache: 'আছে',
  achi: 'আছি',
  acho: 'আছো',
  achen: 'আছেন',
  nei: 'নেই',
  likhi: 'লিখি',
  likha: 'লেখা',
  dekhi: 'দেখি',
  dekha: 'দেখা',
  jao: 'যাও',
  jabo: 'যাব',
  jaowa: 'যাওয়া',
  kori: 'করি',
  kora: 'করা',
  koro: 'করো',
  koren: 'করেন',
  boli: 'বলি',
  bola: 'বলা',
  bolo: 'বলো',
  shuni: 'শুনি',
  shona: 'শোনা',
  hobe: 'হবে',
  hoche: 'হচ্ছে',
  hoyeche: 'হয়েছে',
  bangla: 'বাংলা',
  bangladesh: 'বাংলাদেশ',
  bharat: 'ভারত',
  desh: 'দেশ',
  bhasha: 'ভাষা',
  somoy: 'সময়',
  shongbad: 'সংবাদ',
  potrika: 'পত্রিকা',
  sompadok: 'সম্পাদক',
  khobor: 'খবর',
  kolkata: 'কলকাতা',
  dhaka: 'ঢাকা',
  manush: 'মানুষ',
  bondu: 'বন্ধু',
  bondhu: 'বন্ধু',
  ghor: 'ঘর',
  bari: 'বাড়ি',
  chobi: 'ছবি',
  gaan: 'গান',
  kobita: 'কবিতা',
  bohi: 'বই',
  boi: 'বই',
  naam: 'নাম',
  kaaj: 'কাজ',
  kaj: 'কাজ',
  chele: 'ছেলে',
  meye: 'মেয়ে',
  din: 'দিন',
  raat: 'রাত',
  shokal: 'সকাল',
  bochor: 'বছর',
  paisha: 'পয়সা',
  bazar: 'বাজার',
  akash: 'আকাশ',
  phool: 'ফুল',
  ful: 'ফুল',
  fal: 'ফল',
  cha: 'চা',
  dudh: 'দুধ',
  shohor: 'শহর',
  gram: 'গ্রাম',
  jibon: 'জীবন',
  shanti: 'শান্তি',
  khushi: 'খুশি',
  anondo: 'আনন্দ',
  dukho: 'দুঃখ',
  koshto: 'কষ্ট',
  shundor: 'সুন্দর',
  kharap: 'খারাপ',
  choto: 'ছোট',
  boro: 'বড়',
  notun: 'নতুন',
  purano: 'পুরোনো',
  beshi: 'বেশি',
  kom: 'কম',
  anek: 'অনেক',
  onek: 'অনেক',
  khub: 'খুব',
  aaste: 'আস্তে',
  dhonnobad: 'ধন্যবাদ',
  nomoshkar: 'নমস্কার',
  prothom: 'প্রথম',
  shesh: 'শেষ'
};

const VOWELS_INDEPENDENT: Record<string, string> = {
  a: 'অ', aa: 'আ', i: 'ই', ii: 'ঈ', ee: 'ঈ',
  u: 'উ', uu: 'ঊ', oo: 'ঊ', r: 'ঋ', e: 'এ',
  oi: 'ঐ', ai: 'ঐ', o: 'ও', ou: 'ঔ', au: 'ঔ'
};

const VOWELS_MATRA: Record<string, string> = {
  a: '', aa: 'া', i: 'ি', ii: 'ী', ee: 'ী',
  u: 'ু', uu: 'ূ', oo: 'ূ', r: 'ৃ', e: 'ে',
  oi: 'ৈ', ai: 'ৈ', o: 'ো', ou: 'ৌ', au: 'ৌ'
};

const CONSONANTS = [
  { pattern: 'kkh', char: 'ক্ষ' },
  { pattern: 'kch', char: 'ক্চ' },
  { pattern: 'kkt', char: 'ক্ত' },
  { pattern: 'ggy', char: 'জ্ঞ' },
  { pattern: 'chh', char: 'ছ' },
  { pattern: 'sch', char: 'শ্চ' },
  { pattern: 'shch', char: 'শ্চ' },
  { pattern: 'shth', char: 'ষ্ঠ' },
  { pattern: 'ndh', char: 'ন্ধ' },
  { pattern: 'nch', char: 'ঞ্চ' },
  { pattern: 'njh', char: 'ঞ্ছ' },
  { pattern: 'mph', char: 'ম্ফ' },
  { pattern: 'mbh', char: 'ম্ভ' },
  { pattern: 'kh', char: 'খ' },
  { pattern: 'gh', char: 'ঘ' },
  { pattern: 'ng', char: 'ঙ' },
  { pattern: 'ch', char: 'চ' },
  { pattern: 'jh', char: 'ঝ' },
  { pattern: 'th', char: 'থ' },
  { pattern: 'dh', char: 'ধ' },
  { pattern: 'ph', char: 'ফ' },
  { pattern: 'bh', char: 'ভ' },
  { pattern: 'sh', char: 'শ' },
  { pattern: 'ss', char: 'ষ' },
  { pattern: 'rh', char: 'ড়' },
  { pattern: 'tr', char: 'ত্র' },
  { pattern: 'k', char: 'ক' },
  { pattern: 'g', char: 'গ' },
  { pattern: 'j', char: 'জ' },
  { pattern: 't', char: 'ট' },
  { pattern: 'd', char: 'ড' },
  { pattern: 'n', char: 'ন' },
  { pattern: 'p', char: 'প' },
  { pattern: 'b', char: 'ব' },
  { pattern: 'm', char: 'ম' },
  { pattern: 'r', char: 'র' },
  { pattern: 'l', char: 'ল' },
  { pattern: 's', char: 'স' },
  { pattern: 'h', char: 'হ' },
  { pattern: 'y', char: 'য়' },
  { pattern: 'w', char: 'ওয়' },
  { pattern: 'v', char: 'ভ' },
  { pattern: 'z', char: 'জ' },
  { pattern: 'x', char: 'ক্স' }
];

export function transliterateRomanWord(word: string): string {
  if (!word) return '';
  const lower = word.toLowerCase();

  // 1. Check dictionary first
  if (BENGALI_DICT[lower]) {
    return BENGALI_DICT[lower];
  }

  // 2. Check if Devanagari script
  if (/[\u0900-\u097F]/.test(word)) {
    return autoHindiToBengaliScript(word);
  }

  // 3. Phonetic conversion algorithm
  let result = '';
  let i = 0;
  let isPrevConsonant = false;

  while (i < lower.length) {
    let matchedConsonant = null;
    for (const item of CONSONANTS) {
      if (lower.startsWith(item.pattern, i)) {
        matchedConsonant = item;
        break;
      }
    }

    if (matchedConsonant) {
      if (isPrevConsonant) {
        result += '্';
      }
      result += matchedConsonant.char;
      i += matchedConsonant.pattern.length;
      isPrevConsonant = true;
      continue;
    }

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

    result += lower[i];
    i++;
    isPrevConsonant = false;
  }

  // Never leave a trailing virama/hasanta at word boundary!
  result = result.replace(/্+$/g, '');

  return result || word;
}

/**
 * Attaches in-place smart typing to HTML Input, Textarea, or ContentEditable elements.
 * Converts Roman/Devanagari to Bengali on SPACE, ENTER, or BLUR (when focus changes).
 */
export function attachBengaliSmartTyping(
  element: HTMLElement | null,
  onUpdate?: (newText: string) => void
) {
  if (!element) return () => {};

  const convertLastUnfinishedWord = () => {
    try {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        const text = element.value || '';
        const caretPos = element.selectionStart || text.length;
        const textBefore = text.slice(0, caretPos);
        const match = textBefore.match(/([a-zA-Z\u0900-\u097F]+)$/);

        if (match) {
          const word = match[1];
          const start = caretPos - word.length;
          const end = caretPos;
          const bengaliWord = transliterateRomanWord(word);

          if (bengaliWord && bengaliWord !== word) {
            const newText = text.slice(0, start) + bengaliWord + text.slice(end);
            element.value = newText;

            const newCaretPos = start + bengaliWord.length;
            element.setSelectionRange(newCaretPos, newCaretPos);

            if (onUpdate) {
              onUpdate(newText);
            }

            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      } else if (element.isContentEditable) {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          let textNode = range.startContainer;

          if (textNode.nodeType === Node.ELEMENT_NODE && textNode.childNodes.length > 0) {
            const childIdx = Math.min(range.startOffset, textNode.childNodes.length - 1);
            const child = textNode.childNodes[childIdx];
            if (child && child.nodeType === Node.TEXT_NODE) {
              textNode = child;
            }
          }

          if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            const text = textNode.textContent || '';
            const caretPos = range.startOffset;
            const textBefore = text.slice(0, caretPos);
            const match = textBefore.match(/([a-zA-Z\u0900-\u097F]+)$/);

            if (match) {
              const word = match[1];
              const start = caretPos - word.length;
              const bengaliWord = transliterateRomanWord(word);

              if (bengaliWord && bengaliWord !== word) {
                const newText = text.slice(0, start) + bengaliWord + text.slice(caretPos);
                textNode.textContent = newText;

                const newRange = document.createRange();
                const finalPos = Math.min(start + bengaliWord.length, newText.length);
                newRange.setStart(textNode, finalPos);
                newRange.collapse(true);
                sel.removeAllRanges();
                sel.addRange(newRange);

                if (onUpdate) {
                  onUpdate(element.innerHTML);
                }

                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn('Smart typing word conversion warning:', err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.keyCode === 32 || e.key === 'Enter' || e.keyCode === 13) {
      try {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
          const text = element.value || '';
          const caretPos = element.selectionStart || 0;
          const textBefore = text.slice(0, caretPos);
          const match = textBefore.match(/([a-zA-Z\u0900-\u097F]+)$/);

          if (match) {
            const word = match[1];
            const start = caretPos - word.length;
            const end = caretPos;
            const bengaliWord = transliterateRomanWord(word);

            if (bengaliWord && bengaliWord !== word) {
              e.preventDefault();
              const appendChar = (e.key === 'Enter' || e.keyCode === 13) ? '\n' : ' ';
              const newText = text.slice(0, start) + bengaliWord + appendChar + text.slice(end);
              element.value = newText;

              const newCaretPos = start + bengaliWord.length + appendChar.length;
              element.setSelectionRange(newCaretPos, newCaretPos);

              if (onUpdate) {
                onUpdate(newText);
              }

              element.dispatchEvent(new Event('input', { bubbles: true }));
              element.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        } else if (element.isContentEditable) {
          const sel = window.getSelection();
          if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            let textNode = range.startContainer;

            if (textNode.nodeType === Node.ELEMENT_NODE && textNode.childNodes.length > 0) {
              const childIdx = Math.min(range.startOffset, textNode.childNodes.length - 1);
              const child = textNode.childNodes[childIdx];
              if (child && child.nodeType === Node.TEXT_NODE) {
                textNode = child;
              }
            }

            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
              const text = textNode.textContent || '';
              const caretPos = range.startOffset;
              const textBefore = text.slice(0, caretPos);
              const match = textBefore.match(/([a-zA-Z\u0900-\u097F]+)$/);

              if (match) {
                const word = match[1];
                const start = caretPos - word.length;
                const bengaliWord = transliterateRomanWord(word);

                if (bengaliWord && bengaliWord !== word) {
                  e.preventDefault();
                  const appendChar = (e.key === 'Enter' || e.keyCode === 13) ? '\u00A0' : ' ';
                  const newText = text.slice(0, start) + bengaliWord + appendChar + text.slice(caretPos);
                  textNode.textContent = newText;

                  const newRange = document.createRange();
                  const finalPos = Math.min(start + bengaliWord.length + appendChar.length, newText.length);
                  newRange.setStart(textNode, finalPos);
                  newRange.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(newRange);

                  if (onUpdate) {
                    onUpdate(element.innerHTML);
                  }

                  element.dispatchEvent(new Event('input', { bubbles: true }));
                  element.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }
            }
          }
        }
      } catch (err) {
        console.warn('Bengali smart typing safe handler warning:', err);
      }
    }
  };

  const handleBlur = () => {
    convertLastUnfinishedWord();
  };

  element.addEventListener('keydown', handleKeyDown);
  element.addEventListener('blur', handleBlur);

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
    element.removeEventListener('blur', handleBlur);
  };
}
