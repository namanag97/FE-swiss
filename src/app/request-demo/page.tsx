'use client'

import { useState } from 'react'
import { demoContent } from '@/content/demo'
import { Button } from '@/components/ui/Button'

/* ═══════════════════════════════════════════════════════════════
   Request Demo Page — "use client" for form handling
   2-col layout: hero + value props on left, form on right
   ═══════════════════════════════════════════════════════════════ */

function CheckSvg() {
  return (
    <svg className="demo-value-check" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3 3L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function RequestDemoPage() {
  const { hero, valueProps, testimonial, logos, form } = demoContent
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
  }

  return (
    <>
      <div className="page" style={{ overflow: 'hidden' }}>
        {/* Decorative wave SVG */}
        <div className="demo-page-waves">
          <svg width="300" height="400" viewBox="0 0 300 400" fill="none" preserveAspectRatio="xMidYMid slice">
            <g opacity="0.4">
              <path d="M-50 50C-30 50 20 120 80 118C140 116 100 200 50 280C0 360 250 400 320 420" stroke="currentColor" strokeWidth="0.5" />
              <path d="M200 0C160 60 80 250 180 300C280 350 400 50 380 220" stroke="currentColor" strokeWidth="0.5" />
              <path d="M-30 45C-20 50 30 120 90 125C150 130 110 210 70 285C30 360 270 380 330 410" stroke="currentColor" strokeWidth="0.5" />
              <path d="M-10 40C5 50 40 120 100 130C160 140 120 220 90 290C60 360 290 360 340 400" stroke="currentColor" strokeWidth="0.5" />
              <path d="M10 35C30 50 50 120 110 135C170 150 130 230 110 295C90 360 310 340 350 390" stroke="currentColor" strokeWidth="0.5" />
              <path d="M30 30C55 50 60 120 120 140C180 160 140 240 130 300C120 360 330 320 360 380" stroke="currentColor" strokeWidth="0.5" />
              <path d="M50 25C80 50 70 120 130 145C190 170 150 250 150 305C150 360 350 300 370 370" stroke="currentColor" strokeWidth="0.5" />
              <path d="M70 20C105 50 80 120 140 150C200 180 160 260 170 310C180 360 370 280 380 360" stroke="currentColor" strokeWidth="0.5" />
              <path d="M90 15C130 50 90 120 150 155C210 190 170 270 190 315C210 360 390 260 390 350" stroke="currentColor" strokeWidth="0.5" />
              <path d="M110 10C155 50 100 120 160 160C220 200 180 280 210 320C240 360 410 240 400 340" stroke="currentColor" strokeWidth="0.5" />
            </g>
          </svg>
        </div>

        <div className="demo-page-grid">
          {/* ── LEFT SIDE ── */}
          <div className="demo-left">
            <div>
              <h1 className="demo-hero-title">{hero.title}</h1>
              <p className="demo-hero-body" style={{ marginTop: 'var(--sp-3)' }}>
                {hero.subtitle}
              </p>
            </div>

            <div className="demo-value-list">
              {valueProps.map((prop) => (
                <div key={prop} className="demo-value-item">
                  <CheckSvg />
                  {prop}
                </div>
              ))}
            </div>

            <div className="demo-quote">
              <p className="demo-quote-text">{testimonial.quote}</p>
              <div className="demo-quote-attrib">
                <span className="demo-quote-name">{testimonial.name}</span>
                <span className="demo-quote-role">{testimonial.role}</span>
              </div>
            </div>

            <div className="demo-logos">
              {logos.map((logo) => (
                <span key={logo} className="demo-logo">{logo}</span>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE: FORM ── */}
          <div className="demo-right">
            <form className="demo-form" onSubmit={handleSubmit}>
              <h2 className="demo-form-title">{form.title}</h2>

              {form.fields.map((field) => (
                <div key={field.name} className="demo-form-group">
                  <label className="demo-form-label">{field.label}</label>
                  <input
                    className="demo-form-input"
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] ?? ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
                    }
                  />
                </div>
              ))}

              <div className="demo-form-group">
                <label className="demo-form-label">{form.select.label}</label>
                <select
                  className="demo-form-select"
                  value={formData[form.select.name] ?? ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [form.select.name]: e.target.value }))
                  }
                >
                  {form.select.options.map((opt) => (
                    <option key={opt} value={opt === 'Select an option' ? '' : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="primary" type="submit" fullWidth>
                {form.submitLabel}
              </Button>

              <p className="demo-form-legal">
                {form.legal}{' '}
                {form.legalLinks.map((link, i) => (
                  <span key={link.label}>
                    {i > 0 && ' and our '}
                    <a href={link.href}>{link.label}</a>
                  </span>
                ))}
                .
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        /* ── WAVE DECORATION ── */
        .demo-page-waves {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          color: var(--ink-faint);
          overflow: hidden;
          z-index: 0;
        }
        .demo-page-waves svg {
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 400px;
        }

        /* ── 2-COL LAYOUT ── */
        .demo-page-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 76px);
          position: relative;
          z-index: 1;
        }

        /* ── LEFT ── */
        .demo-left {
          padding: var(--sp-7) var(--sp-5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--sp-6);
          border-right: 1px solid var(--border);
        }
        .demo-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(32px, 3vw, var(--fs-2xl));
          font-weight: 400;
          line-height: .92;
          letter-spacing: -.03em;
          color: var(--ink);
        }
        .demo-hero-body {
          font-family: var(--font-body);
          font-size: var(--fs-md);
          font-weight: 260;
          line-height: 1.65;
          letter-spacing: -.015em;
          color: var(--ink-muted);
          max-width: 400px;
        }
        .demo-value-list {
          display: flex;
          flex-direction: column;
          gap: var(--sp-3);
        }
        .demo-value-item {
          display: flex;
          align-items: center;
          gap: var(--sp-3);
          font-family: var(--font-body);
          font-size: var(--fs-sm);
          font-weight: 260;
          letter-spacing: -.01em;
          color: var(--ink-muted);
        }
        .demo-value-check {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          color: var(--accent);
        }
        .demo-quote {
          padding-top: var(--sp-5);
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: var(--sp-3);
        }
        .demo-quote-text {
          font-family: var(--font-body);
          font-size: var(--fs-md);
          font-weight: 260;
          line-height: 1.65;
          letter-spacing: -.015em;
          color: var(--ink);
          font-style: italic;
        }
        .demo-quote-text::before { content: '\\201C'; }
        .demo-quote-text::after { content: '\\201D'; }
        .demo-quote-attrib {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .demo-quote-name {
          font-family: var(--font-body);
          font-size: var(--fs-sm);
          font-weight: 500;
          color: var(--ink-dark);
          letter-spacing: -.01em;
        }
        .demo-quote-role {
          font-family: var(--font-heading);
          font-size: var(--fs-xs);
          font-weight: 400;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--ink-faint);
        }
        .demo-logos {
          display: flex;
          gap: var(--sp-5);
          align-items: center;
          padding-top: var(--sp-4);
          border-top: 1px solid var(--border);
        }
        .demo-logo {
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .03em;
          color: var(--ink-faint);
        }

        /* ── RIGHT: FORM ── */
        .demo-right {
          padding: var(--sp-7) var(--sp-5);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .demo-form {
          background: var(--white);
          border: 1px solid var(--border);
          padding: var(--sp-6) var(--sp-5);
          display: flex;
          flex-direction: column;
          gap: var(--sp-4);
          max-width: 440px;
        }
        .demo-form-title {
          font-family: var(--font-heading);
          font-size: var(--fs-lg);
          font-weight: 400;
          letter-spacing: -.02em;
          color: var(--ink);
        }
        .demo-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .demo-form-label {
          font-family: var(--font-heading);
          font-size: var(--fs-xs);
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        .demo-form-input {
          font-family: var(--font-body);
          font-size: var(--fs-md);
          font-weight: 400;
          color: var(--ink);
          background: var(--bg);
          border: 1px solid var(--border-mid);
          border-radius: 0;
          padding: var(--sp-3) var(--sp-4);
          outline: none;
          transition: border-color var(--t-std);
          width: 100%;
        }
        .demo-form-input::placeholder {
          color: var(--ink-faint);
        }
        .demo-form-input:focus {
          border-color: var(--ink);
        }
        .demo-form-select {
          font-family: var(--font-body);
          font-size: var(--fs-md);
          font-weight: 400;
          color: var(--ink);
          background: var(--bg);
          border: 1px solid var(--border-mid);
          border-radius: 0;
          padding: var(--sp-3) var(--sp-4);
          outline: none;
          appearance: none;
          width: 100%;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 4l2.5 2.5L7.5 4' stroke='%237C7E7B' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right var(--sp-4) center;
          transition: border-color var(--t-std);
        }
        .demo-form-select:focus {
          border-color: var(--ink);
        }
        .demo-form-legal {
          font-family: var(--font-body);
          font-size: var(--fs-xs);
          font-weight: 260;
          line-height: 1.5;
          letter-spacing: -.01em;
          color: var(--ink-faint);
        }
        .demo-form-legal a {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>
    </>
  )
}
