/* eslint-disable */
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: [
      'dist/*',
      'eslint.config.mjs',
      'postcss.config.cjs',
      'vite.config.ts'
    ],
    files: ['**/*.ts', '**/*.tsx']
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended-type-checked',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:prettier/recommended'
    )
  ),
  {
    plugins: {
      'react-refresh': reactRefresh,
      prettier: fixupPluginRules(prettier)
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json']
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true
        }
      ],

      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true
        }
      ],

      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-types': 'off'
    }
  }
]
