import React from 'react';


const steps = [
  {
    id: "01",
    title: "Create Account",
    description: "Sign up easily with your email or social accounts to get started on your learning journey.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Explore Courses",
    description: "Browse through hundreds of high-quality courses tailored just for your career growth.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Learn & Practice",
    description: "Watch interactive video lessons and practice in our built-in interactive coding environment.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Join Community",
    description: "Connect with thousands of fellow learners, share insights, and solve problems together.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "05",
    title: "Earn Certificates",
    description: "Complete course milestones, pass quizzes, and get verifiable industry certificates.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    id: "06",
    title: "Land Your Job",
    description: "Get exclusive access to our job board and top tech companies looking for your skills.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        
       
        <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#C8E6C9] mb-4">
          Simple Process
        </span>


        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A237E] mb-3 tracking-tight">
          How Our <span className="text-[#2E7D32]">Platform</span> Works
        </h2>

        
        <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base mb-12 leading-relaxed">
          From creating your profile to landing your dream tech career — here is a step-by-step breakdown of how you will succeed with us.
        </p>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="relative bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(46,125,50,0.05)] transition-all duration-300 group"
            >
              
              <div className="flex justify-between items-center mb-5">
                <div className="bg-[#2E7D32] p-3 rounded-xl shadow-md shadow-green-100 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-gray-100 group-hover:text-green-50 transition-colors duration-300 select-none">
                  {step.id}
                </span>
              </div>

              
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#2E7D32] transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}