// src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FasilitasSection from '../components/FasilitasSection';
import GaleriSection from '../components/GaleriSection';
import BestSellerSection from '../components/BestSellerSection';
import BookingSection from '../components/BookingSection';
import FeedbackSection from '../components/FeedbackSection';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import BackToTopButton from '../components/BackToTopButton';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 50 });

        // 2. Logika untuk Auto-Scroll Halus ke Bawah
        let scrollTimeout;
        const autoScroll = () => {
            // Hanya scroll jika pengguna berada di paling atas halaman
            if (window.scrollY === 0) {
                window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
            }
        };
        
        // Atur jeda sebelum auto-scroll dimulai (misal: 3 detik)
        scrollTimeout = setTimeout(autoScroll, 3000);

        // Hentikan auto-scroll jika pengguna mulai scroll sendiri
        const handleUserScroll = () => clearTimeout(scrollTimeout);
        window.addEventListener('scroll', handleUserScroll);

        // Cleanup function untuk menghapus listener dan timeout
        return () => {
            clearTimeout(scrollTimeout);
            window.removeEventListener('scroll', handleUserScroll);
        };
    }, []);

    return(
        <div>
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
                <FasilitasSection />
                <GaleriSection />
                <BestSellerSection />
                <BookingSection onOpenModal={() => setIsModalOpen(true)} />
                <FeedbackSection />
            </main>
            <Footer />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <BackToTopButton /> {/* <-- 3. Letakkan tombol di sini */}
        </div>
    );
};

export default HomePage;