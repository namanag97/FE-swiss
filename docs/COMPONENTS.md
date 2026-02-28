# Component Inventory

## Layout Components (`src/components/layout/`)

| Component | Description | Used On |
|-----------|-------------|---------|
| `Banner` | Dark announcement bar (Gartner 2026) | All pages |
| `Navbar` | Sticky glassmorphism nav with logo + links + CTAs | All pages |
| `Footer` | Dark 5-column footer with newsletter | All pages |
| `PageShell` | Wrapper: max-width 1400px + vertical grid rails | All pages |
| `SectionDivider` | Full-viewport-width 1px hairline | Between sections |

## UI Components (`src/components/ui/`)

| Component | Variants | Description |
|-----------|----------|-------------|
| `Button` | `primary`, `ghost`, `light`, `ghost-light` | Square corners, diagonal stripe, corner markers on hover |
| `Eyebrow` | `pulse`, `bracket` | Section label — `[ Text ]` or animated dot + text |
| `Badge` | `neutral`, `active`, `green` | 9px GeistMono uppercase tags |
| `Input` | `default`, `dark` | Square, no radius, focus border change |
| `Select` | — | Custom styled with SVG chevron |
| `Card` | — | White bg, 1px border, zero shadow |

## Section Components (`src/components/sections/`)

| Component | Props | Used On |
|-----------|-------|---------|
| `Hero` | title, subtitle, eyebrow, buttons | Home, Blog |
| `PageHero` | title, subtitle (centered) | Pricing, Product, Versus |
| `FeatureSection` | eyebrow, title, body, visual, reversed? | Product, Home |
| `FeatureCards` | cards[] with icon, title, body, demo | Home |
| `StatsRow` | stats[] with value, unit, label | Product, Home |
| `CTABand` | title, subtitle, buttons | All pages |
| `FAQ` | items[] with question, answer | Pricing |
| `QuoteBand` | quote, name, role | Product |
| `LogoStrip` | logos[] | Home |
| `CompareGrid` | competitors[] | Versus |
| `DeploySection` | — | Pricing, Home |
| `TimelineSteps` | steps[] with title, body | Home |
| `DemoForm` | fields[] | Request Demo |
| `BlogList` | posts[] | Blog |
| `NewsletterBand` | — | Blog |
