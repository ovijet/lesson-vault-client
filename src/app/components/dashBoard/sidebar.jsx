"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  Home,
  User,
  Settings,
  BookOpen,
  FolderOpen,
  Heart,
  ShieldAlert,
} from "lucide-react";

export default function Sidebar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // SAFE ROLE
  const role = user?.role?.trim().toLowerCase() || "user";

  const dashboardItems = {
    user: [
      { icon: Home, label: "Home", href: "/dashboard/user/home" },
      { icon: BookOpen, label: "Add Lesson", href: "/dashboard/user/add-lesson" },
      { icon: FolderOpen, label: "My Lessons", href: "/dashboard/user/my-lesson" },
      { icon: Heart, label: "My Favorites", href: "/dashboard/user/favorites" },
      { icon: User, label: "Profile", href: "/dashboard/user/profile" },
    ],

    admin: [
      { icon: Home, label: "Home", href: "/dashboard/admin/home" },
      { icon: User, label: "Manage Users", href: "/dashboard/admin/manage-users" },
      { icon: BookOpen, label: "Manage Lessons", href: "/dashboard/admin/manage-lessons" },
      { icon: ShieldAlert, label: "Reported Lessons", href: "/dashboard/reported-lessons" },
      { icon: Settings, label: "Profile", href: "/dashboard/profile" },
    ],
  };

  // SAFE fallback (IMPORTANT)
  const navItems = dashboardItems[role] || dashboardItems.user;

  console.log(role, navItems);

  return (
    <aside className="w-64 p-4 border-r h-screen">

      {/* Logo */}
      <div className="mb-6 text-xl font-bold">
        Digital Life Lessons
      </div>

      <div className="mb-4 text-sm text-gray-500">
        {role} Dashboard
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}