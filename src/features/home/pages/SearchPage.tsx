import React, { useState, useEffect } from 'react';
import { useFilters } from '@/shared/context/FilterContext';
import RoomCard from '../components/RoomCard';
import RoomCardSkeleton from '../components/RoomCardSkeleton';
import EmptyState from '../components/EmptyState';
import { MOCK_ROOMS } from '../mockData';
import type { Room } from '../types';
import { Map, List, ChevronRight } from 'lucide-react';

const SearchPage = () => {
  const { filters, clearFilters } = useFilters();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const results = MOCK_ROOMS.filter((room) => {
        const matchesLocation = !filters.location || room.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesMinPrice = filters.minPrice === '' || room.price >= Number(filters.minPrice);
        const matchesMaxPrice = filters.maxPrice === '' || room.price <= Number(filters.maxPrice);
        return matchesLocation && matchesMinPrice && matchesMaxPrice;
      });
      setFilteredRooms(results);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Breadcrumbs / Header Area */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span>Home</span>
          <ChevronRight size={12} />
          <span className="text-blue-600">Rooms in {filters.location || 'All Locations'}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-[#2d2d2d] tracking-tight mb-2">
              {filters.location ? `Rooms in ${filters.location}` : 'All available rooms'}
            </h1>
            <p className="text-gray-500 font-medium">
              {isLoading ? 'Finding the best matches...' : `Showing ${filteredRooms.length} high-quality results`}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] text-white rounded-xl text-xs font-bold transition-all shadow-md">
              <List size={14} />
              List
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-xl text-xs font-bold transition-all">
              <Map size={14} />
              Map view
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <RoomCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <EmptyState onClearFilters={clearFilters} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
