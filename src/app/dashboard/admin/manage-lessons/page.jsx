"use client";

import { useEffect, useState } from "react";
import { BookOpen, Search, RotateCcw, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteModal } from "@/app/components/DeleteModal";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  
  // ফিল্টার ও সার্চ স্টেট
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [visibility, setVisibility] = useState("All Visibility");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);

  // ফিল্টারিং ডেটা ফেচিং ইফেক্ট লজিক
  useEffect(() => {
    const fetchLessons = async () => {
      // API query params build করা হচ্ছে
      const queryParams = new URLSearchParams();
      
      if (search.trim() !== "") queryParams.append("search", search);
      if (category !== "All Categories") queryParams.append("category", category);
      if (visibility !== "All Visibility") queryParams.append("visibility", visibility.toLowerCase());
      
      // Status filtering logic alignment
      if (status !== "All Status") {
        const isReviewedValue = status === "Reviewed" ? "true" : "false";
        queryParams.append("isReviewed", isReviewedValue);
      }
      
      queryParams.append("page", page.toString());

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson?${queryParams.toString()}`
        );
        if (res.ok) {
          const data = await res.json();
          setLessons(data);
        }
      } catch (error) {
        console.error("Error fetching filtered lessons:", error);
      }
    };

    fetchLessons();
  }, [search, category, visibility, status, page]); // এই ডিপেন্ডেন্সিগুলো চেঞ্জ হলেই অটোমেটিক ফিল্টার রান হবে

  // অ্যাকশন ফাংশনসমূহ
  const handleToggleFeature = async (id) => {
    console.log("Toggle Feature ID:", id);
  };

  const handleReview = async (id) => {
    console.log("Mark as Reviewed ID:", id);
  };

  // রিসেট ফিল্টার ফাংশন
  const handleReset = () => {
    setSearch("");
    setCategory("All Categories");
    setVisibility("All Visibility");
    setStatus("All Status");
    setPage(1);
  };

  // স্ট্যাটাস কাউন্টারসমূহ (Active array filter calculation)
  const publicLessonsCount = lessons.filter((l) => l.visibility?.toLowerCase() === "public").length;
  const privateLessonsCount = lessons.filter((l) => l.visibility?.toLowerCase() === "private").length;
  const reportedLessonsCount = lessons.filter((l) => l.isReported).length;

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 sm:p-5 font-sans text-slate-800 max-w-full mx-auto overflow-hidden">
      
      {/* ১. টপ মেট্রিক্স কার্ডস - কম্প্যাক্ট উইডথ ও হাইট */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6">
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg sm:rounded-xl"><BookOpen size={16} /></div>
          <div className="min-w-0">
            <h3 className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">Total</h3>
            <p className="text-base sm:text-xl font-black text-slate-800 leading-none mt-0.5">{lessons.length}</p>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg sm:rounded-xl"><BookOpen size={16} /></div>
          <div className="min-w-0">
            <h3 className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">Public</h3>
            <p className="text-base sm:text-xl font-black text-slate-800 leading-none mt-0.5">{publicLessonsCount}</p>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg sm:rounded-xl"><BookOpen size={16} /></div>
          <div className="min-w-0">
            <h3 className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">Private</h3>
            <p className="text-base sm:text-xl font-black text-slate-800 leading-none mt-0.5">{privateLessonsCount}</p>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg sm:rounded-xl"><BookOpen size={16} /></div>
          <div className="min-w-0">
            <h3 className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">Reported</h3>
            <p className="text-base sm:text-xl font-black text-slate-800 leading-none mt-0.5">{reportedLessonsCount}</p>
          </div>
        </div>
      </div>

      {/* হেডার */}
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">Manage Lessons</h1>
        <p className="text-[11px] sm:text-xs text-slate-500">Control system data sets, configurations mapping and metadata setup.</p>
      </div>

      {/* ২. ফিল্টার এবং সার্চ বার সেকশন - টাইট গ্রিড */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-5">
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="border border-slate-200 rounded-lg p-1.5 px-2 text-[11px] bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600 font-bold">
            <option>All Categories</option>
            <option>Mindset</option>
            <option>Life</option>
            <option>Success</option>
          </select>
          <select value={visibility} onChange={(e) => { setVisibility(e.target.value); setPage(1); }} className="border border-slate-200 rounded-lg p-1.5 px-2 text-[11px] bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600 font-bold">
            <option>All Visibility</option>
            <option>Public</option>
            <option>Private</option>
          </select>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="border border-slate-200 rounded-lg p-1.5 px-2 text-[11px] bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600 font-bold">
            <option>All Status</option>
            <option>Reviewed</option>
            <option>Not Reviewed</option>
          </select>
        </div>

        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative flex-1 md:w-56 lg:w-64">
            <Search className="absolute left-2.5 top-2 text-slate-400" size={13} />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-7 pr-3 py-1.5 border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <button onClick={handleReset} className="border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg text-[11px] font-bold hover:bg-slate-50 transition flex items-center gap-1 active:scale-95 ml-auto">
            <RotateCcw size={11} /> Reset
          </button>
        </div>
      </div>

      {/* ৩. আল্ট্রা-কম্প্যাক্ট টেবিল লেআউট */}
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto block">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold text-[10px] uppercase tracking-wider border-b border-slate-200">
                <th className="p-3 w-10 text-center">#</th>
                <th className="p-3 max-w-[180px]">Title / Info</th>
                <th className="p-3">Category</th>
                <th className="p-3">Visibility</th>
                <th className="p-3">Access</th>
                <th className="p-3 text-center">Featured</th>
                <th className="p-3 text-center">Reviewed</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-center w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px] font-bold text-slate-700">
              {lessons.map((lesson, idx) => (
                <tr key={lesson._id} className="hover:bg-slate-50/30 transition-all">
                  <td className="p-2.5 text-center text-slate-400 font-normal">{idx + 1}</td>
                  <td className="p-2.5">
                    <div className="flex items-center gap-2 max-w-[180px]">
                      <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-200/60 flex-shrink-0 bg-slate-50">
                        {lesson.image ? (
                          <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white"><BookOpen size={11}/></div>
                        )}
                      </div>
                      <div className="overflow-hidden min-w-0">
                        <div className="font-bold text-slate-900 truncate text-xs">{lesson.title}</div>
                        <div className="text-[10px] text-slate-400 font-normal truncate">{lesson.description || 'No summary text'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2.5">
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-50 text-purple-600 border border-purple-100/40">{lesson.category || "Mindset"}</span>
                  </td>
                  <td className="p-2.5">
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold border ${lesson.visibility?.toLowerCase() === "public" ? "bg-emerald-50 text-emerald-600 border-emerald-100/40" : "bg-red-50 text-red-600 border-red-100/40"}`}>
                      {lesson.visibility}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold border ${lesson.accessLevel?.toLowerCase() === "premium" ? "bg-amber-50 text-amber-600 border-amber-100/40" : "bg-blue-50 text-blue-600 border-blue-100/40"}`}>
                      {lesson.accessLevel || "Free"}
                    </span>
                  </td>
                  <td className="p-2.5 text-center font-bold text-slate-500">
                    {lesson.isFeatured ? "⭐ Yes" : "No"}
                  </td>
                  <td className="p-2.5 text-center font-bold text-slate-500">
                    {lesson.isReviewed ? "✅ Yes" : "No"}
                  </td>
                  <td className="p-2.5 text-slate-400 font-medium text-[10px]">
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A"}
                  </td>
                  <td className="p-2.5">
                    <div className="flex gap-1 justify-center items-center">
                      <button onClick={() => handleToggleFeature(lesson._id)} className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] px-2 py-1 rounded-lg flex items-center gap-0.5 font-bold shadow-sm active:scale-95 transition-all">
                        <Star size={10}/> Feature
                      </button>
                      <button onClick={() => handleReview(lesson._id)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] px-2 py-1 rounded-lg flex items-center gap-0.5 font-bold shadow-sm active:scale-95 transition-all">
                        <CheckCircle size={10}/> Review
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
          <div className="py-12 text-center bg-white">
            <BookOpen size={40} className="mx-auto text-slate-200 mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Lessons Found</h3>
          </div>
        )}

        {/* ৪. প্যাজিনেশন ফুটার */}
        {lessons.length > 0 && (
          <footer className="p-3 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-500 font-bold">
            <div>Showing {lessons.length} items</div>
            <div className="flex gap-1 items-center">
              <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="p-1 border border-slate-200 rounded-lg bg-white text-slate-400 disabled:opacity-50" disabled={page === 1}><ChevronLeft size={12}/></button>
              <button className={`px-2 py-0.5 rounded-lg ${page === 1 ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'}`} onClick={() => setPage(1)}>1</button>
              <button className={`px-2 py-0.5 rounded-lg ${page === 2 ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'}`} onClick={() => setPage(2)}>2</button>
              <span className="px-0.5 text-slate-300">...</span>
              <button onClick={() => setPage(p => p + 1)} className="p-1 border border-slate-200 rounded-lg bg-white text-slate-600"><ChevronRight size={12}/></button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}