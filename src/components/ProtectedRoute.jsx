// frontend/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useAuth();

  // Jika tidak ada token (belum login), arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika ada token, izinkan akses ke halaman yang diminta
  // <Outlet /> akan me-render komponen anak dari rute ini (misal: DashboardPage)
  return <Outlet />;
};

export default ProtectedRoute;