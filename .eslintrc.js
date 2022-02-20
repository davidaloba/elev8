module.exports = {
  env: {
    node:true, 
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'next', 'next/core-web-vitals', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'no-case-declarations': 'off'
  }
}
