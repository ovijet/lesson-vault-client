"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCheckCircle, FiSend } from "react-icons/fi";
// import { FaGraduationCap, FaSparkles } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function CommunityNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }
    setSubmitted(true);
    toast.success("Welcome to Lesson Vault Weekly Digest!");
  };

  return (
    <section className="py-20 bg-white font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-[3rem] p-8 sm:p-14 md:p-16 text-white shadow-2xl overflow-hidden border border-emerald-900/60">
          {/* Glowing Backlight circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy (7 columns) */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-500/30">
                {/* <FaSparkles className="text-emerald-400" /> */} Weekly
                Wisdom Digest
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Get the Top 3 Life Lessons Delivered to Your Inbox
              </h2>

              <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Every Sunday, we summarize the most upvoted career, leadership,
                and personal wisdom shared by our global community. No spam,
                just pure actionable growth.
              </p>

              {/* Feature Points */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <FiCheckCircle className="text-emerald-400 text-lg flex-shrink-0" />
                  <span>Curated by top contributors</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <FiCheckCircle className="text-emerald-400 text-lg flex-shrink-0" />
                  <span>5-minute Sunday morning read</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <FiCheckCircle className="text-emerald-400 text-lg flex-shrink-0" />
                  <span>Exclusive member insights</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <FiCheckCircle className="text-emerald-400 text-lg flex-shrink-0" />
                  <span>Unsubscribe anytime in 1-click</span>
                </div>
              </div>
            </div>

            {/* Right Form Card (5 columns) */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/15 shadow-2xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-extrabold shadow-lg shadow-emerald-500/30">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      You're Subscribed!
                    </h3>
                    <p className="text-slate-300 text-sm">
                      Check your inbox this Sunday for your first edition of
                      hand-picked wisdom.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                      <FiMail className="text-emerald-400" /> Join 12,000+
                      Readers
                    </h3>
                    <p className="text-slate-300 text-xs mb-4">
                      Enter your email to receive weekly highlights:
                    </p>

                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                        required
                      />

                      <button
                        type="submit"
                        className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2.5 text-sm"
                      >
                        <FiSend className="text-base" /> Subscribe Free
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center mt-3">
                      We respect your privacy. No spam ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
