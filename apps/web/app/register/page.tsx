import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/shared/Logo";
import { GlassCard } from "@/components/ui/GlassCard";

import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your ATLAS account.",
};

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20rem] right-[-10rem] h-[36rem] w-[36rem] rounded-full bg-violet-600/15 blur-[150px]"
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          aria-label="Back to ATLAS homepage"
          className="mb-10 flex justify-center"
        >
          <Logo size="lg" />
        </Link>

        <GlassCard className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-medium text-indigo-300">
              Get started
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Create your ATLAS account
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/55">
              Build your financial operating system and start managing your
              financial life in one place.
            </p>
          </div>

          <RegisterForm />

          <p className="mt-8 text-center text-sm text-white/45">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-300 transition hover:text-indigo-200"
            >
              Sign in
            </Link>
          </p>
        </GlassCard>
      </div>
    </main>
  );
}