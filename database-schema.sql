
-- Enable RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Events table for blog/events functionality
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    date DATE NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Testimonials table for student reviews
CREATE TABLE testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    belt_level TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Programs table for martial arts programs
CREATE TABLE programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Instructors table for instructor information
CREATE TABLE instructors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT NOT NULL,
    specialties TEXT[] DEFAULT '{}',
    years_experience INTEGER,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Class schedules table
CREATE TABLE schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    class_name TEXT NOT NULL,
    instructor_id UUID REFERENCES instructors(id),
    day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 6 = Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    belt_level TEXT,
    max_capacity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Site content table for dynamic content management
CREATE TABLE site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Events are publicly readable" ON events FOR SELECT USING (true);
CREATE POLICY "Testimonials are publicly readable" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Programs are publicly readable" ON programs FOR SELECT USING (true);
CREATE POLICY "Instructors are publicly readable" ON instructors FOR SELECT USING (true);
CREATE POLICY "Schedules are publicly readable" ON schedules FOR SELECT USING (true);
CREATE POLICY "Site content is publicly readable" ON site_content FOR SELECT USING (true);

-- Policies for contact submissions (public insert only)
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Admin policies (you'll need to set up authentication for these)
CREATE POLICY "Admins can manage events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage programs" ON programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage instructors" ON instructors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage schedules" ON schedules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can view contact submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage site content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data

-- Sample programs
INSERT INTO programs (name, description, price, features) VALUES
('Karate Fundamentals', 'Perfect for beginners learning the basics of traditional karate', 89.99, ARRAY['24/7 Gym Access', 'Karate Uniform Included', 'Beginner-Friendly Classes', 'Personal Progress Tracking']),
('Advanced Combat Training', 'Intensive training for experienced martial artists', 149.99, ARRAY['Advanced Techniques', 'Sparring Sessions', 'Competition Preparation', 'One-on-One Coaching']),
('Self-Defense Mastery', 'Practical self-defense techniques for real-world situations', 119.99, ARRAY['Real-World Scenarios', 'Confidence Building', 'Mental Preparation', 'Flexible Schedule']);

-- Sample testimonials
INSERT INTO testimonials (name, content, belt_level, rating) VALUES
('Sarah Chen', 'Training here has completely transformed my confidence and physical strength. The instructors are incredibly patient and skilled.', 'Brown Belt', 5),
('Michael Rodriguez', 'The community here is amazing. Everyone supports each other while pushing to improve. Best decision I ever made.', 'Black Belt 1st Dan', 5),
('Emma Thompson', 'As a beginner, I was nervous about starting martial arts. The welcoming environment made all the difference.', 'Yellow Belt', 5),
('David Kim', 'The discipline and focus I have learned here has improved every aspect of my life, not just my martial arts skills.', 'Green Belt', 4),
('Lisa Johnson', 'Excellent instruction and traditional values combined with modern training methods. Highly recommend!', 'Blue Belt', 5),
('James Wilson', 'The self-defense program gave me practical skills and peace of mind. The instructors really care about their students.', 'Orange Belt', 5);

-- Sample events
INSERT INTO events (title, content, excerpt, date, tags) VALUES
('The Art of Meditation in Martial Arts', 'Meditation has been an integral part of martial arts for centuries. In this comprehensive guide, we explore how mindfulness and meditation can enhance your martial arts practice.

The connection between mind and body is fundamental to martial arts mastery. When we train our minds through meditation, we develop the focus and clarity needed to execute techniques with precision and power.

Regular meditation practice helps martial artists:
- Improve concentration during training
- Develop better body awareness
- Reduce training-related stress and anxiety
- Enhance mental resilience
- Achieve a state of calm alertness

Traditional martial arts schools have always emphasized the importance of mental discipline alongside physical training. Modern practitioners can benefit greatly from incorporating these ancient wisdom practices into their daily routine.

Start with just 5-10 minutes of daily meditation, focusing on your breath and body awareness. As you progress, you can explore moving meditation through kata practice and breathing exercises during technique repetition.

Remember, the goal is not to empty your mind completely, but to develop awareness and control over your thoughts and emotions. This mental discipline will translate directly into improved performance on the mat and greater peace in daily life.', 'Discover how meditation can enhance your martial arts practice and improve mental focus during training sessions.', '2024-01-15', ARRAY['Tips', 'Meditation', 'Mental Training']),

('5 Essential Self-Defense Techniques Every Woman Should Know', 'Personal safety is a fundamental right, and these practical self-defense techniques can help build confidence and provide protection in challenging situations.

1. The Palm Strike
One of the most effective techniques for close-range defense. Target the attacker''s nose or chin with the heel of your palm, keeping your fingers curved back to avoid injury.

2. Knee Strike
Extremely powerful when executed correctly. Drive your knee upward toward the attacker''s groin or midsection while pulling them toward you for maximum impact.

3. Elbow Strike
Perfect for close-quarters situations. Your elbow is one of the hardest and strongest parts of your body - use it to strike backward or to the side.

4. Eye Poke
Sometimes called the "eye jab," this technique can be highly effective for creating distance. Use your fingers to target the attacker''s eyes, then immediately escape.

5. Escape from Wrist Grabs
If someone grabs your wrist, remember to move toward their thumb (the weakest part of their grip) while pulling your arm in a circular motion.

Practice these techniques regularly, but remember that the best self-defense is awareness and avoiding dangerous situations when possible. Consider joining our self-defense classes for hands-on training with qualified instructors.', 'Learn five fundamental self-defense techniques that can help protect you in dangerous situations and build personal confidence.', '2024-01-20', ARRAY['Self-Defense', 'Women', 'Safety', 'Techniques']),

('The Philosophy Behind Traditional Karate', 'Traditional karate is much more than physical combat - it''s a philosophy of life that emphasizes respect, discipline, and continuous self-improvement.

The core principles of karate philosophy include:

Rei (Respect): Showing respect to instructors, fellow students, and the art itself. This extends beyond the dojo into daily life interactions.

Makoto (Truth/Honesty): Being truthful with yourself about your abilities and limitations, and honest in your dealings with others.

Doryoku (Effort): Continuous striving for improvement, not just in technique but in character development.

Nintai (Patience): Understanding that mastery takes time and that progress comes through consistent practice over years.

Gi (Justice): Developing a strong moral compass and using martial arts skills responsibly.

These philosophical foundations help students develop not just as martial artists, but as better human beings. The discipline learned in the dojo translates to improved focus at work, better relationships, and increased self-confidence.

Traditional karate teaches us that true strength comes from inner peace and self-control, not from the ability to defeat others. The ultimate goal is to develop such skill and confidence that you never need to use your abilities in anger or aggression.

This is why we emphasize character development alongside technical training in our programs.', 'Explore the deeper philosophical principles that form the foundation of traditional karate training and character development.', '2024-01-25', ARRAY['Philosophy', 'Karate', 'Traditional', 'Character']),

('Belt Progression: What Each Color Represents', 'The belt ranking system in martial arts serves as both a motivation tool and a marker of progress. Each belt color represents specific skills, knowledge, and character development.

White Belt (Beginner)
Represents purity and the beginning of the journey. Students learn basic stances, blocks, and strikes while developing discipline and respect.

Yellow Belt (Earth)
Like a seed planted in earth, students begin to grow. Basic techniques become more natural, and students start learning simple combinations.

Orange Belt (Sun)
The sun nurtures growth. Students develop more power in their techniques and begin learning intermediate forms and self-defense applications.

Green Belt (Plant)
Like a growing plant, students branch out into more complex techniques. Sparring skills develop, and leadership qualities begin to emerge.

Blue Belt (Sky)
Students reach toward new heights. Advanced techniques are introduced, and students may begin assisting with teaching junior ranks.

Brown Belt (Tree)
Like the strong trunk of a tree, students have developed solid fundamentals. They refine techniques and prepare for the final test of commitment.

Black Belt (Master/Student Balance)
Contrary to popular belief, black belt is not the end - it''s the beginning of true learning. The belt represents the balance between being a master of basics and a student of advanced concepts.

Remember, the belt is just a symbol. True progress is measured by character development, technical skill, and the ability to help others on their journey.', 'Understanding the meaning behind each belt color and what skills and character traits each rank represents in martial arts.', '2024-02-01', ARRAY['Belts', 'Progression', 'Karate', 'Basics']),

('Competition Preparation: Mind and Body', 'Preparing for martial arts competition requires training both physical techniques and mental resilience. Success comes from balancing these elements effectively.

Physical Preparation:
- Increase training intensity 8-12 weeks before competition
- Focus on techniques you''ll actually use in matches
- Improve cardiovascular conditioning through sparring drills
- Practice combinations until they become automatic
- Work on flexibility and injury prevention

Mental Preparation:
- Visualization exercises - see yourself performing successfully
- Develop pre-competition routines to manage nerves
- Practice competing in high-pressure situations during training
- Learn to control breathing and heart rate under stress
- Build confidence through consistent preparation

Competition Day Strategy:
- Arrive early to familiarize yourself with the environment
- Warm up properly but don''t exhaust yourself
- Focus on executing your game plan, not on winning or losing
- Stay hydrated and maintain energy with proper nutrition
- Support your teammates - good karma comes back around

Remember that competition is just another form of training. The real victory is in pushing yourself to improve and testing your skills against worthy opponents. Whether you win, lose, or draw, each competition teaches valuable lessons that make you a better martial artist.

The confidence and resilience you develop through competition will serve you well in all areas of life.', 'A comprehensive guide to preparing both mentally and physically for martial arts competitions and tournaments.', '2024-02-10', ARRAY['Competition', 'Training', 'Mental', 'Advanced']);

-- Sample instructor
INSERT INTO instructors (name, bio, specialties, years_experience, image_url) VALUES
('Sensei Takeshi Yamamoto', 'Master Yamamoto began his martial arts journey at age 6 in Okinawa, Japan. With over 40 years of experience, he holds black belts in multiple disciplines including Shotokan Karate, Aikido, and Jujutsu. He has dedicated his life to preserving traditional martial arts while adapting teaching methods for modern students. His philosophy emphasizes that martial arts training is a lifelong journey of self-discovery and character development.', ARRAY['Traditional Karate', 'Self-Defense', 'Meditation', 'Competition Training'], 40, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop');

-- Sample schedules
INSERT INTO schedules (class_name, day_of_week, start_time, end_time, belt_level, max_capacity) VALUES
('Beginner Karate', 1, '18:00', '19:00', 'White to Yellow', 20),
('Intermediate Training', 1, '19:15', '20:15', 'Orange to Blue', 15),
('Advanced Sparring', 1, '20:30', '21:30', 'Brown to Black', 12),
('Kids Martial Arts', 3, '16:00', '17:00', 'All Levels', 25),
('Self-Defense Workshop', 3, '19:00', '20:30', 'All Levels', 18),
('Competition Team', 5, '19:00', '21:00', 'Blue Belt+', 10),
('Traditional Forms', 6, '10:00', '11:30', 'All Levels', 20),
('Open Mat Training', 6, '14:00', '16:00', 'All Levels', 30);

-- Sample site content
INSERT INTO site_content (section, content) VALUES
('hero', '{
  "title": "ELEVATING WARRIOR CULTURE",
  "subtitle": "With martial arts, we strive for excellence in all things.",
  "cta_text": "Explore Programs",
  "stats": {
    "students": "2,700+",
    "years": "40",
    "achievements": "150+ Awards"
  }
}'),
('about', '{
  "title": "Building Martial Legacies Since 1985",
  "content": "For over four decades, our dojo has been a sanctuary for those seeking to master the ancient arts while embracing modern training methods. We believe in nurturing both the warrior spirit and the gentle heart.",
  "values": [
    {
      "title": "Self-Defense Mastery",
      "description": "Learn practical techniques for personal protection and confidence"
    },
    {
      "title": "Focus & Discipline", 
      "description": "Develop mental clarity and unwavering concentration"
    },
    {
      "title": "Mind-Body Harmony",
      "description": "Achieve balance between physical strength and inner peace"
    },
    {
      "title": "Excellence in All",
      "description": "Strive for perfection in every aspect of martial arts"
    }
  ]
}');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
