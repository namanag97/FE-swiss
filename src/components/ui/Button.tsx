import Link from 'next/link'
import type { ReactNode } from 'react'
import s from './Button.module.css'

type ButtonVariant = 'primary' | 'ghost' | 'light' | 'ghost-light'

interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  children: ReactNode
  className?: string
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const variantClass: Record<ButtonVariant, string> = {
  primary: s.primary,
  ghost: s.ghost,
  light: s.light,
  'ghost-light': s.ghostLight,
}

export function Button({
  variant = 'primary',
  href,
  children,
  className,
  fullWidth,
  type = 'button',
  onClick,
}: ButtonProps) {
  const cls = [
    s.btn,
    variantClass[variant],
    fullWidth ? s.full : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    // External links use <a>, internal use <Link>
    const isExternal = href.startsWith('http') || href.startsWith('//')
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
