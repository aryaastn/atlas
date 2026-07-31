import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({
  children,
  className,
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full",
        "border border-white/15",
        "bg-white/5 backdrop-blur-2xl",
        "px-4 py-2",
        "text-sm font-medium text-white/80",
        "shadow-[0_8px_30px_rgba(0,0,0,.25)]",
        className
      )}
    >
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      {children}
    </div>
  );
}