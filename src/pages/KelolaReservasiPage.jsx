// src/pages/KelolaReservasiPage.jsx

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Calendar, Clipboard } from 'lucide-react';
import toast from 'react-hot-toast';
import { dummyReservations } from '../data/adminData';

// ===============================================
// ## MODAL RESCHEDULE
// ===============================================
const RescheduleModal = ({ reservation, onClose, onSave, t }) => {
    const [formData, setFormData] = useState({
        date: reservation?.date || '',
        time: reservation?.time || '',
        people: reservation?.people || 1
    });
    const [reason, setReason] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        onSave(reservation.id, formData, reason);
        onClose();
    };

    if (!reservation) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-soft-white rounded-lg shadow-2xl w-full max-w-md relative" 
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal">
                    <X />
                </button>
                <div className="p-6">
                    <h2 className="font-serif font-black text-2xl text-wood-brown mb-4">{t('Reschedule Reservasi')}</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="date" className="font-bold text-sm">{t('Tanggal Baru')}</label>
                            <input 
                                type="date" 
                                id="date" 
                                value={formData.date}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="font-bold text-sm">{t('Jam Baru')}</label>
                            <input 
                                type="time" 
                                id="time" 
                                value={formData.time}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="people" className="font-bold text-sm">{t('Jumlah Orang')}</label>
                            <input 
                                type="number" 
                                id="people" 
                                min="1"
                                value={formData.people}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="reason" className="font-bold text-sm">{t('Alasan Reschedule (Opsional)')}</label>
                            <textarea 
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows="3"
                                placeholder="Contoh: Tidak tersedia di tanggal tersebut, permintaan customer, dll."
                                className="mt-1 w-full p-2 border rounded-lg text-sm"
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                        <button 
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >{t('Batal')}</button>
                        <button 
                            onClick={handleSave}
                            className="flex-1 px-4 py-2 bg-wood-brown text-white rounded-lg hover:bg-light-brown flex items-center justify-center gap-2"
                        >
                            <Calendar size={16} />{t('Simpan')}</button>
                    </div>
                    
                    <p className="text-xs text-charcoal/60 mt-4 text-center">{t('*Customer akan mendapat notifikasi perubahan jadwal otomatis di halaman tracking')}</p>
                </div>
            </div>
        </div>
    );
};

// ===============================================
// ## MODAL DETAIL
// ===============================================
const DetailModal = ({ reservation, onClose, t }) => {
    if (!reservation) return null;

    const copyDetailsToClipboard = () => {
        let details = `📋 DETAIL RESERVASI 📋\n\n`;
        details += `No: ${reservation.reservationNumber}\n`;
        details += `Nama: ${reservation.name}\n`;
        details += `Tanggal: ${reservation.date} @ ${reservation.time}\n`;
        details += `Jumlah: ${reservation.people} orang\n`;
        details += `Status: ${reservation.status}\n`;
        navigator.clipboard.writeText(details);
        toast.success("Detail disalin ke clipboard!");
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-soft-white rounded-lg shadow-2xl w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal"><X /></button>
                <div className="p-8">
                    <h2 className="font-serif font-black text-3xl text-wood-brown mb-6">{t('Detail Reservasi')}</h2>
                    <p><strong>{t('Nama')}:</strong> {reservation.name}</p>
                    <p><strong>{t('Nomor Reservasi')}:</strong> {reservation.reservationNumber}</p>
                    <p><strong>{t('Tanggal')}:</strong> {reservation.date} @ {reservation.time}</p>
                    <p><strong>{t('Jumlah Orang')}:</strong> {reservation.people}</p>
                    <p><strong>{t('Status')}:</strong> {reservation.status}</p>
                    <button onClick={copyDetailsToClipboard} className="mt-6 bg-gray-200 text-charcoal px-4 py-2 rounded-lg flex items-center text-sm hover:bg-gray-300">
                        <Clipboard size={16} className="mr-2"/>{t('Salin Detail')}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ===============================================
// ## KOMPONEN UTAMA KELOLA RESERVASI
// ===============================================
const KelolaReservasiPage = () => {
    const { t } = useTranslation();

    const [reservations, setReservations] = useState(dummyReservations);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'descending' });
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [rescheduleModal, setRescheduleModal] = useState({ show: false, reservation: null });
    const itemsPerPage = 10;

    const updateStatus = (id, newStatus) => {
        setReservations(prev =>
            prev.map(res => (res.id === id ? { ...res, status: newStatus } : res))
        );
        toast.success(`Status reservasi diubah menjadi ${newStatus}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Anda yakin ingin menghapus reservasi ini?')) {
            setReservations(prev => prev.filter(res => res.id !== id));
            toast.success('Reservasi berhasil dihapus.');
        }
    };

    const handleReschedule = (id, newData, reason) => {
        setReservations(prev =>
            prev.map(res =>
                res.id === id
                    ? {
                        ...res,
                        date: newData.date,
                        time: newData.time,
                        people: newData.people,
                        rescheduleHistory: [
                            ...(res.rescheduleHistory || []),
                            { oldDate: res.date, oldTime: res.time, newDate: newData.date, newTime: newData.time, reason }
                        ]
                    }
                    : res
            )
        );
        toast.success("Jadwal berhasil diubah!");
    };

    const openRescheduleModal = (reservation) => {
        setRescheduleModal({ show: true, reservation });
    };

    const closeRescheduleModal = () => {
        setRescheduleModal({ show: false, reservation: null });
    };

    const sortedAndFilteredItems = useMemo(() => {
        let items = [...reservations];
        if (filterStatus !== 'All') {
            items = items.filter(res => res.status === filterStatus);
        }
        if (searchTerm) {
            items = items.filter(res => {
                const nameMatch = res.name?.toLowerCase().includes(searchTerm.toLowerCase());
                const numberMatch = res.reservationNumber?.toLowerCase().includes(searchTerm.toLowerCase());
                return nameMatch || numberMatch;
            });
        }
        items.sort((a, b) => {
            if (sortConfig.key === 'id') {
                return sortConfig.direction === 'ascending' ? a.id - b.id : b.id - a.id;
            }
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
        return items;
    }, [reservations, searchTerm, filterStatus, sortConfig]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Dikonfirmasi': return 'bg-green-100 text-green-800';
            case 'DP Dibayar': return 'bg-blue-100 text-blue-800';
            case 'Menu Dipilih': return 'bg-indigo-100 text-indigo-800';
            case 'Ditolak': return 'bg-red-100 text-red-800';
            case 'Selesai': return 'bg-gray-100 text-gray-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <>
            <DetailModal reservation={selectedReservation} onClose={() => setSelectedReservation(null)} t={t} />
            {rescheduleModal.show && (
                <RescheduleModal 
                    reservation={rescheduleModal.reservation}
                    onClose={closeRescheduleModal}
                    onSave={handleReschedule}
                    t={t}
                />
            )}
            <div className="bg-soft-white p-8 rounded-xl shadow-lg space-y-6">
                <h1 className="font-serif font-black text-3xl text-wood-brown">{t('Kelola Reservasi')}</h1>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input 
                        type="text" 
                        placeholder="Cari berdasarkan nama atau nomor reservasi..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:max-w-sm p-2 border rounded-lg"
                    />
                    <select onChange={(e) => setFilterStatus(e.target.value)} className="w-full md:max-w-xs p-2 border rounded-lg bg-white">
                        <option value="All">{t('Semua Status')}</option>
                        <option value="Menunggu Konfirmasi">{t('Menunggu Konfirmasi')}</option>
                        <option value="Dikonfirmasi">{t('Dikonfirmasi')}</option>
                        <option value="DP Dibayar">{t('DP Dibayar')}</option>
                        <option value="Menu Dipilih">{t('Menu Dipilih')}</option>
                        <option value="Selesai">{t('Selesai')}</option>
                        <option value="Ditolak">{t('Ditolak')}</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4">{t('No. Reservasi')}</th>
                                <th className="p-4">{t('Nama')}</th>
                                <th className="p-4">{t('Tanggal')}</th>
                                <th className="p-4">{t('Status')}</th>
                                <th className="p-4">{t('Aksi')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredItems.map(res => (
                                <tr key={res.id} className="border-b hover:bg-cream">
                                    <td className="p-4 font-mono text-sm">{res.reservationNumber}</td>
                                    <td className="p-4 font-bold">{res.name}</td>
                                    <td className="p-4 text-sm">{res.date} @ {res.time}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusClass(res.status)}`}>
                                            {res.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => setSelectedReservation(res)} className="px-3 py-1 bg-gray-200 rounded-lg text-sm">Detail</button>
                                        <button onClick={() => openRescheduleModal(res)} className="px-3 py-1 bg-blue-200 rounded-lg text-sm">Reschedule</button>
                                        <button onClick={() => updateStatus(res.id, 'Dikonfirmasi')} className="px-3 py-1 bg-green-200 rounded-lg text-sm">Konfirmasi</button>
                                        <button onClick={() => handleDelete(res.id)} className="px-3 py-1 bg-red-200 rounded-lg text-sm">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default KelolaReservasiPage;
