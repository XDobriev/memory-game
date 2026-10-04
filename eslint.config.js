import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-restricted-properties': [
        'error',
        { object: 'document', property: 'write', message: 'Build DOM with createElement.' },
        { object: 'document', property: 'writeln', message: 'Build DOM with createElement.' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'AssignmentExpression > MemberExpression[property.name=/^(innerHTML|outerHTML)$/]',
          message: 'Build DOM with createElement.',
        },
        {
          selector: "CallExpression[callee.property.name='insertAdjacentHTML']",
          message: 'Build DOM with createElement.',
        },
      ],
    },
  },
];
