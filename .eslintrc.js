module.exports = {
  env: {
    browser: false,
    es2021: false,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
