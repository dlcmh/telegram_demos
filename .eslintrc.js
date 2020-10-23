module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  ignorePatterns: ['dist'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-var-requires': 'off',
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': 'off',
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
  },
};
