"use client";

import { useEffect, useState } from "react";
import { BookOpen, Search, RotateCcw, Star, CheckCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteModal } from "@/app/components/DeleteModal";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  
  // ফিল্টার ও সার্চ স্টেট (নতুন যুক্ত করা হয়েছে)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [visibility, setVisibility] = useState("All Visibility");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);

  // ডেটা ফেচিং (সার্চ ও ফিল্টার কুয়েরি সহ)
  useEffect(() => {
    const fetchLessons = async () => {
      // আপনার ফিল্টারিং প্যারামিটার ব্যাকএন্ডে পাঠানোর জন্য কুয়েরি বিল্ড করা হলো
      const queryParams = new URLSearchParams({
        search,
        category: category !== "All Categories" ? category : "",
        visibility: visibility !== "All Visibility" ? visibility : "",
        status: status !== "All Status" ? status : "",
        page: page.toString(),
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson?${queryParams.toString()}`
      );
      const data = await res.json();
      setLessons(data);
    };

    fetchLessons();
  }, [search, category, visibility, status, page]);

  // অ্যাকশন ফাংশনসমূহ (নতুন লজিক)
  const handleToggleFeature = async (id) => {
    console.log("Toggle Feature ID:", id);
    // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${id}/feature`, { method: "PATCH" });
  };

  const handleReview = async (id) => {
    console.log("Mark as Reviewed ID:", id);
    // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${id}/review`, { method: "PATCH" });
  };

  // রিসেট ফিল্টার ফাংশন
  const handleReset = () => {
    setSearch("");
    setCategory("All Categories");
    setVisibility("All Visibility");
    setStatus("All Status");
    setPage(1);
  };

  // স্ট্যাটাস কাউন্টারসমূহ (ফিল্টার ছাড়া টোটাল ডেটার ওপর ভিত্তি করে)
  const publicLessonsCount = lessons.filter((l) => l.visibility?.toLowerCase() === "public").length;
  const privateLessonsCount = lessons.filter((l) => l.visibility?.toLowerCase() === "private").length;
  const reportedLessonsCount = lessons.filter((l) => l.isReported).length; // যদি স্কিমাতে থাকে

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans text-slate-800">
      
      {/* ১. টপ মেট্রিক্স কার্ডস (ডিজাইন আপডেট করা হয়েছে) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><BookOpen size={24} /></div>
          <div>
            <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Lessons</h3>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{lessons.length}</p>
            <p className="text-xs text-slate-400 mt-0.5">All lessons in system</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><BookOpen size={24} /></div>
          <div>
            <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Public Lessons</h3>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{publicLessonsCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Visible to all users</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><BookOpen size={24} /></div>
          <div>
            <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Private Lessons</h3>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{privateLessonsCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Only for premium users</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><BookOpen size={24} /></div>
          <div>
            <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Reported Lessons</h3>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{reportedLessonsCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Flagged by users</p>
          </div>
        </div>
      </div>

      {/* হেডার */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Lessons</h1>
          <p className="text-sm text-slate-500">Manage all lessons created by users</p>
        </div>
      </div>

      {/* ২. ফিল্টার এবং সার্চ বার সেকশন (নতুন যুক্ত করা হয়েছে) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex flex-wrap gap-3">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
            <option>All Categories</option>
            <option>Mindset</option>
            <option>Life</option>
            <option>Success</option>
            <option>Productivity</option>
          </select>
          <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
            <option>All Visibility</option>
            <option>Public</option>
            <option>Private</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
            <option>All Status</option>
            <option>Reviewed</option>
            <option>Not Reviewed</option>
          </select>
        </div>

        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            <input type="text" placeholder="Search lessons by title..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm">Search</button>
          <button onClick={handleReset} className="border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition flex items-center gap-1">
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* ৩. আপগ্রেডেড টেবিল ডিজাইন (Grid থেকে HTML Table এ কনভার্ট করা হয়েছে নিখুঁত ডিজাইনের জন্য) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase border-b border-slate-200">
                <th className="p-4 w-12">#</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Visibility</th>
                <th className="p-4">Access Level</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Reviewed</th>
                <th className="p-4">Created At</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm font-medium text-slate-700">
              {lessons.map((lesson, idx) => (
                <tr key={lesson._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 text-slate-400">{idx + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                        {lesson.image ? (
                          <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white"><BookOpen size={16}/></div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{lesson.title}</div>
                        <div className="text-xs text-slate-400 line-clamp-1 max-w-[200px] font-normal">{lesson.description || 'No description available'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600">{lesson.category || "Mindset"}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${lesson.visibility?.toLowerCase() === "public" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                      {lesson.visibility}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${lesson.accessLevel?.toLowerCase() === "premium" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
                      {lesson.accessLevel || "Free"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1 text-xs font-bold ${lesson.isFeatured ? "text-emerald-600" : "text-red-500"}`}>
                      {lesson.isFeatured ? "⭐ Yes" : "❌ No"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1 text-xs font-bold ${lesson.isReviewed ? "text-emerald-600" : "text-red-500"}`}>
                      {lesson.isReviewed ? "✅ Yes" : "❌ No"}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-xs">
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                  </td>
                  {/* ইমেজ অনুযায়ী বাটনসমূহ */}
                  <td className="p-4">
                    <div className="flex gap-2 justify-center items-center">
                      <button onClick={() => handleToggleFeature(lesson._id)} className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold shadow-sm transition">
                        <Star size={12}/> Feature
                      </button>
                      <button onClick={() => handleReview(lesson._id)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold shadow-sm transition">
                        <CheckCircle size={12}/> Review
                      </button>
                      <DeleteModal lesson={lesson} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* নো লেসন ফাউন্ড স্টেট */}
        {lessons.length === 0 && (
          <div className="py-20 text-center">
            <BookOpen size={60} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No Lessons Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* ৪. প্যাজিনেশন ফুটার (নতুন যুক্ত করা হয়েছে) */}
        {lessons.length > 0 && (
          <footer className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
            <div>Showing 1 to {lessons.length} of 120 lessons</div>
            <div className="flex gap-1 items-center">
              <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="p-2 border border-slate-200 rounded-lg hover:bg-white text-slate-400 disabled:opacity-50" disabled={page === 1}><ChevronLeft size={16}/></button>
              <button className={`px-3.5 py-1.5 rounded-lg font-bold ${page === 1 ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`} onClick={() => setPage(1)}>1</button>
              <button className={`px-3.5 py-1.5 rounded-lg font-bold ${page === 2 ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`} onClick={() => setPage(2)}>2</button>
              <button className={`px-3.5 py-1.5 rounded-lg font-bold ${page === 3 ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`} onClick={() => setPage(3)}>3</button>
              <span className="px-2">...</span>
              <button className="px-3.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700" onClick={() => setPage(15)}>15</button>
              <button onClick={() => setPage(p => p + 1)} className="p-2 border border-slate-200 rounded-lg hover:bg-white text-slate-600"><ChevronRight size={16}/></button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}