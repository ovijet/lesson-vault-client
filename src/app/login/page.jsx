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
import {
  BiEnvelope,
  BiLock,
  BiRefresh,
  BiLogIn,
  BiShield,
} from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // Controlled input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "Admin1234";

  const handleAdminDemo = () => {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
    toast.success("Admin demo!");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = { email, password };
      const { data, error } = await authClient.signIn.email({
        ...userData,
      });

      if (error) {
        toast.error(error?.message || "Invalid credentials");
        return;
      }

      if (data) {
        toast.success("Welcome back! Login successful");
        const role = data?.user?.role?.trim().toLowerCase();
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/user");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const GoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });

    if (data) {
      toast.success("Login successful");
      const role = data?.user?.role?.trim().toLowerCase();
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }

    if (error) {
      toast.error(error?.message || "Something went wrong with Google");
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50/60 via-slate-50 to-teal-50/40 p-4 sm:p-6 select-none font-sans relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/85 backdrop-blur-2xl border border-slate-200/80 shadow-2xl rounded-3xl overflow-hidden p-1">
          {/* Header */}
          <div className="text-center pt-8 pb-3 px-6">
            <motion.div
              whileHover={{ rotate: -6, scale: 1.08 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-emerald-600/30 text-2xl"
            >
              <FaGraduationCap />
            </motion.div>

            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
            >
              Login to <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LessonVault</span>
            </motion.h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
              Welcome back! Pick up your learning path where you left off.
            </p>
          </div>

          {/* Admin Demo Button */}
          <motion.div variants={itemVariants} className="px-5 sm:px-7 pt-2">
            <Button
              type="button"
              onClick={handleAdminDemo}
              className="w-full h-11 rounded-xl border border-emerald-600/30 bg-emerald-50/60 text-emerald-800 hover:bg-emerald-100/80 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <BiShield className="text-lg text-emerald-600" />
              <span>Admin Demo</span>
            </Button>
          </motion.div>

          {/* Form */}
          <Form onSubmit={onSubmit} className="px-5 sm:px-7 py-5 space-y-4">
            {/* Email */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField
                isRequired
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
                className="w-full"
              >
                <Label className="text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </Label>

                <div className="relative flex items-center">
                  <BiEnvelope className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input
                    placeholder="john@example.com"
                    className="pl-10 w-full rounded-xl border-slate-200 bg-slate-50 focus:border-emerald-500 transition-all text-sm"
                  />
                </div>

                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                value={password}
                onChange={setPassword}
                className="w-full"
              >
                <Label className="text-xs font-semibold text-slate-700 mb-1">
                  Password
                </Label>

                <div className="relative flex items-center">
                  <BiLock className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input
                    placeholder="Enter your password"
                    className="pl-10 w-full rounded-xl border-slate-200 bg-slate-50 focus:border-emerald-500 transition-all text-sm"
                  />
                </div>

                <Description className="text-[11px] text-slate-400 mt-1">
                  8+ characters with 1 uppercase & 1 number
                </Description>

                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2.5 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold transition shadow-lg shadow-emerald-600/20 text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BiLogIn className="text-lg" />
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <Button
                type="button"
                variant="bordered"
                onClick={handleClear}
                className="w-full h-10 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BiRefresh className="text-base" />
                Clear Form
              </Button>
            </motion.div>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 px-7 my-2">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-extrabold">OR</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Google */}
          <div className="px-7 pb-6 flex flex-col gap-3">
            <Button
              onClick={GoogleSignIn}
              variant="bordered"
              className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold transition cursor-pointer"
            >
              <FcGoogle size={20} />
              Continue with Google
            </Button>
          </div>

          {/* Footer Redirection */}
          <div className="pb-6 text-center text-xs text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-600 hover:text-emerald-700 font-bold ml-0.5 transition underline underline-offset-4"
            >
              Register free
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

