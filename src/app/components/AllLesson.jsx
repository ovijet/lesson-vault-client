"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import AllLessonCard from "./AllLessonCard";

const AllLesson = () => {
  const { data: session } = authClient.useSession();

  const isPremiumUser = session?.user?.plan === "premium";

  const [lessons, setLessons] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson`
      );

      const data = await res.json();

      setLessons(data);
    };

    fetchLessons();
  }, []);

  const filteredLessons = lessons.filter((lesson) => {
    const matchSearch =
      lesson.title?.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" || lesson.category === category;

    return matchSearch && matchCategory;
  });

  const categories = [
    "all",
    ...new Set(lessons.map((lesson) => lesson.category)),
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold">Life Lessons</h1>
        <p>Discover inspiring lessons to improve your life.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">

        <input
          type="text"
          placeholder="Search lesson..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredLessons.map((lesson) => (
          <AllLessonCard
            key={lesson._id}
            lesson={lesson}
            isPremiumUser={isPremiumUser}
          />
        ))}

      </div>

    </div>
  );
};

export default AllLesson;