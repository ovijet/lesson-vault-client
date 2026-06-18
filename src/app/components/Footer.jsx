"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaXTwitter, FaFacebook, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* Logo + Name */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded"
            />
            <h2 className="text-white text-lg font-bold">
              MyWebsite
            </h2>
          </div>
          <p className="text-sm mt-3 text-gray-400">
            Build your future with us.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>

          <p className="flex items-center gap-2 text-sm">
            <Mail size={16} /> support@mywebsite.com
          </p>

          <p className="flex items-center gap-2 text-sm mt-2">
            <Phone size={16} /> +880 1XXXXXXXXX
          </p>
        </div>

        {/* Terms */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Legal
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Follow Us
          </h3>

          <div className="flex gap-4 text-xl">
            {/* X (Twitter replacement) */}
            <a
              href="https://x.com"
              target="_blank"
              className="hover:text-white"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-white"
            >
              <FaFacebook />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
}