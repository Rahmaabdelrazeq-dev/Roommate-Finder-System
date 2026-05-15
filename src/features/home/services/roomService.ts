import { supabase } from '@/lib/supabase';
import type { Room } from '../types';

export interface RoomFilters {
  location?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
}

export const roomService = {
  async fetchRooms(filters?: RoomFilters): Promise<Room[]> {
    try {
      // Fetch from 'listing' table
      const { data, error } = await supabase
        .from('listing')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        return [];
      }

      let rooms = (data || []).map(this.mapSupabaseRoom);

      // Client-side filtering
      if (filters) {
        rooms = rooms.filter(room => {
          const matchesLocation = !filters.location || room.location.toLowerCase().includes(filters.location.toLowerCase());
          const matchesMinPrice = !filters.minPrice || room.price >= Number(filters.minPrice);
          const matchesMaxPrice = !filters.maxPrice || room.price <= Number(filters.maxPrice);
          return matchesLocation && matchesMinPrice && matchesMaxPrice;
        });
      }

      return rooms;
    } catch (err) {
      console.error('Room service error:', err);
      return [];
    }
  },

  async fetchFeaturedRooms(): Promise<Room[]> {
    try {
      const { data, error } = await supabase
        .from('listing')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch featured error:', error);
        return [];
      }

      return (data || []).map(this.mapSupabaseRoom);
    } catch (err) {
      console.error('Room service featured error:', err);
      return [];
    }
  },

  async fetchRoomById(id: string): Promise<Room | null> {
    try {
      const { data, error } = await supabase
        .from('listing')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase fetch room by id error:', error);
        return null;
      }

      return data ? this.mapSupabaseRoom(data) : null;
    } catch (err) {
      console.error('Room service fetchById error:', err);
      return null;
    }
  },

  mapSupabaseRoom(item: any): Room {
    // Parse comma-separated amenities string from DB
    let parsedAmenities: string[] = [];
    if (typeof item.amenities === 'string') {
      parsedAmenities = item.amenities.split(',').map((a: string) => a.trim()).filter(Boolean);
    } else if (Array.isArray(item.amenities)) {
      parsedAmenities = item.amenities;
    }

    // Build location string
    const locationStr = item.street ? `${item.street}, ${item.city}` : (item.city || 'Unknown Location');

    return {
      id: item.id?.toString() ?? '',
      title: item.title ?? 'Untitled Space',
      description: item.description ?? '',
      price: item.price ?? 0,
      currency: item.currency ?? 'EGP',
      location: locationStr,
      street: item.street ?? '',
      city: item.city ?? '',
      area: item.area ?? '',
      country: item.country ?? '',
      distance: '',
      type: item.room_type ?? 'Private Room',
      imageUrl: item.image ?? 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      amenities: parsedAmenities.length > 0 ? parsedAmenities : ['WiFi'],
      genderPreference: item.gender_preference ?? 'Mixed',
      postedBy: item.user_id ? 'Verified Host' : 'Anonymous',
      isVerified: item.is_verified ?? false,
      bedrooms: item.bedrooms ?? 1,
      bathrooms: item.bathrooms ?? 1,
      billsIncluded: item.bills_included ?? false,
      availableDate: item.available_date ?? '',
      latitude: item.latitude ?? null,
      longitude: item.longitude ?? null,
      createdAt: item.created_at ?? '',
    };
  }
};
