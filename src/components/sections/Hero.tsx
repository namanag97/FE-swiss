import type { ReactNode } from 'react'
import { Eyebrow } from '../ui/Eyebrow'
import { Button } from '../ui/Button'
import s from './Hero.module.css'

interface Action {
  label: string
  variant: 'primary' | 'ghost' | 'light' | 'ghost-light'
  href: string
}

interface HeroProps {
  eyebrow: string
  eyebrowVariant?: 'bracket' | 'pulse'
  title: ReactNode
  subtitle: string
  actions?: Action[]
  showDotField?: boolean
}

export function Hero({
  eyebrow,
  eyebrowVariant = 'pulse',
  title,
  subtitle,
  actions,
  showDotField = true,
}: HeroProps) {
  return (
    <section className={s.root}>
      {showDotField && <div className={s.dotField} aria-hidden="true" />}

      <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>

      <h1 className={s.heading}>{title}</h1>

      <p className={s.subtitle}>{subtitle}</p>

      {actions && actions.length > 0 && (
        <div className={s.actions}>
          {actions.map((a) => (
            <Button key={a.label} variant={a.variant} href={a.href}>
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </section>
  )
}
