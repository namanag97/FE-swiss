"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { captureMarketingEvent, getAttribution } from "@/lib/analytics";

interface FormState {
  name: string;
  email: string;
  company: string;
  role: string;
  process: string;
  systems: string;
  urgency: string;
  notes: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  process: "",
  systems: "",
  urgency: "",
  notes: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");
  const startedRef = useRef(false);
  const mailto = `mailto:hello@sancalana.com?subject=${encodeURIComponent("Early access request")}&body=${encodeURIComponent(
    `Name: ${form.name}\nCompany: ${form.company}\nRole: ${form.role}\nProcess: ${form.process}\nSystems: ${form.systems}\nUrgency: ${form.urgency}\n\n${form.notes}`,
  )}`;

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  useEffect(() => {
    setHydrated(true);
  }, []);

  function onFormFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    captureMarketingEvent("contact_form_started");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    captureMarketingEvent("contact_form_submitted", {
      process: form.process,
      urgency: form.urgency,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, attribution: getAttribution() }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(payload?.error || "Request could not be saved.");
      }

      setSubmitted(true);
      setForm(initialState);
      window.history.replaceState(null, "", "/thank-you");
      captureMarketingEvent("contact_form_saved", { process: form.process, urgency: form.urgency });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request could not be saved.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-[var(--border)] bg-[var(--bg)] p-[var(--sp-5)]">
        <p className="type-label text-[color:var(--emerald)]">Request received</p>
        <h2 className="type-h3 mt-[var(--sp-2)]">We will reply with the right next step.</h2>
        <p className="type-body mt-[var(--sp-3)] text-mid">
          Bring one process and the systems behind it. We will use that context to decide whether a live walkthrough or data review makes sense.
        </p>
      </div>
    );
  }

  return (
    <form
      method="post"
      action="/api/contact"
      onSubmit={onSubmit}
      onFocus={onFormFocus}
      className="border border-[var(--border)] bg-[var(--bg)] p-[var(--sp-5)] flex flex-col gap-[var(--sp-4)]"
    >
      <div>
        <p className="type-label">Fast intake</p>
        <h2 className="type-h3 mt-[var(--sp-2)]">Tell us what you want to map</h2>
      </div>

      <div className="grid gap-[var(--sp-3)] sm:grid-cols-2">
        <input className="input" name="name" placeholder="Name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        <input className="input" name="email" type="email" placeholder="Work email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
      </div>

      <div className="grid gap-[var(--sp-3)] sm:grid-cols-2">
        <input className="input" name="company" placeholder="Company" required value={form.company} onChange={(e) => update("company", e.target.value)} />
        <input className="input" name="role" placeholder="Role" value={form.role} onChange={(e) => update("role", e.target.value)} />
      </div>

      <select className="input" name="process" required value={form.process} onChange={(e) => update("process", e.target.value)}>
        <option value="">Process to map first</option>
        <option value="procure-to-pay">Procure-to-pay</option>
        <option value="order-to-cash">Order-to-cash</option>
        <option value="incident-management">Incident management</option>
        <option value="migration-readiness">S/4HANA migration readiness</option>
        <option value="other">Other workflow</option>
      </select>

      <input className="input" name="systems" placeholder="Systems with the event data, e.g. SAP, ServiceNow, Salesforce, Snowflake" value={form.systems} onChange={(e) => update("systems", e.target.value)} />

      <select className="input" name="urgency" value={form.urgency} onChange={(e) => update("urgency", e.target.value)}>
        <option value="">What is driving urgency?</option>
        <option value="cycle-time">Cycle time or SLA misses</option>
        <option value="migration">Migration / transformation program</option>
        <option value="automation">Automation target selection</option>
        <option value="audit">Audit, controls, or conformance</option>
        <option value="exploration">Exploring the category</option>
      </select>

      <textarea className="input min-h-[120px]" name="notes" placeholder="Where is the drag showing up today?" value={form.notes} onChange={(e) => update("notes", e.target.value)} />

      <button className="btn btn-primary" type="submit" disabled={submitting || !hydrated} data-track="contact_form_submit_clicked" data-track-location="contact-form">
        {submitting ? "Sending" : "Send process brief"}
      </button>

      {error && (
        <div className="border border-[var(--border)] bg-[var(--white)] p-[var(--sp-3)]">
          <p className="type-body-sm text-mid">{error}</p>
          <a href={mailto} className="type-label text-[color:var(--emerald)] mt-2 inline-block" data-track="contact_mailto_fallback_clicked" data-track-location="contact-form">
            Email the same brief instead
          </a>
        </div>
      )}
    </form>
  );
}
