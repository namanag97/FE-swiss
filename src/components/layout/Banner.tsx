import Link from 'next/link'
import { site } from '@/config/site'
import styles from './Banner.module.css'

export function Banner() {
  return (
    <div className={styles.banner}>
      <span className={styles.bannerText}>{site.banner.text}</span>
      <div className={styles.bannerDot} />
      <Link className={styles.bannerLink} href={site.banner.link}>
        {site.banner.linkText}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5h6M5 2.5L7.5 5 5 7.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  )
}
