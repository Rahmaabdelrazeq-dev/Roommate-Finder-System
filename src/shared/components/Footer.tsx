import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Browse Rooms', to: '/search' },
      { label: 'My Wishlist', to: '/favorites' },
      { label: 'Verified Hosts', to: '#' },
      { label: 'Safety Guide', to: '#' },
    ],
    company: [
      { label: 'About Roomies', to: '#' },
      { label: 'Our Story', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Terms', to: '#' },
    ],
    resources: [
      { label: 'Help Center', to: '#' },
      { label: 'Community', to: '#' },
      { label: 'Trust & Safety', to: '#' },
      { label: 'Privacy Policy', to: '#' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Premium CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-16 text-center md:text-left">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4">
                Ready to find your <br className="hidden md:block" />
                <span className="text-blue-100">next home?</span>
              </h3>
              <p className="text-blue-100/70 font-medium text-lg leading-relaxed">
                Join our community of over 50,000 users finding the perfect living spaces and roommates every day.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link
                to="/signup"
                className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center gap-2 group"
              >
                Join for Free
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/search"
                className="px-8 py-4 bg-blue-500/20 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm hover:bg-white/10 transition-all duration-300"
              >
                Browse Listings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-black text-[#2d2d2d] tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Roomies<span className="text-blue-600">.</span>
            </h2>
            <p className="text-gray-400 font-medium text-base leading-relaxed max-w-sm">
              Making room-finding effortless, safe, and social. We're on a mission to help everyone find their place in the world.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#2d2d2d] mb-8 opacity-80" style={{ fontFamily: "'Outfit', sans-serif" }}>Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#2d2d2d] mb-8 opacity-80" style={{ fontFamily: "'Outfit', sans-serif" }}>Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#2d2d2d] mb-8 opacity-80" style={{ fontFamily: "'Outfit', sans-serif" }}>Support</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-gray-50 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <p className="text-xs font-bold text-gray-400">
              © {currentYear} Roomies Inc.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-gray-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-gray-400 transition-colors">Cookies</a>
            </div>
          </div>
          
          <p className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
            Crafted with <Heart size={14} className="text-red-400 fill-red-400" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
