"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiUser, BiImage, BiEnvelope, BiLock, BiChevronDown, BiRefresh } from "react-icons/bi";
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

  // ✅ Email signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      ...userData,
      plan: 'free', // default plan
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

  // ✅ Google signup
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

  // Animation variants
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
          
          {/* Header Section */}
          <div className="text-center pt-8 pb-3 px-6">
            <motion.h1 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
            >
              Create Lesson Vault Account
            </motion.h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              Join and start tracking your path today
            </p>
          </div>

          {/* Form wrapper */}
          <Form onSubmit={handleSubmit} className="px-5 sm:px-7 py-5 space-y-4">
            
            {/* Full Name */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField isRequired name="name" className="w-full">
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Full Name</Label>
                <div className="relative flex items-center">
                  <BiUser className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input 
                    placeholder="Enter your name" 
                    className="pl-10 w-full rounded-xl border-slate-200 focus:border-orange-500 bg-slate-50/50 dark:bg-slate-800/50 transition-all duration-200" 
                  />
                </div>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Profile Image */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField isRequired name="image" className="w-full">
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Profile Image URL</Label>
                <div className="relative flex items-center">
                  <BiImage className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    className="pl-10 w-full rounded-xl border-slate-200 bg-slate-50/50 dark:bg-slate-800/50 transition-all duration-200" 
                  />
                </div>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField isRequired name="email" type="email" className="w-full">
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

            {/* Password */}
            <motion.div variants={itemVariants} className="w-full">
              <TextField isRequired minLength={8} name="password" type="password" className="w-full">
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Password</Label>
                <div className="relative flex items-center">
                  <BiLock className="absolute left-3.5 text-slate-400 text-lg z-10" />
                  <Input 
                    placeholder="Create secure password" 
                    className="pl-10 w-full rounded-xl border-slate-200 bg-slate-50/50 dark:bg-slate-800/50 transition-all duration-200" 
                  />
                </div>
                <Description className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  8+ characters with uppercase & number
                </Description>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </motion.div>

            {/* Role Select (State update to exact layout alignment) */}
            <motion.div variants={itemVariants} className="w-full">
              <Select className="w-full" placeholder="Select your system account group" name="state" isRequired>
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Account Role Mapping</Label>
                <Select.Trigger className="w-full rounded-xl border-slate-200 bg-slate-50/50 dark:bg-slate-800/50 h-11 px-3.5 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <Select.Value />
                  <BiChevronDown className="text-slate-400 text-lg transition-transform" />
                </Select.Trigger>
                <Select.Popover className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xl z-50">
                  <ListBox className="p-1">
                    <ListBox.Item id="user" textValue="user" className="px-3 py-2 text-sm rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 text-slate-700 dark:text-slate-200 cursor-pointer">
                      user
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2.5 pt-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold transition shadow-md shadow-orange-500/10 hover:opacity-95 text-sm"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <Button
                type="reset"
                variant="bordered"
                className="w-full h-11 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <BiRefresh className="text-base" /> Clear Entries
              </Button>
            </motion.div>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 px-7 my-2">
            <div className="h-px bg-slate-200/70 dark:bg-slate-800/70 flex-1" />
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">or</span>
            <div className="h-px bg-slate-200/70 dark:bg-slate-800/70 flex-1" />
          </div>

          {/* Google Auth Integration */}
          <div className="px-7 pb-6">
            <Button
              onClick={GoogleSignUp}
              variant="bordered"
              className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-medium transition"
            >
              <FcGoogle size={19} />
              Continue with Google
            </Button>
          </div>

          {/* Login Redirection Footer */}
          <div className="pb-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 hover:text-orange-600 font-bold ml-0.5 transition">
              Login
            </Link>
          </div>

        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;