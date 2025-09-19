// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { WebsiteProvider } from './context/WebsiteContext.jsx';

// --- TAMBAHAN UNTUK TERJEMAHAN ---
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import idTranslation from './locales/id/translation.json';
import enTranslation from './locales/en/translation.json'; // Pastikan file ini sudah dibuat

i18n.init({
  interpolation: { escapeValue: false }, // React sudah aman dari XSS
  lng: 'id', // Bahasa default saat aplikasi dibuka
  fallbackLng: 'id', // Bahasa yang digunakan jika bahasa pilihan tidak ada
  resources: {
    en: {
      translation: enTranslation
    },
    id: {
      translation: idTranslation
    },
  },
});
// --- AKHIR DARI TAMBAHAN ---

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Bungkus semua provider dengan I18nextProvider */}
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <WebsiteProvider>
          <App />
        </WebsiteProvider>
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>,
);