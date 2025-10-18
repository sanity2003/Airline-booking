
import React, { useState, useEffect } from 'react';
import { searchFlights } from '../../services/flightService'; 

const FlightManagement = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // Fetch all flights for the admin view
    searchFlights().then(res => {
      if(res.success) setFlights(res.data);
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Manage Flights</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airline</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flights.map(flight => (
            <tr key={flight.id}>
              <td className="px-6 py-4 whitespace-nowrap">{flight.airline}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flight.departure}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flight.arrival}</td>
              <td className="px-6 py-4 whitespace-nowrap">${flight.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightManagement;