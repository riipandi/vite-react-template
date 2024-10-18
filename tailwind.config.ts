import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [
    'src/**/*!(*.stories|*.spec|*.test).{ts,tsx}',
    'stories/*.stories.{ts,tsx}',
    'index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...fontFamily.sans],
        mono: ['JetBrains Mono Variable', ...fontFamily.mono],
      },
      colors: {
        primary: colors.indigo,
        destructive: colors.red,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwindcss-react-aria-components'),
  ],
} satisfies Config
