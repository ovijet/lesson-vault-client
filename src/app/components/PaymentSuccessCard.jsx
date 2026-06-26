"use client";

import { BookOpen, Home, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentSuccessCard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10"
      >
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-center text-6xl font-black text-gray-900 font-serif">
          Wisdom Unlocked!
        </h1>

        <p className="text-center text-3xl text-green-600 mt-4 font-semibold">
          Payment Successful
        </p>

        <p className="mt-8 text-center text-gray-500 text-xl leading-9 max-w-xl mx-auto">
          Thank you for investing in your journey. Your premium membership is
          now active. Unlock exclusive lessons and enjoy unlimited learning.
        </p>

        {/* Membership Box */}
        <div className="mt-12 border rounded-3xl p-7 flex gap-5 items-start bg-gray-50">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <Sparkles className="text-green-600" />
          </div>

          <div>
            <h2 className="font-bold text-2xl text-gray-900">
              PREMIUM MEMBERSHIP ACTIVE
            </h2>

            <p className="text-gray-500 mt-2 text-lg">
              Unlimited access to premium lessons, exclusive content and future
              updates.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 space-y-5">
          <Link href="/lessons">
            <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl flex justify-center items-center gap-3 transition">
              <BookOpen size={24} />
              Dive Into Content
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 py-5 rounded-2xl font-bold text-xl flex justify-center items-center gap-3 transition">
              <Home size={24} />
              Return to Dashboard
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}