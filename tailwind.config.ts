import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*!(*.stories|*.spec).{ts,tsx}', 'stories/*.stories.{ts,tsx}', 'index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...fontFamily.sans],
        mono: ['JetBrains Mono Variable', ...fontFamily.mono],
      },
      colors: ({ colors }) => ({
        primary: colors.indigo,
        destructive: colors.red,
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwindcss-react-aria-components'),
    iconsPlugin({ collections: getIconCollections(['lucide']) }),
  ],
} satisfies Config
