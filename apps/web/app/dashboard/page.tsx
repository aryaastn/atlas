"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  BarChart3,
  LayoutDashboard,
  Tags,
  WalletCards,
} from "lucide-react";

import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";

type Profile = {
  userId: string;
  email: string;
};

const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Accounts",
    icon: WalletCards,
    active: false,
  },
  {
    label: "Transactions",
    icon: ArrowLeftRight,
    active: false,
  },
  {
    label: "Categories",
    icon: Tags,
    active: false,
  },
  {
    label: "Reports",
    icon: BarChart3,
    active: false,
  },
];

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
    <main className="min-h-screen">
      <header className="border-b border-white/[0.08] bg-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo size="md" />

          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="text-xs text-white/40">Signed in as</p>

              <p className="max-w-56 truncate text-sm font-medium text-white/80">
                {profile.email}
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className="h-10 shrink-0 rounded-xl border-white/15 bg-white/[0.05] px-3 text-white hover:bg-white/[0.10] hover:text-white sm:px-4"
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="border-b border-white/[0.08] bg-slate-950/20 lg:hidden"
      >
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                disabled={!item.active}
                className={
                  item.active
                    ? "flex h-10 shrink-0 items-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/15 px-3 text-sm font-medium text-indigo-200"
                    : "flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-medium text-white/35 disabled:cursor-not-allowed"
                }
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-white/[0.08] px-4 py-8 lg:block">
          <nav aria-label="Primary navigation" className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  disabled={!item.active}
                  className={
                    item.active
                      ? "flex h-11 w-full items-center gap-3 rounded-xl border border-indigo-400/20 bg-indigo-500/15 px-4 text-left text-sm font-medium text-indigo-200"
                      : "flex h-11 w-full items-center gap-3 rounded-xl px-4 text-left text-sm font-medium text-white/35 transition-colors disabled:cursor-not-allowed"
                  }
                >
                  <Icon aria-hidden="true" className="size-4.5 shrink-0" />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
          <div>
            <p className="text-sm font-medium text-indigo-300">Overview</p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Your financial overview will live here as the ATLAS finance
              engine is implemented.
            </p>
          </div>

          <GlassCard className="mt-8 p-6 sm:p-8">
            <p className="text-sm font-medium text-white/75">
              Application shell initialized
            </p>

            <p className="mt-2 text-sm leading-6 text-white/45">
              Authentication remains protected while navigation and financial
              modules are added incrementally.
            </p>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}