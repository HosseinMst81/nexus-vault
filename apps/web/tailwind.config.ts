import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          950: '#07090e',
          900: '#0c0f17',
          850: '#111520',
          800: '#171d2c',
          700: '#222b40',
          600: '#33405f',
          500: '#4e618e',
        },
        cyber: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          purple: '#9d4edd',
          neon: '#00ffcc',
          amber: '#ffaa00',
          rose: '#ff2e93',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Space Grotesk',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(157, 78, 221, 0.4)',
        'glow-neon': '0 0 25px -5px rgba(0, 255, 204, 0.4)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px -2px rgba(99, 102, 241, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': "radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.3) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
