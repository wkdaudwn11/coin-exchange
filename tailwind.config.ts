import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        header: 'rgb(0, 53, 151)',
        'primary-100': 'rgb(6, 18, 33)',
        'warning-100': 'rgb(255, 168, 0)',
        'gray-100': 'rgb(190, 193, 198)',
        'gray-200': '#d2d4d6',
        'gray-300': '#1e2939',
        'gray-400': '#565d6a',
        up: '#c84a31',
        down: '#1261c4',
      },
      fontSize: {
        '15': '15px',
      },
    },
  },
  plugins: [require('daisyui')],
};

export default config;
