"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  Bell,
  Home,
  User,
  Settings,
  Menu,
  Search,
  Mail,
  BookOpen,
  FolderOpen,
  Heart,
  ShieldAlert,
} from "lucide-react";

export default function Sidebar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const role = user?.role?.toLowerCase() || "user";

  const dashboardItems = {
    user: [
      {
        icon: Home,
        label: "Home",
        href: "/dashboard/home",
      },
      {
        icon: BookOpen,
        label: "Add Lesson",
        href: "/dashboard/add-lesson",
      },
      {
        icon: FolderOpen,
        label: "My Lessons",
        href: "/dashboard/my-lesson",
      },
      {
        icon: Heart,
        label: "My Favorites",
        href: "/dashboard/favorites",
      },
      {
        icon: User,
        label: "Profile",
        href: "/dashboard/profile",
      },
    ],

    admin: [
      {
        icon: Home,
        label: "Home",
        href: "/",
      },
      {
        icon: User,
        label: "Manage Users",
        href: "/dashboard/manage-users",
      },
      {
        icon: BookOpen,
        label: "Manage Lessons",
        href: "/dashboard/manage-lessons",
      },
      {
        icon: ShieldAlert,
        label: "Reported Lessons",
        href: "/dashboard/reported-lessons",
      },
      {
        icon: Settings,
        label: "Profile",
        href: "/dashboard/profile",
      },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems.user;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-default-200 bg-background p-5">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Digital Life Lessons
          </h1>
          <p>{role} DashBoard</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center gap-4 rounded-2xl px-4 py-3 text-base font-medium transition-all duration-200 hover:bg-default-100 hover:text-primary"
            >
              <item.icon className="size-6 transition-transform duration-200 group-hover:scale-110" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}