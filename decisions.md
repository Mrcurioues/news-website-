# Decisions Log — Newsroom CMS Redesign

## 1. Zero localStorage Directive
- **Decision**: Completely removed `localStorage` persistence (`zustand/middleware` persist) across the entire codebase.
- **Rationale**: User explicitly required that no local storage be used. Data persistence and records are handled via Supabase Cloud backend (PostgreSQL database & Storage buckets), held reactively in-memory during session runtime.

## 2. Supabase Integration Architecture
- **Supabase SDK**: `@supabase/supabase-js`.
- **Database & Storage**: Schema defined in `supabase/schema.sql` (`stories`, `media`, `homepage_layout`, storage bucket `newsroom-media`).
- **Auth Guard**: Dedicated `/admin/login` page with Supabase email/password login.

## 3. Real-time Public Website Synchronization
- **Decision**: Connected `HomePage.tsx`, `ArticlePage.tsx`, `CategoryPage.tsx`, and `BreakingTicker.tsx` to `useStoriesStore` and `useHomepageStore`.
- **Behavior**: Any published, edited, scheduled, or deleted story in Admin instantly reflects on the public website in real-time.

## 7. Permanent Visual ContentEditable Editor (Zero Raw Symbols)
- **Decision**: Made **Visual View (ContentEditable WYSIWYG)** the permanent and sole editor in [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) and removed all raw code toggle options.
- **Behavior**: Writers type and format directly inside a visual canvas. Links, headings, bold text, and images render as real styled HTML elements without showing raw brackets `[text](url)` or `**` symbols.

## 8. Full-Width Responsive Mega Menu for "More (और देखें)"
- **Decision**: Designed and implemented a 7-column desktop grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7`) directly underneath the sticky top navbar in [Header.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/components/Header.tsx).
- **Behavior**: Features uppercase red headers (`text-rose-600 font-black`) with subtle borders and clean dark gray sub-links (`hover:text-rose-600`), providing an intuitive, user-friendly navigation layout across Mobile, Tablet, and Desktop.

## 9. Portal Logo & Branding Settings
- **Decision**: Added a dedicated **Portal Logo & Site Branding** card inside `My Profile & Account Settings` ([SettingsPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/SettingsPage.tsx)) using `useSiteConfigStore`.
- **Behavior**: Enables administrators to upload custom logo images, edit site names in Hindi and English, modify logo badge text initials, update site suffixes, and change taglines with immediate real-time sync to the public header.

## 10. Auto-Logout on 1-Minute Inactivity & Brute Force Password Lockout
- **Decision**: Implemented `InactivityGuard.tsx` (60-second activity listener) and Brute Force rate limiting inside [LoginPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/LoginPage.tsx).
- **Behavior**:
  - **Auto-Logout**: If logged-in admin is idle for >= 60 seconds (no mouse/keyboard/touch interaction), session is automatically terminated and redirected to `/admin/login`.
  - **10-Minute Lockout**: 5 consecutive failed password attempts trigger a 10-minute timeout with active countdown display (`MM:SS`).
  - **24-Hour Lockout**: 10 failed password attempts lock login access for 24 hours to prevent brute-force hacking attacks.

## 12. Article Draft Auto-Save on Window Exit & Supabase Realtime Sync
- **Decision**: Added automatic debounced draft saving (every 3 seconds) combined with `beforeunload` and `visibilitychange` window event handlers, plus real-time Supabase streaming (`supabase.channel('public:stories_realtime')`).
- **Behavior**:
  - If a user accidentally closes/refreshes the browser tab, cuts the website window, or switches tabs while editing an article, unsaved article changes instantly save as a Draft in `useStoriesStore` and Supabase DB (`status = 'draft'`).
  - Draft state updates stream in real-time across open browser tabs via Supabase Realtime PostgreSQL pub/sub.


## 12. 100% Dynamic 3-Language Reactive Translation System (Hindi, English, Bengali)
- **Decision**: Connected global language state (`lang`) across all components via `RouterContext.tsx` and centralized translation accessors (`getArticleTitle`, `getArticleExcerpt`, `getArticleBody`, `getArticleKeyPoints`, `getCategoryName`, `formatViews`, `getFormattedDate`).
## 18. Auto Last-Word Blur Conversion & React State Sync
- **Decision**: Added `blur` event listener to `attachBengaliSmartTyping()` that converts any trailing Roman/Hindi word when focus leaves an input field, and dispatches DOM `input`/`change` events to keep React state in sync.
- **Behavior**: Clicking from Headline to Story body converts the last word immediately to Bengali, preventing any typed words from reverting to English.

## 20. Lead Coverage & Article Video Support Architecture
- **Decision**: Added optional `videoUrl` (`video_url` in DB) field to `Story` and `Article` types, supported in Admin Story Editor, Supabase DB sync, and frontend rendering.
- **Behavior**:
  - **Lead Coverage**: If `videoUrl` is present, renders an autoplaying, muted, looping cover video (`autoPlay`, `muted`, `loop`, `playsInline`, `object-fit: cover`) or clean YouTube embed with existing text overlays on top. On load failure, falls back to `coverImage`.
  - **Articles**: If `videoUrl` is present, renders a responsive video player with normal controls or YouTube iframe embed near the cover image position.
  - **Admin Panel**: Non-technical `"Video URL (Optional)"` input field with real-time validation and helper text.

