"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDigitalOcean } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
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
  const isLoggedIn = !!session;
  const isPremium = user?.plan;

  console.log(user, "user");

  console.log(isLoggedIn, "pppppppppppppp");

  console.log(role, "role");

 const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Public Lessons",
    href: "/public-lessons",
  },
];

// Login হলে সবার জন্য
if (user) {
  navLinks.push(
    {
      name: "Add Lesson",
      href: "/dashboard/user/add-lesson",
    },
    {
      name: "My Lessons",
      href: "/dashboard/user/my-lesson",
    },
    {
      name: "Favorites",
      href: "/dashboard/user/favorites",
    }
  );
}

// শুধু Admin এর জন্য
if (user?.role === "admin") {
  navLinks.push(
    {
      name: "Manage Lessons",
      href: "/dashboard/admin/manage-lessons",
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
    }
  );
}

  // if (user && user?.role === "user" && user?.plan === "free") {
  //   navLinks.push({
  //     name: "Upgrade ✨",
  //     href: "/pricing",
  //   });
  // }

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error(error);
    }
  };

  // const links={
  //   admin:'/dashboard/admin'
  // }

  // if(user?.email){
  //   navLinks.push({
  //     label:'Dashboard',
  //     href:links[user?.role||'user']
  //   })
  // }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg"
          >
            <FaDigitalOcean className="text-white text-lg" />
          </motion.div>

          <h1 className="text-xl font-bold">Digital Life Lessons</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                pathname === link.href
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/login">
                <button className="px-5 py-2 rounded-full border">Login</button>
              </Link>

              <Link href="/register">
                <button className="px-5 py-2 rounded-full bg-orange-500 text-white">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <div className="flex items-center gap-3">
                {/* Premium Badge */}
                {user?.plan === "premium" ? (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-[#f8f2d8] to-[#d9b75d] border border-[#caa43c] rounded-full px-4 py-2 shadow-md">
                    <span className="text-sm">💎</span>

                    <span className="font-bold text-[#0b5d4b] uppercase text-sm">
                      Premium
                    </span>
                  </div>
                ) : (
                  <Link
                    href="/pricing"
                    className="px-4 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                  >
                    Upgrade ✨
                  </Link>
                )}

                {/* Avatar Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 border rounded-full p-1 pr-3 hover:bg-gray-50 transition"
                >
                  <Avatar size="sm">
                    <Avatar.Image
                      src={user?.image}
                      referrerPolicy="no-referrer"
                    />
                    <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar>

                  <span className="text-sm font-medium">{user?.name}</span>

                  <BiChevronDown
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown */}
             {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />

                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl z-20">
                    <div className="p-3 border-b">
                      <p className="font-semibold">{user?.name}</p>

                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            role === "admin"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {role}
                        </span>

                        {user?.plan === "premium" ? (
                          <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-semibold">
                            Premium ⭐
                          </span>
                        ) : (
                          <Link
                            href="/pricing"
                            className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600"
                          >
                            Upgrade ✨
                          </Link>
                        )}
                      </div>
                    </div>

                    <Link
                      href={
                        role === "admin"
                          ? "/dashboard/admin/profile"
                          : "/dashboard/user/profile"
                      }
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      ProfileF
                    </Link>

                    <Link
                      href={
                        role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard/user"
                      }
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden"
        >
          {isMobileOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    href="/dashboard/my-lesson"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3"
                  >
                    pricing
                  </Link>

                  <Link
                    href="/dashboard/add-lesson"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3"
                  >
                    Add Lessons
                  </Link>

                  <Link
                    href="/dashboard/my-lesson"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3"
                  >
                    My Lessons
                  </Link>

                  <Link
                    href={`/dashboard/${role}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-red-500"
                  >
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <div className="space-y-2 pt-3">
                  <Link href="/login">
                    <button className="w-full py-3 border rounded-xl">
                      Login
                    </button>
                  </Link>

                  <Link href="/register">
                    <button className="w-full py-3 rounded-xl bg-orange-500 text-white">
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
