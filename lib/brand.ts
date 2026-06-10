export const BRAND = {
  name:    'GSTify',
  tagline: 'Smart GST Billing for Every Business',

  domain:        'gstify.site',
  url:           'https://gstify.site',
  email:         'support@gstify.site',
  playStoreUrl:  'https://play.google.com/store/apps/details?id=com.gstify.app',

  packageName:   'com.gstify.app',

  // Pricing — keep in sync with the app's planLimits.ts
  pricing: {
    free:     { label: 'Free',       price: 0,    period: 'forever' },
    proM:     { label: 'Pro · Monthly',     price: 199,  period: '/month' },
    proY:     { label: 'Pro · Yearly',      price: 1499, period: '/year',  save: '37%' },
    bizM:     { label: 'Business · Monthly',price: 399,  period: '/month' },
    bizY:     { label: 'Business · Yearly', price: 2999, period: '/year',  save: '38%' },
  },

  // Colors — matches the app palette
  colors: {
    gold:      '#A87E1E',
    champagne: '#D7B05F',
    darkBrown: '#2B2722',
    cream:     '#FFFDF8',
  },
} as const;
