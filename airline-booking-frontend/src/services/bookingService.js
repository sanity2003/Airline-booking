import api from './api';


const BOOKING_BASE_PATH = '/bookingservice/v1';

/**
 * Creates a new booking.
 * @param {object} bookingData - The data for the new booking.
 * @param {number} bookingData.flightId - The ID of the flight.
 * @param {number} bookingData.userId - The ID of the logged-in user.
 * @param {number} bookingData.noOfSeats - The number of seats to book.
 */
export const createBooking = async (bookingData) => {
  try {
    // This sends the POST request to  backend with the correct payload
    const response = await api.post(`${BOOKING_BASE_PATH}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    // This will catch errors from  backend and pass them to the component
    throw error.response ? error.response.data : new Error('Booking creation failed');
  }
};


//   Fetches all bookings for the currently logged-in user.
 
export const getUserBookings = async () => {
  try {
    // We need a route in my backend to handle this. Let's assume GET /bookings
    const response = await api.get(`${BOOKING_BASE_PATH}/bookings`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Could not fetch bookings');
  }
};