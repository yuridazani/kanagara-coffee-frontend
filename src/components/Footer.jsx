// src/components/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, MessageCircle, MapPin, Coffee, Heart } from 'lucide-react';

const Footer = () => {
    const {
        t,
    } = useTranslation();

    return (
        <footer className="relative py-8 bg-charcoal text-cream/70 overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4">
                    <Coffee size={32} className="text-cream" />
                </div>
                <div className="absolute top-12 right-8">
                    <Coffee size={24} className="text-cream rotate-45" />
                </div>
                <div className="absolute bottom-8 left-1/4">
                    <Coffee size={20} className="text-cream -rotate-12" />
                </div>
                <div className="absolute bottom-4 right-1/3">
                    <Coffee size={28} className="text-cream rotate-12" />
                </div>
            </div>
            <div className="container mx-auto relative z-10">
                {/* Main Content - Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    
                    {/* Left: Brand & Description */}
                    <div className="text-center md:text-left">
                        <h3 className="font-serif font-bold text-xl text-soft-white mb-2">{t('Kanagara Coffee & Space')}</h3>
                        <p className="text-sm text-cream/60 leading-relaxed mb-4 max-w-md mx-auto md:mx-0">{t('A unique blend of warm Joglo tradition and minimalist modern design.')}</p>
                        
                        {/* Location */}
                        <div className="flex items-start gap-2 text-sm text-cream/70 mb-4 justify-center md:justify-start">
                            <MapPin size={16} className="text-cream/50 mt-0.5 flex-shrink-0" />
                            <span>{t('Jl. Raya Pd. Jati No.1, Pagerwojo, Buduran, Sidoarjo')}</span>
                        </div>
                    </div>

                    {/* Right: Social Links & Actions */}
                    <div className="text-center md:text-right">
                        <p className="text-sm font-medium text-cream mb-3">{t('Terhubung dengan Kami')}</p>
                        
                        {/* Social Links - Horizontal Layout */}
                        <div className="flex gap-3 justify-center md:justify-end mb-4">
                            <a 
                                href="https://www.instagram.com/kanagara.coffee/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-cream/10 p-2.5 rounded-full hover:bg-cream/20 transition-all duration-200 hover:-translate-y-0.5 group"
                            >
                                <Instagram size={18} className="text-cream group-hover:text-white" />
                            </a>
                            
                            <a 
                                href="https://wa.me/6282139707368" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-cream/10 p-2.5 rounded-full hover:bg-cream/20 transition-all duration-200 hover:-translate-y-0.5 group"
                            >
                                <MessageCircle size={18} className="text-cream group-hover:text-white" />
                            </a>
                        </div>

                        {/* Order via Grab */}
                        <a 
                            href="https://r.grab.com/g/6-20250909_080204_caf7bf7dde98422da53476079157fdd9_MEXMPS-6-C35TNLEBJFUJRN"
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 bg-leaf-green/20 text-leaf-green px-4 py-2 rounded-full text-sm font-medium hover:bg-leaf-green/30 transition-colors"
                        >
                            <Coffee size={14} />{t('Pesan via Grab')}</a>
                    </div>
                </div>

                {/* Divider with Decorative Element */}
                <div className="flex items-center justify-center my-6">
                    <div className="flex-1 h-px bg-cream/20"></div>
                    <div className="px-4">
                        <Heart size={16} className="text-cream/30" />
                    </div>
                    <div className="flex-1 h-px bg-cream/20"></div>
                </div>

                {/* Bottom Copyright - Centered */}
                <div className="text-center">
                    <p className="text-xs text-cream/50">
                        &copy; {new Date().getFullYear()}{t('Kanagara Coffee & Space. Crafted with')}<Heart size={12} className="inline mx-1 text-red-400" fill="currentColor" />{t('for coffee lovers.')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;