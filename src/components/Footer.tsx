
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-red-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-gray-600 hover:text-red-600 transition-colors">
                About
              </Link>
              <Link to="/testimonials" className="block text-gray-600 hover:text-red-600 transition-colors">
                Testimonials
              </Link>
              <Link to="/events" className="block text-gray-600 hover:text-red-600 transition-colors">
                Events
              </Link>
              <Link to="/contact" className="block text-gray-600 hover:text-red-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Brand & Tagline */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">殿</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Sensei</span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs mx-auto">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2 text-gray-600">
              <p>sensei@support.com</p>
              <p>+123 456 7890</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-red-700 transition-colors">
                  f
                </a>
                <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-red-700 transition-colors">
                  t
                </a>
                <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-red-700 transition-colors">
                  i
                </a>
                <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-red-700 transition-colors">
                  y
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>©2025 Sensei Template Kit by legtheme.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
