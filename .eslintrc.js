module.exports = {
	"env": {
		"browser": true,
		"es2020": true,
		"amd": true,
		"node": true,
		"commonjs": true,
	},
	"parser": "babel-eslint",
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],

	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"semi": "error",
		"no-multiple-empty-lines":["error",
			{ 
				"max": 1,
				"maxEOF": 1,
			}
		],
		"object-property-newline": "error",
		"object-curly-newline": ["error", { "consistent": true }],
		"object-curly-spacing": ["error", "always"],
		"indent": ["error", "tab"],
		"arrow-body-style": 2, 
		"padding-line-between-statements": [
			"error",
			{ 
				blankLine: "always", 
				prev: ["const", "let", "var"],
				next: "*"
			},
			{ 
				blankLine: "any",    
				prev: ["const", "let", "var"], 
				next: ["const", "let", "var"]
			}
		],
		"quotes": ["error", "double"],
		"react/prop-types": 0,
	},

};