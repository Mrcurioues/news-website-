-- Add optional video_url column to stories table for Lead Coverage and Article Video Support
ALTER TABLE stories ADD COLUMN IF NOT EXISTS video_url TEXT;
