"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Clock, Users, Check } from "lucide-react";

export default function RequestDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '', companySize: '', role: '', dataSource: '', challenge: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="gi" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
          <div style={{ width: 48, height: 48, border: '1px solid var(--emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <Check style={{ width: 24, height: 24, color: 'var(--emerald)' }} />
          </div>
          <h2 className="type-h2" style={{ marginTop: 'var(--sp-4)' }}>Demo <em>scheduled</em></h2>
          <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>
            We&apos;ll send you a calendar invite within 24 hours. Looking forward to showing you the platform.
          </p>
          <Link href="/product" className="btn btn-primary" style={{ marginTop: 'var(--sp-5)' }}>Explore Platform</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
      <div className="gi">
        <div className="contact-split">
          {/* Left: Demo info */}
          <div>
            <span className="eyebrow eyebrow-bracket">Demo</span>
            <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
              See Meridian <em>in action</em>
            </h1>
            <p className="type-body" style={{ marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
              A 30-minute walkthrough of the platform, tailored to your use case.
              No slides — just the product.
            </p>

            <div style={{ marginTop: 'var(--sp-6)' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-4)' }}>
                What we&apos;ll cover
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {[
                  { icon: Play, text: 'Live process discovery from event log data' },
                  { icon: Users, text: 'Conformance checking against your ideal process' },
                  { icon: Clock, text: 'Real-time analytics and bottleneck detection' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
                    <div style={{ width: 28, height: 28, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon style={{ width: 12, height: 12, color: 'var(--emerald)' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink-mid)' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'var(--sp-6)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--sp-3)' }}>
              {[
                { value: '30 min', label: 'Duration' },
                { value: '< 24h', label: 'Scheduling' },
                { value: 'Free', label: 'Cost' },
              ].map((s) => (
                <div key={s.label} style={{ padding: 'var(--sp-3)', border: '1px solid var(--border)', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-base)', fontWeight: 500, color: 'var(--ink)' }}>{s.value}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-muted)', marginTop: 'var(--sp-1)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ border: '1px solid var(--border)', padding: 'var(--sp-6)' }}>
            <h2 className="type-h3">Request your demo</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
                <div>
                  <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>First name</label>
                  <input name="firstName" className="input" required value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>Last name</label>
                  <input name="lastName" className="input" required value={formData.lastName} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>Work email</label>
                <input name="email" type="email" className="input" required value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>Company</label>
                <input name="company" className="input" required value={formData.company} onChange={handleChange} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
                <div>
                  <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>Company size</label>
                  <select name="companySize" className="input" value={formData.companySize} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="1-50">1–50</option>
                    <option value="51-200">51–200</option>
                    <option value="201-1000">201–1,000</option>
                    <option value="1001-5000">1,001–5,000</option>
                    <option value="5000+">5,000+</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>Data source</label>
                  <select name="dataSource" className="input" value={formData.dataSource} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="sap">SAP</option>
                    <option value="servicenow">ServiceNow</option>
                    <option value="salesforce">Salesforce</option>
                    <option value="jira">JIRA</option>
                    <option value="csv">CSV / Event Log</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>What are you looking to solve?</label>
                <textarea name="challenge" className="input" rows={3} value={formData.challenge} onChange={handleChange} style={{ resize: 'vertical' }} placeholder="e.g., We want to reduce our Order-to-Cash cycle time..." />
              </div>
              <button type="submit" className="btn btn-primary btn-full">Request Demo</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
