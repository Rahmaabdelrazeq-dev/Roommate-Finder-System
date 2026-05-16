export type ProfileType = {
  id: string;
  full_name: string;
  age: number;
  avatar_url: string;
  created_at: string;
  email?: string; // Derived from auth user
};