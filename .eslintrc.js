module.exports = {
    "extends": "airbnb",
    "rules": {
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "no-bitwise": "off",
        "no-loop-func": "warn",
        "max-len": ["error", 120],
        "jsx-a11y/label-has-for": [ 2, {
            "required": {
                "some": [ "nesting", "id" ],
            }
        }],
        "jsx-a11y/label-has-associated-control": [ 2, {
            "assert": "either"
        }]
    }
};
