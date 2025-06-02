import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginReact from 'eslint-plugin-react';
import eslintTanstackPluginQuery from '@tanstack/eslint-plugin-query';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginVitest from '@vitest/eslint-plugin';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  eslintPluginImport.flatConfigs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...eslintTanstackPluginQuery.configs['flat/recommended'],

  eslintPluginReact.configs.flat.recommended,
  eslintPluginVitest.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    ignores: ['!.*', 'node_modules', '.next', '.turbo', 'dist', 'compiled', 'next-env.d.ts'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.name,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  {
    files: ['**/*.{js,cjs,ts,tsx}'],

    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },

    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': ['error', { callbacksLast: true, shorthandFirst: true }],
      'react/hook-use-state': 'error',

      'prefer-template': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'spaced-comment': 'error',
      'no-console': 'error',

      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',

      'import/no-default-export': 'error',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'vitest/valid-title': [
        'error',
        {
          mustMatch: {
            it: [/should.*when/u.source, "Test title must include 'should' and 'when'"],
          },
        },
      ],
    },

    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
  },
  {
    files: ['src/app/**/{page,layout,not-found}.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
);
