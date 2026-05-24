"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const doctors = [
  { id: 1, name: "Dr. Ayesha Rahman", specialty: "Cardiologist", degree: "MBBS, MD (Cardiology)", fee: 800, experience: "10 years", hospital: "Dhaka Medical College", image: "" },
  { id: 2, name: "Dr. Tanvir Ahmed", specialty: "Neurologist", degree: "MBBS, FCPS (Neurology)", fee: 1000, experience: "8 years", hospital: "Square Hospital", image: "" },
  { id: 3, name: "Dr. Sadiya Afrin", specialty: "Pediatrician", degree: "BCS (Health), MD (Pediatrics)", fee: 600, experience: "6 years", hospital: "Shishu Hospital", image: "" },
  { id: 4, name: "Dr. Kamrul Hasan", specialty: "Dermatologist", degree: "MBBS, DDV", fee: 700, experience: "7 years", hospital: "Popular Hospital", image: "" },
  { id: 5, name: "Dr. Fahmida Chowdhury", specialty: "Gynecologist", degree: "MBBS, FCPS (Gynae)", fee: 900, experience: "12 years", hospital: "Evercare Hospital", image: "" },
  { id: 6, name: "Dr. Rashedul Islam", specialty: "Orthopedic", degree: "MBBS, MS (Orthosurgery)", fee: 1200, experience: "15 years", hospital: "BIRDEM Hospital", image: "" },
];

const DoctorDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const doctor = doctors.find((d) => d.id === parseInt(id));

  if (!doctor) return (
    <p className="text-center mt-20 text-red-500 text-xl">Doctor not found!</p>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-xl shadow-lg p-8">
        
        <img
          src={doctor.image || "https://placehold.co/300x200?text=Doctor"}
          alt={doctor.name}
          className="w-40 h-40 rounded-full mx-auto object-cover mb-6 border-4 border-blue-200"
        />
        
        <h1 className="text-3xl font-bold text-center text-gray-800">{doctor.name}</h1>
        <p className="text-center text-blue-600 font-medium mt-1 mb-6">{doctor.specialty}</p>

        <div className="space-y-3 text-gray-600 text-lg">
          <p><span className="font-semibold">📚 Degree:</span> {doctor.degree}</p>
          <p><span className="font-semibold">⏱ Experience:</span> {doctor.experience}</p>
          <p><span className="font-semibold">🏥 Hospital:</span> {doctor.hospital}</p>
          <p><span className="font-semibold">💰 Fee:</span> ৳{doctor.fee}</p>
        </div>

        <button
          onClick={() => router.push(`/booking/${doctor.id}`)}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg"
        >
          Book Appointment
        </button>

      </div>
    </div>
  );
};

export default DoctorDetails;