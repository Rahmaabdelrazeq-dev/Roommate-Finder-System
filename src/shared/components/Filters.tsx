import React, { useState } from 'react';
import { ChevronDown, X, Filter } from 'lucide-react';

// Props for the FilterMenu component
interface FiltersProps {
  filters: Record<string, any>;
  updateFilter: (key: string, value: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterMenu: React.FC<FiltersProps> = ({ filters, updateFilter, isOpen, onClose }) => {
  const [openSection, setOpenSection] = useState<string | null>('Property');

  const sections = [
    { id: 'Gender', options: ['Male', 'Female', 'Mixed'] },
    { id: 'Amenities', options: ['Wifi', 'Air Conditioning', 'Gym', 'Kitchen', 'Pool'] },
    { id: 'Property', options: ['Apartment', 'House', 'Studio', 'Shared Room'] },
    { id: 'Posted by', options: ['Verified User', 'Agency', 'Individual'] },
  ];

  // Reset all filters to empty arrays
  const clearAll = () => {
    sections.forEach((sec) => updateFilter(sec.id, []));
  };

  return (
    <>
      {/* Premium Overlay with blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45] transition-opacity duration-500 ease-in-out"
          style={{ top: '144px' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar with Glassmorphism */}
      <aside
        className={`fixed left-0 w-[340px] bg-white/90 backdrop-blur-2xl border-r border-gray-100 shadow-[20px_0_50px_-10px_rgba(0,0,0,0.1)] transform transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) z-50 overflow-hidden ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
        style={{ top: '144px', height: 'calc(100vh - 144px)' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-50 bg-white/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Filter size={18} className="text-blue-600" />
              </div>
              <h3 className="font-extrabold text-xl text-gray-900 tracking-tight">Filters</h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
              aria-label="Close filters"
            >
              <X size={20} className="text-gray-400 group-hover:text-gray-900 group-hover:rotate-90 transition-all duration-300" />
            </button>
          </div>

          {/* Action Bar */}
          <div className="px-6 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-50">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preferences</span>
            <button
              onClick={clearAll}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors px-2 py-1 hover:bg-blue-50 rounded-md"
            >
              Reset All
            </button>
          </div>

          {/* Scrollable Sections */}
          <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
            {sections.map((section) => (
              <div key={section.id} className="mb-2 group">
                <button
                  onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                  className={`w-full flex justify-between items-center px-4 py-4 rounded-2xl transition-all duration-300 ${
                    openSection === section.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`font-bold text-sm tracking-tight transition-colors ${
                    openSection === section.id ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {section.id}
                  </span>
                  <div className={`transition-transform duration-300 ${openSection === section.id ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSection === section.id ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 grid gap-2">
                    {section.options.map((option) => (
                      <label 
                        key={option} 
                        className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/30 cursor-pointer transition-all duration-200 group/item"
                      >
                        <span className="text-sm font-medium text-gray-600 group-hover/item:text-gray-900 transition-colors">
                          {option}
                        </span>
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer appearance-none w-5 h-5 rounded-md border-2 border-gray-200 checked:bg-blue-600 checked:border-blue-600 transition-all duration-300 cursor-pointer"
                            checked={filters?.[section.id]?.includes(option) || false}
                            onChange={(e) => {
                              const current = filters?.[section.id] ?? [];
                              const newVals = e.target.checked
                                ? [...current, option]
                                : current.filter((v: any) => v !== option);
                              updateFilter(section.id, newVals);
                            }}
                          />
                          <svg 
                            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-gray-50 bg-white/80 backdrop-blur-md">
            <button
              onClick={onClose}
              className="w-full bg-[#1a1a1a] text-white py-4 rounded-2xl font-black text-sm hover:bg-black transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] active:scale-[0.98]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterMenu;