import React from 'react';

const BookingCard = ({ booking }) => {
    // The 'flight' object is now correctly passed from your backend
    const { flight } = booking;

    // A safety check to prevent crashes if data is still loading
    if (!flight) {
        return <div className="bg-white rounded-lg shadow-md p-6">Loading booking details...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{flight.airline} - {flight.flightNumber}</h3>
                <span className="text-sm text-gray-500">
                    
                    {/* Changed to toLocaleDateString() with a capital S and no hyphen */}
                    Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                </span>
            </div>
            <div className="mt-4 border-t pt-4">
                {/* Add a check for passengerName if it exists */}
                {booking.passengerName && <p><strong>Passenger:</strong> {booking.passengerName}</p>}
                <div className="flex justify-between mt-2">
                    <div>
                        <p className="font-semibold">{flight.departureAirport}</p>
                        <p className="text-gray-600">{flight.departureTime}</p>
                    </div>
                    <div className="text-center text-gray-500">→</div>
                    <div className="text-right">
                        <p className="font-semibold">{flight.arrivalAirport}</p>
                        <p className="text-gray-600">{flight.arrivalTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;