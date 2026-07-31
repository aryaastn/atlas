import {
  LayoutDashboard,
  Sparkles,
  WalletCards,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    number: "01",
    title: "Add your accounts",
    description:
      "Bring your bank accounts, wallets, and investments into one workspace.",
    icon: WalletCards,
  },
  {
    number: "02",
    title: "Organize your finances",
    description:
      "Track transactions, budgets, goals, and portfolio performance.",
    icon: LayoutDashboard,
  },
  {
    number: "03",
    title: "Understand your money",
    description:
      "Use clear reports and intelligent insights to make better decisions.",
    icon: Sparkles,
  },
];

export function HowItWorksSection() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
            How it works
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            From scattered finances to complete clarity.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            ATLAS turns your financial activity into one clear and organized
            system.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <GlassCard
                key={step.number}
                className="relative overflow-hidden p-7"
              >
                <span className="absolute right-6 top-5 text-5xl font-bold text-white/[0.04]">
                  {step.number}
                </span>

                <div className="relative">
                  <div className="inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-300">
                    <Icon size={22} />
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
                    Step {step.number}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}