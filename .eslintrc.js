module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'global-require': 0,
    'no-unused-vars': 0,
    'consistent-return': 0,
  },
};
