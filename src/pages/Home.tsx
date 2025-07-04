import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import Navigation from '../components/Navigation';
import { Star, Shield, Target, Heart, Phone, Mail, MapPin } from 'lucide-react';
import StatsSection from '../components/StatsSection';
import AdmissionForm from '../components/AdmissionForm';

interface Program {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  thumbnail_url?: string;
}

interface Testimonial {
  id: string;
  name: string;
  content: string;
  belt_level: string;
  rating: number;
  image_url?: string;
}

const Home = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
      .limit(6);
    
    if (data && !error) {
      setTestimonials(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const values = [
    {
      icon: Shield,
      title: 'Self-Defense Mastery',
      description: 'Learn practical techniques for personal protection and confidence',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Target,
      title: 'Focus & Discipline',
      description: 'Develop mental clarity and unwavering concentration',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: Heart,
      title: 'Mind-Body Harmony',
      description: 'Achieve balance between physical strength and inner peace',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Star,
      title: 'Excellence in All',
      description: 'Strive for perfection in every aspect of martial arts',
      color: 'from-cyan-400 to-cyan-600'
    }
  ];

  const martialArts = [
    { name: 'Kyumino', image: 'https://images.unsplash.com/photo-1544717441-6b50a3ba3019?w=300&h=200&fit=crop' },
    { name: 'Hojijutsu', image: 'https://images.unsplash.com/photo-1571019613540-14d15f8bd56b?w=300&h=200&fit=crop' },
    { name: 'Kirigama', image: 'https://images.unsplash.com/photo-1606506351184-3b0e2c4b8fdc?w=300&h=200&fit=crop' },
    { name: 'Ninjando', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=300&h=200&fit=crop' },
    { name: 'Naginata', image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=300&h=200&fit=crop' },
    { name: 'Aikido', image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=300&h=200&fit=crop' }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 nsk-gradient-light"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <img 
            src="/lovable-uploads/b3eafb74-6688-408f-80fb-3ef4663ce71d.png" 
            alt="NSK Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <img 
                  src="/lovable-uploads/b3eafb74-6688-408f-80fb-3ef4663ce71d.png" 
                  alt="NSK Logo" 
                  className="w-24 h-24 opacity-80"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                ELEVATING<br />
                <span className="nsk-text-gradient">
                  WARRIOR
                </span><br />
                CULTURE.
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-lg leading-relaxed">
                With martial arts, we strive for excellence in all things. 
                Discover the path to inner peace and physical mastery.
              </p>
              <div className="flex items-center space-x-6 mb-12">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop&crop=face`}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-12 h-12 nsk-gradient rounded-full border-4 border-white flex items-center justify-center text-white font-bold shadow-lg">
                    2K+
                  </div>
                </div>
                <span className="text-gray-600">Trusted by 2,700+ Students</span>
              </div>
              <Button 
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="nsk-gradient hover:opacity-90 text-white px-12 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Explore Programs
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 nsk-gradient rounded-[3rem] opacity-10 transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1571019613540-14d15f8bd56b?w=600&h=700&fit=crop"
                  alt="Martial artist"
                  className="relative w-full h-[500px] object-cover rounded-[3rem] shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl">
                  <div className="text-3xl font-bold text-gray-900">40+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Martial Arts Forms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Martial Arts Disciplines</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master various traditional and modern martial arts forms under expert guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {martialArts.map((art, index) => (
              <motion.div
                key={art.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src={art.image}
                    alt={art.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">{art.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 nsk-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=700&fit=crop"
                  alt="Sensei"
                  className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl"
                />
                <div className="absolute -top-6 -left-6 bg-white p-8 rounded-3xl shadow-xl">
                  <img 
                    src="/lovable-uploads/b3eafb74-6688-408f-80fb-3ef4663ce71d.png" 
                    alt="NSK Logo" 
                    className="w-16 h-16"
                  />
                  <div className="text-gray-600 mt-2">Master Sensei</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Building Martial<br />
                <span className="nsk-text-gradient">Legacies</span> Since 1985
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                For over four decades, our dojo has been a sanctuary for those seeking to master 
                the ancient arts while embracing modern training methods. We believe in nurturing 
                both the warrior spirit and the gentle heart.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Path
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover the perfect program to begin or advance your martial arts journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl overflow-hidden group-hover:-translate-y-2">
                  <div className="h-48 nsk-gradient relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={program.thumbnail_url || "https://images.unsplash.com/photo-1544717441-6b50a3ba3019?w=400&h=300&fit=crop"}
                        alt="Training"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                    <div className="space-y-3 mb-8">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-4xl font-bold text-gray-900">${program.price}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <AdmissionForm selectedClass={program.name}>
                        <Button className="nsk-gradient hover:opacity-90 text-white rounded-full px-8">
                          Join Class
                        </Button>
                      </AdmissionForm>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 nsk-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Student Success Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hear from our martial arts community about their transformative journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      {testimonial.image_url ? (
                        <img 
                          src={testimonial.image_url} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 nsk-gradient rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.belt_level}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let's Get In Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ready to begin your martial arts journey? Contact us for expert guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8 rounded-3xl border-0 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="rounded-2xl border-gray-200 focus:border-blue-500 h-14"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="rounded-2xl border-gray-200 focus:border-blue-500 h-14"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="rounded-2xl border-gray-200 focus:border-blue-500 min-h-32"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full nsk-gradient hover:opacity-90 text-white rounded-2xl h-14 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 nsk-gradient rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Visit Our Dojo</h4>
                    <p className="text-gray-600">123 Martial Arts Street<br />Tokyo, Japan 100-0001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600">+81 3-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600">sensei@nsk-dojo.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1571019613540-14d15f8bd56b?w=500&h=300&fit=crop"
                  alt="Dojo interior"
                  className="w-full h-64 object-cover rounded-3xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 nsk-gradient rounded-2xl flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/b3eafb74-6688-408f-80fb-3ef4663ce71d.png" 
                    alt="NSK Logo" 
                    className="w-8 h-8 brightness-0 invert"
                  />
                </div>
                <span className="text-2xl font-bold">NSK Dojo</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Elevating warrior culture through traditional martial arts training 
                and modern coaching techniques.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <div className="space-y-3">
                {['Home', 'About', 'Programs', 'Testimonials', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Connect With Us</h3>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                  <div key={social} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">{social[0].toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 NSK Dojo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
