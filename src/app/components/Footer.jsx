"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaXTwitter, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  // Hide footer on dashboard paths
  if (pathName.startsWith("/dashboard") || pathName.includes("/manage-users")) {
    return null; 
  }
  
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 w-full font-sans select-none relative overflow-hidden">
      {/* Glow highlight top line */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Information */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
              <FaGraduationCap className="text-xl" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Lesson<span className="text-emerald-400">Vault</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Empowering individuals worldwide to share real-world life lessons, career insights, and personal growth wisdom.
          </p>
        </div>

        {/* Contact Links */}
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
            Contact Support
          </h3>
          <div className="flex flex-col gap-3 text-sm">
            <a href="mailto:support@lessonvault.com" className="flex items-center gap-2.5 text-slate-400 hover:text-emerald-400 transition-colors duration-200">
              <Mail size={16} className="text-emerald-500" /> support@lessonvault.com
            </a>
            <a href="tel:+880123456789" className="flex items-center gap-2.5 text-slate-400 hover:text-emerald-400 transition-colors duration-200">
              <Phone size={16} className="text-emerald-500" /> +880 (123) 456-789
            </a>
          </div>
        </div>

        {/* Quick Links & Legal */}
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
            Platform Links
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm font-medium">
            <li>
              <Link href="/public-lessons" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Explore Public Lessons
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Membership Plans
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Ecosystem */}
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
            Connect With Us
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Follow us for daily wisdom highlights and updates.
          </p>
          <div className="flex gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-200"
            >
              <FaXTwitter size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-200"
            >
              <FaFacebook size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-200"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-200"
            >
              <FaGithub size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-5 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
        © {new Date().getFullYear()} Lesson Vault Inc. All rights reserved. Crafted for lifelong learners.
      </div>
    </footer>
  );
}