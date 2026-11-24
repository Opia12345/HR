"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createClient } from "@/lib/supabase/client";
import { PROFILE_EVENT } from "./user-name";

const validationSchema = Yup.object({
  fullName: Yup.string().trim().min(2, "Too short").required("Full name is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  dateOfBirth: Yup.date()
    .typeError("Enter a valid date")
    .max(new Date(), "Date cannot be in the future")
    .required("Date of birth is required"),
  gender: Yup.string().required("Select a gender"),
  department: Yup.string().trim().required("Department is required"),
  jobTitle: Yup.string().trim().required("Job title is required"),
  address: Yup.string().trim().min(5, "Address is too short").required("Address is required"),
});

const inputClass =
  "w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400";

type Values = {
  fullName: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  department: string;
  jobTitle: string;
  address: string;
};

const ProfileModal = () => {
  const [open] = useState(true);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<Values>({
    initialValues: {
      fullName: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      department: "",
      jobTitle: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (v) => {
      setError(null);
      const { error } = await createClient()
        .from("demo_data")
        .insert({
          email: sessionStorage.getItem("demo_email"),
          full_name: v.fullName.trim(),
          phone: v.phone,
          date_of_birth: v.dateOfBirth,
          gender: v.gender,
          department: v.department.trim(),
          job_title: v.jobTitle.trim(),
          address: v.address.trim(),
        });
      if (error) {
        setError(error.message);
        return;
      }
      sessionStorage.setItem("demo_name", v.fullName.trim());
      window.dispatchEvent(new Event(PROFILE_EVENT));
      setDone(true);
    },
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const err = (n: keyof Values) =>
    formik.touched[n] && formik.errors[n] ? formik.errors[n] : null;
  const cls = (n: keyof Values) =>
    `${inputClass} ${err(n) ? "border-red-500" : "border-gray-300"}`;

  const field = (n: keyof Values, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="space-y-1">
      <label htmlFor={n} className="block text-sm text-black">{label}</label>
      <input id={n} {...props} {...formik.getFieldProps(n)} className={cls(n)} />
      {err(n) && <p className="text-xs text-red-600">{err(n)}</p>}
    </div>
  );

  if (done) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        <div className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
            ✓
          </div>
          <h2 id="success-title" className="text-xl font-bold text-black">
            Success!
          </h2>
          <p className="text-sm text-gray-500">
            Your details have been submitted successfully.
          </p>
          <a
            href="https://www.casalavorocomprehensivehr.com/dashboard"
            className="block w-full rounded-md bg-[#1c2b36] py-2 text-white transition-colors hover:bg-[#15212a]"
          >
            Close
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
    >
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="max-h-[90vh] w-full max-w-xl space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div>
          <h2 id="profile-title" className="text-xl font-bold text-black">
            Complete your profile
          </h2>
          <p className="text-sm text-gray-500">
            Tell us a bit about yourself to get started.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {field("fullName", "Full name", { placeholder: "Jane Doe" })}
          {field("phone", "Phone number", { type: "tel", placeholder: "+234 800 000 0000" })}
          {field("dateOfBirth", "Date of birth", { type: "date" })}
          <div className="space-y-1">
            <label htmlFor="gender" className="block text-sm text-black">Gender</label>
            <select id="gender" {...formik.getFieldProps("gender")} className={cls("gender")}>
              <option value="">Select…</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {err("gender") && <p className="text-xs text-red-600">{err("gender")}</p>}
          </div>
          {field("department", "Department", { placeholder: "e.g. Engineering" })}
          {field("jobTitle", "Job title", { placeholder: "e.g. Developer" })}
        </div>

        <div className="space-y-1">
          <label htmlFor="address" className="block text-sm text-black">Address</label>
          <textarea
            id="address"
            rows={2}
            placeholder="Street, city, state"
            {...formik.getFieldProps("address")}
            className={cls("address")}
          />
          {err("address") && <p className="text-xs text-red-600">{err("address")}</p>}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full rounded-md bg-[#1c2b36] py-2 text-white transition-colors hover:bg-[#15212a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {formik.isSubmitting ? "Saving..." : "Save & continue"}
        </button>
      </form>
    </div>
  );
};

export default ProfileModal;
