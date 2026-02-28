import { Button } from '../ui/Button'
import s from './CTABand.module.css'

interface CTABandProps {
  title: string
  titleAccent?: string
  subtitle: string
}

export function CTABand({ title, titleAccent, subtitle }: CTABandProps) {
  return (
    <section className={s.root}>
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
      <div className={s.actions}>
        <Button variant="light" href="/get-started">
          Get Started
        </Button>
        <Button variant="ghost-light" href="/demo">
          Request Demo
        </Button>
      </div>
    </section>
  )
}
