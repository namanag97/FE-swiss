import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Early Access — Process Mining Platform",
  description: "Request early access to Sancalana. Connect your ERP, CRM, or ITSM and get your first process map in under an hour.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
