module.exports = {
    "extends": "airbnb",
    "plugins": [
        "standard",
        "promise"
    ],
    "parser": "babel-eslint",
    "env": {
        "browser": true,
    },
    "ecmaFeatures": {
        "jsx": true,
        "es6": true,
        "classes": true
    },
    "rules": {
        "max-len": [1, { "code": 180, "ignoreTemplateLiterals": true }],
        "comma-dangle": [1, "always-multiline"],
        "no-underscore-dangle" : 0,
        "arrow-body-style": [0],
        "react/jsx-no-bind": [0],
        "react/forbid-prop-types": 0,
        "import/no-unresolved": [0] // Until import plugin supports webpack 2 resolveModules
    }
};
