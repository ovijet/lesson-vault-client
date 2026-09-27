"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FiUploadCloud, FiBookOpen, FiImage } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

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
        toast.success("Image uploaded successfully!");
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
        toast.success("Lesson Added Successfully!");
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
    <div className="py-6 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-3xl shadow-sm p-8 sm:p-10">
        
        {/* Header */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            <FiBookOpen className="text-emerald-600" /> Share Wisdom
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Add New Life Lesson
          </h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Share your unique wisdom, life realizations, and core experiences with our global community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Lesson Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Embracing failure as a stepping stone to growth"
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Lesson Description & Takeaway
            </label>
            <textarea
              rows={6}
              name="description"
              required
              placeholder="Deeply explain your story, context, and key takeaway for readers..."
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none font-medium"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Cover Image
            </label>
            <div className="flex items-center gap-5 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <label className="group relative w-24 h-24 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer overflow-hidden flex flex-col items-center justify-center bg-white transition-all">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="lesson cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <FiUploadCloud className="text-2xl text-slate-400 group-hover:text-emerald-600 transition-colors" />
                )}
              </label>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  {uploading ? "Uploading image..." : "Upload Cover Image"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PNG, JPG, WebP formats up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Dropdowns Grid */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {/* Category */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                name="category"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value="Personal Growth">Personal Growth</option>
                <option value="Career & Professional">Career & Professional</option>
                <option value="Relationships & Family">Relationships & Family</option>
                <option value="Education & Learning">Education & Learning</option>
                <option value="Leadership & Management">Leadership & Management</option>
                <option value="Finance & Money">Finance & Money</option>
                <option value="Health & Wellbeing">Health & Wellbeing</option>
              </select>
            </div>

            {/* Emotional Tone */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Emotional Tone
              </label>
              <select
                name="emotionalTone"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value="Motivational">Motivational</option>
                <option value="Realization">Realization</option>
                <option value="Gratitude">Gratitude</option>
                <option value="Reflective">Reflective</option>
              </select>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Visibility
              </label>
              <select
                name="visibility"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value="public">Public (Visible to everyone)</option>
                <option value="private">Private (Only you can view)</option>
              </select>
            </div>

            {/* Access Level */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Access Tier
              </label>
              <select
                name="accessLevel"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value="free">Free Access</option>
                <option value="premium">Premium Pro Exclusive 👑</option>
              </select>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={loading || uploading}
              isLoading={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              {loading ? "Publishing Lesson..." : "PUBLISH LESSON NOW 🚀"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}