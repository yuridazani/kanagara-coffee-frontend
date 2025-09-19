// src/components/ProfileSection.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Instagram } from 'lucide-react';

const ProfileSection = () => {
    const {
        t,
    } = useTranslation();

    return (
        <section id="profile" className="py-20 px-4 bg-soft-white">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Kolom Kiri: Google Maps & Info */}
                    <div data-aos="fade-right">
                        <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.398693557523!2d112.7231998748834!3d-7.420864392589053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e345f5a2a90d%3A0x7d277f3a9e099516!2sKANAGARA%20coffee%20%26%20space!5e0!3m2!1sen!2sid!4v1693623456789!5m2!1sen!2sid" 
                                width="100%" 
                                height="400" 
                                style={{ border:0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-start mb-4">
                                <MapPin size={24} className="text-wood-brown mr-4 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-charcoal">{t('Lokasi')}</h3>
                                    <p className="text-charcoal/80">{t(
                                        'Jl. Raya Pd. Jati No.1, Pagerwojo, Kec. Buduran, Kabupaten Sidoarjo, Jawa Timur 61252',
                                    )}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Clock size={24} className="text-wood-brown mr-4 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-charcoal">{t('Jam Buka')}</h3>
                                    <p className="text-charcoal/80">{t('Setiap Hari: 10:00 - 23:00 WIB')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Cerita Kafe */}
                    <div data-aos="fade-left">
                        <h2 className="font-serif font-black text-4xl text-wood-brown">{t('Temukan Ketenangan di Setiap Sudut')}</h2>
                        <p className="mt-4 text-charcoal/80 leading-relaxed">{t(
                            'Kanagara Coffee & Space menghadirkan suasana nyaman yang unik, menggabungkan elemen tradisional Jawa dengan sentuhan modern. Bangunan Joglo kami yang didominasi material kayu menciptakan kesan hangat dan natural, menjadikannya tempat yang sempurna untuk bersantai, bekerja, atau berkumpul bersama orang terkasih.',
                        )}</p>
                        <a 
                            href="https://www.instagram.com/kanagara.coffee/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center bg-wood-brown text-soft-white font-bold py-3 px-6 rounded-full hover:bg-light-brown transition-colors"
                        >
                            <Instagram size={20} className="mr-2" />{t('Ikuti Kami di Instagram')}</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;