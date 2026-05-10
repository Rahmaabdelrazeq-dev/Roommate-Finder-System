import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { MOCK_ROOMS } from '../mockData';

const HomePage = () => {
  // Only show first 3 rooms as featured
  const featuredRooms = MOCK_ROOMS.slice(0, 3);

  return (
    <div className="h-full w-full bg-gradient-to-b from-white via-blue-50/20 to-white font-sans">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] bg-indigo-100/30 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-8 border border-blue-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Over 2,000+ rooms available
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-[#2d2d2d] tracking-tighter mb-8 leading-[0.9] max-w-4xl">
            Find your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400">living space</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-12 font-medium leading-relaxed">
            Connect with verified roommates and discover the most affordable, 
            premium living spaces in the heart of the city.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
             <div className="flex -space-x-3 items-center mr-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shadow-sm">
                  +10k
                </div>
             </div>
             <p className="text-sm font-bold text-gray-400 max-w-[120px] text-left leading-tight">
               Joined by over <span className="text-[#2d2d2d]">10,000+</span> users this month
             </p>
          </div>
        </div>
      </div>


      {/* Featured Content Area */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="flex flex-col">
            <h2 className="text-4xl font-black text-[#2d2d2d] tracking-tight">Featured Spaces</h2>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">
              Hand-picked premium listings for you
            </p>
          </div>

          <Link 
            to="/search" 
            className="group flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-700 transition-colors"
          >
            Explore all rooms
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <ChevronRight size={16} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple ChevronRight for the link above if lucide isn't imported
const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default HomePage;


