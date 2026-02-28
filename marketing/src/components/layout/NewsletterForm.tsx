"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--emerald)', marginTop: 4 }}>
        Subscribed!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex">
      <input
        type="email"
        required
        placeholder="Your email"
        className="input-dark"
        style={{ width: 180, borderRight: 'none' }}
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
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
