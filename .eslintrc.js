module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "classes": true,
        "jsx": true
    },
    "env": {
      "node": true,
      "es6": true
    },
    "rules": {
      "prefer-const": 0,
      "no-empty-label": 0,
      "no-underscore-dangle": 0,
      "no-extra-parens": [2, "functions"],
      "import/no-unresolved": 0,
      "space-before-keywords": 0,
      "space-after-keywords": 0,
      "space-return-throw-case": 0,
      "max-len": [2, 240, 2],
      "no-alert": 0,
      "react/jsx-filename-extension": 0,
      "react/prefer-stateless-function": 0,
      "no-use-before-define": 0
    },
    "presets": [
      "react-native"
    ],
    "plugins": [
      "react"
    ]
};
