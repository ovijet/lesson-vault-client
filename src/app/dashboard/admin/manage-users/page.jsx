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

  // Make Admin Handler
  const handleMakeAdmin = async (userId) => {
    setActionLoadingId(userId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/make-admin/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await res.json();

      if (res.ok) {
        toast.success("User promoted to Admin successfully!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "admin" } : user
          )
        );
      } else {
        toast.error(data?.message || "Failed to make admin");
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
    <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-950/20 select-none">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BiShieldQuarter className="text-orange-500 animate-pulse" /> Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Manage system access mapping, subscription plans, and absolute security structures.
          </p>
        </div>

        {/* Live Search Input Box */}
        <div className="relative flex items-center w-full sm:max-w-xs">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm rounded-2xl">
          <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-500"><BiGroup size={24}/></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Database Users</p>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{loading ? "..." : totalUsers}</h3>
          </div>
        </div>
        <div className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm rounded-2xl">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500"><BiCrown size={24}/></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Admins</p>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{loading ? "..." : totalAdmins}</h3>
          </div>
        </div>
        <div className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm rounded-2xl">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-500"><BiSelectMultiple size={24}/></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Premium Pro Members</p>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{loading ? "..." : proPlans}</h3>
          </div>
        </div>
      </div>

      {/* Main Table Wrapper Container */}
      <div className="border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden p-1">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-6">User Profile</th>
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-4">Email Address</th>
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-4">Subscription Plan</th>
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-4">System Role</th>
                <th className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                // Smooth Shimmer Loading Blocks
                [...Array(4)].map((_, i) => (
                  <tr key={`skeleton-${i}`} className="animate-pulse border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
                      </div>
                    </td>
                    <td className="py-4 px-4"><div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded-md" /></td>
                    <td className="py-4 px-4"><div className="h-5 w-14 bg-slate-200 dark:bg-slate-800 rounded-full" /></td>
                    <td className="py-4 px-4"><div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" /></td>
                    <td className="py-4 px-6 text-right"><div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl ml-auto" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-sm font-medium text-slate-400">
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
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-200/60 dark:ring-slate-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                            {user.image ? (
                              <img 
                                src={user.image} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement.innerHTML = `<span className="font-bold text-sm text-slate-500">${user.name?.charAt(0).toUpperCase()}</span>`;
                                }}
                              />
                            ) : (
                              <span className="font-bold text-sm text-slate-500 dark:text-slate-400">
                                {user.name?.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Email Address */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
                        {user.email}
                      </td>

                      {/* Plan Badges */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center capitalize font-bold text-[11px] px-2.5 py-0.5 h-6 rounded-full ${
                          user.plan?.toLowerCase() === "pro" 
                            ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/40" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}>
                          {user.plan || "free"}
                        </span>
                      </td>

                      {/* System Role */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          <span className={`w-2 h-2 rounded-full ${isAdmin ? "bg-emerald-500" : "bg-amber-500"}`} />
                          <span className={isAdmin ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>
                            {isAdmin ? "Admin" : "User"}
                          </span>
                        </div>
                      </td>

                      {/* Dynamic Action Controls */}
                      <td className="py-3.5 px-6 text-right">
                        {isAdmin ? (
                          <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-xl border border-emerald-200/40 dark:border-emerald-800/30 text-xs font-bold shadow-sm">
                            <BiCrown className="text-sm" /> Admin Master
                          </div>
                        ) : (
                          <button
                            disabled={actionLoadingId === user._id}
                            onClick={() => handleMakeAdmin(user._id)}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl text-xs px-4 py-2 inline-flex items-center gap-1.5 shadow-md shadow-orange-500/10 hover:opacity-95 active:scale-95 transition-all duration-200 disabled:opacity-50"
                          >
                            {actionLoadingId === user._id ? (
                              "Processing..."
                            ) : (
                              <>
                                <BiUserCheck className="text-base" /> Make Admin
                              </>
                            )}
                          </button>
                        )}
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