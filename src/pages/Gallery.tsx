
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Camera } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  section: string;
  display_order: number;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>('all');

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('display_order');
    
    if (data && !error) {
      setImages(data);
    }
  };

  const sections = ['all', ...Array.from(new Set(images.map(img => img.section)))];
  const filteredImages = selectedSection === 'all' 
    ? images 
    : images.filter(img => img.section === selectedSection);

  const getGridItemClass = (index: number) => {
    const patterns = [
      'col-span-2 row-span-2', // Large square
      'col-span-1 row-span-1', // Small square
      'col-span-1 row-span-2', // Tall rectangle
      'col-span-2 row-span-1', // Wide rectangle
      'col-span-1 row-span-1', // Small square
      'col-span-1 row-span-1', // Small square
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 nsk-gradient-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="/lovable-uploads/b3eafb74-6688-408f-80fb-3ef4663ce71d.png" 
            alt="NSK Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 nsk-gradient rounded-3xl mb-8 shadow-xl">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              MARTIAL ARTS<br />
              <span className="nsk-text-gradient">GALLERY</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the spirit and dedication of our martial arts community through 
              these captured moments of training, achievement, and camaraderie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  selectedSection === section
                    ? 'nsk-gradient text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 auto-rows-[200px]">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${getGridItemClass(index)} group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                      {image.description && (
                        <p className="text-sm opacity-90">{image.description}</p>
                      )}
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs">
                        {image.section}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Images Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Our gallery is being prepared. Check back soon for amazing martial arts moments!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
