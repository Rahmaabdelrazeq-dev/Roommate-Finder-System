import { useState } from 'react';
import FilterMenu from './Filters';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Search, SlidersHorizontal, MapPin, Banknote } from 'lucide-react';
import { useFilters } from '@/shared/context/FilterContext';

const Navbar = () => {
  const { filters, updateFilter } = useFilters();
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const handleSearch = () => {
    navigate('/search');
  };



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

<<<<<<< HEAD
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
=======
        {/* Lower Row: The Segmented Search Pill */}
        <div className="relative max-w-7xl mx-auto px-6 pb-5">
          <div className="flex items-center max-w-3xl mx-auto border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all bg-white divide-x divide-gray-100">
          
          {/* 1. Location Segment */}
          <div className="flex-[1.5] flex items-center gap-3 px-6 py-3 hover:bg-gray-50 rounded-l-full transition-colors group cursor-text">
            <MapPin size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col w-full">
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Where</span>
              <input
                type="text"
                value={filters?.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="City, area..."
                className="bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-[#2d2d2d] placeholder-gray-300 outline-none w-full"
              />
            </div>
          </div>

          {/* 2. Budget Segment (Min/Max) */}
          <div className="flex-1 flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors group">
            <Banknote size={18} className="text-blue-500" />
            <div className="flex flex-col w-full">
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Budget</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  placeholder="Min"
                  className="bg-transparent border-none focus:ring-0 p-0 text-xs font-bold text-[#2d2d2d] placeholder-gray-300 outline-none w-12"
                  onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <span className="text-gray-300 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="bg-transparent border-none focus:ring-0 p-0 text-xs font-bold text-[#2d2d2d] placeholder-gray-300 outline-none w-12"
                  onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
          </div>

          {/* 3. Search Action & More Filters */}
          <div className="flex items-center gap-3 pl-4 pr-3 py-2">
             <button 
               onClick={handleSearch}
               className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-blue-200 shadow-lg hover:scale-105 active:scale-95"
             >
                <Search size={18} strokeWidth={3} />
             </button>

             
             <button 
               onClick={toggleFilters} 
               className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 border ${
                 showFilters 
                   ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                   : 'hover:bg-gray-50 border-transparent hover:border-gray-200 text-gray-700'
               }`}
             >
                <SlidersHorizontal size={14} className={showFilters ? 'text-blue-600' : 'text-gray-500'} />
                <span className="text-xs font-bold">Filters</span>
             </button>
            {/* Render sidebar filter menu */}
            <FilterMenu
              filters={filters}
              updateFilter={updateFilter}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
>>>>>>> 41481d9603016144b342eb10b22ed2d340451046
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