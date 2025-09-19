// frontend/src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
// import axiosClient from '../api/axiosClient'; ❌ dihapus
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const toastId = toast.loading("Menyimpan perubahan...");

        // Validasi sederhana
        if (newPassword !== newPasswordConfirmation) {
            setErrors({ new_password: ["Konfirmasi password tidak cocok."] });
            toast.error("Konfirmasi password tidak cocok.", { id: toastId });
            return;
        }

        // Simulasi pengiriman
        setTimeout(() => {
            toast.success("Password berhasil diubah (Simulasi)!", { id: toastId });
            setCurrentPassword('');
            setNewPassword('');
            setNewPasswordConfirmation('');
        }, 1000);
    };

    return (
        <div className="bg-soft-white p-8 rounded-xl shadow-lg space-y-8">
            <div>
                <h1 className="font-serif font-black text-3xl text-wood-brown">
                    {t('Pengaturan Akun')}
                </h1>
                <p className="text-charcoal/70 mt-1">
                    {t('Ubah detail profil dan keamanan akun Anda.')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t">
                {/* Info Akun */}
                <div className="flex items-center space-x-6">
                    <img
                        src="https://i.pravatar.cc/150"
                        alt="Owner"
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{user?.name || 'Admin'}</h2>
                        <p className="text-charcoal/70">{user?.email}</p>
                    </div>
                </div>

                {/* Ganti Password */}
                <div>
                    <label htmlFor="current-password" className="font-bold">
                        {t('Password Saat Ini')}
                    </label>
                    <input
                        type="password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="mt-2 w-full max-w-sm p-2 border rounded-md"
                    />
                    {errors.current_password && (
                        <p className="text-red-500 text-sm mt-1">{errors.current_password[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="new-password" className="font-bold">
                        {t('Password Baru')}
                    </label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="mt-2 w-full max-w-sm p-2 border rounded-md"
                    />
                    {errors.new_password && (
                        <p className="text-red-500 text-sm mt-1">{errors.new_password[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="new_password_confirmation" className="font-bold">
                        {t('Konfirmasi Password Baru')}
                    </label>
                    <input
                        type="password"
                        id="new_password_confirmation"
                        value={newPasswordConfirmation}
                        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                        required
                        className="mt-2 w-full max-w-sm p-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-wood-brown hover:bg-light-brown text-white font-bold py-3 px-6 rounded-full"
                >
                    {t('Simpan Perubahan')}
                </button>
            </form>
        </div>
    );
};

export default SettingsPage;
