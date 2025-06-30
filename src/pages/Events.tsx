
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

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
      'Tips': 'bg-blue-50 text-blue-600',
      'Karate': 'bg-red-50 text-red-600',
      'Advanced': 'bg-purple-50 text-purple-600',
      'Techniques': 'bg-green-50 text-green-600',
      'Self-Defense': 'bg-orange-50 text-orange-600',
      'Basics': 'bg-gray-50 text-gray-600'
    };
    return colors[tag] || 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute top-0 left-0 w-96 h-96 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20,180 Q20,20 180,20 Q180,180 20,180" fill="none" stroke="#dc2626" strokeWidth="2"/>
            <circle cx="60" cy="60" r="3" fill="#dc2626"/>
            <circle cx="140" cy="140" r="2" fill="#dc2626"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <span className="text-6xl">殿</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              THE BEST <span className="text-red-600">⚡</span> MARTIAL<br />
              ARTS INSIGHTS
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's explore the world of martial arts with our insightful blog.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unlocking Martial Arts Insights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sed ut perspiciatis unde omnis iste natus sed dicere voluptatem accusantium.
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
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden rounded-t-lg">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl text-white/50">🥋</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full ${getTagColor(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="text-xs text-gray-500">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {event.excerpt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {events.length > displayCount && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setDisplayCount(prev => prev + 6)}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-full"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
