import React from 'react';

const categories = [
  {
    title: "Career & Professional",
    description: "Lessons on career growth, job transitions, and workplace wisdom",
    count: "245 lessons",
    bgClass: "hover:border-blue-500 hover:shadow-blue-500/10",
    iconBg: "bg-blue-50 text-blue-600 border border-blue-200/60",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Relationships & Family",
    description: "Insights on building empathy, trust, and meaningful connections",
    count: "189 lessons",
    bgClass: "hover:border-rose-500 hover:shadow-rose-500/10",
    iconBg: "bg-rose-50 text-rose-600 border border-rose-200/60",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: "Education & Learning",
    description: "Wisdom from academic journeys, continuous learning, and mentorship",
    count: "156 lessons",
    bgClass: "hover:border-emerald-500 hover:shadow-emerald-500/10",
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    )
  },
  {
    title: "Personal Growth",
    description: "Self-improvement, resilience, habits, and mindset transformation",
    count: "312 lessons",
    bgClass: "hover:border-amber-500 hover:shadow-amber-500/10",
    iconBg: "bg-amber-50 text-amber-600 border border-amber-200/60",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Life Wisdom & Philosophy",
    description: "Hard-earned lessons on perspective, gratitude, and purpose",
    count: "428 lessons",
    bgClass: "hover:border-purple-500 hover:shadow-purple-500/10",
    iconBg: "bg-purple-50 text-purple-600 border border-purple-200/60",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Leadership & Management",
    description: "Guiding teams, making tough decisions, and strategic thinking",
    count: "98 lessons",
    bgClass: "hover:border-teal-500 hover:shadow-teal-500/10",
    iconBg: "bg-teal-50 text-teal-600 border border-teal-200/60",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Finance & Money",
    description: "Financial intelligence, investing discipline, and wealth management",
    count: "134 lessons",
    bgClass: "hover:border-cyan-500 hover:shadow-cyan-500/10",
    iconBg: "bg-cyan-50 text-cyan-600 border border-cyan-200/60",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Health & Wellbeing",
    description: "Physical health, mental wellness, stress relief, and mindfulness",
    count: "167 lessons",
    bgClass: "hover:border-green-500 hover:shadow-green-500/10",
    iconBg: "bg-green-50 text-green-600 border border-green-200/60",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export default function ExploreCategories() {
  return (
    <section className="bg-slate-50/50 py-24 px-4 sm:px-6 lg:px-8 font-sans border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full border border-emerald-200 mb-4">
            📚 Discover Topics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Explore by <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Browse authentic lessons grouped by domain and discover actionable advice tailored to your personal journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href="/public-lessons"
              className={`bg-white border border-slate-200/80 p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xs hover:shadow-xl ${cat.bgClass} group`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 font-semibold shadow-xs transition-transform duration-300 group-hover:scale-110 ${cat.iconBg}`}>
                  {cat.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5 transition-colors duration-200 group-hover:text-emerald-700">
                  {cat.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 group-hover:bg-emerald-50 group-hover:text-emerald-700 border border-slate-100 group-hover:border-emerald-200 py-2 px-3.5 rounded-xl w-max transition-colors duration-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                {cat.count}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}