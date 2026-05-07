import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 via-white to-blue-50/30 font-sans">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#2d2d2d] tracking-tight mb-6 leading-tight">
          Find your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 drop-shadow-sm">roommate</span>.
        </h1>
        <p className="text-xl md:text-2xl text-blue-900/70 max-w-2xl mb-12 font-medium">
          The easiest, safest, and most effective way to find compatible roommates and great rooms in your city.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/signup" className="px-8 py-4 bg-[#2d2d2d] text-white text-lg font-bold rounded-xl hover:bg-[#1a1a1a] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto text-center">
            Get Started
          </Link>
        </div>
      </div>

      {/* Featured Cities/Placeholder */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-[#2d2d2d]">Explore nearby</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="bg-blue-100 h-64 rounded-3xl border border-blue-50 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100/50 mix-blend-multiply opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <div className="mt-4 px-1">
                <h3 className="font-bold text-lg text-[#2d2d2d]">City Name</h3>
                <p className="text-sm font-medium text-blue-600/80">1,200+ rooms</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
