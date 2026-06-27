"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import {
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Discover. Learn. Inspire.",
    subtitle: "Every Lesson Makes You Stronger",
    desc: "Explore inspiring life lessons shared by people around the world. Learn from real experiences and grow every day.",
    img: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
  },
  {
    title: "Share Your Journey",
    subtitle: "Your Story Can Change Lives",
    desc: "Turn your experiences into valuable lessons and inspire others through your personal journey.",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
  {
    title: "Grow Together",
    subtitle: "A Community That Learns",
    desc: "Read, share and connect with thousands of learners building a better future together.",
    img: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
  },
];

const Banner = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-emerald-100 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500 }}
          pagination={{ clickable: true }}
          loop
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="grid lg:grid-cols-2 items-center gap-16">

                {/* Left */}
                <div>

                  <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                    ✨ Learn • Share • Grow
                  </span>

                  <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                    {slide.title}
                  </h1>

                  <h2 className="text-2xl text-green-600 font-semibold mt-4">
                    {slide.subtitle}
                  </h2>

                  <p className="text-gray-600 mt-6 text-lg leading-8 max-w-xl">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap gap-5 mt-10">

                    <Link href="/public-lessons">
                      <button className="btn btn-success rounded-full px-8 text-white">
                        Explore Lessons
                        <FaArrowRight />
                      </button>
                    </Link>

                    <Link href="/dashboard/addLesson">
                      <button className="btn btn-outline btn-success rounded-full px-8">
                        Share Lesson
                      </button>
                    </Link>

                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-3 gap-5 mt-12">

                    <div className="bg-white rounded-2xl shadow-lg p-5 text-center">
                      <FaBookOpen className="text-3xl text-green-600 mx-auto mb-3" />
                      <h3 className="text-3xl font-bold">500+</h3>
                      <p className="text-gray-500 text-sm">Lessons</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 text-center">
                      <FaUsers className="text-3xl text-blue-600 mx-auto mb-3" />
                      <h3 className="text-3xl font-bold">2K+</h3>
                      <p className="text-gray-500 text-sm">Users</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 text-center">
                      <FaLightbulb className="text-3xl text-yellow-500 mx-auto mb-3" />
                      <h3 className="text-3xl font-bold">100%</h3>
                      <p className="text-gray-500 text-sm">Growth</p>
                    </div>

                  </div>

                </div>

                {/* Right */}

                <div className="relative">

                  <div className="absolute -top-8 -left-8 w-32 h-32 bg-green-300 rounded-full blur-3xl opacity-40"></div>

                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

                  <div className="relative bg-white/60 backdrop-blur-xl rounded-[40px] shadow-2xl p-8">

                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full max-h-[500px] object-contain"
                    />

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