module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.config.js',
      },
    },
  },
  rules: {
    indent: ['warn', 2],
    semi: ['warn', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['warn', 'never'],
    'no-console': ['warn', { 'allow': ['log', 'warn', 'error'] }],
    'linebreak-style': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'off'
  },
};
