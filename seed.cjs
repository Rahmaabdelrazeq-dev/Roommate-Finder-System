const { createClient } = require('@supabase/supabase-js');

const MOCK_ROOMS = [
  {
    id: '1',
    title: 'Modern Studio in Lower Manhattan',
    price: 2400,
    location: 'New York, NY',
    distance: '0.5 miles away',
    type: 'Entire Studio',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    amenities: ['Wifi', 'Kitchen', 'Air Conditioning', 'Washer'],
    genderPreference: 'Mixed',
    postedBy: 'Sarah Johnson',
    isVerified: true,
  },
  {
    id: '2',
    title: 'Cozy Room in Shared Brooklyn House',
    price: 1200,
    location: 'Brooklyn, NY',
    distance: '2.1 miles away',
    type: 'Private Room',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    amenities: ['Wifi', 'Kitchen', 'Pet Friendly'],
    genderPreference: 'Female',
    postedBy: 'Mike Chen',
    isVerified: false,
  },
  {
    id: '3',
    title: 'Luxury Apartment near Central Park',
    price: 3500,
    location: 'New York, NY',
    distance: '0.2 miles away',
    type: 'Entire Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    amenities: ['Gym', 'Pool', 'Wifi', 'Kitchen', 'Parking'],
    genderPreference: 'Mixed',
    postedBy: 'Alex Rivera',
    isVerified: true,
  },
  {
    id: '4',
    title: 'Sunny Bedroom in Queens',
    price: 950,
    location: 'Queens, NY',
    distance: '4.5 miles away',
    type: 'Private Room',
    imageUrl: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=800',
    amenities: ['Wifi', 'Utilities Included'],
    genderPreference: 'Mixed',
    postedBy: 'John Smith',
    isVerified: false,
  },
  {
    id: '5',
    title: 'Minimalist Loft in SoHo',
    price: 4200,
    location: 'New York, NY',
    distance: '1.2 miles away',
    type: 'Entire Loft',
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
    amenities: ['Elevator', 'Wifi', 'Kitchen'],
    genderPreference: 'Mixed',
    postedBy: 'Elena Rossi',
    isVerified: true,
  },
  {
    id: '6',
    title: 'Charming Flat in West Village',
    price: 2800,
    location: 'New York, NY',
    distance: '0.8 miles away',
    type: 'Private Room',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    amenities: ['Fireplace', 'Wifi', 'Kitchen'],
    genderPreference: 'Female',
    postedBy: 'Chloe Dubois',
    isVerified: true,
  }
];

const supabase = createClient(
  'https://jbfglgvuokdhcxddwsxk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZmdsZ3Z1b2tkaGN4ZGR3c3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5ODgyMDcsImV4cCI6MjA5MzU2NDIwN30.P3SH5OQofVGg9lej6zk4FB8SexWthoiXyfgmoc902IU'
);

async function seed() {
  const roomsToInsert = MOCK_ROOMS.map(r => ({
    title: r.title,
    price: r.price,
    city: r.location.split(',')[0],
    image: r.imageUrl,
    is_verified: r.isVerified
  }));

  const { data, error } = await supabase.from('listing').insert(roomsToInsert).select();
  if (error) {
    console.error('Error inserting:', error);
  } else {
    console.log('Inserted:', data.length);
  }
}

seed();
