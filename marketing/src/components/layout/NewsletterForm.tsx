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
    return <p className="mt-4 text-[13px] text-emerald-400">Subscribed!</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex gap-2">
      <input
        type="email"
        required
        placeholder="Your email"
        className="w-full rounded-lg border border-forest-700 bg-forest-800 px-3 py-1.5 text-[13px] text-white placeholder:text-forest-200/40 outline-none transition-colors focus:border-forest-500"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-forest-900 transition-colors hover:bg-gray-100"
      >
        Subscribe
      </button>
    </form>
  );
}
