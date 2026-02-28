import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border border-sand-200 bg-sand-50 px-2.5 py-0.5 text-[11px] font-medium text-sand-600",
      className
    )}>
      {children}
    </span>
  );
}
