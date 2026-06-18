"use client";

import { authClient, signIn } from "@/lib/auth-client";
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
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formdata.entries());

const { data, error } = await authClient.signIn.email({
    ...userData,
})

    if (error) {
      toast.error(error?.message || 'error');
      return;
    }

    if (data) {
      toast("Signup successful");
      router.push("/");
    }
  };

  const GoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });

    if (data) {
      toast("Signup successful");
      router.push("/");
    }

    if (error) {
      toast.error(error?.message||"someThink is wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900 px-4">
      <Card className="w-full mt-5 mb-5 max-w-md shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-800">

        {/* Header */}
        <div className="text-center pt-8 pb-2">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Login to StudyNook
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back. Pick up where you left off.
          </p>
        </div>

        <Form onSubmit={onSubmit} className="px-6  py-6 space-y-5">

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email Address</Label>
            <Input
              placeholder="john@example.com"
              className="rounded-lg"
            />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Must contain uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Must contain a number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input
              placeholder="Enter your password"
              className="rounded-lg"
            />
            <Description className="text-xs">
              8+ chars, 1 uppercase, 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-medium transition"
            >
              Sign In
            </Button>

            <Button
              type="reset"
              variant="bordered"
              className="w-full rounded-lg py-3"
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 px-6 my-4">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
          <span className="text-xs text-slate-500">OR</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
        </div>

        {/* Bottom Actions */}
        <div className="px-6 pb-8 flex flex-col gap-3">

          <Button
            onClick={() => router.push("/register")}
            variant="bordered"
            className="w-full rounded-lg py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Create New Account
          </Button>

          <Button
            onClick={GoogleSignIn}
            variant="bordered"
            className="w-full flex items-center justify-center gap-2 rounded-lg py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-6">
 Dont have an account?  {" "}
  <Link
    href="/register"
    className="text-orange-500 font-semibold hover:text-orange-600 transition underline underline-offset-4"
  >
    Register
  </Link>
</p>

        </div>
      </Card>
    </div>
  );
}