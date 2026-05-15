import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, User } from 'lucide-react';
import type { ProfileType } from '@/features/auth/types/profile';

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

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
          setProfile(data);
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
        <div className="text-center p-12">
          <div className="w-16 h-16 rounded-full border border-blue-200 flex items-center justify-center mx-auto mb-5 bg-white">
            <User className="text-blue-300" size={24} />
          </div>
          <h2 className="text-blue-900/70 text-xl font-light tracking-wide">No Profile Found</h2>
          <p className="text-blue-900/40 text-sm mt-2 tracking-wide">No profile data exists for this account.</p>
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
          <div className="bg-[#f8fbff] rounded-b-[28px] border border-t-0 border-blue-100 px-8 pb-10 shadow-[0_8px_40px_rgba(59,130,246,0.08)]">

            {/* Avatar */}
            <div className="fade-up-d1" style={{ marginTop: '-44px', marginBottom: '24px' }}>
              <div className="avatar-ring w-24 h-24 rounded-full p-[2.5px] shadow-lg">
                <img
                  src={
                    profile.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}&background=eff6ff&color=3b82f6&bold=true`
                  }
                  alt={profile.full_name}
                  className="w-full h-full rounded-full object-cover bg-[#eff6ff]"
                />
              </div>
            </div>

            {/* Name & greeting */}
            <div className="fade-up-d1 mb-8">
              <p className="text-blue-500/70 text-[11px] tracking-[0.25em] uppercase mb-2 font-light">
                Profile
              </p>
              <h1 className="profile-name blue-line text-4xl font-light text-blue-950/85 leading-tight">
                {profile.full_name}
              </h1>
              <p className="text-blue-900/35 text-sm mt-4 tracking-wide font-light italic">
                Welcome back
              </p>
            </div>

            {/* Divider */}
            <div className="fade-up-d2 border-t border-blue-100 mb-6" />

            {/* Joined stat */}
            <div className="fade-up-d2">
              <div className="stat-card rounded-2xl px-5 py-4 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}
                >
                  <Calendar size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-[11px] text-blue-900/40 uppercase tracking-[0.18em] mb-0.5 font-light">
                    Member since
                  </p>
                  <p className="text-blue-900/70 text-sm font-light tracking-wide">
                    {new Date(profile.created_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;