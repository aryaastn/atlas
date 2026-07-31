import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuroraBackground({
  children,
  className,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden",
        "bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#020617]",
        className
      )}
    >
      {/* Aurora Glow 1 */}
      <div
        className="
          absolute
          left-1/2
          top-[-220px]
          h-[650px]
          w-[650px]
          -translate-x-1/2
          rounded-full
          bg-indigo-500/30
          blur-[140px]
          animate-[pulse_8s_ease-in-out_infinite]
        "
      />

      {/* Aurora Glow 2 */}
      <div
        className="
          absolute
          -left-32
          bottom-[-120px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-cyan-400/20
          blur-[120px]
        "
      />

      {/* Aurora Glow 3 */}
      <div
        className="
          absolute
          -right-24
          top-1/3
          h-[500px]
          w-[500px]
          rounded-full
          bg-fuchsia-500/20
          blur-[140px]
        "
      />

      {/* Grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.015]
          [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      {/* Noise */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:radial-gradient(circle,#ffffff_1px,transparent_1px)]
          [background-size:18px_18px]
        "
      />

      {/* Vignette */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.45))]
        "
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}