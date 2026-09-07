import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import AllLessonCard from "./AllLessonCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AddLesson = async () => {

  const session = await auth.api.getSession({
      headers: await headers(),
    });

  let data = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/featuredLessons`,
      {
        cache: "no-store",
      }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch (err) {
    console.error("Featured lessons fetch error:", err);
  }

  const isPremiumUser = session?.user?.plan === "premium";

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50/50 via-white to-white font-sans">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-200">
              ✨ Hand-Picked Insights
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Life Lessons</span>
            </h2>

            <p className="text-slate-600 mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
              Discover real-life experiences shared by mentors and learners designed to inspire growth, resilience, and personal clarity.
            </p>
          </div>

          <Link
            href="/public-lessons"
            className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-600/20 text-sm whitespace-nowrap"
          >
            View All Lessons
            <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
          </Link>
        </div>

        {/* Cards */}
        {Array.isArray(data) && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {data.map((lesson) => (
              <AllLessonCard
                key={lesson._id}
                lesson={lesson}
                isPremiumUser={isPremiumUser}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 bg-slate-50 border border-slate-200/80 rounded-3xl text-slate-500 max-w-lg mx-auto">
            <p className="text-base font-semibold">Featured lessons are loading or temporarily unavailable.</p>
            <p className="text-xs text-slate-400 mt-1">Explore all public lessons in our main directory.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddLesson;