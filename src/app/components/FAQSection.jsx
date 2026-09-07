"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle, FiSearch, FiMessageCircle, FiMail } from "react-icons/fi";
import { FaGraduationCap, FaLock, FaRocket } from "react-icons/fa";

const faqCategories = [
  { id: "all", name: "All FAQs", icon: FiHelpCircle },
  { id: "general", name: "General & Platform", icon: FaGraduationCap },
  { id: "publishing", name: "Publishing & Content", icon: FaRocket },
  { id: "premium", name: "Membership & Security", icon: FaLock },
];

const faqs = [
  {
    id: 1,
    category: "general",
    question: "What is Lesson Vault and how does it work?",
    answer: "Lesson Vault is an interactive knowledge-sharing platform where individuals, mentors, and industry experts post real-world life lessons, career advice, and key takeaways. Readers can explore categorized lessons, bookmark favorites, and upvote high-impact content."
  },
  {
    id: 2,
    category: "publishing",
    question: "Who can submit a lesson on Lesson Vault?",
    answer: "Anyone with an active registered account can share a lesson! Whether you want to reflect on a career milestone, personal relationship lesson, or technical growth experience, our editor makes formatting simple and quick."
  },
  {
    id: 3,
    category: "premium",
    question: "What perks do Premium members get?",
    answer: "Premium members gain unlimited access to exclusive expert-verified lessons, bookmarking collections, priority moderation for submitted lessons, ad-free reading experience, and a distinguished Premium Badge on their profile."
  },
  {
    id: 4,
    category: "publishing",
    question: "Are submitted lessons reviewed before going live?",
    answer: "Yes, our automated safety guardrails and community moderators check all public submissions to ensure content remains inspiring, constructive, and respectful according to our community guidelines."
  },
  {
    id: 5,
    category: "general",
    question: "Is Lesson Vault free to join and read?",
    answer: "Absolutely! Browsing public lessons, creating an account, and publishing free content will always remain 100% free for everyone."
  },
  {
    id: 6,
    category: "premium",
    question: "How secure is my account and payment information?",
    answer: "We utilize industry-standard Stripe encryption for financial transactions and secure token authentication with encrypted session tokens to keep your account safe at all times."
  }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-slate-50/60 font-sans border-t border-slate-200/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200"
          >
            <FiHelpCircle className="text-emerald-600 text-sm" /> Got Questions?
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Frequently Asked <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Questions</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-base sm:text-lg"
          >
            Everything you need to know about Lesson Vault, publishing your wisdom, and managing your account.
          </motion.p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
          {faqCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Icon className={`text-base ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Accordion & Direct Help Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordion List (8 columns) */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-500">
                No matching questions found for "{searchQuery}". Try searching with different terms!
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? "border-emerald-500/60 shadow-md ring-1 ring-emerald-500/20" 
                        : "border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-bold text-slate-800 hover:text-emerald-700 transition-colors"
                    >
                      <span className="text-base sm:text-lg">{faq.question}</span>
                      <FiChevronDown
                        className={`text-slate-400 text-xl flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-emerald-600" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Side Contact / Support Card (4 columns) */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />

              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 text-white text-2xl">
                <FiMessageCircle />
              </div>

              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="text-emerald-100 text-sm leading-relaxed mb-6">
                Can't find the answer you're looking for? Reach out to our community support team and we'll reply within 24 hours.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:support@lessonvault.com"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white text-emerald-900 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-50 transition"
                >
                  <FiMail className="text-emerald-700 text-base" /> Email Support
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 text-xs text-emerald-100/80 text-center">
                Average response time: <span className="font-bold text-white">Under 2 hours</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
