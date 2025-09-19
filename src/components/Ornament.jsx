// src/components/Ornament.jsx

import React from 'react';
// Impor file SVG Anda sebagai URL
import batikPattern from '../assets/vecteezy_seamless-pattern-with-tropical-flower-vector-illustration_23889505.svg';

const Ornament = () => {
    return (
        <div
            className="absolute inset-0 z-0 opacity-5 pointer-events-none"
            style={{
                backgroundImage: `url(${batikPattern})`,
                backgroundSize: '300px', // Atur ukuran pola
            }}
        >
        </div>
    );
};

export default Ornament;