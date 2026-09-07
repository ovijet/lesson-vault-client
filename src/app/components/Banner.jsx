"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// import {
//   FaArrowRight,
//   FaBookOpen,
//   FaUsers,
//   FaLightbulb,
//   FaSparkles,
// } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Discover. Learn. Inspire.",
    subtitle: "Every Lesson Makes You Stronger",
    desc: "Explore inspiring real-world life lessons shared by people around the globe. Learn from authentic experiences and elevate your mindset daily.",
    img: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
  },
  {
    title: "Share Your Journey",
    subtitle: "Your Experience Can Impact Lives",
    desc: "Turn your triumphs, career milestones, and hard-earned wisdom into valuable guidance for thousands of aspiring learners.",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
  {
    title: "Grow Together",
    subtitle: "A Thriving Global Community",
    desc: "Read, reflect, upvote, and connect with lifelong learners building a brighter future through shared wisdom.",
    img: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
  },
];

const Banner = () => {
  return (
    <section className="bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/50 py-16 lg:py-20 relative overflow-hidden font-sans">
      {/* Background Decorative Ambient Blurs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="banner-swiper pb-12"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="grid lg:grid-cols-12 items-center gap-12 lg:gap-16">
                {/* Left Content (7 cols) */}
                <div className="lg:col-span-7 text-left">
                  <span className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 border border-emerald-200/80 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6">
                    {/* <FaSparkles className="text-emerald-600 text-xs" /> */}{" "}
                    Share Wisdom • Elevate Minds
                  </span>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-slate-900 tracking-tight">
                    {slide.title}
                  </h1>

                  <h2 className="text-xl sm:text-2xl text-emerald-600 font-bold mt-3">
                    {slide.subtitle}
                  </h2>

                  <p className="text-slate-600 mt-5 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <Link href="/public-lessons">
                      <button className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl px-8 py-4 shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-105 cursor-pointer text-sm sm:text-base">
                        Explore Lessons
                        {/* <FaArrowRight className="text-sm" /> */}
                      </button>
                    </Link>

                    <Link href="/dashboard/user/add-lesson">
                      <button className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-800 font-bold border-2 border-emerald-600/30 hover:border-emerald-600 rounded-2xl px-7 py-3.5 shadow-xs transition-all duration-300 hover:scale-105 cursor-pointer text-sm sm:text-base">
                        Share Your Lesson
                      </button>
                    </Link>
                  </div>

                  {/* Dynamic Stats Badges */}

                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 text-center transition-all hover:shadow-md hover:border-emerald-300">
                      {/* <FaBookOpen className="text-2xl text-emerald-600 mx-auto mb-2" /> */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        500+
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                        Lessons Shared
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 text-center transition-all hover:shadow-md hover:border-emerald-300">
                      {/* <FaUsers className="text-2xl text-teal-600 mx-auto mb-2" /> */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        2K+
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                        Active Learners
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 text-center transition-all hover:shadow-md hover:border-emerald-300">
                      {/* <FaLightbulb className="text-2xl text-amber-500 mx-auto mb-2" /> */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        100%
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                        Verified Wisdom
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Image Feature (5 cols) */}

                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-300/50 rounded-full blur-2xl opacity-60"></div>

                  <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-teal-300/40 rounded-full blur-2xl opacity-50"></div>

                  <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl p-6 transition-all hover:scale-[1.02]">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-80 sm:h-96 object-cover rounded-[1.8rem] shadow-md"
                    />

                    <div className="absolute bottom-10 left-10 right-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Lesson Highlight
                        </p>
                        <p className="text-sm font-bold truncate max-w-[200px]">
                          {slide.subtitle}
                        </p>
                      </div>
                      <span className="text-xs bg-emerald-500 text-slate-950 font-extrabold px-2.5 py-1 rounded-lg">
                        Daily Top
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
