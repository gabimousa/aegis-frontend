import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/test-output',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {
      'max-len': [
        'warn',
        {
          code: 100, // Maximum line length
          tabWidth: 2, // Tab width for calculating line length
          ignoreComments: true, // Ignore comments
          ignoreTrailingComments: true, // Ignore trailing comments
          ignoreUrls: true, // Ignore URLs
          ignoreStrings: true, // Ignore string literals
          ignoreTemplateLiterals: true, // Ignore template literals
          ignoreRegExpLiterals: true, // Ignore RegExp literals
          ignorePattern: '^import\\s.+\\sfrom\\s.+;?$', // Ignore import statements
        },
      ],
    },
  },
];
