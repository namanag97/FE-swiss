import Link from 'next/link'
import s from './CompareGrid.module.css'

interface Competitor {
  name: string
  description: string
  color: string
  href: string
}

interface CompareGridProps {
  competitors: Competitor[]
}

export function CompareGrid({ competitors }: CompareGridProps) {
  return (
    <div className={s.root}>
      {competitors.map((c) => (
        <Link key={c.name} href={c.href} className={s.card}>
          <div className={s.icon}>
            <div
              className={s.iconDot}
              style={{ background: c.color }}
            />
          </div>
          <span className={s.name}>{c.name}</span>
          <span className={s.description}>{c.description}</span>
          <span className={s.arrow}>
            Compare{' '}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M2 5h6M5 2.5L7.5 5 5 7.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  )
}
