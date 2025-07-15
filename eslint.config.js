import { configApp } from '@adonisjs/eslint-config'
import unusedImports from 'eslint-plugin-unused-imports'
import react from 'eslint-plugin-react'
import globals from 'globals'

export default configApp([
  {
    name: 'InertiaJS',
    files: ['./inertia/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      'react': react,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        //...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'off', // Disable the base rule as it can conflict with 'unused-imports/no-unused-vars'
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
])
