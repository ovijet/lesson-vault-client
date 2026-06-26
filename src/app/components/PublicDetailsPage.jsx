 'use client'
 
 import React from 'react';

import { authClient } from "@/lib/auth-client";
import LikeLove from './LinkLove';
import Comments from './comment';

const PublicDetailsPage = ({data}) => {

const { data: session } = authClient.useSession();
console.log(session,'ddddddddddddd');


console.log("Lesson Access:", data.accessLevel);
console.log("User Plan:", session?.user?.plan);
console.log("Is Premium:", session?.user?.plan === "premium");


 const isPremiumUser = session?.user?.plan === "premium";
  if (
    data.accessLevel === "premium" &&
    !isPremiumUser
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1f5b38]">
        <div className="text-center">
          <h1 className="text-5xl text-white font-bold mb-5">
            Premium Lesson
          </h1>

          <p className="text-gray-300 mb-8">
            This lesson is exclusive for premium members.
          </p>

          <a
            href="/pricing"
            className="bg-yellow-500 px-8 py-4 rounded-xl text-xl font-bold"
          >
            Upgrade to View
          </a>
        </div>
      </div>
    );
  }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
      
    
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

export default PublicDetailsPage;