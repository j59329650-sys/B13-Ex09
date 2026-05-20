'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const DoctorDetails = () => {
    const { id } = useParams();

    // 🩺 আমাদের সেই ডক্টরদের ডাটা (আইডি মিলিয়ে তথ্য দেখানোর জন্য)
   const doctors = [
  { id: "d1", name: "Dr. Ayesha Rahman", specialty: "Cardiologist", degree: "MBBS, MD (Cardiology)", hospital: "Labaid Cardiac Hospital", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80" },
  { id: "d2", name: "Dr. Tanvir Ahmed", specialty: "Neurologist", degree: "MBBS, FCPS (Neurology)", hospital: "Dhaka Medical College", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80" },
  { id: "d3", name: "Dr. Sadiya Afrin", specialty: "Pediatrician", degree: "BCS (Health), MD (Pediatrics)", hospital: "Square Hospitals Ltd.", image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=500&q=80" },
  { id: "d4", name: "Dr. Kamrul Hasan", specialty: "Dermatologist", degree: "MBBS, DDV (Skin & VD)", hospital: "Ibn Sina Medical College", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80" },
  { id: "d5", name: "Dr. Fahmida Chowdhury", specialty: "Gynecologist", degree: "MBBS, FCPS (Gynae)", hospital: "Apollo Hospitals", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=500&q=80" },
  { id: "d6", name: "Dr. Rashedul Islam", specialty: "Orthopedic", degree: "MBBS, MS (Orthosurgery)", hospital: "National Institute of Orthopedics", image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=500&q=80" }
];

    // কারেন্ট আইডির সাথে মিলিয়ে ডক্টর খুঁজে বের করা
    const doctor = doctors.find(d => d.id === id) || doctors[0];

    const handleBooking = () => {
        alert(`আপনার অ্যাপয়েন্টমেন্ট সফলভাবে ডাটাবেজে বুক করা হয়েছে: ${doctor.name}`);
        // এখানে আপনার ডাটাবেজে ডাটা পাঠানোর (fetch) কোড লিখতে পারেন।
    };

    return (
        <div className="container mx-auto p-6 min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* বাম পাশ: ছবি ও নাম */}
                <div className="flex flex-col items-center justify-center">
                   <div className="w-full h-64 rounded-2xl overflow-hidden shadow-md mb-4">
   <img 
  src={doctor?.image} 
  alt={doctor?.name} 
  className="w-full h-full object-cover rounded-md"
/>
</div>
                    <h2 className="text-2xl font-bold text-gray-950 text-center">{doctor.name}</h2>
                    <p className={`${doctor.text} font-semibold mb-2`}>{doctor.specialty}</p>
                </div>

                {/* ডান পাশ: সব ডিটেইলস */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-1">Doctor Information</h3>
                        <p className="text-gray-600 text-sm"><span className="font-semibold text-gray-800">Degree:</span> {doctor.degree}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold text-gray-800">Experience:</span> {doctor.experience}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold text-gray-800">Hospital:</span> {doctor.hospital}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold text-gray-800">Availability:</span> {doctor.availability}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold text-gray-800">Visiting Fee:</span> <span className="text-green-600 font-bold">{doctor.fee}</span></p>
                    </div>

                    {/* বুকিং বাটন */}
                    <button 
                        onClick={handleBooking}
                        className="w-full bg-gray-950 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition mt-6 shadow-md"
                    >
                        Book Appointment Now
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DoctorDetails;