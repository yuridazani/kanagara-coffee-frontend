// src/App.jsx - UPDATED

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


// ===== Impor Komponen Landing Page =====

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import BestSellerSection from './components/BestSellerSection';
import BookingSection from './components/BookingSection';
import BookingModal from './components/BookingModal';
import FeedbackSection from './components/FeedbackSection';
import Footer from './components/Footer';
import FasilitasSection from './components/FasilitasSection';
import GaleriSection from './components/GaleriSection';
import Ornament from './components/Ornament';

// ===== Impor Halaman =====
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import KelolaMenuPage from './pages/KelolaMenuPage';
import KelolaReservasiPage from './pages/KelolaReservasiPage';
import KelolaFeedbackPage from './pages/KelolaFeedbackPage';
import SettingsPage from './pages/SettingsPage';
import KelolaWebsitePage from './pages/KelolaWebsitePage'; // <-- Impor baru
import TrackingPage from './pages/TrackingPage';
import UploadDPPage from './pages/UploadDPPage';
import PilihMenuPage from './pages/PilihMenuPage';
import UlasanPage from './pages/UlasanPage'; 

// ===== Impor Layout Dashboard =====
import DashboardLayout from './DashboardLayout';

// ===== Impor Context =====
import { MenuProvider } from './context/MenuContext';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 50 });
    }, []);

    return (
        <MenuProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rute untuk Pengunjung */}
                    {/* Sekarang, <HomePage /> di sini akan merujuk ke file HomePage.jsx yang benar */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/ulasan" element={<UlasanPage />} />
                    <Route path="/tracking" element={<TrackingPage />} />
                    <Route path="/upload-dp/:reservationNumber" element={<UploadDPPage />} />
                    <Route path="/pilih-menu/:reservationNumber" element={<PilihMenuPage />} />
                    
                    {/* Rute untuk Login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rute untuk Dashboard */}
                    <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/dashboard/menu" element={<KelolaMenuPage />} />
                        <Route path="/dashboard/reservasi" element={<KelolaReservasiPage />} />
                        <Route path="/dashboard/feedback" element={<KelolaFeedbackPage />} />
                        <Route path="/dashboard/settings" element={<SettingsPage />} />
                        <Route path="/dashboard/website" element={<KelolaWebsitePage />} />
                    </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </MenuProvider>
    );
}

export default App;