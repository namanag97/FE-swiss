import s from './LogoStrip.module.css'

interface LogoStripProps {
  logos: string[]
}

export function LogoStrip({ logos }: LogoStripProps) {
  return (
    <div className={s.root}>
      <span className={s.label}>Trusted by</span>
      {logos.map((logo) => (
        <span key={logo} className={s.logo}>
          {logo}
        </span>
      ))}
    </div>
  )
}
