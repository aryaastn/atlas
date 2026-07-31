import { Database, LockKeyhole, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";

const securityFeatures = [
  {
    title: "Private by design",
    description:
      "Your financial information remains isolated inside your personal workspace.",
    icon: LockKeyhole,
  },
  {
    title: "Protected data",
    description:
      "Sensitive financial records are handled through secure application workflows.",
    icon: ShieldCheck,
  },
  {
    title: "Reliable storage",
    description:
      "Your accounts, transactions, and financial history stay organized in one system.",
    icon: Database,
  },
];

export function SecuritySection() {
  return (
    <Section>
      <Container>
        <GlassCard className="overflow-hidden p-8 md:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
                Security
              </span>

              <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                Your financial data belongs to you.
              </h2>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                ATLAS is designed to keep your financial workspace private,
                structured, and under your control.
              </p>
            </div>

            <div className="grid gap-5">
              {securityFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </Container>
    </Section>
  );
}