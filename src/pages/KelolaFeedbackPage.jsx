// src/pages/KelolaFeedbackPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Trash2, Coffee, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import AnalisisFeedback from '../components/AnalisisFeedback';
import axiosClient from '../api/axiosClient';

const KelolaFeedbackPage = () => {
    // Panggil hook di sini, satu kali di level teratas
    const { t } = useTranslation();

    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterRating, setFilterRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fungsi untuk mengambil data dari backend
    const fetchFeedback = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/feedback');
            setFeedbackList(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data feedback.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    // Fungsi untuk menghapus data di backend
    const deleteFeedback = (id) => {
        toast((toastInstance) => (
            <div>
                <p className="font-bold mb-2">{t('Yakin ingin menghapus feedback ini?')}</p>
                <div className="flex gap-2">
                    <button
                        className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-md"
                        onClick={async () => {
                            toast.dismiss(toastInstance.id);
                            const toastId = toast.loading("Menghapus...");
                            try {
                                await axiosClient.delete(`/feedback/${id}`);
                                toast.success("Feedback dihapus.", { id: toastId });
                                fetchFeedback();
                            } catch (error) {
                                toast.error("Gagal menghapus.", { id: toastId });
                            }
                        }}
                    >{t('Hapus')}</button>
                    <button
                        className="w-full bg-gray-200 hover:bg-gray-300 text-sm py-1 px-3 rounded-md"
                        onClick={() => toast.dismiss(toastInstance.id)}
                    >{t('Batal')}</button>
                </div>
            </div>
        ));
    };

    const filteredFeedback = useMemo(() => {
        if (filterRating === 0) return feedbackList;
        return feedbackList.filter(fb => fb.cafeRating === filterRating);
    }, [feedbackList, filterRating]);

    // Pagination
    const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
    const paginatedFeedback = filteredFeedback.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const StarRating = ({ rating, size = 16 }) => (
        <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
                <Star
                    key={star}
                    size={size}
                    className={rating >= star ? 'text-yellow-500' : 'text-gray-300'}
                    fill="currentColor"
                />
            ))}
        </div>
    );

    return (
        <div className="bg-soft-white p-8 rounded-xl shadow-lg space-y-6">
            <div>
                <h2 className="font-serif font-black text-2xl text-wood-brown">{t('Ulasan & Feedback Pengunjung')}</h2>
                <p className="text-charcoal/70 mt-1">{t('Lihat, analisis, dan kelola ulasan yang masuk dari pengunjung.')}</p>
            </div>
            <div className="pt-4 border-t">
                {/* Komponen Analisis */}
                <AnalisisFeedback feedbackList={feedbackList} />

                 {/* Filter */}
                <div className="mb-4">
                    <label className="mr-4 font-bold">{t('Filter Rating Kafe:')}</label>
                    <select
                        value={filterRating}
                        onChange={(e) => {
                            setFilterRating(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="p-2 border rounded-lg bg-white"
                    >
                        <option value={0}>{t('Semua Rating')}</option>
                        <option value={5}>★★★★★ (5)</option>
                        <option value={4}>★★★★☆ (4)</option>
                        <option value={3}>★★★☆☆ (3)</option>
                        <option value={2}>★★☆☆☆ (2)</option>
                        <option value={1}>★☆☆☆☆ (1)</option>
                    </select>
                </div>

                {/* Daftar Feedback */}
                <div className="space-y-6">
                    {paginatedFeedback.length > 0 ? (
                        paginatedFeedback.map(fb => (
                            <div key={fb.id} className="bg-cream border p-5 rounded-lg">
                                <div className="flex justify-between items-start border-b pb-3 mb-3">
                                    <div>
                                        <p className="font-bold text-lg text-charcoal">{fb.name}</p>
                                        <p className="text-xs text-charcoal/60">{t('Kunjungan:')} {fb.visitDate} @ {fb.visitTime}</p>
                                    </div>
                                    <button
                                        onClick={() => deleteFeedback(fb.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Ulasan Kafe */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-3">
                                        <MessageCircle size={20} className="text-wood-brown" />
                                        <h4 className="font-bold text-md text-wood-brown">{t('Ulasan Kafe')}</h4>
                                    </div>
                                        <div className="pl-8 mt-2">
                                            <StarRating rating={fb.cafeRating} />
                                            <p className="mt-2 text-charcoal/90 italic">"{fb.cafeComment}"</p>
                                            
                                            {/* TAMPILKAN LINK FOTO TUNGGAL */}
                                            {fb.photo_path && (
                                                <div className="mt-4">
                                                    <a 
                                                        href={`http://localhost:8000/storage/${fb.photo_path}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-bold text-blue-600 hover:underline"
                                                    >{t('Lihat Foto dari Customer')}</a>
                                                </div>
                                            )}
                                        </div>
                                </div>

                                {/* Ulasan Menu */}
                                {fb.menu_ratings && fb.menu_ratings.length > 0 && (
                                    <div className="border-t pt-4">
                                        <div className="flex items-center gap-3">
                                            <Coffee size={20} className="text-leaf-green" />
                                            <h4 className="font-bold text-md text-leaf-green">{t('Ulasan Menu')}</h4>
                                        </div>
                                        <div className="pl-8 mt-2 space-y-2">
                                            {fb.menu_ratings.map((mr, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between text-sm"
                                                >
                                                    <span className="text-charcoal">{mr.menuName}</span>
                                                    <StarRating rating={mr.rating} size={14} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center p-8 text-charcoal/60 bg-cream rounded-lg">{t('Belum ada feedback yang sesuai dengan filter.')}</p>
                    )}
                </div>

                {/* Pagination - SELALU TAMPILKAN JIKA ADA DATA */}
                {filteredFeedback.length > 0 && (
                    <div className="flex flex-col items-center mt-8 space-y-2">
                        {/* Info Pagination */}
                        <div className="text-sm text-charcoal/70">{t('Menampilkan')} {Math.min((currentPage - 1) * itemsPerPage + 1, filteredFeedback.length)} - {Math.min(currentPage * itemsPerPage, filteredFeedback.length)} {t('dari')} {filteredFeedback.length} {t('feedback')}</div>
                        
                        {/* Navigasi Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                >{t('Prev')}</button>
                                
                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-2 border rounded-lg ${
                                            currentPage === page 
                                                ? 'bg-wood-brown text-white border-wood-brown' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                >{t('Next')}</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KelolaFeedbackPage;