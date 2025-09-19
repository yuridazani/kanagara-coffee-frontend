// src/context/AuthContext.jsx

import { createContext, useContext, useState } from 'react';
// Hapus 'axiosClient'
// import axiosClient from '../api/axiosClient';

const AuthContext = createContext({ /* ... */ });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (newToken) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem('ACCESS_TOKEN', newToken);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    // --- (PENTING) UBAH FUNGSI LOGIN ---
    const login = async (credentials) => {
        // Simulasi proses login yang berhasil setelah 500ms
        return new Promise(resolve => {
            setTimeout(() => {
                const dummyUser = { name: 'Admin Kanagara', email: credentials.email };
                const dummyToken = 'DUMMY_TOKEN_123';
                
                setUser(dummyUser);
                setToken(dummyToken);

                resolve({ data: { user: dummyUser, access_token: dummyToken } });
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
