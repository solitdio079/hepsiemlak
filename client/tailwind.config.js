
import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#030064',
          secondary: '#141175',
          neutral: '#010506',
          white: '#EEF8F7',
        },
      },
    ],
  },
}

