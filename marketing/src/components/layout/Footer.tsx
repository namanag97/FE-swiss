import Link from "next/link";
import { siteConfig } from "@/lib/config";

function Col({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-widest text-sand-400">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[13px] text-sand-500 transition-colors hover:text-sand-900">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-50">
      <div className="mx-auto max-w-[1100px] px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-[15px] font-semibold tracking-tight text-sand-900">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-sand-500">
              {siteConfig.description}
            </p>
          </div>
          <Col title="Platform" links={siteConfig.footer.platform} />
          <Col title="Company" links={siteConfig.footer.company} />
          <Col title="Legal" links={siteConfig.footer.legal} />
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-sand-200 pt-6 text-[11px] text-sand-400 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5">
            {Object.entries(siteConfig.links).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-sand-600">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
