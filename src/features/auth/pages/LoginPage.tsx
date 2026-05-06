import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import type { LoginCredentials } from '../types/types';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setGlobalError(null);
      await authService.signIn(data);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
      setGlobalError(err.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white font-sans">
      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-24 lg:flex-none lg:w-[600px] xl:w-[700px]">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
              Welcome back.
            </h2>
            <p className="text-lg text-gray-500">
              Log in to continue finding your perfect roommate.
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold mb-2">Login Successful!</h3>
              <p className="text-green-700">You are now securely logged in. Redirecting to homepage...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {globalError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-sm font-medium shadow-sm">
                {globalError}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                className={`block w-full rounded-xl border px-4 py-3.5 text-gray-900 bg-gray-50 outline-none transition-all hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent ${errors.email ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500' : 'border-gray-200'}`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm font-medium text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  }
                })}
                type="password"
                className={`block w-full rounded-xl border px-4 py-3.5 text-gray-900 bg-gray-50 outline-none transition-all hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent ${errors.password ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500' : 'border-gray-200'}`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-2 text-sm font-medium text-red-500">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between mt-2">
              <a href="#" className="text-sm font-medium text-black hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 px-6 mt-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-900 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-black/20 disabled:opacity-70 disabled:transform-none disabled:hover:bg-black disabled:shadow-none"
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
            
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-black hover:underline">
                Sign up
              </Link>
            </p>
          </form>
          )}
        </div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex relative flex-1 bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2069" 
          alt="Cozy Apartment" 
          className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="relative w-full flex items-end p-16 xl:p-24 pb-24">
          <blockquote className="text-white max-w-2xl">
            <p className="text-3xl xl:text-4xl font-light leading-snug mb-6 text-white/95">
              "Finding a roommate used to be a nightmare. Now, it's actually something I look forward to. Truly game-changing."
            </p>
            <footer className="text-xl font-medium tracking-wide">
              David M. <span className="text-white/60 font-normal ml-2">Austin, TX</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
