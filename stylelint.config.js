module.exports = {
  plugins: [
    'stylelint-scss',
    'stylelint-order'
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order'
  ],
  rules: {
    indentation: 2,
    'at-rule-empty-line-before': ['always', {
      except: ['blockless-after-blockless', 'first-nested'],
      ignore: ['after-comment']
    }],
    'at-rule-no-unknown': null,
    'string-quotes': 'single',
    'no-duplicate-selectors': true,
    'no-descending-specificity': null,
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'function-name-case': ['lower', {
      ignoreFunctions: ['/([a-z])([A-Z])/']
    }],
    'selector-no-qualifying-type': [true, { ignore: ['class', 'attribute'] }],
    'selector-combinator-space-after': 'always',
    'selector-attribute-quotes': 'always',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-brackets-space-inside': 'never',
    'declaration-empty-line-before': ['always', {
      except: ['after-comment', 'first-nested', 'after-declaration']
    }],
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-newline-after': null,
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always-single-line',
    'function-url-quotes': 'always',
    'font-family-name-quotes': 'always-where-recommended',
    'comment-whitespace-inside': 'always',
    'rule-empty-line-before': ['always', {
      except: [
        'first-nested',
        'after-single-line-comment'
      ]
    }],
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-before': 'always',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-colon-space-before': 'never',
    'media-feature-colon-space-after': 'always',

    'scss/at-rule-no-unknown': true
  }
}
