// src/pages/MenuPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axiosClient from '../api/axiosClient';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Ornament from '../components/Ornament';
import { LayoutGrid, List } from 'lucide-react';

// Daftar tag yang bisa difilter oleh pelanggan
const availableTags = ['Best Seller', 'Popular', 'Recommended', 'Must Try', 'New Menu'];

// Komponen Kartu Menu
const MenuItemCard = ({ item, viewMode = 'grid' }) => {
    const { t } = useTranslation();
    const [imageError, setImageError] = useState(false);

    const formatPrice = (price) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    const getTagClass = (tag) => {
        switch (tag) {
            case 'Best Seller': return 'bg-yellow-500 text-white';
            case 'Popular': return 'bg-blue-500 text-white';
            case 'Recommended': return 'bg-green-500 text-white';
            case 'Must Try': return 'bg-purple-500 text-white';
            case 'New Menu': return 'bg-pink-500 text-white';
            default: return 'hidden';
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath || imageError) return null;
        return `http://localhost:8000/storage/${imagePath}`;
    };

    const imageUrl = getImageUrl(item.image_path);

    // List View
    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex overflow-hidden group" data-aos="fade-up">
                <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-wood-brown/20 to-wood-brown/10 flex items-center justify-center">
                            <span className="text-wood-brown/60 text-xs">{t('No Image')}</span>
                        </div>
                    )}
                    {item.tag !== 'None' && (
                        <span className={`absolute top-1 right-1 text-xs font-bold px-2 py-0.5 rounded-full ${getTagClass(item.tag)}`}>
                            {item.tag}
                        </span>
                    )}
                </div>
                <div className="flex-1 p-4 flex justify-between items-center min-w-0">
                    <div className="flex-1 min-w-0 mr-4">
                        <h3 className="font-serif font-bold text-lg text-charcoal truncate">{item.name}</h3>
                        <p className="text-sm text-charcoal/60">{item.category}</p>
                        {item.description && (
                            <p className="text-xs text-charcoal/50 mt-1 line-clamp-2">{item.description}</p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-wood-brown">{formatPrice(item.price)}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Grid View
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group" data-aos="fade-up">
            <div className="relative h-40 overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-wood-brown/20 to-wood-brown/10 flex items-center justify-center">
                        <span className="text-wood-brown/60 text-sm">{t('No Image')}</span>
                    </div>
                )}
                {item.tag !== 'None' && (
                    <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${getTagClass(item.tag)}`}>
                        {item.tag}
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-serif font-bold text-lg text-charcoal mb-1">{item.name}</h3>
                <p className="text-sm text-charcoal/60 mb-3">{item.category}</p>
                <div className="flex justify-between items-center">
                    <p className="font-bold text-lg text-wood-brown">{formatPrice(item.price)}</p>
                </div>
            </div>
        </div>
    );
};

const MenuPage = () => {
    const { t } = useTranslation();
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeTag, setActiveTag] = useState("All");
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/menus');
                setMenus(response.data.data);
                setError(null);
            } catch (err) {
                setError('Gagal memuat data menu.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenus();
    }, []);

    useEffect(() => {
        AOS.init({ duration: 600, once: true });
        window.scrollTo(0, 0);
    }, []);

    const menuCategories = ["All", ...new Set(menus.map(item => item.category))];

    const filteredMenu = useMemo(() => {
        let items = [...menus];
        if (activeCategory !== "All") items = items.filter(item => item.category === activeCategory);
        if (activeTag !== "All") items = items.filter(item => item.tag === activeTag);
        return items;
    }, [menus, activeCategory, activeTag]);

    if (loading) return <div className="text-center py-20">{t('Loading...')}</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div>
            <Header />
            <main className="pt-24 bg-cream">
                <section id="menu" className="py-12 px-4">
                    <div className="container mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8 relative bg-gradient-to-r from-wood-brown to-light-brown rounded-lg shadow-lg py-12 px-8" data-aos="fade-up">
                            <div className="relative z-10">
                                <h1 className="font-serif font-black text-3xl md:text-5xl text-white">{t('Our Full Menu')}</h1>
                                <p className="mt-3 text-white/90 max-w-2xl mx-auto">
                                    {t('Jelajahi semua pilihan kopi, hidangan, dan camilan terbaik yang kami siapkan.')}
                                </p>
                            </div>
                        </div>

                        {/* Filter & View Toggle */}
                        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border border-gray-200 p-4 mb-8 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="200">
                            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                                {/* Categories */}
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2">
                                        {menuCategories.map(category => (
                                            <button
                                                key={category}
                                                onClick={() => setActiveCategory(category)}
                                                className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all ${
                                                    activeCategory === category
                                                        ? 'bg-wood-brown text-white shadow-md'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tag Filter & View Mode */}
                                <div className="flex gap-3 items-center">
                                    <select
                                        onChange={(e) => setActiveTag(e.target.value)}
                                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-wood-brown/20"
                                    >
                                        <option value="All">{t('Semua Label')}</option>
                                        {availableTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                                    </select>
                                    <div className="flex bg-gray-100 rounded-md p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                                        >
                                            <LayoutGrid size={16} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                                        >
                                            <List size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Counter */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-600">
                                {t('Menampilkan')} {filteredMenu.length} {t('menu')}
                                {activeCategory !== "All" && ` dalam kategori "${activeCategory}"`}
                                {activeTag !== "All" && ` dengan label "${activeTag}"`}
                            </p>
                        </div>

                        {/* Menu Grid/List */}
                        <div className={viewMode === 'grid'
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "space-y-4"}>
                            {filteredMenu.length > 0 ? (
                                filteredMenu.map((item) => (
                                    <MenuItemCard key={item.id} item={item} viewMode={viewMode} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    <p className="text-lg">{t('Tidak ada menu yang ditemukan')}</p>
                                    <p className="text-sm">{t('Coba ubah filter kategori atau label')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Ornament />
            <Footer />
        </div>
    );
};

export default MenuPage;
