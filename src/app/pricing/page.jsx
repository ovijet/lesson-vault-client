"use client";

import { Button } from "@heroui/react";
import { useState } from "react";

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
  };

  return (
    <div className="bg-gray-50 text-gray-700 min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-purple-600 uppercase block mb-3">
          CHOOSE YOUR PATH
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Accelerate your skills, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic">
            made effortless.
          </span>
        </h1>
        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
          Secure your personal knowledge base and unlock exclusive insights from top learners. 
          Pick the perfect plan for your growth.
        </p>
      </div>

      {/* 3 Cards Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-start">
        
        {/* 1. Starter Pack (Free) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 relative flex flex-col justify-between h-[540px] shadow-sm transition-all hover:shadow-md hover:border-gray-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">Starter Pack</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded">
                CURRENT
              </span>
            </div>
            
            <div className="flex items-baseline text-gray-900 mb-6">
              <span className="text-4xl font-extrabold">৳০</span>
              <span className="text-gray-400 text-sm ml-2">/ always free</span>
            </div>
            
            <p className="text-xs text-gray-500 mb-8 leading-relaxed">
              Begin tracking your learning milestones and explore public study materials.
            </p>

            <ul className="space-y-4 text-xs text-gray-600">
              <li className="flex items-center gap-3">
                <span className="text-gray-400 font-bold text-sm">✓</span> Build up to 5 custom lessons
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400 font-bold text-sm">✓</span> Browse community shared content
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400 font-bold text-sm">✓</span> Basic stats dashboard
              </li>
            </ul>
          </div>

          <Button
            disabled
            className="w-full bg-transparent border border-gray-200 text-gray-400 font-bold text-xs py-5 rounded-xl cursor-not-allowed uppercase tracking-wider"
          >
            CURRENTLY ACTIVE
          </Button>
        </div>

        {/* 2. Pro Member (Highlighted - One Time) */}
        <div className="bg-white border-2 border-purple-500 rounded-2xl p-6 relative flex flex-col justify-between h-[540px] shadow-xl shadow-purple-100/50 transition-all hover:shadow-2xl hover:shadow-purple-100">
          {/* Recommended Badge */}
          <span className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
            RECOMMENDED
          </span>

          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Pro Member <span className="text-purple-500 text-sm">⭐</span>
              </h3>
              <span className="text-xl">👑</span>
            </div>
            
            <div className="flex items-baseline text-gray-900 mb-6">
              <span className="text-4xl font-extrabold">৳১৫০০</span>
              <span className="text-gray-400 text-sm ml-2">/ One-time</span>
            </div>
            
            <p className="text-xs text-gray-500 mb-8 leading-relaxed">
              Gain full capability with unconstrained resources, zero interruptions, and elite tools.
            </p>

            <ul className="space-y-4 text-xs text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-purple-600 font-bold text-sm">✓</span> Endless lesson creation
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-600 font-bold text-sm">✓</span> Publish private & locked items
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-600 font-bold text-sm">✓</span> Unrestricted access to pro materials
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-600 font-bold text-sm">✓</span> Elite Verified Badge
              </li>
            </ul>
          </div>

          <form action="/api/checkout_sessions" method="POST" onSubmit={handleSubmit} className="w-full">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs py-5 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md shadow-purple-500/20"
            >
              {isLoading ? "Processing..." : "UNLOCK PRO ACCESS"}
            </Button>
          </form>
        </div>

        {/* 3. Team Plan (Monthly/Annual Alternative) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 relative flex flex-col justify-between h-[540px] shadow-sm transition-all hover:shadow-md hover:border-gray-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">Team Hub</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-600 px-2 py-1 rounded">
                ORGANIZATION
              </span>
            </div>
            
            <div className="flex items-baseline text-gray-900 mb-6">
              <span className="text-4xl font-extrabold">৳৪৫০০</span>
              <span className="text-gray-400 text-sm ml-2">/ annual</span>
            </div>
            
            <p className="text-xs text-gray-500 mb-8 leading-relaxed">
              Perfect for small groups, study circles, or institutions wanting shared environments.
            </p>

            <ul className="space-y-4 text-xs text-gray-600">
              <li className="flex items-center gap-3">
                <span className="text-blue-500 font-bold text-sm">✓</span> Everything in Pro Member pack
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 font-bold text-sm">✓</span> Up to 5 team member seats
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 font-bold text-sm">✓</span> Collaborative shared dashboard
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 font-bold text-sm">✓</span> Centralized billing & analytics
              </li>
            </ul>
          </div>

          <Button
            size="sm"
            className="w-full bg-gray-600 hover:bg-gray-800 text-white font-bold text-xs py-5 rounded-xl uppercase tracking-wider transition-all"
          >
            CONTACT SALES
          </Button>
        </div>

      </div>
    </div>
  );
}