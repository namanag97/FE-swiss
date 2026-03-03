"use client";

import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import posthog from "posthog-js";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => setSubmitted(false), 4000);
    return () => clearTimeout(t);
  }, [submitted]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const email = emailRef.current?.value?.trim();
    if (!email) return;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Enter a valid email");
      return;
    }

    try { posthog.capture("newsletter_signup", { email }); } catch { /* analytics unavailable */ }
    setSubmitted(true);
    if (emailRef.current) emailRef.current.value = "";
  }

  if (submitted) {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--emerald)', marginTop: 4 }}>
        Subscribed!
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex" style={{ maxWidth: 320, width: "100%" }}>
        <input
          ref={emailRef}
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="input-dark"
          style={{ flex: 1, minWidth: 0, borderRight: 'none' }}
        />
        <button
          type="submit"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'var(--fs-xs)',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '.06em',
            padding: 'var(--sp-2) var(--sp-3)',
            borderRadius: 0,
            background: 'rgba(255,255,255,.08)',
            color: 'rgba(255,255,255,.6)',
            border: '1px solid rgba(255,255,255,.12)',
            borderLeft: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          Subscribe
        </button>
      </form>
      {error && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: '#f87171', marginTop: 4, letterSpacing: '.02em' }}>
          {error}
        </p>
      )}
    </div>
  );
}
