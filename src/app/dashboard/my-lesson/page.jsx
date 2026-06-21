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
   <div>
   <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
  
  <h1 className="text-2xl font-bold text-black mb-2">
    My Contributions
  </h1>

  <p className="text-slate-900 text-sm">
    You have authored{" "}
    <span className="text-red-500 font-semibold">
      {lessons.length}
    </span>{" "}
    lessons in the archive.
  </p>

  {/* Optional decorative bar */}
  <div className="mt-4 h-1 w-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
</div>
         <div className="p-6 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">LESSON DETAILS</h1>

      {/* Table Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-12 text-xs text-slate-400 uppercase p-4 border-b border-white/10">
          <div className="col-span-5">Lesson Details</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Engagement</div>
          <div className="col-span-2 text-right">Published</div>
        </div>

        {/* Rows */}
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="grid grid-cols-12 items-center p-4 border-b border-white/10 hover:bg-white/5 transition"
          >

            {/* Lesson Details */}
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-900/40 flex items-center justify-center">
                📝
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  {lesson.title}
                </h2>
                <p className="text-xs text-slate-400">
                  {lesson.category} • {lesson.lessonType || "Motivational"}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span className="px-3 py-1 text-xs rounded-full bg-slate-800 border border-slate-700">
                {lesson.status || "PUBLIC"}
              </span>
            </div>

            {/* Engagement */}
            <div className="col-span-3 flex gap-4 text-slate-400 text-sm">
              <span>❤️ {lesson.likes || 0}</span>
              <span>💬 {lesson.comments || 0}</span>
            </div>

            {/* Published */}
            <div className="col-span-2 text-right text-slate-400 text-sm">
              {new Date(lesson.createdAt).toLocaleDateString()}
            </div>

          </div>
        ))}

      </div>
    </div>
   </div>
  );
}