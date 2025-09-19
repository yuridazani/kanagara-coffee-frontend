import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, X } from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContext';

const GaleriSection = () => {
    const { t } = useTranslation();
    const { gallery, loading } = useWebsiteContent();
    const [selectedImage, setSelectedImage] = useState(null);

    // Default gallery images jika belum ada data dari backend
    const defaultGalleryImages = [
        {
            src: 'https://images.unsplash.com/photo-1511920233353-3c7c95a57424?q=80&w=1287&auto=format&fit=crop',
            alt: 'Barista profesional sedang menyiapkan kopi spesial.',
        },
        {
            src: 'https://images.unsplash.com/photo-1559925233-8d6342e8d354?q=80&w=1262&auto=format&fit=crop',
            alt: 'Area duduk outdoor yang asri dan nyaman.',
        },
        {
            src: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=1470&auto=format&fit=crop',
            alt: 'Interior modern dengan sentuhan tradisional Joglo.',
        },
        {
            src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470&auto=format&fit=crop',
            alt: 'Berbagai pilihan kopi premium yang tersedia.',
        },
        {
            src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1470&auto=format&fit=crop',
            alt: 'Suasana hangat dan nyaman untuk bekerja atau bersantai.',
        },
        {
            src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1547&auto=format&fit=crop',
            alt: 'Latte art yang indah dari barista berpengalaman.',
        },
        {
            src: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1471&auto=format&fit=crop',
            alt: 'Area meeting room privat untuk diskusi bisnis.',
        },
        {
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop',
            alt: 'Taman outdoor yang sejuk dan asri.',
        }
    ];

    // FIX: Safe API URL access
    const getApiUrl = () => {
        if (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) {
            return process.env.REACT_APP_API_URL;
        }
        return 'http://localhost:8000';
    };

    // Gunakan gallery dari context jika tersedia, fallback ke default
    const galleryImages = !loading && gallery?.length > 0
        ? gallery.map(img => ({
            src: `${getApiUrl()}/storage/${img.path}`,
            alt: img.alt_text || 'Galeri Kanagara Coffee',
        }))
        : defaultGalleryImages;

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <section id="galeri" className="py-16 px-4 bg-cream">
                <div className="container mx-auto">
                    <div className="text-center mb-10" data-aos="fade-up">
                        <h2 className="font-serif font-black text-4xl text-wood-brown">
                            {t('Galeri Kanagara')}
                        </h2>
                        <p className="mt-4 text-charcoal/80 max-w-2xl mx-auto">
                            {t('Lihat lebih dekat suasana hangat dan setiap sudut nyaman yang kami tawarkan.')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="200">
                        {galleryImages.map((image, index) => (
                            <div 
                                key={index} 
                                className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                                onClick={() => openLightbox(image)}
                            >
                                <img 
                                    src={image.src} 
                                    alt={image.alt} 
                                    className="w-full h-56 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    loading="lazy"
                                    onError={(e) => {
                                        const fallbackIndex = index % defaultGalleryImages.length;
                                        e.target.src = defaultGalleryImages[fallbackIndex].src;
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white text-center text-xs md:text-sm">{image.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12" data-aos="fade-up">
                        <a 
                            href="https://www.instagram.com/kanagara.coffee/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-wood-brown text-white font-bold py-3 px-8 rounded-full hover:bg-light-brown transition-colors inline-flex items-center gap-2"
                        >
                            <Instagram size={20} />
                            {t('Lihat Lebih Banyak di Instagram')}
                        </a>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
                    <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
                        <button 
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
                            onClick={closeLightbox}
                        >
                            <X size={24} />
                        </button>
                        <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <img 
                                src={selectedImage.src} 
                                alt={selectedImage.alt} 
                                className="max-w-full max-h-full object-contain"
                            />
                            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 p-2">
                                <p>{selectedImage.alt}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GaleriSection;