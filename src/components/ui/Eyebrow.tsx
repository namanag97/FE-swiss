import type { ReactNode } from 'react'
import s from './Eyebrow.module.css'

type EyebrowVariant = 'bracket' | 'pulse'

interface EyebrowProps {
  variant?: EyebrowVariant
  children: ReactNode
  className?: string
}

export function Eyebrow({
  variant = 'bracket',
  children,
  className,
}: EyebrowProps) {
  const cls = [
    s.eyebrow,
    variant === 'bracket' ? s.bracket : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  if (variant === 'pulse') {
    return (
      <span className={[s.eyebrow, className ?? ''].filter(Boolean).join(' ')}>
        <span className={s.pulseDot} aria-hidden="true" />
        {children}
      </span>
    )
  }

  return <span className={cls}>{children}</span>
}
