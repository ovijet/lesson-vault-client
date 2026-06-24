"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PublicLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson`,
      );
      const data = await res.json();
      setLessons(data);
    };

    fetchLessons();
  }, []);

  // 🔍 FILTER LOGIC
  const filteredLessons = lessons.filter((lesson) => {
    const matchSearch =
      lesson.title?.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "all" || lesson.category === category;

    return matchSearch && matchCategory;
  });

  // unique categories
  const categories = ["all", ...new Set(lessons.map((l) => l.category))];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Life Lessons</h1>
        <p className="text-gray-500 mt-2">
          Discover inspiring lessons to improve your life.
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between">
        {/* Search */}
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />

        {/* Category Filter */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredLessons.length > 0 ? (
          filteredLessons.slice(0, 10).map((lesson) => (
            <div
              key={lesson._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-3"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <span className="absolute top-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">
                  {lesson.status}
                </span>

                {lesson.isFeatured && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </span>
                )}

                <div className="absolute bottom-4 left-4">
                  <h2 className="text-white text-2xl font-bold line-clamp-1">
                    {lesson.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {lesson.category}
                  </span>

                  <span className="text-xs text-gray-400">
                    {lesson.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5">
                  {lesson.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-red-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-red-500">
                      {lesson.likes || 0}
                    </p>
                    <p className="text-xs text-gray-500">Likes</p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-blue-500">
                      {lesson.comments || 0}
                    </p>
                    <p className="text-xs text-gray-500">Comments</p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <p className="text-sm font-bold text-green-600">
                      {lesson.lessonType}
                    </p>
                    <p className="text-xs text-gray-500">Type</p>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={`/public-lessons/${lesson._id}`}
                  className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  View Lesson →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700">
              No Lessons Found 😢
            </h3>
            <p className="text-gray-500 mt-2">
              Try changing your search or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
