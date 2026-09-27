"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { FaGraduationCap } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const role = user?.role?.trim().toLowerCase() || "user";

  const dashboardItems = {
    user: [
      { icon: Home, label: "Overview", href: "/dashboard/user/home" },
      { icon: BiPlusCircle, label: "Add Lesson", href: "/dashboard/user/add-lesson" },
      { icon: FolderOpen, label: "My Lessons", href: "/dashboard/user/my-lesson" },
      { icon: Heart, label: "My Favorites", href: "/dashboard/user/favorites" },
      { icon: User, label: "Profile Settings", href: "/dashboard/user/profile" },
    ],

    admin: [
      { icon: Home, label: "Admin Overview", href: "/dashboard/admin/home" },
      { icon: User, label: "Manage Users", href: "/dashboard/admin/manage-users" },
      { icon: BookOpen, label: "Manage Lessons", href: "/dashboard/admin/manage-lessons" },
      { icon: ShieldAlert, label: "Reported Content", href: "/dashboard/admin/reported" },
      { icon: Settings, label: "Admin Profile", href: "/dashboard/admin/profile" },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems.user;

  return (
    <aside className="w-64 p-5 bg-white border-r border-slate-200/80 h-screen sticky top-0 flex flex-col justify-between font-sans select-none z-30">
      <div>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <FaGraduationCap className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900">
              Lesson<span className="text-emerald-600">Vault</span>
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wider -mt-1">
              {role === "admin" ? "Admin Workspace" : "Learner Workspace"}
            </span>
          </div>
        </Link>

        {/* Role Badge Pill */}
        <div className="mb-6 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600">Active Role</span>
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
            role === "admin" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-800"
          }`}>
            {role}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Mini Card Footer */}
      {user && (
        <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
          <img
            src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || "User"}`}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
      )}
    </aside>
  );
}