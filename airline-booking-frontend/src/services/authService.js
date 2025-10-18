import api from './api';

export const loginUser = async (credentials) => {
  try {
    
    const response = await api.post('/authservice/v1/signIn', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const registerUser = async (userData) => {
  try {
    
    const response = await api.post('/authservice/v1/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const verifyToken = async () => {
    try {
        
        const response = await api.get('/authservice/v1/isAuthenticated');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}