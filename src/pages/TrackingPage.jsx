// src/pages/TrackingPage.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search, Calendar, Info, Phone } from 'lucide-react';
// HAPUS axiosClient
import { dummyReservations } from '../data/adminData'; // PAKAI DUMMY DATA
import toast from 'react-hot-toast';

const StatusCard = ({ status, reservationNumber, name, date, time, rescheduleHistory, t }) => {
    let infoText = "";
    let actionButton = null;

    switch (status) {
        case 'Menunggu Konfirmasi':
            infoText = t("Reservasi Anda telah kami terima dan sedang menunggu konfirmasi dari tim kami.");
            break;
        case 'Dikonfirmasi':
            infoText = t("Reservasi Anda telah dikonfirmasi! Silakan lakukan pembayaran DP untuk mengamankan tempat Anda.");
            actionButton = (
                <Link 
                    to={`/upload-dp/${reservationNumber}`} 
                    className="bg-wood-brown text-white font-bold py-2 px-4 rounded-full text-sm"
                >
                    {t('Upload Bukti DP')}
                </Link>
            );
            break;
        case 'DP Dibayar':
            infoText = t("Terima kasih, DP Anda telah diverifikasi. Anda sekarang dapat memilih menu untuk acara Anda.");
            actionButton = (
                <Link 
                    to={`/pilih-menu/${reservationNumber}`} 
                    className="bg-wood-brown text-white font-bold py-2 px-4 rounded-full text-sm"
                >
                    {t('Pilih Menu Sekarang')}
                </Link>
            );
            break;
        case 'Menu Dipilih':
            infoText = t("Pilihan menu Anda telah kami catat. Sampai jumpa di Kanagara!");
            break;
        case 'Bukti DP Diupload':
            infoText = t("Bukti DP Anda sedang diverifikasi oleh tim kami. Mohon tunggu konfirmasi lebih lanjut.");
            break;
        case 'Selesai':
            infoText = t("Terima kasih atas kunjungan Anda! Kami tunggu kedatangannya kembali.");
            break;
        case 'Ditolak':
            infoText = t("Maaf, reservasi Anda tidak dapat kami proses. Silakan hubungi kami untuk informasi lebih lanjut.");
            break;
        default:
            infoText = t("Status tidak diketahui.");
    }

    return (
        <div className="mt-12 bg-soft-white p-8 rounded-lg shadow-lg text-left" data-aos="fade-up">
            <h2 className="font-serif font-bold text-2xl text-wood-brown">{t('Detail Reservasi Anda')}</h2>
            <div className="mt-4 space-y-2 border-t pt-4">
                <p><strong>{t('Nomor Reservasi:')}</strong> {reservationNumber}</p>
                <p><strong>{t('Nama:')}</strong> {name}</p>
                <p><strong>{t('Tanggal:')}</strong> {date} @ {time}</p>
                <p><strong>{t('Status:')}</strong> <span className="font-bold text-leaf-green">{status}</span></p>
                
                {rescheduleHistory && rescheduleHistory.length > 0 && (
                    <div className="pt-4 border-t bg-blue-50 p-4 rounded-lg mt-4">
                        <div className="flex items-center mb-3">
                            <Calendar size={20} className="text-blue-600 mr-2" />
                            <h3 className="font-bold text-blue-800">{t('Riwayat Perubahan Jadwal')}</h3>
                        </div>
                        {rescheduleHistory.map((history, index) => (
                            <div key={index} className="mb-3 last:mb-0">
                                <div className="flex items-center text-sm text-blue-700">
                                    <Info size={14} className="mr-2" />
                                    <span className="font-medium">
                                        {t('Perubahan')} {index + 1}: {history.oldDate} {history.oldTime} → {history.newDate} {history.newTime}
                                    </span>
                                </div>
                                {history.reason && (
                                    <p className="text-xs text-blue-600 ml-6 mt-1">{t('Alasan:')} {history.reason}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="pt-4 border-t mt-4">
                    <p className="text-sm text-charcoal/80 mb-4">{infoText}</p>
                    {actionButton}
                </div>
            </div>
        </div>
    );
};

const TrackingPage = () => {
    const { t } = useTranslation();
    const [reservationNumber, setReservationNumber] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setNotFound(false);
        setSearchResult(null);

        setTimeout(() => {
            const foundReservation = dummyReservations.find(
                r => r.reservationNumber.toLowerCase() === reservationNumber.toLowerCase()
            );

            if (foundReservation) {
                setSearchResult(foundReservation);
            } else {
                setNotFound(true);
                toast.error(t('Nomor reservasi tidak ditemukan.'));
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div>
            <Header />
            <main className="pt-24 min-h-screen bg-cream">
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-2xl text-center">
                        <h1 className="font-serif font-black text-4xl md:text-5xl text-wood-brown">{t('Lacak Reservasi Anda')}</h1>
                        <p className="mt-4 text-charcoal/80">{t('Masukkan nomor reservasi untuk melihat status terbaru.')}</p>
                        
                        <form 
                            onSubmit={handleSearch} 
                            className="mt-8 bg-soft-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-4"
                        >
                            <input 
                                type="text" 
                                value={reservationNumber}
                                onChange={(e) => setReservationNumber(e.target.value)}
                                placeholder="Nomor Reservasi (cth: RSV-xxxx-xxxx)" 
                                required 
                                className="w-full p-3 border rounded-md" 
                            />
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="bg-wood-brown text-white font-bold p-3 rounded-md flex-shrink-0"
                            >
                                {loading ? t('Mencari...') : <Search />}
                            </button>
                        </form>

                        {notFound && (
                            <p className="mt-6 text-red-600 font-bold">
                                {t('Reservasi tidak ditemukan. Pastikan nomor reservasi sesuai.')}
                            </p>
                        )}

                        {searchResult && (
                            <StatusCard 
                                status={searchResult.status} 
                                reservationNumber={searchResult.reservationNumber}
                                name={searchResult.name}
                                date={searchResult.date}
                                time={searchResult.time}
                                rescheduleHistory={searchResult.rescheduleHistory}
                                t={t}
                            />
                        )}

                        {/* Bagian Bantuan / Kontak */}
                        <div className="mt-16 bg-leaf-green/10 border border-leaf-green/30 p-6 rounded-lg text-center">
                            <h3 className="font-bold text-wood-brown flex items-center justify-center gap-2">
                                <Phone size={18}/>{t('Butuh Bantuan?')}
                            </h3>
                            <p className="text-charcoal/80 text-sm mt-2">
                                {t('Jika Anda memiliki pertanyaan atau kendala terkait reservasi, jangan ragu untuk menghubungi kami melalui WhatsApp di nomor berikut:')}
                            </p>
                            <a 
                                href="https://wa.me/6281234567890" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="font-bold text-leaf-green mt-3 inline-block"
                            >
                                {t('0812-3456-7890 (Admin Kanagara)')}
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default TrackingPage;
