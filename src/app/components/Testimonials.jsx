"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";
import { BiSpreadsheet, BiUserVoice, BiBriefcase, BiHeart } from "react-icons/bi";

const categories = [
  { id: "all", label: "All Stories", icon: BiUserVoice },
  { id: "career", label: "Career & Growth", icon: BiBriefcase },
  { id: "life", label: "Life Wisdom", icon: BiHeart },
];

const testimonials = [
  {
    id: 1,
    category: "career",
    name: "Dr. Ayesha Rahman",
    role: "Senior Software Architect",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Career & Leadership",
    quote: "Lesson Vault has transformed how our team shares tacit knowledge. The actionable insights on leadership and navigating high-stakes engineering projects saved us months of trial and error.",
    date: "Verified Reader • 2 days ago"
  },
  {
    id: 2,
    category: "life",
    name: "Tanvir Ahmed",
    role: "UX Researcher & Writer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Personal Mindset",
    quote: "Reading real stories from people who overcame setbacks gave me the clarity I needed when changing careers. This community offers genuine wisdom you can't find in standard textbooks.",
    date: "Verified Contributor • 1 week ago"
  },
  {
    id: 3,
    category: "career",
    name: "Samiul Hoque",
    role: "Product Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Entrepreneurship",
    quote: "The lessons on decision-making under uncertainty are gold dust. I bookmark new lessons every morning before starting my day—it's become my daily mental warm-up.",
    date: "Verified Pro Member • 3 days ago"
  },
  {
    id: 4,
    category: "life",
    name: "Nusrat Jahan",
    role: "Educator & Mentor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Life Balance",
    quote: "I use these real-world lessons in my mentoring sessions with students. The depth of authenticity and community engagement is unmatched.",
    date: "Top Contributor • 5 days ago"
  }
];

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTestimonials = activeCategory === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden font-sans">
      {/* Background Subtle Blurs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/60"
          >
            <FaQuoteLeft className="text-emerald-600 text-xs" /> Community Impact
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Loved by Learners & <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Creators Worldwide</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed"
          >
            Discover how life lessons shared on Lesson Vault are guiding thousands toward better decisions, career growth, and personal wisdom.
          </motion.p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-105"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                  }`}
                >
                  <Icon className={`text-base ${isActive ? "text-white" : "text-emerald-600"}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div className="absolute top-6 right-6 text-slate-200 group-hover:text-emerald-200/60 transition-colors">
                  <FaQuoteLeft className="text-4xl" />
                </div>

                <div>
                  {/* Rating Stars & Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex text-amber-400 gap-1 text-sm">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal italic relative z-10 mb-8">
                    "{item.quote}"
                  </p>
                </div>

                {/* User Details Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20 group-hover:ring-emerald-500 transition-all"
                    />
                    <div>
                      <h4 className="text-slate-900 font-bold text-base flex items-center gap-1.5">
                        {item.name}
                        <FaCheckCircle className="text-emerald-500 text-xs" title="Verified User" />
                      </h4>
                      <p className="text-slate-500 text-xs font-medium">{item.role}</p>
                    </div>
                  </div>
                  <span className="text-slate-400 text-xs hidden sm:inline-block">
                    {item.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-900/50"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Share Your Own Life Lessons?
            </h3>
            <p className="text-emerald-200/80 text-sm max-w-xl">
              Join over 2,000+ members documenting personal wisdom, career insights, and life experience to empower the next generation.
            </p>
          </div>
          <a
            href="/dashboard/user/add-lesson"
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 whitespace-nowrap text-sm"
          >
            Submit a Lesson Now →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
