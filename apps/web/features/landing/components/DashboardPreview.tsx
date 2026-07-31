import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";

export function DashboardPreview() {
  return (
    <Section className="pb-32">
      <Container>
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-16 text-center">

            <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
              Dashboard Preview
            </span>

            <h2 className="mt-8 text-5xl font-bold tracking-tight text-white">
              Everything in one dashboard
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              Track your income, expenses, investments, goals and financial
              performance from a beautiful interface.
            </p>

          </div>

          {/* Dashboard */}
          <GlassCard className="relative overflow-hidden p-10">

            {/* Glow */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]" />
            <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/15 blur-[120px]" />

            <div className="relative z-10">

              {/* Header */}
              <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">

                <div>

                  <p className="text-white/50">
                    Total Balance
                  </p>

                  <h3 className="mt-2 text-5xl font-bold text-white">
                    Rp1.128.500.000
                  </h3>

                  <p className="mt-3 text-emerald-400">
                    ▲ +12.54% this month
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <GlassCard className="p-5">

                    <p className="text-sm text-white/50">
                      Income
                    </p>

                    <h4 className="mt-2 text-2xl font-bold text-white">
                      Rp22.4M
                    </h4>

                  </GlassCard>

                  <GlassCard className="p-5">

                    <p className="text-sm text-white/50">
                      Expenses
                    </p>

                    <h4 className="mt-2 text-2xl font-bold text-white">
                      Rp8.2M
                    </h4>

                  </GlassCard>

                </div>

              </div>

              {/* Fake Chart */}

              <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8">

                <div className="flex h-72 items-end gap-3 overflow-hidden">

                  {[20,30,25,40,35,55,48,60,70,62,80,95].map((item,index)=>(
                    <div
                      key={index}
                      className="flex h-full flex-1 items-end"
                    >

                                          <div
                      style={{
                        height: `${item}%`,
                      }}
                      className="
                        w-full
                        rounded-t-xl
                        bg-gradient-to-t
                        from-indigo-600
                        via-indigo-500
                        to-cyan-400
                        shadow-[0_0_25px_rgba(99,102,241,.45)]
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                      "
                    />

                    </div>
                  ))}

                </div>

              </div>

              {/* Bottom Cards */}

              <div className="mt-10 grid gap-5 lg:grid-cols-3">

                <GlassCard className="p-6">

                  <p className="text-white/50">
                    Portfolio
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-white">
                    12 Assets
                  </h3>

                  <p className="mt-3 text-indigo-300">
                    Stocks • Crypto • Gold
                  </p>

                </GlassCard>

                <GlassCard className="p-6">

                  <p className="text-white/50">
                    AI Insight
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-white">
                    Spending is 18% lower than last month.
                  </h3>

                </GlassCard>

                <GlassCard className="p-6">

                  <p className="text-white/50">
                    Financial Goal
                  </p>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">

                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"/>

                  </div>

                  <p className="mt-3 text-indigo-300">
                    78% Completed
                  </p>

                </GlassCard>

              </div>

            </div>

          </GlassCard>

        </div>
      </Container>
    </Section>
  );
}