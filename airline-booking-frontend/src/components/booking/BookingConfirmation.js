
import React from 'react';
import { Link } from 'react-router-dom';

const BookingConfirmation = ({ bookingDetails }) => {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Booking Successful! ✅</h2>
      <p className="mb-4">
        Your flight has been confirmed. A confirmation email has been sent to your address.
      </p>
       {/* Optionally display booking details here  */}
      <div className="mt-4">
        <Link 
          to="/my-bookings" 
          className="font-semibold text-blue-600 hover:underline"
        >
          View in My Bookings →
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;