"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const info = [
  { icon: Mail, label: "Email", value: "hello@yoursite.com" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
];

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="py-24 md:py-28">
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Left info */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
              Contact
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Get in touch
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-500">
              Want to learn more about {siteConfig.name}? Fill out the form and
              we&apos;ll get back to you quickly.
            </p>

            <div className="mt-10 space-y-5">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="rounded-lg bg-neutral-100 p-2">
                    <item.icon className="h-4 w-4 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-400">{item.label}</p>
                    <p className="text-sm text-neutral-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-12 text-center">
                <div>
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <p className="text-lg font-semibold text-neutral-900">Message sent!</p>
                  <p className="mt-1 text-sm text-neutral-500">We&apos;ll be in touch within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first" className="mb-1.5 block text-sm font-medium text-neutral-700">
                      First name
                    </label>
                    <input id="first" name="first" required className={inputClass} placeholder="Jane" />
                  </div>
                  <div>
                    <label htmlFor="last" className="mb-1.5 block text-sm font-medium text-neutral-700">
                      Last name
                    </label>
                    <input id="last" name="last" required className={inputClass} placeholder="Smith" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Work email
                  </label>
                  <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
                </div>

                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Company
                  </label>
                  <input id="company" name="company" className={inputClass} placeholder="Acme Corp" />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-700">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
