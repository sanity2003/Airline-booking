import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createBooking } from '../../services/bookingService';

const BookingForm = ({ flight, onBookingSuccess }) => {
  const { user } = useAuth(); // We get the logged-in user here
  const [noOfSeats, setNoOfSeats] = useState(1); // State for number of seats
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!user || !user.id) {
      setError('You must be logged in to book a flight.');
      return;
    }
    if (noOfSeats <= 0) {
      setError('You must book at least one seat.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    
    const bookingPayload = {
      flightId: flight.id,
      userId: user.id,
      noOfSeats: parseInt(noOfSeats, 10) 
    };

    try {
      // Call the aligned service function
      const result = await createBooking(bookingPayload);
      
      if (result.success) {
        onBookingSuccess(result.data); // Pass the successful booking data
      } else {
        // Display backend error message if available
        setError(result.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      // This will catch network errors or errors from the backend response
      console.error("Booking submission error:", err);
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {error && <p className="text-red-500 font-semibold text-center p-2 bg-red-50 rounded-md">{error}</p>}
      
      
      <div>
        <label htmlFor="noOfSeats" className="block text-sm font-medium text-gray-700">
          Number of Seats
        </label>
        <input
          type="number"
          id="noOfSeats"
          value={noOfSeats}
          onChange={(e) => setNoOfSeats(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          min="1"
          required
        />
      </div>
      
      <div className="text-right">
        <p className="text-gray-600">Total Price</p>
        <p className="text-2xl font-bold text-gray-900">${flight.price * noOfSeats}</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {isSubmitting ? 'Processing...' : 'Confirm and Book'}
      </button>
    </form>
  );
};

export default BookingForm;