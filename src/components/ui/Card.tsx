import type { ReactNode } from 'react'
import s from './Card.module.css'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const cls = [s.card, className ?? ''].filter(Boolean).join(' ')

  return <div className={cls}>{children}</div>
}
