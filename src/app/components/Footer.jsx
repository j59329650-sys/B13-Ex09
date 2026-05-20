"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">DocAppoint</span>
        </div>

        {/* Middle Text */}
        <p className="text-gray-300 text-center">
          © 2025 DocAppoint. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 text-2xl">
          <a href="#" className="hover:text-blue-400">Facebook</a>
          <a href="#" className="hover:text-sky-400">X</a>
          <a href="#" className="hover:text-blue-300">LinkedIn</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;