import Link from "next/link";
import { siteConfig } from "@/lib/config";

function Col({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
            >
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
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-[15px] font-bold tracking-tight text-neutral-900"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-neutral-500">
              {siteConfig.description}
            </p>
          </div>
          <Col title="Product" links={siteConfig.footer.product} />
          <Col title="Company" links={siteConfig.footer.company} />
          <Col title="Legal" links={siteConfig.footer.legal} />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-xs text-neutral-400 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {Object.entries(siteConfig.links).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize transition-colors hover:text-neutral-600"
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
