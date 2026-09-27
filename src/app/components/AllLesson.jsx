"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import AllLessonCard from "./AllLessonCard";
import { FiSearch, FiFilter, FiBookOpen, FiGrid } from "react-icons/fi";
import { motion } from "framer-motion";

const AllLesson = () => {
  const { data: session } = authClient.useSession();
  const isPremiumUser = session?.user?.plan === "premium";

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson`
        );
        if (res.ok) {
          const data = await res.json();
          setLessons(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Fetch lessons error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const filteredLessons = lessons.filter((lesson) => {
    const matchSearch =
      lesson.title?.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" || lesson.category === category;

    return matchSearch && matchCategory;
  });

  const categories = [
    "all",
    ...Array.from(new Set(lessons.map((lesson) => lesson.category).filter(Boolean))),
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-200 shadow-xs">
            <FiBookOpen className="text-emerald-600 text-sm" /> Public Knowledge Vault
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Explore <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">Life Lessons</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Discover real-life wisdom, career insights, and personal reflections shared by lifelong learners around the globe.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-5 rounded-3xl shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search by title, topic, or keyword..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Dropdown & Results Counter */}
          <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700">
              <FiFilter className="text-emerald-600 text-base" />
              <span>Category:</span>
              <select
                className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-2xl text-xs font-bold text-emerald-800">
              <FiGrid className="text-emerald-600" />
              <span>{filteredLessons.length} {filteredLessons.length === 1 ? "Lesson" : "Lessons"} Found</span>
            </div>
          </div>
        </div>

        {/* Category Quick Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {cat === "all" ? "✨ All Topics" : cat}
              </button>
            );
          })}
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-4 animate-pulse">
                <div className="h-48 bg-slate-200 rounded-2xl w-full" />
                <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-200 rounded-lg w-full" />
                <div className="h-4 bg-slate-200 rounded-lg w-2/3" />
                <div className="h-10 bg-slate-200 rounded-xl w-full pt-2" />
              </div>
            ))}
          </div>
        ) : filteredLessons.length > 0 ? (
          /* Lessons Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredLessons.map((lesson) => (
              <AllLessonCard
                key={lesson._id}
                lesson={lesson}
                isPremiumUser={isPremiumUser}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Lessons Found</h3>
            <p className="text-slate-500 text-sm mb-6">
              We couldn't find any lessons matching your current filters. Try changing your search keywords or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-700 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllLesson;