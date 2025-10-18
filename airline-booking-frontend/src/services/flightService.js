
import api from './api';

export const searchFlights = async (params) => {
  try {
    //  Use the gateway route `/flightservice`
    const response = await api.get('/flightservice/v1/flights', { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getFlightDetails = async (flightId) => {
  try {
    
    const response = await api.get(`/flightservice/v1/flights/${flightId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateFlight = async (flightId, data) => {
  try {
    
    const response = await api.patch(`/flightservice/v1/flights/${flightId}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};