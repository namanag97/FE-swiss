import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-forest-900 text-white border-forest-900 hover:bg-forest-800 active:scale-[0.98]",
  secondary: "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:text-gray-900",
  ghost: "bg-transparent text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-[13px]",
  lg: "h-11 px-6 text-sm",
};

export function Button({
  variant = "primary", size = "md", className, ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant], sizes[size], className
      )}
      {...props}
    />
  );
}
