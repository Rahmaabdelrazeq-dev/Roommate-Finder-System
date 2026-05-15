import { X, Check } from 'lucide-react';

interface FilterMenuProps {
  filters: any;
  updateFilter: (key: string, value: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterMenu = ({ filters, updateFilter, isOpen, onClose }: FilterMenuProps) => {
  if (!isOpen) return null;

  const categories = [
    { id: 'roomType', label: 'Room Type', options: ['Private Room', 'Shared Room', 'Entire Unit'] },
    { id: 'gender', label: 'Preferred Gender', options: ['Any', 'Male', 'Female'] },
    { id: 'amenities', label: 'Amenities', options: ['WiFi', 'Laundry', 'Parking', 'Gym', 'Pet Friendly'] },
  ];

  return (
    <div className="absolute top-full mt-4 right-0 w-[350px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-[60] overflow-hidden transform transition-all animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">More Filters</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((category) => (
            <div key={category.id}>
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-3">
                {category.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.options.map((option) => {
                  const isSelected = filters?.[category.id] === option || (Array.isArray(filters?.[category.id]) && filters[category.id].includes(option));
                  return (
                    <button
                      key={option}
                      onClick={() => updateFilter(category.id, option)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <button 
            onClick={() => {/* Clear logic if needed */}}
            className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Check size={16} />
            Show results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
