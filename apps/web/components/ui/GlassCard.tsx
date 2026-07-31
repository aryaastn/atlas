import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl",

        // Clear Liquid Glass
        "border border-white/15",
        "bg-white/[0.06]",
        "backdrop-blur-3xl",

        // Soft depth
        "shadow-[0_25px_80px_rgba(0,0,0,0.25)]",

        // Smooth transition
        "transition-all duration-500",

        // Subtle hover
        "hover:border-white/25",
        "hover:bg-white/[0.08]",

        className
      )}
    >

      {/* Soft Light Reflection */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-3xl
          bg-gradient-to-br
          from-white/10
          via-transparent
          to-transparent
          opacity-60
        "
      />


      {/* Inner Glass Edge */}
      <div
        className="
          pointer-events-none
          absolute
          inset-[1px]
          rounded-3xl
          border
          border-white/10
        "
      />


      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}