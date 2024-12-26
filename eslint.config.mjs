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
              target: './src/!(modules)/**/*', // 프로젝트 전체에서
              from: './src/modules/**', // modules 폴더 하위의 모든 파일 및 폴더
              except: ['**/index.js', '**/index.ts'], // 하위 폴더의 index 파일만 허용
            },
          ],
        },
      ],
    },
  },
];

export default config;
