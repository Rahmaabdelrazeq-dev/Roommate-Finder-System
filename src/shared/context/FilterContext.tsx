import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface Filters {
  location: string;
  minPrice: number | '';
  maxPrice: number | '';
  [key: string]: any;
}

interface FilterContextType {
  filters: Filters;
  updateFilter: (key: string, value: any) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
