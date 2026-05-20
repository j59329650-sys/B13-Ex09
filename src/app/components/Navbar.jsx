"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../providers/AuthProvider'; // AuthContext আনা হলো

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // ইউজার এবং লগআউট ফাংশন

  const handleSignOut = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch(error => console.error(error));
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">DoctorAppoint</Link>
      </div>
      
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/appointments" className="hover:text-blue-600">All Appointment</Link>
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
      </div>

      <div className="flex items-center gap-4">
        {/* ইউজার লগইন থাকলে তার ছবি এবং লগআউট বাটন দেখাবে */}
        {user ? (
          <div className="flex items-center gap-3">
            <img 
              src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
              title={user?.displayName || "User"}
            />
            <span className="text-sm font-semibold text-gray-800">{user?.displayName}</span>
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          /* ইউজার লগইন না থাকলে Login ও Register বাটন দেখাবে */
          <div className="flex gap-2">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;