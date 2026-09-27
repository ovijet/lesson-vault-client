"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FiMessageSquare, FiSend, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Comments({ lessonId }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${lessonId}`
      );
      if (res.ok) {
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.log("Comments fetch error:", error);
    }
  };

  useEffect(() => {
    if (lessonId) {
      fetchComments();
    }
  }, [lessonId]);

  const handleComment = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    if (!user) {
      toast.error("Please login to join the discussion!");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId,
            userName: user?.name || "Learner",
            userPhoto: user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`,
            comment: text.trim(),
          }),
        }
      );

      if (res.ok) {
        toast.success("Comment posted!");
        setText("");
        fetchComments();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 px-4 font-sans">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2.5">
          <FiMessageSquare className="text-emerald-600" /> Community Discussion ({comments.length})
        </h2>

        {/* Post Comment Form */}
        <form onSubmit={handleComment} className="mb-8">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-sm overflow-hidden ring-2 ring-emerald-500/20">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || <FiUser />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <textarea
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={user ? "Share your reflections or ask a question..." : "Login to join the discussion..."}
                disabled={!user}
                className="w-full p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!text.trim() || submitting || !user}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <FiSend className="text-xs" />
                  {submitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comment Thread List */}
        {comments.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 text-sm">
            No comments yet. Be the first to start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((item) => (
              <div
                key={item._id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 border border-slate-200/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <img
                    src={
                      item.userPhoto && item.userPhoto.startsWith("http")
                        ? item.userPhoto
                        : `https://api.dicebear.com/7.x/initials/svg?seed=${item.userName || "User"}`
                    }
                    alt={item.userName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${item.userName || "User"}`;
                    }}
                  />

                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      {item.userName || "Anonymous Learner"}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">Community Member</p>
                  </div>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed pl-12">
                  {item.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}