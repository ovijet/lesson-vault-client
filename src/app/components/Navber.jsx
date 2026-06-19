"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBookOpen, FaDigitalOcean } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from '@heroui/react';

import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { BiChevronDown } from "react-icons/bi";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;


  console.log(user,'sssssssssssssss');

  let role = user?.role || 'user'; // default to 'user' if role is not defined

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Public Lessons", path: "/publicLessons" },
    { name: "Pricing", path: "/pricing" },
  ];

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
  }


  const pathName=usePathname();
  if(pathName.includes("/dashboard")){
    return null; // Don't render the navbar on dashboard pages
  }

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg"
          >
            <FaDigitalOcean className="text-white text-lg" />
          </motion.div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Digital Life Lessons
            </h1>
           
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                pathname === link.path
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* PRIVATE LINKS */}
          {user && (
            <>
              <Link
                href="/addLessons"
                className="px-4 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Add Lessons
              </Link>

              <Link
                href="/myLessons"
                className="px-4 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                My Lessons
              </Link>
            </>
          )}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">

          {/* NOT LOGGED IN */}
          {!user && (
            <>
              <Link href="/login">
                <button className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-5 py-2 rounded-full bg-orange-500 text-white">
                  Register
                </button>
              </Link>
            </>
          )}

          {/* LOGGED IN USER */}
   {user && (
        <>
          {/* Avatar */}
          <Avatar size="sm">
            <Avatar.Image
              src={user?.image}
              referrerPolicy="no-referrer"
            />
            <Avatar.Fallback>
              {user?.name?.charAt(0)}
            </Avatar.Fallback>
          </Avatar>

          {/* Name */}
          <div className="hidden md:block text-right">
            <p className="text-gray-900 text-sm font-medium">
              {user?.name}
            </p>
            <p className="text-gray-500 text-xs">Welcome</p>
          </div>

          {/* Arrow Button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <BiChevronDown size={18} />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-xl border z-50">
              <DropdownMenu>
                  <DropdownItem>{user.name}</DropdownItem>
                  <DropdownItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownItem>
                  <DropdownItem>
                   <Link href={`/dashboard/${role}`}>
                   
                   Dashboard
                   
                   </Link>
                  </DropdownItem>
                  <DropdownItem
                    className="text-red-500"
                    onClick={handleSignOut}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
            </div>
          )}
        </>
      )}
    </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-gray-700 dark:text-white"
        >
          {open ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
     

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="lg:hidden mb-4 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl"
          >
            <div className="p-4 space-y-2">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl ${
                    pathname === link.path
                      ? "bg-orange-500 text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* PRIVATE MOBILE LINKS */}
              {user && (
                <>
                  <Link href="/addLessons" onClick={() => setOpen(false)}>
                    <div className="px-4 py-3">Add Lessons</div>
                  </Link>

                  <Link href="/myLessons" onClick={() => setOpen(false)}>
                    <div className="px-4 py-3">My Lessons</div>
                  </Link>
                </>
              )}

              {/* AUTH BUTTONS */}
              {!user && (
                <div className="pt-4 space-y-2">
                  <Link href="/login">
                    <button className="w-full py-3 rounded-xl border">
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