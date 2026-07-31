import {
  Wallet,
  ArrowLeftRight,
  PiggyBank,
  Target,
  TrendingUp,
  ChartColumn,
  Bell,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";

const modules = [
  {
    title: "Accounts",
    description: "Manage all of your financial accounts.",
    icon: Wallet,
  },
  {
    title: "Transactions",
    description: "Track income and expenses effortlessly.",
    icon: ArrowLeftRight,
  },
  {
    title: "Budgets",
    description: "Plan spending and stay on target.",
    icon: PiggyBank,
  },
  {
    title: "Goals",
    description: "Achieve your financial milestones.",
    icon: Target,
  },
  {
    title: "Investments",
    description: "Monitor portfolio performance.",
    icon: TrendingUp,
  },
  {
    title: "Reports",
    description: "Visualize your financial health.",
    icon: ChartColumn,
  },
  {
    title: "Notifications",
    description: "Never miss important financial events.",
    icon: Bell,
  },
  {
    title: "AI Insights",
    description: "Personal financial intelligence.",
    icon: Sparkles,
    badge: "Coming Soon",
  },
];

export function ModulesSection() {
  return (
    <Section>
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[420px_1fr]">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
              Modules
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Everything you need. 
              <br />
              Nothing you don't.
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Every financial workflow is organized into focused modules,
              helping you manage your money with clarity, speed, and confidence.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <GlassCard
                  key={module.title}
                  className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-5 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-300">
                      <Icon size={22} />
                    </div>

                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">
                        {module.title}
                      </h3>

                      {module.badge && (
                        <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                          {module.badge}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}