
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';

interface Program {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

interface Testimonial {
  id: string;
  name: string;
  content: string;
  belt_level: string;
  rating: number;
}

const Home = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchPrograms();
    fetchTestimonials();
  }, []);

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('price');
    
    if (data && !error) {
      setPrograms(data);
    }
  };

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .limit(3);
    
    if (data && !error) {
      setTestimonials(data);
    }
  };

  const martialArts = [
    { name: 'Kyumino', icon: '⚡' },
    { name: 'Hojijutsu', icon: '🗡️' },
    { name: 'Kirigama', icon: '⚔️' },
    { name: 'Ninjando', icon: '🥷' },
    { name: 'Hojijutsu', icon: '🛡️' },
    { name: 'Naginata', icon: '🏹' }
  ];

  const values = [
    {
      title: 'Develop self-defense and safety skills',
      description: 'Learn practical techniques for personal protection'
    },
    {
      title: 'Provides stress relief & mental clarity',
      description: 'Find peace and focus through martial arts practice'
    },
    {
      title: 'Develops discipline and focus',
      description: 'Build character and mental strength'
    },
    {
      title: 'Boosted self confidence',
      description: 'Gain confidence through skill mastery'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20,20 Q180,20 180,180 Q20,180 20,20" fill="none" stroke="#dc2626" strokeWidth="2"/>
            <circle cx="50" cy="50" r="3" fill="#dc2626"/>
            <circle cx="150" cy="80" r="2" fill="#dc2626"/>
            <circle cx="80" cy="150" r="2" fill="#dc2626"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span className="text-6xl">殿</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                ELEVATING <span className="text-red-600">⚡</span> WARRIOR<br />
                CULTURE.
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                With martial arts, we strive for excellence in all things.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">2K</div>
                </div>
                <span className="text-sm text-gray-600">Trusted by 2.7K+ Members</span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg">
                Explore Programs
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-red-600 rounded-3xl p-8 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl"></div>
                <div className="relative">
                  <div className="text-6xl mb-4">🥋</div>
                  <h3 className="text-2xl font-bold mb-4">Building Martial Legacies Since 1985.</h3>
                  <p className="text-red-100 mb-6">
                    Four decades of excellence in martial arts training and character development.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Martial Arts Forms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {martialArts.map((art, index) => (
              <motion.div
                key={art.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {art.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{art.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Best Choice For<br />Martial Arts Training
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive programs designed to meet your martial arts goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <div className="space-y-2 mb-6">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">${program.price}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6">
                        Join Class
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                TEEN & ADULT <span className="text-6xl">殿</span><br />
                KARATE.
              </h2>
              <p className="text-gray-600 mb-8">
                Train with us and achieve mastery of mind, body, and spirit.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-red-600 text-lg">★</span>
                  ))}
                </div>
                <span className="text-gray-600">4.5 37 Prestige Awards | 2450 Members</span>
              </div>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{value.title}</h4>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-red-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700"></div>
                <div className="relative text-center">
                  <div className="text-8xl mb-4">🥋</div>
                  <h3 className="text-2xl font-bold">Master Your Art</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-gray-600">Hear from our martial arts community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-red-600">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.belt_level}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                View All Testimonials
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
