"use client";

import { DeleteModal } from "@/app/components/DeleteModal";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BookOpen } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import EditModal from "@/app/components/EditModal";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const { data: session } = authClient.useSession();

useEffect(() => {
  if (!session?.user?.email) return;

  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-lessons/${session.user.email}`
  )
    .then((res) => res.json())
    .then((data) => setLessons(data));
}, [session]);

  // useEffect(() => {
  //   const fetchLessons = async () => {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson`
  //     );
  //     const data = await res.json();
  //     setLessons(data);
  //   };

  //   fetchLessons();
  // }, []);

  const handleEdit = (id) => {
    console.log("Edit:", id);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Lessons</h1>
          <p className="text-gray-500 mt-1">
            View, edit and manage all lessons
          </p>
        </div>

        <div className="bg-primary text-white px-5 py-3 rounded-xl shadow-lg">
          Total Lessons: {lessons.length}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-12 bg-gray-100 text-gray-700 font-semibold text-sm p-4 border-b">
          <div className="col-span-5">Lesson Details</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Published</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Lesson Rows */}
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="grid grid-cols-12 items-center p-4 border-b hover:bg-gray-50 transition"
          >
            {/* Lesson Details */}
            <div className="col-span-5 flex items-center gap-4">
              {/* Image / Placeholder */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                {lesson.image ? (
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen size={28} />
                )}
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  {lesson.title}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-1">
                  {lesson.description?.slice(0, 60)}...
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="col-span-2">
              <span className="badge badge-info">
                {lesson.category}
              </span>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span
                className={`badge ${
                  lesson.visibility === "public"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {lesson.visibility || "public"}
              </span>
            </div>

            {/* Published Date */}
            <div className="col-span-2 text-sm text-gray-500">
              {lesson.createdAt
                ? new Date(lesson.createdAt).toLocaleDateString()
                : "N/A"}
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-center gap-3">
              <button
                onClick={() => handleEdit(lesson._id)}
                className="btn btn-circle btn-sm btn-info text-white"
              >
                 <EditModal lesson={lesson}/>
              </button>

              <DeleteModal lesson={lesson} />
            </div>
          </div>
        ))}

        {/* Empty State */}
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