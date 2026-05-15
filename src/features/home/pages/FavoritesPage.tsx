import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '@/shared/context/FavoritesContext';
import { roomService } from '../services/roomService';
import RoomCard from '../components/RoomCard';
import RoomCardSkeleton from '../components/RoomCardSkeleton';
import type { Room } from '../types';
import { ArrowLeft, Heart, Trash2, ChevronRight } from 'lucide-react';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favoriteIds, clearFavorites, count } = useFavorites();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        if (favoriteIds.length === 0) {
          setRooms([]);
          return;
        }
        const allRooms = await roomService.fetchRooms();
        const favRooms = allRooms.filter(room => favoriteIds.includes(room.id));
        setRooms(favRooms);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFavorites();
  }, [favoriteIds]);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-blue-600">Wishlist</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="group p-3 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <ArrowLeft size={18} className="text-gray-500 group-hover:text-[#2d2d2d] transition-colors" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black text-[#2d2d2d] tracking-tight">My Wishlist</h1>
                {count > 0 && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black border border-blue-100">
                    {count} {count === 1 ? 'room' : 'rooms'}
                  </span>
                )}
              </div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">
                {count > 0 ? 'Your saved rooms and spaces' : 'No rooms saved yet'}
              </p>
            </div>
          </div>

          {count > 0 && (
            <button
              onClick={clearFavorites}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
            >
              <Trash2 size={14} />
              Clear all
            </button>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <RoomCardSkeleton key={i} />)}
          </div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mb-8">
              <Heart size={36} className="text-blue-300" />
            </div>
            <h2 className="text-2xl font-black text-[#2d2d2d] mb-3">Your wishlist is empty</h2>
            <p className="text-gray-400 font-medium text-center max-w-sm mb-8 leading-relaxed">
              Start exploring rooms and tap the heart icon to save your favorites here.
            </p>
            <Link
              to="/search"
              className="px-8 py-3.5 bg-[#2d2d2d] text-white rounded-xl text-sm font-black hover:bg-black transition-colors shadow-lg"
            >
              Explore Rooms
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
