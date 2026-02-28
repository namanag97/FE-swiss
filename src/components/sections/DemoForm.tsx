'use client'

import { Button } from '../ui/Button'
import s from './DemoForm.module.css'

interface ValueProp {
  text: string
}

interface Quote {
  text: string
  name: string
  role: string
}

interface FormField {
  label: string
  name: string
  type: 'text' | 'email' | 'select'
  placeholder: string
  options?: string[]
}

interface DemoFormProps {
  title: string
  subtitle: string
  valueProps: ValueProp[]
  quote: Quote
  logos: string[]
  formTitle: string
  fields: FormField[]
}

export function DemoForm({
  title,
  subtitle,
  valueProps,
  quote,
  logos,
  formTitle,
  fields,
}: DemoFormProps) {
  return (
    <div className={s.root}>
      {/* Decorative wave SVG */}
      <div className={s.waves} aria-hidden="true">
        <svg
          width="300"
          height="400"
          viewBox="0 0 300 400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <g opacity="0.4">
            <path
              d="M-50 50C-30 50 20 120 80 118C140 116 100 200 50 280C0 360 250 400 320 420"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M200 0C160 60 80 250 180 300C280 350 400 50 380 220"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M-30 45C-20 50 30 120 90 125C150 130 110 210 70 285C30 360 270 380 330 410"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M-10 40C5 50 40 120 100 130C160 140 120 220 90 290C60 360 290 360 340 400"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M10 35C30 50 50 120 110 135C170 150 130 230 110 295C90 360 310 340 350 390"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M30 30C55 50 60 120 120 140C180 160 140 240 130 300C120 360 330 320 360 380"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M50 25C80 50 70 120 130 145C190 170 150 250 150 305C150 360 350 300 370 370"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M70 20C105 50 80 120 140 150C200 180 160 260 170 310C180 360 370 280 380 360"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M90 15C130 50 90 120 150 155C210 190 170 270 190 315C210 360 390 260 390 350"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M110 10C155 50 100 120 160 160C220 200 180 280 210 320C240 360 410 240 400 340"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </g>
        </svg>
      </div>

      {/* LEFT SIDE */}
      <div className={s.left}>
        <div>
          <h1 className={s.heroTitle}>{title}</h1>
          <p className={s.heroBody}>{subtitle}</p>
        </div>

        <div className={s.valueList}>
          {valueProps.map((vp) => (
            <div key={vp.text} className={s.valueItem}>
              <svg
                className={s.valueCheck}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8.5l3 3L13 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {vp.text}
            </div>
          ))}
        </div>

        <div className={s.quote}>
          <p className={s.quoteText}>{quote.text}</p>
          <div className={s.quoteAttrib}>
            <span className={s.quoteName}>{quote.name}</span>
            <span className={s.quoteRole}>{quote.role}</span>
          </div>
        </div>

        <div className={s.logos}>
          {logos.map((logo) => (
            <span key={logo} className={s.logo}>
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className={s.right}>
        <form
          className={s.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className={s.formTitle}>{formTitle}</h2>

          {fields.map((field) => (
            <div key={field.name} className={s.formGroup}>
              <label className={s.formLabel}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  className={s.formSelect}
                  name={field.name}
                  defaultValue=""
                >
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className={s.formInput}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}

          <Button
            variant="primary"
            type="submit"
            fullWidth
          >
            Submit
          </Button>

          <p className={s.formLegal}>
            By submitting this form you agree to the processing of your
            personal data as described in our{' '}
            <a href="/terms">Terms</a> and our{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  )
}
