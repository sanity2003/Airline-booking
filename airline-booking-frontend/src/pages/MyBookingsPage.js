import React, { useState, useEffect } from 'react';
import { getUserBookings } from '../services/bookingService';
import BookingCard from '../components/booking/BookingCard'; 

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserBookings()
      .then(res => {
        if (res.success) {
          setBookings(res.data);
        }
      })
      .catch(err => console.error("Failed to fetch bookings:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-8">Loading your bookings...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-6">
        {bookings.length > 0 ? (
          bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            <p>You have no bookings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;