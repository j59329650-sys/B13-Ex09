'use client'; // Next.js App Router-এ hooks ব্যবহার করতে এটি দিতে হয়

import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [bookings, setBookings] = useState([]);

    // 📥 ব্যাকএন্ড থেকে বুকিং ডেটা লোড করা (GET Request)
    useEffect(() => {
        fetch('http://localhost:5000/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(error => console.error('ডেটা লোড করতে সমস্যা:', error));
    }, []);

    // 🗑️ ডাটাবেজ থেকে অ্যাপয়েন্টমেন্ট বাতিল করার ফাংশন (DELETE Request)
    const handleDelete = (id) => {
        const proceed = window.confirm("আপনি কি নিশ্চিত যে এই অ্যাপয়েন্টমেন্টটি বাতিল করতে চান?");
        if (proceed) {
         fetch(`https://b13-a09.vercel.app/bookings/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert("অ্যাপয়েন্টমেন্টটি সফলভাবে বাতিল করা হয়েছে।");
                    // ডিলিট হওয়ার পর স্ক্রিন বা স্টেট থেকে ওই ডেটাটি সরিয়ে ফেলা
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining);
                }
            })
            .catch(error => console.error('ডিলিট করতে সমস্যা হচ্ছে:', error));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                <p className="text-gray-500 mb-6">Total Appointments Booked: {bookings.length}</p>

                {/* 📊 বুকিং ডেটার টেবিল */}
                <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                    <table className="table-auto w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-700">Serial</th>
                                <th className="p-4 font-semibold text-gray-700">Patient Name</th>
                                <th className="p-4 font-semibold text-gray-700">Service / Category</th>
                                <th className="p-4 font-semibold text-gray-700">Email</th>
                                <th className="p-4 font-semibold text-gray-700">Date</th>
                                <th className="p-4 font-semibold text-gray-700">Status</th>
                                <th className="p-4 font-semibold text-gray-700">Action</th> {/* নতুন কলাম */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center text-gray-500">
                                            No appointments found.
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking, index) => (
                                        <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                            <td className="p-4 text-gray-600 font-medium">{index + 1}</td>
                                            <td className="p-4 text-gray-900 font-semibold">{booking.patientName}</td>
                                            <td className="p-4 text-gray-700">{booking.serviceName}</td>
                                            <td className="p-4 text-gray-600">{booking.email}</td>
                                            <td className="p-4 text-gray-600">{booking.date}</td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold uppercase">
                                                    {booking.status || 'pending'}
                                                </span>
                                            </td>
                                            {/* 🎯 নতুন Cancel বাটন অ্যাকশন */}
                                            <td className="p-4">
                                                <button 
                                                    onClick={() => handleDelete(booking._id)} 
                                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-semibold transition"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;