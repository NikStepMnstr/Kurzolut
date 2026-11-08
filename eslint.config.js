import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import globals from 'globals';
import importX, { createNodeResolver } from 'eslint-plugin-import-x';
import jest from 'eslint-plugin-jest';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      pluginQuery.configs['flat/recommended'],
    ],
    plugins: { react, 'import-x': importX, sonarjs, unicorn },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: '19.3' },
      'import-x/extensions': ['.ts', '.tsx', '.js', '.jsx'],
      'import-x/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      'import-x/resolver-next': [
        createNodeResolver({
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        }),
      ],
    },
    rules: {
      // Code quality
      'arrow-body-style': ['error', 'as-needed'],
      curly: 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'newline-before-return': 'error',
      'no-await-in-loop': 'warn',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-else-return': 'error',
      'no-nested-ternary': 'warn',
      'no-param-reassign': ['error', { props: true }],
      'no-self-compare': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-useless-return': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'error',
      'sonarjs/cognitive-complexity': 'warn',
      'spaced-comment': 'error',
      yoda: 'error',

      // TypeScript
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // React
      'react/button-has-type': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-object-type-as-default-prop': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { propElementValues: 'always' },
      ],
      'react/no-unused-prop-types': 'error',
      'react/self-closing-comp': 'error',

      // Imports
      'import-x/no-cycle': 'error',
      'import-x/no-default-export': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.config.{js,ts}',
            '**/*.test.{ts,tsx}',
            'src/test/**',
          ],
        },
      ],
      'import-x/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          pathGroups: [
            { pattern: 'react', group: 'builtin', position: 'before' },
            {
              pattern: './**/*.{scss,css}',
              group: 'sibling',
              position: 'after',
            },
          ],
          distinctGroup: false,
          pathGroupsExcludedImportTypes: ['react', 'scss'],
        },
      ],

      // Modern JS
      'unicorn/error-message': 'error',
      'unicorn/no-useless-fallback-in-spread': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-at': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/throw-new-error': 'error',
    },
  },
  {
    files: ['**/*.config.{js,ts}'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    plugins: { jest },
    rules: {
      'jest/no-focused-tests': 'error',
    },
  },
]);
