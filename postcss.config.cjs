const { join } = require('path')
const config = join(__dirname, 'tailwind.config.cjs')

module.exports = {
  plugins: {
    tailwindcss: { config },
    autoprefixer: {},
  },
}
