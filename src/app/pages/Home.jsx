import React from 'react';
import Link from 'next/link';
import Hero from '../components/Hero'; // ১. হিরো ব্যানার ইmport করুন
import doctorsData from '../doctors.json'; 

const HomePage = () => {
  const topRatedDoctors = doctorsData.slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      
      {/* ২. এখানে হিরো ব্যানার সেকশনটি বসিয়ে দিন */}
      <Hero />

      {/* --- Top Rated Doctors Section --- */}
      <section id="doctors-section" className="container mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Top Rated Doctors
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Take a look at our most qualified specialists and book your slot today.
        </p>
        
        {/* গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedDoctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between"
            >
              {/* ডাক্তারের ছবি */}
             <div className="w-full h-48 rounded-md overflow-hidden bg-gray-100 mb-4">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-full object-cover object-top"
        />
      </div>

              {/* ডাক্তারের বিস্তারিত তথ্য */}
              <div className="p-5 flex-grow">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {doctor.specialty}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Experience: {doctor.experience}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {doctor.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-700"><strong>Hospital:</strong> {doctor.hospital}</p>
                  <p className="text-sm text-gray-700"><strong>Fee:</strong> {doctor.fee} BDT</p>
                </div>
              </div>

              {/* View Details বাটন */}
              <div className="p-5 pt-0">
                <Link 
                 href={`/doctor/${doctor.id}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 rounded transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ================= ১. Our Services Section ================= */}
<section className="container mx-auto px-4 mt-20">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
    <p className="text-gray-500 mt-2">We provide a wide range of digital healthcare services tailored to your needs.</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* সার্ভিস ১ */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">🩺</div>
      <h3 className="text-lg font-semibold text-gray-800">Easy Booking</h3>
      <p className="text-gray-500 text-sm mt-2">Book appointments instantly with your favorite specialized doctors without any hassle.</p>
    </div>

    {/* সার্ভিস ২ */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 font-bold text-xl">💬</div>
      <h3 className="text-lg font-semibold text-gray-800">Online Chat</h3>
      <p className="text-gray-500 text-sm mt-2">Connect and consult with expert medical professionals online from the comfort of your home.</p>
    </div>

    {/* সার্ভিস ৩ */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 font-bold text-xl">📅</div>
      <h3 className="text-lg font-semibold text-gray-800">Flexible Schedule</h3>
      <p className="text-gray-500 text-sm mt-2">Choose the perfect date and time slot that fits comfortably into your busy routine.</p>
    </div>

    {/* সার্ভিস ৪ */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold text-xl">⏰</div>
      <h3 className="text-lg font-semibold text-gray-800">24/7 Support</h3>
      <p className="text-gray-500 text-sm mt-2">Our dedicated support team is always available to help you with your health bookings.</p>
    </div>
  </div>
</section>


{/* ================= ২. Why Choose Us Section ================= */}
<section className="bg-blue-50 py-16 mt-20">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* বাম পাশের ছবি (আপনি চাইলে যেকোনো ভালো মেডিকেল রিলেটেড ইমেজ লিংক দিতে পারেন) */}
      <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop" 
          alt="Why Choose Us"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ডান পাশের কন্টেন্ট */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose DocAppoint?</h2>
        <p className="text-gray-600 mb-6">We are committed to delivering the best healthcare experience through technology. Your trust and health are our ultimate priorities.</p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-1 text-sm mt-1">✓</div>
            <div>
              <h4 className="font-semibold text-gray-800">Verified Specialists Only</h4>
              <p className="text-gray-500 text-sm">Every doctor on our platform is strictly verified with proven background checks.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-1 text-sm mt-1">✓</div>
            <div>
              <h4 className="font-semibold text-gray-800">Instant Token Confirmation</h4>
              <p className="text-gray-500 text-sm">No waiting in long physical lines. Get your digital appointment token instantly.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-1 text-sm mt-1">✓</div>
            <div>
              <h4 className="font-semibold text-gray-800">Real Patient Reviews</h4>
              <p className="text-gray-500 text-sm">Read authentic feedback from other patients before booking your doctor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default HomePage;