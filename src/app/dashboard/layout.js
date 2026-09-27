"use client";

import Sidebar from "../components/dashBoard/sidebar";
import { authClient } from "@/lib/auth-client";
import { FiBell, FiSearch, FiHome } from "react-icons/fi";
import Link from "next/link";

export default function DashBoardLayout({ children }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-slate-50/60 flex font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:block flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold transition"
            >
              <FiHome className="text-sm" />
              <span>Back to Site</span>
            </Link>

            <button className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition">
              <FiBell className="text-lg" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </button>

            {user && (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <img
                  src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || "User"}`}
                  alt={user.name || "User"}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
              </div>
            )}
          </div>
        </header>

        {/* Mobile Navigation Drawer Bar */}
        <div className="md:hidden bg-white border-b border-slate-200 p-3 overflow-x-auto scrollbar-none">
          <Sidebar />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

