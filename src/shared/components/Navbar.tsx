import { useState } from 'react';
import FilterMenu from './Filters';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Search, SlidersHorizontal, MapPin, Banknote, Heart } from 'lucide-react';
import { useFilters } from '@/shared/context/FilterContext';
import { useFavorites } from '@/shared/context/FavoritesContext';

const Navbar = () => {
  const { filters, updateFilter } = useFilters();
  const { count: favCount } = useFavorites();
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
        <Logo />

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Wishlist Icon */}
          <Link
            to="/favorites"
            className="relative p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
            title="My Wishlist"
          >
            <Heart size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
            {favCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 bg-red-500 text-white text-[10px] font-black rounded-full shadow-sm">
                {favCount > 9 ? '9+' : favCount}
              </span>
            )}
          </Link>

          <div className="w-px h-6 bg-gray-100" />

          {/* Auth Buttons */}
          <Link to="/login" className="text-sm font-bold text-[#2d2d2d] hover:text-black transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="bg-[#2d2d2d] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a1a1a] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Sign up
          </Link>
        </div>
      </div>

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

            <FilterMenu
              filters={filters}
              updateFilter={updateFilter}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;