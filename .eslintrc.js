module.exports = {
  root: true,

  env: {
    node: true,
    browser: true
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/recommended',
    'standard'
  ],

  rules: {
    // 'require-await': 'error',

    // Import rules
    'import/no-unresolved': 0,
    'import/order': ['error', {
      'newlines-between': 'always-and-inside-groups',
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      pathGroups: [
        { pattern: '~/constants', group: 'internal', position: 'after' },
        { pattern: '~/constants/*', group: 'internal', position: 'after' },
        { pattern: '~/store', group: 'internal', position: 'after' },
        { pattern: '~/store/**', group: 'internal', position: 'after' },
        { pattern: '~/services/**', group: 'internal', position: 'after' },
        { pattern: '~/validators/**', group: 'internal', position: 'after' },
        { pattern: '~/utils/**', group: 'internal', position: 'after' },
        { pattern: '~/logics/**', group: 'internal', position: 'after' },
        { pattern: '~/banners/**', group: 'internal', position: 'after' },
        { pattern: '~/brandings/**', group: 'internal', position: 'after' },
        { pattern: '~/ui/**', group: 'internal', position: 'after' },
        { pattern: '~/old-ui/**', group: 'internal', position: 'after' },
        { pattern: '~/components/**', group: 'internal', position: 'after' },
        { pattern: '~/popups/**', group: 'internal', position: 'after' },
        { pattern: '~/views/**', group: 'internal', position: 'after' },
        { pattern: '~/widgets/**', group: 'internal', position: 'after' }
      ]
    }],

    // Unicorn rules
    'unicorn/no-null': 0,
    'unicorn/import-style': 0,
    'unicorn/prefer-ternary': 0,
    'unicorn/no-array-reduce': 0,
    'unicorn/no-array-for-each': 0,
    'unicorn/prefer-node-remove': 0,
    'unicorn/prefer-node-append': 0,
    'unicorn/prefer-dom-node-remove': 0,
    'unicorn/prefer-dom-node-append': 0,
    'unicorn/catch-error-name': ['error', { name: 'err' }],
    'unicorn/no-abusive-eslint-disable': 'warn',
    'unicorn/prevent-abbreviations': 0,
    'unicorn/no-fn-reference-in-iterator': 0,
    'unicorn/no-array-callback-reference': 0,
    'unicorn/filename-case': ['warn', {
      cases: {
        kebabCase: true,
        pascalCase: true
      }
    }],

    // Vue rules
    'vue/no-v-html': 0,
    'vue/eqeqeq': 'error',
    'vue/comment-directive': 0,
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/no-restricted-syntax': 'error',
    'vue/no-deprecated-slot-attribute': 'warn',
    'vue/no-deprecated-slot-scope-attribute': 'warn',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/match-component-file-name': ['error', {
      extensions: ['vue'],
      shouldMatchCase: true
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always'
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
      ignores: [
        'noindex',
        'noscript'
      ]
    }],
    'vue/no-unused-components': ['error', {
      ignoreWhenBindingPresent: true
    }],

    // Typescript rules
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'comma',
        requireLast: false
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false
      }
    }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/array-type': ['error', {
      default: 'array-simple'
    }],
    '@typescript-eslint/no-use-before-define': ['error', {
      enums: false,
      classes: false,
      typedefs: false,
      variables: false,
      functions: false
    }],
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }]
    // '@typescript-eslint/consistent-type-assertions': [
    //   'error',
    //   {
    //     assertionStyle: 'as',
    //     objectLiteralTypeAssertions: 'never'
    //   }
    // ],
  },

  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        // Checked by @typescript-eslint/no-unused-vars
        'no-unused-vars': 0,
        // Checked by @typescript-eslint/no-use-before-define
        'no-use-before-define': 0,
        // Checked by Typescript
        'getter-return': 0,
        // Checked by Typescript
        'no-dupe-args': 0,
        // Checked by Typescript
        'no-dupe-keys': 0,
        // Checked by Typescript
        'no-unreachable': 0,
        // Checked by Typescript
        'valid-typeof': 0,
        // Checked by Typescript
        'no-const-assign': 0,
        // Checked by Typescript
        'no-new-symbol': 0,
        // Checked by Typescript
        'no-this-before-super': 0,
        // This is checked by Typescript using the option `strictNullChecks`.
        'no-undef': 0,
        // Checkbed by Typescript.
        'no-dupe-class-members': 0,
        // Checkbed by Typescript.
        'no-redeclare': 0,
        // Checked by Typescript
        camelcase: 'off',
        // Checked by Typescript
        'default-param-last': 'off'
      }
    }
  ]
}
