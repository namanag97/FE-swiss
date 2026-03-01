import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Meridian team. General inquiries, partnership requests, and enterprise sales.",
  alternates: { canonical: "/contact" },
  openGraph: { images: ["/og.png"] },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
