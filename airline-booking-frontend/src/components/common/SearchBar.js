import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  //  Give the component a "memory" using state
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  
  const navigate = useNavigate();

  // a function to handle the search button click
  const handleSearch = () => {
    //  Create a query string from our state (e.g., "?from=delhi&to=bengluru")
    const searchQuery = new URLSearchParams({ from, to, departure }).toString();
    
    //  Navigate to the search results page with the query
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">From</label>
          <input
            type="text"
            placeholder="City or airport"
            value={from} // Connect input to state
            onChange={(e) => setFrom(e.target.value)} // Update state on change
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="text"
            placeholder="City or airport"
            value={to} // Connect input to state
            onChange={(e) => setTo(e.target.value)} // Update state on change
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Departure</label>
          <input
            type="date"
            value={departure} // Connect input to state
            onChange={(e) => setDeparture(e.target.value)} // Update state on change
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <button 
            onClick={handleSearch} // Connect button to our handler function
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Search Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;