import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useWebsite } from '../context/WebsiteContext'; // Changed from useWebsiteContent to useWebsite

const defaultImages = [
    'https://images.unsplash.com/photo-1559305417-7d08c547c4c3?q=80&w=2574&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2537&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop',
];

const HeroSection = () => {
    const { t } = useTranslation();
    const { settings, hero_images, criticalLoading } = useWebsite(); // Changed from useWebsiteContent to useWebsite
    const [currentIndex, setCurrentIndex] = useState(0);

    // Memoize tagline untuk avoid re-render
    const tagline = useMemo(() => 
        settings?.hero_tagline || "Temukan kenyamanan dan secangkir kopi sempurna di Kanagara.",
        [settings?.hero_tagline]
    );

    // Memoize images untuk avoid re-processing
    const images = useMemo(() => {
        if (hero_images && hero_images.length > 0) {
            return hero_images.map(img => `http://localhost:8000/storage/${img.path}`);
        }
        return defaultImages;
    }, [hero_images]);

    // Preload first image for instant display
    useEffect(() => {
        const img = new Image();
        img.src = images[0];
    }, [images]);

    // Initialize AOS hanya sekali
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    // Auto-slide untuk images
    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [images.length]);

    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center text-soft-white">
            {/* Background Images */}
            {images.map((image, index) => (
                <div
                    key={`${image}-${index}`}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Content - Show immediately with skeleton if loading */}
            <div className="relative z-10 p-4" data-aos="fade-up">
                <h2 className="font-serif font-black text-5xl md:text-7xl">{t('Enjoy Your Coffee Moments')}</h2>
                {criticalLoading ? (
                    <div className="mt-4 bg-white/10 h-6 w-96 mx-auto rounded animate-pulse"></div>
                ) : (
                    <p className="mt-4 text-lg">{tagline}</p>
                )}
                <div className="mt-8 space-x-4">
                    <a href="#menu-preview" className="bg-soft-white text-charcoal font-bold py-3 px-8 rounded-full hover:bg-cream transition-colors">{t('Lihat Menu')}</a>
                    <a href="#booking" className="border-2 border-soft-white text-soft-white font-bold py-3 px-8 rounded-full hover:bg-soft-white hover:text-charcoal transition-colors">{t('Reservasi Meja')}</a>
                </div>
            </div>
            
            {/* Indicator dots */}
            {images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'bg-soft-white scale-125' 
                                    : 'bg-soft-white/50 hover:bg-soft-white/75'
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroSection;
