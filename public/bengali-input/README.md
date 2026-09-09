# Offline Bengali Smart Typing & Transliteration System

A 100% self-contained, client-side, zero-API Bengali phonetic transliteration and smart typing module for web applications.

## 📁 File Structure
```
/public/bengali-input/
    ├── bengali-dictionary.js # Expandable word dictionary
    ├── bengali-rules.js      # Phonetic & Devanagari rules
    ├── bengali-engine.js     # Pure JavaScript transliteration engine
    ├── bengali-input.js      # DOM controller & event listener
    ├── bengali-input.css     # Floating suggestion popup CSS
    ├── demo.html             # Standalone demo & 50+ test suite
    └── README.md             # Integration guide & documentation
```

## 🚀 How to Install & Use
Include the scripts and stylesheet in your HTML file:
```html
<link rel="stylesheet" href="bengali-input/bengali-input.css">

<script src="bengali-input/bengali-dictionary.js"></script>
<script src="bengali-input/bengali-rules.js"></script>
<script src="bengali-input/bengali-engine.js"></script>
<script src="bengali-input/bengali-input.js"></script>
```

Attach to any `<textarea>` or `<input type="text">`:
```javascript
BengaliInput.attach("#article-editor", {
  suggestion: true,
  convertOnSpace: true,
  convertOnEnter: true
});
```

To detach or toggle:
```javascript
BengaliInput.detach("#article-editor");
BengaliInput.toggle("#article-editor", false);
```

## ⚙️ How the Engine Works
1. **Dictionary Priority**: Checks `bengali-dictionary.js` first for common Roman-to-Bengali word mappings.
2. **Greedy Phonetic Matching**: Uses pattern matching defined in `bengali-rules.js` for aspirated consonants (`kh`, `gh`, `ch`, `sh`, `kkh`), vowels, and matras.
3. **Devanagari Direct Converter**: Converts Hindi/Devanagari characters to closest Bengali script characters locally.
4. **SPACE & ENTER Interception**: Prevents default space insertion until Roman/Hindi word is replaced with Bengali Unicode text.

## 📚 Expanding the Dictionary
Open `bengali-dictionary.js` and add new key-value pairs:
```javascript
"newword": "নতুনশব্দ",
```

## ⚠️ Known Limitations
- Offline transliteration converts sound/phonetics and script, not deep semantic AI machine translation.
- Complex rare Sanskrit conjuncts rely on dictionary additions for exact spelling accuracy.
