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

const LikeLove = ({data}) => {
  // লাইক এবং হার্ট এর জন্য আলাদা স্টেট এবং অ্যাক্টিভ ট্র্যাকিং
  const [likes, setLikes] = useState(1);
  const [hasLiked, setHasLiked] = useState(false);

  const { data: session } = authClient.useSession();

  const [hearts, setHearts] = useState(1);
  const [hasHearted, setHasHearted] = useState(false);

  // লাইক ক্লিক হ্যান্ডলার (Toggle Logic)
  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };

  // হার্ট ক্লিক হ্যান্ডলার (Toggle Logic)
//   const handleHeart = () => {
//     if (hasHearted) {
//       setHearts(hearts - 1);
//     } else {
//       setHearts(hearts + 1);
//     }
//     setHasHearted(!hasHearted);
//   };


const handleHeart = async () => {
  if (!session) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId: data._id,
          title: data.title,
          image: data.image,
          category: data.category,
          email: session.user.email,
          createdAt: new Date(),
        }),
      }
    );

    const result = await res.json();

    if (resu.success) {
      setHasHearted(true);
      toast.success("Added to Favorite");
    }
  } catch (err) {
    toast.error( "Failed");
  }
};

  // শেয়ার হ্যান্ডলার
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
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
        onClick={() => alert('Reported this lesson')}
        className="flex items-center justify-center p-2.5 rounded-full bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white border border-gray-100/50 shadow-sm transition-all"
      >
        <FiFlag className="w-4 h-4" />
      </button>

    </div>
  );
};

export default LikeLove;