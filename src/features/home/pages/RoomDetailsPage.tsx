import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { roomService } from '../services/roomService';
import type { Room } from '../types';
import { useFavorites } from '@/shared/context/FavoritesContext';
import {
  MapPin, Shield, ChevronRight, ArrowLeft, Heart,
  Bed, Bath, Wifi, Zap, Calendar, Home, CheckCircle2,
  Share2, Flag, MessageCircle, Clock, Users, Sparkles,
  X, Send, CalendarDays, Phone
} from 'lucide-react';

const RoomDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [scheduleForm, setScheduleForm] = useState({ name: '', email: '', phone: '', date: '', time: '10:00', notes: '' });
  const [formSubmitted, setFormSubmitted] = useState<'contact' | 'schedule' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadRoom = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await roomService.fetchRoomById(id);
        setRoom(data);
      } catch (error) {
        console.error('Failed to load room:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRoom();
  }, [id]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Available Now';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const timeAgo = (dateStr?: string) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const getCurrencySymbol = (currency?: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'EGP': return 'EGP';
      default: return currency || 'EGP';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi') || lower.includes('internet')) return <Wifi size={18} />;
    if (lower.includes('kitchen')) return <Home size={18} />;
    if (lower.includes('electric') || lower.includes('air') || lower.includes('ac')) return <Zap size={18} />;
    return <CheckCircle2 size={18} />;
  };

  /* ─── LOADING SKELETON ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        {/* Full-width hero skeleton */}
        <div className="relative w-full h-[55vh] bg-gray-200 animate-pulse" />
        <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 animate-pulse">
            <div className="h-8 w-2/3 bg-gray-200 rounded-xl mb-4" />
            <div className="h-5 w-1/3 bg-gray-200 rounded-lg mb-8" />
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}
            </div>
            <div className="h-32 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  /* ─── NOT FOUND ─── */
  if (!room) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-6">
        <div className="text-center bg-white p-16 rounded-[3rem] border border-gray-100 shadow-xl max-w-md w-full">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Home size={36} className="text-blue-400" />
          </div>
          <h2 className="text-3xl font-black text-[#2d2d2d] mb-3">Room Not Found</h2>
          <p className="text-gray-400 font-medium mb-10 leading-relaxed">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-10 py-4 bg-[#2d2d2d] text-white rounded-2xl text-sm font-black hover:bg-black transition-colors shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /* ─── MAIN RENDER ─── */
  return (
    <div className="min-h-screen bg-[#f8f9fa]">

      {/* ═══════════════════════════════════════════ */}
      {/* FULL-WIDTH CINEMATIC HERO                  */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative w-full h-[55vh] min-h-[420px] max-h-[620px] overflow-hidden bg-gray-900">
        {/* Image */}
        <img
          src={room.imageUrl}
          alt={room.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-105 ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* Top bar: Back + Actions */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:bg-white/20 transition-all">
                <ArrowLeft size={18} />
              </div>
              <span className="text-sm font-bold hidden sm:inline">Back</span>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all" title="Share">
                <Share2 size={18} />
              </button>
              <button
                onClick={() => id && toggleFavorite(id)}
                className={`p-3 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
                  id && isFavorite(id)
                    ? 'bg-red-500/90 border-red-400/50 text-white'
                    : 'bg-white/10 border-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
                title="Save"
              >
                <Heart size={18} className={id && isFavorite(id) ? 'fill-white' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom content on hero */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 pb-24">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-5">
              <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link to="/search" className="hover:text-white/80 transition-colors">Rooms</Link>
              <ChevronRight size={10} />
              <span className="text-white/70 truncate max-w-[160px]">{room.title}</span>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {room.isVerified && (
                <div className="bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-blue-400/20">
                  <Shield size={14} className="text-blue-300" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-200">Verified</span>
                </div>
              )}
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/80">{room.type}</span>
              </div>
              {room.createdAt && (
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <Clock size={12} className="text-white/50" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/60">Posted {timeAgo(room.createdAt)}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] max-w-3xl mb-4">
              {room.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-white/60">
              <MapPin size={16} className="text-white/40" />
              <span className="text-base font-semibold">
                {room.street && `${room.street}, `}{room.area && `${room.area}, `}{room.city}{room.country && `, ${room.country}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* FLOATING PRICE BAR                         */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative z-20 -mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-[1.5rem] shadow-2xl shadow-black/5 border border-gray-100 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-[#2d2d2d]">
                {getCurrencySymbol(room.currency)} {room.price.toLocaleString()}
              </span>
              <span className="text-gray-400 font-semibold text-sm">/ month</span>
              {room.billsIncluded && (
                <span className="text-[10px] font-black uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  Bills included
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
              <Shield size={14} className="text-blue-500" />
              Secure booking · Verified listings
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* CONTENT AREA                               */}
      {/* ═══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ─── LEFT: Main Content ─── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                icon={<Bed size={22} />}
                value={`${room.bedrooms ?? 1}`}
                label="Bedrooms"
              />
              <StatCard
                icon={<Bath size={22} />}
                value={`${room.bathrooms ?? 1}`}
                label="Bathrooms"
              />
              <StatCard
                icon={<Calendar size={22} />}
                value={formatDate(room.availableDate)}
                label="Available"
                smallValue
              />
              <StatCard
                icon={<Users size={22} />}
                value={room.genderPreference}
                label="Preference"
                smallValue
              />
            </div>

            {/* Description */}
            {room.description && (
              <section className="bg-white rounded-[2rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-blue-50 rounded-xl">
                    <Sparkles size={18} className="text-blue-500" />
                  </div>
                  <h2 className="text-xl font-black text-[#2d2d2d]">About this space</h2>
                </div>
                <p className="text-gray-500 font-medium leading-[1.8] text-[15px]">
                  {room.description}
                </p>
              </section>
            )}

            {/* Amenities */}
            <section className="bg-white rounded-[2rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <CheckCircle2 size={18} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-black text-[#2d2d2d]">What this place offers</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-4 px-5 py-4 bg-[#f8f9fa] rounded-2xl hover:bg-blue-50/60 transition-colors group/amenity"
                  >
                    <div className="p-2 bg-white rounded-xl shadow-sm text-blue-500 group-hover/amenity:text-blue-600 transition-colors">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-sm font-bold text-[#2d2d2d]">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Map */}
            {room.latitude && room.longitude && (
              <section className="bg-white rounded-[2rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-blue-50 rounded-xl">
                    <MapPin size={18} className="text-blue-500" />
                  </div>
                  <h2 className="text-xl font-black text-[#2d2d2d]">Location</h2>
                </div>
                <div className="h-72 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <iframe
                    title="Room Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${room.longitude - 0.01},${room.latitude - 0.01},${room.longitude + 0.01},${room.latitude + 0.01}&layer=mapnik&marker=${room.latitude},${room.longitude}`}
                  />
                </div>
                <p className="text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest">
                  {room.street && `${room.street}, `}{room.area && `${room.area}, `}{room.city}
                </p>
              </section>
            )}
          </div>

          {/* ─── RIGHT: Sidebar ─── */}
          <div className="space-y-6">

            {/* Sticky Booking Card */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#2d2d2d] to-[#1a1a2e] p-8 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Monthly rent</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">{getCurrencySymbol(room.currency)} {room.price.toLocaleString()}</span>
                  <span className="text-white/40 font-medium text-sm">/ mo</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-8 space-y-0">
                <DetailRow label="Type" value={room.type} />
                <DetailRow label="Bedrooms" value={`${room.bedrooms ?? 1}`} />
                <DetailRow label="Bathrooms" value={`${room.bathrooms ?? 1}`} />
                <DetailRow label="Preference" value={room.genderPreference} />
                <DetailRow label="Available" value={formatDate(room.availableDate)} />
                <DetailRow
                  label="Bills"
                  value={room.billsIncluded ? 'Included ✓' : 'Not included'}
                  highlight={room.billsIncluded}
                  isLast
                />
              </div>

              {/* Actions */}
              <div className="px-8 pb-8 space-y-3">
                <button
                  onClick={() => { setFormSubmitted(null); setShowContactModal(true); }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  Contact Host
                </button>
                <button
                  onClick={() => { setFormSubmitted(null); setShowScheduleModal(true); }}
                  className="w-full py-4 bg-[#f0f1f3] text-[#2d2d2d] rounded-2xl font-black text-sm hover:bg-[#2d2d2d] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <CalendarDays size={16} />
                  Schedule a Visit
                </button>
              </div>
            </div>

            {/* Host Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">Hosted by</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/20">
                  {room.postedBy.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <p className="font-black text-[#2d2d2d] text-base">{room.postedBy}</p>
                  {room.isVerified && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Shield size={12} className="text-blue-500 fill-blue-500/10" />
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-wider">Verified Host</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Report */}
            <button className="w-full flex items-center justify-center gap-2 py-4 text-xs font-bold text-gray-300 hover:text-red-400 transition-colors">
              <Flag size={13} />
              Report this listing
            </button>
          </div>

        </div>
      </div>
      {/* ═══════════════════════════════════════════ */}
      {/* CONTACT HOST MODAL                         */}
      {/* ═══════════════════════════════════════════ */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-[2rem] w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative">
              <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                <X size={18} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle size={22} />
                <h3 className="text-xl font-black">Contact Host</h3>
              </div>
              <p className="text-white/60 text-sm font-medium">Send a message about "{room.title}"</p>
            </div>

            {formSubmitted === 'contact' ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-green-500" />
                </div>
                <h4 className="text-xl font-black text-[#2d2d2d] mb-2">Message Sent!</h4>
                <p className="text-gray-400 font-medium text-sm mb-6">The host will get back to you shortly.</p>
                <button onClick={() => setShowContactModal(false)} className="px-8 py-3 bg-[#2d2d2d] text-white rounded-xl text-sm font-black hover:bg-black transition-colors">Done</button>
              </div>
            ) : (
              <div className="p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Your Name</label>
                    <input type="text" value={contactForm.name} onChange={e => setContactForm(p => ({...p, name: e.target.value}))} placeholder="John Doe" className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Phone</label>
                    <input type="tel" value={contactForm.phone} onChange={e => setContactForm(p => ({...p, phone: e.target.value}))} placeholder="+20 xxx xxx xxxx" className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Email</label>
                  <input type="email" value={contactForm.email} onChange={e => setContactForm(p => ({...p, email: e.target.value}))} placeholder="you@email.com" className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Message</label>
                  <textarea value={contactForm.message} onChange={e => setContactForm(p => ({...p, message: e.target.value}))} rows={4} placeholder={`Hi, I'm interested in "${room.title}". Is it still available?`} className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none" />
                </div>
                <button
                  onClick={() => { setFormSubmitted('contact'); setContactForm({ name: '', email: '', phone: '', message: '' }); }}
                  disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* SCHEDULE VISIT MODAL                       */}
      {/* ═══════════════════════════════════════════ */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowScheduleModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-[2rem] w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2d2d2d] to-[#1a1a2e] p-8 text-white relative">
              <button onClick={() => setShowScheduleModal(false)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                <X size={18} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <CalendarDays size={22} />
                <h3 className="text-xl font-black">Schedule a Visit</h3>
              </div>
              <p className="text-white/50 text-sm font-medium">Book a time to see "{room.title}"</p>
            </div>

            {formSubmitted === 'schedule' ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDays size={28} className="text-blue-500" />
                </div>
                <h4 className="text-xl font-black text-[#2d2d2d] mb-2">Visit Scheduled!</h4>
                <p className="text-gray-400 font-medium text-sm mb-6">The host will confirm your visit shortly.</p>
                <button onClick={() => setShowScheduleModal(false)} className="px-8 py-3 bg-[#2d2d2d] text-white rounded-xl text-sm font-black hover:bg-black transition-colors">Done</button>
              </div>
            ) : (
              <div className="p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Your Name</label>
                    <input type="text" value={scheduleForm.name} onChange={e => setScheduleForm(p => ({...p, name: e.target.value}))} placeholder="John Doe" className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Phone</label>
                    <input type="tel" value={scheduleForm.phone} onChange={e => setScheduleForm(p => ({...p, phone: e.target.value}))} placeholder="+20 xxx xxx xxxx" className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Email</label>
                  <input type="email" value={scheduleForm.email} onChange={e => setScheduleForm(p => ({...p, email: e.target.value}))} placeholder="you@email.com" className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Preferred Date</label>
                    <input type="date" value={scheduleForm.date} onChange={e => setScheduleForm(p => ({...p, date: e.target.value}))} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Preferred Time</label>
                    <select value={scheduleForm.time} onChange={e => setScheduleForm(p => ({...p, time: e.target.value}))} className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                      {['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'].map(t => (
                        <option key={t} value={t}>{t.replace(':00','') + ':00 ' + (Number(t.split(':')[0]) < 12 ? 'AM' : 'PM')}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Notes (Optional)</label>
                  <textarea value={scheduleForm.notes} onChange={e => setScheduleForm(p => ({...p, notes: e.target.value}))} rows={2} placeholder="Any special requests or questions..." className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-semibold text-[#2d2d2d] border border-gray-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none" />
                </div>
                <button
                  onClick={() => { setFormSubmitted('schedule'); setScheduleForm({ name: '', email: '', phone: '', date: '', time: '10:00', notes: '' }); }}
                  disabled={!scheduleForm.name || !scheduleForm.email || !scheduleForm.date}
                  className="w-full py-4 bg-[#2d2d2d] text-white rounded-2xl font-black text-sm hover:bg-black hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <CalendarDays size={16} />
                  Confirm Visit
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

/* ─── Sub-components ─── */

const StatCard = ({ icon, value, label, smallValue }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  smallValue?: boolean;
}) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
    <div className="text-blue-500 flex justify-center mb-3">{icon}</div>
    <p className={`font-black text-[#2d2d2d] leading-tight mb-1 ${smallValue ? 'text-sm' : 'text-2xl'}`}>{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
  </div>
);

const DetailRow = ({ label, value, highlight, isLast }: {
  label: string;
  value: string;
  highlight?: boolean;
  isLast?: boolean;
}) => (
  <div className={`flex items-center justify-between py-4 ${isLast ? '' : 'border-b border-gray-50'}`}>
    <span className="text-sm font-semibold text-gray-400">{label}</span>
    <span className={`text-sm font-black ${highlight ? 'text-green-600' : 'text-[#2d2d2d]'}`}>{value}</span>
  </div>
);

export default RoomDetailsPage;
