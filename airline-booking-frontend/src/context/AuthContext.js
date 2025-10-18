import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, verifyToken } from '../services/authService'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use useEffect to check for an existing token on app load
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify the token with the backend
          const response = await verifyToken();
          if (response.success) {
            // The backend confirms the token is valid, set the user
            console.log("Token validation successful, setting user:", response.data);
            setUser({ email: response.data.email, id: response.data.id }); // Add any other user data from response
          } else {
            // Token is invalid or expired
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (error) {
          console.error("Token validation failed", error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  

const login = async (email, password) => {
    try {
        const response = await loginUser({ email, password });
        if (response.success) {
            
            
            const { token, id, email: userEmail } = response.data;

            localStorage.setItem('token', token);
            setUser({ id: id, email: userEmail });
            
            return response.data;
        }
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};
  
  const register = async (email, password) => {
    try {
      const response = await registerUser({ email, password });
      if (response.success) {
        // Optionally log the user in automatically after registration
        // For now, we just return the successful response
        return response.data;
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);