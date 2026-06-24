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


  console.log(role,'role');

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Public Lessons", path: "/public-lessons" },
    // { name: "Pricing", path: "/pricing" },
  ];

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

          <h1 className="text-xl font-bold">
            Digital Life Lessons
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                pathname === link.path
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <>
            <Link
                    href="/pricing"
                    onClick={() =>
                      setIsMobileOpen(false)
                    }
                    className="block px-4 py-3"
                  >
                    pricing
                  </Link>

              <Link
                href="/dashboard/user/add-lesson"
                className="px-4 py-2 rounded-full hover:bg-gray-100"
              >
                Add Lessons
              </Link>

              <Link
                href="/dashboard/user/my-lesson"
                className="px-4 py-2 rounded-full hover:bg-gray-100"
              >
                My Lessons
              </Link>
            </>
          )}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/login">
                <button className="px-5 py-2 rounded-full border">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-5 py-2 rounded-full bg-orange-500 text-white">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() =>
                  setIsDropdownOpen(!isDropdownOpen)
                }
                className="flex items-center gap-2 border rounded-full p-1 pr-3"
              >
               <Avatar size="sm">
            <Avatar.Image
              src={user?.image}
              referrerPolicy="no-referrer"
            />
            <Avatar.Fallback>
              {user?.name?.charAt(0)}
            </Avatar.Fallback>
          </Avatar>

                <span className="text-sm font-medium">
                  {user?.name}
                </span>

                <BiChevronDown
                  className={`transition-transform ${
                    isDropdownOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() =>
                      setIsDropdownOpen(false)
                    }
                  />

                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl z-20">
                    <div className="p-3 border-b">
                      <p className="font-semibold">
                        {user?.name}
                      </p>

                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      Profile
                    </Link>

                    <Link
                      href={`/dashboard/${role}`}
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
          onClick={() =>
            setIsMobileOpen(!isMobileOpen)
          }
          className="lg:hidden"
        >
          {isMobileOpen ? (
            <HiX size={28} />
          ) : (
            <HiMenuAlt3 size={28} />
          )}
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
                  onClick={() =>
                    setIsMobileOpen(false)
                  }
                  className="block px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <>

                <Link
                    href="/dashboard/my-lesson"
                    onClick={() =>
                      setIsMobileOpen(false)
                    }
                    className="block px-4 py-3"
                  >
                    pricing
                  </Link>

                  <Link
                    href="/dashboard/add-lesson"
                    onClick={() =>
                      setIsMobileOpen(false)
                    }
                    className="block px-4 py-3"
                  >
                    Add Lessons
                  </Link>

                  <Link
                    href="/dashboard/my-lesson"
                    onClick={() =>
                      setIsMobileOpen(false)
                    }
                    className="block px-4 py-3"
                  >
                    My Lessons
                  </Link>
                  
                  <Link
                    href={`/dashboard/${role}`}
                    onClick={() =>
                      setIsMobileOpen(false)
                    }
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