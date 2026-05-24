"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase.config";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBooking, setEditBooking] = useState(null);
  const [profileForm, setProfileForm] = useState({ name: "", photo: "" });
  const [activeTab, setActiveTab] = useState("bookings");
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
        return;
      }
      setUser(firebaseUser);
      setProfileForm({
        name: firebaseUser.displayName || "",
        photo: firebaseUser.photoURL || "",
      });
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/bookings", {
          headers: { authorization: "Bearer " + token },
        });
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/bookings/" + id, {
      method: "DELETE",
      headers: { authorization: "Bearer " + token },
    });
    setBookings(bookings.filter((b) => b._id !== id));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/bookings/" + editBooking._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(editBooking),
    });
    setBookings(bookings.map((b) => b._id === editBooking._id ? editBooking : b));
    setEditBooking(null);
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: profileForm.name,
        photoURL: profileForm.photo,
      });
      await fetch("http://localhost:5000/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: profileForm.name,
          photo: profileForm.photo,
        }),
      });
      setUser({ ...user, displayName: profileForm.name, photoURL: profileForm.photo });
      setProfileMsg("Profile updated successfully!");
    } catch (err) {
      setProfileMsg("Update failed!");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-blue-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6 mb-6 flex items-center gap-4">
          <img
            src={user?.photoURL || "https://placehold.co/80x80?text=User"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-200"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {user?.displayName || "User"}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("bookings")}
            className={activeTab === "bookings" ? "px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white" : "px-6 py-2 rounded-lg font-semibold bg-white text-gray-600 border"}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={activeTab === "profile" ? "px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white" : "px-6 py-2 rounded-lg font-semibold bg-white text-gray-600 border"}
          >
            Edit Profile
          </button>
        </div>

        {activeTab === "bookings" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              My Bookings ({bookings.length})
            </h3>
            {bookings.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center">
                <p className="text-gray-400 text-lg">No bookings yet!</p>
                <a href="/appointments" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">
                  Book Now
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white rounded-xl shadow p-6">
                    {editBooking && editBooking._id === booking._id ? (
                      <div className="space-y-3">
                        <input
                          type="date"
                          value={editBooking.date}
                          onChange={(e) => setEditBooking({ ...editBooking, date: e.target.value })}
                          className="w-full border rounded-lg px-4 py-2"
                        />
                        <input
                          type="time"
                          value={editBooking.time}
                          onChange={(e) => setEditBooking({ ...editBooking, time: e.target.value })}
                          className="w-full border rounded-lg px-4 py-2"
                        />
                        <textarea
                          value={editBooking.problem}
                          onChange={(e) => setEditBooking({ ...editBooking, problem: e.target.value })}
                          className="w-full border rounded-lg px-4 py-2 h-20"
                        />
                        <div className="flex gap-3">
                          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded-lg">Save</button>
                          <button onClick={() => setEditBooking(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">{booking.doctorName}</h4>
                          <p className="text-gray-500">{booking.specialty}</p>
                          <p className="text-sm text-gray-400">Date: {booking.date} Time: {booking.time}</p>
                          <p className="text-sm text-gray-400">Patient: {booking.patientName}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditBooking(booking)} className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">Edit</button>
                          <button onClick={() => handleDelete(booking._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Profile</h3>
            {profileMsg && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
                {profileMsg}
              </div>
            )}
            <div className="space-y-4">
              <input
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                value={profileForm.photo}
                onChange={(e) => setProfileForm({ ...profileForm, photo: e.target.value })}
                placeholder="Photo URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {profileForm.photo && (
                <img src={profileForm.photo} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
              )}
              <button
                onClick={handleProfileUpdate}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;