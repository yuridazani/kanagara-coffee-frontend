// src/data/adminData.js

export const dummyReservations = [
    {
        id: 1, reservationNumber: 'KNG-001', name: 'Budi Santoso', date: '2025-09-20', time: '19:00',
        people: 4, status: 'Menunggu Konfirmasi', type: 'meja', area: 'Outdoor', whatsapp: '+6281234567890',
    },
    {
        id: 2, reservationNumber: 'KNG-002', name: 'Citra Lestari', date: '2025-09-21', time: '12:00',
        people: 2, status: 'Dikonfirmasi', type: 'meja', area: 'Indoor', whatsapp: '+6281234567891',
    },
    {
        id: 3, reservationNumber: 'KNG-003', name: 'Event Kantor XYZ', date: '2025-09-25', time: '18:00',
        people: 25, status: 'DP Dibayar', type: 'event', eventDetails: 'Acara meeting tahunan',
        dp_proof_path: 'https://via.placeholder.com/150', whatsapp: '+6281234567892',
    },
];

export const dummyFeedback = [
    {
        id: 1, name: 'Rina', visitDate: '2025-09-18', cafeRating: 5,
        cafeComment: 'Tempatnya nyaman banget buat kerja, kopinya juga enak!',
        photo_path: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
        created_at: '2025-09-18T16:00:00Z',
    },
    {
        id: 2, name: 'Agus', visitDate: '2025-09-17', cafeRating: 4,
        cafeComment: 'Outdoor areanya asik buat nongkrong bareng teman-teman.',
        created_at: '2025-09-17T21:00:00Z',
    },
];

export const dummyDashboardStats = {
    reservationsToday: 5,
    bestSellerMenu: 'NUTELLA LATTE',
    averageRating: 4.8,
    reservations: dummyReservations.slice(0, 5), // Ambil 5 reservasi untuk ditampilkan
};

export const dummyNotifications = {
    unread: [
        { id: 'uuid-1', data: { message: 'Reservasi baru dari Budi Santoso' }, created_at: new Date().toISOString() },
        { id: 'uuid-2', data: { message: 'Feedback baru dari Rina' }, created_at: new Date().toISOString() },
    ],
    read: [
        { id: 'uuid-3', data: { message: 'DP dari Event Kantor XYZ telah diverifikasi' }, created_at: '2025-09-18T10:00:00Z' },
    ]
};
