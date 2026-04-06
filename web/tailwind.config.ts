import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f6f0e6',
        ivory: '#fffaf2',
        ink: '#17120f',
        mist: '#786d63',
        line: 'rgba(23, 18, 15, 0.12)',
        brass: '#b88918',
        sage: '#5f6e60',
        clay: '#9f4d3f',
      },
      boxShadow: {
        cloud: '0 20px 70px rgba(74, 52, 21, 0.10)',
        card: '0 18px 50px rgba(32, 22, 14, 0.08)',
        insetline: 'inset 0 0 0 1px rgba(23, 18, 15, 0.08)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 18% 20%, rgba(184,137,24,0.16), transparent 22%), radial-gradient(circle at 80% 0%, rgba(159,77,63,0.12), transparent 24%), radial-gradient(circle at 60% 75%, rgba(95,110,96,0.12), transparent 26%)',
      },
    },
  },
  plugins: [],
};

export default config;
