"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import DashboardChart from "@/app/components/DashboardChart";
import {
  FiUsers,
  FiBookOpen,
  FiShield, // FiShieldAlert এর বদলে FiShield দিলাম
  FiArrowRight,
  FiActivity,
  FiSettings,
  FiTrendingUp,
} from "react-icons/fi";
import { FaCrown, FaShieldAlt } from "react-icons/fa";

const AdminHomePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [lessons, setLessons] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

        const [lessonsRes, usersRes, reportsRes] = await Promise.all([
          fetch(`${serverUrl}/addLesson`).catch(() => null),
          fetch(`${serverUrl}/users`).catch(() => null),
          fetch(`${serverUrl}/admin/reported-lessons`).catch(() => null),
        ]);

        if (lessonsRes?.ok) {
          const lData = await lessonsRes.json();
          setLessons(Array.isArray(lData) ? lData : []);
        }

        if (usersRes?.ok) {
          const uData = await usersRes.json();
          setUsers(Array.isArray(uData) ? uData : []);
        }

        if (reportsRes?.ok) {
          const rData = await reportsRes.json();
          setReports(Array.isArray(rData) ? rData : []);
        }
      } catch (error) {
        console.error("Admin dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isPending || loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const proCount = users.filter(
    (u) =>
      u.plan?.toLowerCase() === "pro" || u.plan?.toLowerCase() === "premium",
  ).length;
  const publicCount = lessons.filter(
    (l) => l.visibility?.toLowerCase() === "public",
  ).length;

  const stats = [
    {
      title: "Total Registered Users",
      value: users.length,
      subtitle: `${proCount} Pro Subscribers`,
      icon: FiUsers,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      href: "/dashboard/admin/manage-users",
    },
    {
      title: "Published Lessons",
      value: lessons.length,
      subtitle: `${publicCount} Public Lessons`,
      icon: FiBookOpen,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      href: "/dashboard/admin/manage-lessons",
    },
    {
      title: "Reported Content",
      value: reports.length,
      subtitle: "Requires Moderation",
      icon: FiShield, // Updated here
      color: "text-rose-600 bg-rose-50 border-rose-100",
      href: "/dashboard/admin/reported",
    },
    {
      title: "Active Pro Members",
      value: proCount,
      subtitle: "Lifetime & Premium",
      icon: FaCrown,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      href: "/dashboard/admin/manage-users",
    },
  ];

  const latestLessons = lessons.slice(0, 4);

  return (
    <div className="space-y-8 font-sans">
      {/* Admin Welcome Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-emerald-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <FaShieldAlt className="text-xs" /> SYSTEM ADMINISTRATOR
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <FiActivity /> Live System Control
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Admin Command Hub 👋
            </h1>

            <p className="text-slate-300 mt-2 text-sm sm:text-base max-w-xl">
              Welcome back, Administrator <strong>{user?.name}</strong>. Monitor
              platform activity, manage user roles, and review community
              content.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/admin/manage-users"
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition hover:scale-105 text-xs sm:text-sm whitespace-nowrap cursor-pointer"
            >
              Manage Users
            </Link>
            <Link
              href="/dashboard/admin/manage-lessons"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition hover:scale-105 text-xs sm:text-sm whitespace-nowrap cursor-pointer"
            >
              Manage Lessons
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl ${item.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon />
                </div>
                <FiArrowRight className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  {item.title}
                </p>
                <h2 className="text-3xl font-black text-slate-900 mt-1">
                  {item.value}
                </h2>
                <p className="text-[11px] font-semibold text-slate-500 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/admin/manage-users"
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            <FiUsers />
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            User Control Center
          </h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            Promote/demote admin roles, manage subscription tiers, and audit
            platform accounts.
          </p>
        </Link>

        <Link
          href="/dashboard/admin/manage-lessons"
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            <FiBookOpen />
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
            Lesson Moderation
          </h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            Feature top lessons, mark content as reviewed, or delete
            inappropriate submissions.
          </p>
        </Link>

        <Link
          href="/dashboard/admin/reported"
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:border-rose-300 transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            <FiShield /> {/* Updated here */}
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
            Reported Content
          </h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            Investigate community flag reports and take swift enforcement
            action.
          </p>
        </Link>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs p-6">
        <DashboardChart />
      </div>

      {/* Recent Published Lessons Preview */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Platform Lessons Overview
            </h2>
            <p className="text-xs text-slate-500">
              Live view of recently posted public & private lessons
            </p>
          </div>

          <Link
            href="/dashboard/admin/manage-lessons"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition"
          >
            Manage All Lessons <FiArrowRight />
          </Link>
        </div>

        <div className="space-y-3">
          {latestLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:bg-slate-50/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    lesson.image ||
                    "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=200&auto=format&fit=crop&q=80"
                  }
                  alt={lesson.title}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=200&auto=format&fit=crop&q=80";
                  }}
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Category:{" "}
                    <strong className="text-slate-700">
                      {lesson.category || "General"}
                    </strong>{" "}
                    • Author:{" "}
                    <strong className="text-slate-700">
                      {lesson.userName || "User"}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                    lesson.visibility === "private"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {lesson.visibility || "public"}
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                    lesson.accessLevel === "premium"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {lesson.accessLevel || "free"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;