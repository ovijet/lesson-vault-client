"use client";

import Link from "next/link";
import { FaHeart, FaCommentDots, FaArrowRight, FaLock, FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const AllLessonCard = ({ lesson, isPremiumUser }) => {
  const isPremium = lesson.accessLevel === "premium";
  const canAccess = !isPremium || isPremiumUser;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-500 flex flex-col">
      
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={lesson.image || "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=800&auto=format&fit=crop&q=80"}
          alt={lesson.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=800&auto=format&fit=crop&q=80";
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

        {/* Category Pill */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          {lesson.category || "Life Lesson"}
        </span>

        {/* Premium Access Badge */}
        {isPremium && (
          <span className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold shadow-md ${
            isPremiumUser
              ? "bg-emerald-500 text-white"
              : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
          }`}>
            {isPremiumUser ? <FaStar className="text-xs text-yellow-200" /> : <FaLock className="text-xs" />}
            PRO
          </span>
        )}

        {/* Card Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-xl font-extrabold text-white leading-tight line-clamp-2 drop-shadow-sm">
            {lesson.title}
          </h2>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1">

        {/* Date */}
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-3">
          <FiClock className="text-emerald-500 text-sm" />
          {lesson.createdAt
            ? new Date(lesson.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
            : "Recently Added"}
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
          {lesson.description || "Explore this insightful life lesson and grow through real-world experience."}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-3 mb-5">

          <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 border border-rose-100/80 px-3 py-1.5 rounded-xl text-xs font-bold">
            <FaHeart className="text-xs" />
            {lesson.likes || 0}
          </div>

          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-100/80 px-3 py-1.5 rounded-xl text-xs font-bold">
            <FaCommentDots className="text-xs" />
            {lesson.comments || 0}
          </div>

          <div className="ml-auto flex items-center gap-1.5 bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold capitalize">
            {lesson.lessonType || "Life"}
          </div>

        </div>

        {/* CTA Button */}
        <Link
          href={
            isPremium
              ? isPremiumUser
                ? `/public-lessons/${lesson._id}`
                : "/pricing"
              : `/public-lessons/${lesson._id}`
          }
          className={`flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-md ${
            isPremium && !isPremiumUser
              ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-amber-500/25"
              : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20"
          }`}
        >
          {isPremium && !isPremiumUser ? (
            <>
              <FaLock className="text-xs" />
              Unlock with PRO
            </>
          ) : (
            <>
              Read Lesson
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Link>

      </div>
    </div>
  );
};

export default AllLessonCard;