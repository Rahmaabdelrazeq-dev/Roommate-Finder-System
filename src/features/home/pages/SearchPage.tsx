import { useState, useEffect } from 'react';
import { useFilters } from '@/shared/context/FilterContext';
import RoomCard from '../components/RoomCard';
import RoomCardSkeleton from '../components/RoomCardSkeleton';
import EmptyState from '../components/EmptyState';
import { roomService } from '../services/roomService';
import type { Room } from '../types';
import { ChevronRight } from 'lucide-react';

const SearchPage = () => {
  const { filters, clearFilters } = useFilters();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchFilteredRooms = async () => {
      setIsLoading(true);
      try {
        const rooms = await roomService.fetchRooms({
          location: filters.location,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice
        });
        setFilteredRooms(rooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredRooms();
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
