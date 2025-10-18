import React from 'react';
import { useNavigate } from 'react-router-dom';

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  
  const handleSelectFlight = () => {
    navigate(`/book/${flight.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow m-4">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{flight.airline}</h3>
            <p className="text-gray-600 text-sm">{flight.flightNumber}</p>
          </div>
          <span className="text-xl font-bold text-blue-600">${flight.price}</span>
        </div>
        
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-lg font-medium">{flight.departureTime}</p>
            <p className="text-gray-600">{flight.departureAirport}</p> 
          </div>
          <div className="text-center">
            <p className="text-gray-500">{flight.duration}</p>
            <div className="w-24 h-px bg-gray-300 my-2 mx-auto"></div>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium">{flight.arrivalTime}</p>
            <p className="text-gray-600">{flight.arrivalAirport}</p> 
          </div>
        </div>
        
        
        <button 
          onClick={handleSelectFlight}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Select Flight
        </button>

      </div>
    </div>
  );
};

export default FlightCard;

