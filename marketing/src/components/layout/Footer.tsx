import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { NewsletterForm } from "./NewsletterForm";

function Col({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--sp-4)' }}>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>
        {title}
      </p>
      <div className="flex flex-col" style={{ gap: 'var(--sp-2)' }}>
        {links.map((l) => (
          <Link key={l.href + l.label} href={l.href} className="footer-link">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:[grid-template-columns:1.8fr_repeat(4,1fr)] lg:gap-[64px]" style={{ paddingBottom: 'var(--sp-6)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          {/* Brand + newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col" style={{ gap: 'var(--sp-4)' }}>
            <Link href="/" className="flex items-center gap-[6px]" style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, letterSpacing: '-.03em', color: 'white' }}>
              <div className="flex items-center justify-center" style={{ width: 18, height: 18, border: '1.5px solid rgba(255,255,255,.35)' }}>
                <span className="rounded-full" style={{ width: 6, height: 6, background: 'var(--emerald)' }} />
              </div>
              {siteConfig.name}
            </Link>
            <div className="flex flex-col" style={{ gap: 'var(--sp-3)' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', fontWeight: 400, letterSpacing: '-.01em', color: 'rgba(255,255,255,.7)' }}>
                Stay in the loop
              </p>
              <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-xs)', fontWeight: 260, lineHeight: 1.5, color: 'rgba(255,255,255,.35)' }}>
                Product updates, engineering insights, and process mining perspectives.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <Col title="Platform" links={siteConfig.footer.platform} />
          <Col title="Company" links={siteConfig.footer.company} />
          <Col title="Solutions" links={siteConfig.footer.solutions} />
          <Col title="Resources" links={siteConfig.footer.resources} />
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" style={{ paddingTop: 'var(--sp-5)' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400, letterSpacing: '.04em', color: 'rgba(255,255,255,.2)' }}>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {Object.entries(siteConfig.links).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social capitalize"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
