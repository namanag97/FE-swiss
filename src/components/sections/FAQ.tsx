'use client'

import { useState } from 'react'
import s from './FAQ.module.css'

interface FAQItem {
  question: string
  answer: string
}

interface NoteLink {
  label: string
  href: string
}

interface FAQProps {
  title: string
  items: FAQItem[]
  note?: string
  noteLinks?: NoteLink[]
}

export function FAQ({ title, items, note, noteLinks }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className={s.root}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.list}>
        {items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className={s.item}>
              <button
                className={s.question}
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                {item.question}
                <svg
                  className={[s.icon, isOpen ? s.iconOpen : '']
                    .filter(Boolean)
                    .join(' ')}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 3v10M3 8h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                className={[s.answer, isOpen ? s.answerOpen : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {item.answer}
              </div>
            </div>
          )
        })}
      </div>
      {note && (
        <p className={s.note}>
          {note}{' '}
          {noteLinks?.map((link, i) => (
            <span key={i}>
              <a className={s.noteLink} href={link.href}>
                {link.label}
              </a>
              {i < noteLinks.length - 1 ? ' or ' : ''}
            </span>
          ))}
        </p>
      )}
    </section>
  )
}
