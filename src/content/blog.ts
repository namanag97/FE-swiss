export type BlogPost = {
  title: string
  author: string
  authorInitials: string
  date: string
  category: string
  excerpt?: string
  href: string
}

export const blogContent = {
  hero: {
    eyebrow: 'Blog',
    title: 'Ideas that',
    titleAccent: 'move',
    titleEnd: 'data forward.',
    subtitle: 'Engineering insights, product thinking, and stories from building Ana — the AI analyst your team actually trusts.',
  },

  categories: ['All', 'Engineering', 'Announcements', 'Research', 'Team'],

  featured: {
    category: 'Announcements',
    title: 'Why we built Ana to say "I don\'t know" more often',
    excerpt: 'Trust in AI analytics is brittle. One wrong answer poisons the well. Here\'s how we designed Ana to be honest about uncertainty — and why that counterintuitively makes her far more useful.',
    author: 'Soren Liu',
    authorInitials: 'SL',
    date: 'Feb 18 · 8 min read',
    href: '#',
  },

  posts: [
    {
      title: 'Ana Just Got 25% Cheaper',
      author: 'TextQL Team',
      authorInitials: 'TQ',
      date: 'Jan 15, 2026',
      category: 'Announcements',
      excerpt: 'We\'ve optimized our compute pipeline to deliver the same quality at 25% lower cost across all plans.',
      href: '#',
    },
    {
      title: 'Introducing Sandcastles — the Sandbox for Analytical Workloads',
      author: 'Mark Hay',
      authorInitials: 'MH',
      date: 'Dec 17, 2025',
      category: 'Engineering',
      excerpt: 'A safe environment to prototype queries, test hypotheses, and explore data without affecting production.',
      href: '#',
    },
    {
      title: 'Why I\'m Joining TextQL',
      author: 'Brian Bickell',
      authorInitials: 'BB',
      date: 'Oct 29, 2025',
      category: 'Team',
      excerpt: 'A personal reflection on what it means to build for data teams in 2026, and what surprised me.',
      href: '#',
    },
    {
      title: 'TextQL Launches into Healthcare Vertical',
      author: 'Ethan Ding',
      authorInitials: 'ED',
      date: 'Oct 9, 2025',
      category: 'Announcements',
      excerpt: 'Bringing AI-powered analytics to healthcare organizations with HIPAA-compliant deployments.',
      href: '#',
    },
    {
      title: 'Making AI That Can Process 1,000,000x More Data',
      author: 'Ethan Ding',
      authorInitials: 'ED',
      date: 'Aug 6, 2025',
      category: 'Announcements',
      excerpt: 'How we scaled Ana to handle enterprise-grade data volumes without sacrificing accuracy or speed.',
      href: '#',
    },
    {
      title: 'Open-Sourcing State of the Art Text-to-SQL',
      author: 'Spencer Hubert',
      authorInitials: 'SH',
      date: 'Mar 10, 2025',
      category: 'Engineering',
      excerpt: 'Our text-to-SQL benchmark results and the open-source model we\'re releasing to the community.',
      href: '#',
    },
  ],

  newsletter: {
    title: 'Stay in the',
    titleAccent: 'loop.',
    subtitle: 'Engineering posts, product updates, and team thinking — no noise.',
  },
} as const
