// src/components/FasilitasSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Wifi, PlugZap, Wind, ParkingCircle, Users, Church, Coffee, Utensils, Shield } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext'; // Changed from useWebsiteContent to useWebsite

// Mapping icon berdasarkan nama fasilitas
const getIconByName = (name) => {
    const lowerName = name.toLowerCase();

    // Logika if-else lainnya tetap sama...
    if (lowerName.includes('wifi') || lowerName.includes('wi-fi') || lowerName.includes('internet')) {
        return <Wifi size={40} className="mx-auto text-wood-brown" />;
    }
    if (lowerName.includes('stopkontak') || lowerName.includes('colokan') || lowerName.includes('listrik') || lowerName.includes('power')) {
        return <PlugZap size={40} className="mx-auto text-wood-brown" />;
    }
    if (lowerName.includes('merokok') || lowerName.includes('smoking') || lowerName.includes('outdoor')) {
        return <Wind size={40} className="mx-auto text-wood-brown" />;
    }
    if (lowerName.includes('parkir') || lowerName.includes('parking')) {
        return <ParkingCircle size={40} className="mx-auto text-wood-brown" />;
    }
    if (lowerName.includes('ruang') || lowerName.includes('privat') || lowerName.includes('private') || lowerName.includes('meeting') || lowerName.includes('room')) {
        return <Users size={40} className="mx-auto text-wood-brown" />;
    }
    if (lowerName.includes('mushola') || lowerName.includes('masjid') || lowerName.includes('prayer') || lowerName.includes('ibadah')) {
        return <Church size={40} className="mx-auto text-wood-brown" />;
    }
    if (lowerName.includes('makanan') || lowerName.includes('food') || lowerName.includes('menu')) {
        return <Utensils size={40} className="mx-auto text-wood-brown" />;
    }
    if (lowerName.includes('security') || lowerName.includes('keamanan') || lowerName.includes('aman')) {
        return <Shield size={40} className="mx-auto text-wood-brown" />;
    }
    return <Coffee size={40} className="mx-auto text-wood-brown" />;
};

const FasilitasSection = () => {
    // Panggil hook di sini, SATU KALI saja di level teratas
    const { t } = useTranslation();
    const { facilities, loading } = useWebsite(); // Changed from useWebsiteContent to useWebsite

    // Default facilities jika belum ada data dari backend
    const defaultFacilities = [
        { 
            name: 'Wi-Fi Cepat', 
            description: 'Tetap terhubung dengan koneksi internet berkecepatan tinggi, gratis untuk semua pengunjung.',
            is_active: true
        },
        { 
            name: 'Stopkontak', 
            description: 'Tersedia banyak stopkontak di berbagai sudut, cocok untuk bekerja atau belajar.',
            is_active: true
        },
        { 
            name: 'Area Merokok', 
            description: 'Area outdoor yang nyaman kami sediakan khusus untuk Anda yang ingin merokok.',
            is_active: true
        },
        { 
            name: 'Parkir Luas', 
            description: 'Tidak perlu khawatir, tersedia area parkir yang luas dan aman untuk mobil dan motor.',
            is_active: true
        },
        { 
            name: 'Ruang Privat', 
            description: 'Butuh tempat untuk rapat atau acara kecil? Kami menyediakan ruang privat yang bisa Anda pesan.',
            is_active: true
        },
        { 
            name: 'Mushola', 
            description: 'Kami menyediakan mushola yang bersih dan nyaman untuk Anda beribadah.',
            is_active: true
        }
    ];

    const activeFacilities = !loading && facilities && facilities.length > 0
        ? facilities
            .filter(f => f.is_active)
            .map(f => ({
                name: f.name,
                description: f.description || `Fasilitas ${f.name} tersedia.`,
                icon: getIconByName(f.name)
            }))
        : defaultFacilities.map(f => ({
            ...f,
            icon: getIconByName(f.name)
        }));

    return (
        <section id="fasilitas" className="py-16 px-4 bg-soft-white">
            <div className="container mx-auto">
                <div className="text-center mb-10" data-aos="fade-up">
                    <h2 className="font-serif font-black text-4xl text-wood-brown">{t('Fasilitas Kami')}</h2>
                    <p className="mt-4 text-charcoal/80 max-w-2xl mx-auto">{t('Kami menyediakan berbagai fasilitas untuk memastikan kenyamanan Anda selama berada di Kanagara.')}</p>
                </div>

                {activeFacilities.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {activeFacilities.map((facility, index) => (
                            <div 
                                key={index}
                                className="bg-cream p-8 rounded-lg shadow-md border border-wood-brown/10 text-center transform hover:-translate-y-2 transition-transform duration-300"
                                data-aos="fade-up"
                                data-aos-delay={100 * index}
                            >
                                {facility.icon}
                                <h3 className="font-serif font-bold text-xl text-charcoal mt-4">{t(facility.name)}</h3>
                                <p className="text-sm text-charcoal/70 mt-2">{t(facility.description)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-charcoal/60">{t('Belum ada fasilitas yang ditampilkan.')}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FasilitasSection;
