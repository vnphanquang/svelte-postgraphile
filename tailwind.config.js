// const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
    // currently Sapper dev server chokes on this
    // applyComplexClasses: true,
  },
  purge: {
    // needs to be set if we want to purge all unused
    // @tailwind/typography styles
    mode: 'all',
    content: ['./src/**/*.svelte', './src/**/*.html'],
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // color: 'var(--color)',
      },
    },
  },
  variants: {},
  corePlugins: {
    // preflight: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
