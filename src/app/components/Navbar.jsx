"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DocAppoint
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link href="/appointments" className="text-gray-600 hover:text-blue-600 font-medium">
            All Appointments
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
              <img
                src={user.photoURL || "https://placehold.co/40x40?text=U"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-300"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 text-2xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-4 pb-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            href="/appointments"
            onClick={() => setMenuOpen(false)}
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            All Appointments
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "https://placehold.co/40x40?text=U"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-600 text-sm">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;