"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField, ListBox, Select
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();

  // ✅ Email signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      ...userData,
      plan: 'free', // default plan
    });

    console.log("Signup response:", { data, error });

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-6">

      <Card className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="text-center pt-8 pb-2 px-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Create a StudyNook Account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Join and start booking study rooms
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

          <TextField isRequired name="name">
            <Label>Full Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField isRequired name="image">
            <Label>Profile Image</Label>
            <Input placeholder="https://example.com/image.jpg" />
            <FieldError />
          </TextField>

          <TextField isRequired name="email" type="email">
            <Label>Email Address</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField isRequired minLength={8} name="password" type="password">
            <Label>Password</Label>
            <Input placeholder="Enter secure password" />

            <Description className="text-xs text-slate-500">
              8+ characters with uppercase & number
            </Description>

            <FieldError />
          </TextField>

          <Select className="w-[256px]" placeholder="Select your state" name="state" isRequired>
      <Label>State</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue="user">
            user
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue="admin">
            admin
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition shadow-lg"
            >
              Create Account
            </Button>

            <Button
              type="reset"
              variant="bordered"
              className="w-full h-12 rounded-xl border-slate-300 dark:border-slate-700"
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 px-6 my-4">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
          <span className="text-xs text-slate-500 uppercase">or</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
        </div>

        {/* Google */}
        <div className="px-6 pb-8">
          <Button
            onClick={GoogleSignUp}
            variant="bordered"
            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </div>

        {/* Login Link */}
        <div className="pb-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Login
          </Link>
        </div>

      </Card>
    </div>
  );
};

export default RegisterPage;