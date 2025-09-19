// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Clock } from 'lucide-react';
import { dummyDashboardStats } from '../data/adminData'; // <-- Import data dummy

// Komponen Kalender Widget Fungsional
const CalendarWidget = ({ reservations }) => {
    const { t } = useTranslation();
    const [today] = useState(new Date(2025, 8, 1)); // Set ke September 2025 untuk konsistensi
    const [hoveredInfo, setHoveredInfo] = useState(null);

    const month = today.toLocaleString('id-ID', { month: 'long' });
    const year = today.getFullYear();

    // Mapping reservasi berdasarkan tanggal
    const reservationsByDate = new Map();
    reservations.forEach(res => {
        const date = new Date(res.date).getDate();
        if (!reservationsByDate.has(date)) {
            reservationsByDate.set(date, []);
        }
        reservationsByDate.get(date).push(res);
    });

    const firstDayOfMonth = new Date(year, today.getMonth(), 1).getDay();
    const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

    const handleMouseEnter = (date) => {
        if (reservationsByDate.has(date)) {
            setHoveredInfo({
                date,
                reservations: reservationsByDate.get(date)
            });
        }
    };

    const handleMouseLeave = () => setHoveredInfo(null);

    return (
        <div className="relative flex gap-4">
            {/* Kalender */}
            <div className="bg-cream p-6 rounded-lg border border-wood-brown/20 w-full">
                <h3 className="font-bold text-charcoal text-center mb-4">{month} {year}</h3>
                <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
                    {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((day, i) => (
                        <div key={i} className="font-bold text-xs text-charcoal/60">{day}</div>
                    ))}

                    {/* Sel kosong sebelum tanggal 1 */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`}></div>
                    ))}

                    {/* Tanggal dalam sebulan */}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(date => (
                        <div
                            key={date}
                            className="relative p-2 cursor-pointer rounded-full transition-colors hover:bg-wood-brown/10"
                            onMouseEnter={() => handleMouseEnter(date)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {date}
                            {reservationsByDate.has(date) && (
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tooltip Reservasi */}
            {hoveredInfo && (
                <div className="absolute left-full ml-4 w-64 bg-white p-4 rounded-lg shadow-xl border z-10 animate-fade-in">
                    <h4 className="font-bold border-b pb-2 mb-2">
                        {t('Reservasi Tgl')} {hoveredInfo.date}
                    </h4>
                    <ul className="space-y-2">
                        {hoveredInfo.reservations.map(res => (
                            <li key={res.id} className="text-xs flex items-center">
                                <Clock size={12} className="mr-2 text-charcoal/70" />
                                <span><strong>{res.time}</strong> - {res.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const DashboardPage = () => {
    const { t } = useTranslation();
    const [stats] = useState(dummyDashboardStats); // <-- langsung pakai dummy
    const [loading] = useState(false); // <-- nggak ada loading lagi

    return (
        <div className="bg-soft-white p-8 rounded-xl shadow-lg space-y-12">
            <div>
                <h1 className="font-serif font-black text-3xl text-wood-brown mb-2">
                    {t('Dashboard Ringkasan')}
                </h1>
                <p className="text-charcoal/70">
                    {t('Selamat datang kembali, Owner! Berikut adalah ringkasan aktivitas hari ini.')}
                </p>
            </div>
            
            <section>
                <h2 className="font-bold text-xl text-charcoal mb-4">
                    {t('Statistik Kunci')}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-cream p-6 rounded-lg border border-wood-brown/20">
                        <h3 className="font-bold text-charcoal">{t('Reservasi Hari Ini')}</h3>
                        <p className="font-serif font-black text-4xl text-wood-brown mt-2">
                            {loading ? '...' : stats.reservationsToday}
                        </p>
                    </div>
                    
                    <div className="bg-cream p-6 rounded-lg border border-wood-brown/20">
                        <h3 className="font-bold text-charcoal">{t('Menu Terlaris')}</h3>
                        <p className="font-serif font-black text-2xl text-wood-brown mt-2">
                            {loading ? '...' : stats.bestSellerMenu}
                        </p>
                    </div>
                    
                    <div className="bg-cream p-6 rounded-lg border border-wood-brown/20">
                        <h3 className="font-bold text-charcoal">{t('Rating Rata-Rata')}</h3>
                        <p className="font-serif font-black text-4xl text-wood-brown mt-2">
                            {loading ? '...' : stats.averageRating} 
                            <span className="text-2xl text-yellow-500">★</span>
                        </p>
                    </div>
                </div>
            </section>
            
            <section className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="font-bold text-xl text-charcoal mb-4">{t('Kalender Reservasi')}</h2>
                    <CalendarWidget reservations={stats.reservations} />
                </div>
                
                <div>
                    <h2 className="font-bold text-xl text-charcoal mb-4">{t('Grafik Reservasi (Mingguan)')}</h2>
                    <div className="bg-cream p-6 rounded-lg border border-wood-brown/20 h-64 flex flex-col justify-center items-center">
                        <BarChart size={100} className="text-charcoal/20"/>
                        <p className="text-center text-charcoal/60 italic mt-4">
                            {t('(Visualisasi grafik akan ditampilkan di sini)')}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
