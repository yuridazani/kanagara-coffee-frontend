// src/components/BestSellerSection.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight, Eye } from 'lucide-react';
// import axiosClient from '../api/axiosClient'; ❌ tidak dipakai lagi
import { menuData } from '../data/menuData'; // ✅ data statis

const BestSellerSection = () => {
    const { t } = useTranslation();
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ganti dengan logika data statis
        const dummyBestSellers = menuData
            .filter(item => item.tag === "Best Seller") // tetap filter by tag
            .slice(0, 4); // ambil 4 teratas
        setBestSellers(dummyBestSellers);
        setLoading(false);
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0 
        }).format(price);
    };

    const CompactMenuCard = ({ item }) => (
        <div className="bg-cream rounded-lg border border-wood-brown/10 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group">
            <div className="relative">
                <img
                    src={item.image_path}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470&auto=format&fit=crop';
                    }}
                />
                <div className="absolute top-2 left-2 bg-wood-brown text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={10} />{t('Best')}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-charcoal text-lg leading-tight mb-1">
                    {item.name}
                </h3>
                <p className="text-xs text-charcoal/60 mb-2">
                    {item.category}
                </p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-wood-brown">
                        {formatPrice(item.price)}
                    </span>
                </div>
            </div>
        </div>
    );

    const HorizontalMenuCard = ({ item }) => (
        <div className="bg-cream rounded-lg border border-wood-brown/10 hover:shadow-md transition-all duration-200 flex overflow-hidden group">
            <div className="relative w-20 h-20 flex-shrink-0">
                <img
                    src={item.image_path}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470&auto=format&fit=crop';
                    }}
                />
                <div className="absolute top-1 left-1 bg-wood-brown text-white text-xs px-1.5 py-0.5 rounded">
                    <TrendingUp size={8} />
                </div>
            </div>
            <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                    <h4 className="font-semibold text-charcoal text-sm leading-tight mb-1">
                        {item.name}
                    </h4>
                    <p className="text-xs text-charcoal/60">
                        {item.category}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-wood-brown text-sm">
                        {formatPrice(item.price)}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <section id="best-sellers" className="py-10 px-4 bg-soft-white">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-6" data-aos="fade-up">
                    <div>
                        <h2 className="font-serif font-bold text-2xl md:text-3xl text-wood-brown flex items-center gap-2">
                            <TrendingUp size={24} className="text-wood-brown" />{t('Menu Terfavorit')}
                        </h2>
                        <p className="mt-1 text-sm text-charcoal/70">{t('Pilihan menu yang paling disukai pengunjung')}</p>
                    </div>
                    
                    <Link
                        to="/menu"
                        className="flex items-center gap-1 text-sm text-wood-brown hover:text-light-brown transition-colors font-medium"
                    >
                        <Eye size={16} />{t('Menu Lengkap')}<ChevronRight size={14} />
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wood-brown mx-auto"></div>
                    </div>
                ) : bestSellers.length > 0 ? (
                    <>
                        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
                            {bestSellers.map((item) => (
                                <CompactMenuCard 
                                    key={item.id} 
                                    item={item}
                                />
                            ))}
                        </div>

                        <div className="md:hidden space-y-3" data-aos="fade-up">
                            {bestSellers.map((item) => (
                                <HorizontalMenuCard 
                                    key={item.id} 
                                    item={item}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8 bg-cream/50 rounded-lg border border-wood-brown/10" data-aos="fade-up">
                        <TrendingUp size={32} className="text-charcoal/30 mx-auto mb-2" />
                        <p className="text-sm text-charcoal/70">{t('Menu best seller belum diatur')}</p>
                        <p className="text-xs text-charcoal/50">{t('Atur label "Best Seller" di data statis menuData.js')}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BestSellerSection;
