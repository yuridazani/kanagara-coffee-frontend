// src/pages/UlasanPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FeedbackCard } from '../components/FeedbackCard';
import { Star, Filter } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const UlasanPage = () => {
    const { t } = useTranslation();
    const [allFeedback, setAllFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('newest');
    const [filterRating, setFilterRating] = useState(0);
    const [filterMenu, setFilterMenu] = useState('all');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchFeedback = async () => {
            try {
                const response = await axiosClient.get('/feedback');
                console.log('Feedback data:', response.data.data);
                setAllFeedback(response.data.data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                toast.error(t('Gagal memuat ulasan dari server.'));
            } finally {
                setLoading(false);
            }
        };
        fetchFeedback();
    }, [t]);

    // Membuat daftar menu unik dari semua ulasan
    const uniqueMenus = useMemo(() => {
        const menuSet = new Set();
        allFeedback.forEach(fb => {
            const menu_ratings = fb.menu_ratings || [];
            menu_ratings.forEach(mr => {
                const menuName = mr.menuName;
                if (menuName) menuSet.add(menuName);
            });
        });
        const menuArray = Array.from(menuSet).sort();
        console.log('Unique menus found:', menuArray);
        return menuArray;
    }, [allFeedback]);

    // Logika filter dan sortir
    const filteredAndSortedReviews = useMemo(() => {
        let reviews = [...allFeedback];
        
        // Filter berdasarkan rating
        if (filterRating > 0) {
            reviews = reviews.filter(fb => {
                const rating = fb.cafeRating || fb.cafe_rating;
                return rating === filterRating;
            });
        }
        
        // Filter berdasarkan menu
        if (filterMenu !== 'all') {
            reviews = reviews.filter(fb => {
                const menu_ratings = fb.menu_ratings || [];
                const hasMenu = menu_ratings.some(mr => {
                    return mr.menuName === filterMenu;
                });
                console.log(`Checking feedback ${fb.id} for menu "${filterMenu}":`, hasMenu, menu_ratings);
                return hasMenu;
            });
        }
        
        // Sortir hasil
        reviews.sort((a, b) => {
            const aRating = a.cafeRating || a.cafe_rating;
            const bRating = b.cafeRating || b.cafe_rating;
            const aDate = a.created_at || a.id;
            const bDate = b.created_at || b.id;
            
            if (sortOption === 'highest') return bRating - aRating;
            if (sortOption === 'lowest') return aRating - bRating;
            return new Date(bDate) - new Date(aDate);
        });
        
        return reviews;
    }, [allFeedback, sortOption, filterRating, filterMenu]);

    // Hitung rating rata-rata
    const averageRating = useMemo(() => {
        if (allFeedback.length === 0) return 0;
        
        const validFeedbacks = allFeedback.filter(f => {
            const rating = f.cafeRating || f.cafe_rating;
            return rating > 0;
        });
        
        if (validFeedbacks.length === 0) return 0;
        
        const totalRating = validFeedbacks.reduce((acc, curr) => {
            const rating = curr.cafeRating || curr.cafe_rating;
            return acc + rating;
        }, 0);
        
        return (totalRating / validFeedbacks.length).toFixed(1);
    }, [allFeedback]);

    // Hitung distribusi rating untuk statistik
    const ratingDistribution = useMemo(() => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        allFeedback.forEach(fb => {
            const rating = fb.cafeRating || fb.cafe_rating;
            if (rating && rating >= 1 && rating <= 5) {
                distribution[rating]++;
            }
        });
        return distribution;
    }, [allFeedback]);

    if (loading) {
        return (
            <div className="bg-soft-white min-h-screen flex items-center justify-center">
                <div className="text-center p-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-wood-brown"></div>
                    <p className="mt-3 text-charcoal text-sm">{t('Memuat ulasan...')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-soft-white min-h-screen">
            <Header />
            <main className="pt-24">
                <section className="py-8 px-4">
                    <div className="container mx-auto max-w-7xl">
                        {/* Header Compact dengan Stats */}
                        <div className="bg-gradient-to-r from-wood-brown to-light-brown rounded-lg p-6 mb-6 text-white">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="text-center md:text-left">
                                    <h1 className="font-serif font-black text-2xl md:text-4xl">{t('Ulasan Pengunjung')}</h1>
                                    {averageRating > 0 && (
                                        <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                                            <Star size={20} className="text-yellow-400" fill="currentColor" />
                                            <span className="text-xl font-bold">{averageRating}</span>
                                            <span className="text-white/80 text-sm">
                                                {t('/ 5.0 dari')} {allFeedback.filter(f => {
                                                    const rating = f.cafeRating || f.cafe_rating;
                                                    return rating > 0;
                                                }).length} {t('ulasan')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Mini Rating Distribution */}
                                {averageRating > 0 && (
                                    <div className="hidden md:block bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                        <h3 className="text-sm font-semibold mb-2">{t('Distribusi Rating')}</h3>
                                        <div className="space-y-1">
                                            {[5, 4, 3, 2, 1].map(rating => (
                                                <div key={rating} className="flex items-center gap-2 text-xs">
                                                    <span className="w-3">{rating}</span>
                                                    <Star size={12} className="text-yellow-400" fill="currentColor" />
                                                    <div className="w-16 bg-white/20 rounded-full h-1.5">
                                                        <div 
                                                            className="bg-yellow-400 h-1.5 rounded-full"
                                                            style={{ 
                                                                width: `${allFeedback.length > 0 ? (ratingDistribution[rating] / allFeedback.length) * 100 : 0}%` 
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-white/80">{ratingDistribution[rating]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Panel Filter Compact */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm sticky top-20 z-40">
                            <div className="flex items-center gap-2 mb-3">
                                <Filter size={16} className="text-gray-600" />
                                <span className="text-sm font-semibold text-gray-700">{t('Filter & Urutkan')}</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                    {filteredAndSortedReviews.length} {t('hasil')}
                                </span>
                                {uniqueMenus.length > 0 && (
                                    <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
                                        {uniqueMenus.length} {t('menu tersedia')}
                                    </span>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <select 
                                        value={sortOption} 
                                        onChange={e => setSortOption(e.target.value)} 
                                        className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-wood-brown/20"
                                    >
                                        <option value="newest">{t('🕐 Terbaru')}</option>
                                        <option value="highest">{t('⭐ Rating Tertinggi')}</option>
                                        <option value="lowest">{t('⭐ Rating Terendah')}</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <select 
                                        value={filterRating} 
                                        onChange={e => setFilterRating(Number(e.target.value))} 
                                        className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-wood-brown/20"
                                    >
                                        <option value={0}>{t('Semua Rating')}</option>
                                        <option value={5}>{t('⭐⭐⭐⭐⭐ (5 bintang)')}</option>
                                        <option value={4}>{t('⭐⭐⭐⭐☆ (4 bintang)')}</option>
                                        <option value={3}>{t('⭐⭐⭐☆☆ (3 bintang)')}</option>
                                        <option value={2}>{t('⭐⭐☆☆☆ (2 bintang)')}</option>
                                        <option value={1}>{t('⭐☆☆☆☆ (1 bintang)')}</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <select 
                                        value={filterMenu} 
                                        onChange={e => {
                                            console.log('Menu filter changed to:', e.target.value);
                                            setFilterMenu(e.target.value);
                                        }} 
                                        className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-wood-brown/20"
                                    >
                                        <option value="all">{t('🍽️ Semua Menu')}</option>
                                        {uniqueMenus.map(menu => (
                                            <option key={menu} value={menu}>{menu}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Daftar Ulasan - Grid yang lebih efisien */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredAndSortedReviews.length > 0 ? (
                                filteredAndSortedReviews.map(fb => (
                                    <FeedbackCard key={fb.id} feedback={fb} />
                                ))
                            ) : (
                                <div className="lg:col-span-2 xl:col-span-3">
                                    <div className="text-center bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300">
                                        <div className="text-4xl mb-4">🔍</div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('Tidak ada ulasan ditemukan')}</h3>
                                        <p className="text-gray-500 text-sm">{t('Coba ubah filter atau hapus beberapa kriteria pencarian')}</p>
                                        <button 
                                            onClick={() => {
                                                setFilterRating(0);
                                                setFilterMenu('all');
                                                setSortOption('newest');
                                            }}
                                            className="mt-4 px-4 py-2 bg-wood-brown text-white text-sm rounded-md hover:bg-light-brown transition-colors"
                                        >
                                            {t('Reset Filter')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Stats Footer */}
                        {allFeedback.length > 0 && (
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div>
                                        <div className="text-lg font-bold text-wood-brown">{allFeedback.length}</div>
                                        <div className="text-xs text-gray-600">{t('Total Ulasan')}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-wood-brown">{averageRating}</div>
                                        <div className="text-xs text-gray-600">{t('Rating Rata-rata')}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-wood-brown">{uniqueMenus.length}</div>
                                        <div className="text-xs text-gray-600">{t('Menu Diulas')}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-wood-brown">
                                            {allFeedback.length > 0 
                                                ? Math.round((ratingDistribution[5] + ratingDistribution[4]) / allFeedback.length * 100)
                                                : 0}%
                                        </div>
                                        <div className="text-xs text-gray-600">{t('Rating 4-5 ⭐')}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default UlasanPage;