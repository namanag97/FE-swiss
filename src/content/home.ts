export const homeContent = {
  hero: {
    eyebrow: 'AI Data Agents',
    title: 'Data Analyst Agents for Messy Data',
    subtitle: 'AI agents for the messiest data workloads. Connect your data sources, ask questions in plain English, and get answers.',
  },

  logos: [
    'Amazon', 'Dropbox', 'NBA', 'Lumeris', 'Scale',
  ],

  engine: {
    eyebrow: 'Unified Data Engine',
    title: 'AI agents for the messiest data workloads',
  },

  features: [
    {
      eyebrow: 'Threads',
      title: 'Ask anything, get answers',
      body: 'No SQL required. Ana autonomously breaks down requests, queries databases, runs analyses, and delivers insights.',
      href: '/product',
    },
    {
      eyebrow: 'Slack Integration',
      title: 'Instant answers where your team works',
      body: 'Ask questions in Slack and get instant, data-backed answers from Ana without leaving your workflow.',
      href: '#',
    },
    {
      eyebrow: 'Ontology',
      title: 'Everyone speaks the same language',
      body: 'No more conflicting definitions. One shared semantic layer ensures every team gets consistent, trustworthy answers.',
      href: '#',
    },
  ],

  testimonial: {
    quote: 'TextQL enables analytics work — extract actionable insights in real-time.',
    name: 'Harigovind Singh',
    role: 'SVP Engineering',
    company: 'Lumeris',
  },

  connectors: {
    eyebrow: 'Connectors',
    title: 'Start today, not next quarter',
    body: 'No data migration required. Connect to your existing data sources and start querying immediately.',
    active: ['BigQuery', 'Redshift', 'Snowflake'],
    available: [
      'Supabase', 'ClickHouse', 'Postgres', 'MySQL', 'MongoDB',
      'Databricks', 'Athena', 'Presto', 'Trino', 'DuckDB',
      'Oracle', 'SQL Server', 'MariaDB', 'CockroachDB', 'AlloyDB',
      'Firebolt', 'Starburst', 'SingleStore', 'PlanetScale', 'Neon',
      'Motherduck', 'Materialize', 'Pinot', 'Druid', 'TimescaleDB',
    ],
  },

  playbooks: {
    eyebrow: 'Playbooks',
    title: 'Critical insights, on autopilot',
    body: 'Stop chasing reports. Set up automated playbooks that deliver insights on a schedule — weekly revenue, anomaly alerts, pipeline health.',
    href: '#',
  },

  deploy: {
    eyebrow: 'Deployment',
    title: 'Flexible and Secure',
    body: 'Deploys to meet your compliance needs. Your infrastructure, your control.',
    certifications: ['HIPAA', 'SOC2', 'GDPR'],
    clouds: ['AWS', 'Azure', 'GCP'],
    llms: ['Claude', 'Gemini', 'OpenAI'],
  },

  dashboards: {
    eyebrow: 'Dashboards',
    title: 'Live persistent dashboards that auto-update',
    body: 'Generate persistent dashboards in minutes. They update automatically as your data changes.',
    href: '#',
  },

  timeline: {
    title: '100,000s of tables, no configuration',
    subtitle: 'New data solutions shouldn\'t take a year. Here\'s how fast you can go.',
    steps: [
      {
        label: 'Day 1',
        title: 'Answers in minutes',
        body: 'Connect your data sources, ask your first question, and get an answer backed by real data.',
      },
      {
        label: 'Week 1',
        title: 'Bring everyone in, for free',
        body: 'Add unlimited seats and let every team member start asking questions — no training required.',
      },
      {
        label: 'Month 1',
        title: 'Scale to full autonomy',
        body: 'Set up playbooks, automate recurring analyses, and let Ana handle the reporting you used to do manually.',
      },
    ],
    tagline: 'Go from question to conviction in minutes, not weeks.',
  },

  cta: {
    title: 'Go from question to',
    titleAccent: 'conviction',
    subtitle: 'in minutes, not weeks.',
  },
} as const
