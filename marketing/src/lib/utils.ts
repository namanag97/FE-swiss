import { clsx, type ClassValue } from "clsx";

/** Merge class names — drop-in for cn() pattern */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format a date string to human-readable format */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
