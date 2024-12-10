import React from 'react';
import { FiX } from 'react-icons/fi';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FiltersModal = ({ isOpen, onClose }: FiltersModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Age Range */}
            <div>
              <h3 className="text-lg font-medium mb-3">Age Range</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-24 px-3 py-2 border rounded-lg"
                  min="18"
                  max="100"
                />
                <span className="self-center">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-24 px-3 py-2 border rounded-lg"
                  min="18"
                  max="100"
                />
              </div>
            </div>

            {/* Distance */}
            <div>
              <h3 className="text-lg font-medium mb-3">Distance</h3>
              <input
                type="range"
                min="1"
                max="100"
                className="w-full accent-primary-500"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 km</span>
                <span>100 km</span>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-lg font-medium mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {['Travel', 'Music', 'Sports', 'Art', 'Food', 'Reading', 'Movies', 'Gaming'].map((interest) => (
                  <button
                    key={interest}
                    className="px-4 py-2 border rounded-full hover:bg-primary-50 hover:border-primary-500"
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Looking For */}
            <div>
              <h3 className="text-lg font-medium mb-3">Looking For</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Relationship', 'Friendship', 'Casual', 'Marriage'].map((type) => (
                  <button
                    key={type}
                    className="px-4 py-2 border rounded-lg hover:bg-primary-50 hover:border-primary-500"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
