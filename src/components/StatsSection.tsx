
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Users, Award, Calendar, Target } from 'lucide-react';

interface Stat {
  id: string;
  stat_name: string;
  stat_value: number;
  stat_label: string;
  icon?: string;
}

const StatsSection = () => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('site_stats')
      .select('*')
      .order('stat_name');
    
    if (data && !error) {
      setStats(data);
    }
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'users':
        return Users;
      case 'award':
        return Award;
      case 'calendar':
        return Calendar;
      case 'target':
        return Target;
      default:
        return Users;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = getIcon(stat.icon);
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 nsk-gradient rounded-3xl mb-4 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.stat_value.toLocaleString()}+
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.stat_label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
