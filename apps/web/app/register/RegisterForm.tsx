"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type RegisterResponse = {
  accessToken?: string;
  message?: string | string[];
};

export function RegisterForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const username = String(formData.get("username") ?? "").trim();
    const fullName = String(formData.get("fullName") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setErrorMessage("API URL is not configured.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          fullName,
          password,
        }),
      });

      const data = (await response.json()) as RegisterResponse;

      if (!response.ok) {
        const message = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;

        throw new Error(message || "Unable to create account.");
      }

      if (!data.accessToken) {
        throw new Error("Access token was not returned by the API.");
      }

      sessionStorage.setItem("atlas_access_token", data.accessToken);

      router.replace("/dashboard");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to connect to the ATLAS API.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="text-sm font-medium text-white/80"
        >
          Full name
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          required
          minLength={2}
          maxLength={100}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-indigo-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-white/80"
        >
          Username
        </label>

        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Choose a username"
          required
          minLength={3}
          maxLength={30}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-indigo-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-white/80"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-indigo-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-white/80"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Minimum 8 characters"
          required
          minLength={8}
          maxLength={72}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-indigo-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 w-full rounded-xl bg-indigo-500 text-sm font-semibold text-white hover:bg-indigo-400"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}