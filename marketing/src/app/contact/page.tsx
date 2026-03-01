"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Clock, Shield, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '', companySize: '', role: '', message: ''
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
          <h2 className="type-h2" style={{ marginTop: 'var(--sp-4)' }}>Message <em>received</em></h2>
          <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>
            We&apos;ll get back to you within 24 hours. In the meantime, explore our platform.
          </p>
          <Link href="/platform" className="btn btn-primary" style={{ marginTop: 'var(--sp-5)' }}>Explore Platform</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="gi">
          <div className="contact-split">
            {/* Left: Hero + Value Props */}
            <div>
              <span className="eyebrow eyebrow-bracket">Contact</span>
              <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
                Let&apos;s <em>talk</em>
              </h1>
              <p className="type-body" style={{ marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
                Whether you&apos;re exploring process mining for the first time or ready to deploy
                at scale, we&apos;d love to hear from you.
              </p>

              <div style={{ marginTop: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                {[
                  { icon: Mail, title: 'hello@meridian.dev', desc: 'General inquiries' },
                  { icon: Clock, title: 'Response within 24h', desc: 'Usually much faster' },
                  { icon: Shield, title: 'security@meridian.dev', desc: 'Security inquiries' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'start' }}>
                    <div style={{ width: 32, height: 32, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon style={{ width: 14, height: 14, color: 'var(--ink-muted)' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', fontWeight: 500, color: 'var(--ink)' }}>{title}</p>
                      <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-muted)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Value prop */}
              <div style={{ marginTop: 'var(--sp-6)', padding: 'var(--sp-5)', border: '1px solid var(--border)' }}>
                <p style={{ fontFamily: 'var(--caslon)', fontStyle: 'italic', color: 'var(--emerald)', lineHeight: 1.6 }}>
                  &ldquo;We built Meridian for operations teams who are tired of guessing where
                  their processes break down.&rdquo;
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-muted)', marginTop: 'var(--sp-3)' }}>
                  — The Meridian Team
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div style={{ border: '1px solid var(--border)', padding: 'var(--sp-6)' }}>
              <h2 className="type-h3">Send us a message</h2>
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
                    <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>Role</label>
                    <select name="role" className="input" value={formData.role} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="executive">Executive</option>
                      <option value="operations">Operations</option>
                      <option value="engineering">Engineering</option>
                      <option value="data">Data / Analytics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)', display: 'block' }}>Message</label>
                  <textarea name="message" className="input" rows={4} value={formData.message} onChange={handleChange} style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
