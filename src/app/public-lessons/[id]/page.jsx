import Comments from "@/app/components/comment";
import React from "react";

const PublicPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      
    <Comments lessonId={id}/>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <img
    src={data.image}
    alt={data.title}
    className="w-full h-[300px] md:h-[450px] object-cover transition duration-700 group-hover:scale-105"
  />


          <div className="p-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {data.category}
              </span>

              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {data.lessonType}
              </span>

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  data.status === "PUBLIC"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.status}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {data.title}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">Likes</h3>
            <p className="text-3xl font-bold text-pink-600">{data.likes}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">Comments</h3>
            <p className="text-3xl font-bold text-blue-600">{data.comments}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">Featured</h3>
            <p className="text-3xl font-bold text-amber-500">
              {data.isFeatured ? "Yes" : "No"}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">Reviewed</h3>
            <p className="text-3xl font-bold text-green-600">
              {data.isReviewed ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Lesson Story */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Full Lesson Details
          </h2>

          <p className="text-gray-600 leading-8">
            {data.description}
          </p>

          <div className="mt-6 border-t pt-6">
            <p className="text-gray-500">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            👍 Like Lesson
          </button>

          <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
            💬 Add Comment
          </button>
        </div>
      </div>
    </div>

  );
};

export default PublicPage;