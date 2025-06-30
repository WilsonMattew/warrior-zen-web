
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Event {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
  thumbnail_url?: string;
  created_at: string;
}

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    if (!id) return;
    
    // Extract event ID from slug (last part after the last dash)
    const eventId = id.includes('-') ? id.split('-').pop() : id;
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();
    
    if (data && !error) {
      setEvent(data);
    }
    setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
            <Link to="/events">
              <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop"
            alt="Cherry blossoms"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/events"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Events</span>
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-sm px-4 py-2 rounded-full ${getTagColor(tag)} flex items-center space-x-1`}
                >
                  <Tag className="w-3 h-3" />
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
                <span>Published {formatDate(event.created_at)}</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {event.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {event.thumbnail_url && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={event.thumbnail_url}
                alt={event.title}
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="rounded-3xl border-0 shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventDetail;
