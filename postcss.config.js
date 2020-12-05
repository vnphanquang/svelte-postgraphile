const tailwind = require('tailwindcss');
const tailwindConfig = require('./tailwind.config');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');

const presetEnv = require('postcss-preset-env')({
  features: {
    // enable nesting
    'nesting-rules': true,
    'custom-properties': true, 
  },
});

const plugins =
  process.env.NODE_ENV === 'production'
    ? [postcssImport, tailwind(tailwindConfig), autoprefixer, presetEnv, cssnano]
    : [postcssImport, tailwind(tailwindConfig), autoprefixer, presetEnv];

module.exports = { plugins };
