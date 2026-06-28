"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiBookOpen } from "react-icons/fi";

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-600">
          Loading top contributors...
        </h2>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800"
          >
            🏆 Top 3 Contributors
          </motion.h2>
          <p className="text-gray-500 mt-2">
            The most active minds helping our community learn
          </p>
        </div>

        {contributors.length === 0 ? (
          <div className="text-center text-gray-500 bg-white p-10 rounded-2xl border shadow-sm max-w-md mx-auto">
            No contributors found yet!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contributors.map((person, index) => (
              <motion.div
                key={person._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow-xl p-6 border border-green-100 flex flex-col justify-between transition-all relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm ${
                      index === 0
                        ? "bg-amber-500"
                        : index === 1
                          ? "bg-slate-400"
                          : "bg-amber-700"
                    }`}
                  >
                    Rank #{index + 1}
                  </span>
                </div>

                <div>
                  {/* User Profile Image */}
                  <div className="flex flex-col items-center mt-4">
                    {/* ✅ ইমেজ লকিং ও ব্রোকেন লিংক এড়াতে ১০০% সেফ <img> ট্যাগ */}
                    <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-green-500 flex items-center justify-center bg-gray-100 shadow-md">
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

                    <h3 className="text-xl font-bold mt-4 text-center text-gray-800 line-clamp-1">
                      {person?.name || "Anonymous User"}
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">
                      {person.email}
                    </p>
                  </div>

                  {/* Stats Counter */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-green-50 rounded-2xl p-3 text-center border border-green-100">
                      <FiBookOpen className="mx-auto text-xl text-green-700 mb-0.5" />
                      <h4 className="text-xl font-bold text-gray-800">
                        {person.totalLessons || 0}
                      </h4>
                      <p className="text-[11px] text-gray-500">Lessons</p>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-3 text-center border border-yellow-100">
                      <FiAward className="mx-auto text-xl text-yellow-600 mb-0.5" />
                      <h4 className="text-sm font-bold text-gray-800 mt-1">
                        {index === 0
                          ? "Gold"
                          : index === 1
                            ? "Silver"
                            : "Bronze"}
                      </h4>
                      <p className="text-[11px] text-gray-500">Medal</p>
                    </div>
                  </div>

                  {/* Recent Lesson Topic */}
                  {person.topLessonTitle && (
                    <div className="mt-5 border-t pt-4">
                      <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">
                        Top Contribution
                      </p>
                      <h4 className="text-xs font-semibold mt-1 text-gray-600 line-clamp-1">
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