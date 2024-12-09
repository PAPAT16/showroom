/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-black': 'var(--color-black)',
        'custom-white': 'var(--color-white)',
        'custom-dark-gray': 'var(--color-dark-gray)',
        'custom-gold': '#BB9B31',
        'custom-silver': 'var(--color-silver)',
        'custom-burgundy': 'var(--color-burgundy)',
        'custom-royal-blue': 'var(--color-royal-blue)',
        'custom-emerald-green': 'var(--color-emerald-green)'
      },
      backgroundColor: {
        'primary': '#BB9B31',
        'secondary': 'var(--color-silver)',
        'accent': 'var(--color-royal-blue)'
      },
      textColor: {
        'primary': '#BB9B31',
        'secondary': 'var(--color-silver)',
        'accent': 'var(--color-royal-blue)'
      },
      fontFamily: {
        'primary': ['var(--font-primary)', 'sans-serif'],
        'heading': ['var(--font-heading)', 'sans-serif']
      },
      fontSize: {
        'xs-heading': ['0.75rem', { lineHeight: '1', letterSpacing: '0.1em' }],
        'sm-heading': ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.05em' }],
        'base-heading': ['1rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'lg-heading': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0.01em' }],
        'xl-heading': ['1.25rem', { lineHeight: '1.75', letterSpacing: '-0.02em' }]
      },
      letterSpacing: {
        'tight-heading': '-0.02em',
        'wide-heading': '0.1em'
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};