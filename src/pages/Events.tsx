
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Event {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
  created_at: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
    
    if (data && !error) {
      setEvents(data);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'Tips': 'bg-blue-100 text-blue-700',
      'Karate': 'bg-red-100 text-red-700',
      'Advanced': 'bg-purple-100 text-purple-700',
      'Techniques': 'bg-green-100 text-green-700',
      'Self-Defense': 'bg-orange-100 text-orange-700',
      'Basics': 'bg-gray-100 text-gray-700'
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop"
            alt="Cherry blossoms"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <span className="text-8xl opacity-20 font-light">殿</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              MARTIAL ARTS<br />
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                INSIGHTS & EVENTS
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest events, workshops, and insights from our martial arts community.
              Join us on this journey of continuous learning and growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events & Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest martial arts events, training tips, and community stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, displayCount).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/events/${createSlug(event.title)}-${event.id}`}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 group border-0 rounded-3xl overflow-hidden hover:-translate-y-2">
                    <div className="aspect-video bg-gradient-to-br from-red-500 via-red-600 to-red-700 relative overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-${1550000000000 + index}?w=400&h=250&fit=crop`}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-3 py-1 rounded-full ${getTagColor(tag)} flex items-center space-x-1`}
                          >
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {event.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatDate(event.created_at)}
                        </span>
                        <span className="text-red-600 text-sm font-medium group-hover:underline">
                          Read More →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {events.length > displayCount && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setDisplayCount(prev => prev + 6)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Load More Events
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
