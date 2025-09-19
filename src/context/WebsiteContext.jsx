// src/context/WebsiteContext.jsx
import React, { createContext, useState, useContext } from 'react';

const WebsiteContext = createContext();

// (PENTING) Dummy data statis - Updated untuk production
const dummyContent = {
    settings: {
        hero_tagline: "Temukan secangkir kopi sempurna dan inspirasi di setiap sudutnya.",
        about_text: "Berdiri sejak 2023, Kanagara Coffee & Space adalah perpaduan unik antara kehangatan tradisi Joglo dan sentuhan desain modern yang minimalis. Kami bukan hanya sekadar kedai kopi, tetapi sebuah ruang di mana komunitas, kreativitas, dan budaya bertemu.",
        gmaps_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.6670468910127!2d112.70371219999999!3d-7.441767399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e17aa2075e03%3A0x48ae47a3d117463!2sKanagara%20Coffee!5e0!3m2!1sen!2sid!4v1693648574973!5m2!1sen!2sid"
    },
    gallery: [
        { 
            id: 1, 
            image_path: 'https://images.unsplash.com/photo-1511920233353-3c7c95a57424?q=80&w=1287&auto=format&fit=crop',
            path: 'gallery1.jpg',
            alt_text: 'Barista profesional sedang menyiapkan kopi spesial'
        },
        { 
            id: 2, 
            image_path: 'https://images.unsplash.com/photo-1559925233-8d6342e8d354?q=80&w=1262&auto=format&fit=crop',
            path: 'gallery2.jpg',
            alt_text: 'Area duduk outdoor yang asri dan nyaman'
        },
        { 
            id: 3, 
            image_path: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=1470&auto=format&fit=crop',
            path: 'gallery3.jpg',
            alt_text: 'Interior modern dengan sentuhan tradisional Joglo'
        }
    ],
    facilities: [
        { 
            id: 1, 
            name: 'Wi-Fi Cepat',
            description: 'Tetap terhubung dengan koneksi internet berkecepatan tinggi, gratis untuk semua pengunjung.',
            is_active: true
        },
        { 
            id: 2, 
            name: 'Area Outdoor',
            description: 'Area outdoor yang nyaman kami sediakan khusus untuk Anda yang ingin merokok.',
            is_active: true
        },
        { 
            id: 3, 
            name: 'Ruang Meeting',
            description: 'Butuh tempat untuk rapat atau acara kecil? Kami menyediakan ruang privat yang bisa Anda pesan.',
            is_active: true
        },
        { 
            id: 4, 
            name: 'Mushola',
            description: 'Kami menyediakan mushola yang bersih dan nyaman untuk Anda beribadah.',
            is_active: true
        }
    ],
    hero_images: [
        { 
            id: 1, 
            image_path: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1547&auto=format&fit=crop',
            path: 'hero1.jpg'
        },
        { 
            id: 2, 
            image_path: 'https://images.unsplash.com/photo-1559305417-7d08c547c4c3?q=80&w=2574&auto=format&fit=crop',
            path: 'hero2.jpg'
        },
        { 
            id: 3, 
            image_path: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2537&auto=format&fit=crop',
            path: 'hero3.jpg'
        }
    ],
};

export const WebsiteProvider = ({ children }) => {
    // Gunakan dummyContent langsung
    const [content] = useState(dummyContent);
    const [loading] = useState(false);
    const [criticalLoading] = useState(false);

    const value = {
        ...content,
        loading,
        criticalLoading,
        fetchContent: () => {} // fungsi kosong
    };

    return (
        <WebsiteContext.Provider value={value}>
            {children}
        </WebsiteContext.Provider>
    );
};

export const useWebsite = () => useContext(WebsiteContext);
