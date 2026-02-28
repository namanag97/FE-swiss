import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "content" | "wide" | "full";
}

const widths = {
  content: "max-w-[680px]",
  wide: "max-w-[1100px]",
  full: "max-w-[1400px]",
} as const;

export function Container({ children, className, size = "wide" }: ContainerProps) {
  return (
    <div className={cn("mx-auto px-6", widths[size], className)}>
      {children}
    </div>
  );
}
