
-- Add new columns to existing tables
ALTER TABLE events ADD COLUMN slug TEXT UNIQUE;
ALTER TABLE events ADD COLUMN thumbnail_url TEXT;

ALTER TABLE testimonials ADD COLUMN image_url TEXT;

ALTER TABLE programs ADD COLUMN thumbnail_url TEXT;

-- Create storage bucket for contents
INSERT INTO storage.buckets (id, name, public) VALUES ('contents', 'contents', true);

-- Create storage policies
CREATE POLICY "Contents are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'contents');
CREATE POLICY "Authenticated users can upload contents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'contents' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update contents" ON storage.objects FOR UPDATE USING (bucket_id = 'contents' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete contents" ON storage.objects FOR DELETE USING (bucket_id = 'contents' AND auth.role() = 'authenticated');

-- Update existing events with generated slugs
UPDATE events SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL;

-- Add constraint to ensure slug is not null for new records
ALTER TABLE events ALTER COLUMN slug SET NOT NULL;
