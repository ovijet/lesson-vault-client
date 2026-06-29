"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaXTwitter, FaFacebook, FaGithub } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { FaDigitalOcean } from "react-icons/fa";

export default function Footer() {
  const pathName = usePathname();

  // ড্যাশবোর্ড পেজগুলোতে ফুটার হাইড রাখার লজিক
  if (pathName.startsWith("/dashboard") || pathName.includes("/manage-users")) {
    return null; 
  }
  
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-600 mt-16 w-full font-sans select-none">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Information */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <FaDigitalOcean />
            <h2 className="text-slate-900 text-lg font-bold tracking-tight">
              MyWebsite
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Build your future with us. Crafting absolute secure structures and premium web experiences.
          </p>
        </div>

        {/* Contact Links */}
        <div>
          <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
          <div className="flex flex-col gap-2.5 text-sm font-medium">
            <p className="flex items-center gap-2.5 text-slate-600 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
              <Mail size={16} className="text-slate-400" /> support@mywebsite.com
            </p>
            <p className="flex items-center gap-2.5 text-slate-600 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
              <Phone size={16} className="text-slate-400" /> +880 1XXXXXXXXX
            </p>
          </div>
        </div>

        {/* Legal Mapping */}
        <div>
          <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4">
            Legal Structure
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm font-medium">
            <li>
              <Link href="/terms" className="text-slate-600 hover:text-orange-500 transition-colors duration-200">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-slate-600 hover:text-orange-500 transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Ecosystem */}
        <div>
          <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4">
            Follow Ecosystem
          </h3>
          <div className="flex gap-3.5 text-xl">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-500/30 hover:shadow-sm transition-all duration-200"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-500/30 hover:shadow-sm transition-all duration-200"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-500/30 hover:shadow-sm transition-all duration-200"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Absolute Bottom Copyright Bar */}
      <div className="border-t border-slate-200/60 bg-slate-100/50 text-center py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        © {new Date().getFullYear()} MyWebsite. All absolute rights reserved.
      </div>
    </footer>
  );
}