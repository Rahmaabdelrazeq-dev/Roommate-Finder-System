import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-50">
      {/* Upper Row: Logo and Auth */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center select-none cursor-pointer group" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {/* The letter 'R' */}
          <span className="text-[34px] font-bold tracking-[-0.04em] text-blue-600 group-hover:text-blue-700 transition-colors">
            R
          </span>

          {/* The Custom Search-O (Magnifying Glass) */}
          <div className="relative flex items-center justify-center w-[26px] h-[26px] mx-[1px] mt-[6px] group-hover:scale-105 transition-transform">
            {/* Outer Circle */}
            <div className="w-full h-full border-[5px] border-blue-600 group-hover:border-blue-700 rounded-full transition-colors"></div>
            {/* The Magnifying Glass Handle (The 'tail') */}
            <div 
              className="absolute -bottom-[2px] -right-[1px] w-[8px] h-[5px] bg-blue-600 group-hover:bg-blue-700 rounded-full transition-colors" 
              style={{ transform: 'rotate(45deg)' }}
            ></div>
          </div>

          {/* The letters 'omies' */}
          <span className="text-[34px] font-bold tracking-[-0.04em] text-blue-600 group-hover:text-blue-700 -ml-[1px] transition-colors">
            omies
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-[#2d2d2d] hover:text-black transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="bg-[#2d2d2d] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a1a1a] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Sign up
          </Link>
        </div>
      </div>

      {/* Lower Row: Search and Filters */}
      <div className="max-w-7xl mx-auto px-6 pb-5">
        <div className="flex items-center gap-2 max-w-2xl mx-auto border border-blue-200 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow bg-white">
          {/* Location Filter Button */}
          <button className="flex items-center gap-2 px-3 border-r border-gray-200 hover:bg-blue-50 rounded-l-full py-1 transition-colors group">
            <MapPin size={18} className="text-blue-600 group-hover:text-blue-700" />
            <span className="text-sm font-semibold text-[#2d2d2d]">Anywhere</span>
          </button>

          {/* Search Input */}
          <div className="flex items-center gap-3 flex-1 px-3">
            <Search size={18} className="text-blue-400" />
            <input 
              type="text" 
              placeholder="Search cities, neighborhoods, or universities..." 
              className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#2d2d2d] outline-none"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-1.5 border border-blue-100 rounded-full hover:border-blue-300 hover:bg-blue-50 transition-colors bg-blue-50/50 group">
            <SlidersHorizontal size={14} className="text-blue-600 group-hover:text-blue-800" />
            <span className="text-xs font-bold text-blue-800">Filters</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;