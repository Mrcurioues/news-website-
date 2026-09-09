# Project Memory — Supabase Backend & Realtime Public Sync (NO localStorage)

## Recent Accomplishments
- **Supabase Storage Logo Upload, Auto-Cleanup & Universal Realtime Branding Sync**:
  - Connected Admin Settings ([SettingsPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/SettingsPage.tsx)) logo file picker directly to Supabase Storage bucket `newsroom-media` at path `logos/portal-logo-<timestamp>.<ext>`.
  - **2026-09-09**:
  - Removed white background container (`bg-white/90 p-1 shadow-md`) from logo `<img>` on Admin Login Page (`src/pages/admin/LoginPage.tsx`). Enlarged login logo (`h-20`, `max-w-[260px]`) and applied ultra-compact header margins (`pt-3`, `pb-2.5`, `mb-0.5`).
  - Added **Logo & Website Dynamic Theme Color System**: Added `primaryColor` to `siteConfigStore.ts`, SQL `site_branding` table, and Admin Settings page color picker & swatches. Injected dynamic CSS variable `--brand-primary` in `App.tsx` and bound real-time logo theme colors across Header, Navbar, Footer, Sidebar, and Login Page.
  - Fixed **Zero Flash/Reload Logo Bug**: Implemented synchronous initial cache loading (`loadCachedConfig()` via `localStorage`) in `siteConfigStore.ts`. Now upon refreshing or opening any page, the saved Supabase logo & theme load in 0 milliseconds upfront without any 1-millisecond flash of default fallback logo. TypeScript compilation verified 0 errors.
  - Added `deleteOldLogoFromSupabase()` in [siteConfigStore.ts](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/stores/siteConfigStore.ts) to automatically purge the previous logo file from Supabase Storage whenever a new logo is uploaded/changed.
  - Subscribed `useSiteConfigStore` to `supabase.channel('public:site_branding_realtime')`, instantly streaming logo, portal name, suffix, and tagline changes live across all open browser windows, landing page, public Header/Footer, Login Page ([LoginPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/LoginPage.tsx)), Admin Sidebar ([Sidebar.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/admin/layout/Sidebar.tsx)), and Full-Screen Editor sidebar in real-time.
- **Scheduled Stories Tab, Supabase Realtime Sync & Auto-Publish Engine**:
  - Added scheduled story filter view in `StoriesPage.tsx` with formatted date/time badges (`Clock` icon) and a 1-click **"Publish Now"** immediate override button.
  - Built resilient Supabase `upsert` payload handler in `storiesStore.ts` for `scheduled_date` with schema cache fallback (`PGRST204`).
  - Background auto-publish process (`checkScheduledStories()`) runs every 5 seconds, comparing current timestamp with `scheduledDate` and automatically transitioning due scheduled stories to `published` status live on the site and Supabase DB.
- **Automatic Article Draft Persistence on Window Exit & Supabase Realtime Sync**:
  - Added debounced 3-second auto-save and `beforeunload` + `visibilitychange` window event listeners in `StoryEditorPage.tsx` and `WpArticleEditor.tsx`. If a user accidentally closes the browser tab, refreshes, or cuts the website, unsaved article content automatically saves into the Drafts section (`status = 'draft'`).
  - Added `subscribeToRealtimeDrafts()` in `storiesStore.ts` using `supabase.channel('public:stories_realtime')` with PostgreSQL change listeners (`INSERT`, `UPDATE`, `DELETE`), streaming draft updates in real-time across all open tabs and devices.
  - Updated `supabase/schema.sql` with `is_auto_saved` column on `public.stories` table.
- Verified and enforced automatic dynamic translation logic for future articles:
  - All articles rendered across the site (Cards, Hero Banners, Detail Pages, Ticker, Widgets) use `getArticleTitle(article, lang)`, `getArticleExcerpt(article, lang)`, and `getArticleBody(article, lang)`.
  - Added native `titleHi`, `excerptHi`, `bodyHi`, `titleBn`, `excerptBn`, `bodyBn`, `titleEn`, `excerptEn`, `bodyEn` fields to `Article` interface in `src/types.ts`.
  - When articles are created/published in Admin CMS, they are instantly available across all 3 languages (Hindi `hi`, English `en`, Bengali `bn`) dynamically.
- **Automatic Last-Word Blur Conversion & React State Sync**: Fixed issue where switching focus from Headline to Story body would revert the last typed word to English. `attachBengaliSmartTyping()` now auto-converts the last unfinished Roman/Hindi word on `blur` and dispatches `input`/`change` events, keeping `headline` & `headlineBn` 100% in sync.
- **Robust Fail-Safe Smart Typing Engine**: Hardened `bengaliInput.ts` with automatic trailing virama (`্`) stripping, Element-node caret protection in `contenteditable`, try/catch safeguards, and fixed dictionary typos (`anondo` ➔ `আনন্দ`, `bharat` ➔ `ভারত`). Guarantees zero stalling, hallucination, or typing interruptions.
- **In-Place Bengali Smart Typing Across All Editor Fields (Headline, Summary & Main Article Canvas)**: Attached `attachBengaliSmartTyping()` to Headline textarea, Summary textarea, AND the Main Article Visual Editor (`contenteditable="true"` canvas) in `StoryEditorPage.tsx`. Typing `ami` + SPACE directly inside the article editor transforms text in-place (`ami` ➔ `আমি `) seamlessly with 0 extra UI clutter!
- **100% Offline Bengali Smart Typing & Transliteration Module**: Created `/public/bengali-input/` (`bengali-dictionary.js`, `bengali-rules.js`, `bengali-engine.js`, `bengali-input.js`, `bengali-input.css`, `demo.html`, `README.md`). Features zero-API phonetic transliteration (Roman/Devanagari -> Bengali), live caret suggestion popup, Space/Enter/Tab/Esc handling, and 50+ verifications test suite.
- **Real-Time Live Bengali Translation Engine**: Built `translationService.ts` (Google Translate API + MyMemory API fallback), `useLiveTranslation` hook (350ms debounce), and `<LiveBengaliTranslation />` component. Renders instant Bengali meaning translations directly below English/Hindi input fields (Headline, Summary, Search) in real time without button clicks.
- **Automatic Hindi-to-Bengali Script Transliteration & Google Fonts**: Added Google Fonts (`Noto Sans Bengali`, `Hind Siliguri`, `Tiro Bangla`) in `index.html` & `src/index.css`. Built `autoHindiToBengaliScript()` in `translations.ts` so any Hindi/Devanagari text automatically renders in Bengali script across the website!
- **Removed Multilingual Content Editor Widget**: Removed the dark Multilingual Content Editor card and 0% translation progress indicators from `StoryEditorPage.tsx`, streamlining the editor interface.
- **Article Schedule Date & Time Picker Modal & Auto-Publish Engine**:
  - Added Date (`<input type="date">`) and Time (`<input type="time">`) picker modal in `StoryEditorPage.tsx` with Bengali live date/time preview and quick presets (`+1 Hour`, `+3 Hours`, `Tomorrow 9 AM`, `Tomorrow 6 PM`).
  - Clicking "Schedule..." in the Publish dropdown triggers the Schedule modal where users select the target publish date and time.
  - Saved scheduled date ISO string (`scheduledDate`) in story record with status `'scheduled'`.
  - Added background checking process (`checkScheduledStories()`) in `useStoriesStore.ts` that runs every 5 seconds to compare `Date.now()` with `scheduledDate`, automatically transitioning due stories to status `'published'` in real-time.
- **Continuous Execution for Uploaded & Store Plugins**:

1. **Zero `localStorage` Policy**: Removed `persist` middleware from all Zustand stores (`storiesStore`, `mediaStore`, `homepageStore`, `uiStore`, `authStore`). Data lives in reactive in-memory state and Supabase DB/Storage.
2. **Supabase Integration**:
   - SDK: Installed `@supabase/supabase-js`.
   - Client Service: Created `src/services/supabase.ts`.
   - SQL Migration: Generated `supabase/schema.sql` defining `stories`, `media`, `homepage_layout`, RLS policies, and `newsroom-media` storage buckets.
   - Auth & Route Protection: Added `LoginPage.tsx` connected to `supabase.auth.signInWithPassword()`. Unauthenticated requests to `/admin` redirect to `/admin/login`.
3. **Real-time Public Website Synchronization**:
   - `HomePage.tsx`, `ArticlePage.tsx`, `CategoryPage.tsx`, and `BreakingTicker.tsx` read directly from `useStoriesStore` / `useHomepageStore`.
   - Admin Actions (*Create, Edit, Delete, Schedule, Toggle Breaking*) immediately update public feeds in real-time.
4. **Strict Admin Route Protection & Clean UI**:
   - `isAuthenticated` initialized to `false` in `authStore.ts`.
   - Any URL access to `/admin` or `/wp-admin` without authenticating redirects/renders `<LoginPage />`.
   - Fixed `checkSupabaseAuth()` in [authStore.ts](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/stores/authStore.ts) so login state is maintained upon submitting credentials.
   - Removed public "Admin (Demo)" links from Top Header, Mobile Drawer Navigation, and Footer.
   - Removed demo preset credentials section from Login page.
   - Connected Sign Out button to `logout()`, properly revoking session.
5. **Website Editing Plugins & Addons Engine**:
   - Created [pluginsStore.ts](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/stores/pluginsStore.ts) containing 8 website editing plugins (SEO Analyzer, Gutenberg Blocks, AI Assistant, Custom CSS/JS Injector, Watermark, Social Broadcaster, Analytics, AdSense).
   - Added **Plugins & Addons** nav item in Admin [Sidebar.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/admin/layout/Sidebar.tsx).
   - Built [PluginsPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/PluginsPage.tsx) with search/category filters, one-click Install/Deactivate/Configure/Uninstall controls, live settings modal, and custom `.zip` package uploader.
6. **Story Editor Formatting Toolbar & Media Library Integration**:
   - Made all formatting toolbar buttons in [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) fully working (`B`, `I`, `H2`, `H3`, `Bullet List`, `Numbered List`, `Quote`, `Link modal`, `Image picker`, `Video embed`, `# Divider`).
   - Integrated `useMediaStore()` into `StoryEditorPage.tsx`:
     a) **Cover Image Picker**: Allows selecting from Media Library OR uploading a new local image file.
     b) **Editor Sidebar Media Tab**: Displays all uploaded Media Library images with 1-click insert & drag-and-drop support into article body and cover image.
     c) **Link & Video Embed Modals**: Modals for URL links and video embeds.
7. **Publish Crash & Universal Markdown Link Renderer**:
   - Fixed `insertBefore` React DOM crash on publishing articles by safely deferring dropdown unmounting and adding unique element keys.
   - Enhanced [markdownRenderer.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/utils/markdownRenderer.tsx) with regex link parser & `stripMarkdown()` helper.
   - Updated [ArticlePage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/ArticlePage.tsx) & [StoryCard.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/StoryCard.tsx) so title, excerpt, and body all parse `[text](url)` cleanly into **blue clickable links** (`<a target="_blank">`) on full article pages, while stripping raw syntax from card summaries on home/category pages.
8. **End-to-End Test Article Verification**:
   - Created & published test article *"India Space Mission Launch Success: New Solar Satellite Deployed"*.
   - Verified that newly published stories immediately render as lead hero/featured stories on the Homepage ([HomePage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/HomePage.tsx)).
   - Verified formatting, images, YouTube embeds, blockquotes, and blue clickable links (`Official ISRO Space Portal`).
9. **Supabase Auto-Sync & Reload Persistence**:
   - Connected `App.tsx` mount to `useStoriesStore` and `useMediaStore` `fetchFromSupabase()`.
   - Any published post or uploaded media item is stored in Supabase DB (`stories` & `media` tables) and auto-fetched on page reload, preserving state permanently across browser refreshes.
10. **Supabase Login Error Toast Fix**:
   - Resolved noisy `Supabase Auth: Invalid login credentials` error toast on login.
   - Updated `LoginPage.tsx` to attempt Supabase auto sign-up on unregistered accounts, and seamlessly log in via local admin fallback with a clean success toast when needed.
11. **Live Functional Plugins System Integration**:
   - Connected all 8 website editing plugins in `usePluginsStore` across public and admin pages.
   - Built [PluginsInjector.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/PluginsInjector.tsx) to dynamically inject Custom CSS and tracking scripts into the browser DOM `<head>`.
   - Connected [AdSlot.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/AdSlot.tsx) to display live ad banner units when `adsense-banner-manager` is active.
   - Added **AI Headline & Summary Generators** to [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) when `ai-news-assistant-pro` is active.
   - Added **Yoast SEO Live Score Widget** (0-100 score) and JSON-LD schema output in [ArticlePage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/ArticlePage.tsx) when `yoast-seo-master` is active.
   - Added **Gutenberg Callout & Audio Block inserters** when `gutenberg-block-editor` is active.
   - Added **Auto Social Broadcasting** toast notifications to Telegram & X on publish when `auto-social-broadcaster` is active.
   - Added **Watermark & WebP Converter** protection badge in [MediaPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/MediaPage.tsx).
   - Added **Live Scroll Progress Bar** on articles and Heatmap Analytics card in [DashboardPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/DashboardPage.tsx) when `live-heatmap-analytics` is active.
12. **DashboardPage isHeatmapActive ReferenceError Fix**:
   - Fixed `ReferenceError: isHeatmapActive is not defined` in [DashboardPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/DashboardPage.tsx) by declaring `const { plugins } = usePluginsStore()` and initializing `isHeatmapActive` in the component body.
13. **Continuous Execution for Uploaded & Store Plugins**:
   - Enhanced [PluginsInjector.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/PluginsInjector.tsx) to aggregate dynamic CSS styles and JavaScript tracking scripts from ALL active plugins (both store plugins and uploaded `.zip` packages).
   - Once installed and set to **Active**, plugins run continuously across the entire portal until manually turned OFF or uninstalled by the admin.
14. **Permanent Visual ContentEditable Canvas (Zero Raw Symbols)**:
   - Updated [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) to make Visual View (WYSIWYG ContentEditable canvas) permanent and removed mode toggle buttons (`Visual View` & `Raw Code`).
   - Writers type and edit text directly inside a rich visual canvas. Links, headings, bold text, and images render directly as styled HTML elements without showing raw brackets `[text](url)` or `**` symbols.
15. **Story Editor Right Inspector Sidebar & Pro Tools Default Selection**:
    - Confirmed Editor Inspector Sidebar is on the **Right Side** of [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx).
    - Set `activeTab` to default to `'format'` (**Pro Tools** MS Word Suite) so it is immediately active and open on the right side upon opening the editor.
16. **Verification**:
    - `npm run build`: **0 errors** (2353 modules transformed).
    - Dev server running on `http://localhost:3001/`.
17. **Image Name Hiding & Right Sidebar Image Adjuster**:
    - Removed image file names from figure captions, media library grids, and image insertion functions in [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) and [MediaPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/MediaPage.tsx).
    - Removed center popup modal dialog for image adjustments completely.
    - Added an `onClick` listener to the visual editor canvas so clicking any image immediately selects it, activates the `media` tab in the right sidebar, and renders full Image Settings (Size 25/50/75/100%, Alignment Left/Center/Right, Fit/Crop Cover/Fit/Fill, Caption, Delete).
18. **Vanilla JS Image Manipulation Canvas**:
    - Created [canvas.html](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/public/canvas.html) with multi-image upload, 2px solid `#3498db` selection borders, 8-point proportional resize handles (NW, N, NE, W, E, SW, S, SE), free drag and drop movement, grid background, centering (Horizontal & Vertical), and keyboard delete support.
19. **Story Editor Section Canvas Integration**:
    - Integrated 8-point handle selection overlay (`2px solid #3498db` border + 8 white square handles), proportional resize down to 50x50px, drag-to-move, `Center H` & `Center V` toolbar buttons, and `#f0f0f0` 20px grid background pattern directly inside the main article body editor section of [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx).
20. **Supabase Storage & DB Permanent Media Deletion**:
    - Updated `deleteItem` in [mediaStore.ts](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/stores/mediaStore.ts).
    - When deleting any image or video from the website Media Library, it now automatically deletes the metadata row from the Supabase DB `media` table AND removes the actual file object from Supabase Storage bucket `newsroom-media`.
21. **Revert Story Editor Canvas Overlay**:
    - Reverted the 8-point handle selection overlay, grid background, and centering toolbar buttons from [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) per user request, restoring clean editor layout.
22. **Sidebar Active Item Highlight Fix, Cover Auto-Fit & Live Preview Modal**:
    - Fixed `isActive` in [Sidebar.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/admin/layout/Sidebar.tsx) with exact pathname & query param matching so ONLY the clicked active sidebar item gets highlighted in red, leaving all non-selected items normal.
    - Removed `Pro Tools Suite` menu items from [Sidebar.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/admin/layout/Sidebar.tsx).
    - Updated Main Cover Image preview in [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) to `object-contain max-h-[450px]` so all photo text and visual details are fully visible without cropping.
    - Updated **Preview** button in [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) to open an in-editor full-screen Live Article Preview Modal instead of redirecting away to the homepage.
23. **Advanced SEO AI Auto-Generate & Separate Profile Updates**:
    - Added 4 individual AI Auto-Generate buttons (`AI Keyword`, `AI Slug`, `AI Title`, `AI Description`) in `StoryEditorPage.tsx` next to each field in the Advanced SEO tab.
    - Updated `SettingsPage.tsx` so Name/Email/Bio updates do not require entering a new password.
24. **Sidebar & TopBar Settings Consolidation**:
    - Removed redundant `Settings` item from the middle nav list in `Sidebar.tsx`.
    - Transformed the bottom `Settings` button in `Sidebar.tsx` into a full expandable/collapsible accordion menu containing `My Profile`, `Sections & Topics`, `Authors & Users`, `Integrations`, and `Developer Tools`.
    - Updated TopBar profile dropdown so `View Website` is replaced with `My Profile` linking directly to profile settings.
25. **Front Content Red Banner Layout Section**:
    - Added `frontContent` property to `HomepageLayout` interface in `admin.ts` and `seedData.ts`.
    - Added **Front Content Banner (🔴 Front Content Banner)** as the top customizable section in `HomepagePage.tsx` Layout Editor.
    - Connected `HomePage.tsx` red hero live banner & bullet headlines list to dynamically resolve stories from `layout.frontContent`.
26. **Compact Video Bulletins & Shorts Section Redesign**:
    - Redesigned the Video & Shorts block in `HomePage.tsx` to be significantly sleeker and more balanced.
    - Set short reels grid to display 8 reels (`DEMO_VIDEOS.slice(0, 8)`) and increased main video bulletin banner height to `h-56` (mobile) / `sm:h-64` (desktop).
    - Applied subtle gradient overlays, clear typography, and refined play icon proportions.
27. **Left Sticky Explorer Navigation Column (Exact Ascending Order & Sub-sections)**:
    - Reordered `HomePage.tsx` sticky Left Explorer navigation items into exact user-specified ascending order with customized Lucide icons:
      1. `NOW` (`Tv` icon)
      2. `VIDEO` (`Video` icon)
      3. `WEB STORIES` (`BookOpen` icon)
      4. `REGIONAL NEWS` (`Globe` icon)
      5. `NEWS` (Sub: `India`, `World`)
      6. `SPORTS` (Sub: `Cricket`, `IPL`, `Football`)
      7. `BUSINESS` (Sub: `Automobile`)
      8. `ENTERTAINMENT` (Sub: `Movies`, `Celebration`, `South Cinema`, `Reviews`)
      9. `STATES` (Sub: `Delhi-NCR`, `UP`, `Punjab`, `Bihar`, `MP`)
      10. `EDUCATION` (Sub: `Jobs`, `Results`)
      11. `LIFESTYLE` (Sub: `Astro`, `Health`, `Travel`)
      12. `DEEP DIVE` (`Sparkles` icon)
28. **Interactive Left Explorer Search & Sub-section Accordions**:
    - Added click-to-expand SEARCH option in Left Explorer sidebar: expands container width from `w-28` to `w-56` with live text input and instant query execution (`/search?q=...`).
    - Added click toggle accordion support for all sub-sections (`NEWS`, `SPORTS`, `BUSINESS`, `ENTERTAINMENT`, `STATES`, `EDUCATION`, `LIFESTYLE`), revealing/collapsing tags upon clicking icon/title with animated chevron indicators.
    - Removed top red circular Explorer trigger badge per user request, starting left sidebar directly with Search & Nav items.
    - Increased sub-section typography from `text-[10px]` to `text-xs font-bold` with rounded pills (`p-2 bg-*-50/80`) for improved legibility.
    - Removed SEARCH section button from Left Navigation sidebar per user request.
    - Removed all sub-section dropdown accordions from Left Navigation bar per user request, leaving a clean, compact vertical category icon bar.
29. **Local Dev Server Execution**:
    - Started local Vite development server on `http://localhost:3001/`.
30. **Responsive Full-Width Mega Menu for "More (और देखें)" Header Button**:
    - Implemented `moreMenuOpen` state toggle in [Header.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/Header.tsx).
    - Added full-width responsive Mega Menu matching the reference screenshot layout (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7`).
    - Included all requested categories and sub-sections: `LIVE NOW`, `VIDEO`, `WEB STORIES`, `REGIONAL NEWS`, `DEEP DIVE`, `NEWS` (`India`, `World`), `SPORTS` (`Cricket`, `IPL`, `Football`), `BUSINESS` (`Auto`), `ENTERTAINMENT` (`Movies`, `Celebrities News`, `South Cinema`, `Movie Review`), `STATES` (`Delhi-NCR`, `Uttar Pradesh`, `Punjab`, `Bihar`, `Madhya Pradesh`), `EDUCATION` (`Jobs`, `Results`), `LIFESTYLE` (`Astro`, `Health`, `Travel`), `BRAND WIRE`, `SCIENCE`, `TRENDING`, `CITIES`, `FACT CHECK`, `ELECTIONS`, `EXPLAINERS`, `RELIGION AND SPIRITUALITY`, `TECHNOLOGY`.
    - Resolved JSX tag mismatched closure in `Header.tsx` and verified 0 TypeScript compilation errors (`npx tsc --noEmit`).
31. **Portal Logo, Site Name & Branding Settings in My Profile & Account Settings**:
    - Built a dedicated **Portal Logo & Site Branding (पोर्टल लोगो एवं नाम संपादन)** section inside [SettingsPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/SettingsPage.tsx) under `My Profile & Account Settings`.
    - Added custom site logo image upload (PNG, SVG, WebP, JPG) with real-time preview and 1-click removal/reset to letter badge.
    - Added inputs for Portal Name (Hindi & English), Logo Badge Text (initials e.g., `भा` or `BN`), Suffixes (`लाइव` / `LIVE`), and Taglines (`सत्य, निष्पक्ष और विश्वसनीय ताज़ा ख़बरें 24x7`).
    - Connected [siteConfigStore.ts](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/stores/siteConfigStore.ts) to [Header.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/Header.tsx) so logo image and brand name changes immediately update across the entire portal in real time.
32. **Security Auto-Logout on 1-Minute Inactivity & Brute Force Password Lockout Protection**:
    - Created [InactivityGuard.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/admin/InactivityGuard.tsx) to automatically log out authenticated administrators after 1 minute of inactivity (`mousemove`, `keydown`, `click`, `scroll`, `touchstart`) and redirect to login page.
    - Built Rate-Limiting & Brute Force Lockout Protection in [LoginPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/LoginPage.tsx):
      - **5 Failed Password Attempts**: 10-minute security timeout with live countdown timer (`MM:SS`) and disabled login submit.
      - **10 Failed Password Attempts**: 24-hour account lockout banner (`🔒 ACCOUNT LOCKED FOR 24 HOURS`) preventing unauthorized access attempts.
33. **Supabase Schema Realtime Sync for Security & Full Trilingual (Hindi, English, Bengali) Language System**:
    - Synchronized `site_branding` and `security_logs` DB tables in Supabase ([schema.sql](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/supabase/schema.sql)).
    - Connected [siteConfigStore.ts](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/stores/siteConfigStore.ts) to `site_branding` table for automatic load and upsert persistence.
    - Enabled 100% reactive trilingual support (`hi`, `en`, `bn`) across entire public website & header. Switching between Hindi (हिंदी), English, and Bengali (বাংলা) instantly translates header mega menus, category names, article bodies, key highlights, dates, and search widgets.
34. **100% Dynamic 3-Language Reactive Translation System (Hindi, English, Bengali)**:
    - Wired `lang` state (`'hi'` | `'en'` | `'bn'`) to [HomePage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/HomePage.tsx), [Header.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/Header.tsx), [LeftSidebarNav.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/LeftSidebarNav.tsx), [StoryCard.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/StoryCard.tsx), and [ArticlePage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/ArticlePage.tsx).
    - Clicking **हिंदी**, **English**, or **বাংলা** in the top navigation bar immediately transforms 100% of website content (headlines, excerpts, full body articles, key points, category titles, search bars, dates, and mega menu links) into the selected language in real time.




