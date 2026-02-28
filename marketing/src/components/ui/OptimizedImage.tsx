import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function OptimizedImage({ className, alt, ...props }: ImageProps) {
  return (
    <Image
      className={cn("rounded-lg border border-gray-200", className)}
      alt={alt}
      {...props}
    />
  );
}
