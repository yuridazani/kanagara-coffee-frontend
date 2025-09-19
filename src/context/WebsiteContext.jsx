import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axiosClient from '../api/axiosClient';

const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
    const [content, setContent] = useState({
        settings: {},
        gallery: [],
        facilities: [],
        hero_images: [],
    });
    
    // Separate loading states untuk progressive loading
    const [loading, setLoading] = useState(true);
    const [criticalLoading, setCriticalLoading] = useState(true); // Untuk data penting
    const [lastFetch, setLastFetch] = useState(0);

    // Cache duration: 5 menit
    const CACHE_DURATION = 5 * 60 * 1000;

    const fetchContent = useCallback(async (forceRefresh = false) => {
        const now = Date.now();
        
        // Skip jika baru saja fetch dan tidak force refresh
        if (!forceRefresh && (now - lastFetch) < CACHE_DURATION) {
            return;
        }

        try {
            const timestamp = new Date().getTime();
            const response = await axiosClient.get(`/content/all?_=${timestamp}`);
            
            // Safe development logging
            if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
                console.log('Website content loaded:', response.data);
            }
            
            setContent(response.data);
            setLastFetch(now);
        } catch (error) {
            console.error("Gagal memuat konten website:", error);
            // Jangan block UI jika gagal, gunakan data default
        } finally {
            setLoading(false);
            setCriticalLoading(false);
        }
    }, [lastFetch]);

    // Progressive loading strategy
    useEffect(() => {
        // Load critical data immediately
        const loadCriticalData = async () => {
            try {
                setCriticalLoading(true);
                
                // Try to load settings first
                try {
                    const settingsResponse = await axiosClient.get('/content/settings');
                    setContent(prev => ({
                        ...prev,
                        settings: settingsResponse.data || {}
                    }));
                } catch (settingsError) {
                    console.warn("Settings endpoint not available, will try to get from /content/all:", settingsError.message);
                    
                    // Fallback: try to get settings from /content/all
                    try {
                        const allContentResponse = await axiosClient.get('/content/all');
                        setContent(allContentResponse.data || {
                            settings: {},
                            gallery: [],
                            facilities: [],
                            hero_images: [],
                        });
                    } catch (allError) {
                        console.warn("All content endpoint also failed:", allError.message);
                        // Use default empty content
                        setContent({
                            settings: {},
                            gallery: [],
                            facilities: [],
                            hero_images: [],
                        });
                    }
                }
                
                setCriticalLoading(false);
            } catch (error) {
                console.error("Critical data loading failed:", error);
                setCriticalLoading(false);
                // Set default content so app doesn't break
                setContent({
                    settings: {},
                    gallery: [],
                    facilities: [],
                    hero_images: [],
                });
            }
        };

        // Load full content after critical data
        const loadFullContent = async () => {
            await fetchContent();
        };

        // Load critical first, then full content
        loadCriticalData().then(() => {
            // Delay untuk tidak blocking UI
            setTimeout(loadFullContent, 100);
        });

    }, [fetchContent]);

    // Background refresh - lebih jarang dan hanya jika tab aktif
    useEffect(() => {
        let interval;
        
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // Refresh hanya jika tab menjadi aktif lagi dan sudah lama
                const now = Date.now();
                if ((now - lastFetch) > CACHE_DURATION) {
                    fetchContent();
                }
            }
        };

        // Auto refresh setiap 10 menit, bukan 30 detik
        interval = setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetchContent();
            }
        }, 10 * 60 * 1000); // 10 menit

        // Refresh saat tab menjadi aktif
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (interval) clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [fetchContent, lastFetch]);

    // Force refresh dengan loading state
    const forceRefresh = async () => {
        if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
            console.log('Force refreshing content...');
        }
        setLoading(true);
        await fetchContent(true);
    };

    // Provide both loading states
    const value = {
        ...content,
        loading,
        criticalLoading, // Untuk komponen yang butuh data critical
        refreshContent: fetchContent,
        forceRefresh,
        lastUpdated: lastFetch
    };

    return (
        <WebsiteContext.Provider value={value}>
            {children}
        </WebsiteContext.Provider>
    );
};

export const useWebsiteContent = () => {
    const context = useContext(WebsiteContext);
    if (!context) {
        throw new Error('useWebsiteContent must be used within WebsiteProvider');
    }
    return context;
};