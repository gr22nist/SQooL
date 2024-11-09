/** @type {import('tailwindcss').Config} */
import * as colors from './tailwind/colors.js';
import * as fonts from './tailwind/fonts.js';
import flowbite from 'flowbite/plugin';
import typography from '@tailwindcss/typography';
import scrollbarHide from 'tailwind-scrollbar-hide';

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js", 
  ],
  theme: {
    extend: {
      colors: {
        bgdark: colors.bgDark,
        primaryLight: colors.primaryLight,
        primaryDark: colors.primaryDark,
        secondaryLight: colors.secondaryLight,
        secondaryDark: colors.secondaryDark,
        subLight: colors.subLight,
        subDark: colors.subDark,
      },
      fontFamily: {
        nanum: ['var(--font-nanum)'],
        code: ['var(--font-elice)', 'monospace'],
      },
      fontSize: {
        'xxs': '12px',
      },
      width: {
        'card-pc': '288px',
        'article': '588px',
      },
      maxWidth: {
        'content-full': '1200px',
      },
      minWidth: {
        'content-quarter': '320px',
      },
      spacing: {
        'nav': '59px',
      },
      lineHeight: {
        'h1': '72px',
      },
      borderWidth: {
        '1': '1px',
      },
      rotate: {
        '90': '90deg',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: 0, transform: 'translateX(-24px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: 0, transform: 'translateX(24px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn .6s ease-out',
        slideLeft: 'slideLeft .6s ease-out',
        slideRight: 'slideRight .6s ease-out',
      },
    },
    darkMode: 'class',
  },
  plugins: [
    flowbite,
    typography,
    scrollbarHide,
  ],
};

export default config;