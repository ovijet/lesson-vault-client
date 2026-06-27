"use client";

import Link from "next/link";
import { FaHeart, FaCommentDots, FaArrowRight } from "react-icons/fa";

const AllLessonCard = ({ lesson, isPremiumUser }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Category */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          {lesson.category}
        </span>

        {/* Premium */}
        {lesson.accessLevel === "premium" && (
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
              isPremiumUser
                ? "bg-green-500 text-white"
                : "bg-yellow-400 text-black"
            }`}
          >
            {isPremiumUser ? "⭐ PRO" : "🔒 PRO"}
          </span>
        )}

        {/* Title */}
        <div className="absolute bottom-5 left-5 right-5">
          <h2 className="text-2xl font-bold text-white line-clamp-2">
            {lesson.title}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Date */}
        <p className="text-sm text-gray-400 mb-4">
          {lesson.createdAt
            ? new Date(lesson.createdAt).toLocaleDateString()
            : ""}
        </p>

        {/* Description */}
        <p className="text-gray-600 leading-7 line-clamp-2 mb-6">
          {lesson.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-center">
            <FaHeart className="mx-auto text-red-500 mb-2" />
            <h4 className="font-bold text-red-500">
              {lesson.likes || 0}
            </h4>
            <p className="text-xs text-gray-500">Likes</p>
          </div>

          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 text-center">
            <FaCommentDots className="mx-auto text-blue-500 mb-2" />
            <h4 className="font-bold text-blue-500">
              {lesson.comments || 0}
            </h4>
            <p className="text-xs text-gray-500">Comments</p>
          </div>

          <div className="rounded-2xl bg-green-50 border border-green-100 p-4 text-center">
            <h4 className="font-semibold text-green-600">
              {lesson.lessonType || "Life"}
            </h4>
            <p className="text-xs text-gray-500 mt-2">Type</p>
          </div>
        </div>

        {/* Button */}
        <Link
          href={
            lesson.accessLevel === "premium"
              ? isPremiumUser
                ? `/public-lessons/${lesson._id}`
                : "/pricing"
              : `/public-lessons/${lesson._id}`
          }
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold transition-all duration-300 ${
            lesson.accessLevel === "premium" && !isPremiumUser
              ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700"
          } text-white shadow-lg hover:shadow-xl`}
        >
          {lesson.accessLevel === "premium" && !isPremiumUser
            ? "🔒 Unlock PRO"
            : "View Lesson"}

          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default AllLessonCard;