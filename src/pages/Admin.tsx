
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
}

interface Testimonial {
  id?: string;
  name: string;
  content: string;
  belt_level: string;
  rating: number;
}

interface Program {
  id?: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

const Admin = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [eventsRes, testimonialsRes, programsRes] = await Promise.all([
      supabase.from('events').select('*').order('created_at', { ascending: false }),
      supabase.from('testimonials').select('*'),
      supabase.from('programs').select('*').order('price')
    ]);

    if (eventsRes.data) setEvents(eventsRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    if (programsRes.data) setPrograms(programsRes.data);
  };

  const saveEvent = async (event: Event) => {
    const { error } = event.id
      ? await supabase.from('events').update(event).eq('id', event.id)
      : await supabase.from('events').insert([event]);

    if (!error) {
      toast({ title: 'Success', description: 'Event saved successfully' });
      fetchAll();
      setEditingEvent(null);
    } else {
      toast({ title: 'Error', description: 'Failed to save event' });
    }
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) {
      toast({ title: 'Success', description: 'Event deleted successfully' });
      fetchAll();
    } else {
      toast({ title: 'Error', description: 'Failed to delete event' });
    }
  };

  const saveTestimonial = async (testimonial: Testimonial) => {
    const { error } = testimonial.id
      ? await supabase.from('testimonials').update(testimonial).eq('id', testimonial.id)
      : await supabase.from('testimonials').insert([testimonial]);

    if (!error) {
      toast({ title: 'Success', description: 'Testimonial saved successfully' });
      fetchAll();
      setEditingTestimonial(null);
    } else {
      toast({ title: 'Error', description: 'Failed to save testimonial' });
    }
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) {
      toast({ title: 'Success', description: 'Testimonial deleted successfully' });
      fetchAll();
    } else {
      toast({ title: 'Error', description: 'Failed to delete testimonial' });
    }
  };

  const saveProgram = async (program: Program) => {
    const { error } = program.id
      ? await supabase.from('programs').update(program).eq('id', program.id)
      : await supabase.from('programs').insert([program]);

    if (!error) {
      toast({ title: 'Success', description: 'Program saved successfully' });
      fetchAll();
      setEditingProgram(null);
    } else {
      toast({ title: 'Error', description: 'Failed to save program' });
    }
  };

  const deleteProgram = async (id: string) => {
    const { error } = await supabase.from('programs').delete().eq('id', id);
    if (!error) {
      toast({ title: 'Success', description: 'Program deleted successfully' });
      fetchAll();
    } else {
      toast({ title: 'Error', description: 'Failed to delete program' });
    }
  };

  const EventForm = ({ event, onSave, onCancel }: { event?: Event, onSave: (event: Event) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Event>(event || {
      title: '',
      content: '',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      tags: []
    });

    const handleTagsChange = (tagsString: string) => {
      setFormData({ ...formData, tags: tagsString.split(',').map(tag => tag.trim()) });
    };

    return (
      <Card className="rounded-3xl border-0 shadow-xl">
        <CardHeader>
          <CardTitle>{event ? 'Edit Event' : 'New Event'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="rounded-2xl"
          />
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="rounded-2xl"
          />
          <Textarea
            placeholder="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="rounded-2xl"
          />
          <Textarea
            placeholder="Full Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="rounded-2xl min-h-32"
          />
          <Input
            placeholder="Tags (comma separated)"
            value={formData.tags.join(', ')}
            onChange={(e) => handleTagsChange(e.target.value)}
            className="rounded-2xl"
          />
          <div className="flex space-x-4">
            <Button onClick={() => onSave(formData)} className="rounded-2xl">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel} className="rounded-2xl">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TestimonialForm = ({ testimonial, onSave, onCancel }: { testimonial?: Testimonial, onSave: (testimonial: Testimonial) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Testimonial>(testimonial || {
      name: '',
      content: '',
      belt_level: '',
      rating: 5
    });

    return (
      <Card className="rounded-3xl border-0 shadow-xl">
        <CardHeader>
          <CardTitle>{testimonial ? 'Edit Testimonial' : 'New Testimonial'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Student Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-2xl"
          />
          <Input
            placeholder="Belt Level"
            value={formData.belt_level}
            onChange={(e) => setFormData({ ...formData, belt_level: e.target.value })}
            className="rounded-2xl"
          />
          <Input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            className="rounded-2xl"
          />
          <Textarea
            placeholder="Testimonial Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="rounded-2xl min-h-24"
          />
          <div className="flex space-x-4">
            <Button onClick={() => onSave(formData)} className="rounded-2xl">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel} className="rounded-2xl">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProgramForm = ({ program, onSave, onCancel }: { program?: Program, onSave: (program: Program) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Program>(program || {
      name: '',
      description: '',
      price: 0,
      features: []
    });

    const handleFeaturesChange = (featuresString: string) => {
      setFormData({ ...formData, features: featuresString.split(',').map(feature => feature.trim()) });
    };

    return (
      <Card className="rounded-3xl border-0 shadow-xl">
        <CardHeader>
          <CardTitle>{program ? 'Edit Program' : 'New Program'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Program Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-2xl"
          />
          <Input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="rounded-2xl"
          />
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="rounded-2xl"
          />
          <Textarea
            placeholder="Features (comma separated)"
            value={formData.features.join(', ')}
            onChange={(e) => handleFeaturesChange(e.target.value)}
            className="rounded-2xl"
          />
          <div className="flex space-x-4">
            <Button onClick={() => onSave(formData)} className="rounded-2xl">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel} className="rounded-2xl">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">殿</span>
              </div>
              <span className="text-gray-700">Sensei Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="events" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-gray-100 p-1">
              <TabsTrigger value="events" className="rounded-xl">Events</TabsTrigger>
              <TabsTrigger value="testimonials" className="rounded-xl">Testimonials</TabsTrigger>
              <TabsTrigger value="programs" className="rounded-xl">Programs</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
                <Button 
                  onClick={() => setEditingEvent({
                    title: '',
                    content: '',
                    excerpt: '',
                    date: new Date().toISOString().split('T')[0],
                    tags: []
                  })}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Button>
              </div>

              {editingEvent && (
                <EventForm
                  event={editingEvent.id ? editingEvent : undefined}
                  onSave={saveEvent}
                  onCancel={() => setEditingEvent(null)}
                />
              )}

              <div className="grid gap-4">
                {events.map((event) => (
                  <Card key={event.id} className="rounded-2xl border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{event.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <span>Tags: {event.tags.join(', ')}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingEvent(event)}
                            className="rounded-xl"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => event.id && deleteEvent(event.id)}
                            className="rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Testimonials</h2>
                <Button 
                  onClick={() => setEditingTestimonial({
                    name: '',
                    content: '',
                    belt_level: '',
                    rating: 5
                  })}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Testimonial
                </Button>
              </div>

              {editingTestimonial && (
                <TestimonialForm
                  testimonial={editingTestimonial.id ? editingTestimonial : undefined}
                  onSave={saveTestimonial}
                  onCancel={() => setEditingTestimonial(null)}
                />
              )}

              <div className="grid gap-4">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="rounded-2xl border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{testimonial.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">"{testimonial.content}"</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{testimonial.belt_level}</span>
                            <span>Rating: {testimonial.rating}/5</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingTestimonial(testimonial)}
                            className="rounded-xl"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => testimonial.id && deleteTestimonial(testimonial.id)}
                            className="rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Programs</h2>
                <Button 
                  onClick={() => setEditingProgram({
                    name: '',
                    description: '',
                    price: 0,
                    features: []
                  })}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Program
                </Button>
              </div>

              {editingProgram && (
                <ProgramForm
                  program={editingProgram.id ? editingProgram : undefined}
                  onSave={saveProgram}
                  onCancel={() => setEditingProgram(null)}
                />
              )}

              <div className="grid gap-4">
                {programs.map((program) => (
                  <Card key={program.id} className="rounded-2xl border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{program.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>${program.price}/month</span>
                            <span>Features: {program.features.join(', ')}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProgram(program)}
                            className="rounded-xl"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => program.id && deleteProgram(program.id)}
                            className="rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
