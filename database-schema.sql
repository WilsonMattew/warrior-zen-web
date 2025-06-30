
-- Martial Arts Academy Database Schema

-- Events/Blog table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  date DATE,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  belt_level VARCHAR(50),
  avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programs table
CREATE TABLE programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Instructors table
CREATE TABLE instructors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bio TEXT,
  specialties TEXT[],
  image_url TEXT,
  years_experience INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class schedules table
CREATE TABLE class_schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_name VARCHAR(100) NOT NULL,
  instructor_id UUID REFERENCES instructors(id),
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
  start_time TIME,
  end_time TIME,
  belt_level VARCHAR(50),
  max_students INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site content table (for admin editable content)
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text', -- text, image, json
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO programs (name, description, price, features) VALUES
('White Belt Program', 'Perfect for beginners starting their martial arts journey', 58.00, ARRAY['24-hour gym', 'Karate uniform', 'Nutritional plan', 'Fitness assessment']),
('Red Belt Program', 'Intermediate training for dedicated students', 78.00, ARRAY['24-hour gym', 'Karate uniform', 'Nutritional plan', 'Fitness assessment']),
('Black Belt Program', 'Advanced training for serious martial artists', 98.00, ARRAY['24-hour gym', 'Karate uniform', 'Nutritional plan', 'Fitness assessment']);

INSERT INTO testimonials (name, content, belt_level, rating) VALUES
('John Smith', 'Training here has completely transformed my life. The discipline and focus I have gained extends far beyond the dojo.', 'Black Belt', 5),
('Sarah Johnson', 'The instructors are incredibly knowledgeable and patient. Perfect environment for learning martial arts.', 'Red Belt', 5),
('Mike Chen', 'Amazing community and excellent facilities. I have been training here for 3 years and love every moment.', 'Black Belt', 5);

INSERT INTO instructors (name, bio, specialties, years_experience) VALUES
('Jhonatan Lee', 'Master instructor with decades of experience in traditional karate and modern self-defense techniques.', ARRAY['Karate', 'Self-Defense', 'Meditation'], 25),
('Emma Wilson', 'Specialist in youth programs and beginner-friendly martial arts instruction.', ARRAY['Youth Training', 'Basics', 'Flexibility'], 12),
('Michael Davis', 'Expert in advanced combat techniques and competition preparation.', ARRAY['Competition', 'Advanced Techniques', 'Sparring'], 18),
('Lilly D. Smith', 'Focus on mental discipline, traditional forms, and philosophical aspects of martial arts.', ARRAY['Traditional Forms', 'Philosophy', 'Mental Training'], 20);

INSERT INTO events (title, content, excerpt, date, tags) VALUES
('Advanced Karate Techniques Tips', 'Learn the most effective advanced karate techniques that will elevate your martial arts practice to the next level.', 'Master advanced karate techniques with expert guidance', '2024-05-15', ARRAY['Tips', 'Karate', 'Advanced']),
('Dynamic Martial Arts Moves Tips', 'Discover dynamic movements that will improve your fluidity and power in martial arts practice.', 'Enhance your martial arts with dynamic movements', '2024-05-10', ARRAY['Tips', 'Techniques', 'Movement']),
('Effective Martial Art Moves', 'Essential martial art moves every practitioner should master for effective self-defense.', 'Master essential moves for effective martial arts', '2024-05-05', ARRAY['Tips', 'Self-Defense', 'Basics']);

INSERT INTO site_content (key, value, type) VALUES
('hero_title', 'ELEVATING WARRIOR CULTURE.', 'text'),
('hero_subtitle', 'With martial arts, we strive for excellence in all things.', 'text'),
('about_year', '1985', 'text'),
('contact_address', 'Tukad Balian, Bali - 1919', 'text'),
('contact_email', 'sensei@support.com', 'text'),
('contact_phone', '+123 456 7890', 'text');

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON programs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON instructors FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON class_schedules FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON site_content FOR SELECT USING (true);

-- Allow public insert for contact messages
CREATE POLICY "Allow public insert" ON contact_messages FOR INSERT WITH CHECK (true);
