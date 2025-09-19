// frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  login: async () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Ambil token dari localStorage saat pertama kali load
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('ACCESS_TOKEN', newToken);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const login = async (credentials) => {
    const response = await axiosClient.post('/login', credentials);
    setUser(response.data.user);
    setToken(response.data.access_token);
    return response;
  };

  const logout = () => {
    // Di sini bisa ditambahkan call API ke /logout jika perlu
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Buat custom hook agar lebih mudah digunakan
export const useAuth = () => useContext(AuthContext);