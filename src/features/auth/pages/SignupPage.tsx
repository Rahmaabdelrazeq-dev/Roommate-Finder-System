import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import type { SignupCredentials } from '../types/types';

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupCredentials>();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignupCredentials) => {
    try {
      setGlobalError(null);
      await authService.signUp(data);
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      setGlobalError(err.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white font-sans">
      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-24 lg:flex-none lg:w-[600px] xl:w-[700px]">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
              Find your next home.
            </h2>
            <p className="text-lg text-gray-500">
              Join the community and find compatible roommates in minutes.
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold mb-2">Check your email!</h3>
              <p className="text-green-700">We've sent a confirmation link to your email. Redirecting you to the homepage...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {globalError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-sm font-medium shadow-sm">
                  {globalError}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  {...register("fullName", { required: "Full name is required" })}
                  className={`block w-full rounded-xl border px-4 py-3.5 text-gray-900 bg-gray-50 outline-none transition-all hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent ${errors.fullName ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500' : 'border-gray-200'}`}
                  placeholder="e.g. John Doe"
                />
                {errors.fullName && <p className="mt-2 text-sm font-medium text-red-500">{errors.fullName.message}</p>}
              </div>

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

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 px-6 mt-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-900 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-black/20 disabled:opacity-70 disabled:transform-none disabled:hover:bg-black disabled:shadow-none"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <p className="mt-8 text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-black hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex relative flex-1 bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070" 
          alt="Modern Living Room" 
          className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="relative w-full flex items-end p-16 xl:p-24 pb-24">
          <blockquote className="text-white max-w-2xl">
            <p className="text-3xl xl:text-4xl font-light leading-snug mb-6 text-white/95">
              "The easiest way I've ever found a roommate. The filtering actually works, and the community is fantastic."
            </p>
            <footer className="text-xl font-medium tracking-wide">
              Sarah J. <span className="text-white/60 font-normal ml-2">Brooklyn, NY</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;