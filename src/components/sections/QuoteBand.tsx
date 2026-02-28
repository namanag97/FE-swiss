import s from './QuoteBand.module.css'

interface QuoteBandProps {
  quote: string
  name: string
  role: string
}

export function QuoteBand({ quote, name, role }: QuoteBandProps) {
  return (
    <section className={s.root}>
      <p className={s.quote}>{quote}</p>
      <span className={s.attribution}>
        {name} &middot; {role}
      </span>
    </section>
  )
}
