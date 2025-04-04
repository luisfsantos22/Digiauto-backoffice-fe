import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended'
  ),
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      // https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-plugin
      'no-use-before-define': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-alert': 'error',
      'import/no-unresolved': 'error',
      'react/no-unused-prop-types': 'error',
      'react/prop-types': 'warn',
      'react/button-has-type': 'warn',
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-document-import-in-page': 'error',
      '@next/next/next-script-for-ga': 'error',
      'logical-assignment-operators': 'warn',
      'prettier/prettier': 'warn',
    },
    languageOptions: {
      ecmaVersion: 2021, // ECMAScript version
      sourceType: 'module', // Use ES modules
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
  },
]

export default eslintConfig
