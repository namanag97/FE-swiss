import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Demo",
  description: "Book a 30-minute demo of Meridian. See process mining, conformance checking, and visual analytics on your data.",
  alternates: { canonical: "/request-demo" },
  openGraph: { images: ["/og.png"] },
};

export default function RequestDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
