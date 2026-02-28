import type { ReactNode } from 'react'
import { Button } from '../ui/Button'
import s from './PageHero.module.css'

interface Action {
  label: string
  variant: 'primary' | 'ghost' | 'light' | 'ghost-light'
  href: string
}

interface PageHeroProps {
  title: string
  titleAccent?: string
  subtitle: string
  actions?: Action[]
  children?: ReactNode
}

export function PageHero({
  title,
  titleAccent,
  subtitle,
  actions,
  children,
}: PageHeroProps) {
  return (
    <section className={s.root}>
      <h1 className={s.title}>
        {titleAccent ? (
          <>
            {title} <em>{titleAccent}</em>
          </>
        ) : (
          title
        )}
      </h1>
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
      {children}
    </section>
  )
}
