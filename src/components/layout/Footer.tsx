import Link from 'next/link'
import { site } from '@/config/site'
import { footerColumns } from '@/config/nav'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* ── Brand + Newsletter column ── */}
          <div className={styles.footerBrand}>
            <Link className={styles.footerLogo} href="/">
              <div className={styles.footerLogoMark}>
                <span className={styles.footerLogoDot} />
              </div>
              TextQL
            </Link>
            <p className={styles.footerTagline}>{site.tagline}</p>
            <div className={styles.footerNewsletter}>
              <span className={styles.footerNlTitle}>
                {site.newsletter.title}
              </span>
              <span className={styles.footerNlDesc}>
                {site.newsletter.description}
              </span>
              <div className={styles.footerNlRow}>
                <input
                  className={styles.inputDark}
                  type="email"
                  placeholder={site.newsletter.placeholder}
                />
                <button className={styles.btnFooter}>Subscribe</button>
              </div>
            </div>
          </div>

          {/* ── Link columns ── */}
          {footerColumns.map((col) => (
            <div key={col.title} className={styles.footerCol}>
              <span className={styles.footerColTitle}>{col.title}</span>
              <div className={styles.footerLinks}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    className={styles.footerLink}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Copyright ── */}
        <div className={styles.footerBottom}>
          <span className={styles.footerCopy}>{site.legal.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
