import React from 'react';

const steps = [
  {
    id: "01",
    title: "Create Free Account",
    description: "Sign up in seconds using your Google or email credentials to unlock the full library of life lessons.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Explore Categorized Lessons",
    description: "Browse high-value insights across Career, Relationships, Personal Growth, Finance, and Leadership.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Read & Bookmark",
    description: "Save high-impact advice into your personal favorites vault to revisit whenever you need clarity.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Publish Your Experience",
    description: "Turn your personal challenges and career achievements into written lessons for the global community.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: "05",
    title: "Engage & Upvote",
    description: "Comment on lessons, share feedback, and upvote the top contributors making a difference.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
      </svg>
    ),
  },
  {
    id: "06",
    title: "Unlock Premium Perks",
    description: "Access exclusive author notes, priority publishing, and verified contributor status.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-slate-50/50 via-white to-white py-24 px-4 sm:px-6 lg:px-8 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto text-center">
        
        <span className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full border border-emerald-200 mb-4">
          ✨ Streamlined Process
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          How <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Lesson Vault</span> Works
        </h2>

        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg mb-16 leading-relaxed">
          From reading your first real-world story to publishing your own life wisdom—here is how you grow with our community step-by-step.
        </p>

        {/* Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="relative bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-gradient-to-tr from-emerald-600 to-teal-600 p-3.5 rounded-2xl shadow-md shadow-emerald-600/20 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-200 group-hover:text-emerald-500/20 transition-colors duration-300 select-none">
                    {step.id}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Step {step.id} overview</span> →
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}