import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
};

const sizes: Record<Size, string> = {
  sm: "text-[9px] py-[8px] px-[12px]",
  md: "",
  lg: "text-[11px] py-[14px] px-[24px]",
};

export function Button({
  variant = "primary", size = "md", className, ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn("btn", variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
