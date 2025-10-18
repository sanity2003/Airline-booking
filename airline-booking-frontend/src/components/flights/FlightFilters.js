import React from 'react';

const FlightFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">$0</span>
            <input
              type="range"
              min="0"
              max="2000"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
              className="w-full"
            />
            <span className="text-sm text-gray-500 ml-2">${filters.maxPrice}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Airlines</label>
          {['Sky Airlines', 'Ocean Airways', 'Star Airlines'].map(airline => (
            <div key={airline} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={airline}
                checked={filters.airlines.includes(airline)}
                onChange={(e) => {
                  const newAirlines = e.target.checked
                    ? [...filters.airlines, airline]
                    : filters.airlines.filter(a => a !== airline);
                  onFilterChange({ ...filters, airlines: newAirlines });
                }}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor={airline} className="ml-2 text-gray-700">{airline}</label>
            </div>
          ))}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
          <select
            value={filters.departureTime}
            onChange={(e) => onFilterChange({ ...filters, departureTime: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="any">Any Time</option>
            <option value="morning">Morning (6am-12pm)</option>
            <option value="afternoon">Afternoon (12pm-6pm)</option>
            <option value="evening">Evening (6pm-12am)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FlightFilters;