"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDigitalOcean } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BiChevronDown, BiLogOut, BiUser, BiGridAlt, BiStar } from "react-icons/bi";
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Public Lessons", href: "/public-lessons" },
  ];

  // Dynamic links based on Auth state
  if (user) {
    navLinks.push(
      { name: "Add Lesson", href: "/dashboard/user/add-lesson" },
      { name: "My Lessons", href: "/dashboard/user/my-lesson" },
      { name: "Favorites", href: "/dashboard/user/favorites" }
    );
  }

  if (user?.role === "admin") {
    navLinks.push(
      { name: "Manage Lessons", href: "/dashboard/admin/manage-lessons" },
      { name: "Manage Users", href: "/dashboard/admin/manage-users" }
    );
  }

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20"
          >
            <FaDigitalOcean className="text-white text-xl" />
          </motion.div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:text-orange-500 transition-colors duration-200">
            Digital Life Lessons
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA / User Dropdown */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-2.5">
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="px-5 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-orange-500 rounded-full shadow-sm transition-all duration-200">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center gap-3.5">
                {/* Premium Badge & Upgrade */}
                {user?.plan === "premium" ? (
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3.5 py-1.5 shadow-sm">
                    <span className="text-xs">💎</span>
                    <span className="font-bold text-amber-700 tracking-wider uppercase text-[11px]">
                      Premium
                    </span>
                  </div>
                ) : (
                  <Link
                    href="/pricing"
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold hover:opacity-95 shadow-sm shadow-orange-500/10 transition"
                  >
                    Upgrade ✨
                  </Link>
                )}

                {/* Avatar Control */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 border border-gray-200 rounded-full p-1 pr-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <Avatar size="sm" className="w-7 h-7 ring-2 ring-gray-100">
                    <Avatar.Image src={user?.image} referrerPolicy="no-referrer" />
                    <Avatar.Fallback className="bg-orange-100 text-orange-600 font-bold text-xs">
                      {user?.name?.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <BiChevronDown
                    className={`text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
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
                      className="absolute right-0 mt-2.5 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 text-sm truncate">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{user?.email}</p>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            role === "admin" ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                          }`}>
                            {role}
                          </span>
                        </div>
                      </div>

                      <div className="p-1.5 space-y-0.5">
                        <Link
                          href={role === "admin" ? "/dashboard/admin/profile" : "/dashboard/user/profile"}
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <BiUser className="text-lg text-gray-400" /> Profile
                        </Link>

                        <Link
                          href={role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <BiGridAlt className="text-lg text-gray-400" /> Dashboard
                        </Link>

                        <hr className="border-gray-100 my-1" />

                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleSignOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50/60 rounded-xl transition font-medium"
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
          className="lg:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 transition"
        >
          {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar/Dropdown Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-inner overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1.5 max-h-[calc(100vh-4rem)] overflow-y-auto">
              
              {/* User Identity on Mobile */}
              {user && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl mb-3">
                  <Avatar size="sm" className="w-9 h-9">
                    <Avatar.Image src={user?.image} referrerPolicy="no-referrer" />
                    <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  {user?.plan === "premium" && (
                    <span className="text-sm bg-amber-100 px-2 py-0.5 rounded-full">💎</span>
                  )}
                </div>
              )}

              {/* Dynamic Nav Links for Mobile */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-xl transition ${
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <hr className="border-gray-100 my-2" />

              {/* Mobile Profile & Dashboard Direct Links */}
              {user ? (
                <div className="space-y-1.5 pt-1">
                  {user?.plan !== "premium" && (
                    <Link
                      href="/pricing"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-amber-800 bg-amber-50 border border-amber-100 rounded-xl"
                    >
                      <span>Upgrade to Premium ✨</span>
                      <BiStar className="text-lg" />
                    </Link>
                  )}
                  <Link
                    href={role === "admin" ? "/dashboard/admin/profile" : "/dashboard/user/profile"}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href={role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl"
                  >
                    Dashboard Home
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <Link href="/login" onClick={() => setIsMobileOpen(false)} className="w-full">
                    <button className="w-full py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                      Login
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileOpen(false)} className="w-full">
                    <button className="w-full py-3 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-orange-500 transition">
                      Register
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