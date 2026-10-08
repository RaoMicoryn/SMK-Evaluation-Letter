import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'cursive'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        twinkle: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.5', transform: 'scale(.8)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        bob: 'bob 3.2s ease-in-out infinite',
        twinkle: 'twinkle 2.6s ease-in-out infinite',
        'pop-in': 'popIn .4s ease-out both',
      },
    },
  },
  corePlugins: { preflight: false },
  plugins: [],
};
export default config;
