module.exports = {
  env: {
    es6: true,
    node: true,
    jest:true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
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
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/ban-types':'off',
    '@typescript-eslint/no-explicit-any':'off',
    'prettier/prettier': 'error',
    'camelcase':'off',
    'class-methods-use-this': 'off',
    "no-useless-constructor":'off',
    "no-shadow": 'off',
    '@typescript-eslint/no-unused-vars': ['error',{
      'argsIgnorePattern': '_'
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
