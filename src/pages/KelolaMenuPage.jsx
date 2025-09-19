// frontend/src/pages/KelolaMenuPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, PlusCircle, X, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosClient from '../api/axiosClient';

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
        const submissionData = new FormData();
        Object.keys(formData).forEach(key => {
            submissionData.append(key, formData[key] || '');
        });
        if (imageFile) {
            submissionData.append('image', imageFile);
        }
        onSubmit(submissionData, !!initialData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
            <div className="bg-soft-white rounded-lg shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal"><X /></button>
                <div className="p-8">
                    <h2 className="font-serif font-black text-3xl text-wood-brown text-center mb-6">
                        {initialData ? t('Edit Item Menu') : t('Tambah Item Menu Baru')}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="font-bold">{t('Nama Menu')}</label>
                            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="category" className="font-bold">{t('Kategori')}</label>
                                <select name="category" value={formData.category || ''} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md bg-white">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="font-bold">{t('Harga')}</label>
                                <input type="text" name="price" placeholder="cth: 25000" value={formData.price || ''} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md"/>
                            </div>
                        </div>
                        <div>
                             <label htmlFor="tag" className="font-bold flex items-center gap-2">{t('Label Khusus')} <Tag size={16}/></label>
                            <select name="tag" value={formData.tag || 'None'} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-white">
                                {availableTags.map(tag => <option key={tag} value={tag}>{t(tag)}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="description" className="font-bold">{t('Deskripsi (Opsional)')}</label>
                            <textarea name="description" rows="3" value={formData.description || ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md"></textarea>
                        </div>
                        <div>
                            <label htmlFor="image" className="font-bold">{t('Upload Gambar (Opsional)')}</label>
                            <input type="file" name="image" onChange={handleImageChange} className="mt-1 w-full p-2 border rounded-md text-sm"/>
                        </div>
                        <button type="submit" className="w-full bg-wood-brown hover:bg-light-brown text-white font-bold py-3 px-6 rounded-full">
                            {t('Simpan Perubahan')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const KelolaMenuPage = () => {
    // Panggil hook di sini, satu kali di level teratas
    const { t } = useTranslation();

    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [filterCategory, setFilterCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const itemsPerPage = 10;

    const fetchMenus = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/menus');
            const menusFromApi = response.data.data;
            setMenuItems(menusFromApi);

            // Extract unique categories from menu items
            const uniqueCategories = [...new Set(menusFromApi.map(item => item.category))];
            setCategories(uniqueCategories);

        } catch (error) {
            toast.error("Gagal memuat data menu dari server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchMenus(); 
    }, []);

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return toast.error("Nama kategori tidak boleh kosong.");
        if (categories.map(c => c.toLowerCase()).includes(newCategoryName.trim().toLowerCase())) {
            return toast.error("Kategori sudah ada.");
        }
        setCategories(prev => [...prev, newCategoryName.trim()].sort());
        setNewCategoryName('');
        toast.success(`Kategori "${newCategoryName.trim()}" ditambahkan.`);
    };

    const handleDeleteCategory = (categoryToDelete) => {
        const isCategoryInUse = menuItems.some(item => item.category === categoryToDelete);
        if (isCategoryInUse) {
            return toast.error(`Kategori "${categoryToDelete}" masih digunakan.`);
        }
        setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
        toast.success(`Kategori "${categoryToDelete}" dihapus.`);
    };

    const handleFormSubmit = async (formData, isEdit) => {
        const toastId = toast.loading(isEdit ? 'Memperbarui menu...' : 'Menambahkan menu...');
        try {
            if (isEdit) {
                formData.append('_method', 'PUT'); 
                await axiosClient.post(`/menus/${editingItem.id}`, formData, {
                     headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success("Menu berhasil diperbarui!", { id: toastId });
            } else {
                await axiosClient.post('/menus', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success("Menu baru berhasil ditambahkan!", { id: toastId });
            }
            fetchMenus();
            handleCloseModal();
        } catch (error) {
            toast.error("Terjadi kesalahan.", { id: toastId });
        }
    };

    const handleDelete = (id) => {
        toast((toastInstance) => (
            <div>
                <p className="font-bold mb-2">{t('Yakin ingin menghapus menu ini?')}</p>
                <div className="flex gap-2">
                    <button
                        className="w-full bg-red-600 text-white text-sm py-1 px-3 rounded"
                        onClick={async () => {
                            toast.dismiss(toastInstance.id);
                            const toastId = toast.loading("Menghapus menu...");
                            try {
                                await axiosClient.delete(`/menus/${id}`);
                                toast.success("Menu berhasil dihapus.", { id: toastId });
                                fetchMenus();
                            } catch (error) {
                                toast.error("Gagal menghapus menu.", { id: toastId });
                            }
                        }}
                    >{t('Hapus')}</button>
                    <button className="w-full bg-gray-200 text-sm py-1 px-3 rounded" onClick={() => toast.dismiss(toastInstance.id)}>{t('Batal')}</button>
                </div>
            </div>
        ));
    };

    const filteredAndSortedItems = useMemo(() => {
        let items = [...menuItems];
        if (filterCategory !== 'All') items = items.filter(item => item.category === filterCategory);
        if (searchTerm) items = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        items.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
        return items;
    }, [menuItems, filterCategory, searchTerm, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };

    const paginatedItems = filteredAndSortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const getTagClass = (tag) => {
        switch (tag) {
            case 'Best Seller': return 'bg-yellow-100 text-yellow-800';
            case 'Popular': return 'bg-blue-100 text-blue-800';
            case 'Recommended': return 'bg-green-100 text-green-800';
            case 'Must Try': return 'bg-purple-100 text-purple-800';
            case 'New Menu': return 'bg-pink-100 text-pink-800';
            default: return 'hidden';
        }
    };

    return (
        <>
            <MenuFormModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialData={editingItem}
                onSubmit={handleFormSubmit}
                categories={categories}
                t={t}
            />
            <div className="bg-soft-white p-8 rounded-xl shadow-lg space-y-8">
                {/* Bagian Kelola Kategori */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="font-serif font-bold text-xl px-2 text-wood-brown">{t('Kelola Kategori')}</legend>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-grow">
                            <h3 className="font-semibold mb-2">{t('Daftar Kategori:')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <div key={cat} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm group">
                                        <span>{cat}</span>
                                        <button onClick={() => handleDeleteCategory(cat)} className="ml-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100"><X size={14} /></button>
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

                {/* Bagian Daftar Menu */}
                <div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-serif font-black text-2xl text-wood-brown">{t('Daftar Menu')}</h2>
                            <p className="text-charcoal/70 mt-1">{t('Tambah, edit, atau hapus item menu di sini.')}</p>
                        </div>
                        <button onClick={() => handleOpenModal()} className="bg-leaf-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors">
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
                                         <th className="p-4">{t('Gambar')}</th>
                                         <th className="p-4 cursor-pointer" onClick={() => requestSort('name')}>{t('Nama Menu')}</th>
                                         <th className="p-4 cursor-pointer" onClick={() => requestSort('category')}>{t('Kategori')}</th>
                                         <th className="p-4 cursor-pointer" onClick={() => requestSort('price')}>{t('Harga')}</th>
                                         <th className="p-4">{t('Aksi')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="5" className="text-center p-10">{t('Memuat...')}</td></tr>
                                    ) : paginatedItems.map(item => (
                                        <tr key={item.id} className="border-b hover:bg-cream">
                                            <td className="p-4">
                                                {item.image_path ? (
                                                    <img 
                                                        src={`http://localhost:8000/storage/${item.image_path}`} 
                                                        alt={item.name} 
                                                        className="w-16 h-16 object-cover rounded-md border"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">{t('No Image')}</div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <p className="font-bold">{item.name}</p>
                                                {item.tag && item.tag !== 'None' && (
                                                    <span className={`mt-1 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getTagClass(item.tag)}`}>
                                                        {item.tag}
                                                    </span>
                                                )}
                                            </td>
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