"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";

type Profile = {
  userId: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const accessToken = sessionStorage.getItem("atlas_access_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!accessToken || !apiUrl) {
        router.replace("/login");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          sessionStorage.removeItem("atlas_access_token");
          router.replace("/login");
          return;
        }

        const data = (await response.json()) as Profile;

        setProfile(data);
      } catch {
        sessionStorage.removeItem("atlas_access_token");
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProfile();
  }, [router]);

  function handleLogout() {
    sessionStorage.removeItem("atlas_access_token");
    router.replace("/login");
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="text-sm text-white/55">Loading ATLAS...</p>
      </main>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-6">
          <Logo size="md" />

          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="h-10 rounded-xl border-white/15 bg-white/[0.05] px-5 text-white hover:bg-white/[0.10] hover:text-white"
          >
            Sign out
          </Button>
        </div>

        <GlassCard className="mt-10 p-8">
          <p className="text-sm font-medium text-indigo-300">
            Authentication verified
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Welcome to ATLAS
          </h1>

          <p className="mt-3 text-sm text-white/55">
            Signed in as {profile.email}
          </p>

          <p className="mt-2 text-xs text-white/35">
            User ID: {profile.userId}
          </p>
        </GlassCard>
      </div>
    </main>
  );
}