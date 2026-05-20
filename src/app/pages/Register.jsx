"use client";

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../providers/AuthProvider'; 

const Register = () => {
  const router = useRouter();
  const { createUser, updateUserProfile } = useContext(AuthContext); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
  });

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordCriteria({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
   
    const password = form.password.value;

    
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setError('পাসওয়ার্ডের সব শর্ত পূরণ করা আবশ্যক।');
      return;
    }

    
    createUser(email, password)
      .then(result => {
        const defaultPhoto = "https://i.ibb.co.com/placeholder-profile.jpg";
        updateUserProfile(name, defaultPhoto)
          .then(() => {
            setSuccess(true);
            console.log("User Registered Successfully:", result.user);
            form.reset();
            
            setTimeout(() => {
              router.push('/');
            }, 2000);
          })
          .catch(err => setError(err.message));
      })
      .catch(err => {
        if(err.code === 'auth/email-already-in-use') {
          setError('এই ইমেইলটি দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে।');
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input name="name" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Tahmina" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input name="email" type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="you@example.com" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input name="password" type="password" required onChange={handlePasswordChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="••••••••" />
              <div className="mt-2 space-y-1 text-xs">
                <p className={passwordCriteria.length ? "text-green-600 font-semibold" : "text-gray-400"}>{passwordCriteria.length ? "✓" : "○"} Minimum 6 characters</p>
                <p className={passwordCriteria.uppercase ? "text-green-600 font-semibold" : "text-gray-400"}>{passwordCriteria.uppercase ? "✓" : "○"} At least 1 uppercase letter (A-Z)</p>
                <p className={passwordCriteria.lowercase ? "text-green-600 font-semibold" : "text-gray-400"}>{passwordCriteria.lowercase ? "✓" : "○"} At least 1 lowercase letter (a-z)</p>
              </div>
            </div>

            {error && <div className="bg-red-50 p-3 rounded border border-red-200 text-sm text-red-600 font-medium text-center">{error}</div>}
            {success && <div className="bg-green-50 p-3 rounded border border-green-200 text-sm text-green-600 font-medium text-center">অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! হোম পেজে পাঠানো হচ্ছে...</div>}

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">Register</button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;