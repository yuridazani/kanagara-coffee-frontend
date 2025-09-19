// src/components/BackToTopButton.jsx

import React, { useState, useEffect } from 'react';
import { ArrowUpCircle } from 'lucide-react';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Tampilkan tombol saat pengguna scroll ke bawah sejauh 300px
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll ke atas dengan halus saat tombol diklik
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-wood-brown/80 hover:bg-wood-brown text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
                    aria-label="Kembali ke atas"
                >
                    <ArrowUpCircle size={24} />
                </button>
            )}
        </div>
    );
};

export default BackToTopButton;