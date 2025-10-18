import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFlightDetails } from '../services/flightService'; 
import BookingForm from '../components/booking/BookingForm'; 
import FlightDetails from '../components/common/FlightDetails'; 

const BookingPage = () => {
  const { flightId } = useParams(); // Get flightId from the URL
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFlightDetails(flightId)
      .then(res => {
        if (res.success) {
          setFlight(res.data);
        }
      })
      .catch(() => setError('Could not fetch flight details.'));
  }, [flightId]);

  const handleBookingSuccess = (bookingDetails) => {
    // Navigate to a confirmation page or my-bookings
    navigate('/my-bookings'); 
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!flight) return <div className="text-center">Loading Flight Details...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Confirm Your Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Flight Summary</h2>
          <FlightDetails flight={flight} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
          <BookingForm flight={flight} onBookingSuccess={handleBookingSuccess} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;