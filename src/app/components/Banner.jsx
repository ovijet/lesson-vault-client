"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Discover. Learn. Inspire.",
    subtitle: "Every Lesson Makes You Stronger",
    desc: "Explore inspiring real-world life lessons shared by people around the globe. Learn from authentic experiences and elevate your mindset daily.",
    img: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
    badge: "Share Wisdom • Elevate Minds",
  },
  {
    title: "Share Your Journey",
    subtitle: "Your Experience Can Impact Lives",
    desc: "Turn your triumphs, career milestones, and hard-earned wisdom into valuable guidance for thousands of aspiring learners.",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    badge: "Empower The Next Gen",
  },
  {
    title: "Grow Together Daily",
    subtitle: "A Thriving Global Community",
    desc: "Read, reflect, upvote, and connect with lifelong learners building a brighter future through shared wisdom.",
    img: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
    badge: "Interactive Community Vault",
  },
];

const Banner = () => {
  return (
    <section className="bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/50 py-12 lg:py-16 relative overflow-hidden font-sans border-b border-slate-100">
      {/* Ambient Background Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="banner-swiper pb-12"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="grid lg:grid-cols-12 items-center gap-10 lg:gap-14">
                {/* Left Content Column */}
                <div className="lg:col-span-7 text-left">
                  <span className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-800 border border-emerald-200/90 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6 shadow-xs">
                    <HiSparkles className="text-emerald-600 text-xs" />
                    {slide.badge}
                  </span>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] text-slate-900 tracking-tight">
                    {slide.title.split(".")[0]}
                    {slide.title.includes(".") && (
                      <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        .{slide.title.split(".").slice(1).join(".")}
                      </span>
                    )}
                  </h1>

                  <h2 className="text-xl sm:text-2xl text-emerald-600 font-bold mt-3">
                    {slide.subtitle}
                  </h2>

                  <p className="text-slate-600 mt-5 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <Link href="/public-lessons">
                      <button className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl px-8 py-4 shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-105 cursor-pointer text-sm sm:text-base">
                        Explore Lessons
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>

                    <Link href="/login">
                      <button className="flex items-center gap-2 bg-white hover:bg-emerald-50/80 text-emerald-800 font-bold border-2 border-emerald-600/30 hover:border-emerald-600 rounded-2xl px-7 py-3.5 shadow-xs transition-all duration-300 hover:scale-105 cursor-pointer text-sm sm:text-base">
                        Share Your Lesson
                      </button>
                    </Link>
                  </div>

                  {/* Dynamic Stats Badges */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-10">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 text-center transition-all hover:shadow-md hover:border-emerald-300 group">
                      <FaBookOpen className="text-xl sm:text-2xl text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        500+
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                        Lessons Shared
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 text-center transition-all hover:shadow-md hover:border-emerald-300 group">
                      <FaUsers className="text-xl sm:text-2xl text-teal-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        2K+
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                        Active Learners
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 text-center transition-all hover:shadow-md hover:border-emerald-300 group">
                      <FaLightbulb className="text-xl sm:text-2xl text-amber-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        100%
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                        Verified Wisdom
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Image Container */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-300/50 rounded-full blur-2xl opacity-60"></div>
                  <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-teal-300/40 rounded-full blur-2xl opacity-50"></div>

                  <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl p-5 sm:p-6 transition-all hover:scale-[1.02] duration-300">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-80 sm:h-96 object-cover rounded-[1.8rem] shadow-md"
                    />

                    <div className="absolute bottom-9 left-9 right-9 bg-slate-950/85 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
                          Daily Highlight
                        </p>
                        <p className="text-xs sm:text-sm font-bold truncate max-w-[190px]">
                          {slide.subtitle}
                        </p>
                      </div>
                      <span className="text-[11px] bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black px-3 py-1 rounded-xl shadow-xs">
                        Top Rated
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
