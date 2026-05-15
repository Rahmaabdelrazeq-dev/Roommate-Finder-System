import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, Cake, User } from 'lucide-react';
import type { ProfileType } from '@/features/auth/types/profile';

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      setProfile(data);
    } catch (error) {
      console.error('Profile Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getProfile();
  }, [getProfile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-lg text-center">
          <User className="mx-auto text-gray-400 mb-4" size={40} />
          <h2 className="text-2xl font-bold">
            No Profile Found
          </h2>
          <p className="text-gray-500 mt-2">
            No profile data exists for this account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-100">
        
        <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

        <div className="relative p-8">
          <img
            src={
              profile.avatar_url ||
              `https://ui-avatars.com/api/?name=${profile.full_name}`
            }
            alt={profile.full_name}
            className="absolute -top-16 left-8 w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />

          <div className="pt-20">
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.full_name}
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back 👋
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Cake className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Age
                </p>

                <h3 className="font-bold text-lg">
                  {profile.age} years old
                </h3>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                <Calendar className="text-purple-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Joined
                </p>

                <h3 className="font-bold text-lg">
                  {new Date(
                    profile.created_at
                  ).toLocaleDateString()}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;