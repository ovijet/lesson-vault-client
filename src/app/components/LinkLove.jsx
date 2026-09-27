'use client';

import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { 
  FiThumbsUp, 
  FiHeart, 
  FiShare2, 
  FiFlag 
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const LikeLove = ({ lessonData: data, lessonId: id }) => {
  const [likes, setLikes] = useState(data?.likes || 1);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasReported, setHasReported] = useState(false);

  const { data: session } = authClient.useSession();

  const [hearts, setHearts] = useState(data?.favoritesCount || 1);
  const [hasHearted, setHasHearted] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      toast.success("Liked lesson!");
    }
    setHasLiked(!hasLiked);
  };

  const handleHeart = async () => {
    if (!session?.user) {
      toast.error("Please login first to add favorites!");
      return;
    }

    const currentLessonId = id; 
    const userEmail = session?.user?.email;

    if (!currentLessonId) {
      toast.error("Lesson ID is missing!");
      return;
    }

    if (hasHearted) {
      toast.info("Already added to favorites");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId: currentLessonId, 
            title: data?.title || "Untitled Lesson",
            image: data?.image || "",
            category: data?.category || "General",
            email: userEmail, 
            createdAt: new Date(),
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setHasHearted(true);
        setHearts(hearts + 1); 
        toast.success("Added to Favorites!");
      } else {
        toast.error(result?.message || "Failed to add");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Something went wrong!");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleReport = async () => {
    if (!session?.user) {
      toast.error("Please login first to report this lesson!");
      return;
    }

    const currentLessonId = id; 
    const userEmail = session?.user?.email;

    if (!currentLessonId) {
      toast.error("Lesson ID is missing!");
      return;
    }

    if (hasReported) {
      toast.info("You have already reported this lesson!");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/reports`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId: currentLessonId, 
            title: data?.title || "Untitled Lesson",
            email: userEmail, 
            createdAt: new Date(),
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setHasReported(true); 
        toast.success("Lesson reported successfully!");
      } else {
        toast.error(result?.message || "Failed to report");
      }
    } catch (err) {
      console.error("Report Error:", err);
      toast.error("Something went wrong while reporting!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-6 px-4">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Engage with this lesson
        </span>

        <div className="flex items-center gap-3">
          {/* --- LIKE BUTTON --- */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all text-xs sm:text-sm font-bold shadow-xs cursor-pointer ${
              hasLiked 
                ? 'bg-emerald-600 text-white shadow-emerald-600/20 scale-105' 
                : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/80'
            }`}
          >
            <FiThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{likes} Helpful</span>
          </button>

          {/* --- HEART BUTTON --- */}
          <button
            onClick={handleHeart}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all text-xs sm:text-sm font-bold shadow-xs cursor-pointer ${
              hasHearted 
                ? 'bg-rose-500 text-white shadow-rose-500/20 scale-105' 
                : 'bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200/80'
            }`}
          >
            <FiHeart className={`w-4 h-4 ${hasHearted ? 'fill-current' : ''}`} />
            <span>{hearts} Save</span>
          </button>

          {/* --- SHARE BUTTON --- */}
          <button
            onClick={handleShare}
            title="Share Lesson"
            className="flex items-center justify-center p-3 rounded-2xl bg-slate-50 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-200/80 shadow-xs transition-all cursor-pointer"
          >
            <FiShare2 className="w-4 h-4" />
          </button>

          {/* --- REPORT BUTTON --- */}
          <button
            onClick={handleReport}
            title="Report Content"
            className="flex items-center justify-center p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 shadow-xs transition-all cursor-pointer"
          >
            <FiFlag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikeLove;