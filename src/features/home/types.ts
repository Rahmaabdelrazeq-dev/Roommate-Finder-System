export interface Room {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency?: string;
  location: string;
  street?: string;
  city?: string;
  area?: string;
  country?: string;
  distance: string;
  type: string;
  imageUrl: string;
  amenities: string[];
  genderPreference: 'Male' | 'Female' | 'Mixed';
  postedBy: string;
  isVerified: boolean;
  bedrooms?: number;
  bathrooms?: number;
  billsIncluded?: boolean;
  availableDate?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
}
