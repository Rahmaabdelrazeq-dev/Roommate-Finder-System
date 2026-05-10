export interface Room {
  id: string;
  title: string;
  price: number;
  location: string;
  distance: string;
  type: string;
  imageUrl: string;
  amenities: string[];
  genderPreference: 'Male' | 'Female' | 'Mixed';
  postedBy: string;
  isVerified: boolean;
}
