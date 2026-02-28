import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "content" | "wide" | "full";
}

const widths = {
  content: "max-w-[680px]",
  wide: "max-w-[1400px]",
  full: "max-w-[1400px]",
} as const;

export function Container({ children, className, size = "wide" }: ContainerProps) {
  return (
    <div className={cn("mx-auto px-[30px]", widths[size], className)}>
      {children}
    </div>
  );
}
