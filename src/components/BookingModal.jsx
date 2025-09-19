import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedReservation, setSubmittedReservation] = useState(null);
    const [bookingType, setBookingType] = useState('meja');
    const [area, setArea] = useState('indoor');
    const [formData, setFormData] = useState({
        name: '', whatsapp: '', date: '', time: '', people: 1, eventDetails: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        toast.loading(t('Mengirim reservasi...'));

        // Simulasi pengiriman data
        setTimeout(() => {
            const dummyReservationNumber = `KNG-${Date.now().toString().slice(-5)}`;
            setSubmittedReservation({ reservationNumber: dummyReservationNumber });
            setIsSubmitted(true);
            setIsSubmitting(false);
            toast.success(t('Reservasi Anda berhasil terkirim!'));
        }, 1500);
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setSubmittedReservation(null);
        setFormData({ name: '', whatsapp: '', date: '', time: '', people: 1, eventDetails: '' });
        setBookingType('meja');
        setArea('indoor');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4" onClick={resetForm}>
            <div className="bg-soft-white p-8 rounded-lg shadow-xl w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
                <button onClick={resetForm} className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal"><X /></button>
                <div className="transition-all duration-300">
                    {isSubmitted ? (
                        <div className="text-center p-8">
                            <CheckCircle className="mx-auto text-leaf-green" size={60} />
                            <h2 className="mt-6 font-serif font-bold text-2xl text-charcoal">{t('Reservasi Terkirim!')}</h2>
                            <p className="mt-2 text-charcoal/80">{t('Terima kasih! Nomor reservasi Anda adalah:')}</p>
                            <p className="mt-2 font-bold text-lg bg-cream px-4 py-2 rounded-lg inline-block">{submittedReservation?.reservationNumber}</p>
                            <p className="mt-4 text-sm text-charcoal/70">{t('Gunakan nomor ini untuk melacak status atau jika Anda perlu menghubungi kami.')}</p>
                            <button onClick={resetForm} className="mt-6 bg-wood-brown text-white font-bold py-2 px-6 rounded-full">{t('Tutup')}</button>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-serif font-bold text-3xl text-charcoal mb-6">{t('Buat Reservasi')}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Tipe Reservasi */}
                                <div>
                                    <label className="font-semibold text-charcoal/80">{t('Tipe Reservasi')}</label>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        <button 
                                            type="button" 
                                            onClick={() => setBookingType('meja')} 
                                            className={`p-3 rounded-lg font-semibold transition-colors ${bookingType === 'meja' ? 'bg-wood-brown text-white' : 'bg-cream text-charcoal hover:bg-wood-brown/20'}`}
                                        >
                                            {t('Booking Meja')}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setBookingType('event')} 
                                            className={`p-3 rounded-lg font-semibold transition-colors ${bookingType === 'event' ? 'bg-wood-brown text-white' : 'bg-cream text-charcoal hover:bg-wood-brown/20'}`}
                                        >
                                            {t('Booking Event')}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Area Selection - hanya tampil untuk booking meja */}
                                {bookingType === 'meja' && (
                                    <div>
                                        <label className="font-semibold text-charcoal/80">{t('Pilih Area')}</label>
                                        <div className="grid grid-cols-3 gap-3 mt-2">
                                            <button 
                                                type="button" 
                                                onClick={() => setArea('indoor')} 
                                                className={`p-2 rounded-lg text-sm font-medium transition-colors ${area === 'indoor' ? 'bg-light-brown text-white' : 'bg-cream text-charcoal hover:bg-light-brown/20'}`}
                                            >
                                                {t('Indoor')}
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setArea('outdoor')} 
                                                className={`p-2 rounded-lg text-sm font-medium transition-colors ${area === 'outdoor' ? 'bg-light-brown text-white' : 'bg-cream text-charcoal hover:bg-light-brown/20'}`}
                                            >
                                                {t('Outdoor')}
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setArea('vip')} 
                                                className={`p-2 rounded-lg text-sm font-medium transition-colors ${area === 'vip' ? 'bg-light-brown text-white' : 'bg-cream text-charcoal hover:bg-light-brown/20'}`}
                                            >
                                                {t('VIP Room')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="name" className="font-semibold text-charcoal/80">{t('Nama Lengkap')}</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full p-2 border-b-2 border-cream bg-transparent focus:outline-none focus:border-wood-brown" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="whatsapp" className="font-semibold text-charcoal/80">{t('Nomor WhatsApp (Aktif)')}</label>
                                    <input 
                                        type="tel" 
                                        id="whatsapp" 
                                        value={formData.whatsapp} 
                                        onChange={handleInputChange} 
                                        required 
                                        placeholder="Contoh: 081234567890" 
                                        className="w-full p-2 border-b-2 border-cream bg-transparent focus:outline-none focus:border-wood-brown" 
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="font-semibold text-charcoal/80">{t('Tanggal')}</label>
                                        <input 
                                            type="date" 
                                            id="date" 
                                            value={formData.date} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="w-full p-2 border-b-2 border-cream bg-transparent focus:outline-none focus:border-wood-brown" 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="time" className="font-semibold text-charcoal/80">{t('Jam')}</label>
                                        <input 
                                            type="time" 
                                            id="time" 
                                            value={formData.time} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="w-full p-2 border-b-2 border-cream bg-transparent focus:outline-none focus:border-wood-brown" 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="people" className="font-semibold text-charcoal/80">{t('Jumlah Orang')}</label>
                                    <select 
                                        id="people" 
                                        value={formData.people} 
                                        onChange={handleInputChange} 
                                        className="w-full p-2 border-b-2 border-cream bg-transparent focus:outline-none focus:border-wood-brown"
                                    >
                                        {[...Array(20)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1} orang</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Detail Acara - wajib untuk event, opsional untuk meja */}
                                <div>
                                    <label htmlFor="eventDetails" className="font-semibold text-charcoal/80">
                                        {bookingType === 'event' ? t('Detail Acara') : t('Detail Acara (Opsional)')}
                                    </label>
                                    <textarea 
                                        id="eventDetails" 
                                        value={formData.eventDetails} 
                                        onChange={handleInputChange} 
                                        placeholder={bookingType === 'event' ? "Contoh: Acara ulang tahun, butuh area outdoor dan indoor, dll." : "Ceritakan acara atau kebutuhan khusus Anda..."} 
                                        rows="3" 
                                        className="w-full p-2 border-b-2 border-cream bg-transparent focus:outline-none focus:border-wood-brown resize-none"
                                        required={bookingType === 'event'}
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
