import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center select-none cursor-pointer group" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* The letter 'R' */}
      <span className="text-[34px] font-bold tracking-[-0.04em] text-blue-600 group-hover:text-blue-700 transition-colors">
        R
      </span>

      {/* The Custom Search-O (Magnifying Glass) */}
      <div className="relative flex items-center justify-center w-[26px] h-[26px] mx-[1px] mt-[6px] group-hover:scale-105 transition-transform">
        {/* Outer Circle */}
        <div className="w-full h-full border-[5px] border-blue-600 group-hover:border-blue-700 rounded-full transition-colors"></div>
        {/* The Magnifying Glass Handle (The 'tail') */}
        <div 
          className="absolute -bottom-[2px] -right-[1px] w-[8px] h-[5px] bg-blue-600 group-hover:bg-blue-700 rounded-full transition-colors" 
          style={{ transform: 'rotate(45deg)' }}
        ></div>
      </div>

      {/* The letters 'omies' */}
      <span className="text-[34px] font-bold tracking-[-0.04em] text-blue-600 group-hover:text-blue-700 -ml-[1px] transition-colors">
        omies
      </span>
    </Link>
  );
};

export default Logo;
