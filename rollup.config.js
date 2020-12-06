import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup';
import pkg from './package.json';
import alias from '@rollup/plugin-alias';
import path from 'path';
import toml from 'rollup-plugin-toml';
import image from '@rollup/plugin-image';

const { createPreprocessors } = require('./svelte.config.js');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const sourcemap = dev ? 'inline' : false;
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const preprocess = createPreprocessors({ sourceMap: !!sourcemap });

const aliases = alias({
  entries: [
    { find: '@static', replacement: path.resolve(__dirname, 'static')},
    { find: '@components', replacement: path.resolve(__dirname, 'src/components')},
    { find: '@models', replacement: path.resolve(__dirname, 'src/models')},
    { find: '@services', replacement: path.resolve(__dirname, 'src/services')},
    { find: '@stores', replacement: path.resolve(__dirname, 'src/stores')},
    { find: '@repos', replacement: path.resolve(__dirname, 'src/repos')},
    { find: '@utils', replacement: path.resolve(__dirname, 'src/utils')},
    { find: '@config', replacement: path.resolve(__dirname, 'src/config')},
    { find: '@env', replacement: path.resolve(__dirname,`src/config/env/env.${mode}.toml` )},
    { find: '@migrant', replacement: path.resolve(__dirname, `Migrant.toml`)},
  ]
});

const svelteExtensions = [".svelte"];

const replacements = {
  get shared() {
    return {
      'process.browser': true,
      'process.env.NODE_ENV': JSON.stringify(mode),
    };
  },
  get client() {
    return {
      ...this.shared,
    };
  },
  get server() {
    return {
      ...this.shared,
      'module.require': 'require',
    };
  },
  get serviceworker() {
    return {
      ...this.shared,
    };
  },
}

const warningIsIgnored = (warning) => warning.message.includes(
  'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification',
) || warning.message.includes('Circular dependency: node_modules');

// Workaround for https://github.com/sveltejs/sapper/issues/1266
const onwarn = (warning, _onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || warningIsIgnored(warning) || console.warn(warning.toString());

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    output: { ...config.client.output(), sourcemap },
    plugins: [
      aliases,
      replace(replacements.client),
      svelte({
        extensions: svelteExtensions,
        compilerOptions: {
          dev,
          hydratable: true,
        },
        emitCss: true,
        preprocess
      }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs({
        sourceMap: !!sourcemap,
      }),
      typescript({
        noEmitOnError: !dev,
        sourceMap: !!sourcemap,
        tsconfig: './tsconfig.json',
      }),
      json(),
      toml,
      image(),
      legacy && babel({
        extensions: ['.js', '.mjs', '.html', '.svelte'],
        babelHelpers: 'runtime',
        exclude: ['node_modules/@babel/**'],
        presets: [
          ['@babel/preset-env', {
            targets: '> 0.25%, not dead',
          }],
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          ['@babel/plugin-transform-runtime', {
            useESModules: true,
          }],
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
        ],
      }),

      !dev && terser({
        module: true,
      }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: { server: config.server.input().server.replace(/\.js$/, '.ts') },
    output: { ...config.server.output(), sourcemap },
    plugins: [
      aliases,
      replace(replacements.server),
      svelte({
        extensions: svelteExtensions,
        compilerOptions: {
          dev,
          generate: 'ssr',
        },
        preprocess,
      }),
      resolve({
        dedupe: ['svelte'],
      }),
      commonjs({
        sourceMap: !!sourcemap,
      }),
      typescript({
        noEmitOnError: !dev,
        sourceMap: !!sourcemap,
        tsconfig: './tsconfig.json',
      }),
      json(),
      toml,
      image(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules || Object.keys(process.binding('natives')), // eslint-disable-line global-require
    ),

    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input().replace(/\.js$/, '.ts'),
    output: { ...config.serviceworker.output(), sourcemap },
    plugins: [
      resolve(),
      replace(replacements.serviceworker),
      commonjs({
        sourceMap: !!sourcemap,
      }),
      typescript({
        noEmitOnError: !dev,
        sourceMap: !!sourcemap,
        tsconfig: './tsconfig.json',
      }),
      !dev && terser(),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },
};
