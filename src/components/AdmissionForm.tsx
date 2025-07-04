
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface AdmissionFormProps {
  selectedClass?: string;
  children: React.ReactNode;
}

const AdmissionForm = ({ selectedClass, children }: AdmissionFormProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    selected_class: selectedClass || '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const classOptions = [
    'Kyumino - Beginner',
    'Hojijutsu - Intermediate',
    'Kirigama - Advanced',
    'Ninjando - Master',
    'Naginata - Weapons',
    'Aikido - Self-Defense'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('admission_forms')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: 'Application Submitted!',
        description: 'We will contact you soon to discuss your martial arts journey.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        selected_class: selectedClass || '',
        message: ''
      });
      
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-center nsk-text-gradient">
                Join Our Martial Arts Family
              </CardTitle>
              <p className="text-gray-600 text-center">
                Begin your journey to mastery with NSK Karate
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="rounded-2xl border-gray-200 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="rounded-2xl border-gray-200 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="rounded-2xl border-gray-200 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <Input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="rounded-2xl border-gray-200 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Class *
                  </label>
                  <Select 
                    value={formData.selected_class} 
                    onValueChange={(value) => setFormData({...formData, selected_class: value})}
                  >
                    <SelectTrigger className="rounded-2xl border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select a martial arts class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your martial arts goals or any questions you have..."
                    className="rounded-2xl border-gray-200 focus:border-blue-500 min-h-24"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full nsk-gradient hover:opacity-90 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdmissionForm;
