# भारत समाचार LIVE | Bharat Samachar Live (ABP-Style Inspired Demo News Portal)

A high-performance, modern Indian News Portal web application inspired by the design principles and fast-paced layout of prominent Indian news portals (ABP Live style), built with original styling, typography, and placeholder assets.

---

## 🌟 Key Features

### 1. Sticky Header & Navigation
- **Bilingual Identity:** Hindi & English bilingual labels across all navigation headers.
- **Top Utility Bar:** Live date (`गुरुवार, 3 सितंबर 2026`), current weather (`नई दिल्ली 32°C`), live TV indicator, language toggle, and newsroom admin shortcut.
- **Sticky Red Navigation:** Horizontal category tabs (देश, राजनीति, क्रिकेट, मनोरंजन, व्यापार, तकनीक, दुनिया, लाइफस्टाइल) with active route indicator and instant search toggle.
- **Mobile Drawer:** Responsive slide-over hamburger navigation drawer with category list, search, and social links.

### 2. Breaking News Ticker (बड़ी खबर)
- High-contrast black bar with a pulsing red `⚡ ब्रेकिंग न्यूज़ / BREAKING` badge.
- Interactive headline carousel with auto-rotation, hover-to-pause, next/previous controls, and direct links to breaking news articles.

### 3. Homepage Architecture
- **Hero Lead Story:** Large card with live update badge, high-resolution visual, excerpt, author byline, and timestamp.
- **Secondary Stories Grid:** Side-by-side featured stories with category badges and reading time.
- **Category Sections:** Dedicated blocks for National, Politics, Cricket, Entertainment, Tech, and Business (each with 3 story cards + "और देखें / View More" link).
- **Trending / Most Read Sidebar:** Top 5 articles ranked with numbered badges, reader view counts, and popular trending tags (#ISRO, #Gaganyaan, #INDvsAUS, #Budget2026).
- **Multimedia Spotlight:** Embedded video rail and photo gallery teasers.
- **Standardized Ad Slots:** Tastefully integrated IAB-standard demo ad placements (728x90 Leaderboard, 300x250 Medium Rectangle, 300x600 Half-Page, In-Feed banner).

### 4. Article Page (`/news/[idSlug]`)
- Breadcrumbs: `होम > राजनीति > ...`
- Dual Hindi headline and English subtitle.
- Author byline with avatar, designation, publication timestamp, and total views.
- **Interactive Accessibility:** Font size resizer (`A-`, `A`, `A+`) and demo text-to-speech audio reader player ("खबर सुनें / Listen").
- **Social Share Bar:** Pre-configured URL-encoded sharing for WhatsApp, X (Twitter), Facebook, LinkedIn, and 1-click clipboard copy.
- Hero image with caption & photographer credit.
- **Key Highlights (मुख्य बिंदु):** Structured summary box.
- Formatted body paragraphs with blockquote and mid-article sponsor placement.
- Clickable tags cloud and 3-card related stories grid.

### 5. Category Page (`/category/[slug]`)
- Custom category header with Hindi/English title, description, and total article count.
- Featured horizontal story card + 2-column grid.
- Interactive "और लोड करें (Load More)" button.
- Sidebar with category trending stories and ad slots.

### 6. Search Portal (`/search`)
- Client-side instant search filtering by headline, excerpt, category, and tags.
- Category dropdown filter and sort option (Latest vs Most Read).
- Live result count, clear query button, and clickable suggestion chips.

### 7. Video Portal (`/videos` & `/videos/[idSlug]`)
- Video listing with duration pills, play icon overlay, and view counters.
- Detail page with responsive 16:9 embedded YouTube player (demo IDs), description, and "अगला वीडियो / Next Videos" rail.

### 8. Photo Gallery (`/photos` & `/photos/[idSlug]`)
- Gallery grid with photo count badges (e.g., "8 तस्वीरें").
- Detail view with interactive slideshow: previous/next arrows, thumbnail strip for instant jumping, slide counter (`तस्वीर 3 / 8`), fullscreen mode toggle, and per-slide Hindi/English captions.

### 9. Mini Newsroom Admin (`/admin`)
- Pitch-ready editorial dashboard: Metrics for Total Articles, Breaking News, Estimated Readers, and Categories.
- Filterable article management table with live status badges.
- **"नई खबर जोड़ें (Create Article)" Form:** Input Hindi headline, English subtitle, category, excerpt, body paragraphs, cover image with quick presets, breaking news toggle, and trending toggle.
- Automatically publishes to live state so you can immediately view your created article across the homepage, ticker, and category pages!

---

## 🛠️ Tech Stack & Typography

- **Framework:** React 19 / Vite + Next.js 15 App Router architecture pattern
- **Language:** TypeScript 5.8
- **Styling:** Tailwind CSS v4
- **Icons:** `lucide-react`
- **Typography:** Google Fonts:
  - `Noto Sans Devanagari` & `Hind` for Hindi typography
  - `Plus Jakarta Sans` for English numerals and body copy

---

## 🚀 Running Locally

```bash
# 1. Clone repository & install dependencies
npm install

# 2. Start development server
npm run dev

# App will be accessible at http://localhost:3000
```

---

## 🌐 Deploying to Vercel (Next.js / Vite)

### Deploying with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploying via GitHub to Vercel
1. Push this repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: Choose **Vite** or **Next.js**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

---

## 📁 Complete Project Structure

```
bharat-samachar-live/
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── AdSlot.tsx              # Standardized IAB Ad placeholders
│   │   ├── BreakingTicker.tsx      # Animated marquee breaking news bar
│   │   ├── Footer.tsx              # Comprehensive Indian news portal footer
│   │   ├── Header.tsx              # Sticky header, bilingual nav, mobile drawer
│   │   ├── ImageWithFallback.tsx   # Next/image equivalent image component
│   │   ├── SectionBlock.tsx        # 3-card category block with "More" link
│   │   ├── ShareBar.tsx            # WhatsApp, X, FB, LinkedIn sharing
│   │   ├── StoryCard.tsx           # Hero, secondary, horizontal, compact cards
│   │   └── TrendingWidget.tsx      # Ranked top 5 stories & trending tags
│   ├── context/
│   │   └── RouterContext.tsx       # Dynamic client routing & metadata updates
│   ├── data/
│   │   └── demo.ts                 # 20+ Hindi articles, 8 videos, 6 galleries
│   ├── pages/
│   │   ├── AdminPage.tsx           # Demo editorial dashboard & article creation
│   │   ├── ArticlePage.tsx         # Full article detail with audio & highlights
│   │   ├── CategoryPage.tsx        # Category story grid with load more
│   │   ├── HomePage.tsx            # Main news homepage with hero & sections
│   │   ├── PhotoDetailPage.tsx     # Full slideshow gallery with thumbnails
│   │   ├── PhotoListPage.tsx       # Photo galleries list
│   │   ├── SearchPage.tsx          # Instant client-side search & filters
│   │   ├── VideoDetailPage.tsx     # Embedded YouTube player & more videos
│   │   └── VideoListPage.tsx       # Video list grid
│   ├── App.tsx                     # Main layout & route router
│   ├── index.css                   # Tailwind v4 directives & font definitions
│   ├── main.tsx                    # React DOM entry point
│   └── types.ts                    # TypeScript interfaces for News Portal
├── index.html                      # HTML entry with Google Fonts & metadata
├── metadata.json                   # Applet configuration metadata
├── package.json                    # Project dependencies & scripts
├── README.md                       # Documentation & deployment guide
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite + Tailwind configuration
```
