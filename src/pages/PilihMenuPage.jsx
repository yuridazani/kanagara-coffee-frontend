// src/pages/PilihMenuPage.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Plus, Minus, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { menuData } from '../data/menuData';        // ✅ dummy menu statis
import { dummyReservations } from '../data/adminData'; // ✅ dummy reservasi
import toast from 'react-hot-toast';

const PilihMenuPage = () => {
    const { t } = useTranslation();
    const { reservationNumber } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(false); // langsung false
    const [selectedMenus, setSelectedMenus] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        // Langsung pakai data dummy
        setMenuItems(menuData);

        // Cari reservasi dummy
        const foundReservation = dummyReservations.find(
            (r) => r.reservationNumber === reservationNumber
        );

        if (foundReservation) {
            setReservation(foundReservation);
        } else {
            // fallback demo mode
            setReservation({
                reservationNumber,
                name: 'Tamu Event',
                status: 'DP Dibayar',
            });
            toast.success("Mode Demo: Menampilkan data reservasi dummy.");
        }
    }, [reservationNumber]);

    const handleQuantityChange = (item, delta) => {
        const currentQty = selectedMenus[item.id]?.quantity || 0;
        const newQty = Math.max(0, currentQty + delta);

        if (newQty > 0) {
            setSelectedMenus((prev) => ({
                ...prev,
                [item.id]: {
                    menu_id: item.id,
                    menu_name: item.name,
                    price: item.price,
                    quantity: newQty,
                },
            }));
        } else {
            const newSelection = { ...selectedMenus };
            delete newSelection[item.id];
            setSelectedMenus(newSelection);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(selectedMenus).length === 0) {
            toast.error("Anda belum memilih menu apapun.");
            return;
        }

        toast.loading(t('Mengirim pilihan menu...'), { duration: 1000 });

        // Simulasi pengiriman
        setTimeout(() => {
            console.log("Data yang dikirim (simulasi):", {
                reservationNumber,
                selectedMenus: Object.values(selectedMenus),
            });
            setIsSubmitted(true);
            toast.success(t('Pilihan menu berhasil dikirim!'));
        }, 1000);
    };

    const categories = ["All", ...new Set(menuItems.map((item) => item.category))];
    const filteredItems =
        activeCategory === "All"
            ? menuItems
            : menuItems.filter((item) => item.category === activeCategory);

    if (loading) return <div className="text-center p-20">{t('Memuat menu...')}</div>;

    if (isSubmitted) {
        return (
            <div>
                <Header />
                <main className="pt-24 min-h-screen flex items-center justify-center">
                    <div className="text-center bg-soft-white p-10 rounded-lg shadow-lg">
                        <CheckCircle size={60} className="text-leaf-green mx-auto mb-4" />
                        <h1 className="font-serif font-bold text-3xl text-wood-brown">
                            {t('Pilihan Menu Terkirim!')}
                        </h1>
                        <p className="mt-2 text-charcoal/80">
                            {t('Terima kasih, pilihan menu Anda telah kami catat.')}
                        </p>
                        <Link
                            to="/tracking"
                            className="mt-6 inline-block bg-wood-brown text-white font-bold py-3 px-6 rounded-full"
                        >
                            {t('Kembali ke Halaman Lacak')}
                        </Link>
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
                            <h1 className="font-serif font-black text-4xl md:text-6xl text-wood-brown">
                                {t('Pilih Menu Anda')}
                            </h1>
                            <p className="mt-4 text-charcoal/80">
                                {t('Untuk Reservasi No:')}{' '}
                                <span className="font-mono font-bold">{reservationNumber}</span>
                            </p>
                        </div>

                        {/* kategori filter */}
                        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${
                                        activeCategory === category
                                            ? 'bg-wood-brown text-soft-white'
                                            : 'bg-cream text-wood-brown border'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* daftar menu */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-soft-white rounded-lg shadow-lg p-4 flex flex-col"
                                    >
                                        <h3 className="font-serif font-bold text-xl text-charcoal">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-charcoal/60">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            }).format(item.price)}
                                        </p>
                                        <div className="mt-auto pt-4 flex items-center justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(item, -1)}
                                                className="p-2 border rounded-full hover:bg-cream"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="px-4 font-bold text-lg w-12 text-center">
                                                {selectedMenus[item.id]?.quantity || 0}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(item, 1)}
                                                className="p-2 border rounded-full hover:bg-cream"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* submit */}
                            <div className="text-center mt-16">
                                <button
                                    type="submit"
                                    className="bg-leaf-green text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-opacity-90 transition-colors"
                                >
                                    {t('Kirim Pilihan Menu')}
                                </button>
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
