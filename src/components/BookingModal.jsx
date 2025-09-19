// frontend/src/components/BookingModal.jsx

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next'; // Pastikan diimpor
import { X, Send, CheckCircle } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";

const BookingModal = ({ isOpen, onClose }) => {
    // Panggil hook di sini, SATU KALI di level teratas komponen
    const { t } = useTranslation();

    const [bookingType, setBookingType] = useState('meja');
    const [area, setArea] = useState('indoor');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedReservation, setSubmittedReservation] = useState(null);
    const [formData, setFormData] = useState({
        name: '', whatsapp: '', date: '', time: '', people: 1, eventDetails: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const recaptchaRef = useRef();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recaptchaToken = recaptchaRef.current.getValue();
        if (!recaptchaToken) {
            toast.error("Mohon selesaikan verifikasi reCAPTCHA.");
            return;
        }

        setIsSubmitting(true);
        const formattedWhatsApp = `+62${formData.whatsapp}`;
        const payload = {
            ...formData,
            whatsapp: formattedWhatsApp,
            type: bookingType,
            area: bookingType === 'meja' ? area : null,
            recaptcha_token: recaptchaToken,
        };

        const toastId = toast.loading("Mengirim reservasi...");

        try {
            const response = await axiosClient.post('/reservations', payload);
            setSubmittedReservation(response.data.data);
            setIsSubmitted(true);
            toast.success("Reservasi berhasil terkirim!", { id: toastId });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Gagal mengirim reservasi. Silakan coba lagi.";
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsSubmitting(false);
            recaptchaRef.current.reset();
        }
    };

    const handleClose = () => {
        // HAPUS useTranslation() dari sini
        setIsSubmitted(false);
        setSubmittedReservation(null);
        setFormData({ name: '', whatsapp: '', date: '', time: '', people: 1, eventDetails: '' });
        setBookingType('meja');
        setArea('indoor');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
            <div className="bg-soft-white rounded-lg shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleClose} className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal"><X /></button>
                <div className="p-8">
                    {isSubmitted ? (
                        <div className="text-center py-10">
                            <CheckCircle size={50} className="text-leaf-green mx-auto mb-4" />
                            <h3 className="font-serif font-bold text-2xl text-wood-brown">{t('Reservasi Terkirim!')}</h3>
                            <p className="mt-2 text-charcoal/80">{t('Silakan catat Nomor Reservasi Anda di bawah ini untuk melacak status pesanan.')}</p>
                            <div className="my-6 p-4 bg-cream border-2 border-dashed border-wood-brown/50 rounded-lg">
                                <p className="font-mono text-2xl font-bold text-wood-brown">
                                    {submittedReservation?.reservationNumber || 'Loading...'}
                                </p>
                            </div>
                            <p className="text-xs text-charcoal/60">{t('(Sangat disarankan untuk melakukan screenshot bagian ini)')}</p>
                            <button onClick={handleClose} className="mt-6 bg-wood-brown text-white font-bold py-3 px-6 rounded-full">{t('Selesai')}</button>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-serif font-black text-3xl text-wood-brown text-center mb-6">{t('Formulir Reservasi')}</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="font-bold">{t('Tipe Reservasi')}</label>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        <button type="button" onClick={() => setBookingType('meja')} className={`p-3 rounded-lg font-bold ${bookingType === 'meja' ? 'bg-wood-brown text-white' : 'bg-cream'}`}>{t('Booking Meja')}</button>
                                        <button type="button" onClick={() => setBookingType('event')} className={`p-3 rounded-lg font-bold ${bookingType === 'event' ? 'bg-wood-brown text-white' : 'bg-cream'}`}>{t('Booking Event')}</button>
                                    </div>
                                </div>
                                
                                {bookingType === 'meja' && (
                                    <div>
                                        <label className="font-bold">{t('Pilih Area')}</label>
                                        <div className="grid grid-cols-3 gap-3 mt-2">
                                            <button type="button" onClick={() => setArea('indoor')} className={`p-3 rounded-lg text-sm ${area === 'indoor' ? 'bg-light-brown text-white' : 'bg-cream'}`}>{t('Indoor')}</button>
                                            <button type="button" onClick={() => setArea('outdoor')} className={`p-3 rounded-lg text-sm ${area === 'outdoor' ? 'bg-light-brown text-white' : 'bg-cream'}`}>{t('Outdoor')}</button>
                                            <button type="button" onClick={() => setArea('vip')} className={`p-3 rounded-lg text-sm ${area === 'vip' ? 'bg-light-brown text-white' : 'bg-cream'}`}>{t('VIP Room')}</button>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="font-bold">{t('Nama')}</label>
                                        <input type="text" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 w-full p-2 border rounded-md" />
                                    </div>
                                    <div>
                                        <label htmlFor="whatsapp" className="font-bold">{t('Nomor WhatsApp')}</label>
                                        <div className="flex mt-1">
                                            <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-cream">+62</span>
                                            <input 
                                                type="tel" 
                                                id="whatsapp" 
                                                placeholder="81234567890" 
                                                value={formData.whatsapp} 
                                                onChange={handleInputChange} 
                                                required 
                                                className="w-full p-2 border rounded-r-md" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                     <div><label htmlFor="date" className="font-bold">{t('Tanggal')}</label><input type="date" id="date" value={formData.date} onChange={handleInputChange} required className="mt-1 w-full p-2 border rounded-md" /></div>
                                     <div><label htmlFor="time" className="font-bold">{t('Jam')}</label><input type="time" id="time" value={formData.time} onChange={handleInputChange} required className="mt-1 w-full p-2 border rounded-md" /></div>
                                     <div><label htmlFor="people" className="font-bold">{t('Jumlah Orang')}</label><input type="number" id="people" min="1" value={formData.people} onChange={handleInputChange} required className="mt-1 w-full p-2 border rounded-md" /></div>
                                </div>
                                
                                {bookingType === 'event' && (
                                    <div>
                                        <label htmlFor="eventDetails" className="font-bold">{t('Detail Acara')}</label>
                                        <textarea id="eventDetails" name="eventDetails" rows="3" value={formData.eventDetails} onChange={handleInputChange} placeholder="Contoh: Acara ulang tahun, butuh area outdoor dan indoor, dll." className="mt-1 w-full p-2 border rounded-md"></textarea>
                                    </div>
                                )}
                                
                                <div className="pt-4 border-t">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    />
                                </div>
                                
                                <p className="text-xs text-charcoal/70 pt-4 border-t">{t('*Tim kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi ketersediaan dan detail lebih lanjut.')}</p>
                                
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-wood-brown hover:bg-light-brown text-white font-bold py-3 px-6 rounded-full flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                    <span>{isSubmitting ? t('Mengirim...') : t('Kirim Reservasi')}</span>
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;