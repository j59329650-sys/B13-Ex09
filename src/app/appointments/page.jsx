'use client';

import React from 'react';

const AllAppointments = () => {
    // 🩺 ডাক্তারদের ডাটার তালিকা (এখানে যত খুশি ডাক্তার বাড়াতে পারবেন, অটোমেটিক কার্ড তৈরি হবে)
   const doctors = [
    { id: 1, name: "Dr. Ayesha Rahman", specialty: "Cardiologist", degree: "MBBS, MD (Cardiology)", bg: "bg-blue-100", text: "text-blue-500", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Dr. Tanvir Ahmed", specialty: "Neurologist", degree: "MBBS, FCPS (Neurology)", bg: "bg-green-100", text: "text-green-500", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Dr. Sadiya Afrin", specialty: "Pediatrician", degree: "BCS (Health), MD (Pediatrics)", bg: "bg-purple-100", text: "text-purple-500", image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Dr. Kamrul Hasan", specialty: "Dermatologist", degree: "MBBS, DDV (Skin & VD)", bg: "bg-yellow-100", text: "text-yellow-600", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Dr. Fahmida Chowdhury", specialty: "Gynecologist", degree: "MBBS, FCPS (Gynae)", bg: "bg-pink-100", text: "text-pink-500", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Dr. Rashedul Islam", specialty: "Orthopedic", degree: "MBBS, MS (Orthosurgery)", bg: "bg-indigo-100", text: "text-indigo-500", image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=500&q=80" }
];

    return (
        <div className="container mx-auto p-6 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-center my-6 text-gray-800">All Available Doctors</h1>
            <p className="text-center text-gray-500 mb-8">Total Available Doctors: {doctors.length}</p>
            
            {/* 📊 ম্যাপ (Map) হয়ে অটোমেটিক কার্ড তৈরি হওয়ার গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {
                    doctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white border border-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
                            <div>
                                {/* আগের এই কোডটি কেটে দিন */}
<div className="w-full h-48 rounded-lg mb-4 overflow-hidden shadow-inner">
    <img 
        src={doctor.image} 
        alt={doctor.name} 
        className="w-full h-full object-cover object-top"
    />
</div>                          
 <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                                <p className={`${doctor.text} font-medium text-sm mb-2`}>{doctor.specialty}</p>
                                <p className="text-gray-500 text-sm mb-4">{doctor.degree}</p>
                            </div>
                            <a href={`/doctor/${doctor.id}`} className="w-full block text-center bg-blue-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition mt-auto">
    View Details
</a>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllAppointments;