import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Schedule a 30-minute demo with the Meridian team. See process mining in action on your use case.",
  alternates: { canonical: "/contact" },
  openGraph: { images: ["/og.png"] },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
