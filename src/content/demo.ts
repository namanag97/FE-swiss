export const demoContent = {
  hero: {
    title: 'See what TextQL can do for you',
    subtitle: 'Get a personalized walkthrough of how TextQL can transform your data workflow.',
  },

  valueProps: [
    'Live product demonstration',
    'Custom use case discussion',
    'Technical deep dive',
    'Q&A with our team',
  ],

  testimonial: {
    quote: 'The speed and accuracy of insights we get from TextQL is unmatched.',
    name: 'Adam Richter',
    role: 'Director of Revenue · Dropbox',
  },

  logos: ['Amazon', 'Dropbox', 'Lumeris', 'Scale'],

  form: {
    title: 'Request Your Demo',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'Your name' },
      { name: 'email', label: 'Work Email', type: 'email' as const, placeholder: 'you@company.com' },
      { name: 'company', label: 'Company', type: 'text' as const, placeholder: 'Company name' },
      { name: 'title', label: 'Job Title', type: 'text' as const, placeholder: 'Your role' },
    ],
    select: {
      name: 'source',
      label: 'How did you hear about us?',
      options: [
        'Select an option',
        'Google Search',
        'Social Media',
        'Referral',
        'Conference / Event',
        'Blog / Article',
        'LinkedIn',
        'Twitter / X',
        'YouTube',
        'Podcast',
        'Other',
      ],
    },
    submitLabel: 'Submit',
    legal: 'By submitting this form you agree to the processing of your personal data as described in our',
    legalLinks: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
} as const
