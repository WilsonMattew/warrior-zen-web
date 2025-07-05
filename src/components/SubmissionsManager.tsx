
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Mail, Phone, Calendar, Users, TrendingUp, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdmissionForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  selected_class: string;
  message?: string;
  created_at: string;
}

interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  created_at: string;
}

const SubmissionsManager = () => {
  const { toast } = useToast();
  const [admissionForms, setAdmissionForms] = useState<AdmissionForm[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    const [admissionRes, contactRes] = await Promise.all([
      supabase.from('admission_forms').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_forms').select('*').order('created_at', { ascending: false })
    ]);

    if (admissionRes.data) setAdmissionForms(admissionRes.data);
    if (contactRes.data) setContactForms(contactRes.data);
    setLoading(false);
  };

  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Add country code if not present (assuming India +91)
    if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
      return `91${cleanPhone}`;
    }
    return cleanPhone;
  };

  const openWhatsApp = (phone: string, name: string, type: 'admission' | 'contact') => {
    const whatsappPhone = formatPhoneForWhatsApp(phone);
    const message = type === 'admission' 
      ? `Hello ${name}, thank you for your interest in joining NSK Karate. We received your admission form and will get back to you soon!`
      : `Hello ${name}, thank you for contacting NSK Karate. We received your message and will respond shortly!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const openEmail = (email: string, name: string, type: 'admission' | 'contact') => {
    const subject = type === 'admission' 
      ? `Welcome to NSK Karate - ${name}`
      : `Thank you for contacting NSK Karate - ${name}`;
    
    const body = type === 'admission'
      ? `Dear ${name},\n\nThank you for your interest in joining NSK Karate. We have received your admission form and our team will contact you soon with further details.\n\nBest regards,\nNSK Karate Team`
      : `Dear ${name},\n\nThank you for contacting NSK Karate. We have received your message and will respond to your inquiry shortly.\n\nBest regards,\nNSK Karate Team`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const getAnalytics = () => {
    const today = new Date();
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const admissionThisWeek = admissionForms.filter(form => new Date(form.created_at) >= thisWeek).length;
    const admissionThisMonth = admissionForms.filter(form => new Date(form.created_at) >= thisMonth).length;
    const contactThisWeek = contactForms.filter(form => new Date(form.created_at) >= thisWeek).length;
    const contactThisMonth = contactForms.filter(form => new Date(form.created_at) >= thisMonth).length;

    const popularClasses = admissionForms.reduce((acc, form) => {
      acc[form.selected_class] = (acc[form.selected_class] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topClass = Object.entries(popularClasses).sort(([,a], [,b]) => b - a)[0];

    return {
      admissionThisWeek,
      admissionThisMonth,
      contactThisWeek,
      contactThisMonth,
      totalAdmissions: admissionForms.length,
      totalContacts: contactForms.length,
      topClass: topClass ? `${topClass[0]} (${topClass[1]} applications)` : 'N/A'
    };
  };

  const analytics = getAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 nsk-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">殿</span>
          </div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 nsk-gradient rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalAdmissions}</p>
                <p className="text-gray-600 text-sm">Total Admissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 nsk-gradient rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalContacts}</p>
                <p className="text-gray-600 text-sm">Total Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 nsk-gradient rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.admissionThisWeek}</p>
                <p className="text-gray-600 text-sm">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 nsk-gradient rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.admissionThisMonth}</p>
                <p className="text-gray-600 text-sm">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="admissions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-gray-100 p-1">
          <TabsTrigger value="admissions" className="rounded-xl">
            Admission Forms ({admissionForms.length})
          </TabsTrigger>
          <TabsTrigger value="contacts" className="rounded-xl">
            Contact Forms ({contactForms.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="admissions">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Admission Form Submissions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admissionForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{form.email}</div>
                          <div className="text-sm text-gray-600">{form.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{form.city}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="rounded-xl">
                          {form.selected_class}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(form.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openWhatsApp(form.phone, form.name, 'admission')}
                            className="rounded-xl"
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEmail(form.email, form.name, 'admission')}
                            className="rounded-xl"
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {admissionForms.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No admission forms submitted yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Contact Form Submissions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{form.email}</div>
                          {form.phone && (
                            <div className="text-sm text-gray-600">{form.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{form.subject || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate text-sm text-gray-600">
                          {form.message}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(form.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {form.phone && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openWhatsApp(form.phone!, form.name, 'contact')}
                              className="rounded-xl"
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEmail(form.email, form.name, 'contact')}
                            className="rounded-xl"
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {contactForms.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No contact forms submitted yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubmissionsManager;
