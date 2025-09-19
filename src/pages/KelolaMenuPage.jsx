// src/pages/KelolaMenuPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, PlusCircle, X, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMenu } from '../context/MenuContext'; // ✅ pakai MenuContext

const MenuFormModal = ({ isOpen, onClose, initialData, onSubmit, categories, t }) => {
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);

    const availableTags = ['None', 'Best Seller', 'Popular', 'Recommended', 'Must Try', 'New Menu'];

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: '', category: categories[0] || '', price: '', description: '', tag: 'None' });
        }
        setImageFile(null);
    }, [initialData, categories, isOpen]);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleImageChange = (e) => setImageFile(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, imageFile);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
                <div className="p-8">
                    <h2 className="font-serif font-black text-2xl text-center mb-6">
                        {initialData ? t('Edit Menu') : t('Tambah Menu Baru')}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="font-bold">{t('Nama Menu')}</label>
                            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="font-bold">{t('Kategori')}</label>
                                <select name="category" value={formData.category || ''} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md bg-white">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="font-bold">{t('Harga')}</label>
                                <input type="text" name="price" value={formData.price || ''} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md"/>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold flex items-center gap-2">{t('Label Khusus')} <Tag size={16}/></label>
                            <select name="tag" value={formData.tag || 'None'} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-white">
                                {availableTags.map(tag => <option key={tag} value={tag}>{t(tag)}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="font-bold">{t('Deskripsi')}</label>
                            <textarea name="description" rows="3" value={formData.description || ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md"></textarea>
                        </div>
                        <div>
                            <label className="font-bold">{t('Upload Gambar (Opsional)')}</label>
                            <input type="file" onChange={handleImageChange} className="mt-1 w-full p-2 border rounded-md text-sm"/>
                        </div>
                        <button type="submit" className="w-full bg-leaf-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full">
                            {t('Simpan')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const KelolaMenuPage = () => {
    const { t } = useTranslation();
    const { menuItems, categories, addMenuItem, editMenuItem, deleteMenuItem, addCategory, deleteCategory } = useMenu();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [newCategoryName, setNewCategoryName] = useState('');

    const handleOpenModal = (menu = null) => {
        setEditingMenu(menu);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = (formData, imageFile) => {
        if (editingMenu) {
            editMenuItem({ ...editingMenu, ...formData });
            toast.success(t('Menu berhasil diperbarui!'));
        } else {
            addMenuItem(formData);
            toast.success(t('Menu baru berhasil ditambahkan!'));
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm(t('Yakin ingin menghapus menu ini?'))) {
            deleteMenuItem(id);
            toast.success(t('Menu berhasil dihapus.'));
        }
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return toast.error("Nama kategori tidak boleh kosong.");
        if (categories.map(c => c.toLowerCase()).includes(newCategoryName.trim().toLowerCase())) {
            return toast.error("Kategori sudah ada.");
        }
        addCategory(newCategoryName.trim());
        setNewCategoryName('');
        toast.success(`Kategori "${newCategoryName.trim()}" ditambahkan.`);
    };

    const handleDeleteCategory = (cat) => {
        deleteCategory(cat);
        toast.success(`Kategori "${cat}" dihapus.`);
    };

    const filteredAndSearchedMenu = useMemo(() => {
        return menuItems
            .filter(item => filterCategory === 'All' || item.category === filterCategory)
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [menuItems, filterCategory, searchTerm]);

    const paginatedMenu = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSearchedMenu.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSearchedMenu, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredAndSearchedMenu.length / itemsPerPage);

    return (
        <>
            <MenuFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialData={editingMenu}
                onSubmit={handleSubmit}
                categories={categories}
                t={t}
            />
            <div className="bg-soft-white p-8 rounded-xl shadow-lg space-y-8">
                {/* Kelola Kategori */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="font-serif font-bold text-xl px-2">{t('Kelola Kategori')}</legend>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-grow">
                            <h3 className="font-semibold mb-2">{t('Daftar Kategori:')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <div key={cat} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm group">
                                        <span>{cat}</span>
                                        <button onClick={() => handleDeleteCategory(cat)} className="ml-2 text-gray-400 hover:text-red-600"><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-shrink-0 md:w-1/3">
                            <div className="flex gap-2 items-center">
                                <input 
                                    type="text" 
                                    value={newCategoryName} 
                                    onChange={(e) => setNewCategoryName(e.target.value)} 
                                    placeholder="Nama kategori baru..." 
                                    className="w-full p-2 border rounded-lg text-sm"
                                />
                                <button onClick={handleAddCategory} className="bg-leaf-green text-white p-2 rounded-lg"><PlusCircle size={20} /></button>
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* Daftar Menu */}
                <div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-serif font-black text-2xl">{t('Daftar Menu')}</h2>
                            <p className="text-charcoal/70 mt-1">{t('Tambah, edit, atau hapus item menu di sini.')}</p>
                        </div>
                        <button onClick={() => handleOpenModal()} className="bg-leaf-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                            <PlusCircle size={20} className="mr-2"/>{t('Tambah Menu')}
                        </button>
                    </div>

                    <div className="pt-4 mt-4 border-t">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <input type="text" placeholder="Cari menu..." onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:max-w-sm p-2 border rounded-lg" />
                            <select onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }} className="w-full md:max-w-xs p-2 border rounded-lg bg-white">
                                <option value="All">{t('Semua Kategori')}</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr className="border-b">
                                         <th className="p-4">{t('Nama Menu')}</th>
                                         <th className="p-4">{t('Kategori')}</th>
                                         <th className="p-4">{t('Harga')}</th>
                                         <th className="p-4">{t('Aksi')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedMenu.map(item => (
                                        <tr key={item.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4 font-bold">{item.name}</td>
                                            <td className="p-4">{item.category}</td>
                                            <td className="p-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</td>
                                            <td className="p-4 flex space-x-2">
                                                <button onClick={() => handleOpenModal(item)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="flex justify-between items-center mt-6">
                            <span className="text-sm text-charcoal/70">{t('Halaman')} {currentPage} {t('dari')} {totalPages}</span>
                            <div className="flex space-x-2">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-lg bg-soft-white disabled:opacity-50">{t('Prev')}</button>
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-lg bg-soft-white disabled:opacity-50">{t('Next')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default KelolaMenuPage;
