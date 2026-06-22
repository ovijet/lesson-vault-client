"use client";

import { DeleteModal } from "@/app/components/DeleteModal";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch("http://localhost:5000/addLesson");
      const data = await res.json();
      setLessons(data);
    };

    fetchLessons();
  }, []);

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit:", id);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-12 bg-gray-100 text-gray-700 font-semibold text-sm p-4 border-b">
          <div className="col-span-5">Lesson Details</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Engagement</div>
          <div className="col-span-2">Published</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Rows */}
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="grid grid-cols-12 items-center p-4 border-b hover:bg-gray-50 transition"
          >
            {/* Lesson Details */}
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                📝
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  {lesson.title}
                </h2>

                <p className="text-xs text-gray-500">
                  {lesson.category} •{" "}
                  {lesson.lessonType || "Motivational"}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {lesson.status || "PUBLIC"}
              </span>
            </div>

            {/* Engagement */}
            <div className="col-span-2 flex gap-3 text-sm text-gray-600">
              <span>❤️ {lesson.likes || 0}</span>
              <span>💬 {lesson.comments || 0}</span>
            </div>

            {/* Published */}
            <div className="col-span-2 text-sm text-gray-500">
              {lesson.createdAt
                ? new Date(lesson.createdAt).toLocaleDateString()
                : "N/A"}
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-center gap-3">
              <button
                onClick={() => handleEdit(lesson._id)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit size={18} />
              </button>

              <button
                onClick={() => handleDelete(lesson._id)}
                className="text-red-600 hover:text-red-800"
              >
                {/* <FaTrash size={18} /> */}
                <DeleteModal lesson={lesson}/>
              </button>
            </div>
          </div>
        ))}

        {lessons.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No lessons found
          </div>
        )}
      </div>
    </div>
  );
}