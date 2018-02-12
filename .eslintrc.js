const isDistribution = process.env.NODE_ENV === "dist"

module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "jasmine": true
    },
    "globals": {
        "angular": true,
        "inject": true
    },
    "extends": "ovh",
    "rules": {
        "arrow-parens": 0,
        "generator-star-spacing": 0,
        "no-magic-numbers": ["error", {
            "ignore": [0, -1, 1, 2, 3]
        }]
    }
}
