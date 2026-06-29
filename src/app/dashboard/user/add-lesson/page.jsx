"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function AddLessonPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

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
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

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
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userId: session?.user?.id,
      likesCount: 0,
      favoritesCount: 0,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });

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
    <div className="min-h-screen bg-gray-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/40 p-8 sm:p-10">
        
        {/* Header section */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Add New Life Lesson
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Share your unique wisdom, life realizations, and core experiences with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lesson Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Embracing failure as a stepping stone"
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lesson Description
            </label>
            <textarea
              rows={6}
              name="description"
              required
              placeholder="Deeply explain your story or perspective here..."
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Cover Image
            </label>
            <div className="flex items-center gap-5 p-4 bg-gray-50/40 border border-gray-100 rounded-xl">
              <label className="group relative w-24 h-24 border-2 border-dashed border-gray-200 hover:border-purple-400 rounded-xl cursor-pointer overflow-hidden flex items-center justify-center bg-white transition-all">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="lesson thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <span className="text-2xl text-gray-400 group-hover:text-purple-500 transition-colors">+</span>
                )}
              </label>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {uploading ? "Uploading, please wait..." : "Choose a display cover"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supports PNG, JPG, WebP formats up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Dropdown Options Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              >
                <option value="Personal Growth">Personal Growth</option>
                <option value="Career">Career</option>
                <option value="Relationships">Relationships</option>
                <option value="Mindset">Mindset</option>
                <option value="Mistakes Learned">Mistakes Learned</option>
              </select>
            </div>

            {/* Emotional Tone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Emotional Tone
              </label>
              <select
                name="emotionalTone"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              >
                <option value="Motivational">Motivational</option>
                <option value="Sad">Sad</option>
                <option value="Realization">Realization</option>
                <option value="Gratitude">Gratitude</option>
              </select>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Visibility
              </label>
              <select
                name="visibility"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* Access Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Access Level
              </label>
              <select
                name="accessLevel"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              >
                <option value="free">Free</option>
                <option value="premium">Premium 👑</option>
              </select>
            </div>
          </div>

          {/* Form Action Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading || uploading}
              isLoading={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm py-6 rounded-xl shadow-lg shadow-purple-500/10 transition-all tracking-wider"
            >
              {loading ? "Publishing..." : "PUBLISH LESSON 🚀"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}