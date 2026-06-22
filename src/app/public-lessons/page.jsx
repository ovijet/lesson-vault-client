"use client";

import { useEffect, useState } from "react";

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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Life Lessons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.slice(0, 10).map((lesson) => (
          <div
            key={lesson._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-green-100 p-6 flex justify-center">
              <span className="text-5xl">📝</span>
            </div>

            {/* Card Body */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {lesson.title}
              </h2>

              <p className="text-gray-500 text-sm mb-3">
                {lesson.category} •{" "}
                {lesson.lessonType || "Motivational"}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {lesson.status || "PUBLIC"}
                </span>

                <span className="text-sm text-gray-500">
                  {lesson.createdAt
                    ? new Date(lesson.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              {/* Engagement */}
              <div className="flex justify-between border-t pt-3 text-sm text-gray-600">
                <span>❤️ {lesson.likes || 0}</span>
                <span>💬 {lesson.comments || 0}</span>
              </div>

              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                View Lesson
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}