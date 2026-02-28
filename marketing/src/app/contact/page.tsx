"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[14px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900";
const selectClass =
  "w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[14px] text-gray-900 outline-none transition-colors focus:border-gray-900";

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
              Tell us about your processes. We&apos;ll show you what {siteConfig.name} can reveal — live, on a 20-minute call.
            </p>

            <div className="mt-10 space-y-5">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-sand-400">Email</p>
                <p className="mt-1 text-[14px] text-sand-700">hello@meridian.dev</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-sand-400">Response time</p>
                <p className="mt-1 text-[14px] text-sand-700">Within one business day</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-sand-400">For security inquiries</p>
                <p className="mt-1 text-[14px] text-sand-700">security@meridian.dev</p>
              </div>
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="mb-1 block text-[13px] font-medium text-sand-700">Company</label>
                    <input id="company" name="company" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="size" className="mb-1 block text-[13px] font-medium text-sand-700">Company size</label>
                    <select id="size" name="size" required className={selectClass}>
                      <option value="">Select...</option>
                      <option value="1-50">1–50 employees</option>
                      <option value="51-200">51–200</option>
                      <option value="201-1000">201–1,000</option>
                      <option value="1001-5000">1,001–5,000</option>
                      <option value="5001+">5,001+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="mb-1 block text-[13px] font-medium text-sand-700">Your role</label>
                  <select id="role" name="role" required className={selectClass}>
                    <option value="">Select...</option>
                    <option value="ops">Operations / Process Excellence</option>
                    <option value="analytics">Analytics / BI</option>
                    <option value="it">IT / Engineering</option>
                    <option value="exec">Executive / C-suite</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="process" className="mb-1 block text-[13px] font-medium text-sand-700">
                    Which process are you looking to analyze?
                  </label>
                  <select id="process" name="process" className={selectClass}>
                    <option value="">Select...</option>
                    <option value="o2c">Order-to-Cash</option>
                    <option value="p2p">Procure-to-Pay</option>
                    <option value="itsm">IT Service Management</option>
                    <option value="patient">Patient Journey</option>
                    <option value="custom">Other / Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-[13px] font-medium text-sand-700">Anything else?</label>
                  <textarea id="message" name="message" rows={4} className={`${inputClass} resize-none`} placeholder="Optional — tell us more about your use case" />
                </div>

                <button type="submit" className="rounded-lg bg-sand-900 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-sand-800">
                  Request demo
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
