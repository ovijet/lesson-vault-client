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
 
  const [likes, setLikes] = useState(1);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasReported, setHasReported] = useState(false);

  const { data: session } = authClient.useSession();

  const [hearts, setHearts] = useState(1);
  const [hasHearted, setHasHearted] = useState(false);

  console.log(data,'oooooooooooooo');
  console.log(id,'ooccccccccccccccc');

  
  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
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

  console.log("Sending Favorite Data ->", { lessonId: currentLessonId, email: userEmail });

  
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
    navigator.clipboard.writeText(window.location.href);
    toast('Link copied to clipboard!');
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
        setHasReported(true); // বাটনটি লাভ এর মতো লাল করে দেবে
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
    <div className="flex items-center gap-3 p-4 bg-[#FAF6F0] rounded-xl w-fit">
      
      {/* --- LIKE BUTTON --- */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-sm font-semibold shadow-sm border border-gray-100/50 ${
          hasLiked 
            ? 'bg-white text-green-600 border-green-200' 
            : 'bg-white/80 text-gray-400 hover:text-green-600'
        }`}
      >
        <FiThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
        <span>{likes}</span>
      </button>

      {/* --- HEART BUTTON --- */}
      <button
        onClick={handleHeart}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-sm font-semibold shadow-sm border border-gray-100/50 ${
          hasHearted 
            ? 'bg-white text-red-500 border-red-200' 
            : 'bg-white/80 text-gray-400 hover:text-red-500'
        }`}
      >
        <FiHeart className={`w-4 h-4 ${hasHearted ? 'fill-current' : ''}`} />
        <span>{hearts}</span>
      </button>

      {/* --- SHARE BUTTON --- */}
      <button
        onClick={handleShare}
        className="flex items-center justify-center p-2.5 rounded-full bg-white/80 text-gray-500 hover:text-blue-500 hover:bg-white border border-gray-100/50 shadow-sm transition-all"
      >
        <FiShare2 className="w-4 h-4" />
      </button>

      {/* --- REPORT / FLAG BUTTON --- */}
      <button
        onClick={handleReport}
        className="flex items-center justify-center p-2.5 rounded-full bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white border border-gray-100/50 shadow-sm transition-all"
      >
        <FiFlag className="w-4 h-4" />
      </button>

    </div>
  );
};

export default LikeLove;