'use client';

import React from 'react';
import { authClient } from "@/lib/auth-client";
import { FiHeart, FiMessageSquare, FiStar, FiCheckCircle, FiClock, FiTag, FiLock, FiBookOpen } from "react-icons/fi";
import { FaCrown, FaSparkles } from "react-icons/fa6";
import Link from 'next/link';

const PublicDetailsPage = ({ data }) => {
  const { data: session } = authClient.useSession();

  const isPremiumUser = session?.user?.plan === "premium" || session?.user?.plan === "pro";

  // Lock premium lessons for non-premium members
  if (data.accessLevel === "premium" && !isPremiumUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 font-sans relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 rounded-3xl text-center text-white shadow-2xl">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30 text-white text-3xl">
            <FaCrown />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider mb-3">
            Exclusive Premium Content
          </span>

          <h1 className="text-3xl font-extrabold mb-3 text-white tracking-tight">
            Unlock Pro Access
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            "{data.title}" is an exclusive high-impact lesson reserved for Pro Members. Upgrade today to unlock the full library.
          </p>

          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 text-sm"
          >
            Upgrade Membership Now ✨
          </Link>

          <div className="mt-6">
            <Link href="/public-lessons" className="text-xs text-slate-400 hover:text-white transition">
              ← Back to Public Lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Main Card / Hero */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          
          {/* Cover Image */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-slate-900">
            <img
              src={data.image || "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=1200&auto=format&fit=crop&q=80"}
              alt={data.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=1200&auto=format&fit=crop&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            {/* Category & Status Overlay Pills */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-sm text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-extrabold shadow-sm flex items-center gap-1.5">
                <FiTag className="text-emerald-600" />
                {data.category || "General"}
              </span>

              {data.lessonType && (
                <span className="px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-sm text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold shadow-sm">
                  {data.lessonType}
                </span>
              )}

              <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                data.status === "PUBLIC" || !data.status
                  ? "bg-emerald-500 text-white"
                  : "bg-rose-500 text-white"
              }`}>
                {data.status || "PUBLIC"}
              </span>
            </div>
          </div>

          {/* Title & Header Text */}
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              {data.title}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        {/* 4 Stats Chips Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
              <FiHeart />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Likes</p>
              <p className="text-2xl font-black text-slate-900">{data.likes || 0}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
              <FiMessageSquare />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Comments</p>
              <p className="text-2xl font-black text-slate-900">{data.comments || 0}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
              <FiStar />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Featured</p>
              <p className="text-xl font-black text-slate-900">{data.isFeatured ? "Yes ✨" : "Standard"}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
              <FiCheckCircle />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified</p>
              <p className="text-xl font-black text-slate-900">{data.isReviewed ? "Reviewed" : "Pending"}</p>
            </div>
          </div>
        </div>

        {/* Full Detailed Story */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <FiBookOpen className="text-emerald-600" /> Full Lesson Story & Takeaways
          </h2>

          <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
            <p>{data.description}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
            <div className="flex items-center gap-2">
              <FiClock className="text-emerald-600" />
              <span>Published on: <strong className="text-slate-800">{new Date(data.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</strong></span>
            </div>

            {data.userName && (
              <div className="flex items-center gap-2">
                <span>Shared by: <strong className="text-slate-800">{data.userName}</strong></span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PublicDetailsPage;