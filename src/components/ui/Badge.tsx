import type { ReactNode } from 'react'
import s from './Badge.module.css'

type BadgeVariant = 'neutral' | 'active' | 'green'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantClass: Record<BadgeVariant, string> = {
  neutral: s.neutral,
  active: s.active,
  green: s.green,
}

export function Badge({
  variant = 'neutral',
  children,
  className,
}: BadgeProps) {
  const cls = [s.badge, variantClass[variant], className ?? '']
    .filter(Boolean)
    .join(' ')

  return <span className={cls}>{children}</span>
}
