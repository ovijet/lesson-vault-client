"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { FiCheck, FiStar, FiZap, FiShield, FiUsers, FiCrown } from "react-icons/fi";
import { FaCrown } from "react-icons/fa6";
import Link from "next/link";

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
  };

  return (
    <div className="bg-slate-50/60 text-slate-800 min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-200 shadow-xs">
          <FiZap className="text-emerald-600 text-sm" /> Simple & Transparent Pricing
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Invest in Your <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
            Lifelong Growth
          </span>
        </h1>

        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Unlock unlimited real-world life lessons, verified expert wisdom, priority publishing, and exclusive community perks.
        </p>
      </div>

      {/* 3 Tier Cards Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-stretch">
        
        {/* 1. Starter Pack (Free) */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Starter Pack</h3>
                <p className="text-slate-500 text-xs mt-1">For casual learners</p>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                Active
              </span>
            </div>
            
            <div className="flex items-baseline text-slate-900 mb-6">
              <span className="text-4xl sm:text-5xl font-black">৳০</span>
              <span className="text-slate-400 text-xs sm:text-sm font-semibold ml-2">/ forever free</span>
            </div>
            
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Begin tracking your learning milestones and explore public community lessons.
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 mb-8 border-t border-slate-100 pt-6">
              <li className="flex items-center gap-3">
                <FiCheck className="text-emerald-500 font-bold text-base flex-shrink-0" />
                <span>Build up to 5 custom lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-emerald-500 font-bold text-base flex-shrink-0" />
                <span>Browse public shared content</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-emerald-500 font-bold text-base flex-shrink-0" />
                <span>Basic personal dashboard</span>
              </li>
            </ul>
          </div>

          <Button
            disabled
            className="w-full bg-slate-100 border border-slate-200 text-slate-400 font-bold text-xs py-4 rounded-2xl cursor-not-allowed uppercase tracking-wider"
          >
            FREE PLAN ACTIVE
          </Button>
        </div>

        {/* 2. Pro Member (Highlighted Recommended) */}
        <div className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white border-2 border-emerald-500/80 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-emerald-900/30 relative scale-105 z-10">
          
          {/* Recommended Pill */}
          <span className="absolute -top-3.5 right-8 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
            MOST POPULAR ✨
          </span>

          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  Pro Member <FaCrown className="text-amber-400 text-lg" />
                </h3>
                <p className="text-emerald-300/80 text-xs mt-1">For dedicated growth seekers</p>
              </div>
            </div>
            
            <div className="flex items-baseline text-white mb-6">
              <span className="text-4xl sm:text-5xl font-black">৳১৫০০</span>
              <span className="text-emerald-300/70 text-xs sm:text-sm font-semibold ml-2">/ one-time lifetime</span>
            </div>
            
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              Gain full capability with unlimited private lessons, zero restrictions, and elite contributor status.
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-8 border-t border-white/10 pt-6">
              <li className="flex items-center gap-3">
                <FiCheck className="text-emerald-400 font-bold text-base flex-shrink-0" />
                <span><strong>Unlimited</strong> lesson creation</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-emerald-400 font-bold text-base flex-shrink-0" />
                <span>Access all <strong>PRO & Exclusive</strong> materials</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-emerald-400 font-bold text-base flex-shrink-0" />
                <span>Distinguished <strong>Verified Pro Badge</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-emerald-400 font-bold text-base flex-shrink-0" />
                <span>Priority moderation & support</span>
              </li>
            </ul>
          </div>

          <form action="/api/checkout_sessions" method="POST" onSubmit={handleSubmit} className="w-full">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm py-4 rounded-2xl uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:scale-105 cursor-pointer"
            >
              {isLoading ? "Redirecting to Stripe..." : "UNLOCK PRO LIFETIME ACCESS"}
            </Button>
          </form>
        </div>

        {/* 3. Team Hub Plan */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Team Hub</h3>
                <p className="text-slate-500 text-xs mt-1">For organizations & study groups</p>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200">
                Group
              </span>
            </div>
            
            <div className="flex items-baseline text-slate-900 mb-6">
              <span className="text-4xl sm:text-5xl font-black">৳৪৫০০</span>
              <span className="text-slate-400 text-xs sm:text-sm font-semibold ml-2">/ annual</span>
            </div>
            
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Perfect for small teams, study circles, or companies wanting shared lesson repositories.
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 mb-8 border-t border-slate-100 pt-6">
              <li className="flex items-center gap-3">
                <FiCheck className="text-teal-600 font-bold text-base flex-shrink-0" />
                <span>Everything in Pro Member pack</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-teal-600 font-bold text-base flex-shrink-0" />
                <span>Up to <strong>5 team member seats</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-teal-600 font-bold text-base flex-shrink-0" />
                <span>Shared team vault & workspace</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-teal-600 font-bold text-base flex-shrink-0" />
                <span>Centralized admin controls</span>
              </li>
            </ul>
          </div>

          <a
            href="mailto:support@lessonvault.com?subject=Team%20Hub%20Plan"
            className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-4 rounded-2xl uppercase tracking-wider transition-all shadow-md block"
          >
            CONTACT SALES TEAM
          </a>
        </div>

      </div>
    </div>
  );
}