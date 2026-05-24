"use client";

import { useState } from "react";

const AllAppointments = () => {
  const doctors = [
    { id: 1, name: "Dr. Ayesha Rahman", specialty: "Cardiologist", degree: "MBBS, MD (Cardiology)", bg: "bg-blue-100", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Dr. Tanvir Ahmed", specialty: "Neurologist", degree: "MBBS, FCPS (Neurology)", bg: "bg-green-100", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Dr. Sadiya Afrin", specialty: "Pediatrician", degree: "BCS (Health), MD (Pediatrics)", bg: "bg-purple-100", image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Dr. Kamrul Hasan", specialty: "Dermatologist", degree: "MBBS, DDV", bg: "bg-yellow-100", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop" },
    { id: 5, name: "Dr. Fahmida Chowdhury", specialty: "Gynecologist", degree: "MBBS, FCPS (Gynae)", bg: "bg-pink-100", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Dr. Rashedul Islam", specialty: "Orthopedic", degree: "MBBS, MS (Orthosurgery)", bg: "bg-indigo-100", image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=500&q=80" },
  ];

  const [search, setSearch] = useState("");

  const filtered = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center my-6 text-gray-800">
        All Available Doctors
      </h1>
      <p className="text-center text-gray-500 mb-4">
        Total Available Doctors: {filtered.length}
      </p>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by doctor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-red-400 text-lg">No doctor found!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filtered.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white border border-gray-100 p-6 rounded-xl shadow-md"
          >
            <div className={`w-full h-48 rounded-lg mb-4 overflow-hidden ${doctor.bg}`}>
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{doctor.specialty}</p>
            <p className="text-gray-500 text-sm mb-4">{doctor.degree}</p>
            <a
            href={`/doctor/${doctor.id}`}
              className="w-full block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        
              View Details
            
            </a>
              
        
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;