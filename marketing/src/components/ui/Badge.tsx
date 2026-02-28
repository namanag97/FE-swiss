import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "active" | "high" | "medium" | "low";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "tag-neutral",
  active: "tag-active",
  high: "tag-high",
  medium: "tag-medium",
  low: "tag-low",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span className={cn("tag", variantClasses[variant], className)}>
      {children}
    </span>
  );
}
