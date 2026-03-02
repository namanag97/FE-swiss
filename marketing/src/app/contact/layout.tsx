import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Early Access — Process Mining Platform",
  description: "Request early access to Meridian. Connect your ERP, CRM, or ITSM and get your first process map in under an hour.",
  alternates: { canonical: "/contact" },
  openGraph: { images: ["/og.png"] },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
