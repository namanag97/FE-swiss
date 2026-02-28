"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  }

  return (
    <section className="gr">
      <Container size="wide" style={{ padding: 'var(--sp-7) var(--sp-5)' } as React.CSSProperties}>
        <div className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="eyebrow eyebrow-bracket">Contact</span>
            <h1 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Talk to us</h1>
            <p className="type-body" style={{ marginTop: 'var(--sp-4)' }}>
              Tell us about your processes. We&apos;ll show you what {siteConfig.name} can reveal — live, on a 20-minute call.
            </p>

            <div className="flex flex-col" style={{ marginTop: 'var(--sp-7)', gap: 'var(--sp-5)' }}>
              <div>
                <p className="type-label">Email</p>
                <p className="type-body-sm" style={{ marginTop: 'var(--sp-1)' }}>hello@meridian.dev</p>
              </div>
              <div>
                <p className="type-label">Response time</p>
                <p className="type-body-sm" style={{ marginTop: 'var(--sp-1)' }}>Within one business day</p>
              </div>
              <div>
                <p className="type-label">For security inquiries</p>
                <p className="type-body-sm" style={{ marginTop: 'var(--sp-1)' }}>security@meridian.dev</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex h-full items-center justify-center" style={{ border: '1px solid var(--border)', padding: 'var(--sp-7)', textAlign: 'center' }}>
                <div>
                  <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(4,122,85,.12)', color: 'var(--emerald)' }}>
                    <Mail style={{ width: 16, height: 16 }} />
                  </div>
                  <p className="type-h3">Message sent</p>
                  <p className="type-body-sm" style={{ marginTop: 'var(--sp-2)' }}>We&apos;ll be in touch within one business day.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col" style={{ gap: 'var(--sp-4)' }}>
                <div className="grid gap-[var(--sp-4)] sm:grid-cols-2">
                  <div className="flex flex-col" style={{ gap: 6 }}>
                    <label htmlFor="first" className="type-label">First name</label>
                    <input id="first" name="first" required className="input" />
                  </div>
                  <div className="flex flex-col" style={{ gap: 6 }}>
                    <label htmlFor="last" className="type-label">Last name</label>
                    <input id="last" name="last" required className="input" />
                  </div>
                </div>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  <label htmlFor="email" className="type-label">Work email</label>
                  <input id="email" name="email" type="email" required className="input" />
                </div>
                <div className="grid gap-[var(--sp-4)] sm:grid-cols-2">
                  <div className="flex flex-col" style={{ gap: 6 }}>
                    <label htmlFor="company" className="type-label">Company</label>
                    <input id="company" name="company" required className="input" />
                  </div>
                  <div className="flex flex-col" style={{ gap: 6 }}>
                    <label htmlFor="size" className="type-label">Company size</label>
                    <select id="size" name="size" required className="input">
                      <option value="">Select...</option>
                      <option value="1-50">1–50 employees</option>
                      <option value="51-200">51–200</option>
                      <option value="201-1000">201–1,000</option>
                      <option value="1001-5000">1,001–5,000</option>
                      <option value="5001+">5,001+</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  <label htmlFor="role" className="type-label">Your role</label>
                  <select id="role" name="role" required className="input">
                    <option value="">Select...</option>
                    <option value="ops">Operations / Process Excellence</option>
                    <option value="analytics">Analytics / BI</option>
                    <option value="it">IT / Engineering</option>
                    <option value="exec">Executive / C-suite</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  <label htmlFor="message" className="type-label">Anything else?</label>
                  <textarea id="message" name="message" rows={4} className="input" style={{ resize: 'none' }} placeholder="Optional — tell us more about your use case" />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Sending..." : "Request demo"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
