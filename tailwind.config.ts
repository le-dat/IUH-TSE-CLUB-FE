import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B4896',
        },
        secondary: {
          DEFAULT: '#182853',
        },
        gray: {
          DEFAULT: 'rgba(243,244,249,255)',
        },
      },
    },
  },
  plugins: [],
}
export default config
