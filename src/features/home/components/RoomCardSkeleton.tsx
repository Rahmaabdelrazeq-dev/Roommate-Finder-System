import React from 'react';

const RoomCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-100 relative" />

      {/* Content Skeleton */}
      <div className="p-6">
        <div className="h-7 bg-gray-100 rounded-lg w-3/4 mb-4" />
        
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gray-100 rounded-lg" />
          <div className="h-4 bg-gray-100 rounded-md w-1/3" />
          <div className="h-4 bg-gray-100 rounded-md w-1/4" />
        </div>

        {/* Amenities Skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-8 bg-gray-100 rounded-lg w-16" />
          <div className="h-8 bg-gray-100 rounded-lg w-20" />
          <div className="h-8 bg-gray-100 rounded-lg w-16" />
        </div>

        {/* Footer Skeleton */}
        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100" />
            <div className="flex flex-col gap-1">
              <div className="h-3 bg-gray-100 rounded-sm w-20" />
              <div className="h-2 bg-gray-100 rounded-sm w-12" />
            </div>
          </div>
          <div className="h-10 bg-gray-100 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
