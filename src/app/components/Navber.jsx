"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BiChevronDown, BiLogOut, BiUser, BiGridAlt, BiStar } from "react-icons/bi";
import { FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "user";

  const baseLinks = [
    { name: "Home", href: "/" },
    { name: "Public Lessons", href: "/public-lessons" },
  ];

  const userLinks = user
    ? [
        { name: "Add Lesson", href: "/dashboard/user/add-lesson" },
        { name: "My Lessons", href: "/dashboard/user/my-lesson" },
        { name: "Favorites", href: "/dashboard/user/favorites" },
      ]
    : [];

  const adminLinks = user?.role === "admin"
    ? [
        { name: "Manage Lessons", href: "/dashboard/admin/manage-lessons" },
        { name: "Manage Users", href: "/dashboard/admin/manage-users" },
      ]
    : [];

  const navLinks = [...baseLinks, ...userLinks, ...adminLinks];

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-emerald-100/60 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <motion.div
            whileHover={{ rotate: -6, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center shadow-md shadow-emerald-600/20"
          >
            <FaGraduationCap className="text-white text-xl" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
              Lesson<span className="text-emerald-600">Vault</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase -mt-1">
              Wisdom & Insights
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 mx-4 overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA / User Dropdown */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          {!user ? (
            <div className="flex items-center gap-2.5">
              <Link href="/login">
                <button className="px-4.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button className="px-5 py-2 text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-full shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-105">
                  Get Started
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center gap-3">
                {/* Premium Badge & Upgrade */}
                {user?.plan === "premium" ? (
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 rounded-full px-3 py-1 shadow-xs">
                    <span className="text-xs">💎</span>
                    <span className="font-bold text-amber-700 tracking-wider uppercase text-[10px]">
                      Premium
                    </span>
                  </div>
                ) : (
                  <Link
                    href="/pricing"
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-bold hover:opacity-95 shadow-sm shadow-emerald-600/15 transition hover:scale-105"
                  >
                    Upgrade ✨
                  </Link>
                )}

                {/* Avatar Control */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 border border-slate-200/80 rounded-full p-1 pr-3 hover:bg-slate-50 hover:border-emerald-300 transition-all duration-200"
                >
                  <Avatar size="sm" className="w-7 h-7 ring-2 ring-emerald-500/20 flex-shrink-0">
                    <Avatar.Image src={user?.image} referrerPolicy="no-referrer" />
                    <Avatar.Fallback className="bg-emerald-100 text-emerald-700 font-bold text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                  <span className="text-xs font-bold text-slate-700 max-w-[90px] truncate">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <BiChevronDown
                    className={`text-slate-400 text-base transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-60 bg-white border border-slate-200/80 rounded-2xl shadow-xl z-20 overflow-hidden"
                    >
                      <div className="p-4 bg-slate-50 border-b border-slate-100">
                        <p className="font-bold text-slate-900 text-sm truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email}</p>
                        
                        <div className="flex items-center gap-2 mt-2.5">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            role === "admin" ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}>
                            {role}
                          </span>
                        </div>
                      </div>

                      <div className="p-1.5 space-y-0.5">
                        <Link
                          href={role === "admin" ? "/dashboard/admin/profile" : "/dashboard/user/profile"}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-xl transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <BiUser className="text-lg text-slate-400" /> My Profile
                        </Link>

                        <Link
                          href={role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-xl transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <BiGridAlt className="text-lg text-slate-400" /> Dashboard
                        </Link>

                        <hr className="border-slate-100 my-1" />

                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleSignOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition font-bold"
                        >
                          <BiLogOut className="text-lg" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Interactive Trigger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 transition flex-shrink-0"
        >
          {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-inner overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1.5 max-h-[calc(100vh-4rem)] overflow-y-auto">
              
              {user && (
                <div className="flex items-center gap-3 p-3 bg-emerald-50/60 rounded-2xl mb-3 border border-emerald-100">
                  <Avatar size="sm" className="w-9 h-9 flex-shrink-0">
                    <Avatar.Image src={user?.image} referrerPolicy="no-referrer" />
                    <Avatar.Fallback className="bg-emerald-200 text-emerald-800 font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  {user?.plan === "premium" && (
                    <span className="text-sm bg-amber-100 px-2 py-0.5 rounded-full flex-shrink-0">💎</span>
                  )}
                </div>
              )}

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block px-4 py-2.5 text-sm font-semibold rounded-xl transition ${
                      isActive
                        ? "bg-emerald-600 text-white font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <hr className="border-slate-100 my-2" />

              {user ? (
                <div className="space-y-1.5 pt-1">
                  {user?.plan !== "premium" && (
                    <Link
                      href="/pricing"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl"
                    >
                      <span>Upgrade to Premium ✨</span>
                      <BiStar className="text-lg text-emerald-600" />
                    </Link>
                  )}
                  <Link
                    href={role === "admin" ? "/dashboard/admin/profile" : "/dashboard/user/profile"}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href={role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
                  >
                    Dashboard Home
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <Link href="/login" onClick={() => setIsMobileOpen(false)} className="w-full">
                    <button className="w-full py-2.5 text-sm font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileOpen(false)} className="w-full">
                    <button className="w-full py-2.5 text-sm font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all">
                      Get Started
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;