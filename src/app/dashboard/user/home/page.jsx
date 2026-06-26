"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import DashboardChart from "@/app/components/DashboardChart";

const HomePage = () => {
  const { data:session, isPending } = authClient.useSession();
  const user = session?.user;

  const [lessons, setLessons] = useState([]);

 useEffect(() => {
  if (!session?.user?.email) return;

  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-lessons/${session.user.email}`
  )
    .then((res) => res.json())
    .then((data) => setLessons(data));
}, [session]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const stats = [
    {
      title: "Lessons Created",
      value: lessons.length,
    },
    {
      title: "Wisdom Saved",
      value: lessons.length * 5,
    },
    {
      title: "Impact Score",
      value: lessons.length * 10,
    },
  ];

  const latestLessons = lessons.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Knowledge speaks, but wisdom listens.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/user/add-lesson"
          className="bg-blue-600 text-white rounded-3xl p-6 hover:bg-blue-700 transition-all"
        >
          <h3 className="text-2xl font-bold">
            Add New Lesson
          </h3>

          <p className="mt-2 text-blue-100">
            Share your experience and wisdom with others.
          </p>
        </Link>

        <Link
          href="/public-lessons"
          className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-md transition-all"
        >
          <h3 className="text-2xl font-bold text-gray-900">
            Explore Lessons
          </h3>

          <p className="mt-2 text-gray-500">
            Discover life lessons from the community.
          </p>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      <DashboardChart/>

      {/* Recent Lessons */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Lessons
          </h2>

          <Link
            href="/dashboard/user/my-lesson"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="space-y-4">
          {latestLessons.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-400">
                No lessons found
              </p>
            </div>
          ) : (
            latestLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {lesson.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {lesson.category} •{" "}
                      {lesson.lessonType ||
                        "Motivational"}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      lesson.visibility ===
                      "private"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {lesson.visibility ||
                      "public"}
                  </span>
                </div>

                <div className="flex gap-6 mt-4 text-sm text-gray-500">
                  <span>
                    ❤️ {lesson.likes || 0}
                  </span>

                  <span>
                    💬 {lesson.comments || 0}
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