// frontend/src/pages/KelolaWebsitePage.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';
import { useWebsiteContent } from '../context/WebsiteContext';
import { X, PlusCircle, Image, Save, Loader, Trash2 } from 'lucide-react';

const KelolaWebsitePage = () => {
    // Panggil hook di sini, satu kali di level teratas
    const { t } = useTranslation();
    const { settings, gallery, facilities, hero_images, loading, refreshContent } = useWebsiteContent();

    const [formData, setFormData] = useState({
        hero_tagline: '',
        about_text: '',
        gmaps_url: ''
    });
    const [heroImageFile, setHeroImageFile] = useState(null);
    const [aboutImageFile, setAboutImageFile] = useState(null);
    const [newGalleryFile, setNewGalleryFile] = useState(null);
    const [newGalleryAlt, setNewGalleryAlt] = useState('');
    const [newFacilityName, setNewFacilityName] = useState('');

    // Update form data ketika settings berubah
    useEffect(() => {
        if (!loading && settings) {
            console.log('Settings loaded:', settings); // Debug log
            setFormData({
                hero_tagline: settings.hero_tagline || '',
                about_text: settings.about_text || '',
                gmaps_url: settings.gmaps_url || ''
            });
        }
    }, [loading, settings]);

    const handleTextChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Settings (Hero Tagline, About, Maps) ---
    const handleSaveSettings = async () => {
        const data = new FormData();

        // Append text data - bahkan yang kosong
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key] || '');
        });

        // Append image if selected
        if (aboutImageFile) {
            data.append('about_image_path', aboutImageFile);
        }

        const toastId = toast.loading("Menyimpan pengaturan...");
        try {
            const response = await axiosClient.post('/content/settings', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.success) {
                toast.success(response.data.message || "Pengaturan berhasil disimpan!", { id: toastId });
                setAboutImageFile(null);
                // Reset file input
                document.querySelector('input[type="file"][name="about_image"]').value = '';
                refreshContent(); // Refresh data dari context
            } else {
                toast.error(response.data.message || "Gagal menyimpan pengaturan.", { id: toastId });
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            const errorMessage = error.response?.data?.message || error.message || "Gagal menyimpan pengaturan.";
            toast.error(errorMessage, { id: toastId });
        }
    };

    // --- Hero Images ---
    const handleSaveHero = async () => {
        if (!heroImageFile) return toast.error("Pilih gambar hero terlebih dahulu.");

        // Cek apakah sudah ada 5 gambar hero
        if (hero_images && hero_images.length >= 5) {
            return toast.error("Maksimal 5 gambar hero. Hapus salah satu terlebih dahulu.");
        }

        const data = new FormData();
        data.append('image', heroImageFile);
        const toastId = toast.loading("Menyimpan Hero...");
        try {
            const response = await axiosClient.post('/hero-images', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Hero berhasil ditambahkan!", { id: toastId });
            setHeroImageFile(null);
            // Reset file input
            document.querySelector('input[type="file"][name="hero_image"]').value = '';
            refreshContent();
        } catch (error) {
            console.error('Error saving hero:', error);
            const errorMessage = error.response?.data?.message || "Gagal menambah hero.";
            toast.error(errorMessage, { id: toastId });
        }
    };

    const handleDeleteHero = async (id) => {
        if (!window.confirm("Yakin hapus gambar hero?")) return;
        const toastId = toast.loading("Menghapus Hero...");
        try {
            await axiosClient.delete(`/hero-images/${id}`);
            toast.success("Hero dihapus.", { id: toastId });
            refreshContent();
        } catch (error) {
            console.error('Error deleting hero:', error);
            toast.error("Gagal menghapus hero.", { id: toastId });
        }
    };

    // --- Galeri ---
    const handleAddGalleryImage = async () => {
        if (!newGalleryFile) return toast.error("Pilih file gambar.");
        const data = new FormData();
        data.append('image', newGalleryFile);
        data.append('alt_text', newGalleryAlt || 'Galeri Kanagara Coffee');
        const toastId = toast.loading("Menambahkan ke galeri...");
        try {
            const response = await axiosClient.post('/gallery', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Galeri berhasil ditambahkan!", { id: toastId });
            setNewGalleryFile(null);
            setNewGalleryAlt('');
            // Reset file inputs
            document.querySelector('input[type="file"][name="gallery_image"]').value = '';
            refreshContent();
        } catch (error) {
            console.error('Error adding gallery:', error);
            const errorMessage = error.response?.data?.message || "Gagal menambah galeri.";
            toast.error(errorMessage, { id: toastId });
        }
    };

    const handleDeleteGalleryImage = async (id) => {
        if (!window.confirm("Yakin hapus gambar galeri?")) return;
        const toastId = toast.loading("Menghapus gambar...");
        try {
            await axiosClient.delete(`/gallery/${id}`);
            toast.success("Gambar dihapus.", { id: toastId });
            refreshContent();
        } catch (error) {
            console.error('Error deleting gallery:', error);
            toast.error("Gagal menghapus gambar.", { id: toastId });
        }
    };

    // --- Fasilitas ---
    const handleAddFacility = async () => {
        if (!newFacilityName.trim()) return toast.error("Nama fasilitas kosong.");
        const toastId = toast.loading("Menambah fasilitas...");
        try {
            await axiosClient.post('/facilities', { name: newFacilityName.trim() });
            toast.success("Fasilitas berhasil ditambah!", { id: toastId });
            setNewFacilityName('');
            refreshContent();
        } catch (error) {
            console.error('Error adding facility:', error);
            const errorMessage = error.response?.data?.message || "Gagal menambah fasilitas.";
            toast.error(errorMessage, { id: toastId });
        }
    };

    const handleToggleFacility = async (facility) => {
        const toastId = toast.loading("Mengubah status fasilitas...");
        try {
            await axiosClient.put(`/facilities/${facility.id}`, { is_active: !facility.is_active });
            toast.success("Status fasilitas diubah.", { id: toastId });
            refreshContent();
        } catch (error) {
            console.error('Error toggling facility:', error);
            toast.error("Gagal mengubah status fasilitas.", { id: toastId });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-wood-brown" size={40} />
            </div>
        );
    }

    return (
        <div className="bg-soft-white p-6 lg:p-8 rounded-xl shadow-lg space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="font-serif font-black text-3xl text-wood-brown">{t('Kelola Konten Website')}</h1>
                <button 
                    onClick={() => {
                        toast.loading("Memuat ulang data...");
                        refreshContent().then(() => {
                            toast.dismiss();
                            toast.success("Data berhasil dimuat ulang!");
                        });
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                    <Loader size={16} />{t('Muat Ulang Data')}</button>
            </div>
            {/* Settings Section - Hero Tagline, About, Maps */}
            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="font-bold text-xl px-2">{t('1. Pengaturan Umum')}</legend>
                
                {/* Hero Tagline */}
                <div>
                    <label className="font-bold block mb-2">{t('Hero Tagline')}</label>
                    <input 
                        name="hero_tagline" 
                        value={formData.hero_tagline} 
                        onChange={handleTextChange} 
                        placeholder="Masukkan tagline untuk hero section..."
                        className="w-full p-3 border rounded-md focus:outline-none focus:border-wood-brown"
                    />
                    <small className="text-gray-500">{t('Tagline yang akan muncul di hero section halaman utama')}</small>
                </div>

                {/* About Text */}
                <div>
                    <label className="font-bold block mb-2">{t('Teks Tentang Kami')}</label>
                    <textarea 
                        name="about_text" 
                        value={formData.about_text} 
                        onChange={handleTextChange} 
                        rows="5" 
                        placeholder="Masukkan deskripsi tentang Kanagara..."
                        className="w-full p-3 border rounded-md focus:outline-none focus:border-wood-brown"
                    />
                    <small className="text-gray-500">{t('Deskripsi yang akan muncul di section Tentang Kami')}</small>
                </div>

                {/* Google Maps URL */}
                <div>
                    <label className="font-bold block mb-2">{t('Google Maps Embed URL')}</label>
                    <input 
                        name="gmaps_url" 
                        value={formData.gmaps_url} 
                        onChange={handleTextChange} 
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        className="w-full p-3 border rounded-md focus:outline-none focus:border-wood-brown"
                    />
                    <small className="text-gray-500">{t('URL embed Google Maps (bukan URL biasa). Ambil dari Google Maps → Share → Embed')}</small>
                </div>

                {/* About Image */}
                <div>
                    <label className="font-bold block mb-2">{t('Gambar About (Opsional)')}</label>
                    {settings?.about_image_path && (
                        <div className="mb-2">
                            <img 
                                src={`http://localhost:8000/storage/${settings.about_image_path}`}
                                alt="Gambar About saat ini"
                                className="w-32 h-24 object-cover rounded-md"
                            />
                            <small className="text-gray-500 block">{t('Gambar saat ini')}</small>
                        </div>
                    )}
                    <div className="flex items-center gap-4">
                        <input 
                            type="file" 
                            name="about_image"
                            accept="image/*"
                            onChange={(e) => setAboutImageFile(e.target.files[0])} 
                            className="flex-1"
                        />
                        {aboutImageFile && (
                            <img 
                                src={URL.createObjectURL(aboutImageFile)} 
                                alt="Preview" 
                                className="w-16 h-16 object-cover rounded-md"
                            />
                        )}
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button 
                        onClick={handleSaveSettings}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition-colors"
                    >
                        <Save size={18} />{t('Simpan Pengaturan')}</button>
                </div>
            </fieldset>
            {/* Hero Images Section */}
            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="font-bold text-xl px-2">{t('2. Gambar Hero (Maksimal 5)')}</legend>
                <p className="text-sm text-gray-600 mb-4">{t('Gambar hero akan ditampilkan sebagai slider di halaman utama. Anda bisa menambahkan hingga 5 gambar.')}</p>
                
                <div className="flex items-center gap-4">
                    <input 
                        type="file" 
                        name="hero_image"
                        accept="image/*"
                        onChange={(e) => setHeroImageFile(e.target.files[0])} 
                        className="flex-1"
                    />
                    {heroImageFile && (
                        <img 
                            src={URL.createObjectURL(heroImageFile)} 
                            alt="Preview" 
                            className="w-16 h-16 object-cover rounded-md"
                        />
                    )}
                    <button 
                        onClick={handleSaveHero}
                        disabled={!heroImageFile || (hero_images && hero_images.length >= 5)}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-3 rounded-md transition-colors"
                        title={hero_images && hero_images.length >= 5 ? "Maksimal 5 gambar hero" : "Tambah gambar hero"}
                    >
                        <PlusCircle size={18} />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {hero_images?.map((img, index) => (
                        <div key={img.id} className="relative group">
                            <img 
                                src={`http://localhost:8000/storage/${img.path}`} 
                                alt={`Hero ${index + 1}`} 
                                className="w-full h-24 object-cover rounded-md"
                            />
                            <button 
                                onClick={() => handleDeleteHero(img.id)} 
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={12} />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                    
                    {/* Placeholder untuk slot kosong */}
                    {hero_images && Array.from({ length: 5 - hero_images.length }, (_, i) => (
                        <div key={`empty-${i}`} className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-xs">{t('Slot')} {hero_images.length + i + 1}</span>
                        </div>
                    ))}
                </div>
            </fieldset>
            {/* Fasilitas Section */}
            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="font-bold text-xl px-2">{t('3. Fasilitas')}</legend>
                <p className="text-sm text-gray-600 mb-4">{t('Centang fasilitas yang aktif untuk ditampilkan di website.')}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {facilities?.map(f => (
                        <label key={f.id} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                            <input 
                                type="checkbox" 
                                checked={f.is_active} 
                                onChange={() => handleToggleFacility(f)} 
                            />
                            <span className={f.is_active ? 'text-green-600' : 'text-gray-500'}>
                                {f.name}
                            </span>
                        </label>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input 
                        value={newFacilityName} 
                        onChange={(e) => setNewFacilityName(e.target.value)} 
                        placeholder="Nama fasilitas baru" 
                        className="flex-1 p-3 border rounded-md focus:outline-none focus:border-wood-brown"
                    />
                    <button 
                        onClick={handleAddFacility}
                        disabled={!newFacilityName.trim()}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-md transition-colors"
                    >
                        <PlusCircle size={18} />
                    </button>
                </div>
            </fieldset>
            {/* Galeri Section */}
            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="font-bold text-xl px-2">{t('4. Galeri Foto')}</legend>
                <div className="flex flex-col md:flex-row gap-2">
                    <input 
                        type="file" 
                        name="gallery_image"
                        accept="image/*"
                        onChange={(e) => setNewGalleryFile(e.target.files[0])} 
                        className="flex-1"
                    />
                    <input 
                        value={newGalleryAlt} 
                        onChange={(e) => setNewGalleryAlt(e.target.value)} 
                        placeholder="Alt text (deskripsi gambar)" 
                        className="flex-1 p-3 border rounded-md focus:outline-none focus:border-wood-brown"
                    />
                    <button 
                        onClick={handleAddGalleryImage}
                        disabled={!newGalleryFile}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-md transition-colors"
                    >
                        <PlusCircle size={18} />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {gallery?.map(img => (
                        <div key={img.id} className="relative group">
                            <img 
                                src={`http://localhost:8000/storage/${img.path}`} 
                                alt={img.alt_text} 
                                className="w-full h-24 object-cover rounded-md"
                            />
                            <button 
                                onClick={() => handleDeleteGalleryImage(img.id)} 
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
};

export default KelolaWebsitePage;