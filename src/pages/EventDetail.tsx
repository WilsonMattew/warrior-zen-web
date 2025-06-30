
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Calendar, Tag, Clock, User, ArrowLeft } from 'lucide-react';
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

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (id) {
      // Extract event ID from slug (format: title-slug-eventId)
      const eventId = id.split('-').pop();
      if (eventId) {
        fetchEvent(eventId);
      }
    }
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();
    
    if (data && !error) {
      setEvent(data);
      fetchRelatedEvents(data.tags, eventId);
    }
  };

  const fetchRelatedEvents = async (tags: string[], currentEventId: string) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .neq('id', currentEventId)
      .limit(3);
    
    if (data && !error) {
      setRelatedEvents(data);
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

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Back Button */}
      <div className="pt-32 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/events" className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Events</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-12 bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-video bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl overflow-hidden mb-8 relative">
              <img 
                src={`https://images.unsplash.com/photo-1571019613540-14d15f8bd56b?w=800&h=450&fit=crop`}
                alt={event.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-sm px-4 py-2 rounded-full ${getTagColor(tag)} flex items-center space-x-1`}
                >
                  <Tag className="w-4 h-4" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Sensei Team</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="prose max-w-none">
              <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.content}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Related Events
              </h2>
              <p className="text-gray-600">
                Discover more martial arts insights and events
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedEvents.map((relatedEvent, index) => (
                <motion.div
                  key={relatedEvent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/events/${createSlug(relatedEvent.title)}-${relatedEvent.id}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 rounded-3xl overflow-hidden hover:-translate-y-2">
                      <div className="aspect-video bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/photo-${1550000000000 + index}?w=400&h=250&fit=crop`}
                          alt={relatedEvent.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                          {relatedEvent.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                          {relatedEvent.excerpt}
                        </p>
                        <div className="mt-4 text-xs text-gray-500">
                          {formatDate(relatedEvent.date)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-red-100 mb-8 text-lg">
              Join our martial arts community and discover your inner warrior
            </p>
            <Link to="/">
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventDetail;
