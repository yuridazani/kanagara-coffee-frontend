// frontend/src/pages/UploadDPPage.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Upload, CheckCircle } from 'lucide-react';
import { dummyReservations } from '../data/adminData'; 
import toast from 'react-hot-toast';

const UploadDPPage = () => {
    const { t } = useTranslation();
    const { reservationNumber } = useParams();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Cari data reservasi dari dummy
        const foundReservation = dummyReservations.find(
            (r) => r.reservationNumber === reservationNumber
        );
        if (foundReservation) {
            setReservation(foundReservation);
        } else {
            toast.error("Mode Demo: Reservasi tidak ditemukan.");
        }
        setLoading(false);
    }, [reservationNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error(t('Silakan pilih file bukti transfer terlebih dahulu.'));
            return;
        }
        if (!reservation) {
            toast.error("Data reservasi tidak valid, tidak bisa mengupload.");
            return;
        }

        setSubmitting(true);
        const toastId = toast.loading("Mengunggah bukti pembayaran...");

        // Simulasi upload 1,5 detik
        setTimeout(() => {
            setSubmitting(false);
            setIsSubmitted(true);
            toast.success(t('Bukti pembayaran berhasil diunggah!'), { id: toastId });
        }, 1500);
    };

    if (loading) {
        return <div className="text-center p-10">{t('Memuat data reservasi...')}</div>;
    }

    if (!reservation) {
        return (
            <div className="text-center p-10 text-red-500">
                {t('Reservasi dengan nomor')} {reservationNumber} {t('tidak ditemukan.')}
            </div>
        );
    }

    return (
        <div>
            <Header />
            <main className="pt-24 min-h-screen">
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-2xl text-center">
                        <h1 className="font-serif font-black text-4xl md:text-6xl text-wood-brown">
                            {t('Upload Bukti DP')}
                        </h1>
                        <p className="mt-4 text-charcoal/80">
                            {t('Untuk Reservasi:')}{' '}
                            <span className="font-mono font-bold">
                                {reservation.reservationNumber}
                            </span>
                        </p>

                        {isSubmitted ? (
                            <div className="mt-8 bg-soft-white p-8 rounded-lg shadow-lg">
                                <CheckCircle
                                    size={60}
                                    className="text-leaf-green mx-auto mb-4"
                                />
                                <h2 className="font-serif font-bold text-2xl text-wood-brown">
                                    {t('Bukti Terkirim!')}
                                </h2>
                                <p className="mt-2 text-charcoal/80">
                                    {t(
                                        'Terima kasih. Tim kami akan segera memverifikasi bukti pembayaran Anda.'
                                    )}
                                </p>
                                <Link
                                    to="/tracking"
                                    className="mt-6 inline-block bg-wood-brown text-white font-bold py-3 px-6 rounded-full"
                                >
                                    {t('Kembali ke Halaman Lacak')}
                                </Link>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 bg-soft-white p-8 rounded-lg shadow-lg space-y-6"
                            >
                                <div className="text-left">
                                    <p>
                                        {t('Silakan lakukan transfer DP sebesar')}{' '}
                                        <span className="font-bold">{t('Rp 100.000')}</span>{' '}
                                        {t('ke rekening berikut:')}
                                    </p>
                                    <p className="mt-2 font-bold">
                                        {t('BCA: 123456789 a/n Kanagara Coffee')}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        htmlFor="proof"
                                        className="font-bold text-charcoal"
                                    >
                                        {t('Upload Bukti Transfer')}
                                    </label>
                                    <input
                                        type="file"
                                        id="proof"
                                        required
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="mt-2 w-full text-sm p-2 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cream file:text-wood-brown hover:file:bg-wood-brown/20"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-wood-brown hover:bg-light-brown text-white font-bold py-3 px-6 rounded-full flex items-center justify-center space-x-2 disabled:bg-gray-400"
                                >
                                    <Upload size={20} />
                                    <span>
                                        {submitting
                                            ? 'Mengirim...'
                                            : 'Kirim Bukti Pembayaran'}
                                    </span>
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default UploadDPPage;
