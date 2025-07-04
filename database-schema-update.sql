
-- Updated database schema for NSK Karate website
-- Run this after the initial setup

-- Create storage bucket for images if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('contents', 'contents', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for authenticated users
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public can view images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'contents');

CREATE POLICY "Authenticated users can delete images" 
ON storage.objects FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  section VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create admission forms table
CREATE TABLE IF NOT EXISTS admission_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  selected_class VARCHAR(100) NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stats table for homepage counters
CREATE TABLE IF NOT EXISTS site_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_name VARCHAR(50) NOT NULL UNIQUE,
  stat_value INTEGER NOT NULL DEFAULT 0,
  stat_label VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default stats
INSERT INTO site_stats (stat_name, stat_value, stat_label, icon) VALUES
('students', 2700, 'Active Students', 'users'),
('belt_levels', 12, 'Belt Levels', 'award'),
('years_experience', 40, 'Years of Excellence', 'calendar'),
('classes_weekly', 25, 'Weekly Classes', 'target')
ON CONFLICT (stat_name) DO NOTHING;

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- Gallery policies
CREATE POLICY "Public can view gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- Admission forms policies
CREATE POLICY "Anyone can submit admission forms" ON admission_forms FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view admission forms" ON admission_forms FOR SELECT USING (auth.role() = 'authenticated');

-- Site stats policies
CREATE POLICY "Public can view stats" ON site_stats FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update stats" ON site_stats FOR ALL USING (auth.role() = 'authenticated');

-- Create updated triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON site_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
