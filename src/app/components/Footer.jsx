"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">DocAppoint</span>
          <p className="text-gray-300 text-sm">Your trusted appointment platform</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold text-lg">Quick Links</p>
          <Link href="/" className="hover:text-blue-300">Home</Link>
          <Link href="/appointments" className="hover:text-blue-300">All Appointments</Link>
          <Link href="/dashboard" className="hover:text-blue-300">Dashboard</Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold text-lg">Contact Us</p>
          <p className="text-gray-300 text-sm">support@docappoint.com</p>
          <p className="text-gray-300 text-sm">+880 1700-000000</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-2xl">
          <a href="#" className="hover:text-blue-400">Facebook</a>
          <a href="#" className="hover:text-sky-400">X</a>
          <a href="#" className="hover:text-blue-300">LinkedIn</a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-700 pt-4">
        © 2025 DocAppoint. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;