module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mocha": true,
    "mongo": true
  },
  "plugins": [
    "react"
  ],
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "indent":["error",2,{"SwitchCase":1}],
    "linebreak-style":["error","unix"],
    "quotes":["error","single"],
    "semi":["error","always"],
    "no-console":["warn"],
    "no-unused-vars":["warn"],
    "strict":["off","safe"],
    "no-eval":["error"],
    "eqeqeq":["error"],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": "error",
    "no-var": "error",
    "space-in-parens": ["error", "never"],
    "no-trailing-spaces": "error",
    "no-multiple-empty-lines": "error",
    "keyword-spacing": "error",
    "comma-spacing": "error"
  }
}