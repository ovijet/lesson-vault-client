"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiUser, BiImage, BiEnvelope, BiLock, BiChevronDown, BiRefresh } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  ListBox,
  Select
} from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      ...userData,
      plan: 'free',
    });

    setIsLoading(false);

    if (error) {
      toast.error(error?.message || "Something went wrong");
      return;
    }

    if (data) {
      toast.success("Signup successful");
      router.push("/");
    }
  };

  const GoogleSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });

    if (error) {
      toast.error(error?.message || "Something went wrong");
      return;
    }

    if (data) {
      toast.success("Signup successful");
      router.push("/");
    }
  };

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
          
          {/* Header Section */}
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
              Join <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">LessonVault</span>
            </motion.h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
              Create your account and start capturing life wisdom today
            </p>
          </div>

          {/* Form wrapper */}
          <Form onSubmit={handleSubmit} className="px-5 sm:px-7 py-5 space-y-4">
            
            {/* Full Name */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField isRequired name="name" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 mb-1">Full Name</Label>
                <div className="relative flex items-center">
                  <BiUser className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input 
                    placeholder="Enter your name" 
                    className="pl-10 w-full rounded-xl border-slate-200 focus:border-emerald-500 bg-slate-50 transition-all text-sm" 
                  />
                </div>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Profile Image */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField isRequired name="image" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 mb-1">Profile Image URL</Label>
                <div className="relative flex items-center">
                  <BiImage className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    className="pl-10 w-full rounded-xl border-slate-200 focus:border-emerald-500 bg-slate-50 transition-all text-sm" 
                  />
                </div>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 mb-1">Email Address</Label>
                <div className="relative flex items-center">
                  <BiEnvelope className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input 
                    placeholder="john@example.com" 
                    className="pl-10 w-full rounded-xl border-slate-200 focus:border-emerald-500 bg-slate-50 transition-all text-sm" 
                  />
                </div>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField isRequired minLength={8} name="password" type="password" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 mb-1">Password</Label>
                <div className="relative flex items-center">
                  <BiLock className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input 
                    placeholder="Create secure password" 
                    className="pl-10 w-full rounded-xl border-slate-200 focus:border-emerald-500 bg-slate-50 transition-all text-sm" 
                  />
                </div>
                <Description className="text-[11px] text-slate-400 mt-1">
                  8+ characters with uppercase & number
                </Description>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2.5 pt-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold transition shadow-lg shadow-emerald-600/20 text-sm cursor-pointer"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <Button
                type="reset"
                variant="bordered"
                className="w-full h-10 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BiRefresh className="text-base" /> Clear Entries
              </Button>
            </motion.div>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 px-7 my-2">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-extrabold">OR</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Google Auth Integration */}
          <div className="px-7 pb-6">
            <Button
              onClick={GoogleSignUp}
              variant="bordered"
              className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold transition cursor-pointer"
            >
              <FcGoogle size={20} />
              Continue with Google
            </Button>
          </div>

          {/* Login Redirection Footer */}
          <div className="pb-6 text-center text-xs text-slate-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-bold ml-0.5 transition underline underline-offset-4">
              Sign In
            </Link>
          </div>

        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;