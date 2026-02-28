import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
        variant === "default" &&
          "border border-neutral-200 bg-neutral-50 text-neutral-600",
        variant === "accent" &&
          "border border-accent-200 bg-accent-50 text-accent-700",
        className
      )}
    >
      {children}
    </span>
  );
}
