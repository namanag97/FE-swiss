import type { InputHTMLAttributes } from 'react'
import s from './Input.module.css'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  dark?: boolean
  className?: string
}

export function Input({
  type = 'text',
  placeholder,
  dark = false,
  className,
  ...rest
}: InputProps) {
  const cls = [s.input, dark ? s.dark : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cls}
      {...rest}
    />
  )
}
