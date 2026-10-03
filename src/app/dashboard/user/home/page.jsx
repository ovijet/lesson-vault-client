"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import DashboardChart from "@/app/components/DashboardChart";
import { FiPlusCircle, FiBookOpen, FiHeart, FiAward, FiArrowRight, FiClock } from "react-icons/fi";
import { FaCrown } from "react-icons/fa6";

const HomePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-lessons/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setLessons(Array.isArray(data) ? data : []))
      .catch((err) => console.error("My lessons error:", err));
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const stats = [
    {
      title: "Lessons Published",
      value: lessons.length,
      icon: FiBookOpen,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Wisdom Score",
      value: lessons.length * 15 + 10,
      icon: FiAward,
      color: "text-teal-600 bg-teal-50 border-teal-100",
    },
    {
      title: "Community Impact",
      value: lessons.reduce((acc, l) => acc + (l.likes || 0), 0) + 5,
      icon: FiHeart,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
  ];

  const latestLessons = lessons.slice(0, 3);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-emerald-900/50">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Personal Growth Vault
              </span>
              {(user?.plan === "premium" || user?.plan === "pro") && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <FaCrown className="text-xs" /> PRO
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name?.split(" ")[0] || "Learner"} 👋
            </h1>

            <p className="text-slate-300 mt-2 text-sm sm:text-base max-w-xl">
              "Knowledge speaks, but wisdom listens." Continue documenting your life realizations and impacting others.
            </p>
          </div>

          <Link
            href="/dashboard/user/add-lesson"
            className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 whitespace-nowrap text-sm cursor-pointer"
          >
            <FiPlusCircle className="text-base" /> Share New Lesson
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  {item.title}
                </p>
                <h2 className="text-3xl font-black text-slate-900 mt-2">
                  {item.value}
                </h2>
              </div>
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl ${item.color}`}>
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs p-6">
        <DashboardChart />
      </div>

      {/* Recent Lessons */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Your Recent Lessons
            </h2>
            <p className="text-xs text-slate-500">Quick view of your latest published items</p>
          </div>

          <Link
            href="/dashboard/user/my-lesson"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="space-y-4">
          {latestLessons.length === 0 ? (
            <div className="py-10 text-center bg-slate-50 border border-slate-100 rounded-2xl">
              <p className="text-slate-500 text-sm font-medium">No lessons published yet!</p>
              <Link
                href="/dashboard/user/add-lesson"
                className="inline-block mt-3 px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-700 transition"
              >
                Create Your First Lesson
              </Link>
            </div>
          ) : (
            latestLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      {lesson.category || "General"}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {lesson.lessonType || "Life"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {lesson.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">❤️ {lesson.likes || 0}</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">💬 {lesson.comments || 0}</span>
                  <span className={`px-3 py-1 rounded-xl uppercase tracking-wider text-[10px] ${
                    lesson.visibility === "private" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {lesson.visibility || "public"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;