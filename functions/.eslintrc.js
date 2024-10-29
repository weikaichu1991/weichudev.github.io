module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    // "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "quotes": 0,
    "new-cap": 0,
    "object-curly-spacing": 0,
    "keyword-spacing": 0,
    "space-before-blocks": 0,
    "camelcase": 0,
    "indent": 0,
    "key-spacing": 0,
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
