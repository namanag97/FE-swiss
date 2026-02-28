'use client'

import s from './NewsletterBand.module.css'

interface NewsletterBandProps {
  title: string
  titleAccent?: string
  subtitle: string
}

export function NewsletterBand({
  title,
  titleAccent,
  subtitle,
}: NewsletterBandProps) {
  return (
    <section className={s.root}>
      <div className={s.inner}>
        <div>
          <h2 className={s.title}>
            {titleAccent ? (
              <>
                {title} <em>{titleAccent}</em>
              </>
            ) : (
              title
            )}
          </h2>
          <p className={s.subtitle}>{subtitle}</p>
        </div>
        <form
          className={s.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className={s.input}
            type="email"
            placeholder="you@company.com"
          />
          <button className={s.submit} type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
