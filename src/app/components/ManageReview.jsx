"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Surface, Button } from "@heroui/react";
import { PencilLine } from "lucide-react"; // সুন্দর এডিট আইকন

const EditModal = ({ lesson, onUpdated }) => {
  const [loading, setLoading] = useState(false);

  // শুরুতে lesson অবজেক্ট না থাকলে ক্রাশ এড়াতে সেফটি গার্ড
  if (!lesson) {
    return (
      <Button variant="outline" size="sm" isIconOnly disabled>
        <PencilLine size={16} />
      </Button>
    );
  }

  // ================= Update Lesson =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lesson?._id) return;

    setLoading(true);
    const form = new FormData(e.target);

    const lessonData = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      emotionalTone: form.get("emotionalTone"),
      visibility: form.get("visibility"),
      accessLevel: form.get("accessLevel"),
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${lesson._id}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        toast.success("Lesson Updated Successfully");
        if (onUpdated) {
          onUpdated(); // মেইন পেজের ডেটা রিয়েল-টাইমে রিফ্রেশ করবে
        }
      } else {
        toast.info("Nothing Changed");
      }
    } catch (err) {
      console.error("Caught error:", err.message);
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      {/* টেক্সটের বদলে আইকন বাটন এবং টেবিল ফ্রেন্ডলি সাইজিং */}
      <Button 
        variant="outline" 
        size="sm" 
        isIconOnly 
        className="h-8 w-8 min-w-8 rounded-lg border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
        aria-label="Edit lesson"
      >
        <PencilLine size={15} strokeWidth={2.2} />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl text-left">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-base font-extrabold text-slate-900">Edit Lesson</Modal.Heading>
              <p className="mt-0.5 text-xs text-slate-400 font-medium">
                Update your lesson information and metadata setup
              </p>
            </Modal.Header>

            <Modal.Body className="p-5 whitespace-normal">
              <Surface variant="default" className="border-0 p-0 shadow-none bg-transparent">
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
                  
                  {/* Title */}
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Title</label>
                    <input
                      name="title"
                      defaultValue={lesson?.title}
                      className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Description</label>
                    <textarea
                      rows={5}
                      name="description"
                      defaultValue={lesson?.description}
                      className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-green-500 navigate-none resize-none"
                      required
                    />
                  </div>

                  {/* Category & Emotional Tone - দুই কলামের গ্রিড */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Category</label>
                      <select
                        name="category"
                        defaultValue={lesson?.category || "Mindset"}
                        className="w-full border border-slate-200 rounded-xl p-2.5 bg-white cursor-pointer font-medium text-slate-800 focus:outline-none"
                      >
                        <option>Personal Growth</option>
                        <option>Career</option>
                        <option>Relationships</option>
                        <option>Mindset</option>
                        <option>Mistakes Learned</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Emotional Tone</label>
                      <select
                        name="emotionalTone"
                        defaultValue={lesson?.emotionalTone || "Motivational"}
                        className="w-full border border-slate-200 rounded-xl p-2.5 bg-white cursor-pointer font-medium text-slate-800 focus:outline-none"
                      >
                        <option>Motivational</option>
                        <option>Sad</option>
                        <option>Realization</option>
                        <option>Gratitude</option>
                      </select>
                    </div>
                  </div>

                  {/* Visibility & Access Level - দুই কলামের গ্রিড */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Visibility</label>
                      <select
                        name="visibility"
                        defaultValue={lesson?.visibility || "public"}
                        className="w-full border border-slate-200 rounded-xl p-2.5 bg-white cursor-pointer font-medium text-slate-800 focus:outline-none"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Access Level</label>
                      <select
                        name="accessLevel"
                        defaultValue={lesson?.accessLevel || "free"}
                        className="w-full border border-slate-200 rounded-xl p-2.5 bg-white cursor-pointer font-medium text-slate-800 focus:outline-none"
                      >
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl transition-colors shadow-sm font-bold mt-2 disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Lesson"}
                  </button>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditModal;