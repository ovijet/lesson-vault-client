"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { BiEnvelope, BiLock, BiRefresh, BiLogIn } from "react-icons/bi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formdata = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formdata.entries());

    const { data, error } = await authClient.signIn.email({
      ...userData,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error?.message || "Invalid credentials");
      return;
    }

    if (data) {
      toast.success("Welcome back! Login successful");
      router.push("/");
    }
  };

  const GoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });

    if (data) {
      toast.success("Login successful");
      router.push("/");
    }

    if (error) {
      toast.error(error?.message || "Something went wrong with Google");
    }
  };

  // Framer Motion Animation Settings
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-100 to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/10 p-4 sm:p-6 select-none">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl rounded-3xl overflow-hidden p-1">
          
          {/* Header */}
          <div className="text-center pt-8 pb-3 px-6">
            <motion.h1 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
            >
              Login to Lesson Vault
            </motion.h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              Welcome back. Pick up where you left off.
            </p>
          </div>

          {/* Form */}
          <Form onSubmit={onSubmit} className="px-5 sm:px-7 py-5 space-y-4">

            {/* Email Field */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Email Address</Label>
                <div className="relative flex items-center">
                  <BiEnvelope className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input
                    placeholder="john@example.com"
                    className="pl-10 w-full rounded-xl border-slate-200 bg-slate-50/50 dark:bg-slate-800/50 transition-all duration-200"
                  />
                </div>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                className="w-full"
                validate={(value) => {
                  if (value.length < 8) return "Password must be at least 8 characters";
                  if (!/[A-Z]/.test(value)) return "Must contain uppercase letter";
                  if (!/[0-9]/.test(value)) return "Must contain a number";
                  return null;
                }}
              >
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Password</Label>
                <div className="relative flex items-center">
                  <BiLock className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input
                    placeholder="Enter your password"
                    className="pl-10 w-full rounded-xl border-slate-200 bg-slate-50/50 dark:bg-slate-800/50 transition-all duration-200"
                  />
                </div>
                <Description className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  8+ chars, 1 uppercase, 1 number
                </Description>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2.5 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold transition shadow-md shadow-orange-500/10 hover:opacity-95 text-sm flex items-center justify-center gap-1.5"
              >
                <BiLogIn className="text-lg" />
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <Button
                type="reset"
                variant="bordered"
                className="w-full h-11 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <BiRefresh className="text-base" /> Clear Form
              </Button>
            </motion.div>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 px-7 my-2">
            <div className="h-px bg-slate-200/70 dark:bg-slate-800/70 flex-1" />
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">OR</span>
            <div className="h-px bg-slate-200/70 dark:bg-slate-800/70 flex-1" />
          </div>

          {/* Bottom Actions */}
          <div className="px-7 pb-6 flex flex-col gap-3">
            <Button
              onClick={GoogleSignIn}
              variant="bordered"
              className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-medium transition"
            >
              <FcGoogle size={19} />
              Continue with Google
            </Button>
          </div>

          {/* Footer Link */}
          <div className="pb-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
            Donot have an account?{" "}
            <Link 
              href="/register" 
              className="text-orange-500 hover:text-orange-600 font-bold ml-0.5 transition underline underline-offset-4"
            >
              Register
            </Link>
          </div>

        </Card>
      </motion.div>
    </div>
  );
}