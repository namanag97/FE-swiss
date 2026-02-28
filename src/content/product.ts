export const productContent = {
  hero: {
    title: 'Threads',
    subtitle: 'Connect your data sources, ask questions in plain English, and let Ana do the rest.',
  },

  features: [
    {
      eyebrow: 'Autonomous Analysis',
      title: 'AI that reasons through complex data tasks',
      body: 'Ana autonomously breaks down requests, queries databases, runs analyses, and delivers insights. No SQL required.',
      reversed: false,
    },
    {
      eyebrow: 'How It Works',
      title: 'Ask. Analyze. Answer.',
      body: 'Ana integrates with your existing data warehouse, learns your schema automatically, and maintains a complete audit trail of every query and analysis.',
      reversed: true,
    },
  ],

  quote: {
    text: 'The speed and accuracy of insights we get from TextQL is unmatched.',
    name: 'Adam Richter',
    role: 'Director of Revenue · Dropbox',
  },

  stats: [
    { value: '300', unit: 'Hours Saved', label: 'Manual work saved per quarter' },
    { value: '140x', unit: 'Faster', label: 'Delivery speed per question' },
    { value: '98.8%', unit: 'Reduction', label: 'Dashboard build time savings' },
  ],

  closing: {
    title: 'Go from question to conviction in minutes, not weeks.',
  },

  cta: {
    title: 'Go from question to',
    titleAccent: 'conviction',
    subtitle: 'in minutes, not weeks.',
  },
} as const
