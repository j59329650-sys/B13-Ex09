"use client";

import React from 'react';
// Swiper React কম্পোনেন্ট ইমপোর্ট
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper এর প্রয়োজনীয় মডিউল ইমপোর্ট
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper এর নিজস্ব CSS ইমপোর্ট
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
  // ব্যানারের জন্য কিছু আকর্ষণীয় ডেমো ডাটা
  const bannerSlides = [
    {
      id: "d1",
      title: "Your Health Is Our Top Priority",
      description: "Find and book appointments with the country's best specialized doctors. Get world-class healthcare right at your fingertips.",
      bgImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "d2",
      title: "Expert Doctors, Specialized Care",
      description: "Whether it's Cardiology, Dermatology, or Pediatrics—we connect you with trusted professionals tailored to your needs.",
      bgImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "d3",
      title: "24/7 Digital Booking System",
      description: "Skip the long hospital queues. Manage your appointments, view patient reviews, and connect with doctors easily.",
      bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    }
  ];
  const handleBooking = (slideTitle) => {
        // ডাটাবেজে যে ডাটা পাঠাতে চান তার একটি অবজেক্ট
        const bookingInfo = {
            serviceName: slideTitle, // স্লাইডারের টাইটেল বা ডক্টরের নাম
            patientName: "Tahmina", // সাময়িকভাবে আপনার নাম বা যেকোনো নাম
            email: "tahmina.learn@gmail.com",
            date: "2026-05-25",
            status: "pending"
        };

        // fetch দিয়ে ব্যাকএন্ড সার্ভারে ডাটা পাঠানো হচ্ছে
       fetch('https://b13-a09.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.insertedId) {
                alert('আপনার অ্যাপয়েন্টমেন্ট সফলভাবে ডাটাবেজে বুক করা হয়েছে!');
            }
        })
        .catch(error => {
            console.error('ডাটা পাঠাতে সমস্যা হয়েছে:', error);
            alert('সার্ভার কানেকশনে সমস্যা হচ্ছে, নিশ্চিত হয়ে নিন ব্যাকএন্ড সার্ভার সচল আছে কি না।');
        });
    };

  return (
    <div className="w-full h-[500px] md:h-[600px] bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={'fade'} // স্লাইড চেঞ্জ হওয়ার সময় সুন্দর একটা ফেড ইফেক্ট দেবে
        spaceBetween={0}
        slidesPerView={1}
        navigation={true} // ডানে-বামে যাওয়ার বাটন
        pagination={{ clickable: true }} // নিচে গোল গোল ডট বাটন
        autoplay={{
          delay: 4000, // ৪ সেকেন্ড পর পর অটো চেঞ্জ হবে
          disableOnInteraction: false,
        }}
        className="mySwiper w-full h-full"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* ব্যাকগ্রাউন্ড ইমেজ এবং ডার্ক ওভারলে */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <div className="absolute inset-0 bg-black/60"></div> 
            </div>

            {/* ব্যানারের ভেতরের টেক্সট কন্টেন্ট */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight drop-shadow-md">
                {slide.title}
              </h1>
              <p className="mt-4 text-sm md:text-lg max-w-2xl text-gray-200 drop-shadow-sm">
                {slide.description}
              </p>
              <div className="mt-8 flex gap-4">
               <a 
        href={`/doctor/${slide.id}`} 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition text-center shadow-md cursor-pointer"
    >
        Book Appointment
    </a>
                <a 
                  href="#doctors-section" 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
                >
                  See Our Doctors
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero; 