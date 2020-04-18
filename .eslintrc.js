module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: '.'
  },
  plugins: ["@typescript-eslint"],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'indent': ['error', 2],
    'no-multiple-empty-lines': ['warn', {max: 2, maxBOF: 0, maxEOF: 1}],
    'sort-keys': 'off',
    'sort-imports': 'off',
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    'linebreak-style': ['error', 'unix'],
    'no-sequences': 'error',
    'comma-dangle': ['error', {
      'arrays': 'only-multiline',
      'objects': 'only-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never'
    }],
    'semi': ['error', 'always'],
    'operator-linebreak': ['warn', 'before'],
    'no-unused-var': 'off',
    '@typescript-eslint/no-explicit-any': ["warn", { "fixToUnknown": true }]
  },
};
