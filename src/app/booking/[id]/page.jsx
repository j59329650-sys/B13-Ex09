"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const doctors = [
  { id: 1, name: "Dr. Ayesha Rahman", specialty: "Cardiologist", fee: 800 },
  { id: 2, name: "Dr. Tanvir Ahmed", specialty: "Neurologist", fee: 1000 },
  { id: 3, name: "Dr. Sadiya Afrin", specialty: "Pediatrician", fee: 600 },
  { id: 4, name: "Dr. Kamrul Hasan", specialty: "Dermatologist", fee: 700 },
  { id: 5, name: "Dr. Fahmida Chowdhury", specialty: "Gynecologist", fee: 900 },
  { id: 6, name: "Dr. Rashedul Islam", specialty: "Orthopedic", fee: 1200 },
];

const BookingPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const doctor = doctors.find((d) => d.id === parseInt(id));

  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    problem: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.patientName || !form.email || !form.date) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);

    const bookingData = {
      ...form,
      doctorId: id,
      doctorName: doctor?.name,
      specialty: doctor?.specialty,
      fee: doctor?.fee,
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        setSuccess(true);
        setLoading(false);
        setForm({
          patientName: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          problem: "",
        });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-xl shadow-lg p-8">

        {/* Doctor Info */}
        {doctor && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-center">
            <h2 className="text-xl font-bold text-blue-700">{doctor.name}</h2>
            <p className="text-gray-500">{doctor.specialty}</p>
            <p className="text-green-600 font-semibold">Fee: ৳{doctor.fee}</p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Book Appointment
        </h2>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4 text-center font-medium">
            ✅ Appointment booked successfully!
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Patient Name *
            </label>
            <input
              name="patientName"
              placeholder="Enter your full name"
              value={form.patientName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email *
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Appointment Date *
            </label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Preferred Time
            </label>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Problem Description
            </label>
            <textarea
              name="problem"
              placeholder="Describe your health problem..."
              value={form.problem}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

          <button
            onClick={() => router.back()}
            className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 font-medium"
          >
            ← Go Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;