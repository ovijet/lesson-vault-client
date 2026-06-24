"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddLessonPage() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be below 5MB");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const lessonData = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      emotionalTone: form.get("emotionalTone"),
      visibility: form.get("visibility"),
      accessLevel: form.get("accessLevel"),

      image: imageUrl,

      isFeatured: false,
      isReviewed: false,

      likesCount: 0,
      favoritesCount: 0,

      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        "http://localhost:5000/addLesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lessonData),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Lesson Added Successfully");
        router.push("/dashboard/user/my-lesson");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">
          Add New Life Lesson
        </h1>

        <p className="text-gray-500 mb-8">
          Share your wisdom and life experience with others.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="font-medium mb-2 block">
              Lesson Title
            </label>

            <input
              type="text"
              name="title"
              required
              placeholder="Enter lesson title"
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium mb-2 block">
              Lesson Description
            </label>

            <textarea
              rows={6}
              name="description"
              required
              placeholder="Write your lesson..."
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-medium mb-3 block">
              Lesson Image
            </label>

            <div className="flex items-center gap-4">
              <label className="w-24 h-24 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="lesson"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-gray-400">
                    +
                  </span>
                )}
              </label>

              <div>
                <p className="font-medium">
                  {uploading
                    ? "Uploading..."
                    : "Upload Image"}
                </p>

                <p className="text-sm text-gray-500">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="font-medium mb-2 block">
              Category
            </label>

            <select
              name="category"
              className="w-full border rounded-xl p-3"
            >
              <option value="Personal Growth">
                Personal Growth
              </option>

              <option value="Career">
                Career
              </option>

              <option value="Relationships">
                Relationships
              </option>

              <option value="Mindset">
                Mindset
              </option>

              <option value="Mistakes Learned">
                Mistakes Learned
              </option>
            </select>
          </div>

          {/* Emotional Tone */}
          <div>
            <label className="font-medium mb-2 block">
              Emotional Tone
            </label>

            <select
              name="emotionalTone"
              className="w-full border rounded-xl p-3"
            >
              <option value="Motivational">
                Motivational
              </option>

              <option value="Sad">
                Sad
              </option>

              <option value="Realization">
                Realization
              </option>

              <option value="Gratitude">
                Gratitude
              </option>
            </select>
          </div>

          {/* Visibility */}
          <div>
            <label className="font-medium mb-2 block">
              Visibility
            </label>

            <select
              name="visibility"
              className="w-full border rounded-xl p-3"
            >
              <option value="public">
                Public
              </option>

              <option value="private">
                Private
              </option>
            </select>
          </div>

          {/* Access */}
          <div>
            <label className="font-medium mb-2 block">
              Access Level
            </label>

            <select
              name="accessLevel"
              className="w-full border rounded-xl p-3"
            >
              <option value="free">
                Free
              </option>

              <option value="premium">
                Premium
              </option>
            </select>
          </div>

          {/* Button */}
          <button
            disabled={loading || uploading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading
              ? "Publishing..."
              : "Publish Lesson 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}