import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import AllLessonCard from "./AllLessonCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AddLesson = async () => {

  const session = await auth.api.getSession({
      headers: await headers(),
    });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featuredLessons`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();


  const isPremiumUser = session?.user?.plan === "premium";


  return (
    <section className="py-20 bg-gradient-to-b from-green-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-14 gap-6">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
              ✨ Featured Collection
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Featured Life Lessons
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl text-lg">
              Discover hand-picked life lessons designed to inspire growth,
              improve relationships, and help you build a better future.
            </p>
          </div>

          <Link
            href="/public-lessons"
            className="group inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-7 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View All Lessons
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {data.map((lesson) => (
            <AllLessonCard
              key={lesson._id}
              lesson={lesson}
              isPremiumUser={isPremiumUser}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddLesson;