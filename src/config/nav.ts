export type NavItem = {
  label: string
  href: string
  hasDropdown?: boolean
}

export type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

export const navItems: NavItem[] = [
  { label: 'Products', href: '/product', hasDropdown: true },
  { label: 'Industries', href: '#', hasDropdown: true },
  { label: 'Company', href: '/about', hasDropdown: true },
  { label: 'Pricing', href: '/pricing' },
]

export const navActions = {
  primary: { label: 'Request Demo', href: '/request-demo' },
  secondary: { label: 'Get Started', href: '#' },
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Threads', href: '/product' },
      { label: 'Ontology', href: '#' },
      { label: 'Playbooks', href: '#' },
      { label: 'Dashboards', href: '#' },
      { label: 'Slack', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Healthcare', href: '#' },
      { label: 'Financial Services', href: '#' },
      { label: 'Manufacturing', href: '#' },
      { label: 'Retail', href: '#' },
      { label: 'Media', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '/blog' },
      { label: 'LinkedIn', href: '#' },
      { label: 'X / Twitter', href: '#' },
      { label: 'About', href: '/about' },
      { label: 'Versus', href: '/versus' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Partners', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Log In', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
]
