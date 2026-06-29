"use client";

import React, { useEffect, useState } from "react";
import { 
  BiUserCheck, 
  BiShieldQuarter, 
  BiCrown, 
  BiGroup, 
  BiSelectMultiple, 
  BiSearchAlt 
} from "react-icons/bi";
import { toast } from "react-toastify";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load users");
        setLoading(false);
      });
  };

  // Role Toggle Handler (Admin <-> User)
  const handleToggleRole = async (userId) => {
    setActionLoadingId(userId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/toggle-role/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`User role updated to ${data.newRole}! ✨`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: data.newRole } : user
          )
        );
      } else {
        toast.error(data?.message || "Failed to update role");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Client-side quick filter
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Counter Statistics calculations
  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u.role?.trim().toLowerCase() === "admin").length;
  const proPlans = users.filter(u => u.plan?.toLowerCase() === "pro").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-950/20 select-none font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BiShieldQuarter className="text-orange-500 animate-pulse flex-shrink-0" /> Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Manage system access mapping, subscription plans, and absolute security structures.
          </p>
        </div>

        {/* Live Search Input Box */}
        <div className="relative flex items-center w-full md:max-w-xs">
          <BiSearchAlt className="absolute left-3.5 text-slate-400 text-lg z-10" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-sm rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm rounded-2xl">
          <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-500 flex-shrink-0"><BiGroup size={24}/></div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">Total Database Users</p>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">{loading ? "..." : totalUsers}</h3>
          </div>
        </div>
        <div className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm rounded-2xl">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex-shrink-0"><BiCrown size={24}/></div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">Active Admins</p>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">{loading ? "..." : totalAdmins}</h3>
          </div>
        </div>
        <div className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm rounded-2xl sm:col-span-2 lg:col-span-1">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 flex-shrink-0"><BiSelectMultiple size={24}/></div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">Premium Pro Members</p>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">{loading ? "..." : proPlans}</h3>
          </div>
        </div>
      </div>

      {/* Main Table Wrapper Container */}
      <div className="border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden p-1">
        <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          <table className="w-full text-left border-collapse min-w-[700px] md:min-w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-4 sm:px-6">User Profile</th>
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-4">Email Address</th>
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-4">Subscription Plan</th>
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-4">System Role</th>
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={`skeleton-${i}`} className="animate-pulse border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0" />
                        <div className="h-4 w-20 sm:w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
                      </div>
                    </td>
                    <td className="py-4 px-4"><div className="h-4 w-32 sm:w-40 bg-slate-200 dark:bg-slate-800 rounded-md" /></td>
                    <td className="py-4 px-4"><div className="h-5 w-14 bg-slate-200 dark:bg-slate-800 rounded-full" /></td>
                    <td className="py-4 px-4"><div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" /></td>
                    <td className="py-4 px-4 sm:px-6 text-right"><div className="h-8 w-20 sm:w-24 bg-slate-200 dark:bg-slate-800 rounded-xl ml-auto" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm font-medium text-slate-400">
                    No users matched your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isAdmin = user.role?.trim().toLowerCase() === "admin";
                  
                  return (
                    <tr 
                      key={user._id} 
                      className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-all duration-150"
                    >
                      {/* User Profile */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-slate-200/60 dark:ring-slate-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                            {user.image ? (
                              <img 
                                src={user.image} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement.innerHTML = `<span class="font-bold text-xs sm:text-sm text-slate-500">${user.name?.charAt(0).toUpperCase()}</span>`;
                                }}
                              />
                            ) : (
                              <span className="font-bold text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                {user.name?.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm max-w-[100px] sm:max-w-none truncate sm:whitespace-normal">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Email Address */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium truncate max-w-[150px] sm:max-w-none">
                        {user.email}
                      </td>

                      {/* Plan Badges */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center capitalize font-bold text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 h-5 sm:h-6 rounded-full ${
                          user.plan?.toLowerCase() === "pro" 
                            ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/40" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}>
                          {user.plan || "free"}
                        </span>
                      </td>

                      {/* System Role */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold">
                          <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isAdmin ? "bg-emerald-500" : "bg-amber-500"}`} />
                          <span className={isAdmin ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>
                            {isAdmin ? "Admin" : "User"}
                          </span>
                        </div>
                      </td>

                      {/* Dynamic Toggle Action Controls */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <button
                          disabled={actionLoadingId === user._id}
                          onClick={() => handleToggleRole(user._id)}
                          className={`font-semibold rounded-xl text-[10px] sm:text-xs px-2.5 sm:px-4 py-1.5 sm:py-2 inline-flex items-center gap-1 sm:gap-1.5 shadow-md active:scale-95 transition-all duration-200 disabled:opacity-50 text-white ${
                            isAdmin 
                              ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-red-500/10 hover:opacity-90" 
                              : "bg-gradient-to-r from-orange-500 to-amber-500 shadow-orange-500/10 hover:opacity-95"
                          }`}
                        >
                          {actionLoadingId === user._id ? (
                            "Processing..."
                          ) : isAdmin ? (
                            <>
                              <BiCrown className="text-sm sm:text-base" /> <span className="hidden xs:inline">Remove Admin</span><span className="xs:hidden">Demote</span>
                            </>
                          ) : (
                            <>
                              <BiUserCheck className="text-sm sm:text-base" /> <span className="hidden xs:inline">Make Admin</span><span className="xs:hidden">Promote</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}