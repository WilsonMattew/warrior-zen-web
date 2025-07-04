import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', section: 'home' },
    { name: 'About Us', section: 'about' },
    { name: 'Programs', section: 'programs' },
    { name: 'Gallery', section: 'gallery', isLink: true, href: '/gallery' },
    { name: 'Testimonials', section: 'testimonials' },
    { name: 'Contact', section: 'contact' },
  ];

  const handleNavigation = (item: any) => {
    if (item.isLink && item.href) {
      window.location.href = item.href;
    } else {
      scrollToSection(item.section);
    }
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.section);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 nsk-gradient rounded-2xl flex items-center justify-center shadow-lg">
              <img 
                src="/lovable-uploads/b3eafb74-6688-408f-80fb-3ef4663ce71d.png" 
                alt="NSK Logo" 
                className="w-8 h-8 object-contain brightness-0 invert"
              />
            </div>
            <span className="text-2xl font-bold nsk-text-gradient">
              NSK Karate
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.section
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {item.name}
              </button>
            ))}
            <Link to="/events">
              <Button className="ml-4 nsk-gradient hover:shadow-xl text-white rounded-full px-8 py-3 shadow-lg transition-all duration-300">
                Events
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] rounded-l-3xl">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item)}
                      className={`text-left p-4 rounded-2xl text-lg font-medium transition-all ${
                        activeSection === item.section
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                  <Link to="/events">
                    <Button className="w-full nsk-gradient text-white rounded-2xl py-4 mt-4">
                      Events
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
