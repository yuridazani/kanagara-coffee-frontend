// src/pages/PilihMenuPage.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Plus, Minus, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const PilihMenuPage = () => {
    const { t } = useTranslation();
    const { reservationNumber } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMenus, setSelectedMenus] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const menuResponse = await axiosClient.get('/menus');
                setMenuItems(menuResponse.data.data);
                const resResponse = await axiosClient.post('/reservations/search', {
                    reservationNumber: reservationNumber,
                });
                setReservation(resResponse.data.data);
            } catch (error) {
                toast.error("Gagal memuat data. Reservasi mungkin tidak ditemukan.");
                console.error("Fetch data error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [reservationNumber]);

    const menuCategories = ["All", ...new Set(menuItems.map(item => item.category))];
    
    const filteredMenu = activeCategory === "All"
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    const handleQuantityChange = (item, amount) => {
        const currentQuantity = selectedMenus[item.id]?.quantity || 0;
        const newQuantity = Math.max(0, currentQuantity + amount);
        const newSelection = { ...selectedMenus };
        if (newQuantity === 0) {
            delete newSelection[item.id];
        } else {
            newSelection[item.id] = { 
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: newQuantity 
            };
        }
        setSelectedMenus(newSelection);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(selectedMenus).length === 0) {
            toast.error("Anda belum memilih menu apapun.");
            return;
        }
        if (!reservation) {
            toast.error("Data reservasi tidak ditemukan, tidak bisa menyimpan menu.");
            return;
        }
        const payload = {
            selectedMenus: Object.values(selectedMenus)
        };
        const toastId = toast.loading("Menyimpan pilihan menu...");
        try {
            await axiosClient.post(`/reservations/${reservation.id}/select-menus`, payload);
            toast.success("Pilihan menu berhasil disimpan!", { id: toastId });
            setIsSubmitted(true);
        } catch (error) {
            toast.error("Gagal menyimpan pilihan menu.", { id: toastId });
            console.error("Submit error:", error);
        }
    };

    if (loading) return <div className="text-center p-20">{t('Memuat menu...')}</div>;
    
    if (isSubmitted) {
        return (
            <div>
                <Header />
                <main className="pt-24 min-h-screen flex items-center justify-center">
                    <div className="text-center bg-soft-white p-10 rounded-lg shadow-lg">
                        <CheckCircle size={60} className="text-leaf-green mx-auto mb-4" />
                        <h1 className="font-serif font-bold text-3xl text-wood-brown">{t('Pilihan Menu Terkirim!')}</h1>
                        <p className="mt-2 text-charcoal/80">{t('Terima kasih, pilihan menu Anda telah kami catat.')}</p>
                        <Link to="/tracking" className="mt-6 inline-block bg-wood-brown text-white font-bold py-3 px-6 rounded-full">{t('Kembali ke Halaman Lacak')}</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <main className="pt-24 min-h-screen">
                <section className="py-20 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="font-serif font-black text-4xl md:text-6xl text-wood-brown">{t('Pilih Menu Anda')}</h1>
                            <p className="mt-4 text-charcoal/80">{t('Untuk Reservasi No:')} <span className="font-mono font-bold">{reservationNumber}</span></p>
                        </div>
                        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                            {menuCategories.map(category => (
                                <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${activeCategory === category ? 'bg-wood-brown text-soft-white' : 'bg-cream text-wood-brown border'}`}>
                                    {category}
                                </button>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredMenu.map(item => (
                                    <div key={item.id} className="bg-soft-white rounded-lg shadow-lg p-4 flex flex-col">
                                        <h3 className="font-serif font-bold text-xl text-charcoal">{item.name}</h3>
                                        <p className="text-sm text-charcoal/60">{item.price}</p>
                                        <div className="mt-auto pt-4 flex items-center justify-end">
                                            <button type="button" onClick={() => handleQuantityChange(item, -1)} className="p-2 border rounded-full hover:bg-cream"><Minus size={16} /></button>
                                            <span className="px-4 font-bold text-lg w-12 text-center">{selectedMenus[item.id]?.quantity || 0}</span>
                                            <button type="button" onClick={() => handleQuantityChange(item, 1)} className="p-2 border rounded-full hover:bg-cream"><Plus size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-16">
                                <button type="submit" className="bg-leaf-green text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-opacity-90 transition-colors">{t('Kirim Pilihan Menu')}</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default PilihMenuPage;