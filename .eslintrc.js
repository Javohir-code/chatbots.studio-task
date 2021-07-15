module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'func-names': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
