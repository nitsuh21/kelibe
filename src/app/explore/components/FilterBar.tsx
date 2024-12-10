import React from 'react';
import { FiFilter, FiMapPin, FiSearch } from 'react-icons/fi';
import { BiFilterAlt } from 'react-icons/bi';

const FilterBar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or interests..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50">
              <FiMapPin /> Location
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50">
              <BiFilterAlt /> Age
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50">
              <FiFilter /> More Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
