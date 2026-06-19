"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Discover. Share. Grow.",
    subtitle: "Life lessons for everyone.",
    desc: "A platform to share and manage life lessons personally and professionally.",
    img: "/undraw_share-results_lfh5.png",
  },
  {
    title: "Learn from Experience",
    subtitle: "Real stories, real growth.",
    desc: "Explore lessons shared by people around the world and improve yourself every day.",
    img: "/undraw_budgeting_klon.svg",
  },
  {
    title: "Build Your Knowledge",
    subtitle: "Grow together as a community.",
    desc: "Share your own lessons and help others grow in their journey.",
    img: "/undraw_biometric-login_v832.svg",
  },
];

const Banner = () => {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col-reverse md:flex-row items-center gap-10">

                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    {slide.title}
                  </h1>

                  <p className="mt-3 text-lg text-gray-600">
                    {slide.subtitle}
                  </p>

                  <p className="mt-3 text-gray-500 max-w-md">
                    {slide.desc}
                  </p>

                  <div className="mt-6 flex gap-4 justify-center md:justify-start">
                    <Link href="/lessons">
                      <button className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800">
                        Explore Lessons
                      </button>
                    </Link>

                    <Link href="/create">
                      <button className="px-6 py-3 rounded-full border border-gray-400">
                        Share Lesson
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-center">
                  <img
                    src={slide.img}
                    alt="slide image"
                    className="w-full max-w-md object-contain"
                  />
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