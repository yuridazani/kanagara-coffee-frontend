// frontend/src/components/FeedbackCard.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, UserCircle, Coffee } from 'lucide-react';

// Helper untuk format waktu relatif
export const timeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(timestamp)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} tahun yang lalu`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} bulan yang lalu`;
    interval = seconds / 604800;
    if (interval > 1) return `${Math.floor(interval)} minggu yang lalu`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} hari yang lalu`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} jam yang lalu`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} menit yang lalu`;
    return "Baru saja";
};

// Komponen untuk menampilkan bintang (read-only)
export const StarRatingDisplay = ({ rating, size = 16 }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            <Star key={i} size={size} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} fill={i < rating ? 'currentColor' : 'none'} />
        ))}
    </div>
);

// ==========================================================
// ## KOMPONEN UTAMA KARTU FEEDBACK (INI YANG DIPERBAIKI) ##
// ==========================================================
export const FeedbackCard = ({ feedback }) => {
    // Panggil hook di sini, SATU KALI SAJA
    const { t } = useTranslation();
    const userName = feedback.name || 'Anonim';

    return (
        <div className="bg-cream p-5 rounded-lg border border-wood-brown/10 w-full">
            <div className="flex items-start gap-4">
                <UserCircle size={40} className="text-charcoal/50 flex-shrink-0" />
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-charcoal">{userName}</p>
                        {/* Menggunakan created_at dari backend */}
                        <p className="text-xs text-charcoal/60">{timeAgo(feedback.created_at)}</p> 
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <StarRatingDisplay rating={feedback.cafeRating} />
                        <span className="text-xs text-charcoal/70">{t('· Kunjungan pada')} {feedback.visitDate}</span>
                    </div>
                    <p className="italic text-charcoal/90 mt-3">"{feedback.cafeComment}"</p>
                    
                    {/* --- PERBAIKAN 1: Menampilkan Foto --- */}
                    {/* Menggunakan `feedback.photo_path` BUKAN `feedback.photoUrl` */}
                    {feedback.photo_path && (
                        <a href={`http://localhost:8000/storage/${feedback.photo_path}`} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={`http://localhost:8000/storage/${feedback.photo_path}`} 
                                alt={`Ulasan dari ${userName}`} 
                                className="mt-3 rounded-lg max-h-60 w-auto border shadow-sm"
                            />
                        </a>
                    )}
                    
                    {/* --- PERBAIKAN 2: Menampilkan Rating Menu --- */}
                    {/* Laravel mengubah 'menuRatings' relasi menjadi 'menu_ratings' di JSON */}
                    {feedback.menu_ratings && feedback.menu_ratings.length > 0 && (
                        <div className="mt-4 border-t border-wood-brown/10 pt-3">
                            <h4 className="font-semibold text-sm text-charcoal flex items-center gap-2"><Coffee size={16}/>{t('Menu yang dinilai:')}</h4>
                            <div className="mt-2 space-y-1">
                                {feedback.menu_ratings.map((mr, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        {/* Database kolom menggunakan 'menuName' (camelCase) */}
                                        <span className="text-charcoal/80">{mr.menuName}</span>
                                        <StarRatingDisplay rating={mr.rating} size={14} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};