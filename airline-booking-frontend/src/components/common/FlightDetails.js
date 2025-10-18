
import React from 'react';

const FlightDetails = ({ flight }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{flight.airline}</h3>
        <span className="text-xl font-bold text-blue-600">${flight.price}</span>
      </div>
      <div className="flex justify-between items-center text-center">
        <div>
          <p className="text-lg font-medium">{flight.departureTime}</p>
          <p className="text-gray-600">{flight.departure}</p>
        </div>
        <div className="text-gray-500">
          <p>{flight.duration}</p>
          <div className="w-24 h-px bg-gray-300 my-1"></div>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium">{flight.arrivalTime}</p>
          <p className="text-gray-600">{flight.arrival}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;