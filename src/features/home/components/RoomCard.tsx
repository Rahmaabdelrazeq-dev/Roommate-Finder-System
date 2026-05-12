import React from 'react';
import { MapPin, Shield, Star, Heart } from 'lucide-react';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={room.imageUrl} 
          alt={room.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {room.isVerified && (
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-blue-50">
              <Shield size={14} className="text-blue-600 fill-blue-600/10" />
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">Verified</span>
            </div>
          )}
          <div className="bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
             <span className="text-[10px] font-black uppercase tracking-wider text-white">{room.type}</span>
          </div>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-white hover:text-red-500 transition-all duration-300 group/fav">
          <Heart size={20} className="transition-transform group-active/fav:scale-75" />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
           <div className="flex flex-col">
              <span className="text-white font-black text-2xl leading-none">
                ${room.price.toLocaleString()}
                <span className="text-white/70 text-sm font-medium ml-1">/ month</span>
              </span>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-extrabold text-[#2d2d2d] leading-tight group-hover:text-blue-600 transition-colors">
            {room.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <div className="p-1.5 bg-gray-50 rounded-lg">
            <MapPin size={16} className="text-blue-500" />
          </div>
          <span className="text-sm font-bold text-gray-600">{room.location}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-sm font-medium text-gray-400">{room.distance}</span>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-[11px] font-bold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100/50">
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-[11px] font-bold px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center font-black text-blue-600 text-xs border-2 border-white ring-1 ring-gray-100 shadow-sm">
              {room.postedBy.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-gray-900">{room.postedBy}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Posted by</span>
            </div>
          </div>
          
          <button className="px-5 py-2.5 bg-[#f8f9fa] hover:bg-[#2d2d2d] text-[#2d2d2d] hover:text-white rounded-xl text-xs font-black transition-all duration-300 border border-transparent hover:shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
