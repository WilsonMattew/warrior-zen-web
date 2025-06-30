
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

interface Instructor {
  id: string;
  name: string;
  bio: string;
  specialties: string[];
  years_experience: number;
}

const About = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    const { data, error } = await supabase
      .from('instructors')
      .select('*');
    
    if (data && !error) {
      setInstructors(data);
    }
  };

  const values = [
    {
      title: 'Our Mission',
      description: 'To cultivate discipline, respect, and excellence through traditional martial arts training while building character and confidence in every student.',
      icon: '🎯'
    },
    {
      title: 'Why We Teach',
      description: 'We believe martial arts transforms lives by developing physical strength, mental fortitude, and spiritual balance in a supportive community environment.',
      icon: '💪'
    },
    {
      title: 'History & Legacy',
      description: 'Since 1985, we have been dedicated to preserving traditional martial arts while adapting modern training methods for contemporary students.',
      icon: '🏛️'
    }
  ];

  const martialArts = [
    { name: 'Kyumino', description: 'Traditional Japanese martial art focusing on precision and control' },
    { name: 'Hojijutsu', description: 'Ancient combat techniques emphasizing defense and counter-attacks' },
    { name: 'Kirigama', description: 'Weapon-based martial art with emphasis on blade techniques' },
    { name: 'Ninjando', description: 'Stealth and agility-based training methods' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute top-0 left-0 w-96 h-96 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20,180 Q20,20 180,20 Q180,180 20,180" fill="none" stroke="#dc2626" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span className="text-6xl">殿</span>
              </div>
              <div className="mb-4">
                <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  About Us
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Building Martial Legacies Since 1985.
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                For nearly four decades, we have been dedicated to teaching authentic martial arts 
                while building character, discipline, and confidence in our students. Our academy 
                combines traditional techniques with modern training methods.
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">2,450+</div>
                  <div className="text-sm text-gray-600">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">37</div>
                  <div className="text-sm text-gray-600">Awards Won</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">40+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
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
                  <blockquote className="text-xl font-medium mb-4">
                    "The ultimate aim of martial arts is not having to use them."
                  </blockquote>
                  <cite className="text-red-100">- Master Philosophy</cite>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Foundation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built on principles of respect, discipline, and continuous improvement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Martial Arts Forms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Martial Arts We Teach
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the ancient arts that form the foundation of our training
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {martialArts.map((art, index) => (
              <motion.div
                key={art.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors">
                      <span className="text-white font-bold text-lg">殿</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{art.name}</h3>
                    <p className="text-gray-600 text-sm">{art.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learn From The Best Martial Arts Instructors Around
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our expert team brings decades of experience and passion for martial arts education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">{instructor.name[0]}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{instructor.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{instructor.years_experience} years of experience</p>
                    <div className="flex flex-wrap justify-center gap-1 mb-3">
                      {instructor.specialties.slice(0, 2).map((specialty, idx) => (
                        <span key={idx} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
