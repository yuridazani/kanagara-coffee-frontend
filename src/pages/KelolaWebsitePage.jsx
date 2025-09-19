// frontend/src/pages/KelolaWebsitePage.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { X, PlusCircle, Image, Save, Loader, Trash2 } from 'lucide-react';

const KelolaWebsitePage = () => {
  const { t } = useTranslation();

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
  const [loading, setLoading] = useState(false);

  // --- efek awal: tampilkan notifikasi demo ---
  useEffect(() => {
    toast.success('Mode Demo: Data dummy ditampilkan.');
  }, []);

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Simulasi simpan Settings ---
  const handleSaveSettings = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Pengaturan berhasil disimpan (Simulasi)!');
      setAboutImageFile(null);
    }, 1000);
  };

  // --- Simulasi Hero Images ---
  const handleSaveHero = () => {
    if (!heroImageFile) return toast.error('Pilih gambar hero terlebih dahulu.');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Hero berhasil ditambahkan (Simulasi)!');
      setHeroImageFile(null);
    }, 1000);
  };

  const handleDeleteHero = (id) => {
    if (!window.confirm('Yakin hapus gambar hero?')) return;
    toast.success(`Hero ${id} dihapus (Simulasi).`);
  };

  // --- Simulasi Galeri ---
  const handleAddGalleryImage = () => {
    if (!newGalleryFile) return toast.error('Pilih file gambar.');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Galeri berhasil ditambahkan (Simulasi)!');
      setNewGalleryFile(null);
      setNewGalleryAlt('');
    }, 1000);
  };

  const handleDeleteGalleryImage = (id) => {
    if (!window.confirm('Yakin hapus gambar galeri?')) return;
    toast.success(`Gambar galeri ${id} dihapus (Simulasi).`);
  };

  // --- Simulasi Fasilitas ---
  const handleAddFacility = () => {
    if (!newFacilityName.trim()) return toast.error('Nama fasilitas kosong.');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Fasilitas berhasil ditambahkan (Simulasi)!');
      setNewFacilityName('');
    }, 1000);
  };

  const handleToggleFacility = (facility) => {
    toast.success(`Fasilitas "${facility}" status diubah (Simulasi).`);
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
      <h1 className="font-serif font-black text-3xl text-wood-brown">
        {t('Kelola Konten Website (Demo)')}
      </h1>

      {/* Settings Section */}
      <fieldset className="border p-4 rounded-lg space-y-4">
        <legend className="font-bold text-xl px-2">{t('1. Pengaturan Umum')}</legend>

        {/* Hero Tagline */}
        <div>
          <label className="font-bold block mb-2">{t('Hero Tagline')}</label>
          <input
            name="hero_tagline"
            value={formData.hero_tagline}
            onChange={handleTextChange}
            className="w-full p-3 border rounded-md"
            placeholder="Masukkan tagline..."
          />
        </div>

        {/* About Text */}
        <div>
          <label className="font-bold block mb-2">{t('Teks Tentang Kami')}</label>
          <textarea
            name="about_text"
            value={formData.about_text}
            onChange={handleTextChange}
            rows="5"
            className="w-full p-3 border rounded-md"
            placeholder="Masukkan deskripsi..."
          />
        </div>

        {/* Maps URL */}
        <div>
          <label className="font-bold block mb-2">{t('Google Maps URL')}</label>
          <input
            name="gmaps_url"
            value={formData.gmaps_url}
            onChange={handleTextChange}
            className="w-full p-3 border rounded-md"
            placeholder="https://maps.google.com/..."
          />
        </div>

        {/* About Image */}
        <div>
          <label className="font-bold block mb-2">{t('Gambar About (Opsional)')}</label>
          <input
            type="file"
            name="about_image"
            accept="image/*"
            onChange={(e) => setAboutImageFile(e.target.files[0])}
          />
          {aboutImageFile && (
            <img
              src={URL.createObjectURL(aboutImageFile)}
              alt="Preview"
              className="w-20 h-20 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSaveSettings}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2"
          >
            <Save size={18} /> {t('Simpan Pengaturan')}
          </button>
        </div>
      </fieldset>

      {/* Hero Images */}
      <fieldset className="border p-4 rounded-lg space-y-4">
        <legend className="font-bold text-xl px-2">{t('2. Gambar Hero')}</legend>
        <div className="flex gap-4 items-center">
          <input
            type="file"
            name="hero_image"
            accept="image/*"
            onChange={(e) => setHeroImageFile(e.target.files[0])}
          />
          <button
            onClick={handleSaveHero}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            <PlusCircle size={18} />
          </button>
        </div>
      </fieldset>

      {/* Fasilitas */}
      <fieldset className="border p-4 rounded-lg space-y-4">
        <legend className="font-bold text-xl px-2">{t('3. Fasilitas')}</legend>
        <div className="flex gap-2">
          <input
            value={newFacilityName}
            onChange={(e) => setNewFacilityName(e.target.value)}
            placeholder="Nama fasilitas baru"
            className="flex-1 p-3 border rounded-md"
          />
          <button
            onClick={handleAddFacility}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md"
          >
            <PlusCircle size={18} />
          </button>
        </div>
      </fieldset>

      {/* Galeri */}
      <fieldset className="border p-4 rounded-lg space-y-4">
        <legend className="font-bold text-xl px-2">{t('4. Galeri')}</legend>
        <div className="flex gap-2">
          <input
            type="file"
            name="gallery_image"
            accept="image/*"
            onChange={(e) => setNewGalleryFile(e.target.files[0])}
          />
          <input
            value={newGalleryAlt}
            onChange={(e) => setNewGalleryAlt(e.target.value)}
            placeholder="Alt text"
            className="flex-1 p-3 border rounded-md"
          />
          <button
            onClick={handleAddGalleryImage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md"
          >
            <PlusCircle size={18} />
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default KelolaWebsitePage;
