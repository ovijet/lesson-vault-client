"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiStar } from "react-icons/fi";
import { FaCrown } from "react-icons/fa6";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${serverUrl}/top-contributors`);
        const data = await res.json();
        setContributors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Contributors Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, [serverUrl]);

  if (loading) {
    return (
      <section className="py-20 text-center flex flex-col justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
        <h2 className="text-base font-bold text-slate-600">
          Loading top contributors...
        </h2>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white font-sans border-t border-slate-100 relative">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full border border-amber-200 mb-4">
            <FaCrown className="text-amber-600 text-xs" /> Leaderboard Hall of Fame
          </span>
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Top Community <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Contributors</span>
          </motion.h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Recognizing the most active minds sharing impactful life wisdom with our global community.
          </p>
        </div>

        {contributors.length === 0 ? (
          <div className="text-center text-slate-500 bg-slate-50 p-10 rounded-3xl border border-slate-200 max-w-md mx-auto">
            No contributors found yet! Be the first to share a lesson.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contributors.map((person, index) => (
              <motion.div
                key={person._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl p-7 border border-slate-200/80 hover:border-emerald-300 flex flex-col justify-between transition-all relative overflow-hidden group"
              >
                {/* Rank Pill */}
                <div className="absolute top-5 right-5 z-10">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full text-white shadow-xs ${
                      index === 0
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 shadow-amber-500/20"
                        : index === 1
                          ? "bg-gradient-to-r from-slate-400 to-slate-500"
                          : "bg-gradient-to-r from-amber-700 to-amber-800"
                    }`}
                  >
                    {index === 0 && <FaCrown className="text-xs text-amber-200" />}
                    Rank #{index + 1}
                  </span>
                </div>

                <div>
                  {/* Avatar */}
                  <div className="flex flex-col items-center mt-2">
                    <div className={`w-24 h-24 overflow-hidden rounded-full border-4 flex items-center justify-center bg-slate-100 shadow-md transition-transform group-hover:scale-105 ${
                      index === 0 ? "border-amber-400 ring-4 ring-amber-100" : "border-emerald-500 ring-4 ring-emerald-50"
                    }`}>
                      <img
                        src={
                          person?.image && person.image.startsWith("http") && !person.image.includes("…")
                            ? person.image
                            : `https://api.dicebear.com/7.x/initials/svg?seed=${person?.name || "User"}`
                        }
                        alt={person?.name || "Contributor"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${person?.name || "User"}`;
                        }}
                      />
                    </div>

                    <h3 className="text-xl font-extrabold mt-4 text-center text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {person?.name || "Anonymous Learner"}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1 font-medium">
                      {person.email}
                    </p>
                  </div>

                  {/* Stats Counter */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-emerald-50/70 rounded-2xl p-3 text-center border border-emerald-100">
                      <FiBookOpen className="mx-auto text-xl text-emerald-700 mb-0.5" />
                      <h4 className="text-xl font-extrabold text-slate-900">
                        {person.totalLessons || 0}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500">Lessons</p>
                    </div>

                    <div className="bg-amber-50/70 rounded-2xl p-3 text-center border border-amber-100">
                      <FiAward className="mx-auto text-xl text-amber-600 mb-0.5" />
                      <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                        {index === 0
                          ? "Gold"
                          : index === 1
                            ? "Silver"
                            : "Bronze"}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500">Badge</p>
                    </div>
                  </div>

                  {/* Top Contribution Topic */}
                  {person.topLessonTitle && (
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                        Top Contribution
                      </p>
                      <h4 className="text-xs font-semibold mt-1 text-slate-700 line-clamp-1">
                        {person.topLessonTitle}
                      </h4>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopContributors;