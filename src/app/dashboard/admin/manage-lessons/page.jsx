"use client";

import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BookOpen } from "lucide-react";
import { DeleteModal } from "@/app/components/DeleteModal";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson`
      );
      const data = await res.json();
      setLessons(data);
    };

    fetchLessons();
  }, []);

  const handleEdit = (id) => {
    console.log(id);
  };

  const publicLessons = lessons.filter(
    (lesson) => lesson.visibility === "public"
  ).length;

  const privateLessons = lessons.filter(
    (lesson) => lesson.visibility === "private"
  ).length;

  const featuredLessons = lessons.filter(
    (lesson) => lesson.isFeatured
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-gray-500 text-sm">
            Total Lessons
          </h3>

          <p className="text-4xl font-bold mt-2">
            {lessons.length}
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6 shadow">
          <h3 className="text-green-600 text-sm">
            Public Lessons
          </h3>

          <p className="text-4xl font-bold text-green-700 mt-2">
            {publicLessons}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-6 shadow">
          <h3 className="text-yellow-600 text-sm">
            Private Lessons
          </h3>

          <p className="text-4xl font-bold text-yellow-700 mt-2">
            {privateLessons}
          </p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-6 shadow">
          <h3 className="text-purple-600 text-sm">
            Featured Lessons
          </h3>

          <p className="text-4xl font-bold text-purple-700 mt-2">
            {featuredLessons}
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Manage Lessons
          </h1>

          <p className="text-gray-500 mt-2">
            View, review and manage all lessons.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <span className="bg-primary text-white px-5 py-3 rounded-xl shadow font-semibold">
            {lessons.length} Lessons
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div className="grid grid-cols-12 bg-slate-50 px-6 py-4 border-b font-semibold text-gray-700">
          <div className="col-span-5">
            Lesson Details
          </div>

          <div className="col-span-2">
            Category
          </div>

          <div className="col-span-2">
            Visibility
          </div>

          <div className="col-span-2">
            Created
          </div>

          <div className="col-span-1 text-center">
            Action
          </div>
        </div>

        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="grid grid-cols-12 items-center px-6 py-4 border-b hover:bg-slate-50 transition"
          >
            {/* Details */}
            <div className="col-span-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border shadow-sm">
                {lesson.image ? (
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <BookOpen
                      className="text-white"
                      size={24}
                    />
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  {lesson.title}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-1">
                  {lesson.description}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="col-span-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                {lesson.category}
              </span>
            </div>

            {/* Visibility */}
            <div className="col-span-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  lesson.visibility === "public"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {lesson.visibility}
              </span>
            </div>

            {/* Date */}
            <div className="col-span-2 text-sm text-gray-500">
              {lesson.createdAt
                ? new Date(
                    lesson.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-center gap-2">
              <button
                onClick={() =>
                  handleEdit(lesson._id)
                }
                className="w-9 h-9 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
              >
                <FaEdit />
              </button>

              <DeleteModal lesson={lesson} />
            </div>
          </div>
        ))}

        {lessons.length === 0 && (
          <div className="py-20 text-center">
            <BookOpen
              size={60}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-700">
              No Lessons Found
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first lesson to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}