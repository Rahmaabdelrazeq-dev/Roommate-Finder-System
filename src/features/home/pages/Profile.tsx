import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, User, Pencil, Trash2, Save, X, LogOut, Camera, UserCircle, Mail, Hash, ShieldCheck, Clock } from 'lucide-react';
import type { ProfileType } from '@/features/auth/types/profile';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    age: 0,
    avatar_url: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) { setLoading(false); return; }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;
        if (!cancelled) {
          setProfile({ ...data, email: user.email });
          setLoading(false);
          setTimeout(() => setVisible(true), 50);
        }
      } catch (error) {
        console.error('Profile Error:', error);
        if (!cancelled) setLoading(false);
      }
    };

    void fetchProfile();
    return () => { cancelled = true; };
  }, []);

  const handleEditToggle = () => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name,
        age: profile.age,
        avatar_url: profile.avatar_url || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      // 1. Verify Session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session. Please log in again.');

      // 2. Perform Update (Only using confirmed columns: full_name, age, avatar_url)
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          age: parseInt(editForm.age.toString()),
          avatar_url: editForm.avatar_url
        })
        .eq('id', profile.id)
        .select();

      if (error) {
        console.error('Supabase Update Error:', error);
        throw new Error(error.message);
      }
      
      // 3. Update local state
      if (data && data[0]) {
        setProfile({ ...data[0], email: profile.email });
      } else {
        setProfile({ ...profile, ...editForm, age: parseInt(editForm.age.toString()) });
      }
      
      setIsEditing(false);
    } catch (error: any) {
      console.error('Update Error:', error);
      alert(`Update failed: ${error.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!profile) return;
    if (!confirm('Are you absolutely sure? This will permanently delete your profile data.')) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profile.id);

      if (error) throw error;
      
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Failed to delete profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eff6ff]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-blue-500/60 text-sm tracking-[0.2em] uppercase font-light">Loading</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eff6ff]">
        <div className="text-center p-12 max-w-sm">
          <div className="w-16 h-16 rounded-full border border-blue-200 flex items-center justify-center mx-auto mb-5 bg-white shadow-sm">
            <User className="text-blue-300" size={24} />
          </div>
          <h2 className="text-blue-950 text-xl font-bold tracking-tight">Access Restricted</h2>
          <p className="text-blue-900/50 text-sm mt-3 leading-relaxed">
            Please sign in to view and manage your professional profile details.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
  

      <div
        className="profile-root min-h-screen bg-[#eff6ff] p-4 sm:p-8 flex items-start justify-center pt-16"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div className="w-full max-w-lg">

          {/* Banner */}
          <div className="aurora-bg rounded-t-[28px] h-44 relative overflow-hidden fade-up">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)' }}
            />
          </div>

          {/* Card body */}
          <div className="bg-[#f8fbff] rounded-b-[28px] border border-t-0 border-blue-100 px-8 pb-10 shadow-[0_8px_40px_rgba(59,130,246,0.08)] relative">
            
            {/* Action Buttons (High Z-Index for Clickability) */}
            <div className="absolute top-6 right-6 flex gap-2 z-30 fade-up-d2">
              {!isEditing ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleEditToggle(); }}
                  className="p-2.5 rounded-full bg-white border border-blue-100 text-blue-500 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group cursor-pointer pointer-events-auto"
                  title="Edit Profile"
                >
                  <Pencil size={16} className="group-hover:scale-110 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleEditToggle(); }}
                  className="p-2.5 rounded-full bg-white border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm group cursor-pointer pointer-events-auto"
                  title="Cancel"
                >
                  <X size={16} className="group-hover:rotate-90 transition-transform" />
                </button>
              )}
            </div>

            {/* Avatar */}
            <div className="fade-up-d1" style={{ marginTop: '-44px', marginBottom: '24px' }}>
              <div className="avatar-ring w-24 h-24 rounded-full p-[2.5px] shadow-lg relative group">
                <img
                  src={
                    (isEditing ? editForm.avatar_url : profile.avatar_url) ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'User')}&background=eff6ff&color=3b82f6&bold=true`
                  }
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'User')}&background=eff6ff&color=3b82f6&bold=true`;
                  }}
                  alt={profile.full_name}
                  className="w-full h-full rounded-full object-cover bg-[#eff6ff]"
                />
                {isEditing && (
                   <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-[2px]">
                     <Camera size={20} className="text-white opacity-80" />
                   </div>
                )}
              </div>
            </div>

            {isEditing ? (
              /* Simple Edit Mode Form */
              <div className="fade-up-d1 space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-black text-blue-400 tracking-wider mb-2 block">Full Name</label>
                    <div className="relative">
                      <UserCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
                      <input 
                        type="text"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                        className="w-full bg-white border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-blue-950 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black text-blue-400 tracking-wider mb-2 block">Age</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
                      <input 
                        type="number"
                        value={editForm.age}
                        onChange={(e) => setEditForm({...editForm, age: parseInt(e.target.value) || 0})}
                        className="w-full bg-white border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-blue-950 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                        placeholder="Age"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black text-blue-400 tracking-wider mb-2 block">Avatar Image URL</label>
                    <div className="relative">
                      <Camera size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
                      <input 
                        type="text"
                        value={editForm.avatar_url}
                        onChange={(e) => setEditForm({...editForm, avatar_url: e.target.value})}
                        className="w-full bg-white border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-blue-950 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button 
                    onClick={handleUpdate}
                    disabled={saving}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                  >
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                    ) : <Save size={16} />}
                    Save Profile
                  </button>
                  <button 
                    onClick={handleDelete}
                    disabled={saving}
                    className="p-3.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition-all active:scale-95"
                    title="Delete Account"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ) : (
              /* Professional Grid View Mode */
              <>
                {/* Header */}
                <div className="fade-up-d1 mb-8">
                  <p className="text-blue-500/70 text-[11px] tracking-[0.25em] uppercase mb-2 font-bold">
                    Official Profile
                  </p>
                  <h1 className="profile-name blue-line text-4xl font-light text-blue-950 leading-tight">
                    {profile.full_name}
                  </h1>
                </div>

                {/* Info Grid */}
                <div className="fade-up-d2 grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white border border-blue-50 shadow-sm">
                    <Mail size={16} className="text-blue-400 mb-1" />
                    <span className="text-[10px] uppercase text-blue-400 font-black tracking-wider">Email</span>
                    <span className="text-sm text-blue-900 font-medium truncate">{profile.email}</span>
                  </div>

                  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white border border-blue-50 shadow-sm">
                    <Clock size={16} className="text-blue-400 mb-1" />
                    <span className="text-[10px] uppercase text-blue-400 font-black tracking-wider">Age</span>
                    <span className="text-sm text-blue-900 font-medium">{profile.age || 'Not set'} yrs</span>
                  </div>

                  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white border border-blue-50 shadow-sm">
                    <ShieldCheck size={16} className="text-blue-400 mb-1" />
                    <span className="text-[10px] uppercase text-blue-400 font-black tracking-wider">Status</span>
                    <span className="text-sm text-blue-600 font-bold">Verified</span>
                  </div>

                  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white border border-blue-50 shadow-sm">
                    <Hash size={16} className="text-blue-400 mb-1" />
                    <span className="text-[10px] uppercase text-blue-400 font-black tracking-wider">User ID</span>
                    <span className="text-[10px] text-blue-900/40 font-mono">ID-{profile.id.substring(0, 8)}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="fade-up-d2 pt-6 border-t border-blue-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Calendar size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-blue-400 font-bold">Member Since</p>
                      <p className="text-xs text-blue-950 font-medium">{new Date(profile.created_at).getFullYear()}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-bold"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;