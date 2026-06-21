'use client';

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const HomePage = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch("http://localhost:5000/addLesson");
        const data = await res.json();
        setLessons(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLessons();
  }, []);

  if (isPending) {
    return <p className="text-white p-6">Loading...</p>;
  }

  const stats = [
    { title: "LESSONS CREATED", value: lessons.length },
    { title: "WISDOM SAVED", value: 0 },
    { title: "IMPACT", value: 0 },
  ];

  const latestLessons = lessons.slice(0, 3);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Knowledge speaks, but wisdom listens.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all rounded-2xl p-5"
          >
            <p className="text-slate-400 text-sm">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Lessons */}
    <div>
          <div className="bg-slate-900 w-150 border border-slate-800 rounded-2xl p-5">
    <div className="flex justify-between">
             <h2 className="text-red text-xl font-semibold mb-4">
                 Recent Lessons
             </h2>

             <Link  href="/dashboard/my-lesson">view all</Link>
        </div>
        <div className="space-y-3 ">
          {latestLessons.length === 0 ? (
            <p className="text-slate-400 text-sm">No lessons found</p>
          ) : (
            latestLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="p-4  rounded-xl bg-slate-800/40 hover:bg-slate-800 transition"
              >
                <h3 className="text-white font-semibold">
                  {lesson.title}
                </h3>

                <p className="text-xs text-slate-400">
                  {lesson.category} • {lesson.lessonType || "Motivational"}
                </p>

                <div className="flex gap-4 mt-2 text-slate-400 text-sm">
                  <span>❤️ {lesson.likes || 0}</span>
                  <span>💬 {lesson.comments || 0}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

    </div>
  );
};

export default HomePage;