import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    {
      title: 'Product',
      links: ['Find a Room', 'List a Room', 'Roomies Gold', 'Safety', 'Pricing'],
    },
    {
      title: 'Community',
      links: ['Blog', 'Support Center', 'Community Guidelines', 'Affiliate Program'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Contact', 'Partners'],
    },
  ];

  return (
    <footer className="bg-white pt-10 pb-10 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <h3 className="font-bold text-gray-900 text-sm mb-6 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link to="/" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="flex flex-col col-span-2 lg:col-span-1">
            <h3 className="font-bold text-gray-900 text-sm mb-6 uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Get the latest updates on new features, city launches, and roommate tips.
            </p>
            <div className="relative w-full">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#2d2d2d] hover:bg-black text-white p-2 rounded-lg transition-colors flex items-center justify-center aspect-square">
                <FaArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm font-medium text-gray-400">
            <span>© {new Date().getFullYear()} Roomies. All rights reserved.</span>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
              <Link to="/" className="hover:text-gray-900 transition-colors">Sitemap</Link>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all group">
              <FaFacebook size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all group">
              <FaTwitter size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all group">
              <FaInstagram size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all group">
              <FaLinkedin size={18} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;