-- =====================================================
-- BHARAT NEWS PORTAL — SUPABASE SCHEMA MIGRATION
-- =====================================================

-- 1. STORIES TABLE
CREATE TABLE IF NOT EXISTS public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'news',
  status TEXT NOT NULL DEFAULT 'draft',
  kicker TEXT,
  headline TEXT NOT NULL,
  summary TEXT,
  body TEXT,
  main_image TEXT,
  main_image_caption TEXT,
  main_image_alt TEXT,
  section TEXT NOT NULL DEFAULT 'National',
  topics TEXT[] DEFAULT '{}',
  byline TEXT NOT NULL,
  author_id TEXT,
  location TEXT DEFAULT 'NEW DELHI',
  is_breaking BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  publish_date TIMESTAMPTZ,
  scheduled_date TIMESTAMPTZ,
  updated_date TIMESTAMPTZ DEFAULT now(),
  views INT DEFAULT 0,
  engagement INT DEFAULT 0,
  shares INT DEFAULT 0,
  comments INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  is_auto_saved BOOLEAN DEFAULT false,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Realtime on stories
ALTER PUBLICATION supabase_realtime ADD TABLE public.stories;

-- 2. MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image',
  size INT NOT NULL,
  alt_text TEXT,
  uploaded_by TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT now(),
  used_in_stories TEXT[] DEFAULT '{}'
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.media;

-- 3. HOMEPAGE LAYOUT TABLE
CREATE TABLE IF NOT EXISTS public.homepage_layout (
  id INT PRIMARY KEY DEFAULT 1,
  hero UUID[] DEFAULT '{}',
  breaking UUID[] DEFAULT '{}',
  secondary UUID[] DEFAULT '{}',
  latest UUID[] DEFAULT '{}',
  trending UUID[] DEFAULT '{}',
  video UUID[] DEFAULT '{}',
  photo UUID[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.homepage_layout;

-- 4. CMS AUDIT LOGS TABLE (For tracking exact timing, actions & status history)
CREATE TABLE IF NOT EXISTS public.cms_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID,
  action TEXT NOT NULL,
  performed_by TEXT NOT NULL,
  old_status TEXT,
  new_status TEXT,
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_audit_logs;

-- 5. SEPARATE CUSTOM VIEWS FOR EASY SECTION-WISE FILTERING WITH TIMINGS
CREATE OR REPLACE VIEW view_published_stories AS 
SELECT id, headline, section, byline, publish_date, updated_at, views, is_breaking, is_trending, is_featured
FROM public.stories WHERE status = 'published' ORDER BY created_at DESC;

CREATE OR REPLACE VIEW view_draft_stories AS 
SELECT id, headline, section, byline, created_at, updated_at
FROM public.stories WHERE status = 'draft' ORDER BY created_at DESC;

CREATE OR REPLACE VIEW view_in_review_stories AS 
SELECT id, headline, section, byline, updated_at
FROM public.stories WHERE status = 'in_review' ORDER BY created_at DESC;

CREATE OR REPLACE VIEW view_scheduled_stories AS 
SELECT id, headline, section, byline, scheduled_date, created_at
FROM public.stories WHERE status = 'scheduled' ORDER BY scheduled_date ASC;

CREATE OR REPLACE VIEW view_trash_stories AS 
SELECT id, headline, section, byline, updated_at AS trashed_at
FROM public.stories WHERE status = 'trash' ORDER BY updated_at DESC;

-- 6. STORAGE BUCKET FOR MEDIA UPLOADS
INSERT INTO storage.buckets (id, name, public) 
VALUES ('newsroom-media', 'newsroom-media', true)
ON CONFLICT (id) DO NOTHING;

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_layout ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_audit_logs ENABLE ROW LEVEL SECURITY;

-- CLEANUP OLD POLICIES IF THEY EXIST
DROP POLICY IF EXISTS "Public read stories" ON public.stories;
DROP POLICY IF EXISTS "Public read media" ON public.media;
DROP POLICY IF EXISTS "Public read homepage" ON public.homepage_layout;
DROP POLICY IF EXISTS "Admin write stories" ON public.stories;
DROP POLICY IF EXISTS "Admin write media" ON public.media;
DROP POLICY IF EXISTS "Admin write homepage" ON public.homepage_layout;
DROP POLICY IF EXISTS "Allow public insert stories" ON public.stories;
DROP POLICY IF EXISTS "Allow public update stories" ON public.stories;
DROP POLICY IF EXISTS "Allow public insert media" ON public.media;
DROP POLICY IF EXISTS "Allow public update media" ON public.media;
DROP POLICY IF EXISTS "Allow full access stories" ON public.stories;
DROP POLICY IF EXISTS "Allow full access media" ON public.media;
DROP POLICY IF EXISTS "Allow full access homepage" ON public.homepage_layout;
DROP POLICY IF EXISTS "Allow full access audit_logs" ON public.cms_audit_logs;

-- CREATE FRESH FULL-ACCESS POLICIES
CREATE POLICY "Allow full access stories" ON public.stories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access media" ON public.media FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access homepage" ON public.homepage_layout FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access audit_logs" ON public.cms_audit_logs FOR ALL USING (true) WITH CHECK (true);

-- STORAGE RLS POLICIES FOR BUCKET & FILES
DROP POLICY IF EXISTS "Public access to newsroom-media files" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload to newsroom-media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from newsroom-media bucket" ON storage.objects;

CREATE POLICY "Public access to newsroom-media files" ON storage.objects 
  FOR SELECT USING (bucket_id = 'newsroom-media');

CREATE POLICY "Allow upload to newsroom-media bucket" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'newsroom-media');

CREATE POLICY "Allow delete from newsroom-media bucket" ON storage.objects 
  FOR DELETE USING (bucket_id = 'newsroom-media');

-- 7. SITE BRANDING & LOGO TABLE
CREATE TABLE IF NOT EXISTS public.site_branding (
  id INT PRIMARY KEY DEFAULT 1,
  app_name_hi TEXT DEFAULT 'भारत समाचार',
  app_name_en TEXT DEFAULT 'Bharat News',
  app_suffix_hi TEXT DEFAULT 'लाइव',
  app_suffix_en TEXT DEFAULT 'LIVE',
  tagline_hi TEXT DEFAULT 'सत्य, निष्पक्ष और विश्वसनीय ताज़ा ख़बरें 24x7',
  tagline_en TEXT DEFAULT 'Truthful, Unbiased & Verified Headlines 24x7',
  logo_url TEXT DEFAULT '',
  logo_badge_text TEXT DEFAULT 'भा',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. SECURITY AUDIT & BRUTE FORCE LOGS TABLE
CREATE TABLE IF NOT EXISTS public.security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  user_email TEXT,
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- 9. SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#1E40AF',
  stories_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. AUTHORS TABLE
CREATE TABLE IF NOT EXISTS public.authors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'Journalist',
  status TEXT DEFAULT 'active',
  stories_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.site_branding;
ALTER PUBLICATION supabase_realtime ADD TABLE public.security_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.authors;

ALTER TABLE public.site_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access site_branding" ON public.site_branding FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access security_logs" ON public.security_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access sections" ON public.sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access authors" ON public.authors FOR ALL USING (true) WITH CHECK (true);



