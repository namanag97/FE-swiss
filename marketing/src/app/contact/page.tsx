"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const inputClass =
  "w-full rounded-lg border border-sand-200 bg-white px-4 py-2.5 text-[14px] text-sand-900 outline-none transition-colors placeholder:text-sand-400 focus:border-sand-900";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="py-20 md:py-24">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-[11px] font-medium uppercase tracking-widest text-terra-600">Contact</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-sand-900">
              Talk to us
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-sand-500">
              Want to see {siteConfig.name} on your data? Tell us about your processes and we&apos;ll schedule a 20-minute live demo.
            </p>
            <div className="mt-8 text-[13px] text-sand-500">
              <p className="font-medium text-sand-700">hello@meridian.dev</p>
              <p className="mt-1">We respond within one business day.</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-sand-200 bg-sand-50 p-12 text-center">
                <div>
                  <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-terra-100 text-terra-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <p className="text-base font-semibold text-sand-900">Message sent</p>
                  <p className="mt-1 text-[13px] text-sand-500">We&apos;ll be in touch within one business day.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first" className="mb-1 block text-[13px] font-medium text-sand-700">First name</label>
                    <input id="first" name="first" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="last" className="mb-1 block text-[13px] font-medium text-sand-700">Last name</label>
                    <input id="last" name="last" required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-[13px] font-medium text-sand-700">Work email</label>
                  <input id="email" name="email" type="email" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="company" className="mb-1 block text-[13px] font-medium text-sand-700">Company</label>
                  <input id="company" name="company" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-[13px] font-medium text-sand-700">Tell us about your use case</label>
                  <textarea id="message" name="message" rows={5} required className={`${inputClass} resize-none`} />
                </div>
                <button type="submit" className="rounded-lg bg-sand-900 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-sand-800">
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
