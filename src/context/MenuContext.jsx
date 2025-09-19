// src/context/MenuContext.jsx

import React, { createContext, useState, useContext } from 'react';
import { menuData, menuCategories as initialCategories } from '../data/menuData';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState(menuData);
    const [categories, setCategories] = useState(
        initialCategories.filter(c => c !== "All")
    );

    // URL gambar placeholder default
    const placeholderImage =
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2537&auto=format&fit=crop';

    // Tambah menu baru
    const addMenuItem = (newItem) => {
        const itemWithDefaults = {
            ...newItem,
            id: Date.now(),
            imageUrl: newItem.imageUrl || placeholderImage,
        };
        setMenuItems(prev => [itemWithDefaults, ...prev]);
    };

    // Edit menu
    const editMenuItem = (updatedItem) => {
        const itemWithDefaults = {
            ...updatedItem,
            imageUrl: updatedItem.imageUrl || placeholderImage,
        };
        setMenuItems(prev =>
            prev.map(item =>
                item.id === updatedItem.id ? itemWithDefaults : item
            )
        );
    };

    // Hapus menu
    const deleteMenuItem = (itemId) => {
        setMenuItems(prev => prev.filter(item => item.id !== itemId));
    };

    // Tambah kategori
    const addCategory = (newCategory) => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories(prev => [...prev, newCategory]);
        }
    };

    // Hapus kategori
    const deleteCategory = (categoryToDelete) => {
        setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
        // Hapus juga item menu dengan kategori itu
        setMenuItems(prev =>
            prev.filter(item => item.category !== categoryToDelete)
        );
    };

    const value = {
        menuItems,
        categories,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        addCategory,
        deleteCategory,
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    return useContext(MenuContext);
};
