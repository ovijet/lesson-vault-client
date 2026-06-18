import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">

        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Discover. Share. Grow.
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Life lessons for everyone.
          </p>

          <p className="mt-3 text-gray-500 max-w-md">
            A platform to share and manage life lessons personally and
            professionally. Build knowledge, share experience, and grow together.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/lessons">
              <button className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition">
                Explore Lessons
              </button>
            </Link>

            <Link href="/create">
              <button className="px-6 py-3 rounded-full border border-gray-400 text-gray-800 hover:bg-gray-100 transition">
                Share Your Lesson
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img 
            src='/undraw_share-results_lfh5.png'
            alt="Banner Image"
            className="w-full max-w-md md:max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;