"use client"; // Next.js-এ ক্লায়েন্ট সাইড স্টেট এবং ফাংশন ব্যবহারের জন্য

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../providers/AuthProvider'; // AuthContext ইম্পোর্ট

const Login = () => {
  const router = useRouter();
  const { signInUser, signInWithGoogle } = useContext(AuthContext); // ফায়ারবেসের লগইন ফাংশনসমূহ
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // ১. ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(result => {
        setSuccess(true);
        console.log("Logged In User:", result.user);
        form.reset();
        // সফল হলে ১.৫ সেকেন্ড পর হোম পেজে নিয়ে যাবে
        setTimeout(() => {
          router.push('/');
        }, 1500);
      })
      .catch(err => {
        console.error(err);
        if (err.code === 'auth/invalid-credential') {
          setError('ইমেইল অথবা পাসওয়ার্ডটি সঠিক নয়। আবার চেষ্টা করুন।');
        } else {
          setError(err.message);
        }
      });
  };

  // ২. গুগল দিয়ে সরাসরি লগইন (Google Sign-In)
  const handleGoogleLogin = () => {
    setError('');
    setSuccess(false);
    
    signInWithGoogle()
      .then(result => {
        setSuccess(true);
        console.log("Google Logged In User:", result.user);
        setTimeout(() => {
          router.push('/');
        }, 1500);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <div className="bg-red-50 p-3 rounded-md border border-red-200">
                <p className="text-sm text-red-600 font-medium text-center">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <p className="text-sm text-green-600 font-medium text-center">সফলভাবে লগইন হয়েছে! হোম পেজে পাঠানো হচ্ছে...</p>
              </div>
            )}

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Social Login Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in with</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleLogin} // গুগলের ফাংশন হ্যান্ডলার
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.94 1 12 1 7.24 1 3.2 3.73 1.24 7.72l3.8 2.95c.9-2.7 3.4-4.63 6.96-4.63z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57l3.75 2.91c2.2-2.02 3.7-5.01 3.7-8.63z"/>
                  <path fill="#FBBC05" d="M5.04 14.77c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27L1.24 7.28C.44 8.9 0 10.7 0 12.5s.44 3.6 1.24 5.22l3.8-2.95z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.75-2.91c-1.04.7-2.37 1.12-4.21 1.12-3.56 0-6.06-1.93-6.96-4.63l-3.8 2.95C3.2 20.27 7.24 23 12 23z"/>
                </svg>
                Google
              </button>
            </div>
          </div>

          {/* Toggle to Register page */}
          <p className="mt-6 text-center text-sm text-gray-600">
            New to DocAppoint?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;