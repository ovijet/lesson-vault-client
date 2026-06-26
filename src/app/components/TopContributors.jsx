"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiBookOpen } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TopContributors = () => {
  const router = useRouter();

  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await fetch(`${serverUrl}/top-contributors`);
        const data = await res.json();

        setContributors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, [serverUrl]);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold">Loading Contributors...</h2>
      </section>
    );
  }



  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-14"
        >
          🏆 Top Contributors
        </motion.h2>

        {contributors.length === 0 ? (
          <div className="text-center text-gray-500">
            No Contributor Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contributors.map((person, index) => (
              <motion.div
                key={person._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl shadow-xl p-6 border"
              >
                {/* Rank */}
                <div className="flex justify-end">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    #{index + 1}
                  </span>
                </div>

                {/* User */}
                <div className="flex flex-col items-center mt-2">
                  <Image
                    src={
                      person?.image?.startsWith("http")
                        ? person.image
                        : "https://i.ibb.co/vP99Tpx/user.png"
                    }
                    alt={person?.name || "Contributor"}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-green-500"
                  />

                  <h2 className="text-xl font-bold mt-4">
                    {person?.name}
                  </h2>

                  <p className="text-green-600 text-sm">
                    Top Contributor
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <div className="bg-green-100 rounded-xl p-4 text-center">
                    <FiBookOpen className="mx-auto text-2xl text-green-700 mb-2" />

                    <h3 className="text-2xl font-bold">
                      {person.totalLessons}
                    </h3>

                    <p className="text-sm">Lessons</p>
                  </div>

                  <div className="bg-yellow-100 rounded-xl p-4 text-center">
                    <FiAward className="mx-auto text-2xl text-yellow-600 mb-2" />

                    <h3 className="font-bold">Elite</h3>

                    <p className="text-sm">Rank</p>
                  </div>
                </div>

                {/* Lesson */}
                <div className="mt-6 border-t pt-4">
                  <p className="text-xs uppercase text-gray-400">
                    Top Lesson
                  </p>

                  <h3 className="font-semibold mt-2">
                    {person.topLessonTitle}
                  </h3>
                </div>

                {/* Button */}
                {/* <button
                  onClick={() =>
                    router.push(`/contributors/${person._id}`)
                  }
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  View Profile
                </button> */}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopContributors;