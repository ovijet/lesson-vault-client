"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  BiEnvelope,
  BiLock,
  BiShield,
  BiRightArrowAlt,
} from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "Admin1234";

  const handleAdminDemo = () => {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
    toast.success("Admin credentials loaded!");
  };

  const handleSuccessfulLogin = (data) => {
    toast.success("Welcome back to LessonVault!");
    const userRole = data?.user?.role || "user";
    const role = userRole.trim().toLowerCase();
    
    // Ensure dashboard redirection
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error?.message || "Invalid credentials");
        return;
      }

      if (data) {
        handleSuccessfulLogin(data);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const GoogleSignIn = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
      });
      
      if (data) {
        handleSuccessfulLogin(data);
      }
      
      if (error) {
        toast.error(error?.message || "Something went wrong with Google");
      }
    } catch (error) {
       toast.error("Google sign in failed.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#030712] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Left side: Premium Illustration & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 border-r border-slate-800/60 items-center justify-center">
        {/* Abstract animated background */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-600/10 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
           
           {/* Grid overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative z-10 p-12 max-w-xl">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                 <FaGraduationCap className="text-3xl" />
              </div>
              <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Unlock Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Potential</span> Today.
              </h1>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                LessonVault is your premium destination for curated learning. Access world-class resources, track your progress, and master new skills.
              </p>
              
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-3">
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden" style={{ zIndex: 4 - i }}>
                        <img src={`https://i.pravatar.cc/100?img=${i+12}`} alt="User" className="w-full h-full object-cover opacity-80" />
                     </div>
                   ))}
                 </div>
                 <div className="text-sm font-medium text-slate-400">
                   Join <span className="text-white font-bold">10,000+</span> learners globally.
                 </div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Mobile glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none lg:hidden"></div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo for mobile */}
          <div className="lg:hidden flex flex-col items-center mb-10">
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                 <FaGraduationCap className="text-2xl" />
             </div>
             <h2 className="text-2xl font-bold text-white tracking-tight">LessonVault</h2>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-slate-400 font-medium text-sm">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiEnvelope className="text-slate-500 group-focus-within:text-emerald-400 transition-colors text-lg" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white placeholder-slate-600 outline-none backdrop-blur-sm shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiLock className="text-slate-500 group-focus-within:text-emerald-400 transition-colors text-lg" />
                </div>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white placeholder-slate-600 outline-none backdrop-blur-sm shadow-inner"
                />
              </div>
              <div className="flex justify-end pt-1">
                <Link href="#" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 mt-2 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] text-base flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoading ? (
                <Spinner size="sm" color="current" />
              ) : (
                <>
                  Sign In to Dashboard
                  <BiRightArrowAlt className="text-xl group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 relative">
             <div className="absolute inset-0 flex items-center">
               <div className="w-full border-t border-slate-800"></div>
             </div>
             <div className="relative flex justify-center text-sm">
               <span className="px-4 bg-[#030712] text-slate-500 font-medium">Or continue with</span>
             </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Button
              onClick={GoogleSignIn}
              className="w-full py-5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/50 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <FcGoogle size={20} />
              Google
            </Button>
            
            <Button
              onClick={handleAdminDemo}
              className="w-full py-5 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/50 text-emerald-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <BiShield size={20} />
              Demo Admin
            </Button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-white hover:text-emerald-400 transition-colors">
              Create an account
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}
