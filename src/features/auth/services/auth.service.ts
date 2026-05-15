import { supabase } from '@/lib/supabase';
import type { SignupCredentials, LoginCredentials } from '../types/types';

export const authService = {
async signUp({
  email,
  password,
  fullName,
  
}: SignupCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;

  // Create profile row
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id, // same auth id
        full_name: fullName,
        avatar_url: '',
      });

    if (profileError) {
      console.error(profileError);
      throw profileError;
    }
  }

  return data;
},

  async signIn({ email, password }: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },
};