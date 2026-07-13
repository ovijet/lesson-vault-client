"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BookOpen, Home, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage({ customerEmail }) {

  const { data: session, refetch } = authClient.useSession();
  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    const updatePremium = async () => {
      
      const emailToUpdate = customerEmail || session?.user?.email;
      
      if (!emailToUpdate) return;

      try {
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/subscription`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailToUpdate,
            }),
          }
        );

        if (response.ok) {
         
          await refetch();
        }
      } catch (err) {
        console.error("Failed to update premium status:", err);
      } finally {
        setIsUpdating(false);
      }
    };

    updatePremium();
  }, [session?.user?.email, customerEmail, refetch]); 
  return (
    <section id="success">
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center px-4 py-10">
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
          <h1 className="mt-8 text-center text-5xl sm:text-6xl font-black text-gray-900 font-serif">
            Wisdom Unlocked!
          </h1>

          <p className="text-center text-2xl sm:text-3xl text-green-600 mt-4 font-semibold">
            Payment Successful 🎉
          </p>

          <p className="mt-8 text-center text-gray-500 text-lg sm:text-xl leading-9 max-w-xl mx-auto">
            Thank you for investing in your journey. Your premium membership is
            now active. Unlock exclusive lessons and enjoy unlimited learning.
          </p>

          {/* Membership Box */}
          <div className="mt-12 border rounded-3xl p-7 flex gap-5 items-start bg-gray-50">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-green-600" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-xl sm:text-2xl text-gray-900 uppercase tracking-wide">
                {isUpdating ? "Configuring Access..." : "PREMIUM MEMBERSHIP ACTIVE 💎"}
              </h2>

              <p className="text-gray-500 mt-2 text-base sm:text-lg">
                {isUpdating 
                  ? "Syncing your payment details with the server, please wait..."
                  : "Unlimited access to premium lessons, exclusive content and future updates."}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-12 space-y-4">
            <Link href="/public-lessons">
              <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl flex justify-center items-center gap-3 transition shadow-md">
                <BookOpen size={24} />
                Dive Into Content
              </button>
            </Link>
            
            <Link href="/">
              <button className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl flex justify-center items-center gap-3 transition">
                <Home size={24} />
                Return to Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}