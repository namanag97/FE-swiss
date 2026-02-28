export const aboutContent = {
  sections: [
    {
      eyebrow: 'The Problem',
      title: 'Enterprise Integration Hell',
      titleAccent: 'Hell',
      pullQuote: '"Every single F500 set $250M on fire asking people to move data from one system to another"',
      body: [
        'Data silos cost enterprises hundreds of millions annually. Teams spend more time moving data between systems than actually analyzing it. The integration layer has become the most expensive and least productive part of the modern data stack.',
      ],
    },
    {
      eyebrow: 'The Solution',
      title: 'Unified Data Engine',
      body: [
        '<strong>Query from anywhere, in any syntax.</strong> TextQL removes the storage barriers and data access restrictions that have plagued enterprises for decades. One engine that connects to every data source, understands every schema, and delivers answers in natural language.',
        'No more ETL pipelines. No more data warehousing debates. No more waiting weeks for a dashboard that\'s already outdated by the time it ships.',
      ],
    },
    {
      eyebrow: 'The Vision',
      title: 'The Future of Data',
      body: [
        'We believe the future eliminates software integrators and vertical SaaS companies entirely. <strong>One unified engine that connects everything.</strong> Every database, every warehouse, every API — accessible through a single conversational interface.',
        'This is what we\'re building. This is what we ship every week.',
      ],
    },
    {
      eyebrow: 'Resources',
      title: 'How we work',
      body: [
        'We build in public and ship fast. Here\'s how we think about building a company.',
      ],
      links: [
        { label: 'Employee Handbook', href: '#' },
        { label: 'Building a Trillion-Dollar Company', href: '#' },
        { label: 'Meet the Team', href: '#' },
      ],
    },
  ],

  cta: {
    title: 'Go from question to',
    titleAccent: 'conviction',
    subtitle: 'in minutes, not weeks.',
  },
} as const
