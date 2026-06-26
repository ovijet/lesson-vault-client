"use client";

import { useEffect, useState } from "react";

export default function Comments({ lessonId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${lessonId}`
      );

      const data = await res.json();

      console.log("Comments:", data);

      console.log(lessonId,'idddddddddd');

      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lessonId) {
      fetchComments();
    }
  }, [lessonId]);

  const handleComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId,
            userName: "Admin",
            userPhoto: "https://i.pravatar.cc/150?img=1",
            comment: text,
          }),
        }
      );

      const result = await res.json();

      console.log(result);

      setText("");

      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Comments ({comments.length})
      </h2>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border p-3 rounded-lg flex-1"
        />

        <button
          onClick={handleComment}
          className="bg-green-600 text-white px-6 rounded-lg"
        >
          Post
        </button>
      </div>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={item.userPhoto}
                  alt={item.userName}
                  className="w-10 h-10 rounded-full"
                />

                <h3 className="font-bold">
                  {item.userName}
                </h3>
              </div>

              <p>{item.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}