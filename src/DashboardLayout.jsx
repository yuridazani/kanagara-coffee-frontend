// src/DashboardLayout.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // FIXED: was 'react-i-next'
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Coffee, Calendar, MessageSquare, LogOut, ChevronLeft, Bell, Search, UserCircle, Settings, Cog } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
// HAPUS: import axiosClient from './api/axiosClient';
import { dummyNotifications } from './data/adminData'; // GANTI DENGAN INI

// ==================== TopBar ====================
const TopBar = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  // Langsung gunakan data dummy sebagai state awal
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Hapus useEffect yang mengambil data dari API
  // useEffect(() => { ... }, []);

  const handleMarkAsRead = (id) => {
    const notifToMove = notifications.unread.find(n => n.id === id);
    if (notifToMove) {
      setNotifications(prev => ({
        unread: prev.unread.filter(n => n.id !== id),
        read: [notifToMove, ...prev.read]
      }));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-soft-white p-4 flex justify-between items-center flex-shrink-0 border-b shadow-md">
      <div className="relative hidden md:block">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
        <input
          type="text"
          placeholder="Cari reservasi atau menu..."
          className="pl-10 p-2 rounded-lg border bg-cream focus:outline-none focus:ring-2 focus:ring-wood-brown"
        />
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)} 
            className="relative p-2 rounded-full hover:bg-cream"
          >
            <Bell size={20} className="text-charcoal/70" />
            {notifications.unread.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                {notifications.unread.length}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b">
                <h3 className="font-bold text-charcoal flex items-center justify-between">{t('Notifikasi')}<button 
                    onClick={() => setIsNotifOpen(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </h3>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.unread.length > 0 ? (
                  <div className="p-2">
                    <p className="text-xs font-semibold text-gray-600 mb-2">{t('BELUM DIBACA')}</p>
                    {notifications.unread.map(notif => (
                      <div key={notif.id} className="p-3 border-b hover:bg-gray-50 bg-blue-50">
                        <p className="text-sm text-charcoal">
                          {notif.data && notif.data.message ? 
                            notif.data.message : 
                            `Reservasi baru dari ${notif.data?.customer_name || 'Customer'}`
                          }
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <small className="text-xs text-gray-500">
                            {new Date(notif.created_at).toLocaleString('id-ID')}
                          </small>
                          <button 
                            onClick={() => handleMarkAsRead(notif.id)} 
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >{t('Tandai dibaca')}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {notifications.read.length > 0 && (
                  <div className="p-2">
                    <p className="text-xs font-semibold text-gray-600 mb-2">{t('SUDAH DIBACA')}</p>
                    {notifications.read.slice(0, 5).map(notif => (
                      <div key={notif.id} className="p-3 border-b hover:bg-gray-50">
                        <p className="text-sm text-charcoal opacity-75">
                          {notif.data && notif.data.message ? 
                            notif.data.message : 
                            `Reservasi baru dari ${notif.data?.customer_name || 'Customer'}`
                          }
                        </p>
                        <small className="text-xs text-gray-500">
                          {new Date(notif.created_at).toLocaleString('id-ID')}
                        </small>
                      </div>
                    ))}
                  </div>
                )}

                {notifications.unread.length === 0 && notifications.read.length === 0 && (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">{t('Tidak ada notifikasi')}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Link to="/dashboard/settings" className="flex items-center space-x-2 p-2 rounded-full hover:bg-cream">
          <UserCircle size={28} className="text-charcoal/70"/>
          <span className="hidden md:inline font-bold">{t('Owner')}</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center text-sm text-charcoal/70 hover:text-red-500"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

// ==================== Sidebar ====================
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { t } = useTranslation();

  return (
    <aside
      className={`bg-charcoal text-cream flex-shrink-0 flex flex-col p-4 transition-all duration-300 ease-in-out relative ${
        isCollapsed ? 'w-20 items-center' : 'w-64'
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-wood-brown text-white p-1.5 rounded-full border-2 border-charcoal"
      >
        <ChevronLeft
          size={16}
          className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
        />
      </button>
      <h2
        className={`font-serif font-bold text-center mb-10 text-soft-white transition-opacity duration-300 ${
          isCollapsed ? 'opacity-0 h-0 invisible' : 'opacity-100 text-2xl'
        }`}
      >{t('Kanagara')}</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-colors ${
              isActive ? 'bg-wood-brown text-white' : 'hover:bg-wood-brown/50'
            } ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <LayoutDashboard className="flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">{t('Dashboard')}</span>}
        </NavLink>

        <NavLink
          to="/dashboard/menu"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-colors ${
              isActive ? 'bg-wood-brown text-white' : 'hover:bg-wood-brown/50'
            } ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <Coffee className="flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">{t('Kelola Menu')}</span>}
        </NavLink>

        <NavLink
          to="/dashboard/reservasi"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-colors ${
              isActive ? 'bg-wood-brown text-white' : 'hover:bg-wood-brown/50'
            } ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <Calendar className="flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">{t('Reservasi')}</span>}
        </NavLink>

        <NavLink
          to="/dashboard/feedback"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-colors ${
              isActive ? 'bg-wood-brown text-white' : 'hover:bg-wood-brown/50'
            } ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <MessageSquare className="flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">{t('Feedback')}</span>}
        </NavLink>

        <NavLink
          to="/dashboard/website"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-colors ${
              isActive ? 'bg-wood-brown text-white' : 'hover:bg-wood-brown/50'
            } ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <Cog className="flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">{t('Pengaturan Website')}</span>}
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-colors ${
              isActive ? 'bg-wood-brown text-white' : 'hover:bg-wood-brown/50'
            } ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <Settings className="flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">{t('Pengaturan')}</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

// ==================== DashboardLayout ====================
const DashboardLayout = () => {
  const { t } = useTranslation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-cream">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
        <footer className="text-center p-4 text-xs text-charcoal/50">
          © {new Date().getFullYear()}{t('Kanagara Coffee Dashboard.')}</footer>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default DashboardLayout;
