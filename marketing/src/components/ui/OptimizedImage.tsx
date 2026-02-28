import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function OptimizedImage({ className, alt, ...props }: ImageProps) {
  return (
    <Image
      className={cn("border border-[var(--border)]", className)}
      alt={alt}
      {...props}
    />
  );
}
