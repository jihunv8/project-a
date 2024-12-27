import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:storybook/recommended'),

  // src/modules의 각 모듈은 index파일을 통해서만 import 가능하도록 제한
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/!(modules)/**/*',
              from: './src/modules/**',
              except: ['**/index.js', '**/index.ts'],
            },
          ],
        },
      ],
    },
  },
];

export default config;
