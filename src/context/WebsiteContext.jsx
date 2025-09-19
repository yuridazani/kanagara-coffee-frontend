// src/context/WebsiteContext.jsx
import React, { createContext, useState, useContext } from 'react';

const WebsiteContext = createContext();

// (PENTING) Dummy data statis
const dummyContent = {
    settings: {
        hero_tagline: "Temukan secangkir kopi sempurna dan inspirasi di setiap sudutnya.",
        about_text: "Berdiri sejak 2023, Kanagara Coffee & Space adalah perpaduan unik antara kehangatan tradisi Joglo dan sentuhan desain modern yang minimalis. Kami bukan hanya sekadar kedai kopi, tetapi sebuah ruang di mana komunitas, kreativitas, dan budaya bertemu.",
        gmaps_url: "https://maps.app.goo.gl/vma89UAXtkS2a19u9"
    },
    gallery: [
        { id: 1, image_path: 'https://images.unsplash.com/photo-1511920183353-3c9c35a97592?q=80&w=1887' },
        { id: 2, image_path: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1887' },
        { id: 3, image_path: 'https://images.unsplash.com/photo-1551030173-192c6a827032?q=80&w=1887' }
    ],
    facilities: [
        { id: 1, name: 'Wi-Fi Cepat' },
        { id: 2, name: 'Area Outdoor' },
        { id: 3, name: 'Ruang Meeting' },
        { id: 4, name: 'Mushola' }
    ],
    hero_images: [
        { id: 1, image_path: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1547' }
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
