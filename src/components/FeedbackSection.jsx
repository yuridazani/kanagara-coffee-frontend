// src/components/FeedbackSection.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Star,
  Send,
  CheckCircle,
  Camera,
  Calendar,
  Clock,
  PlusCircle,
  XCircle,
  UserCircle,
  MessageSquare,
  Coffee,
  ChevronRight,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';
import { dummyFeedback } from '../data/adminData';
import { menuData } from '../data/menuData';

// ==============================
// Helper
// ==============================
const timeAgo = (timestamp) => {
  const now = new Date();
  const seconds = Math.floor((now - new Date(timestamp)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return `${Math.floor(interval)} tahun yang lalu`;
  interval = seconds / 2592000;
  if (interval > 1) return `${Math.floor(interval)} bulan yang lalu`;
  interval = seconds / 604800;
  if (interval > 1) return `${Math.floor(interval)} minggu yang lalu`;
  interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)} hari yang lalu`;
  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)} jam yang lalu`;
  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)} menit yang lalu`;
  return 'Baru saja';
};

// ==============================
// Reusable Components
// ==============================
const StarRatingDisplay = ({ rating, size = 16 }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
        fill={i < rating ? 'currentColor' : 'none'}
      />
    ))}
  </div>
);

const StarRatingInput = ({ rating, setRating, hoverRating, setHoverRating, size = 24 }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={`cursor-pointer transition-colors ${
          (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
        }`}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(star)}
        fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
      />
    ))}
  </div>
);

const CompactFeedbackCard = ({ feedback, t }) => {
  const userName = feedback.name || 'Anonim';
  const maxCommentLength = 120;
  const truncatedComment =
    feedback.cafeComment && feedback.cafeComment.length > maxCommentLength
      ? feedback.cafeComment.substring(0, maxCommentLength) + '...'
      : feedback.cafeComment;

  return (
    <div className="bg-cream p-4 rounded-lg border border-wood-brown/10 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <UserCircle size={32} className="text-charcoal/50 flex-shrink-0 mt-1" />
        <div className="w-full min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-charcoal text-sm">{userName}</p>
              <div className="flex items-center gap-2 mt-1">
                <StarRatingDisplay rating={feedback.cafeRating} size={12} />
                <span className="text-xs text-charcoal/60">{timeAgo(feedback.created_at)}</span>
              </div>
            </div>
          </div>

          <p className="text-charcoal/80 mt-2 text-sm leading-relaxed">"{truncatedComment}"</p>

          {feedback.menu_ratings && feedback.menu_ratings.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <Coffee size={12} className="text-charcoal/50" />
              <span className="text-xs text-charcoal/60">
                {feedback.menu_ratings.length} {t('menu dinilai')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==============================
// Main Component
// ==============================
const FeedbackSection = () => {
  const { t } = useTranslation();
  const [allFeedback, setAllFeedback] = useState([]);
  const [menuItems] = useState(menuData);
  const [loading, setLoading] = useState(true);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', visitDate: '', visitTime: '' });
  const [photo, setPhoto] = useState(null);
  const [cafeRating, setCafeRating] = useState(0);
  const [hoverCafeRating, setHoverCafeRating] = useState(0);
  const [cafeComment, setCafeComment] = useState('');
  const [menuRatings, setMenuRatings] = useState([]);

  useEffect(() => {
    // Load dummy feedback on mount
    setAllFeedback(dummyFeedback);
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddMenuRating = () => {
    setMenuRatings([...menuRatings, { menuName: '', rating: 0, hover: 0 }]);
  };

  const handleRemoveMenuRating = (index) => {
    setMenuRatings(menuRatings.filter((_, i) => i !== index));
  };

  const handleMenuRatingChange = (index, field, value) => {
    const newRatings = [...menuRatings];
    newRatings[index][field] = value;
    setMenuRatings(newRatings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cafeRating === 0) {
      toast.error('Mohon berikan rating untuk kafe.');
      return;
    }

    const toastId = toast.loading('Mengirim ulasan...');

    // Simulasi pengiriman
    setTimeout(() => {
      const newFeedback = {
        id: Date.now(),
        name: formData.name || 'Anonim',
        cafeRating,
        cafeComment,
        created_at: new Date().toISOString(),
        menu_ratings: menuRatings
      };

      setAllFeedback((prev) => [newFeedback, ...prev]);
      setIsSubmitted(true);

      toast.success('Ulasan Anda berhasil dikirim! (Simulasi)', { id: toastId });
    }, 1200);
  };

  const averageRating = useMemo(() => {
    if (allFeedback.length === 0) return 0;
    const validFeedbacks = allFeedback.filter((f) => f.cafeRating > 0);
    if (validFeedbacks.length === 0) return 0;
    const total = validFeedbacks.reduce((acc, curr) => acc + curr.cafeRating, 0);
    return (total / validFeedbacks.length).toFixed(1);
  }, [allFeedback]);

  const topFeedback = useMemo(() => {
    const highRated = allFeedback.filter((f) => f.cafeRating >= 4);
    return (highRated.length >= 5 ? highRated : allFeedback)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  }, [allFeedback]);

  return (
    <section id="feedback" className="py-12 px-4 bg-soft-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="font-serif font-black text-3xl text-wood-brown">{t('Apa Kata Mereka')}</h2>
          <p className="mt-2 text-charcoal/80">{t('Bergabunglah dengan ribuan pelanggan puas lainnya')}</p>
          {averageRating > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Star size={24} className="text-yellow-500" fill="currentColor" />
              <span className="text-2xl font-bold text-wood-brown">{averageRating}</span>
              <span className="text-charcoal/70">
                {t('/ 5.0 dari')} {allFeedback.filter((f) => f.cafeRating).length} {t('ulasan')}
              </span>
            </div>
          )}
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-8" data-aos="fade-up">
          {/* Left - Feedback */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-wood-brown">{t('Ulasan Terbaik')}</h3>
              <Link
                to="/ulasan"
                className="flex items-center gap-1 text-sm text-wood-brown hover:text-light-brown transition-colors font-medium"
              >
                <Eye size={16} />
                {t('Lihat Semua')}
                <ChevronRight size={14} />
              </Link>
            </div>

            {topFeedback.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {topFeedback.map((fb) => (
                  <CompactFeedbackCard key={fb.id} feedback={fb} t={t} />
                ))}
              </div>
            ) : (
              <div className="text-center text-charcoal/60 bg-cream p-6 rounded-lg">
                <MessageSquare size={32} className="mx-auto mb-2 text-charcoal/30" />
                <p>{t('Jadilah yang pertama memberikan ulasan!')}</p>
              </div>
            )}
          </div>

          {/* Right - Form */}
          <div className="lg:sticky lg:top-4">
            <h3 className="font-serif font-bold text-xl text-wood-brown mb-4">{t('Bagikan Pengalaman Anda')}</h3>

            {isSubmitted ? (
              <div className="text-center py-8 bg-cream rounded-lg shadow-sm">
                <CheckCircle size={40} className="text-leaf-green mx-auto mb-3" />
                <h4 className="font-bold text-lg text-wood-brown">{t('Terima Kasih!')}</h4>
                <p className="mt-1 text-sm text-charcoal/80">{t('Ulasan Anda sangat berarti bagi kami')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-cream p-6 rounded-lg shadow-sm space-y-4">
                {/* Info */}
                <div className="space-y-3">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">
                      {t('Nama')} <span className="text-xs text-charcoal/60">{t('(opsional)')}</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nama Anda"
                      className="mt-1 w-full p-2 text-sm border border-wood-brown/20 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="visitDate" className="text-sm font-medium flex items-center gap-1">
                        <Calendar size={14} />
                        {t('Tanggal Kunjungan *')}
                      </label>
                      <input
                        type="date"
                        id="visitDate"
                        value={formData.visitDate}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-full p-2 text-sm border border-wood-brown/20 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="visitTime" className="text-sm font-medium flex items-center gap-1">
                        <Clock size={14} />
                        {t('Waktu Kunjungan *')}
                      </label>
                      <input
                        type="time"
                        id="visitTime"
                        value={formData.visitTime}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-full p-2 text-sm border border-wood-brown/20 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium">{t('Rating Kafe *')}</label>
                  <div className="mt-2">
                    <StarRatingInput
                      rating={cafeRating}
                      setRating={setCafeRating}
                      hoverRating={hoverCafeRating}
                      setHoverRating={setHoverCafeRating}
                    />
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label htmlFor="cafeComment" className="text-sm font-medium">
                    {t('Komentar *')}
                  </label>
                  <textarea
                    id="cafeComment"
                    rows="3"
                    value={cafeComment}
                    onChange={(e) => setCafeComment(e.target.value)}
                    required
                    placeholder="Ceritakan pengalaman Anda..."
                    className="mt-1 w-full p-2 text-sm border border-wood-brown/20 rounded-md resize-none"
                  />
                </div>

                {/* Photo */}
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Camera size={14} />
                    {t('Foto')}
                    <span className="text-xs text-charcoal/60">{t('(opsional)')}</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="mt-1 w-full text-xs file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-leaf-green/10 file:text-leaf-green"
                  />
                </div>

                {/* Menu Ratings */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t('Rating Menu (opsional)')}</span>
                    <button
                      type="button"
                      onClick={handleAddMenuRating}
                      className="text-xs text-leaf-green font-medium flex items-center gap-1"
                    >
                      <PlusCircle size={14} />
                      {t('Tambah')}
                    </button>
                  </div>

                  {menuRatings.map((item, index) => (
                    <div key={index} className="mt-2 p-2 bg-soft-white rounded border border-wood-brown/10">
                      <div className="flex items-center gap-2">
                        <select
                          value={item.menuName}
                          onChange={(e) => handleMenuRatingChange(index, 'menuName', e.target.value)}
                          className="flex-1 p-1 text-xs border border-wood-brown/20 rounded"
                        >
                          <option value="">{t('Pilih Menu')}</option>
                          {menuItems.map((menu) => (
                            <option key={menu.id} value={menu.name}>
                              {menu.name}
                            </option>
                          ))}
                        </select>
                        <StarRatingInput
                          rating={item.rating}
                          setRating={(val) => handleMenuRatingChange(index, 'rating', val)}
                          hoverRating={item.hover}
                          setHoverRating={(val) => handleMenuRatingChange(index, 'hover', val)}
                          size={16}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMenuRating(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-wood-brown hover:bg-light-brown text-white font-medium py-2.5 rounded-full flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={16} />
                  {t('Kirim Ulasan')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
