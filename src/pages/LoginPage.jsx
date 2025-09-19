// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Loader, LogIn } from 'lucide-react';

const LoginPage = () => {
  // Pindahkan hook ke sini, SATU KALI di level teratas
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    // HAPUS pemanggilan hook dari sini
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Mencoba masuk...");

    try {
      await login({ email, password });
      toast.success("Login berhasil! Mengalihkan ke dasbor...", { id: toastId });
      navigate('/dashboard');
    } catch (err) {
      toast.error("Email atau password salah.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-soft-white rounded-2xl shadow-2xl flex overflow-hidden">
        
        {/* Kolom Kiri: Gambar & Visual */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511920183353-3c7c95a57424?q=80&w=1287&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-charcoal/70 flex flex-col justify-end p-12 text-soft-white">
            <h1 className="font-serif font-black text-5xl leading-tight">{t('Kanagara Coffee & Space')}</h1>
            <p className="mt-4 opacity-80">{t('Selamat datang kembali, Owner. Mari kita lihat apa yang baru hari ini.')}</p>
          </div>
        </div>

        {/* Kolom Kanan: Form Login */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="font-serif font-bold text-3xl text-wood-brown">{t('Welcome Back!')}</h2>
          <p className="text-charcoal/70 mt-2">{t('Silakan masukkan detail akun Anda untuk melanjutkan.')}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="font-bold text-charcoal">{t('Email')}</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full p-3 border border-wood-brown/20 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-wood-brown"
                required
                placeholder="admin@kanagara.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="font-bold text-charcoal">{t('Password')}</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full p-3 border border-wood-brown/20 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-wood-brown"
                required
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-wood-brown hover:bg-light-brown text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? <Loader className="animate-spin" size={20} /> : <LogIn size={20} />}
              {isSubmitting ? t('Memproses...') : t('Sign In')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;