import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="relative mb-8">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-20 scale-150 animate-pulse" />
        
        {/* Main Icon */}
        <div className="relative bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(59,130,246,0.3)] border border-blue-50">
          <SearchX size={64} className="text-blue-500 stroke-[1.5]" />
        </div>
      </div>

      <h3 className="text-3xl font-black text-[#2d2d2d] mb-4 tracking-tight">
        No rooms found
      </h3>
      
      <p className="text-gray-500 max-w-md mb-12 text-lg font-medium leading-relaxed">
        We couldn't find any rooms matching your current filters. Try adjusting your budget or location to see more results.
      </p>

      <button
        onClick={onClearFilters}
        className="group flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-black transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.4)] active:scale-95"
      >
        <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
        Clear All Filters
      </button>
    </div>
  );
};

export default EmptyState;
