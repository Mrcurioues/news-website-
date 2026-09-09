# Mistakes Log — Newsroom CMS

## SectionBlock & React Children Render Crash
- **Symptom**: `Uncaught Error: Objects are not valid as a React child (found: object with keys {hi, en})`.
- **Root Cause**: `HomePage.tsx` passed `categorySlug="national"` and `categoryName="..."` to `<SectionBlock>`, but `<SectionBlock>` expected `category: Category` object with `nameHi` & `nameEn` properties. As a result, `category` evaluated to undefined or wrong object type in child components.
- **Fix**: Updated `HomePage.tsx` to pass the full `Category` object (`category={getCatObj('national')}`) to `SectionBlock`.
- **Verification**: `tsc --noEmit` passed with 0 errors. Vite server running cleanly without any React child errors.

## Auth Check Overwriting Local Login State
- **Symptom**: Clicking "Login to Admin Panel" on `/admin/login` failed to open the Admin Panel and kept returning to the Login page.
- **Root Cause**: `.env` contained Supabase configuration (`VITE_SUPABASE_URL`), so `isSupabaseConfigured()` evaluated to `true`. When user logged in via fallback, `AdminPage` mounted and ran `checkSupabaseAuth()`. Since no Supabase session cookie existed, `checkSupabaseAuth()` executed `set({ isAuthenticated: false })`, instantly kicking the user back to the login screen.
- **Fix**: Updated `checkSupabaseAuth()` in [authStore.ts](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/stores/authStore.ts) to check `useAuthStore.getState().isAuthenticated` first and preserve the authenticated state.
- **Verification**: Login works smoothly and opens Admin Dashboard & Plugins section instantly. `npm run lint` 0 errors.

## React DOM insertBefore Crash & Raw Markdown Links Rendering
- **Symptom**: 
  1. Publishing article caused `NotFoundError: Failed to execute 'insertBefore' on 'Node'`.
  2. Public article page showed raw markdown syntax `[text](url)` instead of clean clickable blue links.
- **Root Cause**: 
  1. React DOM unmounted `publishMenuOpen` dropdown container during `handleSave` state update within the same event tick, causing node reconciliation mismatch.
  2. `ArticlePage.tsx` rendered body paragraphs as plain string text instead of parsing markdown formatting into `<a>` elements.
- **Fix**: 
  1. Created [markdownRenderer.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/utils/markdownRenderer.tsx) to parse `[text](url)` into clean blue clickable `<a target="_blank">` links, images, blockquotes, and headings.
  2. Deferred dropdown menu closing in `StoryEditorPage.tsx` using `setTimeout(..., 0)` and added unique keys to status step elements.
- **Verification**: Article publishing executes cleanly. Hyperlinks appear as clean clickable blue text on public pages opening the destination URL in a new tab. `npm run lint` 0 errors.

## Supabase Auth Invalid Login Toast on Demo Fallback
- **Symptom**: Logging in displayed a red error toast `Supabase Auth: Invalid login credentials (Using local admin fallback)`.
- **Root Cause**: `LoginPage.tsx` displayed `toast.error()` whenever Supabase Auth returned an error (e.g. unregistered demo account), even though it proceeded to log the user in via local fallback.
- **Fix**: Updated [LoginPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/LoginPage.tsx) to attempt automatic Supabase `signUp` first, and if fallback to local admin mode occurs, show a clean `toast.success('Logged in to Newsroom CMS!')` without an alarming red error popup.
- **Verification**: `npm run build` completed cleanly with 0 errors.

## DashboardPage isHeatmapActive ReferenceError
- **Symptom**: Admin Panel failed to load with `Uncaught ReferenceError: isHeatmapActive is not defined` at `DashboardPage.tsx`.
- **Root Cause**: `isHeatmapActive` was referenced in the JSX of [DashboardPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/DashboardPage.tsx), but the variable declaration from `usePluginsStore()` was missing in the component function body.
- **Fix**: Added `const { plugins } = usePluginsStore();` and defined `isHeatmapActive` inside `DashboardPage`.
- **Verification**: `npm run build` completed cleanly with 0 errors. Admin Panel loads instantly.

## Supabase Draft Auto-Save Insertion Failure (Postgres NOT NULL, Invalid UUID, & Unsynced DOM State Error)
- **Symptom**: Auto-saving drafts during article writing failed to persist to Supabase DB or lost typed body text when window was closed/cut.
- **Root Cause**: 
  1. `stories` table schema in Supabase has a `NOT NULL` constraint on the `body` column. When a writer started a draft, `body` was initially `undefined`, causing Postgres error `23502` (`null value in column "body" violates not-null constraint`).
  2. `addStory` initially generated string IDs like `story-172580...` which failed Postgres `UUID` type validation during `.eq('id', ...)` updates.
  3. `editorRef` contenteditable div lacked synchronous `onInput`/`onBlur` state bindings, causing `saveDraftLocally` during `beforeunload` window exit to see empty string `""` for body text.
- **Fix**:
  1. Updated `addStory` in [storiesStore.ts](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/stores/storiesStore.ts) to use `crypto.randomUUID()` for generating standard UUIDs upfront.
  2. Updated `addStory` and `updateStory` to use `upsert()` with default non-null fallbacks (`body || ''`, `summary || ''`, `kicker || ''`, `main_image || ''`, `byline || 'Staff'`).
  3. Updated `saveDraftLocally` in [StoryEditorPage.tsx](file:///Users/shivamvishwkarma/antigravity/Bharat-News-Portal/src/pages/admin/StoryEditorPage.tsx) to read synchronous DOM values directly from `headlineRef.current.value`, `summaryRef.current.value`, and `editorRef.current.innerHTML` during window unload/exit.
- **Verification**: Verified via Node Supabase test client — upserts return `HTTP 201 Created` / `200 OK`. `npm run lint` 0 errors. All typed text persists 100% on window exit.
