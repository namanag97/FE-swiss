"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to your form backend (Formspree, Resend, etc.)
    setSubmitted(true);
  }

  return (
    <section className="py-24 md:py-32">
      <Container size="content">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-neutral-500">
          Want to learn more about {siteConfig.name}? Fill out the form and
          we&apos;ll get back to you within 24 hours.
        </p>

        {submitted ? (
          <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center">
            <p className="text-lg font-semibold text-neutral-900">
              Thanks for reaching out!
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send message
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
