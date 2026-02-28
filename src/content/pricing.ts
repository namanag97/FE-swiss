export const pricingContent = {
  hero: {
    title: 'Pricing',
    subtitle: 'Choose the plan that\'s right for you.',
  },

  tiers: [
    {
      label: 'For Prototyping',
      name: 'Analyst',
      price: '$0',
      period: '+ compute / month',
      description: 'For analysts and ICs connecting databases and exploring ad hoc analysis use cases',
      features: [
        '$100/month in free credits',
        '3 seats',
        '1 concurrent agent',
        'Standard compute',
        'Unlimited connectors',
        'All integrations (Slack, dbt, Tableau, Teams)',
        'Unlimited semantic layer queries',
        'Ontology builder',
        'Conversation memory',
        'Secrets manager',
      ],
      cta: { label: 'Get started with $100/mo free credit', variant: 'ghost' as const },
      featured: false,
    },
    {
      label: 'Most Popular',
      name: 'Team',
      price: '$250',
      period: '+ compute / month',
      description: 'For companies with large-scale data initiatives and team collaboration needs',
      features: [
        '$400/month in free credits',
        'Unlimited seats',
        'Unlimited concurrent agents',
        'Flexible compute instances',
        'Memory with permissions',
        'Ontology with permissions',
        'SSO & team collaboration',
        'SOC2 compliance',
        'HIPAA compliance',
        'Priority support (1-hour response)',
      ],
      cta: { label: 'Sign in to upgrade', variant: 'primary' as const },
      featured: true,
    },
    {
      label: 'For Organizations',
      name: 'Enterprise',
      price: 'Custom',
      period: '+ compute / month',
      description: 'For organizations with compliance requirements and mission-critical workloads',
      features: [
        'Dedicated infrastructure',
        'Advanced security',
        'On-prem & BYOC deployments',
        'Custom model fine-tuning',
        'Migration assistance',
        'Dedicated account manager',
      ],
      cta: { label: 'Request Demo', variant: 'ghost' as const },
      featured: false,
    },
  ],

  deploy: {
    eyebrow: 'Deployment',
    title: 'Bring Your Own Cloud',
    body: 'Deploy TextQL within your own VPC on AWS, Azure, or GCP. Our embedded and white-label solutions let you offer AI-powered data analysis under your own brand — your infrastructure, your control.',
    clouds: ['AWS', 'Azure', 'GCP'],
    certifications: ['HIPAA', 'SOC2', 'GDPR'],
    components: ['Your Compute', 'Your Storage', 'Your Database'],
    llms: ['Claude', 'Gemini', 'OpenAI'],
    useCases: ['Sales', 'Finance', 'Engineering'],
  },

  faq: {
    title: 'Questions & Answers',
    items: [
      {
        question: 'How does ACU pricing work?',
        answer: 'ACU (Analytical Compute Units) measure the compute resources used by your queries and analyses. Each plan includes a base allocation, and additional usage is billed at transparent per-unit rates.',
      },
      {
        question: 'How does TextQL pricing compare to Snowflake or traditional data platforms?',
        answer: 'TextQL pricing is designed to be simpler and more predictable. You pay a flat platform fee plus compute usage, with no hidden costs for storage, seats (on Team+), or integrations.',
      },
      {
        question: 'What happens when I exceed my plan\'s included credits?',
        answer: 'Additional usage is billed at standard per-ACU rates. You can set budget alerts and caps to prevent unexpected charges.',
      },
      {
        question: 'Can I use my AWS, GCP, or Azure credits with TextQL?',
        answer: 'Yes. With BYOC (Bring Your Own Cloud) deployments on Enterprise plans, compute runs in your own VPC and counts against your existing cloud credits.',
      },
      {
        question: 'Do you charge for data storage?',
        answer: 'No. TextQL connects to your existing data sources. We never copy or store your data — it stays in your warehouse.',
      },
      {
        question: 'Are there limits on seats or data sources?',
        answer: 'The Analyst plan includes 3 seats. Team and Enterprise plans have unlimited seats and unlimited data source connections.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards for Analyst and Team plans. Enterprise plans can be invoiced with NET-30 terms.',
      },
    ],
    note: 'Have more questions?',
    noteLinks: [
      { label: 'Check out our docs', href: '#' },
      { label: 'schedule a demo', href: '/request-demo' },
    ],
  },

  cta: {
    title: 'Go from question to',
    titleAccent: 'conviction',
    subtitle: 'in minutes, not weeks.',
  },
} as const
