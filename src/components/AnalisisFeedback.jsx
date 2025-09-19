// src/components/AnalisisFeedback.jsx
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MessageSquare, ThumbsUp, Coffee } from 'lucide-react';

const AnalisisFeedback = ({ feedbackList }) => {
    const { t } = useTranslation();

    const stats = useMemo(() => {
        if (!feedbackList || feedbackList.length === 0) {
            return { 
                total: 0, 
                avgRating: 0, 
                bestMenu: 'N/A', 
                topRatedMenu: 'N/A' 
            };
        }

        const total = feedbackList.length;
        
        // Handle both cafeRating and cafe_rating properties for backward compatibility
        const totalCafeRating = feedbackList.reduce((acc, fb) => {
            const rating = fb.cafeRating || fb.cafe_rating || 0;
            return acc + rating;
        }, 0);
        
        const avgRating = (totalCafeRating / total).toFixed(1);

        const menuRatings = new Map();
        const menuCounts = new Map();

        feedbackList.forEach(fb => {
            // Handle both menu_ratings and menuRatings properties for backward compatibility
            const menuRatingsList = fb.menu_ratings || fb.menuRatings || [];
            
            menuRatingsList.forEach(mr => {
                // Handle both menuName and menu_name properties
                const menuName = mr.menuName || mr.menu_name;
                if (menuName) {
                    menuCounts.set(menuName, (menuCounts.get(menuName) || 0) + 1);
                    menuRatings.set(menuName, (menuRatings.get(menuName) || 0) + (mr.rating || 0));
                }
            });
        });
        
        let bestMenu = 'N/A';
        if (menuCounts.size > 0) {
            const sortedByCount = [...menuCounts.entries()].sort((a, b) => b[1] - a[1]);
            bestMenu = sortedByCount[0][0];
        }

        let topRatedMenu = 'N/A';
        if (menuRatings.size > 0) {
            const avgMenuRatings = [...menuRatings.entries()].map(([name, totalRating]) => ({
                name,
                avg: totalRating / menuCounts.get(name)
            }));
            
            const sortedByRating = avgMenuRatings.sort((a, b) => b.avg - a.avg);
            topRatedMenu = sortedByRating[0].name;
        }

        return { total, avgRating, bestMenu, topRatedMenu };
    }, [feedbackList]);

    return (
        <div className="mb-8 p-4 border rounded-lg bg-cream">
            <h3 className="font-serif font-bold text-xl text-wood-brown mb-4">
                {t('Analisis Feedback')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-soft-white p-4 rounded-lg text-center">
                    <MessageSquare className="mx-auto text-blue-500" size={24} />
                    <p className="text-2xl font-bold mt-1">{stats.total}</p>
                    <p className="text-xs text-charcoal/70 mt-1">{t('Total Ulasan')}</p>
                </div>
                
                <div className="bg-soft-white p-4 rounded-lg text-center">
                    <Star className="mx-auto text-yellow-500" size={24} />
                    <p className="text-2xl font-bold mt-1">{stats.avgRating}</p>
                    <p className="text-xs text-charcoal/70 mt-1">{t('Rata-rata Rating Kafe')}</p>
                </div>
                
                <div className="bg-soft-white p-4 rounded-lg text-center">
                    <ThumbsUp className="mx-auto text-green-500" size={24} />
                    <p className="text-lg font-bold truncate mt-1" title={stats.bestMenu}>
                        {stats.bestMenu}
                    </p>
                    <p className="text-xs text-charcoal/70 mt-1">{t('Paling Sering Dinilai')}</p>
                </div>
                
                <div className="bg-soft-white p-4 rounded-lg text-center">
                    <Coffee className="mx-auto text-purple-500" size={24} />
                    <p className="text-lg font-bold truncate mt-1" title={stats.topRatedMenu}>
                        {stats.topRatedMenu}
                    </p>
                    <p className="text-xs text-charcoal/70 mt-1">{t('Rating Menu Tertinggi')}</p>
                </div>
            </div>
        </div>
    );
};

export default AnalisisFeedback;