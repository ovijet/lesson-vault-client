"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddLessonPage() {
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const lessonData = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:5000/addLesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    if (data.insertedId) {
      toast.success("Add done");
      router.push("/dashboard/my-lesson");
    }
  } catch (error) {
    toast.error(error.message);
  }
};
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Add New Lesson
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            placeholder="Title"
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            name="lesson"
            placeholder="Write lesson..."
            className="w-full p-3 border rounded-xl"
          />

          <select name="category" className="w-full p-3 border rounded-xl">
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
          </select>

          <select
            name="emotionalTone"
            className="w-full p-3 border rounded-xl"
          >
            <option value="Motivational">Motivational</option>
            <option value="Inspirational">Inspirational</option>
            <option value="Sad">Sad</option>
            <option value="Grateful">Grateful</option>
            <option value="Reflective">Reflective</option>
          </select>

          <select name="visibility" className="w-full p-3 border rounded-xl">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <select name="accessLevel" className="w-full p-3 border rounded-xl">
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl"
          >
            Publish 🚀
          </button>
        </form>
      </div>
    </div>
  );
}