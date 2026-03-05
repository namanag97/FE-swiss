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
      <p className="type-label text-[color:var(--emerald)] mt-1">
        Subscribed!
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex max-w-[320px] w-full">
        <input
          ref={emailRef}
          type="email"
          name="email"
          required
          placeholder="Your email"
          aria-label="Email address"
          className="input-dark flex-1 min-w-0 border-r-0"
        />
        <button type="submit" className="btn btn-dark shrink-0 border-l-0">
          Subscribe
        </button>
      </form>
      {error && (
        <p className="type-label text-[color:var(--error)] mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
