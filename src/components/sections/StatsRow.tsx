import s from './StatsRow.module.css'

interface Stat {
  value: string
  unit: string
  label: string
}

interface StatsRowProps {
  stats: Stat[]
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <section className={s.root}>
      {stats.map((stat) => (
        <div key={stat.label} className={s.cell}>
          <span className={s.value}>{stat.value}</span>
          <span className={s.unit}>{stat.unit}</span>
          <span className={s.label}>{stat.label}</span>
        </div>
      ))}
    </section>
  )
}
